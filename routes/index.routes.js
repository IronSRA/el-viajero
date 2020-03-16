const Restaurants = require('../models/Restaurant.model.js')
const PopularPlace = require('../models/PopularPoint.model.js')
const express = require('express')
const router = express.Router()
const User = require('../models/User.model')
const searchAPIHandler = require('../services/SearchAPIHandler')
const newsAPIHandler = require('../services/NewsAPIHandler')
const infoAPIHandler = require('../services/BasicAPIHandler')
const weatherAPIHandler = require('../services/WeatherAPIHandler')
const restaurantsAPIHandler = require('../services/RestaurantAPIHandler')
const pointOfInterestAPIHandler = require('../services/PointOfInterestAPIHandler')
const eventsAPIHandler = require('../services/EventsAPIHandler')
const saveInfo = require('../services/saveInfoHandler')
const searchCountry = new searchAPIHandler()
const newsAPI = new newsAPIHandler()
const infoAPI = new infoAPIHandler()
const weatherAPI = new weatherAPIHandler()
const restaurantsAPI = new restaurantsAPIHandler()
const pointsOfInterestAPI = new pointOfInterestAPIHandler()
const eventsAPI = new eventsAPIHandler()

const isAdmin = user => user && user.role === 'Admin'

const checkLoggedIn = (req, res, next) => req.user ? next() : res.render('index', {
  loginErrorMessage: 'Zona restringida a usuarios registrados'
})

router.get('/', (req, res) => {

  let searchPlace, searchRestaurant, code, resultRestaurant, resultPlace
  const city = req.query.city

  searchCountry.getCountry(city)
    .then(countryCode => {
      searchRestaurant = Restaurants.find({
        city: countryCode.city
      })

      searchPlace = PopularPlace.find({
        city: countryCode.city
      })
      code = countryCode
      code.city = countryCode.city.toLowerCase()
      return Promise.all([searchRestaurant, searchPlace])
    })
    .then(infoRestaurant => {
      if (infoRestaurant[0].length) {
        resultRestaurant = infoRestaurant[0]
        resultPlace = infoRestaurant[1]
        const newsPromise = newsAPI.getNews(`${code.country}`)
        const infoPromise = infoAPI.getInfo(`${code.country}`)
        const weatherPromise = weatherAPI.getWeather(`${code.city}`)
        const eventsPromise = eventsAPI.getEvents(`${code.city}`)
        return Promise.all([newsPromise, infoPromise, weatherPromise, eventsPromise])
      } else {
        const newsPromise = newsAPI.getNews(`${code.country}`)
        const infoPromise = infoAPI.getInfo(`${code.country}`)
        const weatherPromise = weatherAPI.getWeather(`${code.city}`)
        const restaurantsPromise = restaurantsAPI.getRestaurants(`${code.city}`, `${code.country}`)
        const pointOfInterestPromise = pointsOfInterestAPI.getPointsOfInterest(`${code.city}`, `${code.country}`)
        const eventsPromise = eventsAPI.getEvents(`${code.city}`)
        return Promise.all([newsPromise, infoPromise, weatherPromise, eventsPromise, restaurantsPromise, pointOfInterestPromise])
      }
    })
    .then(results => {
      let sunrise, sunset

      if (results[2] === undefined) {
        results[2] = {
          data: ''
        }
      } else {
        sunrise = (new Date(results[2].data.city.sunrise * 1000)).toLocaleTimeString('en-UK')
        sunset = (new Date(results[2].data.city.sunset * 1000)).toLocaleTimeString('en-UK')
      }
      results[3].data._embedded ? null : results[3].data._embedded = {
        events: ""
      }

      if (results.length === 4) {

        res.render('index', {
          news: results[0].data.articles,
          info: results[1].data,
          weather: results[2].data,
          city: code.city,
          country: code.country,
          hours: {
            sunrise,
            sunset
          },
          restaurant: resultRestaurant,
          points: resultPlace,
          event: results[3].data._embedded.events,
          user: req.user
        })

      } else {
        saveInfo(results[4], code.city, Restaurants)
        saveInfo(results[5], code.city, PopularPlace)
        res.render('index', {
          news: results[0].data.articles,
          info: results[1].data,
          weather: results[2].data,
          city: code.city,
          country: code.country,
          hours: {
            sunrise,
            sunset
          },
          restaurant: results[4],
          points: results[5],
          event: results[3].data._embedded.events,
          user: req.user
        })
      }
    })
    .catch(err => next(err))
})




router.get('/userList', (req, res) => {
  User.find()
    .then(allUsers => res.render('/user-list', {
      users: allUsers
    }))
    .catch(err => next(err))
})

module.exports = router
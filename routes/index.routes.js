const mongoose = require('mongoose')
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

  let city = req.query.city
  searchCountry.getCountry(city)
    .then(countryCode => {
      const newsPromise = newsAPI.getNews(`${countryCode.country}`)
      const infoPromise = infoAPI.getInfo(`${countryCode.country}`)
      const weatherPromise = weatherAPI.getWeather(`${countryCode.city}`)
      const restaurantsPromise = restaurantsAPI.getRestaurants(`${countryCode.city}`, `${countryCode.country}`)
      const pointOfInterestPromise = pointsOfInterestAPI.getPointsOfInterest(`${countryCode.city}`, `${countryCode.country}`)
      const eventsPromise = eventsAPI.getEvents(`${countryCode.city}`)
      const searchRestaurant = Restaurants.find({
        city: countryCode.city
      })
      const searchPlace = PopularPlace.find({
        city: countryCode.city
      })

      Promise.all([searchRestaurant, searchPlace])
        .then(infoRestaurant => {
          //si hay restaurante solo pedimos x datos
          if (infoRestaurant[0].length > 0) {


            Promise.all([newsPromise, infoPromise, weatherPromise, eventsPromise])
              .then(results => {
          
                // IMPORTANTE NO TOCAR DE AQUI
                let sunrise, sunset
                if (results[2] === undefined) {
                  results[2] = {
                    data: ""
                  }
                } else {
                  sunrise = (new Date(results[2].data.city.sunrise * 1000)).toLocaleTimeString("en-UK")
                  sunset = (new Date(results[2].data.city.sunset * 1000)).toLocaleTimeString("en-UK")
                }
                // A AQUI
                res.render('index', {
                  news: results[0].data.articles,
                  info: results[1].data,
                  weather: results[2].data,
                  city: countryCode.city,
                  country: countryCode.country,
                  hours: {
                    sunrise,
                    sunset
                  },
                  restaurant: infoRestaurant[0],
                  points: infoRestaurant[1],
                  event: results[3].data._embedded.events,
                  user: req.user
                })
              })
              .catch(err => console.log(`Error al traer los datos de BD`, err))


            //si no pedimos todos
          } else {
            Promise.all([newsPromise, infoPromise, weatherPromise, restaurantsPromise, pointOfInterestPromise, eventsPromise])
              .then(results => {
                // IMPORTANTE NO TOCAR DE AQUI
                let sunrise, sunset
                if (results[2] === undefined) {
                  results[2] = {
                    data: ""
                  }
                } else {
                  sunrise = (new Date(results[2].data.city.sunrise * 1000)).toLocaleTimeString("en-UK")
                  sunset = (new Date(results[2].data.city.sunset * 1000)).toLocaleTimeString("en-UK")
                }
                // A AQUI
                saveInfo(results[3], countryCode.city, Restaurants)
                saveInfo(results[4], countryCode.city, PopularPlace)
                res.render('index', {
                  news: results[0].data.articles,
                  info: results[1].data,
                  weather: results[2].data,
                  city: countryCode.city,
                  country: countryCode.country,
                  hours: {
                    sunrise,
                    sunset
                  },
                  restaurant: results[3],
                  points: results[4],
                  event: results[5].data._embedded.events,
                  user: req.user
                })
              })
              .catch(err => console.log(`Error al traer los datos de la API`, err))

          }
        })
        .catch(err => console.log(err))


    })
    .catch(err => console.log(`Error al buscar el codigo de pais`, err))
})

router.post('/api/city/iamhere/:city', (req, res, next) => {
  let city = req.params.city.toLowerCase()
  let userLocation = req.user.location

  console.log(req.user.location)

  if (city === userLocation) {
    User.findByIdAndUpdate(req.user._id, { location: null })
      .then(res.redirect('/?city=' + city))
      .catch(err => console.log('Error consultando la BBDD: ', err))
  } else {
    User.findByIdAndUpdate(req.user._id, { location: city })
      .then(res.redirect('/?city=' + city))
      .catch(err => console.log('Error consultando la BBDD: ', err))
  }


});

router.get('/userList', (req, res) => {
  User.find()
    .then(allUsers => res.render('/user-list', {
      users: allUsers
    }))
    .catch(err => console.log('Error consultando la BBDD: ', err))
})

module.exports = router
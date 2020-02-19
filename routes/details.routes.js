const express = require('express')
const router = express.Router()
const eventsAPIHandler = require('../services/EventsAPIHandler')
const searchAPIHandler = require('../services/SearchAPIHandler')
const newsAPIHandler = require('../services/NewsAPIHandler')
const weatherAPIHandler = require('../services/WeatherAPIHandler')
const restaurantsAPIHandler = require('../services/RestaurantAPIHandler')
const pointOfInterestAPIHandler = require('../services/PointOfInterestAPIHandler')
const weatherAPI = new weatherAPIHandler()
const eventsAPI = new eventsAPIHandler()
const restaurantsAPI = new restaurantsAPIHandler()
const newsAPI = new newsAPIHandler()
const pointsOfInterestAPI = new pointOfInterestAPIHandler()

router.get('/weather', (req, res, next) => {
  let city = req.query.city
  weatherAPI.getWeather(`${city}`)
    .then(response => {
      console.log(response.data)
      let sunrise, sunset
      if (response === undefined) {
        response = {
          data: ""
        }
      } else {
        sunrise = (new Date(response.data.city.sunrise * 1000)).toLocaleTimeString("en-UK")
        sunset = (new Date(response.data.city.sunset * 1000)).toLocaleTimeString("en-UK")
      }

      res.render('details/weather', {
        weather: response.data,
        hours: {
          sunrise,
          sunset
        },
        city
      })
    })
    .catch(err => console.log(`Error al buscar el tiempo ${err}`))
})

router.get('/info', (req, res, next) => {
  res.render('details/info')
})

router.get('/news', (req, res, next) => {
  let city = req.query.city
  let country = req.query.country
  newsAPI.getNews(`${country}`)
    .then(news => {
      res.render('details/news', {
        new: news.data.articles,
        city
      })
    })
    .catch(err => console.log(`Error al buscar el codigo de pais ${err}`))
})

router.get('/events/:city', (req, res, next) => {
  let city = req.params.city
  eventsAPI.getEvents(`${city}`)
    .then(events => {
      res.render('details/events', {
        event: events.data._embedded.events,
        city
      })
    })
    .catch(err => console.log(`Error al buscar el codigo de pais ${err}`))
})

router.get('/restaurants', (req, res, next) => {
  let city = req.query.city
  let country = req.query.country
  restaurantsAPI.getRestaurants(`${city}`, `${country}`)
    .then(restaurant => {
      res.render('details/restaurants', {
        restaurant,
        city
      })
    })
})

router.get('/popular-place', (req, res, next) => {
  let city = req.query.city
  let country = req.query.country
  pointsOfInterestAPI.getPointsOfInterest(`${city}`, `${country}`)
    .then(popular => {
      res.render('details/popularPlace', {
        popular,
        city
      })
    })
})



module.exports = router
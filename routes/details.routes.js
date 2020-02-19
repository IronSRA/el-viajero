const express = require('express')
const router = express.Router()
const eventsAPIHandler = require('../services/EventsAPIHandler')
const searchAPIHandler = require('../services/SearchAPIHandler')
const newsAPIHandler = require('../services/NewsAPIHandler')
const weatherAPIHandler = require('../services/WeatherAPIHandler')
const restaurantsAPIHandler = require('../services/RestaurantAPIHandler')
const searchCountry = new searchAPIHandler()
const weatherAPI = new weatherAPIHandler()
const eventsAPI = new eventsAPIHandler()
const restaurantsAPI = new restaurantsAPIHandler()
const newsAPI = new newsAPIHandler()

router.get('/weather/:city', (req, res, next) => {
  let city = req.params.city
  console.log(`WEATHER DETAILS CITY ${city}`)
  searchCountry.getCountry(city)
    .then(countryCode => {
      console.log(`WEATHER DETAILS countrycode ${countryCode.city}`)
      weatherAPI.getWeather(`${countryCode.city}`)
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
            city: city
          })
        })
        .catch(err => console.log(`Error al buscar el tiempo ${err}`))
    })
    .catch(err => console.log(`Error al buscar el codigo de pais ${err}`))
})
router.get('/info', (req, res, next) => {
  res.render('details/info')
})
router.get('/news/:city', (req, res, next) => {
  let city = req.params.city
  searchCountry.getCountry(city)
    .then(countryCode => {
      newsAPI.getNews(`${countryCode.country}`)
        .then(news => {
          res.render('details/news', { new: news.data.articles })
        })
        .catch(err => console.log(`Error al buscar el codigo de pais ${err}`))
    })
    .catch(err => console.log(`Error al buscar el codigo de pais ${err}`)
    )
})
router.get('/events/:city', (req, res, next) => {
  let city = req.params.city
  eventsAPI.getEvents(`${city}`)
    .then(events => {
      console.log(events.data._embedded.events)
      res.render('details/events', {
        event: events.data._embedded.events
      })
    })
    .catch(err => console.log(`Error al buscar el codigo de pais ${err}`))
})

router.get('/restaurants', (req, res, next) => {
  let city = req.query.city
  let country = req.query.country
  restaurantsAPI.getRestaurants(`${city}`, `${country}`)
    .then(restaurant => {
      console.log(restaurant)
      res.render('details/restaurants', {
        restaurant
      }
      )
    })
})

router.get('/points-of-interest', (req, res, next) => {
  res.render('details/points-of-interest')
})


module.exports = router
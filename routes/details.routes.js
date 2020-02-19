const express = require('express')
const router = express.Router()
const searchAPIHandler = require('../services/SearchAPIHandler')
const weatherAPIHandler = require('../services/WeatherAPIHandler')
const searchCountry = new searchAPIHandler()
const weatherAPI = new weatherAPIHandler()

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
router.get('/news', (req, res, next) => {
  res.render('details/news')
})
router.get('/events', (req, res, next) => {
  res.render('details/events')
})
router.get('/restaurants', (req, res, next) => {
  res.render('details/restaurants')
})
router.get('/points-of-interest', (req, res, next) => {
  res.render('details/points-of-interest')
})


module.exports = router
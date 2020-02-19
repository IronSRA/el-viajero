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
          console.log(req.user)
          // A AQUI
          console.log(results[3][0].geometry.location)
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
        .catch(err => console.log(`Error al traer los datos ${err}`))
    })
    .catch(err => console.log(`Error al buscar el codigo de pais ${err}`))
})

router.post('/api/city/like/:city', (req, res, next) => {
  let city = req.params.city
  console.log(req.user)
  User.findByIdAndUpdate(req.user.id, { location: city })

    .then(res.redirect('/'))
    .catch(err => console.log('Error consultando la BBDD: ', err))
});

router.get('/userList', (req, res) => {
  User.find()
    .then(allUsers => res.render('/user-list', {
      users: allUsers
    }))
    .catch(err => console.log('Error consultando la BBDD: ', err))
})

module.exports = router
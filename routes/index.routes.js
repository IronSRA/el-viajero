const express = require('express')
const router = express.Router()
const User = require('../models/User.model')
const uploadCloud = require('../configs/cloudinary.config');
const searchAPIHandler = require('../services/SearchAPIHandler')
const newsAPIHandler = require('../services/NewsAPIHandler')
const infoAPIHandler = require('../services/BasicAPIHandler')
const weatherAPIHandler = require('../services/WeatherAPIHandler')
const restaurantsAPIHandler = require('../services/RestaurantAPIHandler')
const searchCountry = new searchAPIHandler()
const newsAPI = new newsAPIHandler()
const infoAPI = new infoAPIHandler()
const weatherAPI = new weatherAPIHandler()
const restaurantsAPI = new restaurantsAPIHandler()

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


      Promise.all([newsPromise, infoPromise, weatherPromise, restaurantsPromise])
        .then(results => {
          console.log(results[2].data.list[0])
          results[2] === undefined ? results[2] = {
            data: ""
          } : null
          let sunrise = (new Date(results[2].data.city.sunrise * 1000)).toLocaleTimeString("en-UK")
          let sunset = (new Date(results[2].data.city.sunset * 1000)).toLocaleTimeString("en-UK")
          console.log(results[3])
          res.render('index', {
            news: results[0].data.articles,
            info: results[1].data,
            weather: results[2].data,
            city: countryCode.city,
            hours: {
              sunrise,
              sunset
            },
            restaurant: results[3].data.results
          })
        })
        .catch(err => console.log(err))
    })
    .catch(err => console.log(err))
})

router.get('/profile', checkLoggedIn, (req, res) => res.render('profile', {
  user: req.user
}));

router.post('/profile', uploadCloud.single('phototoupload'), (req, res, next) => {

  req.user.picture = req.file.secure_url
  res.render('authentication/profile', {
    user: req.user
  });
})

router.get('/userList', (req, res) => {
  User.find()
    .then(allUsers => res.render('/user-list', {
      users: allUsers
    }))
    .catch(err => console.log('Error consultando la BBDD: ', err))
})

module.exports = router
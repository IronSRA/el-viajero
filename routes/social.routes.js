const express = require('express')
const router = express.Router()
const {
  ensureLoggedIn,
  ensureLoggedOut
} = require('connect-ensure-login')
const User = require('../models/User.model')

const checkLoggedIn = (req, res, next) => req.user ? next() : res.render('index', {
  loginErrorMessage: 'Zona restringida a usuarios registrados'
})

router.get('/', checkLoggedIn, (req, res, next) => {
  User.find({
      location: req.user.location
    }).populate('message.author')
    .then(allUsers => {
      res.render('social/list', {
        allUsers,
        user: req.user
      })
    })
    .catch(err => console.log(err))
})

router.post('/city/iamhere/:city', (req, res, next) => {
  let city = req.params.city.toLowerCase()
  let userLocation = req.user.location

  if (city === userLocation) {
    User.findByIdAndUpdate(req.user._id, {
        location: null
      })
      .then(res.redirect('/?city=' + city))
      .catch(err => console.log('Error consultando la BBDD: ', err))
  } else {
    User.findByIdAndUpdate(req.user._id, {
        location: city
      })
      .then(res.redirect('/?city=' + city))
      .catch(err => console.log('Error consultando la BBDD: ', err))
  }
});

module.exports = router
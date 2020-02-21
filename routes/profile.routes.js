const express = require('express')
const passport = require('passport')
const router = express.Router()
const {
  ensureLoggedIn,
  ensureLoggedOut
} = require('connect-ensure-login')
const uploadCloud = require('../configs/cloudinary.config')
const User = require('../models/User.model')

const checkLoggedIn = (req, res, next) => req.user ? next() : res.render('index', {
  loginErrorMessage: 'Zona restringida a usuarios registrados'
})

router.get('/', checkLoggedIn, (req, res) => res.render('profile/profile', {
  user: req.user
}));

router.post('/', uploadCloud.single('phototoupload'), (req, res, next) => {
  User.findByIdAndUpdate(req.user.id, {
    image: req.file.secure_url
  })
    .then(() => res.redirect('/profile'))
    .catch(err => next(err))
});

router.post('/newpicture', uploadCloud.single('imagesupload'), (req, res, next) => {
  User.findByIdAndUpdate(req.user.id, {
    $push: {
      pictures: {
        image: req.file.secure_url,
        description: req.body.description
      }
    }
  })
    .then(() => res.redirect('/profile'))
    .catch(err => next(err))
});

router.post('/fav/city/:city', (req, res, next) => {
  let city = req.params.city
  let userFavCities = []

  User.findById(req.user._id)
    .then(response => {
      userFavCities = [...response.favourites.cities]
      if (response.favourites.cities.includes(city)) {
        userFavCities.splice(userFavCities.indexOf(city), 1)
        User.findByIdAndUpdate(req.user._id, {
          "favourites.cities": userFavCities
        })
          .catch(err => console.log(`Error: ${err}`))
      } else {
        userFavCities.push(city)
      }
      User.findByIdAndUpdate(req.user._id, {
        "favourites.cities": userFavCities
      })
        .catch(err => console.log(`Error: ${err}`))
    })
    .catch(err => console.log(`Error: ${err}`))
});

module.exports = router
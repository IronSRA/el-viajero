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
      console.log(req.user)
      console.log(allUsers)
      res.render('social/list', {
        allUsers,
        user: req.user
      })
    })
    .catch(err => next(err))
})

module.exports = router
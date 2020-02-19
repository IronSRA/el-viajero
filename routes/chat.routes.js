const express = require('express')
const passport = require('passport')
const router = express.Router()
const {
  ensureLoggedIn,
  ensureLoggedOut
} = require('connect-ensure-login')
const uploadCloud = require('../configs/cloudinary.config')
const User = require('../models/User.model')
const Post = require('../models/Post.model')

const checkLoggedIn = (req, res, next) => req.user ? next() : res.render('index', {
  loginErrorMessage: 'Zona restringida a usuarios registrados'
})

router.get('/', checkLoggedIn, (req, res) => {
  Post.find()
    .then(allPosts => res.render('chat', { allPosts }))
    .catch(err => next(err))
});

router.get('/post', (req, res, next) => {
  Post.find()
    .then(allPosts => res.render('chat', { allPosts }))
    .catch(err => next(err))
})

router.post('/post', (req, res, next) => {
  const newEntry = {
    //post_author_id: req.user.id,
    post_text: req.body.description
  }
  Post.create({ newEntry })
    .then(() => {
      console.log(newEntry)
      res.redirect('/chat')
    })
    .catch(err => next(new Error(err)))
})

module.exports = router
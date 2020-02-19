const express = require('express')
const passport = require('passport')
const router = express.Router()
const {
  ensureLoggedIn,
  ensureLoggedOut
} = require('connect-ensure-login')
const uploadCloud = require('../configs/cloudinary.config')
const User = require('../models/User.model')
const Chat = require('../models/Chat.model')

const checkLoggedIn = (req, res, next) => req.user ? next() : res.render('index', {
  loginErrorMessage: 'Zona restringida a usuarios registrados'
})

router.get('/:id', checkLoggedIn, (req, res, next) => {
  Chat.find({
      $and: [{
        "message.user": {
          $in: req.user._id
        }
      }, {
        "message.user": {
          $in: req.params.id
        }
      }]
    }).populate('message.author')
    .then(allMessages => {
      res.render('chat/chat', {
        allMessages,
        receptor: req.params.id,
        user: req.user
      })
    })
    .catch(err => next(err))
});

router.post('/', (req, res, next) => {
  console.log(req.user)
  const newComment = {
    message: {
      user: [req.user._id, '5e4c22825cca96001794c9f5'],
      author: req.user._id,
      message: req.body.message,
      user: req.user
    }
  }
  console.log(newComment)
  Chat.create(newComment)
    .then(() => res.redirect('/chat'))
    .catch(err => next(err))
})

router.post('/post', (req, res, next) => {
  const newEntry = {
    name: req.body.name,
    message: req.body.message
  }
  Chat.create({
      newEntry
    })
    .then(() => {
      console.log(newEntry)
      res.redirect('/chat')
    })
    .catch(err => next(new Error(err)))
})

module.exports = router
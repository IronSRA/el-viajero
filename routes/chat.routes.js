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
  console.log("GET")
  Chat.find({
      $and: [{
        "message.users.sender": {
          $in: [req.params.id, req.user._id]
        }
      }, {
        "message.users.receptor": {
          $in: [req.user._id, req.params.id]
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

router.post('/:id', (req, res, next) => {
  // console.log(`Receptor ${req.params.id}`)
  const newComment = {
    message: {
      users: {
        sender: req.user._id,
        receptor: req.params.id
      },
      author: req.user._id,
      message: req.body.message,
      user: req.user
    }
  }
  console.log(newComment)
  Chat.create(newComment)
    .then(() => res.redirect(`/chat/${req.params.id}`))
    .catch(err => next(err))
})

module.exports = router
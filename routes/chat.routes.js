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

router.get('/user/:id/:name', checkLoggedIn, (req, res, next) => {
  res.render('chat/chat', {
    receptor: req.params.id,
    receptorName: req.params.name,
    user: req.user
  })
});

router.get('/:id', checkLoggedIn, (req, res, next) => {
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
      res.json(allMessages)
    })
    .catch(err => console.log(err))
});

router.post('/:id', (req, res, next) => {
  console.log("POST!")
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
    .then(() => res.json({
      status: 'popino'
    }))
    .catch(err => console.log(`Error chat ${err}`))
})

module.exports = router
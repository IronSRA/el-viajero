const express = require('express')
const router = express.Router()
const User = require('../models/User.model')
const uploadCloud = require('../configs/cloudinary.config');

const isAdmin = user => user && user.role === 'Admin'

const checkLoggedIn = (req, res, next) => req.user ? next() : res.render('index', {
  loginErrorMessage: 'Zona restringida a usuarios registrados'
})
router.get('/profile', checkLoggedIn, (req, res) => res.render('profile', {
  user: req.user
}));

router.post('/profile', uploadCloud.single('phototoupload'), (req, res, next) => {
  User.findByIdAndUpdate(req.user.id, {
      image: req.file.secure_url
    })
    .then(() => res.redirect('/profile'))
    .catch(err => next(err))
});

router.post('/profile/newpicture', uploadCloud.single('imagesupload'), (req, res, next) => {
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
})

module.exports = router
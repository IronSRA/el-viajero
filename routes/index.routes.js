const express = require('express')
const router = express.Router()
const User = require('../models/User.model')
const uploadCloud = require('../configs/cloudinary.config');
const searchAPIHandler = require('../services/SearchAPIHandler')
const newsAPIHandler = require('../services/NewsAPIHandler')
const infoAPIHandler = require('../services/BasicAPIHandler')
const searchCountry = new searchAPIHandler()
const newsAPI = new newsAPIHandler()
const infoAPI = new infoAPIHandler()

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

      Promise.all([newsPromise, infoPromise])
        .then(results => {
          console.log(results[1].data)

          res.render('index', {
            news: results[0].data.articles,
            info: results[1].data
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
  User.findByIdAndUpdate(req.user.id, { image: req.file.secure_url })
    .then(() => res.redirect('/profile'))
    .catch(err => next(err))
});

router.post('/profile/newpicture', uploadCloud.single('imagesupload'), (req, res, next) => {
  User.findByIdAndUpdate(req.user.id, { $push: { pictures: { image: req.file.secure_url, description: req.body.description } } })
    .then(() => res.redirect('/profile'))
    .catch(err => next(err))

});


router.get('/userList', (req, res) => {
  User.find()
    .then(allUsers => res.render('/user-list', {
      users: allUsers
    }))
    .catch(err => console.log('Error consultando la BBDD: ', err))
})

module.exports = router
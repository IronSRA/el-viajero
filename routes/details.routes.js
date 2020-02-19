const express = require('express')
const router = express.Router()
const eventsAPIHandler = require('../services/EventsAPIHandler')
const eventsAPI = new eventsAPIHandler()

router.get('/weather', (req, res, next) => {
  res.render('details/weather')
})
router.get('/info', (req, res, next) => {
  res.render('details/info')
})
router.get('/news', (req, res, next) => {
  res.render('details/news')
})
router.get('/events', (req, res, next) => {
  res.render({ event: results[5].data._embedded.events })
  res.render('details/events')
})
router.get('/restaurants', (req, res, next) => {
  res.render('details/restaurants')
})
router.get('/points-of-interest', (req, res, next) => {
  res.render('details/points-of-interest')
})


module.exports = router
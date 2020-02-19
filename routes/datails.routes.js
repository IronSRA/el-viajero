const express = require('express')
const router = express.Router()

router.get('/weather', (req, res, next) => {
  res.render('details/weather')
})

module.exports = router
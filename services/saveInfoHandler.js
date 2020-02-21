const Restaurants = require('../models/Restaurant.model.js')
const PopularPlace = require('../models/PopularPoint.model.js')


function savePlace(info, city, type) {
  info.forEach(elm => {

    type.create({

      city,
      name: elm.name,
      rating: elm.rating,
      geometry: elm.geometry,
      address: elm.vicinity,
      photos: elm.photos,
      website: elm.url,
      photos: elm.photos

    })
  })
}

module.exports = savePlace
const axios = require('axios').default;

class pointOfInterestAPIHandler {
  constructor() {
    this.apiKey = process.env.SEARCHAPI
    this.axiosApp = axios.create({
      baseURL: 'https://maps.googleapis.com/maps/api'
    })
  }

  getCityLatLng(city, country) {
    return this.axiosApp.get(`geocode/json?components=locality:${city}|country:${country}&key=${this.apiKey}`)
      .then(response => {
        const geometry = {
          lat: response.data.results[0].geometry.location.lat,
          lng: response.data.results[0].geometry.location.lng
        }
        return geometry
      })
      .catch(err => console.log(err))
  }

  getPointsOfInterest(city, country) {
    return this.getCityLatLng(city, country)
      .then(geometry => {
        return this.axiosApp.get(`place/nearbysearch/json?location=${geometry.lat}%2C${geometry.lng}&radius=50000&address_components=point_of_interest&key=${this.apiKey}`)
      })
      // .then(pointOfinterest => {
      //   let photo = []
      //   let info = pointOfinterest.data.results
      //   let pointOfinterests = {
      //     photo,
      //     info
      //   }
      //   pointOfinterest.data.results.forEach(elm => {
      //     let reference = elm.photos[0].photo_reference
      //     return this.axiosApp.get(`https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${reference}&key=${this.apiKey}`)
      //       .then(res => {
      //         photo.push(res.data)
      //         return pointOfinterests
      //       })

      //   })
      //})
      .catch(error => console.log('Oh No! Error is: ', error))
  }


}

module.exports = pointOfInterestAPIHandler
const axios = require('axios').default;

class pointOfInterestAPIHandler {
  constructor() {
    this.apiKey = process.env.SEARCHAPI
    this.axiosApp = axios.create({
      baseURL: 'https://maps.googleapis.com/maps/api'
    })
  }

  // getCityLatLng(city, country) {
  //   return this.axiosApp.get(`geocode/json?components=locality:${city}|country:${country}&key=${this.apiKey}`)
  //     .then(response => {
  //       const geometry = {
  //         lat: response.data.results[0].geometry.location.lat,
  //         lng: response.data.results[0].geometry.location.lng
  //       }
  //       return geometry
  //     })
  //     .catch(err => console.log(err))
  // }

  getPointsOfInterest(city, country) {
    return this.axiosApp.get(`place/textsearch/json?query=${city}+${country}+point+of+interest&key=${this.apiKey}`)
      .catch(error => console.log('Oh No! Error is: ', error))
  }


}

module.exports = pointOfInterestAPIHandler
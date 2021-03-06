const axios = require('axios').default;

class restaurantsAPIHandler {
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

  getUrl(info) {

    let urlPromises = info.map(elm => {
      let reference = elm.place_id
      return this.axiosApp.get(`https://maps.googleapis.com/maps/api/place/details/json?placeid=${reference}&key=${this.apiKey}`)
        .then(res => {
          elm.url = res.data.result.url
          return elm
        })
        .catch(err => console.log(err))

    })
    return Promise.all(urlPromises)
      .then(allPromisesResult => allPromisesResult)
      .catch(err => console.log(err))
  }

  getRestaurants(city, country) {
    return this.getCityLatLng(city, country)
      .then(geometry => {
        return this.axiosApp.get(`place/nearbysearch/json?location=${geometry.lat}%2C${geometry.lng}&rankby=distance&keyword=restaurant&key=${this.apiKey}`)
      })
      .then(restaurant => {
        let info = restaurant.data.results
        return this.getUrl(info)
      })
      .catch(err => console.log(err))
  }


}

module.exports = restaurantsAPIHandler
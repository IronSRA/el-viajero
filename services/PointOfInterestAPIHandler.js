const axios = require('axios').default;

class pointOfInterestAPIHandler {
  constructor() {
    this.apiKey = process.env.SEARCHAPI
    this.axiosApp = axios.create({
      baseURL: 'https://maps.googleapis.com/maps/api'
    })
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

  getPointsOfInterest(city, country) {
    return this.axiosApp.get(`place/textsearch/json?query=${city}+${country}+point+of+interest&key=${this.apiKey}`)
      .then(popularPlaces => {
        let info = popularPlaces.data.results
        return this.getUrl(info)
      })
      .catch(err => console.log(err))
  }


}

module.exports = pointOfInterestAPIHandler
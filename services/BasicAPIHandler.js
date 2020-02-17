const axios = require('axios').default

class InfoAPIHandler {
  constructor() {
    this.axiosApp = axios.create({
      baseURL: `https://restcountries.eu/rest/v2/alpha/`
    })
  }

  getInfo(country) {
    return this.axiosApp.get(`${country}`)
      .catch(error => console.log('Oh No! Error is: ', error))
  }
}

module.exports = InfoAPIHandler
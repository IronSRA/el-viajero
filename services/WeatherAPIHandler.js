const axios = require('axios').default;

class weatherAPIHandler {
  constructor() {
    this.api = process.env.WEATHERKEY
    this.axiosApp = axios.create({
      baseURL: `http://api.openweathermap.org/data/2.5`
    })
  }

  getWeather(city) {
    return this.axiosApp.get(`forecast?q=${city}&units=metric&APPID=${this.api}`)
      .catch(error => console.log('Oh No! Error is: ', error))
  }
}

module.exports = weatherAPIHandler
const axios = require('axios').default;

class eventsAPIHandler {
  constructor() {
    this.apiKey = process.env.EVENTKEY
    this.axiosApp = axios.create({ baseURL: `https://app.ticketmaster.com/discovery/v2/` })
  }

  getEvents(city) { return this.axiosApp.get(`/events.json?city=${city}&apikey=${this.apiKey}`) }
}

module.exports = eventsAPIHandler
const axios = require('axios').default;

class NewsAPIHandler {
  constructor() {
    this.api = process.env.NEWSAPI
    this.axiosApp = axios.create({
      baseURL: `https://newsapi.org/v2`
    })
  }

  getNews(country) {
    return this.axiosApp.get(`/top-headlines?country=${country}&apiKey=${this.api}`)
      .catch(error => console.log('Oh No! Error is: ', error))
  }
}

module.exports = NewsAPIHandler
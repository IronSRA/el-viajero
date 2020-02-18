const axios = require('axios').default;

class SearchAPIHandler {
  constructor(baseUrl) {
    this.BASE_URL = 'https://maps.googleapis.com/maps/api/geocode';
    this.apiKey = process.env.SEARCHAPI
    this.axiosApp = axios.create({
      baseURL: this.BASE_URL
    })
  }

  getCountry(city) {
    return this.axiosApp.get(`/json?address=${city}&key=${this.apiKey}`)
      .then(response => {
        let city = ""
        let infoCountry = response.data.results[0].address_components.filter(pro => (pro.types[0] === "country"));
        let infoCity = response.data.results[0].address_components.filter(pro => (pro.types[0] === "locality"));
        let country = infoCountry[0].short_name
        if (infoCity != "") {
          city = infoCity[0].short_name
        }
        return {
          city: city,
          country: country
        }
      })
      .catch(error => console.log('Oh No! Error is: ', error))
  }
}

module.exports = SearchAPIHandler
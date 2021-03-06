class RestaurantsAPIHandler {
  constructor() {
    this.apiKey = process.env.GOOGLE_MAPS_API
    this.axiosApp = axios.create({
      baseURL: 'https://cors-anywhere.herokuapp.com/' + 'https://maps.googleapis.com/maps/api'
    })
  }

  getCityLatLng(city, country) {
    return this.axiosApp.get(`geocode/json?components=locality:${city}|country:${country}&key=${this.apiKey}`)
      .then(responce => {
        const geometry = {
          lat: responce.data.results[0].geometry.location.lat,
          lng: responce.data.results[0].geometry.location.lng
        }
        return geometry
      })
      .catch(err => console.log(err))
  }

  getRestaurants(city, country) {
    this.getCityLatLng(city, country)
      .then(geometry => {
        return this.axiosApp.get(`place/nearbysearch/json?location=${geometry.lat}%2C${geometry.lng}&radius=50000&keyword=restaurant&point_of_interest&key=${this.apiKey}`)
      })
      .catch(err => console.log(err))
  }
}
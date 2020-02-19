class RestaurantsAPIHandler {
  constructor() {
    this.apiKey = 'AIzaSyCFPhuSzSAR4FzJmO0eMimZ7B_XRD4FOJY'
    this.axiosApp = axios.create({
      baseURL: "https://cors-anywhere.herokuapp.com/" + 'https://maps.googleapis.com/maps/api'
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
          .then(response => {
            console.log(response, "res de getrestaurants")
          })
          .catch(err => console.log(err, "error de getrestaurants"))
      })
  }
}
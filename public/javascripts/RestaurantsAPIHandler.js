class RestaurantsAPIHandler {
  constructor(baseUrl) {
    this.BASE_URL = baseUrl;
    this.apiKey = 'AIzaSyCFPhuSzSAR4FzJmO0eMimZ7B_XRD4FOJY'
    this.axiosApp = axios.create({
      baseURL: 'https://maps.googleapis.com/maps/api/geocode/json'
    })
  }

  getCityLatLng(city, country) {
    return this.axiosApp.get(`${this.BASE_URL}?components=locality:${city}|country:${country}&key=${this.apiKey}`)
  }
}
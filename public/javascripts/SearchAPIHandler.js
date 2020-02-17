let country = ""
class SearchAPIHandler {
  constructor(baseUrl) {
    this.BASE_URL = baseUrl;
    this.apiKey = 'AIzaSyD44K0JK21Zr3D_vx2B1VKPoxwei7vzwfM'
    this.axiosApp = axios.create({
      baseURL: this.BASE_URL
    })
  }

  getCountry(city) {

    return this.axiosApp.get(`/json?address=${city}&key=${this.apiKey}`)
      .then(response => {
        let end = response.data.results[0].address_components.length
        country = response.data.results[0].address_components[end - 1].short_name
        return country
      })
      .catch(error => console.log('Oh No! Error is: ', error))
  }
}
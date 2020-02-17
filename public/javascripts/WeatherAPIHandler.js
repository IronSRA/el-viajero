class WeatherAPIHandler {
  constructor(baseUrl) {
    this.BASE_URL = "https://cors-anywhere.herokuapp.com/" + baseUrl;
    this.axiosApp = axios.create({
      baseURL: this.BASE_URL,

    })
  }

  getWeather(city) {

    this.axiosApp.get(`/location/search/?query=${city}`)
      .then(response => {
        const woeid = response.data[0].woeid
        getInfo(woeid)
      })
      .catch(error => console.log('Oh No! Error is: ', error))

    let getInfo = woeid => {
      this.axiosApp.get(`/location/${woeid}`)
        .then(response => {

          const detailsWeather = `<h4>${response.data.title}</h4>
          <p>${response.data.consolidated_weather[0].applicable_date}</p>
          <h3>${response.data.consolidated_weather[0].weather_state_name}</h3>
          <p>La temperatura maxima ${response.data.consolidated_weather[0].max_temp}
          y la temperatura minima ${response.data.consolidated_weather[0].min_temp}
          <p>La humedad es: ${response.data.consolidated_weather[0].humidity}
          las precipitaciones: ${response.data.consolidated_weather[0].predictability}</p>
          el viento:${response.data.consolidated_weather[0].wind_speed}
          el amanece:${response.data.sun_rise} y anochece: ${response.data.sun_set} 
          `

          document.querySelector('.infoWeather').innerHTML += detailsWeather

        })
    }
  }
}
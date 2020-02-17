const googleAPI = new SearchAPIHandler('https://maps.googleapis.com/maps/api/geocode')
const newsAPI = new NewsAPIHandler()
const weatherAPI = new WeatherAPIHandler("https://www.metaweather.com/api")
const basicAPI = new InfoAPIHandler()
const restaurantsAPI = new RestaurantsAPIHandler()

document.addEventListener('DOMContentLoaded', () => {

  document.getElementById('search').onclick = e => {
    event.preventDefault()
    const city = document.getElementById('citySearch').value

    //
    googleAPI.getCountry(city)
      .then(country => {
        weatherAPI.getWeather(city)
        newsAPI.getNews(country)
        basicAPI.getInfo(country)
        restaurantsAPI.getRestaurants(city, country)
      })
      .catch(err => console.log(err))
  };


}, false);
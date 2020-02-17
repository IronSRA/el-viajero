const googleAPI = new SearchAPIHandler('https://maps.googleapis.com/maps/api/geocode')
const newsAPI = new NewsAPIHandler()
const weatherAPI = new WeatherAPIHandler("https://www.metaweather.com/api")
const basicAPI = new InfoAPIHandler()
const restaurantsAPI = new RestaurantsAPIHandler()
const pointsOfInterest = new PointsOfInterestAPIHandler()
const country = ''

document.addEventListener('DOMContentLoaded', () => {

  document.getElementById('search').onclick = e => {
    event.preventDefault()
    const citySearch = document.getElementById('citySearch').value

    //
    googleAPI.getCountry(citySearch)
      .then(city => {
        //console.log(city)
        weatherAPI.getWeather(city[0])
        newsAPI.getNews(city[1])
        basicAPI.getInfo(city[1])
        restaurantsAPI.getRestaurants(city, country)
        pointsOfInterest.getPointsOfInterest(city, country)
      })
      .catch(err => console.log(err))
  };


}, false);
const googleAPI = new SearchAPIHandler('https://maps.googleapis.com/maps/api/geocode')
const newsAPI = new NewsAPIHandler()
const weatherAPI = new WeatherAPIHandler("https://www.metaweather.com/api")
const basicAPI = new InfoAPIHandler()

document.addEventListener('DOMContentLoaded', () => {


  document.getElementById('search').onclick = e => {
    event.preventDefault()
    const citySearch= document.getElementById('citySearch').value

    //request news

    //
    googleAPI.getCountry(citySearch)
      .then(city => {
        console.log(city)
        weatherAPI.getWeather(city[0])
        newsAPI.getNews(city[1])
        basicAPI.getInfo(city[1])
      })
      .catch(err => console.log(err))
  };


}, false);
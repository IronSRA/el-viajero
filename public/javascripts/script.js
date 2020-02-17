const googleAPI = new SearchAPIHandler('https://maps.googleapis.com/maps/api/geocode')
const newsAPI = new NewsAPIHandler()
const weatherAPI = new WeatherAPIHandler("https://www.metaweather.com/api")
const basicAPI = new InfoAPIHandler()
const eventAPI = new EventsAPIHandler(`https://app.ticketmaster.com/discovery/v2`)

document.addEventListener('DOMContentLoaded', () => {


  document.getElementById('search').onclick = e => {
    event.preventDefault()
    const citySearch= document.getElementById('citySearch').value

    //request news

    //
    googleAPI.getCountry(citySearch)
      .then(city => {
        weatherAPI.getWeather(city[0])
        eventAPI.getEvents(city[0])
        newsAPI.getNews(city[1])
        basicAPI.getInfo(city[1])
      })
      .catch(err => console.log(err))
  };


}, false);
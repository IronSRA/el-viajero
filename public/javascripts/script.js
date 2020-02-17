const search = new SearchAPIHandler('https://maps.googleapis.com/maps/api/geocode')
// const newsAPI = new NewsAPIHandler()
const restaurantsAPI = new RestaurantsAPIHandler()

document.addEventListener('DOMContentLoaded', () => {

  document.getElementById('search').onclick = e => {
    event.preventDefault()
    const city = document.getElementById('citySearch').value


    search.getCountry(city)
      .then(country => {
        //request news
        newsAPI.getNews(country)
        //request restaurants
        restaurantsAPI.getCityLatLng(city, country)
        //console.log(city, country)
      })
      .catch(err => console.log(err))
  };


}, false);
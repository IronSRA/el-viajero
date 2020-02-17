const search = new SearchAPIHandler('https://maps.googleapis.com/maps/api/geocode')
const newsAPI = new NewsAPIHandler()
const basicAPI = new InfoAPIHandler()

document.addEventListener('DOMContentLoaded', () => {


  document.getElementById('search').onclick = e => {
    event.preventDefault()
    const city = document.getElementById('citySearch').value

    //request news

    //
    search.getCountry(city)
      .then(country => {
        console.log(country)
        newsAPI.getNews(country)
        basicAPI.getInfo(country)
      })
      .catch(err => console.log(err))
  };


}, false);
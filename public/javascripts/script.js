const search = new SearchAPIHandler('https://maps.googleapis.com/maps/api/geocode')
const newsAPI = new NewsAPIHandler()

document.addEventListener('DOMContentLoaded', () => {


  document.getElementById('search').onclick = e => {
    event.preventDefault()
    const city = document.getElementById('citySearch').value

    //request news

    //
    search.getCountry(city)
      .then(country => {

        newsAPI.getNews(country)
        console.log(country)
      })
      .catch(err => console.log(err))
  };


}, false);
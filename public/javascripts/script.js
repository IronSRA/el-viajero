const search = new SearchAPIHandler('https://maps.googleapis.com/maps/api/geocode')
const newsAPI = new NewsAPIHandler()

document.addEventListener('DOMContentLoaded', () => {
  newsAPI.getNews()
}, false);

document.getElementById('search').onclick = e => {
  event.preventDefault()
  const city = document.getElementById('citySearch').value
  search.getCountry(city)
    .then(a => console.log(a))
    .catch(err => console.log(err))
};
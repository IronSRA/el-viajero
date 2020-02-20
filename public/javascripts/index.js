const favButton = [...document.querySelectorAll('.fav')]
const locationButton = [...document.querySelectorAll('.location')]

// action="/api/city/like/{{city}}" method="post"

favButton.forEach(button => {
  button.onclick = () => {
    favButton.forEach(elem => elem.classList.toggle("hidden"))
  }
})

locationButton.forEach(button => {
  button.onclick = () => {
    Axios.post('/social/city/iamhere/')
    locationButton.forEach(elem => elem.classList.toggle("hidden"))
  }
})
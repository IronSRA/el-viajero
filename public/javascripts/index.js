const favButton = [...document.querySelectorAll('.fav')]
const locationButton = [...document.querySelectorAll('.location')]
const city = document.querySelector('.mainCityTitle').dataset.city
const userLocation = document.querySelector('.mainCityTitle').dataset.location
const favCity = [...document.querySelector('.mainCityTitle').dataset.favcity.split(',')]

favCity.includes(city) ? toggle(favButton) : null

userLocation === city ? toggle(locationButton) : null

favButton.forEach(button => button.onclick = () => {
  axios.post(`/profile/fav/city/${city}`)
  toggle(favButton)
})

locationButton.forEach(button => button.onclick = () => {
  axios.post(`/social/city/iamhere/${city}`)
  toggle(locationButton)
})

function toggle(element) {
  element.forEach(elem => elem.classList.toggle('hidden'))
}

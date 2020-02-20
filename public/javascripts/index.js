const favButton = [...document.querySelectorAll('.fav')]
const locationButton = [...document.querySelectorAll('.location')]
const city = document.querySelector('.mainCityTitle').innerHTML
const userLocation = document.querySelector('.mainCityTitle').dataset.location

userLocation === city ? toggle(locationButton) : null

favButton.forEach(button => {

  button.onclick = () => toggle(favButton)
})

locationButton.forEach(button => {
  button.onclick = () => {
    axios.post(`/social/city/iamhere/${city}`)
    toggle(locationButton)
  }
})

function toggle(element) {
  element.forEach(elem => elem.classList.toggle("hidden"))
}

// const weatherAPI = new WeatherAPIHandler("https://www.metaweather.com/api")
// const basicAPI = new InfoAPIHandler()


document.addEventListener('DOMContentLoaded', () => {

  /////////////////////////////////
  const city = document.querySelector('#citySearch').value

  document.getElementById("like-button").onclick = function (event) {
    event.preventDefault();

    axios.post('api/city/like/:id', visited_cities)
      .then(response => {
        console.log("You just updated visited cities with: ", response.data);

      })
      .catch(error => {
        console.log("Error is: ", error);
      })
  }

}, false);

async defer
src = "https://maps.googleapis.com/maps/api/js?key=process.env.GOOGLE_MAPS_API&callback=initMap"

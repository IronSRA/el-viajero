

window.onload = () => {
  const city = {
    lat: parseFloat(document.getElementById('latitud').innerText),
    lng: parseFloat(document.getElementById('longitud').innerText)
  };

  const markers = [...document.getElementsByClassName('marker')]

  const map = new google.maps.Map(document.getElementById('map'), {
    zoom: 17,
    center: city
  });

  markers.forEach(element => {


    markerPlace = {
      lat: parseFloat(element.querySelector("#latitud").innerText),
      lng: parseFloat(element.querySelector("#longitud").innerText),
    }
    console.log(element)
    new google.maps.Marker({
      position: markerPlace,
      map: map,
    })

  });






  document.addEventListener('DOMContentLoaded', () => {

    const city = document.querySelector('#citySearch').value

    document.getElementById("like-button").onclick = function (event) {
      alert("sdfasd")
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
};







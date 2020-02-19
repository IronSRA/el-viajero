window.onload = () => {
  const city = {
    lat: 41.386230,
    lng: 2.174980
  };

  const markers = []

  const map = new google.maps.Map(document.getElementById('map'), {
    zoom: 13,
    center: ironhackBCN
  });

  let center = {
    lat: undefined,
    lng: undefined
  };

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







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
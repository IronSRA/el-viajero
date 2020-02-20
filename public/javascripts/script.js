window.onload = () => {
  const city = {
    lat: parseFloat(document.getElementById('latitude').innerText),
    lng: parseFloat(document.getElementById('longitude').innerText)
  };

  const markers = [...document.getElementsByClassName('marker')]

  const map = new google.maps.Map(document.getElementById('map'), {
    zoom: 15,
    center: city,
    styles: [{
      "featureType": "administrative",
      "elementType": "all",
      "stylers": [{
        "visibility": "on"
      },
      {
        "lightness": 33
      }
      ]
    },
    {
      "featureType": "landscape",
      "elementType": "all",
      "stylers": [{
        "color": "#f2e5d4"
      }]
    },
    {
      "featureType": "poi.park",
      "elementType": "geometry",
      "stylers": [{
        "color": "#c5dac6"
      }]
    },
    {
      "featureType": "poi.park",
      "elementType": "labels",
      "stylers": [{
        "visibility": "on"
      },
      {
        "lightness": 20
      }
      ]
    },
    {
      "featureType": "road",
      "elementType": "all",
      "stylers": [{
        "lightness": 20
      }]
    },
    {
      "featureType": "road.highway",
      "elementType": "geometry",
      "stylers": [{
        "color": "#c5c6c6"
      }]
    },
    {
      "featureType": "road.arterial",
      "elementType": "geometry",
      "stylers": [{
        "color": "#e4d7c6"
      }]
    },
    {
      "featureType": "road.local",
      "elementType": "geometry",
      "stylers": [{
        "color": "#fbfaf7"
      }]
    },
    {
      "featureType": "water",
      "elementType": "all",
      "stylers": [{
        "visibility": "on"
      },
      {
        "color": "#acbcc9"
      }
      ]
    }
    ]
  });


  markers.forEach(element => {


    markerPlace = {
      lat: parseFloat(element.getAttributeNames("latitude")),
      lng: parseFloat(element.getAttributeNames("longitude")),
    }

    let icon

    if (document.querySelector("h2").innerText === "RESTAURANTES")
      icon = {
        url: 'https://image.flaticon.com/icons/svg/1046/1046755.svg',
        scaledSize: new google.maps.Size(30, 30),
      }
    else {
      icon = {
        url: 'https://image.flaticon.com/icons/svg/2509/2509635.svg',
        scaledSize: new google.maps.Size(30, 30),
      }
    }
    console.log(document.querySelector("h2").innerText)

    new google.maps.Marker({
      position: markerPlace,
      map: map,
      icon
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
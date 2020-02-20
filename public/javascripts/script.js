window.onload = () => {
  const city = {
    lat: parseFloat(document.getElementsByClassName('restaurantsContainer')[0].dataset.latitude),
    lng: parseFloat(document.getElementsByClassName('restaurantsContainer')[0].dataset.longitude)
  };

  console.log(city)

  const markers = [...document.getElementsByClassName('restaurantsContainer')]

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
console.log(element)
    markerPlace = {
      lat: parseFloat(element.dataset.latitude),
      lng: parseFloat(element.dataset.longitude),
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

    let contentString = '<div id="content">' +
      '<h1>Uluru</h1>' +
      '<div>' +
      '<p><b>Uluru</b>, also referred to as <b>Ayers Rock</b>, is a large ' +
      'sandstone rock formation in the southern part of the ' +
      'Northern Territory, central Australia. It lies 335&#160;km (208&#160;mi) ' +
      'south west of the nearest large town, Alice Springs; 450&#160;km ' +
      '(280&#160;mi) by road. Kata Tjuta and Uluru are the two major ' +
      'features of the Uluru - Kata Tjuta National Park. Uluru is ' +
      'sacred to the Pitjantjatjara and Yankunytjatjara, the ' +
      'Aboriginal people of the area. It has many springs, waterholes, ' +
      'rock caves and ancient paintings. Uluru is listed as a World ' +
      'Heritage Site.</p>' +
      '<p>Attribution: Uluru, <a href="https://en.wikipedia.org/w/index.php?title=Uluru&oldid=297882194">' +
      'https://en.wikipedia.org/w/index.php?title=Uluru</a> ' +
      '(last visited June 22, 2009).</p>' +
      '</div>' +
      '</div>'

    let infowindow = new google.maps.InfoWindow({
      content: contentString
    });

    let marker = new google.maps.Marker({
      position: markerPlace,
      map: map,
      animation: google.maps.Animation.DROP,
      icon,
    })

    marker.addListener('click', function () {
      infowindow.open(map, marker);
      document.querySelector("#select").style.backgroundColor = "red"
    });

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
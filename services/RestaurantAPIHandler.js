const axios = require('axios').default;

class restaurantsAPIHandler {
  constructor() {
    this.apiKey = process.env.SEARCHAPI
    this.axiosApp = axios.create({
      baseURL: 'https://maps.googleapis.com/maps/api'
    })
  }

  getCityLatLng(city, country) {
    return this.axiosApp.get(`geocode/json?components=locality:${city}|country:${country}&key=${this.apiKey}`)
      .then(response => {
        const geometry = {
          lat: response.data.results[0].geometry.location.lat,
          lng: response.data.results[0].geometry.location.lng
        }
        return geometry
      })
      .catch(err => console.log(err))
  }

  getRestaurants(city, country) {
    return this.getCityLatLng(city, country)
      .then(geometry => {
        return this.axiosApp.get(`place/nearbysearch/json?location=${geometry.lat}%2C${geometry.lng}&rankby=distance&keyword=restaurant&key=${this.apiKey}`)
      })
      // .then(restaurant => {
      //   let photo = []
      //   let info = restaurant.data.results
      //   let restaurants = {
      //     photo,
      //     info
      //   }


      //   let reference = info[0].photos[0].photo_reference
      //   return this.axiosApp.get(`https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${reference}&key=${this.apiKey}`)
      //     .then(res => {


      // var arrayBufferView = new Uint8Array.prototype.buffer(res.data);
      // var blob = new Blob([arrayBufferView], {
      //   type: "image/jpeg"
      // });
      // var urlCreator = window.URL || window.webkitURL;
      // var imageUrl = urlCreator.createObjectURL(blob);
      // var img = document.querySelector("#photo");
      // img.src = imageUrl;
      // console.log(arrayBufferView)
      // console.log(img.src)
      // })


      // restaurant.data.results.forEach(elm => {
      //   let reference = elm.photos[0].photo_reference
      //   return this.axiosApp.get(`https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${reference}&key=${this.apiKey}`)
      //     .then(res => {
      //       photo.push(res.data)
      //       return restaurants
      //     })

      // })
      // })
      .catch(error => console.log('Oh No! Error is: ', error))
  }


}

module.exports = restaurantsAPIHandler
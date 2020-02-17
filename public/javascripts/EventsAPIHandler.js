class EventsAPIHandler {
  constructor(baseUrl) {
    this.BASE_URL = baseUrl;
    this.apiKey = 'eXSOnyGCjVgC8ADHezE5WdKoUO0bEd8N'
    this.axiosApp = axios.create({
      baseURL: this.BASE_URL
    })
  }

  getEvents(city) {

    return this.axiosApp.get(`/events.json?city=${city}&apikey=${this.apiKey}`)
      .then(response => {
        let events = response.data._embedded.events
        events.forEach(event => {

          const details = `<p>Hay un evento de ${event.classifications[0].segment.name} titulado ${event.name}
        el día ${event.dates.start.localDate} mas información ${event.url}</p>
        <img src=${event.images[0].url}`
          console.log(details)

        })
      })
      .catch(error => console.log('Oh No! Error is: ', error))
  }
}
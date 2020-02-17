class InfoAPIHandler {
  constructor() {
    this.axiosApp = axios.create({
      baseURL: `https://restcountries.eu/rest/v2/alpha/ch`
    })
  }

  getInfo() {
    this.axiosApp.get('')
      .then(response => {
        document.querySelector('.basicInfoContainer').innerHTML = ''
        const data = response.data
        // CAPITAL
        const details = `
        <div class="news-info">
        <h3 class="capital">Capital:</h3>
        <p>${data.capital}</p>
        
        </div>`
        // MONEDAS
        document.querySelector('.basicInfoContainer').innerHTML += details
        document.querySelector('.basicInfoContainer').innerHTML += `<h3 class="currencies">Monedas:</h3>`
        data.currencies.forEach(elem => {
          document.querySelector('.basicInfoContainer').innerHTML += `<p>${elem.name}</p>`
        })
        // LENGUAJES
        document.querySelector('.basicInfoContainer').innerHTML += `<h3 class="languages">Lenguajes:</h3>`
        data.languages.forEach(elem => {
          document.querySelector('.basicInfoContainer').innerHTML += `<p>${elem.name}</p>`
        })
        // TIMEZONES
        document.querySelector('.basicInfoContainer').innerHTML += `<h3 class="timezones">Zona Horaria:</h3>`
        data.timezones.forEach(elem => {
          document.querySelector('.basicInfoContainer').innerHTML += `<p>${elem}</p>`
        })
        // PREFIJOS
        document.querySelector('.basicInfoContainer').innerHTML += `<h3 class=callingCodes>Prefijo:</h3>`
        data.callingCodes.forEach(elem => {
          document.querySelector('.basicInfoContainer').innerHTML += `<p>${elem}</p>`
        })
        // FALTAN NUMEROS DE EMERGENCIA Y RELOJ ACTUAL (FUNCIONANDO)
      })
      .catch(error => console.log('Oh No! Error is: ', error))
  }
}
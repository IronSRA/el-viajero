class NewsAPIHandler {
  constructor() {
    this.api = '96a3d62e4e734ff19ca5bcc072762650'
    this.axiosApp = axios.create({
      baseURL: `https://newsapi.org/v2`
    })
  }

  getNews(country) {
    country === "ES" ? (alert("En tu pais las noticias se encuentran bloqueadas, te mostramos las de Estados Unidos"), country = "us") : null
    this.axiosApp.get(`/top-headlines?country=${country}&apiKey=${this.api}`)
      .then(response => {
        document.querySelector('.newsContainer').innerHTML = ''
        const newsArr = response.data.articles
        newsArr.forEach(news => {
          news.urlToImage ? null : news.urlToImage = ''
          const details = `<div class="news-info">
          <img src="${news.urlToImage}" / >
        <h2>${news.title}</h2>
        <p class="description">${news.description}</p>
        <a href="${news.url}">${news.title}</a>
      </div>`
          document.querySelector('.newsContainer').innerHTML += details
        })
      })
      .catch(error => console.log('Oh No! Error is: ', error))
  }
}
class NewsAPIHandler {
  constructor(baseUrl, apiKey) {
    this.BASE_URL = baseUrl;
    this.api = '96a3d62e4e734ff19ca5bcc072762650'
    this.axiosApp = axios.create({
      baseURL: `https://newsapi.org/v2/top-headlines?country=gb&apiKey=${this.api}`
    })
  }

  getNews() {
    this.axiosApp.get('')
      .then(response => {
        // console.log(response.data)
        const newsArr = response.data.articles

        newsArr.forEach(news => {
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
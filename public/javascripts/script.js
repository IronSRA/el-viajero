document.addEventListener('DOMContentLoaded', () => {

  console.log('IronGenerator JS imported successfully!');
  const newsAPI = new NewsAPIHandler('http://localhost:3000');
  newsAPI.getNews()
}, false);
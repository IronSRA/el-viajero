document.addEventListener('DOMContentLoaded', () => {

  console.log('IronGenerator JS imported successfully!');
  const newsAPI = new NewsAPIHandler();
  const infoAPI = new InfoAPIHandler();


  newsAPI.getNews()
  infoAPI.getInfo()

}, false);
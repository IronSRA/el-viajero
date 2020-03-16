let inputValue = document.querySelector('#inputMessage').value
let button = document.querySelector('#send')
let receptor = document.querySelector('#inputMessage').dataset.receptor
let user = document.querySelector('#inputMessage').dataset.user
let container = document.querySelector('#messagesContainer')
let chatContent = document.querySelector('.content')


let isScrolled = false

button.onclick = e => {
  e.preventDefault()
  inputValue = document.querySelector('#inputMessage').value
  chatContent = document.querySelector('.content')
  inputValue ?
    axios.post(`/chat/${receptor}`, {
      message: inputValue
    })
    .then(() => {
      document.querySelector('#inputMessage').value = ''
      isScrolled = false
    })
    .catch(err => console.log(err)) : null
}
setInterval(() => {
  axios.get(`/chat/${receptor}`)
    .then(response => {
      container.innerHTML = ''
      response.data.forEach(elem => {
        if (elem.message.author.username == user) {
          data = `<div class="user">
          <li style="text-align: right; justify-content: flex-end;">
          <p>${elem.message.message}</p>
          </li></div>`
        } else {
          data = `<div class="receptor">
          <li style="text-align: left; justify-content: flex-start;">
          <p>${elem.message.message}</p>
          </li></div>`
        }
        container.innerHTML += data
        lastMessageAutor = elem.message.author.username
      })
      console.log(container.innerHTML.split('<div>'))
      if (!isScrolled) {
        chatContent.scrollTop = chatContent.scrollHeight
        isScrolled = true
      }
    })
    .catch(err => console.log(err))
}, 500)
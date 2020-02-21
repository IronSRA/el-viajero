let inputValue = document.querySelector('#inputMessage').value
let button = document.querySelector('#send')
let receptor = document.querySelector('#inputMessage').dataset.receptor
let user = document.querySelector('#inputMessage').dataset.user
let container = document.querySelector('#messagesContainer')



button.onclick = e => {
  e.preventDefault()
  inputValue = document.querySelector('#inputMessage').value
  axios.post(`/chat/${receptor}`, {
      message: inputValue
    })
    .then(() => document.querySelector('#inputMessage').value = '')
    .catch(err => console.log(err))
}

setInterval(() => {
  axios.get(`/chat/${receptor}`)
    .then(response => {
      container.innerHTML = ''
      let lastMessageAutor
      let messageClass = ""
      response.data.forEach(elem => {
        if (elem.message.author.username == user) {
          data = `
        <li style="text-align: right">
        <p>${elem.message.message}</p>
        </li>`
        } else {
          data = `
        <li style="text-align: left">
        <p>${elem.message.message}</p>
        </li>`
        }

        container.innerHTML += data
        lastMessageAutor = elem.message.author.username
      })
    })
    .catch(err => console.log(err))
}, 500)
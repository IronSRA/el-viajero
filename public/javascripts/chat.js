let inputValue = document.querySelector('#inputMessage').value
let button = document.querySelector('#send')
let receptor = document.querySelector('#inputMessage').dataset.user
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
      response.data.forEach(elem => {
        data = `
        <li style="border-bottom: 1px solid black;">
        <p style="color: red">${elem.message.author.username} dice:</p>
        <p>${elem.message.message}</p>
        </li>`
        container.innerHTML += data
      })
    })
    .catch(err => console.log(err))
}, 500)
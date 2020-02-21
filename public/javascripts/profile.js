let pencil = document.querySelector('#pencil')
let close = document.querySelector('#close')
let modal = document.querySelector('.modal')


pencil.onclick = () => {
  modal.style.display = 'flex'
}
close.onclick = () => {
  modal.style.display = 'none'
}
const socket = io();

// Naam van het event moet hetzelfde zijn als op de server
// Count is data die ik meestuur vanaf de client.
// count kan ik in principe elke naam geven die ik wil. Het gaat hier om de volgorde
socket.on("message", (message) => {
  console.log(message);
});

const btn = document.querySelector("#btn");
const value = document.querySelector('#input');

btn.addEventListener("click", (e) => {
  e.preventDefault();

  socket.emit('sendMessage', value.value)
});

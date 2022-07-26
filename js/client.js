const socket = io("http://localhost:8000", { transports: ["websocket"] });

const form = document.getElementById("send-container");
const inputMessage = document.getElementById("inputMessage");
const messageContainer = document.querySelector(".container");

const userName = prompt("Enter your name to join");
socket.emit("new-user-joined", userName);

const append = (message, position) => {
  const messageElement = document.createElement("div");
  messageElement.innerText = message;
  messageElement.classList.add("message");
  messageElement.classList.add(position);
  messageContainer.append(messageElement);
};

socket.on("user-joined", (name) => {
  append(`${name} is joined now.`, "right");
});

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const message = inputMessage.value;
  append(`You : ${message}`, "right");
  socket.emit("send", message);
  inputMessage.value = "";
});

socket.on("receive", (data) => {
  append(`${data.name} : ${data.message}`, "left");
});

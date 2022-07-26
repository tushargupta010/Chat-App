const socket = io("http://localhost:8000", { transports: ["websocket"] });

const form = document.getElementById("send-container");
const inputMessage = document.getElementById("inputMessage");
const messageContainer = document.querySelector(".container");

const userName = prompt("Enter your name to join");
console.log(userName);
socket.emit("new-user-joined", userName);

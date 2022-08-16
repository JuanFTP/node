const socket = io();

const btnCreate = document.querySelector("#btn-create-ticket");
const lblCreate = document.querySelector("#lbl-create-ticket");

socket.on("connect", () => {
  btnCreate.disabled = false;
});

socket.on("disconnect", () => {
  btnCreate.disabled = true;
});

socket.on("last-ticket", (last_number) => {
  lblCreate.innerText = `Ticket ${last_number}`;
});

btnCreate.addEventListener("click", () => {
  socket.emit("create-ticket", null, (data) => {
    lblCreate.innerText = data.message;
  });
});

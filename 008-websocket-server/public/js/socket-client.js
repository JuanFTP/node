// Conectar cliente
const socketClient = io();

// Referencias elementos html
const btnConnection = document.querySelector("#btn-connection");

const txtMessage = document.querySelector("#txtMessage");
const btnSend = document.querySelector("#btnSend");

socketClient.on("connect", () => {
  btnConnection.classList.remove("btn-dark", "btn-danger");
  btnConnection.classList.add("btn-primary");
  btnConnection.innerText = "Estás conectado";
});

socketClient.on("disconnect", () => {
  btnConnection.classList.remove("btn-dark", "btn-primary");
  btnConnection.classList.add("btn-danger");
  btnConnection.innerText = "No tienes conexión";
});

// Escucha de eventos
socketClient.on("send-message", (payload) => {
  console.log("Se recibió un mensage: ", payload);
});

btnSend.addEventListener("click", () => {
  const message = txtMessage.value;
  const payload = {
    id: "783yr8y4789r9j4r8",
    message,
    date: new Date().getTime(),
  };

  socketClient.emit("send-message", payload, (response) => {
    console.log(response);
  });
});

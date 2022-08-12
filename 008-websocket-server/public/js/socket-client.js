// Conectar cliente
const socketClient = io();

// Referencias elementos html
const btnConnection = document.querySelector("#btn-connection");

socketClient.on("connect", () => {
  console.log("Me conecté tu");

  btnConnection.classList.remove("btn-dark", "btn-danger");
  btnConnection.classList.add("btn-primary");
  btnConnection.innerText = "Estás conectado";
});

socketClient.on("disconnect", () => {
  console.log("Me desconecté tu");

  btnConnection.classList.remove("btn-dark", "btn-primary");
  btnConnection.classList.add("btn-danger");
  btnConnection.innerText = "No tienes conexión";
});

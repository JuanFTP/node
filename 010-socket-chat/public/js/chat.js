const url = window.location.hostname.includes("localhost")
  ? "http://localhost:8081/api/auth/"
  : "Heroku";
let usuario = null;
let socket = null;

const txtUid = document.querySelector("#txtUid");
const txtMessage = document.querySelector("#txtMessage");
const listUsers = document.querySelector("#ulUsers");
const listMessages = document.querySelector("#ulMessages");
const btnLogout = document.querySelector("#btnLogout");

const validarJWT = async () => {
  const token = localStorage.getItem("token");

  if (!token) {
    window.location = "index.html";
    throw new Error("No existe token en la aplicación");
  }

  const resp = await fetch(url, {
    headers: { "x-api-key": token },
  });

  const { usuario: userDb, token: tokenDb } = await resp.json();

  usuario = userDb;
  localStorage.setItem("token", tokenDb);

  document.title = usuario.nombre;
};

const conectarSocket = async () => {
  socket = io({
    extraHeaders: {
      "x-api-key": localStorage.getItem("token"),
    },
  });

  socket.on("connect", () => {
    console.log("Sockets online");
  });

  socket.on("disconnect", () => {
    console.log("Socket desconectado");
  });

  socket.on("recibir-mensajes", () => {
    console.log("Mensaje recibido");
  });

  socket.on("usuarios-activos", mostrarUsuarios);

  socket.on("mensaje-privado", () => {
    console.log("Mensaje privado");
  });
};

const mostrarUsuarios = (usuarios = []) => {
  console.log(usuarios);
  let htmlUsuarios = "";
  usuarios.forEach(({ nombre, uid }) => {
    htmlUsuarios += `
    <li id="${uid}">
      <p>
        <h5 class="text-success">${nombre}</5>
        <span class="fs-6 text-muted">${uid}</span>
      </p>
    </li>
    `;
  });

  listUsers.innerHTML = htmlUsuarios;
};

const main = async () => {
  await validarJWT();
  await conectarSocket();
};

main();

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

  socket.on("recibir-mensajes", mostrarMensajes);

  socket.on("usuarios-activos", mostrarUsuarios);

  socket.on("mensaje-privado", (payload) => {
    console.log("Mensaje privado", payload);
  });
};

const mostrarUsuarios = (usuarios = []) => {
  console.log(usuarios);
  let htmlUsuarios = "";
  usuarios.forEach(({ nombre, uid }) => {
    htmlUsuarios += `
    <li id="${uid}">
      <p>
        <h6 class="text-success">${nombre}</h6>
        <span class="text-muted">${uid}</span>
      </p>
    </li>
    `;
  });

  listUsers.innerHTML = htmlUsuarios;
};

const mostrarMensajes = (mensajes = []) => {
  console.log("mensajes", mensajes);
  let htmlMensajes = "";
  mensajes.forEach(({ nombre, mensaje }) => {
    htmlMensajes += `
    <li>
      <p>
        <span class="text-primary">${nombre}</span>
        <span>${mensaje}</span>
      </p>
    </li>
    `;
  });

  listMessages.innerHTML = htmlMensajes;
};

txtMessage.addEventListener("keyup", ({ keyCode }) => {
  let mensaje = txtMessage.value;
  let uid = txtUid.value;

  if (keyCode !== 13) {
    return;
  }
  if (mensaje.length === 0) {
    return;
  }

  mensaje = mensaje.trim();

  socket.emit("enviar-mensaje", { mensaje, uid });

  txtMessage.value = "";
});

const main = async () => {
  await validarJWT();
  await conectarSocket();
};

main();

const url = window.location.hostname.includes("localhost")
  ? "http://localhost:8081/api/auth/"
  : "Heroku";
let usuario = null;
let socket = null;

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
};

const main = async () => {
  await validarJWT();
  await conectarSocket();
};

main();

const { Socket } = require("socket.io");
const { comprobarJWT } = require("../helpers");

// Para fines de desarrollo se hace el new Socket, pero en prod no debe quedarse
const socketController = async (socket = new Socket()) => {
  const usuario = await comprobarJWT(socket.handshake.headers["x-api-key"]);
  if (!usuario) {
    return socket.disconnect();
  }

  console.log("Se conectó", usuario.nombre);
};

module.exports = { socketController };

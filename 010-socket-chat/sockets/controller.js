const { Socket } = require("socket.io");
const { comprobarJWT } = require("../helpers");
const { ChatMensajes } = require("../models");

const chat = new ChatMensajes();

// Para fines de desarrollo se hace el new Socket, pero en prod no debe quedarse
const socketController = async (socket = new Socket(), io) => {
  const usuario = await comprobarJWT(socket.handshake.headers["x-api-key"]);
  if (!usuario) {
    return socket.disconnect();
  }

  // Agregar al usuario conectado
  chat.conectarUsuario(usuario);
  io.emit("usuarios-activos", chat.usuariosArr);

  // Limpiar cuando alguien se desconecta
  socket.on("disconnect", () => {
    chat.desconectarUsuario(usuario.id);
    io.emit("usuarios-activos", chat.usuariosArr);
  });
};

module.exports = { socketController };

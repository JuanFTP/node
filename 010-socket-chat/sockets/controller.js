const { Socket } = require("socket.io");
const { comprobarJWT } = require("../helpers");
const { ChatMensajes } = require("../models");

const chat = new ChatMensajes();

// Para fines de desarrollo se hace el new Socket, pero en prod no debe quedarse
const socketController = async (socket = new Socket(), io) => {
  // Salas: Global, Socket.id, Usuario.id

  const usuario = await comprobarJWT(socket.handshake.headers["x-api-key"]);
  if (!usuario) {
    return socket.disconnect();
  }

  // Agregar al usuario conectado
  chat.conectarUsuario(usuario);
  io.emit("usuarios-activos", chat.usuariosArr);
  socket.emit("recibir-mensajes", chat.ultimos10);

  // Enviar un mensaje a alguien en privado
  // Conectarlo a una sala especial
  socket.join(usuario.id);

  // Limpiar cuando alguien se desconecta
  socket.on("disconnect", () => {
    chat.desconectarUsuario(usuario.id);
    io.emit("usuarios-activos", chat.usuariosArr);
  });

  socket.on("enviar-mensaje", ({ uid, mensaje }) => {
    // Mensaje privado
    if (uid) {
      // Envia a una sala
      socket.to(uid).emit("mensaje-privado", {
        emisor: { id: usuario.id, nombre: usuario.nombre },
        mensaje,
      });
    } else {
      chat.enviarMensaje(usuario.id, usuario.nombre, mensaje);
      io.emit("recibir-mensajes", chat.ultimos10);
    }
  });
};

module.exports = { socketController };

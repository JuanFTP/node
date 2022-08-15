const socketController = (socket) => {
  console.log("Cliente conectado", socket.id);

  socket.on("disconnect", () => {
    console.log("Cliente desconectado", socket.id);
  });

  socket.on("send-message", (payload, callback) => {
    const id = "ejn7y3487y387y3798h38972";

    callback({ id, date: new Date().getTime() });

    socket.broadcast.emit("send-message", payload);
  });
};

module.exports = {
  socketController,
};

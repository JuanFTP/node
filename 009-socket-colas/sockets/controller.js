const TicketControl = require("../models/ticket-control");

const ticketControl = new TicketControl();

const socketController = (socket) => {
  socket.emit("last-ticket", ticketControl.last);

  socket.on("create-ticket", (payload, callback) => {
    const next = ticketControl.next();

    callback(next);

    // TODO: Notificar que hay un nuevo ticket pendiente de asignar
  });
};

module.exports = {
  socketController,
};

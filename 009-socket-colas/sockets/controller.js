const TicketControl = require("../models/ticket-control");

const ticketControl = new TicketControl();

const socketController = (socket) => {
  socket.emit("last-ticket", ticketControl.last);
  socket.emit("recent", ticketControl.recent);

  socket.on("create-ticket", (payload, callback) => {
    const next = ticketControl.next();

    callback(next);

    // TODO: Notificar que hay un nuevo ticket pendiente de asignar
  });

  socket.on("take-ticket", (payload, callback) => {
    if (!payload.desktop) {
      return callback({
        isCorrect: false,
        message: "Desktop number is required",
      });
    }

    const { desktop } = payload;
    const ticket = ticketControl.takeTicket(desktop);
    const inList = ticketControl.tickets.length;

    socket.broadcast.emit("recent", ticketControl.recent);

    if (!ticket) {
      return callback({
        isCorrect: false,
        message: "There aren't more tickets",
      });
    } else {
      return callback({
        isCorrect: true,
        ticket,
        inList,
      });
    }
  });
};

module.exports = {
  socketController,
};

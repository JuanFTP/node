const TicketControl = require("../models/ticket-control");

const ticketControl = new TicketControl();

const socketController = (socket) => {
  socket.emit("last-ticket", ticketControl.last);
  socket.emit("recent", ticketControl.recent);
  socket.emit("tickets", ticketControl.tickets.length);

  socket.on("create-ticket", (payload, callback) => {
    const next = ticketControl.next();

    socket.broadcast.emit("tickets", ticketControl.tickets.length);

    callback(next);
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

    socket.broadcast.emit("recent", ticketControl.recent);

    socket.emit("tickets", ticketControl.tickets.length);
    socket.broadcast.emit("tickets", ticketControl.tickets.length);

    if (!ticket) {
      return callback({
        isCorrect: false,
        message: "There aren't more tickets",
      });
    } else {
      return callback({
        isCorrect: true,
        ticket,
      });
    }
  });
};

module.exports = {
  socketController,
};

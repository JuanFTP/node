const path = require("path");
const fs = require("fs");

class Ticket {
  constructor(number, desktop) {
    this.id = number;
    this.desktop = desktop;
  }
}

class TicketControl {
  constructor() {
    this.last = 0;
    this.today = new Date().getDate();
    this.tickets = [];
    this.recent = [];

    this.init();
  }

  get toJson() {
    return {
      last: this.last,
      today: this.today,
      tickets: this.tickets,
      recent: this.recent,
    };
  }

  init() {
    const { last, today, tickets, recent } = require("./../data/data.json");

    if (today === this.today) {
      this.tickets = tickets;
      this.recent = recent;
      this.last = last;
    } else {
      // Ya están los datos por default
      this.saveDb();
    }
  }

  saveDb() {
    const dbPath = path.join(__dirname, "../data/data.json");
    fs.writeFileSync(dbPath, JSON.stringify(this.toJson));
  }

  next() {
    this.last += 1;
    const ticket = new Ticket(this.last, null);
    this.tickets.push(ticket);

    this.saveDb();

    return { message: `Ticket ${this.last}`, ticket };
  }

  takeTicket(desktop) {
    // Si no hay tickets
    if (this.tickets.length === 0) {
      return null;
    }

    // Remueve el primer elemento
    const ticket = this.tickets.shift();
    ticket.desktop = desktop;

    this.recent.unshift(ticket);

    if (this.recent.length > 4) {
      this.recent.splice(-1, 1);
    }

    this.saveDb();

    return ticket;
  }
}

module.exports = TicketControl;

const { v4: uuidv4 } = require("uuid");

class Tarea {
  id = "";
  description = "";
  completed = false;
  lastModification = null;

  constructor(description) {
    this.id = uuidv4();
    this.description = description;
    this.completed = false;
    this.lastModification = new Date().toISOString();
  }
}

module.exports = Tarea;

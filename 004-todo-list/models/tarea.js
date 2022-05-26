const { v4: uuidv4 } = require("uuid");

class Tarea {
  id = "";
  description = "";
  completed = false;
  createdDate = null;

  constructor(description) {
    this.id = uuidv4();
    this.description = description;
    this.completed = false;
    this.createdDate = null;
  }
}

module.exports = Tarea;

const Tarea = require("./tarea");

class Tareas {
  _list = {};

  constructor() {
    this._list = {};
  }

  crearTarea(description = "") {
    const tarea = new Tarea(description);

    this._list[tarea.id] = tarea;
  }
}

module.exports = Tareas;

const Tarea = require("./tarea");

class Tareas {
  _list = {};

  get list() {
    const items = [];

    Object.keys(this._list).forEach((key) => items.push(this._list[key]));

    return items;
  }

  constructor() {
    this._list = {};
  }

  crearTarea(description = "") {
    const tarea = new Tarea(description);

    this._list[tarea.id] = tarea;
  }

  cargarTareas(data = []) {
    data.forEach((tarea) => (this._list[tarea.id] = tarea));
    console.log(this._list);
  }

  listarTareas() {
    let tarea = {};
    let out = "";
    Object.keys(this._list).forEach((id, i) => {
      tarea = this._list[id];
      out = `${i + 1}: ${tarea.description} [ ${
        tarea.completed ? "Completada".green : "Pendiente".gray
      } ]`;

      console.log(out);
    });
  }
}

module.exports = Tareas;

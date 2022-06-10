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

  listarTareasPorStatus(completed = true) {
    let tarea = {};
    let out = "";
    let i = 1;
    Object.keys(this._list).forEach((id) => {
      if (this._list[id].completed === completed) {
        tarea = this._list[id];
        out = `${i}: ${tarea.description} [ ${
          tarea.completed ? "Completada".green : "Pendiente".gray
        } ]`;

        i++;
        console.log(out);
      }
    });
  }

  eliminarTarea(id = "") {
    if (this._list[id]) {
      delete this._list[id];
    }
  }

  actualizarStatusTareas(ids = []) {
    ids.forEach((key) => {
      if (this._list[key]) {
        if (!this._list[key].completed) {
          this._list[key].completed = true;
          this._list[key].lastModification = new Date().toISOString();
        }
      }
    });

    this.list.forEach(({ id }) => {
      if (!ids.includes(id)) {
        this._list[id].completed = false;
        this._list[id].lastModification = new Date().toISOString();
      }
    });
  }
}

module.exports = Tareas;

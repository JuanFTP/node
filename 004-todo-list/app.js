require("colors");
//const { showMenu, pause } = require("./helpers/messages");

const { inquirerMenu, pause, readInput } = require("./helpers/inquirer");
const { saveData, readData } = require("./helpers/dbController");
const Tareas = require("./models/tareas");

const main = async () => {
  console.clear();
  let opt = "";
  const tareas = new Tareas();

  const tareasDb = readData();

  if (tareasDb) {
    tareas.cargarTareas(tareasDb);
  }

  do {
    opt = await inquirerMenu();

    switch (opt) {
      case "1": {
        const description = await readInput("Descripción: ");
        tareas.crearTarea(description);
        break;
      }
      case "2": {
        tareas.listarTareas();
        break;
      }
      default: {
        break;
      }
    }

    saveData(JSON.stringify(tareas.list));
    if (opt !== "0") await pause();
  } while (opt !== "0");
};

main();

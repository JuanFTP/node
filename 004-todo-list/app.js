require("colors");
//const { showMenu, pause } = require("./helpers/messages");

const {
  inquirerMenu,
  pause,
  readInput,
  mostrarTareasParaBorrar,
  confirmar,
  mostrarListadoCheckList,
} = require("./helpers/inquirer");
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
      case "3": {
        tareas.listarTareasPorStatus(true);
        break;
      }
      case "4": {
        tareas.listarTareasPorStatus(false);
        break;
      }
      case "5": {
        const ids = await mostrarListadoCheckList(tareas.list);
        tareas.actualizarStatusTareas(ids);
        break;
      }
      case "6": {
        const id = await mostrarTareasParaBorrar(tareas.list);
        if (id !== "0") {
          const continuar = await confirmar(
            `¿Deseas borrar la tarea: ${tareas._list[id]}?`.yellow
          );

          if (continuar) {
            tareas.eliminarTarea(id);
            console.log("Tarea eliminada exitosamente".green);
          }
        }
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

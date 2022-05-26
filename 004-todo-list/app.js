require("colors");
//const { showMenu, pause } = require("./helpers/messages");

const { inquirerMenu, pause, readInput } = require("./helpers/inquirer");
const Tareas = require("./models/tareas");

const main = async () => {
  console.clear();
  let opt = "";
  const tareas = new Tareas();

  do {
    opt = await inquirerMenu();

    switch (opt) {
      case "1": {
        const description = await readInput("Descripción: ");
        tareas.crearTarea(description);
        break;
      }
      default: {
        console.log(tareas._list);
        break;
      }
    }

    if (opt !== "0") await pause();
  } while (opt !== "0");
};

main();

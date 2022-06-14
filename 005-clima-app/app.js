const { readInput, inquirerMenu, pause } = require("./helpers/inquirer");
const Busquedas = require("./models/Busquedas");

(async () => {
  console.clear();
  let option = -1;
  let busquedas = new Busquedas();

  do {
    option = await inquirerMenu();

    switch (option) {
      case 1:
        const lugar = await readInput("Lugar a buscar: ".yellow);
        const resultados = await busquedas.ciudad(lugar);
        console.log(resultados);
        break;
      case 2:
        console.log("Historial de búsquedas");
      default:
        break;
    }

    if (option !== "0") await pause();
  } while (option !== 0);
})();

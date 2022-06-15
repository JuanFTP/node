require("dotenv").config();
const {
  readInput,
  inquirerMenu,
  pause,
  listarLugares,
} = require("./helpers/inquirer");
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
        const id = await listarLugares(resultados);

        if (id !== "0") {
          const seleccionado = resultados.find((l) => l.id === id);
          busquedas.agregarAlHistorial(seleccionado.nombre);

          const weatherData = await busquedas.climaPorGeolocacion(
            seleccionado.longitud,
            seleccionado.latitud
          );

          console.log("\nInformación de la ciudad".green);
          console.log("          Ciudad: ", seleccionado.nombre);
          console.log("         Latitud: ", seleccionado.latitud);
          console.log("        Longitud: ", seleccionado.longitud);
          console.log("     Temperatura: ", weatherData.temp, "°C");
          console.log("          Mínima: ", weatherData.min, "°C");
          console.log("          Máxima: ", weatherData.max, "°C");
          console.log("Estado del clima: ", weatherData.status);
        }
        break;
      case 2:
        busquedas.historial.forEach((lugar, i) => {
          console.log(`${i + 1}. `.green + lugar);
        });
      default:
        break;
    }

    if (option !== "0") await pause();
  } while (option !== 0);
})();

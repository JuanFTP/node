const colors = require("colors");
const { crearArchivo } = require("./helpers/multiplicar");
const argv = require("./config/yargs");

console.clear();

const { base, limit, show } = argv;

crearArchivo(base, limit, show)
  .then(({ file }) => {
    console.log(`\nArchivo ${colors.rainbow(file)} creado exitosamente`);
  })
  .catch((error) => {
    console.log(error);
  });

const { crearArchivo } = require("./helpers/multiplicar");

console.clear();

const [, , arg3 = "--base=1", arg4 = "--limit=10"] = process.argv;
const [, base] = arg3.split("=");
const [, limit] = arg4.split("=");

crearArchivo(base)
  .then(({ file, out }) => {
    console.log(out, `\n\nArchivo ${file} creado exitosamente`);
  })
  .catch((error) => {
    console.log(error);
  });

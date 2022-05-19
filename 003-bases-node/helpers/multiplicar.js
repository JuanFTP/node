// Paquetes que ya tiene node pre-instalado
const fs = require("node:fs");
const colors = require("colors");

const crearArchivo = async (base = 1, limit = 10, show) => {
  try {
    let def = "./files/";
    let header = `=========================================\n============== TABLA ${base} ==============\n=========================================\n`;
    let out = "";

    let file = `tabla-${base}.txt`;

    if (show) {
      console.log(colors.rainbow(header));
    }

    for (let i = 1; i <= limit; i++) {
      out += `${base} x ${i} = ${base * i}\n`;
      if (show) {
        console.log(`${base} ${"x".blue} ${i} ${"=".red} ${base * i}`);
      }
    }

    // Usa un try y catch para controlar los errores
    fs.writeFileSync(def + file, header + out);
    out += `\nTabla de base ${base} creada`;

    return { file };
  } catch (error) {
    throw error;
  }
};

// Modo de node para exportar los archivos
module.exports = {
  crearArchivo,
};

// Paquetes que ya tiene node pre-instalado
const fs = require("node:fs");

const crearArchivo = async (base = 5) => {
  try {
    let def = "./files/";
    let out = `=========================================\n============== TABLA ${base} ==============\n=========================================\n`;
    let file = `tabla-${base}.txt`;

    for (let i = 1; i <= 10; i++) {
      out += `${base} x ${i + 1} = ${base * i}\n`;
    }

    // Usa un try y catch para controlar los errores
    fs.writeFileSync(def + file, out);
    out += `\nTabla de base ${base} creada`;
    return { file, out };
  } catch (error) {
    throw error;
  }
};

// Modo de node para exportar los archivos
module.exports = {
  crearArchivo,
};

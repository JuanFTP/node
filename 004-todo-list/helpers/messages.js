require("colors");

const showMenu = () =>
  new Promise((resolve) => {
    console.clear();
    console.log("===============================".green);
    console.log("==== Selecciona una opción ====".green);
    console.log("===============================\n".green);

    console.log(`${"1.".green} Crear tarea`);
    console.log(`${"2.".green} Listar tareas`);
    console.log(`${"3.".green} Listar tareas completadas`);
    console.log(`${"4.".green} Listar tareas pendientes`);
    console.log(`${"5.".green} Completar tarea(s)`);
    console.log(`${"6.".green} Borrar tarea`);
    console.log(`${"0.".green} Salir`);

    // Interface para mostrar y recibir información del usuario
    const readline = require("readline").createInterface({
      input: process.stdin,
      output: process.stdout,
    });

    // Lectura de la opción elegida
    readline.question("\nSeleccione una opción:".yellow, (opt) => {
      readline.close();
      resolve(opt);
    });
  });

const pause = () =>
  new Promise((resolve) => {
    const readline = require("readline").createInterface({
      input: process.stdin,
      output: process.stdout,
    });

    readline.question(`\nPresione ${"ENTER".blue} para continuar\n`, (opt) => {
      readline.close();
      resolve();
    });
  });

module.exports = {
  showMenu,
  pause,
};

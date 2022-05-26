const inquirer = require("inquirer");
require("colors");

const preguntas = [
  {
    type: "list",
    name: "opt",
    message: "¿Qué desea hacer?",
    choices: [
      { value: "1", name: "1. Crear tarea" },
      { value: "2", name: "2. Listar tareas" },
      { value: "3", name: "3. Listar tareas completadas" },
      { value: "4", name: "4. Listar tareas pendientes" },
      { value: "5", name: "5. Completar tarea(s)" },
      { value: "6", name: "6. Borrar tarea" },
      { value: "0", name: "0. Salir" },
    ],
  },
];

const inquirerMenu = async () => {
  console.clear();
  console.log("===============================".green);
  console.log("==== Selecciona una opción ====".green);
  console.log("===============================\n".green);

  const { opt } = await inquirer.prompt(preguntas);

  return opt;
};

const pause = async () => {
  const question = [
    {
      type: "input",
      name: "key",
      message: `Presiona ${"ENTER".blue} para continuar`,
    },
  ];

  console.log("\n");
  await inquirer.prompt(question);
};

const readInput = async (message) => {
  const question = [
    {
      type: "input",
      name: "description",
      message,
      validate(value) {
        // Validar que el mensaje si venga
        if (value.length === 0) {
          return "Por favor ingrese una descripción";
        }

        return true;
      },
    },
  ];

  const { description } = await inquirer.prompt(question);

  return description;
};

module.exports = {
  inquirerMenu,
  pause,
  readInput,
};

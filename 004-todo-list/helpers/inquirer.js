const inquirer = require("inquirer");
require("colors");

const preguntas = [
  {
    type: "list",
    name: "opt",
    message: "¿Qué desea hacer?",
    choices: [
      { value: "1", name: "1.".green + " Crear tarea" },
      { value: "2", name: "2.".green + " Listar tareas" },
      { value: "3", name: "3.".green + " Listar tareas completadas" },
      { value: "4", name: "4.".green + " Listar tareas pendientes" },
      { value: "5", name: "5.".green + " Completar tarea(s)" },
      { value: "6", name: "6.".green + " Borrar tarea" },
      { value: "0", name: "0.".green + " Salir" },
    ],
  },
];

const inquirerMenu = async () => {
  console.clear();
  console.log("===============================".green);
  console.log("==== Selecciona una opción ====".white);
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

const mostrarTareasParaBorrar = async (tareas = []) => {
  const choices = tareas.map((tarea, idx) => {
    return {
      value: tarea.id,
      name: `${idx + 1}. `.green + tarea.description,
    };
  });

  choices.unshift({
    value: "0",
    name: "0. ".green + "Cancelar",
  });

  const listaTareas = [
    {
      type: "list",
      name: "id",
      message: "Selecciona la tarea a borrar",
      choices,
    },
  ];

  const { id } = await inquirer.prompt(listaTareas);
  return id;
};

const confirmar = async (message) => {
  const question = [
    {
      type: "confirm",
      name: "response",
      message,
    },
  ];

  const { response } = await inquirer.prompt(question);
  return response;
};

const mostrarListadoCheckList = async (tareas = []) => {
  const choices = tareas.map((tarea, idx) => {
    return {
      value: tarea.id,
      name: `${idx + 1}. `.green + tarea.description,
      checked: tarea.completed,
    };
  });

  const listaTareas = [
    {
      type: "checkbox",
      name: "ids",
      message: "Selecciona",
      choices,
    },
  ];

  const { ids } = await inquirer.prompt(listaTareas);
  return ids;
};

module.exports = {
  inquirerMenu,
  pause,
  readInput,
  mostrarTareasParaBorrar,
  confirmar,
  mostrarListadoCheckList,
};

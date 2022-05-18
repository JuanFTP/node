const empleados = [
  {
    id: 1,
    nombre: "Juan",
  },
  {
    id: 2,
    nombre: "Daniel",
  },
  {
    id: 3,
    nombre: "Oscar",
  },
  {
    id: 4,
    nombre: "Ivan",
  },
];

const salarios = [
  {
    id: 1,
    salario: 1000,
  },
  {
    id: 2,
    salario: 2500,
  },
];

const getEmpleado = (id) =>
  new Promise((resolve, reject) => {
    const empleado = empleados.find((emp) => emp.id === id)?.nombre;

    empleado
      ? resolve(empleado)
      : reject(`No existe un empleado con id: ${id}`);
  });

const getSalario = (id) =>
  new Promise((resolve, reject) => {
    const salario = salarios.find((sal) => sal.id === id)?.salario;

    salario
      ? resolve(salario)
      : reject(`El salario para el empleado con id: ${id} no existe.`);
  });

// Transforma una función en una promesa para resolverse
const getInfoUsuario = async (id) => {
  try {
    // Se permite a funciones que trabajan con promesas
    const empleado = await getEmpleado(id);
    const salario = await getSalario(id);

    return [empleado, salario];
  } catch (error) {
    throw error;
  }
};

const id = 1;

getInfoUsuario(id)
  .then((msg) => {
    console.log("Todo bien!!");
    console.log(msg);
  })
  .catch((err) => {
    console.log("Todo mal!!");
    console.log(err);
  });

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

// TESTING ZONE
let id = 1;

/* getEmpleado(id)
  .then((empleado) => {
    getSalario(id)
      .then((salario) =>
        console.log(`El empleado: ${empleado} tiene un salario de: ${salario}`)
      )
      .catch((msg) => console.log(msg));
  })
  .catch((msg) => console.log(msg));
 */

let nombre;

// Promesas en cadena
getEmpleado(id)
  .then((empleado) => {
    nombre = empleado;

    return getSalario(id);
  })
  .then((salario) =>
    console.log(`El empleado: ${nombre} tiene un salario de: ${salario}`)
  )
  .catch((err) => console.log(err));

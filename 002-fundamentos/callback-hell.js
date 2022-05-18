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

const getEmpleado = (id, callback) => {
  const empleado = empleados.find((emp) => emp.id === id)?.nombre;

  if (empleado) {
    return callback(null, empleado);
  } else {
    return callback(`The employed with id: ${id} not found`, null);
  }
};

const getSalario = (id, callback) => {
  const salario = salarios.find((sal) => sal.id === id)?.salario;

  if (salario) {
    return callback(null, salario);
  } else {
    return callback(
      `The employed with id: ${id} has not assigned salary`,
      null
    );
  }
};

/*EXECUTION ZONE*/
let id = 1;

getEmpleado(id, (err, empleado) => {
  if (err) {
    console.log("ERR!");
    return console.log(err);
  }

  getSalario(id, (err, salario) => {
    if (err) {
      console.log("ERR!");
      return console.log(err);
    }

    console.log(
      `The employed with id: ${empleado} has a assigned salary: ${salario}`
    );
  });
});

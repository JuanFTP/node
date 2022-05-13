/* setTimeout(() => {
  console.log("Hola");
}, 2500);
*/

const getUsuarioById = (id, callback) => {
  const usuario = {
    id,
    nombre: "Juan",
  };

  setTimeout(() => {
    callback(usuario);
  }, 1500);
};

// La función se pasa como callback, es decir una función que se ejecutará después
getUsuarioById(737837, ({ nombre }) => {
  console.log(nombre.toUpperCase());
});

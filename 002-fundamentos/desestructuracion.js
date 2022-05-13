const deadpool = {
  nombre: "Wadde",
  apellido: "Wilson",
  poder: "Regeneración",
  //edad: 500,
  getNombre() {
    return `${this.nombre} ${this.apellido} ${this.poder}`;
  },
};

console.log(deadpool.getNombre());

// Son valores let, por lo que pueden reescribirse pero no deberían
function imprimeHeroe({ nombre, apellido, poder, edad = 0 }) {
  console.log(`${nombre} ${apellido} ${poder} ${edad}`);
}

imprimeHeroe(deadpool);

const heroes = ["Deadpool", "Superman", "Batman"];

const [h1, h2, h3] = heroes;
const [, , heroeDeInteres] = heroes;

console.log(h1, h2, h3);

console.log(heroeDeInteres);

/*
scopes
var ámbito global (no usar ya casi casi, deprecado)
let ámbito local (no permite re-declaración)
const ámbito local (no permite re-asignación) (más ligera)
*/

let nombre = "Wolverine";

if (true) {
  let nombre = "Magneto";
	
  console.log(nombre);
}

console.log(nombre);

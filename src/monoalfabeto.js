const { alfabeto } = require("./util/alfabetos");

function crearNuevoAlfabeto(clave) {
  // eliminamos letras repetidas de la clave
  const claveSinRepetir = [...new Set(clave)];
  const tamanoClave = claveSinRepetir.length;

  // completamos el resto del alfabeto sin repetir las letras de la clave
  const restoDelAlfabeto = alfabeto.filter(
    (letra) => !claveSinRepetir.includes(letra)
  );
  const tamanoResto = restoDelAlfabeto.length;

  // construimos las filas del nuevo alfabeto
  const numFilas = Math.ceil(tamanoResto / tamanoClave);
  const filas = [claveSinRepetir];
  for (let i = 0; i < numFilas; i++) {
    filas.push(
      restoDelAlfabeto.slice(i * tamanoClave, i * tamanoClave + tamanoClave)
    );
  }

  // leemos las filas de arriba hacia abajo para construir el nuevo alfabeto
  const nuevoAlfabeto = [];
  for (let i = 0; i < tamanoClave; i++) {
    for (let j = 0; j < filas.length; j++) {
      const letra = filas[j][i];
      if (letra !== undefined) {
        nuevoAlfabeto.push(letra);
      }
    }
  }

  return nuevoAlfabeto;
}

function cifrarMonoalfabetico(mensaje, clave) {
  const nuevoAlfabeto = crearNuevoAlfabeto(clave);

  const mensajeCifrado = mensaje
    .split("")
    .map((letra) => {
      const indice = alfabeto.indexOf(letra.toLowerCase());
      return indice !== -1 ? nuevoAlfabeto[indice] : letra;
    })
    .join("");

  return mensajeCifrado;
}

function descifrarMonoalfabetico(mensajeCifrado, clave) {
  const nuevoAlfabeto = crearNuevoAlfabeto(clave);

  const mensaje = mensajeCifrado
    .split("")
    .map((letra) => {
      const indice = nuevoAlfabeto.indexOf(letra.toLowerCase());
      return indice !== -1 ? alfabeto[indice] : letra;
    })
    .join("");

  return mensaje;
}

// Pailas las tildes
const mensajeOriginal =
  "Revuelo por extraño objeto de metal que aparecio en Japon";
const clave = "universidad";

const mensajeCifrado = cifrarMonoalfabetico(mensajeOriginal, clave);
const mensajeDescifrado = descifrarMonoalfabetico(mensajeCifrado, clave);

console.log(mensajeCifrado);
console.log(mensajeDescifrado);

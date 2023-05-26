const { alfabeto } = require("./util/alfabetos");

const cifrarCesar = (mensaje, desplazamiento) => {
  let resultado = "";

  for (let i = 0; i < mensaje.length; i++) {
    let caracter = mensaje[i].toLowerCase();
    let indice = alfabeto.indexOf(caracter);

    if (indice !== -1) {
      let nuevoIndice = (indice + desplazamiento) % alfabeto.length;
      let nuevoCaracter = alfabeto[nuevoIndice];

      if (mensaje[i] === mensaje[i].toUpperCase()) {
        nuevoCaracter = nuevoCaracter.toUpperCase();
      }

      resultado += nuevoCaracter;
    } else {
      resultado += mensaje[i];
    }
  }

  return resultado;
};

function descifrarCesar(mensajeCifrado, desplazamiento) {
  let resultado = "";

  for (let i = 0; i < mensajeCifrado.length; i++) {
    let caracter = mensajeCifrado[i].toLowerCase();
    let indice = alfabeto.indexOf(caracter);

    if (indice !== -1) {
      let nuevoIndice = (indice - desplazamiento) % alfabeto.length;

      if (nuevoIndice < 0) {
        nuevoIndice += alfabeto.length;
      }

      let nuevoCaracter = alfabeto[nuevoIndice];

      if (mensajeCifrado[i] === mensajeCifrado[i].toUpperCase()) {
        nuevoCaracter = nuevoCaracter.toUpperCase();
      }

      resultado += nuevoCaracter;
    } else {
      resultado += mensajeCifrado[i];
    }
  }

  return resultado;
}

const msgCifrado = cifrarCesar("Esta es una prueba con ñ", 8);
const msgDescifrado = descifrarCesar(msgCifrado, 8);
console.log(msgCifrado);
console.log(msgDescifrado);

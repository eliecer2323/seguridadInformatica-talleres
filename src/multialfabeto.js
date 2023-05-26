const { multialfabeto } = require("./util/alfabetos");

function cifrarMultialfabetico(mensaje, clave) {
  const tamanoClave = clave.length;
  let indiceMensaje = 0;
  const mensajeCifrado = mensaje
    .split("")
    .map((letra) => {
      const alfabeto = multialfabeto[letra.toLowerCase()];
      if (alfabeto) {
        indice = indiceMensaje % tamanoClave;
        letraClave = clave[indice];
        indiceMensaje++;
        return alfabeto[letraClave];
      }
      return letra;
    })
    .join("");

  return mensajeCifrado;
}

function descifrarMultialfabetico(mensajeCifrado, clave) {
  const tamanoClave = clave.length;
  let indiceMensaje = 0;
  const mensaje = mensajeCifrado
    .split("")
    .map((letra) => {
      const alfabeto = multialfabeto[letra];
      if (alfabeto) {
        indice = indiceMensaje % tamanoClave;
        letraClave = clave[indice].toLowerCase();
        indiceMensaje++;
        const alfabetoReverso = multialfabeto[letraClave];
        for (const key in alfabetoReverso) {
          if (alfabetoReverso[key] === letra.toLowerCase()) {
            return key;
          }
        }
      }
      return letra;
    })
    .join("");

  return mensaje;
}

const mensajeOriginal = "Cual es la localidad de bogota";
const clave = "medidas";

const mensajeCifrado = cifrarMultialfabetico(mensajeOriginal, clave);
const mensajeDescifrado = descifrarMultialfabetico(mensajeCifrado, clave);

console.log(mensajeCifrado);
console.log(mensajeDescifrado);

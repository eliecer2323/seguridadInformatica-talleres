function asignarOrdenAlfabetico(letras) {
  const letrasOrdenadas = letras.sort();
  const ordenAlfabetico = {};

  letrasOrdenadas.forEach((letra, indice) => {
    ordenAlfabetico[letra] = indice + 1;
  });

  return ordenAlfabetico;
}

function trasponerMatrix(matrix) {
  const rows = matrix.length;
  const cols = matrix[0].length;

  const transposed = new Array(cols);
  for (let i = 0; i < cols; i++) {
    transposed[i] = new Array(rows);
    for (let j = 0; j < rows; j++) {
      transposed[i][j] = matrix[j][i];
    }
  }

  return transposed;
}

function cifrarPorTrasposicion(mensaje, clave) {
  const claveSinRepetir = [...new Set(clave)];
  const tamanoClave = claveSinRepetir.length;
  const claveIndices = asignarOrdenAlfabetico([...claveSinRepetir]);

  const filas = {};
  mensaje.split("").forEach((valor, index) => {
    const posicion = claveSinRepetir[index % tamanoClave];
    if (filas[posicion]) {
      filas[posicion].push(valor);
    } else {
      filas[posicion] = [valor];
    }
  });

  let mensajeCifrado = "";
  for (let key in claveIndices) {
    mensajeCifrado += filas[key].join("");
  }
  return mensajeCifrado;
}

function descifrarPorTrasposicion(mensajeCifrado, clave) {
  const claveSinRepetir = [...new Set(clave)];
  const tamanoClave = claveSinRepetir.length;
  const claveIndices = asignarOrdenAlfabetico([...claveSinRepetir]);
  const tamanoMensaje = mensajeCifrado.length;
  const tamanoFilas = Math.ceil(tamanoMensaje / tamanoClave);
  const restante = tamanoMensaje % tamanoClave;

  const filas = {};
  let tamanoAnterior = 0;
  for (let key in claveIndices) {
    const posInit = claveSinRepetir.indexOf(key);
    const tamanoSlice =
      posInit < restante || restante === 0 ? tamanoFilas : tamanoFilas - 1;

    filas[key] = mensajeCifrado
      .slice(tamanoAnterior, tamanoAnterior + tamanoSlice)
      .split("");

    tamanoAnterior += tamanoSlice;
  }

  let mensaje = "";
  for (let i = 0; i < tamanoFilas; i++) {
    const pedazoMsj = claveSinRepetir.map((valor, pos) => {
      if (i + 1 < tamanoFilas || restante === 0 || pos < restante) {
        return filas[valor][i];
      } else {
        return "";
      }
    });
    mensaje += pedazoMsj.join("");
  }

  return mensaje;
}

const mensajeOriginal = "como dijo la señora de las obleas";
const clave = "compa";
const mensajeCifrado = cifrarPorTrasposicion(mensajeOriginal, clave);
const mensajeDescifrado = descifrarPorTrasposicion(mensajeCifrado, clave);

console.log(mensajeCifrado);
console.log(mensajeDescifrado);

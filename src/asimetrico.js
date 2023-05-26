const crypto = require("crypto");
const fs = require("fs");

function encrypt(message, publicKey) {
  const encriptado = crypto.publicEncrypt(publicKey, Buffer.from(message));
  fs.writeFileSync("./mensaje-encriptado.bin", encriptado);
  return encriptado.toString("base64");
}

function decrypt(inputFilePath, privateKey, passphrase) {
  const encryptedData = fs.readFileSync(inputFilePath);
  const decryptedData = crypto.privateDecrypt(privateKey, encryptedData);
  fs.writeFileSync("mensaje-desencriptado.txt", decryptedData);
}

const publicKey = fs.readFileSync("public_key.pem");
const privateKey = fs.readFileSync("private_key.pem");

const message = "Hola, mundo!";

const encryptedMessage = encrypt(message, publicKey);
decrypt("./mensaje-encriptado.bin", privateKey, null);

console.log(encryptedMessage);

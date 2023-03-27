const { generateKeyPairSync } = require('crypto');

const { privateKey, publicKey } = generateKeyPairSync('rsa', {
  modulusLength: 2048, // la longitud de tu llave en bits
  publicKeyEncoding: {
    type: 'spki', // se recomienda que sea 'spki' por NodeJS
    format: 'pem',
  },
  privateKeyEncoding: {
    type: 'pkcs8', // se recomienda que sea 'pkcs8' por NodeJS
    format: 'pem',
  },
});

console.log(publicKey); // llave publica
console.log(privateKey); // llave privada
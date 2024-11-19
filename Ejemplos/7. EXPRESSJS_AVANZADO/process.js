
"use strict";
let args = process.argv;
let suma;
// Los dos primeros elementos de process.argv son el
// nombre del ejecutable de Node, y el nombre del script
for (let j = 0; j < process.argv.length; j++) {
  console.log(j + " -> " + process.argv[j]);
}
if (args.length === 4) {
  suma = Number(args[2]) + Number(args[3]);
} else {
  suma = "No definida";
}
console.log(`Path del ejecutable: ${process.execPath}`);
console.log(`Suma: ${suma}`);
console.log(`Sistema operativo: ${process.platform}`);
console.log(`Versión de node: ${process.version}`);
console.log(`Arquitectura: ${process.arch}`);

console.log("----------------");
let os = require("os");
console.log(os.homedir());
console.log(os.tmpdir());

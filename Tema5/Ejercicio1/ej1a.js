"use strict";
const fs = require("fs");

const ficheroOrigen = "fichero.txt",
  ficheroDestino = "ficheroNuevo.txt";

fs.readFile(ficheroOrigen, { encoding: "utf-8" }, (err, contenido) => {
  if (err) {
    console.log(
      `Ha ocurrido un error durante la lectura del fichero ${ficheroOrigen}. Error: ${err.message}`
    );
  } else {
    const regex = /\s{1,}/g;
    console.log(`Contenido de ${ficheroOrigen}\n: ${contenido}`);
    var resultado = contenido.replace(regex, " ");
    console.log(`Resultado de aplicarle la expresión\n: ${resultado}`);
    fs.writeFile(ficheroDestino, resultado, "utf-8", (err, contenido) => {
      if (err) {
        console.log(
          `Ha ocurrido un error durante la escritura en el fichero ${ficheroDestino}. Error: ${err.message}`
        );
      } else {
        console.log("Ejercicio terminado!");
      }
    });
  }
});

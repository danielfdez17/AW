"use strict";

console.log("EJERCICIO UNO");
console.log("!Hola mundo¡\n");

console.log("EJERCICIO DOS");
var alumno = {
  nombre: "Juan",
  apellidos: "González",
  notas: [8, 8, 2, 4],
  dni: 4098976,
  edad: 18,
};

console.log("EJERCICIO TRES");
let a = 5,
  b = 10,
  c = 3;
if (a > b && a > c) {
  console.log(`El mayor de ${a}, ${b} y ${c} es ${a}`);
} else if (b > a && b > c) {
  console.log(`El mayor de ${a}, ${b} y ${c} es ${b}`);
} else {
  console.log(`El mayor de ${a}, ${b} y ${c} es ${c}`);
}

console.log("EJERCICIO CUATRO");
console.log("HACER MÁS TARDE: ");

console.log("EJERCICIO CINCO");
let frase = "Hola que tal?",
  cont = 0;
frase.array.forEach((c) => {
  if (c == "a") {
    ++cont;
  }
});

console.log(`La frase "${frase}" tiene ${cont} letras 'a'`);

console.log("EJERCICIO SEIS");
let frase2 = "Esto es una prueba de AW";
console.log(`La frase ${frase2} tiene ${frase2.split(" ").length} palabras`);

console.log("EJERCICIO SIETE");
try {
  console.log(variableNoDefinida);
} catch (error) {
  console.log(`Nombre del error: ${error.name}
                Mensaje del error: ${error.message}`);
} finally {
  console.log("Intento de acceso a variable no definida");
}

console.log("EJERCICIO OCHO");
function isUndef(x) {
  return x === undefined;
}
console.log(isUndef(variableNoDefinida));

console.log("EJERCICIO NUEVE");
function getParamType(param) {
  if (param === number) console.log(`${param} es un numero`);
  else if (param === boolean) console.log(`${param} es un booleano`);
  else if (param === string) console.log(`${param} es una cadena`);
  else if (param === undefined) console.log(`${param} es indefinida`);
  // else if (param === function) console.log(`${param} es una función`);
  else if (param === object) console.log(`${param} es un objeto`);
}



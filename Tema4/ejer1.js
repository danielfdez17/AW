"use strict";
function producto(x, y) {
  if (typeof(x) === "number" && typeof(y) === "number") return x * y;
  if (typeof(x) === "number" && typeof(y) === Array)
    return x.array.forEach((element) => {
      x * element;
    });
  if (typeof(x) === Array && typeof(y) === "number")
    return x.array.forEach((element) => {
      y * element;
    });
  if (typeof(x) === Array && typeof(y) === Array && x.length === y.length) {
    var z;
    for (let i = 0; i < x.length; ++i) {
      z[i] = x[i] * y[i];
    }
    return z;
  }

  throw Error(
    "No se puede realizar la operación porque los arrays no tienen la misma longitud"
  );
}

console.log(`Multiplicar dos números: ${producto(2, 3)}`);
console.log(`Multiplicar un número por un array: ${producto(2, [1, 2, 3])}`);
console.log(`Multiplicar un array por un número: ${producto([1, 2, 3], 2)}`);
console.log(`Multiplicar dos arrays: ${producto([1, 2, 3], [1, 2, 3])}`);


function controlErrores() {
    try {}
    catch (error) {}
}
"use strict";
function producto(x, y) {
  if (x === number && y === number) return x * y;
  if (x === number && y === Array)
    return x.array.forEach((element) => {
      x * element;
    });
  if (x === Array && y === number)
    return x.array.forEach((element) => {
      y * element;
    });
  if (x === Array && y === Array && x.length === y.length) {
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

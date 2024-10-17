"use strict";

module.exports = {
  sum: (a, b) => {
    return a + b;
  },
  subtract: (a, b) => {
    return a - b;
  },
  multiply: (a, b) => {
    return a * b;
  },
  divide: (a, b) => {
    if (b == 0) throw Error("No se puede dividir por 0");
    return a / b;
  },
};

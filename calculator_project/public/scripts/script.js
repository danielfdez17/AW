"use strict";

// Función que muestra el valor del caracter 'c' en el display
function show(c) {
  let ultimoCaracter = $("#display").val().slice(-1);
  let displayValue = $("#display").val();

  let ultimoNumero = displayValue
    .split(/[\+\-\*\/]/)
    .pop()
    .trim();
  //Permite comenzar con decimales 0.x; Sin este if se vería .x sin el 0
  if (
    (c == "." || c == "+" || c == "-" || c == "*" || c == "/") &&
    $("#display").val().length == 1 &&
    $("#display").val() === "0"
  )
    $("#display").val(`0${c}`);
  //Evitamos poder poner mas de 2 puntos en un numero que ya es decimal
  else if (
    (c == "." && parseFloat(ultimoNumero) % 1 !== 0) ||
    (ultimoCaracter == "." && c == ".")
  )
    return;
  else {
    //Sustituimos el operador
    if (/[+\-*/]/.test(ultimoCaracter) && /[+\-*/]/.test(c)) {
      remove();
      $("#display").val($("#display").val() + c);
    } else if ($("#display").val() !== "0")
      $("#display").val($("#display").val() + c);
    else $("#display").val(c);
  }
}

// Función que elimina un caracter del display
function remove() {
  if ($("#display").val() !== "0") {
    let value = $("#display").val();
    let final = value.length - 1;
    $("#display").val(value.slice(0, final));
  }

  if ($("#display").val() == "") $("#display").val("0");
}

// Función que vacía el display
function clearDisplay() {
  $("#display").val("0");
}

// Función que calcula el resultado de la operación ingresada por el usuario
function calculate() {
  try {
    var result = eval($("#display").val());
    $("#display").val(result);
  } catch (error) {
    $("#result").text("Error");
  }
}

// Función que calcula el resultado de la operación ingresada por el usuario utilizando JQuery
$("#formulario").on("submit", (event) => {
  event.preventDefault();
  $.post("/calculate", $(this).serialize(), (data) => {
    $("#display").text(`${data.result}`).show();
  });
});

// Se añaden key listeners por si el usuario prefiere operar con el teclado
document.addEventListener("keydown", (event) => {
  const key = event.key;
  if (
    (key >= 0 && key <= 9 && key != " ") ||
    key == "." ||
    key == "+" ||
    key == "*" ||
    key == "/" ||
    key == "-"
  ) {
    show(key);
  } else if (key.toLowerCase() == "c") clearDisplay();
  else if (key == "=") calculate();
  else if (event.key == "Backspace" || event.key == "Delete") remove();
});

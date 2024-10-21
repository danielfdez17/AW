"use strict";

function show(c) {
  let ultimoCaracter = $("#display").val().slice(-1);
  let displayValue = $("#display").val();

  let ultimoNumero = displayValue.split(/[\+\-\*\/]/).pop().trim();
  //Permite comenzar con decimales 0.x sin este if se vería .x sin el 0
  if(c == "." && 
    ($("#display").val().length == 1 && $("#display").val() === "0")) $("#display").val("0.")
  //Evitamos poder poner mas de 2 puntos en un numero que ya es decimal
  else if((c == "." && parseFloat(ultimoNumero) % 1 !== 0) || (ultimoCaracter == "." && c == ".")) return;
  else
  {
    //Sutiuimos el operador
    if(/[+\-*/]/.test(ultimoCaracter) && /[+\-*/]/.test(c)) 
      {
        remove();
        $("#display").val($("#display").val() + c);
      }
      else if (($("#display").val() !== "0")) $("#display").val($("#display").val() + c);
      else $("#display").val(c);
  }
}

function remove() {
  if ($("#display").val() !== "0") {
    let value = $("#display").val();
    let final = value.length - 1;
    $("#display").val(value.slice(0, final));
  }

  if ($("#display").val() == "") $("#display").val("0");
}

function clearDisplay() {
  $("#display").val("0");
}

function calculate() {
  try {
    var result = eval($("#display").val());
    $("#display").val(result);
  } catch (error) {
    $("#result").text("Error");
  }
}

$("#formulario").on("submit", (event) => {
  event.preventDefault();
  $.post("/calculate", $(this).serialize(), (data) => {
    $("#display").text(`${data.result}`).show();
  });
});

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

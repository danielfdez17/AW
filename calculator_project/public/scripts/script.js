"use strict";

function show(c) {

  let ultimoCaracter = $("#display").val().slice(-1);
 
  //Sustituir ultimo caracter
  if(/[+\-*/]/.test(ultimoCaracter) && /[+\-*/]/.test(c)) 
  {
    remove();
    $("#display").val($("#display").val() + c);
  }
  else if (($("#display").val() !== "0")) $("#display").val($("#display").val() + c);
  else $("#display").val(c);

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
    (key >= 0 && key <= 9) ||
    key == "." ||
    key == "+" ||
    key == "*" ||
    key == "/" ||
    key == "-"
  ) {
    show(key);
  } else if (key == "c") clearDisplay();
  else if (key == "=" || key == "Enter") calculate();
  else if (event.key == "Backspace" || event.key == "Delete") remove();
});

"use strict";

function show(c) {
  let ultimoCaracter = $("#display").val().slice(-1);

  if(c == "." && 
    ($("#display").val().length == 0 
    || $("#display").val().length == 1 && $("#display").val() === "0")) $("#display").val("0.")
  else if((c == "." && parseFloat($("#display").val()) % 1 !== 0) || (ultimoCaracter == "." && c == ".")) return;
  else
  {
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

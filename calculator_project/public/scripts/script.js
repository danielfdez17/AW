"use strict";

var firstValue;
var operator;

function show(c) {
  if ($("#display").val() !== "0") {
    $("#display").val($("#display").val() + c);
  } else {
    $("#display").val(c);
  }
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

// document.addEventListener("DOMContentLoaded", function () {
//   document.querySelectorAll("button").forEach((button) => {
//     button.addEventListener("click", function () {
//       const value = this.value;

//       if (this.name === "data-number") {
//         document.getElementById("result").innerText =
//           document.getElementById("result").value + this.value;
//       } else if (this.name === "data-opera") {
//         firstValue = document.getElementById("result").value;
//         operator = value;
//         document.getElementById("result").value = 0;
//       } else if (this.name === "data-delete") {
//         document.getElementById("result").value = 0;
//       } else if (this.name === "data-igual") {
//         document.getElementById("firstValue").value = firstValue;
//         document.getElementById("operator").value = operator;
//         document.getElementById("secondValue").value =
//           document.getElementById("result").value;
//         document.getElementById("formulario").submit();
//       }
//     });
//   });
// });

"use strict";

$("#btnEnviar").on("click", () => {
  const value = $("#numero").val();

  //   if (isNaN(parseInt(value))) {
  //     alert("Ingrese un numero por favor");
  //   }

  $.ajax({
    type: "GET",
    url: `/multiplica/${value}`,
    success: (res) => {
      $("#resultado").text(res.resultado);
      $("#resultado").removeClass("text-danger");
      $("#resultado").addClass("text-success font-weight-bold text-center");
    },
    error: (xhr, status, err) => {
      $("#resultado").html(
        `Introduce un fucking numero <br> ${err} || ${status} || ${xhr}`
      );
      $("#resultado").removeClass("text-success");
      $("#resultado").addClass("text-danger font-weight-bold text-center");
    },
  });
});

"use strict";

// Se actualiza la minima fecha que puede introducir el usuario para añadir un nuevo evento
$(() => {
  var hoy = new Date();

  var mes = hoy.getMonth() + 1;
  var dia = hoy.getDate();
  var anyo = hoy.getFullYear();
  if (mes < 10) mes = "0" + mes.toString();
  if (dia < 10) dia = "0" + dia.toString();

  var maxDate = anyo + "-" + mes + "-" + dia;

  $("#fecha").prop("min", maxDate);
});

// Se comprueba que la entrada del usuario no contenga inyecciones sql
$("#formNuevoEvento").on("submit", (event) => {
  event.preventDefault();

  const regex = /\b(select|insert|delete|drop|update)\b/;

  if (
    regex.test($("#titulo").val()) ||
    regex.test($("#descripcion").val()) ||
    regex.test($("#fecha").val()) ||
    regex.test($("#hora").val()) ||
    regex.test($("#duracion").val()) ||
    regex.test($("#ubicacion").val()) ||
    regex.test($("#capacidad_maxima").val())
  ) {
    return;
  }

  $("#formNuevoEvento").submit();
});

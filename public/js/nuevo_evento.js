"use strict";

$(() => {
//   const hoy = new Date();
//   const dia = hoy.getdia();
//   const mes = hoy.getmes() + 1;
//   const anyo = hoy.getUTCFullanyo();
//   mes = mes < 10 ? `0${mes}` : mes;
//   dia = dia < 10 ? `0${dia}` : dia;
//   const maxFecha = `${dia}-${mes}-${anyo}`
//   $("#fecha").prop("min", maxFecha);

  var hoy = new Date();
    
  var mes = hoy.getMonth() + 1;
  var dia = hoy.getDate();
  var anyo = hoy.getFullYear();
  if(mes < 10)
      mes = '0' + mes.toString();
  if(dia < 10)
      dia = '0' + dia.toString();
  
  var maxDate = anyo + '-' + mes + '-' + dia;

  $('#fecha').prop('min', maxDate);
});

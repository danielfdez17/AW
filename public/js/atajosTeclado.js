"use strict";

// Configuración de los atajos de teclado
$(document).keydown(function (e) {
  if (e.ctrlKey && e.key === "i") {

    var activeCard = $(document.activeElement).closest('.cardEvento');

    if (activeCard.length) {

      activeCard.find('button').click();
    }
  } else if (e.ctrlKey && e.key === "m") {
    $("#botonPerfil").click();
  }
});

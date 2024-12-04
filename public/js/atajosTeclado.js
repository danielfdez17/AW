"use strict";

// Configuración de los atajos de teclado
$(document).keydown(function (e) {
  if (e.ctrlKey && e.key === "i") {
    // Encontrar la tarjeta activa
    var activeCard = $(document.activeElement).closest('.cardEvento');

    // Verificar si encontramos una tarjeta activa
    if (activeCard.length) {
      // Encontrar el botón dentro de la tarjeta activa y simular el clic
      activeCard.find('button').click();
    }
  } else if (e.ctrlKey && e.key === "m") {
    $("#botonPerfil").click();
  }
});

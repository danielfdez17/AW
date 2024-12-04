"use strict";

// Configuración de los atajos de teclado
$(document).keydown(function (e) {
  if (e.ctrlKey && e.key === "i") {
    // const focusedEvent = $('[id^="evento"]:focus');
    // if (focusedEvent.length > 0) {
    //     focusedEvent.closest('.evento').find('.btn-inscribir').click();
    // }
  } else if (e.ctrlKey && e.key === "m") {
    $("#botonPerfil").click();
  } else if (e.key === "ArrowLeft" || e.key === "ArrowRight") {
    // Acción para navegar entre eventos
    console.log(`Navegar ${e.key === "ArrowLeft" ? "anterior" : "siguiente"}`);
    // Aquí puedes agregar la lógica para navegar
  }
});

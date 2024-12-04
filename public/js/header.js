"use strict;"

$(document).ready(function () {
  function desplegar(botonId) {
    const dropdownboton = $(botonId); // Botón que activa el dropdown
    const dropdownMenu = dropdownboton.next('.dropdown-menu'); // Menú asociado al botón

    // Mostrar el dropdown al pasar el ratón
    dropdownboton.on('mouseenter', function () {
      const instance = bootstrap.Dropdown.getOrCreateInstance(this); // Crea o obtiene la instancia del dropdown
      instance.show(); // Muestra el dropdown
    });

    // Ocultar el dropdown cuando el ratón sale del menú
    dropdownMenu.on('mouseleave', function () {
      const instance = bootstrap.Dropdown.getOrCreateInstance(dropdownboton[0]); // Obtiene la instancia del dropdown
      instance.hide(); // Oculta el dropdown
    });
  }

  // Aplicamos la lógica a los tres botones
  desplegar('#botonNotificaciones');
  desplegar('#botonAccesibilidad');
  desplegar('#botonAtajos');


});
"use strict;"

$(document).ready(function () {
  function desplegar(botonId) {
    const dropdownboton = $(botonId);
    const dropdownMenu = dropdownboton.next('.dropdown-menu');

    // Mostrar el dropdown al pasar el ratón sobre el botón
    dropdownboton.on('mouseenter', function () {
      const instance = bootstrap.Dropdown.getOrCreateInstance(this);
      instance.show();
    });

    // Ocultar el dropdown cuando el ratón sale del botón o del menú
    dropdownboton.on('mouseleave', function () {
      const instance = bootstrap.Dropdown.getOrCreateInstance(dropdownboton[0]);

      // Verificamos si el ratón está fuera del dropdown
      setTimeout(function () {
        if (!dropdownMenu.is(':hover') && !dropdownboton.is(':hover')) {
          instance.hide();
        }
      }, 30);
    });

    // Si el ratón sale del menú, ocultamos el dropdown
    dropdownMenu.on('mouseleave', function () {
      const instance = bootstrap.Dropdown.getOrCreateInstance(dropdownboton[0]);
      instance.hide(); // Oculta el dropdown
    });
  }

  // Aplicamos la lógica a los tres botones
  desplegar('#botonNotificaciones');
  desplegar('#botonAccesibilidad');
  desplegar('#botonAtajos');
});

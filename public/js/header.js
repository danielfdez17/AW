"use strict;"

$(document).ready(function () {
  function desplegar(botonId) {
    const dropdownboton = $(botonId); // Botón que activa el dropdown
    const dropdownMenu = dropdownboton.next('.dropdown-menu'); // Menú asociado al botón

    // Mostrar el dropdown al pasar el ratón sobre el botón
    dropdownboton.on('mouseenter', function () {
      const instance = bootstrap.Dropdown.getOrCreateInstance(this); // Crea o obtiene la instancia del dropdown
      instance.show(); // Muestra el dropdown
    });

    // Ocultar el dropdown cuando el ratón sale del botón o del menú
    dropdownboton.on('mouseleave', function () {
      const instance = bootstrap.Dropdown.getOrCreateInstance(dropdownboton[0]);
      // Verificamos si el ratón está fuera del dropdown
      setTimeout(function () {
        if (!dropdownMenu.is(':hover') && !dropdownboton.is(':hover')) {
          instance.hide(); // Oculta el dropdown si no hay hover en el botón ni en el menú
        }
      }, 30); // Pequeña espera para permitir que el ratón se desplace del botón al menú
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

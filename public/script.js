"use strict";

document.addEventListener("DOMContentLoaded", () => {
    document.getElementById('guardar').onclick = (event) => {
        // Prevenir el envío del formulario temporalmente
        event.preventDefault();

        // Obtener los valores de los campos
        let nombre = document.getElementById('nombre').value.trim();
        let precio = document.getElementById('precio').value.trim();
        let disponibilidad = document.getElementById('disponibilidad').value;
        // Validar que todos los campos requeridos estén completos
        if ((isNaN(parseFloat(nombre)) && typeof nombre === 'string') && !isNaN(parseFloat(precio)) && disponibilidad) {
            // Si todo está completo, mostrar el toast y enviar el formulario
            let toastEl = document.getElementById('nuevo')
            let toast = new bootstrap.Toast(toastEl);
            toast.show();
            setTimeout(() => {
                event.target.closest("form").submit();
            }, 1000); // Opcional: esperar 2 segundos antes de enviar el formulario
        } else {
            // Si falta algún campo, mostrar el toast de error
            let errorToastEl = document.getElementById('error');
            let errorToast = new bootstrap.Toast(errorToastEl);
            errorToast.show();
        }
    };

    document.querySelectorAll('.boton-eliminar').forEach(boton => {
        boton.onclick = (event) => {
            event.preventDefault();
            let toastEl = document.getElementById('eliminar');
            let toast = new bootstrap.Toast(toastEl);
            toast.show();
            
            // Obtener el formulario más cercano
            let form = event.target.closest("form");

            setTimeout(() => {
                form.submit();
            }, 1000); // Opcional: esperar 2 segundos antes de enviar el formulario
        };
    });
});
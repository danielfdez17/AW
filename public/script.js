"use strict";

//Añadimos un listener para cuando el archivo este complentamente cargado
document.addEventListener("DOMContentLoaded", () => {

    //Añadimos un listener para el boton de guardar del modal
    document.getElementById('guardar').onclick = (event) => {

        // Prevenir el envío del formulario temporalmente
        event.preventDefault();

        // Obtener los valores de los campos, eliminado los posibles espacios en blanco que puedan sobrar
        let nombre = document.getElementById('nombre').value.trim();
        let precio = document.getElementById('precio').value.trim();
        let disponibilidad = document.getElementById('disponibilidad').value;
        
        // Validar que todos los campos requeridos estén completos
        if ((isNaN(parseFloat(nombre)) && typeof nombre === 'string') && !isNaN(parseFloat(precio)) && disponibilidad) {
            
            // Si todo está completo, mostrar el toast y enviar el formulario
            let toastEl = document.getElementById('acierto')
            toastEl.innerHTML  = 
            ` <div class="d-flex">
                <div class="toast-body p-3">
                    Producto ${nombre} añadido correctamente
                </div>
                <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button>
            </div>`;
            let toast = new bootstrap.Toast(toastEl);
            toast.show();

            setTimeout(() => {
                event.target.closest("form").submit();
            }, 1000);
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
            
            let elemento = event.target.closest("li");
            let nombre = elemento.querySelector("#nombre_producto").textContent;

            let toastEl = document.getElementById('acierto');
            toastEl.innerHTML  = 
            ` <div class="d-flex">
                <div class="toast-body p-3">
                    Producto ${nombre} desactivado correctamente
                </div>
                <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button>
            </div>`;

            let toast = new bootstrap.Toast(toastEl);
            
            toast.show();
            
            setTimeout(() => {
                event.target.closest("form").submit();
            }, 1000);
        };
    });
});
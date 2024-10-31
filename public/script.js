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
        
        // Validar que todos los campos requeridos estén completos y con los datos correctos
        if ((isNaN(parseFloat(nombre)) && typeof nombre === 'string') && !isNaN(parseFloat(precio)) && disponibilidad) {
            
            //Mostrar toast de acierto con mensaje correspondiente
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

            //Esperamos 1 segundo antes de enviar el formulario para poder ver el toast
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

    //Añadimos un listenter para cuando se haga click en el boton de eliminar de un elemento
    document.querySelectorAll('.boton-eliminar').forEach(boton => {
        boton.onclick = (event) => {

            // Prevenir el envío del formulario temporalmente
            event.preventDefault();
            
            //Identificamos cual es el nombre del producto mas cercano
            let elemento = event.target.closest("li");
            let nombre = elemento.querySelector("#nombre_producto").textContent;

            //Mostrar toast de acierto con mensaje correspondiente
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
            
            //Esperamos 1 segundo antes de enviar el formulario para poder ver el toast
            setTimeout(() => {
                event.target.closest("form").submit();
            }, 1000);
        };
    });
});
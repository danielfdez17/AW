"use strict";

function productosLeidos(res, productos) {
  res.setHeader("Content-Type", "text/html");

  res.write(`  
        <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Tienda</title>
        <link rel="stylesheet" href="styles.css">
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossorigin="anonymous">
    </head>
    <body class="d-flex vh-100">
        <div class="container-fluid d-flex justify-content-center align-items-center fondo">
            <ul class="w-50 list-group list-group-flush p-1 gap-2 lista">
              
  `);
  productos.forEach((producto) => {
    res.write(`
                <li class="list-group-item d-flex justify-content-between align-items-center py-3 elemento">
                <div>
                <strong>ID:</strong> ${producto.id}<br>
                <strong>Producto:</strong> ${producto.nombre}<br>
                <strong>Fecha de Registro:</strong> ${new Date(
                  producto.fecha_registro
                ).toLocaleDateString()}
                </div>
                <div class="d-flex gap-5 align-items-center">
                <span class="badge bg-primary rounded-pill">
                ${producto.precio}
                </span>
                <button type="submit" class="eliminar m-0 p-0">
                <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="white" class="bi bi-trash" viewBox="0 0 16 16">
                <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z"/>
                <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z"/>
                </svg>
                </button>
                </div>
                </li>
                `);
  });

  res.write(`  

    <li class="list-group-item mx-3 py-3 d-flex align-items-center gap-2 nuevo" data-bs-toggle="modal" data-bs-target="#exampleModal"> 
                    <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class="bi bi-bag-plus" viewBox="0 0 16 16">
                        <path fill-rule="evenodd" d="M8 7.5a.5.5 0 0 1 .5.5v1.5H10a.5.5 0 0 1 0 1H8.5V12a.5.5 0 0 1-1 0v-1.5H6a.5.5 0 0 1 0-1h1.5V8a.5.5 0 0 1 .5-.5"/>
                        <path d="M8 1a2.5 2.5 0 0 1 2.5 2.5V4h-5v-.5A2.5 2.5 0 0 1 8 1m3.5 3v-.5a3.5 3.5 0 1 0-7 0V4H1v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V4zM2 5h12v9a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1z"/>
                      </svg>
                    Nuevo Producto
                </li>
    <li class="list-group-item mx-3 py-3 d-flex align-items-center gap-2 nuevo" data-bs-toggle="modal" data-bs-target="#removeModal"> 
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-bag-x" viewBox="0 0 16 16">
                    <path fill-rule="evenodd" d="M6.146 8.146a.5.5 0 0 1 .708 0L8 9.293l1.146-1.147a.5.5 0 1 1 .708.708L8.707 10l1.147 1.146a.5.5 0 0 1-.708.708L8 10.707l-1.146 1.147a.5.5 0 0 1-.708-.708L7.293 10 6.146 8.854a.5.5 0 0 1 0-.708"/>
                    <path d="M8 1a2.5 2.5 0 0 1 2.5 2.5V4h-5v-.5A2.5 2.5 0 0 1 8 1m3.5 3v-.5a3.5 3.5 0 1 0-7 0V4H1v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V4zM2 5h12v9a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1z"/>
                    </svg>
                    Eliminar Producto
                </li>
            </ul>
        </div>

    <!-- Modal -->
        <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered">
              <div class="modal-content modal-formato">
                <form method="post" action="/productos">
                    <div class="modal-header">
                    <h1 class="modal-title fs-5" id="exampleModalLabel">Añadir nuevo producto</h1>
                    <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <div class="form-outline mb-4">
                            <label class="form-label" for="nombre">Nombre</label>
                            <input id="nombre" class="form-control" name="nombre" placeholder="Introduzca el nombre del producto" required/>
                        </div>
                        <div class="form-outline mb-4">
                            <label class="form-label" for="precio">Precio</label>
                            <input id="precio" class="form-control" name="precio" placeholder="Introduzca el precio del producto" required/>
                        </div>
                        <div class="form-outline mb-4">
                            <label class="form-label" for="disponibilidad">Disponible</label>
                            <select id="disponibilidad" name="disponibilidad" class="form-select" name="disponibilidad" required>
                                <option value="" disabled selected>Introduzca la disponibilidad</option>
                                <option value="1">Sí</option>
                                <option value="0">No</option>
                            </select>
                        </div>
                    </div>
                    <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    <button type="submit" class="btn btn-primary" id="guardar">Guardar cambios</button>
                    </div>
                </form>
              </div>
            </div>
    <!-- Remove Modal -->

        <div class="modal fade" id="removeModal" tabindex="-1" aria-labelledby="removeModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered">
              <div class="modal-content modal-formato">
                <form method="patch" action="/productos">
                    <div class="modal-header">
                    <h1 class="modal-title fs-5" id="removeModalLabel">Eliminar un producto</h1>
                    <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <div class="form-outline mb-4">
                            <label class="form-label" for="id">ID</label>
                            <input id="id" class="form-control" name="id" placeholder="Introduzca el id del producto" required/>
                        </div>
                    </div>
                    <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    <button type="submit" class="btn btn-primary" id="guardar">Guardar cambios</button>
                    </div>
                </form>
              </div>
            </div>
            
            <div class="toast-container position-fixed bottom-0 end-0 p-3">
                <div class="toast align-items-center text-bg-success border-0" role="alert" aria-live="assertive" aria-atomic="true" data-bs-autohide="false" id="nuevo">
                    <div class="d-flex">
                        <div class="toast-body">
                            Producto añadido correctamente
                        </div>
                        <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button>
                    </div>
                </div>
            </div>
        
            <div class="toast-container position-fixed bottom-0 end-0 p-3">
                <div class="toast align-items-center text-bg-success border-0" role="alert" aria-live="assertive" aria-atomic="true" data-bs-autohide="false" id="eliminar">
                    <div class="d-flex">
                        <div class="toast-body">
                            Producto eliminado correctamente
                        </div>
                        <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button>
                    </div>
                </div>
            </div>

            <div class="toast-container position-fixed bottom-0 end-0 p-3">
                <div class="toast align-items-center text-bg-danger border-0" role="alert" aria-live="assertive" aria-atomic="true" id="error">
                    <div class="d-flex">
                        <div class="toast-body">
                            Ha ocurrido un error
                        </div>
                        <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button>
                    </div>
                </div>
            </div> 

        </div>
        <script src="/public/script.js">
        document.getElementById('guardar').onclick = (event) => {
            // Prevenir el envío del formulario temporalmente
            event.preventDefault();

            // Obtener los valores de los campos
            let nombre = document.getElementById('nombre').value.trim();
            let precio = document.getElementById('precio').value.trim();
            let disponibilidad = document.getElementById('disponibilidad').value;

            // Validar que todos los campos requeridos estén completos
            if (nombre && precio && disponibilidad) {
                // Si todo está completo, mostrar el toast y enviar el formulario
                let toastEl = document.getElementById('nuevo')
                let toast = new bootstrap.Toast(toastEl);
                toast.show();
                setTimeout(() => {
                    event.target.closest("form").submit();
                }, 2000); // Opcional: esperar 2 segundos antes de enviar el formulario
            } else {
                // Si falta algún campo, mostrar el toast de error
                let errorToastEl = document.getElementById('error');
                let errorToast = new bootstrap.Toast(errorToastEl);
                errorToast.show();
            }
        };
        </script>
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-YvpcrYf0tY3lHB60NNkmXc5s9fDVZLESaAA55NDzOxhy9GkcIdslK1eN7N6jIeHz" crossorigin="anonymous"></script>
        </body>
        </html>
            `);

  res.end();
}


module.exports = { productosLeidos };

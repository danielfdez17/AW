"use strict";

function productoInsertado(res, nombre) {
  res.setHeader("Content-Type", "text/html");
  res.write(`
      <div class="toast-container position-fixed bottom-0 end-0 p-3">
          <div class="toast align-items-center text-bg-success border-0" role="alert" aria-live="assertive" aria-atomic="true" id="liveToast" data-bs-autohide="false">
              <div class="d-flex">
                  <div class="toast-body">
                      Producto ${nombre} añadido correctamente
                  </div>
                  <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button>
              </div>
          </div>
      </div>
  `);
  res.end();

}

function productoEliminado(res, nombre) {
  res.setHeader("Content-Type", "text/html");
  res.write(`
      <div class="toast-container position-fixed bottom-0 end-0 p-3">
          <div class="toast align-items-center text-bg-success border-0" role="alert" aria-live="assertive" aria-atomic="true" id="liveToast" data-bs-autohide="false">
              <div class="d-flex">
                  <div class="toast-body">
                      Producto ${nombre} eliminado correctamente
                  </div>
                  <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button>
              </div>
          </div>
      </div>
  `);
  res.end();

}

function error(res, error) {
  res.setHeader("Content-Type", "text/html");
  res.write(`
      <div class="toast-container position-fixed bottom-0 end-0 p-3">
          <div class="toast align-items-center text-bg-danger border-0" role="alert" aria-live="assertive" aria-atomic="true" id="liveToast">
              <div class="d-flex">
                  <div class="toast-body">
                      Ha ocurrido un error ${error}
                  </div>
                  <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button>
              </div>
          </div>
      </div> 
  `);
  res.end();
}

function productosLeidos(res, productos) {
  res.setHeader("Content-Type", "text/html");  
  productos.forEach((producto) => {
    res.write(`
      <li class="list-group-item d-flex justify-content-between align-items-center py-3 elemento">
        <div>
          <strong>Producto:</strong> ${producto.nombre}<br>
          <strong>Fecha de Registro:</strong> ${new Date(producto.fecha_registro).toLocaleDateString()}
        </div>
        <span class="badge bg-primary rounded-pill">
          $${producto.precio.toFixed(2)}
        </span>
      </li>
    `);
  });
  res.end();

}

module.exports = { productoEliminado, productoInsertado, error, productosLeidos };


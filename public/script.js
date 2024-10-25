"use strict";

function productoInsertado(res, nombre) {
  res.setHeader("Content-Type", "text/html");
  res.write("<div class='container'>");
  res.write(`<p>Producto ${nombre} añadido correctamente</p>`);
  res.write("</div>");
}

function productoEliminado(res, nombre) {
  res.setHeader("Content-Type", "text/html");
  res.write("<div class='container'>");
  res.write(`<p>Producto ${nombre} añadido correctamente</p>`);
  res.write("</div>");
}

function productosLeidos(res, productos) {
  res.setHeader("Content-Type", "text/html");
  res.write("<div class='container'>");
  res.write("<table>");
  res.write(
    "<tr><th>Nombre</th><th>Precio</th><th>Fecha de registro</th></tr>"
  );
  
  productos.forEach((producto) => {
    res.write("<tr>");
    res.write(`<td>${producto.nombre}</td>`);
    res.write(`<td>${producto.precio}</td>`);
    res.write(`<td>${producto.fecha_registro}</td>`);
    res.write("</tr>");
  });
  res.write("</table>");
  res.write("</div>");
}

module.exports = { productoEliminado, productoInsertado, productosLeidos };


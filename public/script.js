"use strict";

function productoInsertado(res, nombre) {
  res.setHeader("Content-Type", "text/html");
  res.write("<html>");
  res.write("<head>");
  res.write("<title>Base de datos de productos</title>");
  res.write("<meta charset='utf-8'>");
  res.write(
    "<link href='https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css' rel='stylesheet' integrity='sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH' crossorigin='anonymous'>"
  );
  res.write("</head>");
  res.write("<body>");
  res.write("<div class='container'>");
  res.write(`<p>Producto ${nombre} añadido correctamente</p>`);
  res.write("</div>");
  res.write("</body>");
  res.write("</html>");
}
function productoEliminado(res, nombre) {
  res.setHeader("Content-Type", "text/html");
  res.write("<html>");
  res.write("<head>");
  res.write("<title>Base de datos de productos</title>");
  res.write("<meta charset='utf-8'>");
  res.write(
    "<link href='https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css' rel='stylesheet' integrity='sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH' crossorigin='anonymous'>"
  );
  res.write("</head>");
  res.write("<body>");
  res.write("<div class='container'>");
  res.write(`<p>Producto ${nombre} añadido correctamente</p>`);
  res.write("</div>");
  res.write("</body>");
  res.write("</html>");
}
function productosLeidos(res, productos) {
  res.setHeader("Content-Type", "text/html");
  res.write("<html>");
  res.write("<head>");
  res.write("<title>Base de datos de productos</title>");
  res.write("<meta charset='utf-8'>");
  res.write(
    "<link href='https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css' rel='stylesheet' integrity='sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH' crossorigin='anonymous'>"
  );
  res.write("</head>");
  res.write("<body>");
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
  res.write("</body>");
  res.write("</html>");
}

module.exports = { productoEliminado, productoInsertado, productosLeidos };

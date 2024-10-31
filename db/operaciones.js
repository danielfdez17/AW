"use strict";

// Función que inserta un producto en la BD
function insertarProducto(pool, producto, callback) {
  pool.getConnection((err, connection) => {
    if (err) {
      callback(err);
    } else {
      const sql =
        "INSERT INTO productos (nombre, precio, disponible, activo) VALUES (?, ?, ?, 1)";
      connection.query(
        sql,
        [producto.nombre, producto.precio, producto.disponibilidad],
        (err, rows) => {
          connection.release();
          if (err) {
            callback(err);
          } else {
            callback(null, rows);
          }
        }
      );
    }
  });
}
// Función que elimina un producto de la BD (baja lógica, no física)
function eliminarProducto(pool, id, callback) {
  pool.getConnection((err, connection) => {
    if (err) {
      callback(err);
    } else {
      const sql = "UPDATE productos SET activo = 0 WHERE id = ?";
      connection.query(sql, [id], (err, rows) => {
        connection.release();
        if (err) {
          callback(err);
        } else {
          callback(null, rows);
        }
      });
    }
  });
}
// Función que lee todos los productos que estén activos en la BD
function leerProductos(pool, callback) {
  pool.getConnection((err, connection) => {
    if (err) {
      callback(err);
    } else {
      const sql = "SELECT * FROM productos WHERE activo = 1";
      connection.query(sql, (err, rows) => {
        connection.release();
        if (err) {
          callback(err);
        } else {
          callback(null, rows === undefined ? [] : rows);
        }
      });
    }
  });
}

module.exports = {
  insertarProducto,
  eliminarProducto,
  leerProductos,
};

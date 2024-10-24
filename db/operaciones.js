"use strict";
const { pool } = require("../app.js");

function insertarProducto(producto) {}
function eliminarProducto(id, callback) {
  pool.getConnection((err, connection) => {
    if (err) {
      callback(err);
    } else {
      const sql = "UPDATE productos SET activo = 0 WHERE activo = ?";
      connection.query(sql, [id], (err, rows) => {
        connection.release();
        if (err) {
          callback(err);
        } else {
          callback(null, filas);
        }
      });
    }
  });
}
function leerProductos() {
  pool.getConnection((err, connection) => {
    if (err) {
      callback(err);
    } else {
      const sql = "SELECT * FROM productos WHERE activo = 1";
      connection.query(sql, (err, rows) => {
        if (err) {
          callback(err);
        } else {
          callback(null, rows);
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

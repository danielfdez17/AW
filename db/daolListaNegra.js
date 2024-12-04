"use strict";

// Clase que accede a los datos relacionados con los usuarios que han intentado acceder sin autorización en el sistema de la aplicación
class DAOListaNegra {
  pool;
  constructor(pool) {
    this.pool = pool;
  }

  createListaNegra(intruso, callback) {
    this.pool.getConnection((err, connection) => {
      if (err) {
        callback(err);
        return;
      }
      const sql = "INSERT INTO listaNegra (ip) VALUES (?)";
      connection.query(sql, [intruso], (err, rows) => {
        connection.release();
        if (err) {
          callback(err);
          return;
        }
        callback(null, rows[0]);
      });
    });
  }

  readListaNegra(intruso, callback) {
    this.pool.getConnection((err, connection) => {
      if (err) {
        callback(err);
        return;
      }
      const sql = "SELECT * FROM listaNegra WHERE ip = ?";
      connection.query(sql, [intruso], (err, rows) => {
        connection.release();
        if (err) {
          callback(err);
          return;
        }
        callback(null, rows[0]);
      });
    });
  }
}

module.exports = DAOListaNegra;

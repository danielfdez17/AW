"use strict";

// Clase que accede a los datos relacionados con las notificaciones a los usuarios
class DAONotificaciones {
  pool;
  constructor(pool) {
    this.pool = pool;
  }

  readNotificacionesPorUsuario(id, callback) {
    this.pool.getConnection((err, connection) => {
      if (err) {
        callback(err);
        return;
      }
      const sql =
        "SELECT * FROM notificaciones WHERE activo = true AND id_usuario = ?";
      connection.query(sql, [id], (err, rows) => {
        connection.release();
        if (err) {
          callback(err);
          return;
        }
        callback(rows);
      });
    });
  }

  EliminarNotificaciones(id, callback) {
    this.pool.getConnection((err, connection) => {
      if (err) {
        callback(err);
        return;
      }
      const sql = "UPDATE notificaciones SET activo = false WHERE id = ?";
      connection.query(sql, [id], (err, rows) => {
        connection.release();
        if (err) {
          callback(err);
          return;
        }
        callback(null, rows);
      });
    });
  }
}

module.exports = DAONotificaciones;

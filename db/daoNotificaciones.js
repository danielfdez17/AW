"use strict";

class DAOFacultades {
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
      const sql = "SELECT * FROM notificaciones WHERE id_usuario = ?";
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

  readEliminarNotificaciones(id, callback) {
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
        callback(rows);
      });
    });
  }
}

module.exports = DAOFacultades;

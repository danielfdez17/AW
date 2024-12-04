"use strict";

class DAOComentarios {
  pool;
  constructor(pool) {
    this.pool = pool;
  }

  createComentario(comentario, callback) {
    this.pool.getConnection((err, connection) => {
      if (err) {
        callback(err);
        return;
      }
      const sql =
        "INSERT INTO comentarioyvaloraciones (id_usuario, id_evento, comentario, valoracion) VALUES (?, ?, ?, ?)";
      connection.query(
        sql,
        [
          comentario.id_usuario,
          comentario.id_evento,
          comentario.comentario,
          comentario.valoracion,
        ],
        (err, rows) => {
          connection.release();
          if (err) {
            callback(err);
            return;
          }
          callback(rows[0]);
        }
      );
    });
  }

  readComentarios(id_usuario, id_evento, callback) {
    this.pool.getConnection((err, connection) => {
      if (err) {
        callback(err);
        return;
      }
      const sql =
        "SELECT * FROM comentarioyvaloraciones WHERE id_evento = ?";
      connection.query(sql, [id_evento], (err, rows) => {
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

module.exports = DAOComentarios;

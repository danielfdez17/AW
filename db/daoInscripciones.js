"use strict";

class DAOInscripciones {
  pool;
  constructor(pool) {
    this.pool = pool;
  }

  readEventosInscritosPorAsistente(id, callback) {
    this.pool.getConnection((err, connection) => {
      if (err) {
        callback(err);
        return;
      }
      const sql =
        "SELECT e.id, e.titulo, e.descripcion, e.fecha, e.hora, e.ubicacion, e.capacidad_maxima, e.id_organizador, e.tipo_evento FROM inscripciones i JOIN eventos e ON i.id_evento = e.id WHERE id_usuario = ?";
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

  readTotalAsistentesAEvento(id_evento, callback) {
    this.pool.getConnection((err, connection) => {
      if (err) {
        callback(err);
        return;
      }
      const sql = "SELECT COUNT(*) FROM inscripciones WHERE id_evento = ?";
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

module.exports = DAOInscripciones;

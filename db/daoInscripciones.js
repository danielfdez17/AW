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
        "SELECT e.id, e.titulo, e.descripcion, e.fecha, e.hora, e.ubicacion, e.capacidad_maxima, e.id_organizador, e.tipo_evento FROM eventos e JOIN inscripciones i ON i.id_evento = e.id WHERE i.id_usuario = ?;";
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

  createInscripcion(inscripcion, callback) {
    this.pool.getConnection((err, connection) => {
      if (err) {
        callback(err);
        return;
      }
      const sql =
        "INSERT INTO inscripciones (id_usuario, id_evento, estado, fecha_inscripcion) VALUES (?, ?, ?, ?)";
      connection.query(
        sql,
        [
          inscripcion.id_usuario,
          inscripcion.id_evento,
          inscripcion.estado,
          inscripcion.fecha_inscripcion,
        ],
        (err, rows) => {
          connection.release();
          if (err) {
            callback(err);
            return;
          }
          callback(null, rows[0]);
        }
      );
    });
  }

}

module.exports = DAOInscripciones;

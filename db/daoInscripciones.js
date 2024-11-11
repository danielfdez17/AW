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
        const sql = "SELECT e.id, e.titulo, e.descripcion, e.fecha, e.hora, e.ubicacion, e.capacidad_maxima, e.id_organizador FROM inscripciones i JOIN eventos e ON i.id_evento = e.id WHERE id_usuario = ?";
        connection.query(sql, [id], (err, rows) => {
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
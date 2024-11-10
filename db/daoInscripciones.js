"use strict";

class DAOInscripciones {
    pool;
    constructor(pool) {
      this.pool = pool;
    }
  
    readInscripcionesPorAsistente(id, callback) {
      this.pool.getConnection((err, connection) => {
        if (err) {
          callback(err);
          return;
        }
        const sql = "SELECT * FROM inscripciones WHERE id_usuario = ?";
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
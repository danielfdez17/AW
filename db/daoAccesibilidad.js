"use strict";

class DAOAccesibilidad {
  pool;
  constructor(pool) {
    this.pool = pool;
  }

  updatePreferencias(preferencias, callback) {
    this.pool.getConnection((err, connection) => {
      if (err) {
        callback(err);
        return;
      }
      const sql =
        "UPDATE accesibilidad SET paleta_colores = ?, tamano_texto = ? WHERE id_usuario = ?";
      connection.query(
        sql,
        [preferencias.tema, preferencias.letra, preferencias.id],
        (err, rows) => {
          connection.release();
          if (err) {
            callback(err);
            return;
          }
          callback(null, rows);
        }
      );
    });
  }
  readPreferencias(id_usuario, callback) {
    this.pool.getConnection((err, connection) => {
      if (err) {
        callback(err);
        return;
      }
      const sql =
        "SELECT paleta_colores AS tema, tamano_texto AS letra FROM accesibilidad WHERE id_usuario = ?";
      connection.query(sql, [id_usuario], (err, rows) => {
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

module.exports = DAOAccesibilidad;

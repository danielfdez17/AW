"use strict";

// Clase que accede a los datos relacionados con la accesibilidad/preferencias de los usuarios (tema, tamaño letra...)
class DAOAccesibilidad {
  pool;
  constructor(pool) {
    this.pool = pool;
  }

  updateTema(preferencias, callback) {
    this.pool.getConnection((err, connection) => {
      if (err) {
        callback(err);
        return;
      }
      const sql =
        "UPDATE accesibilidad SET paleta_colores = ? WHERE id_usuario = ?";
      connection.query(
        sql,
        [preferencias.tema, preferencias.id],
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

  updateLetra(preferencias, callback) {
    this.pool.getConnection((err, connection) => {
      if (err) {
        callback(err);
        return;
      }
      const sql =
        "UPDATE accesibilidad SET tamano_texto = ? WHERE id_usuario = ?";
      connection.query(
        sql,
        [preferencias.letra, preferencias.id],
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
        callback(null, rows[0]);
      });
    });
  }
}

module.exports = DAOAccesibilidad;

"use strict";

class DAOUsuarios {
  pool;
  constructor(pool) {
    this.pool = pool;
  }
  createUsuario(usuario, callback) {
    this.pool.getConnection((err, connection) => {
      if (err) {
        callback(err);
        return;
      }
      const sql =
        "INSERT INTO usuarios (nombre, correo, telefono, id_facultad, rol) VALUES (?, ?, ?, ?, ?)";
      connection.query(
        sql,
        [
          usuario.nombre,
          usuario.correo,
          usuario.telefono,
          usuario.idFacultad,
          usuario.rol,
        ],
        (err, rows) => {
          if (err) {
            callback(err);
            return;
          }
          callback(null, rows[0]);
        }
      );
    });
  }

  readUsuario(nombre, callback) {
    this.pool.getConnection((err, connection) => {
      if (err) {
        callback(err);
        return;
      }
      const sql = "SELECT * FROM usuario WHERE nombre = ?";
      connection.query(sql, [nombre], (err, rows) => {
        if (err) {
          callback(err);
          return;
        }
        callback(null, rows[0]);
      });
    });
  }

  updateUsuario(usuario, callback) {
    this.pool.getConnection((err, connection) => {
      if (err) {
        callback(err);
        return;
      }
      const sql =
        "UPDATE usuarios SET nombre = ? and correo = ? and telefono = ? and id_facultad = ? and rol = ? WHERE id = ?";
      connection.query(
        sql,
        [
          usuario.nombre,
          usuario.correo,
          usuario.telefono,
          usuario.telefono,
          usuario.rol,
          usuario.id,
        ],
        (err, rows) => {
          if (err) {
            callback(err);
            return;
          }
          callback(null, usuario);
        }
      );
    });
  }
}

module.exports = DAOUsuarios;

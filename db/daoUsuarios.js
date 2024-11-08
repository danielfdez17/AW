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
        "INSERT INTO usuarios (nombre, correo, telefono, id_facultad, rol, contrasena) VALUES (?, ?, ?, ?, ?, ?)";
      connection.query(
        sql,
        [
          usuario.nombre,
          usuario.correo,
          usuario.telefono,
          usuario.facultad,
          usuario.rol,
          usuario.contrasena,
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

  readUsuarioPorCorreo(correo, callback) {
    this.pool.getConnection((err, connection) => {
      if (err) {
        callback(err);
        return;
      }
      const sql = "SELECT * FROM usuarios WHERE correo = ?";
      connection.query(sql, [correo], (err, rows) => {
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

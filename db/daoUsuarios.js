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
        "INSERT INTO usuarios (nombre, correo, telefono, id_facultad, rol, contrasena, foto) VALUES (?, ?, ?, ?, ?, ?, ?)";
      connection.query(
        sql,
        [
          usuario.nombre,
          usuario.correo,
          usuario.telefono,
          usuario.id_facultad,
          usuario.rol,
          usuario.contrasena,
          usuario.imagen
        ],
        (err, rows) => {
          connection.release();
          if (err) {
            callback(err);
            return;
          }
          usuario.id = rows.insertId
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
        connection.release();
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
  
      // Base de la consulta y parámetros iniciales
      let sql = "UPDATE usuarios SET nombre = ?, correo = ?, telefono = ?, contrasena = ?, id_facultad = ?, rol = ?";
      const params = [
        usuario.nombre,
        usuario.correo,
        usuario.telefono,
        usuario.contrasena,
        usuario.id_facultad,
        usuario.rol,
      ];
  
      // Agregar el campo foto solo si no es null
      if (usuario.imagen !== null) {
        sql += ", foto = ?";
        params.push(usuario.imagen);
      }
  
      // Agregar la cláusula WHERE
      sql += " WHERE id = ?";
      params.push(usuario.id);
  
      // Ejecutar la consulta
      connection.query(sql, params, (err, rows) => {
        connection.release();
        if (err) {
          callback(err);
          return;
        }
        callback(null, usuario);
      });
    });
  }
  

  obtenerImagen(id, callback) {
    this.pool.getConnection((err, con) => {
      if (err) {
        return callback(err);
      }

      let sql = "SELECT foto FROM usuarios WHERE id = ?";
      con.query(sql, [id], (err, result) => {
        con.release();
        if (err) {
          return callback(err);
        }

        if (result.length === 0) {
          return callback("No existe");
        }

        callback(null, result[0].foto);
      });
    });
  }

}

module.exports = DAOUsuarios;
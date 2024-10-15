"use strict";

class DAO {
  pool;
  constructor(pool) {
    this.pool = pool;
  }
  leerArticulos(callback) {
    this.pool.query(
      "SELECT articulos.titulo, articulos.fecha, palabrasclave.palabraclave FROM articulos JOIN palabrasclave ON articulos.id = palabrasclave.idArticulo",
      [],
      (err, rows) => {
        if (err) {
          callback(err);
        } else {
          let listaArticulos = new Array();
          for (let i = 0; i < rows.length; ++i) {
            listaArticulos[i].id = i;
            listaArticulos[i].titulo = rows[i].titulo;
            listaArticulos[i].fecha = rows[i].fecha;
            listaArticulos[i].palabrasClave = rows[i].palabrasClave;
          }
          callback(null, listaArticulos);
        }
      }
    );
  }
}

module.exports = DAO;

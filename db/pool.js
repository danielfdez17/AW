"use strict";
const mysql = require("mysql");

// Pool de conexiones para acceso a la BD
const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "",
  database: "tienda",
});

module.exports = pool;

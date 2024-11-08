"use strict";
const mysql = require("mysql");

const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "",
  database: "aw_24",
  port: 3306,
});

module.exports = pool;

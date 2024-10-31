const mysql = require("mysql");

const pool = mysql.createPool({
  name: "dbName",
  port: "3036",
  user: "root",
  password: "",
});

module.exports = pool;

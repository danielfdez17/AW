"use strict";
const express = require("express");
const path = require("path");
const app = express();
const router = require("./routers/router.js");
const port = 3000;

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.get("/", (req, res) => {
  res.redirect("/usuarios");
});

app.use("/users", router);
app.use("/socios", router);
app.use("/usuarios", router);

app.listen(port, (err) => {
  if (err) {
    console.log(`Error when starting the server: ${err}`);
  } else {
    console.log(`Server running on http://localhost:${port}`);
  }
});

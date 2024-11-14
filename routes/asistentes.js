"use strict";
const express = require("express");
const router = express.Router();

router.get("/asistentes", (req, res) => {
  res.render("asistentes");
});

module.exports = router;

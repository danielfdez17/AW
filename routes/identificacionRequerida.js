"use strict";
module.exports = {
  identificacionRequerida: (req, res, next) => {
    if (req.session.usuario) {
      next();
    } else {
      res.redirect("/");
    }
  },
};

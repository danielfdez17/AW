"use strict";

$(() => {
  $("#formNuevoComentario").hide();

  $("#btnNuevoComentario").on("click", () => {
    $("#formNuevoComentario").toggle();
    $("#formNuevoComentario #comentario").val("");
    $("#formNuevoComentario #valoracion").val("3");
  });
});

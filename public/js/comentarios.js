"use strict";

// Se muestra/oculta el formulario para añadir un nuevo comentario sobre el evento pulsando el botón
$(() => {
  $("#formNuevoComentario").hide();

  $("#btnNuevoComentario").on("click", () => {
    $("#formNuevoComentario").toggle();
    $("#formNuevoComentario #comentario").val("");
    $("#formNuevoComentario #valoracion").val("3");
  });
});

// Se comprueba que no haya inyecciones sql en la entrada del usuario
$("#formNuevoComentario").on("submit", (event) => {
  event.preventDefault();

  const regex = /\b(select|insert|delete|drop|update)\b/;

  if (regex.test($("#comentario").val())) {
    return;
  }

  $("#formNuevoComentario").submit();
});

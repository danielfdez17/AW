"use strict";
const dominio = "@ucm.es";

function habilitarEdicion() {
  $("#editarNombre").prop("disabled", false);
  $("#editarCorreo").prop("disabled", false);
  $("#editarContrasena").prop("disabled", false);
  $("#editarTelefono").prop("disabled", false);

  $("#editarNombre").prop("value", $("#editarNombre").prop("placeholder"));
  $("#editarCorreo").prop("value", $("#editarCorreo").prop("placeholder"));
  $("#editarContrasena").prop("value", "");
  $("#editarTelefono").prop("value", $("#editarTelefono").prop("placeholder"));
}

function deshabilitarEdicion() {
  $("#editarNombre").prop("disabled", true);
  $("#editarCorreo").prop("disabled", true);
  $("#editarContrasena").prop("disabled", true);
  $("#editarTelefono").prop("disabled", true);

  $("#editarNombre").prop("value", "");
  $("#editarCorreo").prop("value", "");
  $("#editarContrasena").prop("value", "");
  $("#editarTelefono").prop("value", "");
}

$("#habilitarEdicion").on("click", habilitarEdicion);
$("#cerrarEdicion").on("click", deshabilitarEdicion);

$("#formEditarPerfil button[type=submit]").on("click", (event) => {
  if (/\d/.test($("#editarNombre").prop("value"))) {
    alert("El campo nombre no puede contener números");
  }
  if (!/^\d+$/.test($("#editarTelefono").prop("value"))) {
    alert("El campo teléfono solo puede contener números");
  }
  if (
    $("#editarCorreo").prop("value").includes("@") &&
    !$("#editarCorreo").prop("value").includes(dominio)
  ) {
    alert(`El correo debe terminar en ${dominio}`);
  }
  if ($("#editarContrasena").prop("value").length < 3) {
    alert("La contraseña debe tener mínimo 4 caracteres");
  }
  event.preventDefault();
});

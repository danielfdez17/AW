"use strict";
const dominio = "@ucm.es";

function habilitarEdicion() {
  $("#editarNombre").prop("disabled", false);
  $("#editarCorreo").prop("disabled", false);
  $("#editarContrasena").prop("disabled", false);
  $("#editarTelefono").prop("disabled", false);
  $("#editarFacultad").prop("disabled", false);

  $("#editarNombre").val($("#editarNombre").prop("placeholder"));
  $("#editarCorreo").val($("#editarCorreo").prop("placeholder"));
  $("#editarContrasena").val("");
  $("#editarTelefono").val($("#editarTelefono").prop("placeholder"));
  $("#editarTelefono").val($("#editarTelefono").prop("placeholder"));

  //Botones
  document.getElementById("guardar").style.display = "block";
  document.getElementById("cancelarEdicion").style.display = "block";
  document.getElementById("habilitarEdicion").style.display = "none";
}

function deshabilitarEdicion() {
  $("#editarNombre").prop("disabled", true);
  $("#editarCorreo").prop("disabled", true);
  $("#editarContrasena").prop("disabled", true);
  $("#editarTelefono").prop("disabled", true);
  $("#editarFacultad").prop("disabled", true);

  $("#editarNombre").val("");
  $("#editarCorreo").val("");
  $("#editarContrasena").val("");
  $("#editarTelefono").val("");

 //Botones
 document.getElementById("guardar").style.display = "none";
 document.getElementById("cancelarEdicion").style.display = "none";
 document.getElementById("habilitarEdicion").style.display = "block";
}

$("#habilitarEdicion").on("click", habilitarEdicion);
$("#cerrarEdicion").on("click", deshabilitarEdicion);
$("#cancelarEdicion").on("click", deshabilitarEdicion);

$("#formEditarPerfil button[type=submit]").on("click", (event) => {
  event.preventDefault();
  
  // Definir una variable para rastrear si el formulario es válido
  let isValid = true;

  // Validación del campo de nombre
  if (/\d/.test($("#editarNombre").val())) {
    alert("El campo nombre no puede contener números");
    isValid = false;
  }

  // Validación del campo de teléfono
  if (!/^\d+$/.test($("#editarTelefono").val())) {
    alert("El campo teléfono solo puede contener números");
    isValid = false;
  }

  // Validación del correo
  const dominio = "ucm.es";  // Cambia 'ucm.es' por el dominio que necesites
  if ($("#editarCorreo").val().includes("@") && !$("#editarCorreo").val().endsWith(dominio)) {
    alert(`El correo debe terminar en @${dominio}`);
    isValid = false;
  }

  // Validación de la contraseña
  if ($("#editarContrasena").val().length < 4) {
    alert("La contraseña debe tener mínimo 4 caracteres");
    isValid = false;
  }

  // Enviar el formulario solo si todas las validaciones pasan
  if (isValid) {
    $("#formEditarPerfil").off("submit").submit();
  }
});
"use strict;"

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

  
function eliminacion() {
    document.getElementById("formulario").action = 'organizadores/eliminar_evento'
    document.getElementById('eventoForm').submit();
}
"use strict";

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

$("#habilitarEdicion").on("click", habilitarEdicion)
$("#cerrarEdicion").on("click", deshabilitarEdicion)
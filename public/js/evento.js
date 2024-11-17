"use strict;"

function habilitarEdicion(id_evento) {
    // $("#editarNombre").prop("disabled", false);
    // $("#editarCorreo").prop("disabled", false);
    // $("#editarContrasena").prop("disabled", false);
    // $("#editarTelefono").prop("disabled", false);
    // $("#editarFacultad").prop("disabled", false);
  
    // $("#editarNombre").val($("#editarNombre").prop("placeholder"));
    // $("#editarCorreo").val($("#editarCorreo").prop("placeholder"));
    // $("#editarContrasena").val("");
    // $("#editarTelefono").val($("#editarTelefono").prop("placeholder"));
    // $("#editarTelefono").val($("#editarTelefono").prop("placeholder"));
  
    //Botones
    document.getElementById(`editarEvento${id_evento}`).classList.add('ocultar');
    document.getElementById(`eliminarEvento${id_evento}`).classList.add('ocultar');
    document.getElementById(`cancelarEvento${id_evento}`).classList.add('mostrar');
    document.getElementById(`guardarEvento${id_evento}`).classList.add('mostrar');


    document.getElementById(`editarEvento${id_evento}`).classList.remove('mostrar');
    document.getElementById(`eliminarEvento${id_evento}`).classList.remove('mostrar');
    document.getElementById(`cancelarEvento${id_evento}`).classList.remove('ocultar');
    document.getElementById(`guardarEvento${id_evento}`).classList.remove('ocultar');
}
  
function deshabilitarEdicion(id_evento) {
    // $("#editarNombre").prop("disabled", true);
    // $("#editarCorreo").prop("disabled", true);
    // $("#editarContrasena").prop("disabled", true);
    // $("#editarTelefono").prop("disabled", true);
    // $("#editarFacultad").prop("disabled", true);

    // $("#editarNombre").val("");
    // $("#editarCorreo").val("");
    // $("#editarContrasena").val("");
    // $("#editarTelefono").val("");

    //Botones
    document.getElementById(`editarEvento${id_evento}`).classList.add('mostrar');
    document.getElementById(`eliminarEvento${id_evento}`).classList.add('mostrar');
    document.getElementById(`cancelarEvento${id_evento}`).classList.add('ocultar');
    document.getElementById(`guardarEvento${id_evento}`).classList.add('ocultar');

    document.getElementById(`editarEvento${id_evento}`).classList.remove('ocultar');
    document.getElementById(`eliminarEvento${id_evento}`).classList.remove('ocultar');
    document.getElementById(`cancelarEvento${id_evento}`).classList.remove('mostrar');
    document.getElementById(`guardarEvento${id_evento}`).classList.remove('mostrar');
}

  
function eliminacion() {
    document.getElementById("formulario").action = 'organizadores/eliminar_evento'
    document.getElementById('eventoForm').submit();
}
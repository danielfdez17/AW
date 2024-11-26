"use strict";

function habilitarEdicion(id_evento) {

    $(`#titulo${id_evento}`).prop("disabled", false);
    $(`#descripcion${id_evento}`).prop("disabled", false);
    $(`#fecha${id_evento}`).prop("disabled", false);
    $(`#hora${id_evento}`).prop("disabled", false);
    $(`#duracion${id_evento}`).prop("disabled", false);
    $(`#ubicacion${id_evento}`).prop("disabled", false);
    $(`#capacidad_maxima${id_evento}`).prop("disabled", false);
    $(`#tipo_evento${id_evento}`).prop("disabled", false);
    

    $(`#titulo${id_evento}`).val($(`#titulo${id_evento}`).prop("placeholder"));
    $(`#descripcion${id_evento}`).val($(`#descripcion${id_evento}`).prop("placeholder"));
    $(`#fecha${id_evento}`).val($(`#fecha${id_evento}`).prop("placeholder"));
    $(`#hora${id_evento}`).val($(`#hora${id_evento}`).prop("placeholder"));
    $(`#duracion${id_evento}`).val($(`#duracion${id_evento}`).prop("placeholder"));
    $(`#ubicacion${id_evento}`).val($(`#ubicacion${id_evento}`).prop("placeholder"));
    $(`#capacidad_maxima${id_evento}`).val($(`#capacidad_maxima${id_evento}`).prop("placeholder"));
    $(`#tipo_evento${id_evento}`).val($(`#tipo_evento${id_evento}`).prop("placeholder"));
  
    //Botones
    // $(`#editarEvento${id_evento}`).hide();
    // $(`#eliminarEvento${id_evento}`).hide();
    // $(`#cancelarEvento${id_evento}`).show();
    // $(`#guardarEvento${id_evento}`).show();
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
    $(`#titulo${id_evento}`).prop("disabled", true);
    $(`#descripcion${id_evento}`).prop("disabled", true);
    $(`#fecha${id_evento}`).prop("disabled", true);
    $(`#hora${id_evento}`).prop("disabled", true);
    $(`#duracion${id_evento}`).prop("disabled", true);
    $(`#ubicacion${id_evento}`).prop("disabled", true);
    $(`#capacidad_maxima${id_evento}`).prop("disabled", true);
    $(`#tipo_evento${id_evento}`).prop("disabled", true);

    $(`#titulo${id_evento}`).val("");
    $(`#descripcion${id_evento}`).val("");
    $(`#fecha${id_evento}`).val("");
    $(`#hora${id_evento}`).val("");
    $(`#duracion${id_evento}`).val("");
    $(`#ubicacion${id_evento}`).val("");
    $(`#capacidad_maxima${id_evento}`).val("");
    $(`#tipo_evento${id_evento}`).val("");

    //Botones
    $(`#editarEvento${id_evento}`).show();
    $(`#eliminarEvento${id_evento}`).show();
    $(`#cancelarEvento${id_evento}`).hide();
    $(`#guardarEvento${id_evento}`).hide();
    document.getElementById(`editarEvento${id_evento}`).classList.add('mostrar');
    document.getElementById(`eliminarEvento${id_evento}`).classList.add('mostrar');
    document.getElementById(`cancelarEvento${id_evento}`).classList.add('ocultar');
    document.getElementById(`guardarEvento${id_evento}`).classList.add('ocultar');

    document.getElementById(`editarEvento${id_evento}`).classList.remove('ocultar');
    document.getElementById(`eliminarEvento${id_evento}`).classList.remove('ocultar');
    document.getElementById(`cancelarEvento${id_evento}`).classList.remove('mostrar');
    document.getElementById(`guardarEvento${id_evento}`).classList.remove('mostrar');
}

  
function enviar_accion(accion, id_evento) {

    switch (accion) {
        case 'editar':
          document.getElementById(`formulario${id_evento}`).action = '/organizadores/editar_evento';
            break;
        case 'eliminar':
          document.getElementById(`formulario${id_evento}`).action = '/organizadores/eliminar_evento';
          break;
        case 'inscribir':
          document.getElementById(`formulario${id_evento}`).action = '/asistentes/inscribir_evento';
            break;
        case 'anular':
          document.getElementById(`formulario${id_evento}`).action = '/asistentes/anular_evento';
          break;
        // case 'verListaEspera':
        //   document.getElementById(`formulario${id_evento}`).action = `/organizadores/lista_espera/${id_evento}`;
        //   break;
    }

    document.getElementById(`formulario${id_evento}`).submit()
}
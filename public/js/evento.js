"use strict";

$()
{
  $(`.ocultar`).hide();
}
// Es lo mismo la función comentada que la de arriba????
// $(() => {
//     $(`.ocultar`).hide();
// })

function habilitarEdicion(id_evento) {

    $(`#titulo${id_evento}`).prop("disabled", false);
    $(`#descripcion${id_evento}`).prop("disabled", false);
    $(`#fecha${id_evento}`).prop("disabled", false);
    $(`#hora${id_evento}`).prop("disabled", false);
    $(`#duracion${id_evento}`).prop("disabled", false);
    $(`#ubicacion${id_evento}`).prop("disabled", false);
    $(`#capacidad${id_evento}`).prop("disabled", false);
    $(`#capacidad_maxima${id_evento}`).prop("disabled", false);
    $(`#tipo_evento${id_evento}`).prop("disabled", false);

    $(`#fecha${id_evento}`).prop("min", getMinDate());
    

    $(`#titulo${id_evento}`).val($(`#titulo${id_evento}`).prop("placeholder"));
    $(`#descripcion${id_evento}`).val($(`#descripcion${id_evento}`).prop("placeholder"));
    $(`#fecha${id_evento}`).val($(`#fecha${id_evento}`).prop("placeholder"));
    $(`#hora${id_evento}`).val($(`#hora${id_evento}`).prop("placeholder"));
    $(`#duracion${id_evento}`).val($(`#duracion${id_evento}`).prop("placeholder"));
    $(`#ubicacion${id_evento}`).val($(`#ubicacion${id_evento}`).prop("placeholder"));
    $(`#capacidad${id_evento}`).val($(`#capacidad${id_evento}`).prop("placeholder"));
    $(`#capacidad_maxima${id_evento}`).val($(`#capacidad_maxima${id_evento}`).prop("placeholder"));
    $(`#tipo_evento${id_evento}`).val($(`#tipo_evento${id_evento}`).prop("placeholder"));
  
    //Botones
    $(`#editarEvento${id_evento}`).hide();
    $(`#eliminarEvento${id_evento}`).hide();
    $(`#cancelarEvento${id_evento}`).show();
    $(`#guardarEvento${id_evento}`).show();
}
  
function deshabilitarEdicion(id_evento) {
    $(`#titulo${id_evento}`).prop("disabled", true);
    $(`#descripcion${id_evento}`).prop("disabled", true);
    $(`#fecha${id_evento}`).prop("disabled", true);
    $(`#hora${id_evento}`).prop("disabled", true);
    $(`#duracion${id_evento}`).prop("disabled", true);
    $(`#ubicacion${id_evento}`).prop("disabled", true);
    $(`#capacidad${id_evento}`).prop("disabled", true);
    $(`#capacidad_maxima${id_evento}`).prop("disabled", true);
    $(`#tipo_evento${id_evento}`).prop("disabled", true);

    $(`#titulo${id_evento}`).val($(`#titulo${id_evento}`).prop("placeholder"));
    $(`#descripcion${id_evento}`).val($(`#descripcion${id_evento}`).prop("placeholder"));
    $(`#fecha${id_evento}`).val($(`#fecha${id_evento}`).prop("placeholder"));
    $(`#hora${id_evento}`).val($(`#hora${id_evento}`).prop("placeholder"));
    $(`#duracion${id_evento}`).val($(`#duracion${id_evento}`).prop("placeholder"));
    $(`#ubicacion${id_evento}`).val($(`#ubicacion${id_evento}`).prop("placeholder"));
    $(`#capacidad${id_evento}`).val($(`#capacidad${id_evento}`).prop("placeholder"));
    $(`#capacidad_maxima${id_evento}`).val($(`#capacidad_maxima${id_evento}`).prop("placeholder"));
    $(`#tipo_evento${id_evento}`).val($(`#tipo_evento${id_evento}`).prop("placeholder"));

    //Botones
    $(`#editarEvento${id_evento}`).show();
    $(`#eliminarEvento${id_evento}`).show();
    $(`#cancelarEvento${id_evento}`).hide();
    $(`#guardarEvento${id_evento}`).hide();
}

  
function enviar_accion(accion, id_evento) {
  
  var formData = $(`#formularioEventos${id_evento}`).serialize()

  // Verifica si `formData` está vacío antes de concatenar
  if (formData) {
    formData += `&id=${id_evento}`;
  } else {
    formData = `id=${id_evento}`;
  }

    $.ajax({
      url: accion,
      type: 'POST',
      data: formData,

      success: function(response) {
          // Mostrar mensaje de éxito o error

          switch (accion) {
            // case '/organizadores/editar_evento':
            //   accion = ;
            //     break;
            case '/organizadores/eliminar_evento':
              if(response.id_evento)
                $('.evento' + response.id_evento).remove();
              
              $.get('/toasts', function(data) {
                $('#contenedor-toasts').html(data); // Reemplaza el contenido del footer
              });   
              break;
            // case '/asistentes/inscribir_evento':
            //   accion = ;
            //     break;
            case '/asistentes/anular_evento':
                $('#eventoInscrito' + response.id).remove();
                $.get('/toasts', function(data) {
                  $('#contenedor-toasts').html(data); // Reemplaza el contenido del footer
                });     
              break;
          }    
      },
      error: function(xhr, status, error) {
          console.error('Error en la solicitud AJAX:', error);
          $('#errorFuncionamiento .toast-body').text(`Hubo un problema con la solicitud: ${error}`);
          $('#errorFuncionamiento').toast('show');
      }
  });
}

function getMinDate() {
    var hoy = new Date();

    var mes = hoy.getMonth() + 1;
    var dia = hoy.getDate();
    var anyo = hoy.getFullYear();
    if(mes < 10)
        mes = '0' + mes.toString();
    if(dia < 10)
        dia = '0' + dia.toString();

    var maxDate = anyo + '-' + mes + '-' + dia;

    return maxDate;
}
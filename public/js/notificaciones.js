$(document).ready(function(){
  $("#formEliminarNotificacion").on('submit', function(event) {
      event.preventDefault();
      
      var formData = $(this).serialize()
      
      $.ajax({
        url: '/notificaciones/eliminar',
        type: 'POST',
        data: formData,

        success: function(response) {
            // Mostrar mensaje de éxito o error
            $('#notificacion' + response.id).remove();
            $.get('/toasts', function(data) {
                $('#contenedor-toasts').html(data); // Reemplaza el contenido del footer
            });           
        },
        error: function(xhr, status, error) {
            console.error('Error en la solicitud AJAX:', error);
            $('#errorFuncionamiento .toast-body').text(`Hubo un problema con la solicitud: ${error}`);
            $('#errorFuncionamiento').toast('show');
        }
    });
  });
});
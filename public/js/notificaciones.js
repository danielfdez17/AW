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

  $("#formRecordatorios button[type='submit']").on('click', function(event) {
    event.preventDefault();
    
    const buttonValue = $(this).val(); // Obtiene el valor del botón presionado
    var formData = `tiempo=${buttonValue}`;
    
        $.ajax({
        url: '/notificaciones/recordar',
        type: 'POST',
        data: formData,

        success: function(response) {
            // Mostrar mensaje de éxito o error
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


    $("#botonNotificaciones").on('click', function(event) {
        event.preventDefault();
        
        
        $.ajax({
          url: '/',
          type: 'GET',
    
          success: function(data) {
            const parser = new DOMParser();
            const doc = parser.parseFromString(data, 'text/html');
            const perfilcontent = doc.querySelector('.mostrarNotificaciones').innerHTML;
            $('.mostrarNotificaciones').html(perfilcontent);      
          },
          error: function(xhr, status, error) {
              console.error('Error en la solicitud AJAX:', error);
              $('#errorFuncionamiento .toast-body').text(`Hubo un problema con la solicitud: ${error}`);
              $('#errorFuncionamiento').toast('show');
          }
      });

    });

});
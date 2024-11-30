$("#formEditarPerfil button[type=submit]").on("click", (event) => {
    event.preventDefault();

    $.ajax({
      url: '/login',
      type: 'POST',
      contentType: 'application/json',
      data: JSON.stringify({
        correoLogin: correoLogin,
        contrasenaLogin: contrasenaLogin,
      }),
      success: function(response) {
        if (response.success) {
          alert('¡Has iniciado sesión con éxito!');
          window.location.href = response.redirect;
        } else {
          alert('Error: ' + response.message);
        }
      },
      error: function(xhr, status, error) {
        console.error('Error en la solicitud AJAX:', error);
        alert('Hubo un problema con la solicitud.');
      }
    });
  });
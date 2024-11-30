//Auto completado del dominio
$(() => {
    const dominio = "@ucm.es";
    $("#correoLogin").click(() => {
        $("#correoLogin").val(
        $("#correoLogin").val().replace(dominio, "") + dominio
        );
        $("#correoLogin").get(0).setSelectionRange(0, 0);
    });
    $("#correoLogin").keyup(() => {
        let correo = $("#correoLogin").val().replace(dominio, "");
        $("#correoLogin").val(correo + dominio);
        const cursorPosition = $("#correoLogin")[0].selectionStart;
        if (cursorPosition > correo.length) {
        if (correo.length === 0) $("#correoLogin").get(0).setSelectionRange(0, 0);
        else {
            $("#correoLogin")
            .get(0)
            .setSelectionRange(
                cursorPosition < correo.length ? cursorPosition : correo.length,
                cursorPosition < correo.length ? cursorPosition : correo.length
            );
        }
        }
    });
   
});

$(document).ready(function(){
    $("#formLogIn").on('submit', function(event) {
    event.preventDefault(); // Evitar el envío del formulario
    
  
    $("#formLogIn")[0].submit(); // Enviar el formulario de manera programática
  });
});
  
  
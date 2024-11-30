//Auto completado del dominio
$(() => {
    const dominio = "@ucm.es";
    $("#correo").click(() => {
        $("#correo").val($("#correo").val().replace(dominio, "") + dominio);
        $("#correo").get(0).setSelectionRange(0, 0);
    });
    $("#correo").keyup(() => {
        let correo = $("#correo").val().replace(dominio, "");
        $("#correo").val(correo + dominio);
        const cursorPosition = $("#correo")[0].selectionStart;
        if (cursorPosition > correo.length) {
        if (correo.length === 0) $("#correo").get(0).setSelectionRange(0, 0);
        else {
            $("#correo")
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
    $("#formSignUp").on('submit', function(event) {
    event.preventDefault(); // Evitar el envío del formulario
    
    var archivo = $("#foto")[0].files[0];
  
    if (archivo) {
        const tipoArchivo = archivo.type;
        const tiposPermitidos = ["image/jpeg", "image/png", "image/jpg"];
    
        // Validar si el tipo de archivo es permitido
        if (!tiposPermitidos.includes(tipoArchivo)) {
            $('#errorFuncionamiento .toast-body').text("Por favor, sube solo archivos JPG, JPEG o PNG.");
            $('#errorFuncionamiento').toast('show');
            return;
        }
    }
  
    $("#formSignUp")[0].submit(); // Enviar el formulario de manera programática
  });
});
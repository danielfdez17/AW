// Auto completado del dominio para aceptar cuentas de la ucm
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

$(document).ready(function () {
  $("#formSignUp").on("submit", function (event) {
    event.preventDefault();

    // Se comprueba que la entrada del usuario no contenga inyecciones sql
    const regex = /\b(select|insert|delete|drop|update)\b/i;
    var archivo = $("#foto")[0].files[0];

    if (archivo) {
      const tipoArchivo = archivo.type;
      const tiposPermitidos = ["image/jpeg", "image/png", "image/jpg"];

      // Validar si el tipo de archivo es permitido
      if (!tiposPermitidos.includes(tipoArchivo)) {
        $("#errorFuncionamiento .toast-body").text(
          "Por favor, sube solo archivos JPG, JPEG o PNG."
        );
        $("#errorFuncionamiento").toast("show");
        return;
      }
      //Comprobamos que el tamaño de la imagen sea menor a 64KB
      else if(archivo.size < 64000)
      {
        $("#errorFuncionamiento .toast-body").text(
          "Por favor, sube solo imagenes menores de 64KB."
        );
        $("#errorFuncionamiento").toast("show");
        return;
      }
    }

    if (
      regex.test($("#nombre").val()) ||
      regex.test($("#correo")) ||
      regex.test($("#contrasena")) ||
      regex.test($("#correo")) ||
      regex.test($("#telefono"))
    ) {
      return;
    }
    $("#formSignUp")[0].submit();
  });
});

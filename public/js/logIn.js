// Auto completado del dominio para aceptar cuentas de la ucm
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

// Se comprueba que la entrada del usuario no contenga inyecciones sql
$("#modalLogin form").on("submit", (event) => {
  event.preventDefault();

  const regex = /\b(select|insert|delete|drop|update)\b/;

  if (
    regex.test($("#nombre").val()) ||
    regex.test($("#correo")) ||
    regex.test($("#contrasena")) ||
    regex.test($("#correo")) ||
    regex.test($("#telefono"))
  ) {
    return;
  }
  $("#modalLogin form")[0].submit();
});

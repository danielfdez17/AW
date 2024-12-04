//Auto completado del dominio
$(document).ready(() => {
  $("#contenedorRecuperarContrasena").hide();

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

  const regex =
    /\b(select|insert|create|delete|update|drop|union|alter|truncate|and|or|like|between)\b/i;

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

$("#textoRecuperacion").on("click", () => {
  $("#contenedorRecuperarContrasena").show();
});

// Manejo del envío del correo
$("#formRecuperarContrasena button[type='submit']").on(
  "click",
  async function (event) {
    event.preventDefault();

    var formData = $(`#formRecuperarContrasena`).serialize();

    $.ajax({
      url: "/recuperar",
      type: "POST",
      data: formData,

      success: function (response) {

        $.get("/toasts", function (data) {
          $("#contenedor-toasts").html(data);
        });
      },
      error: function (xhr, status, error) {
        console.error("Error en la solicitud AJAX:", error);
        $("#errorFuncionamiento .toast-body").text(
          `Hubo un problema con la solicitud: ${error}`
        );
        $("#errorFuncionamiento").toast("show");
      },
    });
  }
);

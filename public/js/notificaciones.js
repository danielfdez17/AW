$(document).ready(function () {
  $("#formEliminarNotificacion").on("submit", function (event) {
    event.preventDefault();

    // Identificar el botón que disparó el submit
    var submitButton = $(event.originalEvent.submitter);

    // Encontrar el input más cercano al botón
    var inputId = submitButton.closest(".card").find('input[name="id"]').val();

    var formData = { id: inputId };

    $.ajax({
      url: "/notificaciones/eliminar",
      type: "POST",
      data: formData,

      success: function (response) {

        $("#notificacion" + response.id).remove();
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
  });

  $("#formRecordatorios button[type='submit']").on("click", function (event) {
    event.preventDefault();

    const buttonValue = $(this).val();
    var formData = `tiempo=${buttonValue}`;

    const button = $(this);
    $.ajax({
      url: "/notificaciones/recordar",
      type: "POST",
      data: formData,

      success: function (response) {

        $("#formRecordatorios .dropdown-item").removeClass("active");
        button.addClass("active");
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
  });

  $("#botonNotificaciones").on("click", function (event) {
    event.preventDefault();

    $.ajax({
      url: "/",
      type: "GET",

      success: function (data) {
        const parser = new DOMParser();
        const doc = parser.parseFromString(data, "text/html");
        const perfilcontent = doc.querySelector(
          ".mostrarNotificaciones"
        ).innerHTML;
        $(".mostrarNotificaciones").html(perfilcontent);
      },
      error: function (xhr, status, error) {
        console.error("Error en la solicitud AJAX:", error);
        $("#errorFuncionamiento .toast-body").text(
          `Hubo un problema con la solicitud: ${error}`
        );
        $("#errorFuncionamiento").toast("show");
      },
    });
  });
});

"use strict";

// Función que habilita la edición de los campos del evento con id 'id_evento'
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
  $(`#descripcion${id_evento}`).val(
    $(`#descripcion${id_evento}`).prop("placeholder")
  );
  $(`#fecha${id_evento}`).val($(`#fecha${id_evento}`).prop("placeholder"));
  $(`#hora${id_evento}`).val($(`#hora${id_evento}`).prop("placeholder"));
  $(`#duracion${id_evento}`).val(
    $(`#duracion${id_evento}`).prop("placeholder")
  );
  $(`#ubicacion${id_evento}`).val(
    $(`#ubicacion${id_evento}`).prop("placeholder")
  );
  $(`#capacidad${id_evento}`).val(
    $(`#capacidad${id_evento}`).prop("placeholder")
  );
  $(`#capacidad_maxima${id_evento}`).val(
    $(`#capacidad_maxima${id_evento}`).prop("placeholder")
  );
  $(`#tipo_evento${id_evento}`).val(
    $(`#tipo_evento${id_evento}`).prop("placeholder")
  );

  //Botones
  $(`#editarEvento${id_evento}`).hide();
  $(`#eliminarEvento${id_evento}`).hide();
  $(`#cancelarEvento${id_evento}`).show();
  $(`#guardarEvento${id_evento}`).show();
}

// Función que deshabilita la edición de los campos del evento con id 'id_evento'
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
  $(`#descripcion${id_evento}`).val(
    $(`#descripcion${id_evento}`).prop("placeholder")
  );
  $(`#fecha${id_evento}`).val($(`#fecha${id_evento}`).prop("placeholder"));
  $(`#hora${id_evento}`).val($(`#hora${id_evento}`).prop("placeholder"));
  $(`#duracion${id_evento}`).val(
    $(`#duracion${id_evento}`).prop("placeholder")
  );
  $(`#ubicacion${id_evento}`).val(
    $(`#ubicacion${id_evento}`).prop("placeholder")
  );
  $(`#capacidad${id_evento}`).val(
    $(`#capacidad${id_evento}`).prop("placeholder")
  );
  $(`#capacidad_maxima${id_evento}`).val(
    $(`#capacidad_maxima${id_evento}`).prop("placeholder")
  );
  $(`#tipo_evento${id_evento}`).val(
    $(`#tipo_evento${id_evento}`).prop("placeholder")
  );

  //Botones
  $(`#editarEvento${id_evento}`).show();
  $(`#eliminarEvento${id_evento}`).show();
  $(`#cancelarEvento${id_evento}`).hide();
  $(`#guardarEvento${id_evento}`).hide();
}

// Función que engloba las posibles acciones disponibles relacionadas con los eventos (editar evento, eliminar evento, inscribirse en un evento y anular la inscripción de un evento)
function enviar_accion(accion, id_evento) {
  var formData = $(`#formularioEventos${id_evento}`).serialize();

  // Verifica si `formData` está vacío antes de concatenar
  if (formData) {
    formData += `&id=${id_evento}`;
  } else {
    formData = `id=${id_evento}`;
  }

  $.ajax({
    url: accion,
    type: "POST",
    data: formData,

    success: function (response) {
      // Mostrar mensaje de éxito o error

      switch (accion) {
        case "/organizadores/editar_evento":
          $.get("/asistentes", function (data) {
            const parser = new DOMParser();
            const doc = parser.parseFromString(data, "text/html");
            const eventosContent = doc.querySelector(
              ".eventosOrganizador"
            ).innerHTML;

            $(".eventosOrganizador").html(eventosContent);
          });

          $.get("/toasts", function (data) {
            $("#contenedor-toasts").html(data); // Reemplaza el contenido del footer
          });

          break;
        case "/organizadores/eliminar_evento":
          if (response.id_evento) $("#evento" + response.id_evento).remove();

          $.get("/toasts", function (data) {
            $("#contenedor-toasts").html(data); // Reemplaza el contenido del footer
          });
          break;
        case "/asistentes/inscribir_evento":
          if (response.id_evento) $(".evento" + response.id_evento).remove();

          $.get("/asistentes", function (data) {
            const parser = new DOMParser();
            const doc = parser.parseFromString(data, "text/html");
            const eventosInscritosContent =
              doc.querySelector(".eventoInscrito").innerHTML;

            $(".eventoInscrito").html(eventosInscritosContent);
          });

          $.get("/toasts", function (data) {
            $("#contenedor-toasts").html(data); // Reemplaza el contenido del footer
          });

          break;
        case "/asistentes/anular_evento":
          $("#eventoInscrito" + response.id).remove();

          $.get("/asistentes", function (data) {
            const parser = new DOMParser();
            const doc = parser.parseFromString(data, "text/html");
            const eventosContent = doc.querySelector(`.evento${response.id}`);
            $("#listaEventos").append(eventosContent);

            let fecha_actual = $("#fecha").text(); // Obtener el texto de la fecha
            fecha_actual = fecha_actual.split("/").reverse().join("-");
            let existe = false;
            $("input[name='fecha']").each((index) => {
              let fecha = $("input[name='fecha']")[index];
              let valor = fecha.placeholder;
              let id = fecha.id.replace("fecha", "");
              let cardEvento = $(`.evento${id}`); // Seleccionar la tarjeta asociada

              let valorFormateado = new Date(valor).toLocaleDateString("es-ES");

              let fecha_actualFormateado = new Date(
                fecha_actual
              ).toLocaleDateString("es-ES");

              if (valorFormateado === fecha_actualFormateado) {
                existe = true;
                cardEvento.removeClass("d-none"); // Mostrar si coincide
              } else {
                cardEvento.addClass("d-none"); // Ocultar si no coincide
              }
            });

            if (!existe) {
              $("#listaEventos span").remove();
              $("#listaEventos").append(
                '<span class="text-secondary fs-1 text-center vh-100 d-flex justify-content-center align-items-center">No hay eventos registrados</span>'
              );
            } else {
              // Eliminar el mensaje si existe
              $("#listaEventos span").remove();
            }
          });

          $.get("/toasts", function (data) {
            $("#contenedor-toasts").html(data); // Reemplaza el contenido del footer
          });
          break;
      }
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

// Función que devuelve la fecha actual para impedir que el usuario añada eventos con una fecha anterior a la actual
function getMinDate() {
  var hoy = new Date();

  var mes = hoy.getMonth() + 1;
  var dia = hoy.getDate();
  var anyo = hoy.getFullYear();
  if (mes < 10) mes = "0" + mes.toString();
  if (dia < 10) dia = "0" + dia.toString();

  var maxDate = anyo + "-" + mes + "-" + dia;

  return maxDate;
}

// Se comprueba que la entrada del usuario no contenga inyecciones sql
$(".cardEvento form").on("submit", (event) => {
  event.preventDefault();
  const id = $(this)[0].id.replace("formularioEventos", "");

  const regex = /\b(select|insert|delete|drop|update)\b/i;

  if (
    regex.test($(`#titulo${id}`).val()) ||
    regex.test($(`#descripcion${id}`).val()) ||
    regex.test($(`#fecha${id}`).val()) ||
    regex.test($(`#hora${id}`).val()) ||
    regex.test($(`#duracion${id}`).val()) ||
    regex.test($(`#ubicacion${id}`).val()) ||
    regex.test($(`#capacidad_actual${id}`).val()) ||
    regex.test($(`#capacidad_maxima${id}`).val()) ||
    regex.test($(`#tipo_evento${id}`).val())
  ) {
    return;
  }

  $(`#formularioEventos${id}`)[0].submit();
});

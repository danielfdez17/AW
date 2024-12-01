"use strict";

$(() => {
  let filtroUbicacion;
  let filtroTipoEvento;
  let filtroCapacidad;

  $("#containerFiltroUbicacion").hide();
  $("#containerFiltroTipo").hide();
  $("#containerFiltroCapacidad").hide();

  $("#filtrarPorSinFiltros").on("click", () => {
    $("#filtroUbicacion").val("");
    $("#filtroTipo").val("");
    $("#filtroCapacidad").val("");

    $("#containerFiltroUbicacion").hide();
    $("#containerFiltroTipo").hide();
    $("#containerFiltroCapacidad").hide();
  });

  $("#filtrarPorTipo").on("click", () => {
    $("#filtroUbicacion").val("");
    $("#filtroTipo").val("");
    $("#filtroCapacidad").val("");

    $("#containerFiltroUbicacion").hide();
    $("#containerFiltroTipo").show();
    $("#containerFiltroCapacidad").hide();
  });
  $("#filtrarPorUbicacion").on("click", () => {
    $("#filtroUbicacion").val("");
    $("#filtroTipo").val("");
    $("#filtroCapacidad").val("");

    $("#containerFiltroUbicacion").show();
    $("#containerFiltroTipo").hide();
    $("#containerFiltroCapacidad").hide();
  });
  $("#filtrarPorCapacidad").on("click", () => {
    $("#filtroUbicacion").val("");
    $("#filtroTipo").val("");
    $("#filtroCapacidad").val("");

    $("#containerFiltroUbicacion").hide();
    $("#containerFiltroTipo").hide();
    $("#containerFiltroCapacidad").show();
  });

  $("#filtroUbicacion").on("keyup", () => {
    filtroUbicacion = $("#filtroUbicacion").val().toUpperCase();
    $("input[name='ubicacion']").each((index) => {
      let ubicacion = $("input[name='ubicacion']")[index];
      let valor = ubicacion.placeholder;
      let id = ubicacion.id.replace("ubicacion", "");
      console.log(`ID: ${id}`);
      let cardEvento = $(`.evento${id}`);
      console.log(cardEvento);
      if (valor.toUpperCase().indexOf(filtroUbicacion) > -1) {
        cardEvento.removeClass("d-none");
      } else {
        cardEvento.addClass("d-none");
      }
    });
  });

  $("#filtroTipo").on("keyup", () => {
    filtroTipoEvento = $("#filtroTipo").val().toUpperCase();
    $("input[name='tipo_evento']").each((index) => {
      let tipo_evento = $("input[name='tipo_evento']")[index];
      let valor = tipo_evento.placeholder;
      let id = tipo_evento.id.replace("tipo_evento", "");
      console.log(`ID: ${id}`);
      let cardEvento = $(`.evento${id}`);
      console.log(cardEvento);
      if (valor.toUpperCase().indexOf(filtroTipoEvento) > -1) {
        cardEvento.removeClass("d-none");
      } else {
        cardEvento.addClass("d-none");
      }
    });
  });

  $("#filtroCapacidad").on("keyup", () => {
    filtroCapacidad = $("#filtroCapacidad").val().toUpperCase();
    $("input[name='capacidad_maxima_string']").each((index) => {
      let capacidad_maxima = $("input[name='capacidad_maxima_string']")[index];
      let valor = capacidad_maxima.placeholder;
      let id = capacidad_maxima.id.replace("capacidad_maxima", "");
      console.log(`ID: ${id}`);
      let cardEvento = $(`.evento${id}`);
      console.log(cardEvento);
      console.log(`Valor: ${valor}; Filtro: ${filtroCapacidad}`);
      if (
        !filtroCapacidad ||
        filtroCapacidad === "0" ||
        Number(valor) <= Number(filtroCapacidad)
      ) {
        cardEvento.removeClass("d-none");
      } else {
        cardEvento.addClass("d-none");
      }
    });
  });

});





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
          if (response.id_evento) $(".evento" + response.id_evento).remove();

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
            const eventosContent = doc.querySelector(".eventos").innerHTML;

            $(".eventos").html(eventosContent);
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

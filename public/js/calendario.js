$(() => {
  filtradoFecha();

  let filtroUbicacion;
  let filtroTipoEvento;
  let filtroCapacidad;

  $("#inputCalendario").hide();

  $("#containerCalendario").hide();
  $("#containerFiltroUbicacion").hide();
  $("#containerFiltroTipo").hide();
  $("#containerFiltroCapacidad").hide();

  $("#btnFiltrosBusqueda").on("click", () => {
    $("#containerCalendario").toggle();
    $("#containerFiltroUbicacion").toggle();
    $("#containerFiltroTipo").toggle();
    $("#containerFiltroCapacidad").toggle();

    vaciarFiltros();
  });

  $("#filtrarPorSinFiltros").on("click", () => {
    vaciarFiltros();

    $("#containerFiltroUbicacion").hide();
    $("#containerFiltroTipo").hide();
    $("#containerFiltroCapacidad").hide();
    $("#inputCalendario").hide();
    volverAHoy();
    filtradoFecha();
  });

  $("#filtrarPorTipo").on("click", () => {
    vaciarFiltros();

    $("#containerFiltroUbicacion").hide();
    $("#containerFiltroTipo").show();
    $("#containerFiltroCapacidad").hide();
    $("#inputCalendario").hide();
  });
  $("#filtrarPorUbicacion").on("click", () => {
    vaciarFiltros();

    $("#containerFiltroUbicacion").show();
    $("#containerFiltroTipo").hide();
    $("#containerFiltroCapacidad").hide();
    $("#inputCalendario").hide();
  });
  $("#filtrarPorCapacidad").on("click", () => {
    vaciarFiltros();

    $("#containerFiltroUbicacion").hide();
    $("#containerFiltroTipo").hide();
    $("#containerFiltroCapacidad").show();
    $("#inputCalendario").hide();
  });

  $("#filtroUbicacion").on("keyup", () => {
    fecha_actual = getValorFecha().toLocaleDateString("es-ES");
    filtroUbicacion = $("#filtroUbicacion").val().toUpperCase();
    filtroTipoEvento = $("#filtroTipo").val().toUpperCase();
    filtroCapacidad = $("#filtroCapacidad").val().toUpperCase();

    $("input[name='ubicacion']").each((index) => {
      let ubicacion = $("input[name='ubicacion']")[index];
      let fechaEvento = $("input[name='fecha']")[index].placeholder;
      let tipo = $("input[name='tipo_evento']")[index].placeholder;
      let capacidad = $("input[name='capacidad_maxima_string']")[index].placeholder;
      fechaEvento = getFechaEspanyola(fechaEvento);

      let valorUbicacion = ubicacion.placeholder;
      let id = ubicacion.id.replace("ubicacion", "");

      let cardEvento = $(`.evento${id}`);
      if (
        valorUbicacion.toUpperCase().indexOf(filtroUbicacion) > -1 &&
        fechaEvento === fecha_actual &&
        tipo.toUpperCase().indexOf(filtroTipoEvento) > -1 &&
        (!filtroCapacidad ||
          filtroCapacidad === "0" ||
          Number(capacidad) <= Number(filtroCapacidad))
      ) {
        cardEvento.removeClass("d-none");
      } else {
        cardEvento.addClass("d-none");
      }
    });
  });

  $("#filtroTipo").on("keyup", () => {
    fecha_actual = getValorFecha().toLocaleDateString("es-ES");
    filtroUbicacion = $("#filtroUbicacion").val().toUpperCase();
    filtroTipoEvento = $("#filtroTipo").val().toUpperCase();
    filtroCapacidad = $("#filtroCapacidad").val().toUpperCase();

    $("input[name='tipo_evento']").each((index) => {
      let ubicacion = $("input[name='ubicacion']")[index].placeholder;
      let fechaEvento = $("input[name='fecha']")[index].placeholder;
      let capacidad = $("input[name='capacidad_maxima_string']")[index].placeholder;
      let tipo_evento = $("input[name='tipo_evento']")[index];
      fechaEvento = getFechaEspanyola(fechaEvento);

      let valorTipoEvento = tipo_evento.placeholder;
      let id = tipo_evento.id.replace("tipo_evento", "");
      let cardEvento = $(`.evento${id}`);
      if (
        valorTipoEvento.toUpperCase().indexOf(filtroTipoEvento) > -1 &&
        ubicacion.toUpperCase().indexOf(filtroUbicacion) > -1 &&
        fechaEvento === fecha_actual &&
        (!filtroCapacidad ||
          filtroCapacidad === "0" ||
          Number(capacidad) <= Number(filtroCapacidad))
      ) {
        cardEvento.removeClass("d-none");
      } else {
        cardEvento.addClass("d-none");
      }
    });
  });

  $("#filtroCapacidad").on("keyup", () => {
    fecha_actual = getValorFecha().toLocaleDateString("es-ES");
    filtroUbicacion = $("#filtroUbicacion").val().toUpperCase();
    filtroTipoEvento = $("#filtroTipo").val().toUpperCase();
    filtroCapacidad = $("#filtroCapacidad").val().toUpperCase();

    $("input[name='capacidad_maxima_string']").each((index) => {
      let ubicacion = $("input[name='ubicacion']")[index].placeholder;
      let tipo_evento = $("input[name='tipo_evento']")[index].placeholder;
      let capacidad_maxima = $("input[name='capacidad_maxima_string']")[index];
      let fechaEvento = $("input[name='fecha']")[index].placeholder;
      fechaEvento = getFechaEspanyola(fechaEvento);

      let valor = capacidad_maxima.placeholder;
      let id = capacidad_maxima.id.replace("capacidad_maxima", "");
      let cardEvento = $(`.evento${id}`);
      if (
        (!filtroCapacidad ||
          filtroCapacidad === "0" ||
          Number(valor) <= Number(filtroCapacidad)) &&
        fechaEvento === fecha_actual &&
        tipo_evento.toUpperCase().indexOf(filtroTipoEvento) > -1 &&
        ubicacion.toUpperCase().indexOf(filtroUbicacion) > -1
      ) {
        cardEvento.removeClass("d-none");
      } else {
        cardEvento.addClass("d-none");
      }
    });
  });
});

function vaciarFiltros() {
  $("#filtroUbicacion").val("");
  $("#filtroTipo").val("");
  $("#filtroCapacidad").val("");
  $("#inputCalendario").val("");
}

function getValorFecha() {
  let fecha = $("#fecha").text(); // Obtener el texto de la fecha
  let fechaModificada = new Date(fecha.split("/").reverse().join("-")); // Convertir la fecha al formato adecuado para Date (YYYY-MM-DD)
  return fechaModificada;
}

function getFechaEspanyola(fecha) {
  let fechaModificada = new Date(
    fecha.split("/").reverse().join("-")
  ).toLocaleDateString("es-ES"); // Convertir la fecha al formato adecuado para Date (YYYY-MM-DD)
  return fechaModificada;
}

// Función para actualizar la fecha
function updateDate(increment) {
  fechaModificada = getValorFecha();
  fechaModificada.setDate(fechaModificada.getDate() + increment); // Modificar la fecha (sumar o restar un día)
  $("#fecha").text(fechaModificada.toLocaleDateString("es-ES")); // Actualizar el texto con la fecha modificada en formato España
  vaciarFiltros();
}

function volverAHoy() {
  $("#fecha").text(new Date().toLocaleDateString("es-ES"));
}

$("#previous").on("click", () => {
  // Cambiar de diapositiva con animación

  const carouselInner = $("#eventosCarousel.carousel-inner")[0];
  carouselInner.style.transition = "transform 0.3s ease";
  carouselInner.style.transform = "translateX(100%)";

  setTimeout(() => {
    carouselInner.style.transition = "none";
    carouselInner.style.transform = "translateX(-100%)";

    setTimeout(() => {
      carouselInner.style.transition = "transform 0.3s ease";
      carouselInner.style.transform = "translateX(0%)";
      updateDate(-1);
      filtradoFecha();
    }, 10);
  }, 300);
});

$("#next").on("click", () => {
  const carouselInner = $("#eventosCarousel.carousel-inner")[0];
  carouselInner.style.transition = "transform 0.3s ease";
  carouselInner.style.transform = "translateX(-100%)";

  setTimeout(() => {
    carouselInner.style.transition = "none";
    carouselInner.style.transform = "translateX(+100%)";

    setTimeout(() => {
      carouselInner.style.transition = "transform 0.3s ease";
      carouselInner.style.transform = "translateX(0%)";
      updateDate(1);
      filtradoFecha();
    }, 10);
  }, 300);
});

$("#abrirCalendario").on("click", () => {
  $("#filtroUbicacion").val("");
  $("#filtroTipo").val("");
  $("#filtroCapacidad").val("");

  $("#containerFiltroUbicacion").hide();
  $("#containerFiltroTipo").hide();
  $("#containerFiltroCapacidad").hide();

  $("#inputCalendario").show();
  $("#inputCalendario").focus();
});

// Escuchar cuando el usuario seleccione una fecha
$("#inputCalendario").on("change", (event) => {
  let fecha = event.target.value;
  fecha = fecha.split("-").reverse().join("/");
  $("#fecha").text(fecha);
  $("#inputCalendario").hide();
  vaciarFiltros();
  filtradoFecha();
});

function filtradoFecha() {
  let fecha_actual = $("#fecha").text(); // Obtener el texto de la fecha
  fecha_actual = fecha_actual.split("/").reverse().join("-");
  let existe = false;
  $("input[name='fecha']").each((index) => {
    let fecha = $("input[name='fecha']")[index];
    let valor = fecha.placeholder;
    let id = fecha.id.replace("fecha", "");
    let cardEvento = $(`.evento${id}`); // Seleccionar la tarjeta asociada

    let valorFormateado = new Date(valor).toLocaleDateString("es-ES");

    let fecha_actualFormateado = new Date(fecha_actual).toLocaleDateString(
      "es-ES"
    );

    if (valorFormateado === fecha_actualFormateado) {
      existe = true;
      cardEvento.removeClass("d-none"); // Mostrar si coincide
    } else {
      cardEvento.addClass("d-none"); // Ocultar si no coincide
    }
  });

  if (!existe) {
    // Añadir el mensaje dentro de #listaEventos
    $("#listaEventos").append('<span class="text-secondary fs-1 text-center vh-100 d-flex justify-content-center align-items-center">No hay eventos registrados</span>');
  }
  else {
    // Eliminar el mensaje si existe
    $("#listaEventos span").remove();
  }
}

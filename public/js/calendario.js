$(() => {
  filtradoFecha();
  $("#inputCalendario").hide();

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
    $("#inputCalendario").val("");

    $("#containerFiltroUbicacion").hide();
    $("#containerFiltroTipo").hide();
    $("#containerFiltroCapacidad").hide();
    $("#inputCalendario").hide();
    volverAHoy();
    filtradoFecha();
  });

  $("#filtrarPorTipo").on("click", () => {
    $("#filtroUbicacion").val("");
    $("#filtroTipo").val("");
    $("#filtroCapacidad").val("");
    $("#inputCalendario").val("");

    $("#containerFiltroUbicacion").hide();
    $("#containerFiltroTipo").show();
    $("#containerFiltroCapacidad").hide();
    $("#inputCalendario").hide();
  });
  $("#filtrarPorUbicacion").on("click", () => {
    $("#filtroUbicacion").val("");
    $("#filtroTipo").val("");
    $("#filtroCapacidad").val("");
    $("#inputCalendario").val("");

    $("#containerFiltroUbicacion").show();
    $("#containerFiltroTipo").hide();
    $("#containerFiltroCapacidad").hide();
    $("#inputCalendario").hide();
  });
  $("#filtrarPorCapacidad").on("click", () => {
    $("#filtroUbicacion").val("");
    $("#filtroTipo").val("");
    $("#filtroCapacidad").val("");
    $("#inputCalendario").val("");

    $("#containerFiltroUbicacion").hide();
    $("#containerFiltroTipo").hide();
    $("#containerFiltroCapacidad").show();
    $("#inputCalendario").hide();
  });

  $("#filtroUbicacion").on("keyup", () => {
    fecha_actual = getValorFecha().toLocaleDateString("es-ES");
    filtroUbicacion = $("#filtroUbicacion").val().toUpperCase();
    $("input[name='ubicacion']").each((index) => {
      let ubicacion = $("input[name='ubicacion']")[index];
      let fechaEvento = $("input[name='fecha']")[index].placeholder;
      fechaEvento = getFechaEspanyola(fechaEvento);

      let valor = ubicacion.placeholder;
      let id = ubicacion.id.replace("ubicacion", "");

      let cardEvento = $(`.evento${id}`);
      console.log(cardEvento);
      if (
        valor.toUpperCase().indexOf(filtroUbicacion) > -1 &&
        fechaEvento === fecha_actual
      ) {
        cardEvento.removeClass("d-none");
      } else {
        cardEvento.addClass("d-none");
      }
    });
  });

  $("#filtroTipo").on("keyup", () => {
    fecha_actual = getValorFecha().toLocaleDateString("es-ES");
    filtroTipoEvento = $("#filtroTipo").val().toUpperCase();
    $("input[name='tipo_evento']").each((index) => {
      let tipo_evento = $("input[name='tipo_evento']")[index];
      let fechaEvento = $("input[name='fecha']")[index].placeholder;
      fechaEvento = getFechaEspanyola(fechaEvento);

      let valor = tipo_evento.placeholder;
      let id = tipo_evento.id.replace("tipo_evento", "");
      console.log(`ID: ${id}`);
      let cardEvento = $(`.evento${id}`);
      console.log(cardEvento);
      if (
        valor.toUpperCase().indexOf(filtroTipoEvento) > -1 &&
        fechaEvento === fecha_actual
      ) {
        cardEvento.removeClass("d-none");
      } else {
        cardEvento.addClass("d-none");
      }
    });
  });

  $("#filtroCapacidad").on("keyup", () => {
    fecha_actual = getValorFecha().toLocaleDateString("es-ES");
    filtroCapacidad = $("#filtroCapacidad").val().toUpperCase();
    $("input[name='capacidad_maxima_string']").each((index) => {
      let capacidad_maxima = $("input[name='capacidad_maxima_string']")[index];
      let fechaEvento = $("input[name='fecha']")[index].placeholder;
      fechaEvento = getFechaEspanyola(fechaEvento);

      let valor = capacidad_maxima.placeholder;
      let id = capacidad_maxima.id.replace("capacidad_maxima", "");
      console.log(`ID: ${id}`);
      let cardEvento = $(`.evento${id}`);
      console.log(cardEvento);
      console.log(`Valor: ${valor}; Filtro: ${filtroCapacidad}`);
      if (
        (!filtroCapacidad ||
          filtroCapacidad === "0" ||
          Number(valor) <= Number(filtroCapacidad)) &&
        fechaEvento === fecha_actual
      ) {
        cardEvento.removeClass("d-none");
      } else {
        cardEvento.addClass("d-none");
      }
    });
  });
});

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
}

function volverAHoy() {
  $("#fecha").text(new Date().toLocaleDateString("es-ES"));
}

//Animacion hacia atrás
$("#previous").on("click", () => {
  // Cambiar de diapositiva con animación

  const carouselInner = document.querySelector(".carousel-inner");
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

//Animacion hacia adelante
$("#next").on("click", () => {
  const carouselInner = document.querySelector(".carousel-inner");
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
  $("#inputCalendario").val("");
  $("#inputCalendario").hide();
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
    if (!existe) $("#noEventos").show();
    else $("#noEventos").hide();
  });
}

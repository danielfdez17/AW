"use strict";

// Función que actualiza los ajustes del tema
function ajustes_color(tema) {
  if (tema == "predeterminado")
    if (window.matchMedia("(prefers-color-scheme: dark)").matches)
      tema = "oscuro";
    else tema = "claro";

  switch (tema) {
    case "claro":
      temaClaro();
      break;
    case "oscuro":
      temaOscuro();
      break;
    default:
      temaClaro();
      break;
  }
}

// Función que actualiza el tema de la aplicación al tema claro
function temaClaro() {
  $("header .logo").attr("src", "/resources/logo.png");

  $("body").removeClass("bg-dark");
  $("body").addClass("bg-light");

  $("header").removeClass("bg-dark");
  $("header").addClass("bg-light");

  $("header a").removeClass("text-light");
  $("header a").addClass("text-black");

  $("header [href='/logOut']").removeClass("text-light");
  $("header [href='/logOut']").addClass("text-dark");

  $("header #botonNotificaciones").removeClass("text-light");
  $("header #botonNotificaciones").addClass("text-dark");
  $("header #botonAccesibilidad").removeClass("text-light");
  $("header #botonAccesibilidad").addClass("text-dark");

  $("#formRecordatorios button").not(".active").removeClass("bg-light");
  $("#formAccesibilidadTema button").not(".active").removeClass("bg-light");
  $("#formAccesibilidadLetra button").not(".active").removeClass("bg-light");

  $("header #formAccesibilidad").addClass("text-dark");
  $("header #formAccesibilidad").removeClass("text-light");
  $("header #formAccesibilidad").addClass("bg-light");
  $("header #formAccesibilidad").removeClass("bg-dark");

  $("header .dropdown-menu").addClass("text-dark");
  $("header .dropdown-menu").removeClass("text-light");
  $("header .dropdown-menu").addClass("bg-light");
  $("header .dropdown-menu").removeClass("bg-dark");

  $("header #formAccesibilidad #Tema").addClass("text-dark");
  $("header #formAccesibilidad #Tema").removeClass("text-light");
  $("header #formAccesibilidad #Tema").addClass("bg-light");
  $("header #formAccesibilidad #Tema").removeClass("bg-dark");
  $("header #formAccesibilidad #Tema .dropdown-item").addClass("text-dark");
  $("header #formAccesibilidad #Tema .dropdown-item").removeClass("text-light");
  $("header #formAccesibilidad #Tema .dropdown-item").addClass("bg-light");
  $("header #formAccesibilidad #Tema .dropdown-item").removeClass("bg-dark");
  $("header #formAccesibilidad #Letra").addClass("text-dark");
  $("header #formAccesibilidad #Letra").removeClass("text-light");
  $("header #formAccesibilidad #Letra").addClass("bg-light");
  $("header #formAccesibilidad #Letra").removeClass("bg-dark");
  $("header #formAccesibilidad #Letra .dropdown-item").addClass("text-dark");
  $("header #formAccesibilidad #Letra .dropdown-item").removeClass(
    "text-light"
  );
  $("header #formAccesibilidad #Letra .dropdown-item").addClass("bg-light");
  $("header #formAccesibilidad #Letra .dropdown-item").removeClass("bg-dark");

  $("#modalEditarPerfil .modal-content").addClass("bg-light");
  $("#modalEditarPerfil .modal-content").removeClass("bg-dark");
  $("#modalEditarPerfil .modal-header button").addClass("text-dark");
  $("#modalEditarPerfil .modal-header button").removeClass("text-light");

  $("#formEditarPerfil label").addClass("text-dark");
  $("#formEditarPerfil label").removeClass("text-light");

  $("#eventoInscrito .list-group-item").addClass("bg-light");
  $("#eventoInscrito .list-group-item").removeClass("bg-dark");
  $(".eventosOrganizador .list-group-item").addClass("bg-light");
  $(".eventosOrganizador .list-group-item").removeClass("bg-dark");

  $("#infoIndex").addClass("bg-light");
  $("#infoIndex").removeClass("bg-dark");
  $("#infoIndex").addClass("text-dark");
  $("#infoIndex").removeClass("text-light");

  $("#containerCarousel").addClass("bg-light");
  $("#containerCarousel").removeClass("bg-dark");
  $("#containerCarousel").addClass("text-dark");
  $("#containerCarousel").removeClass("text-light");

  $("#abrirCalendario").addClass("text-dark");
  $("#abrirCalendario").removeClass("text-light");

  $("#filtrosBusqueda").addClass("bg-light");
  $("#filtrosBusqueda").removeClass("bg-dark");
  $("#filtrosBusqueda").addClass("text-dark");
  $("#filtrosBusqueda").removeClass("text-light");

  $("#btnFiltrosBusqueda").addClass("text-dark");
  $("#btnFiltrosBusqueda").removeClass("text-light");

  $("#listaEventos").addClass("bg-light");
  $("#listaEventos").removeClass("bg-dark");
  $("#listaEventos").addClass("text-dark");
  $("#listaEventos").removeClass("text-light");

  $("#perfilHeader button:first").addClass("bg-dark");
  $("#perfilHeader button:first").removeClass("bg-light");
  $("#perfilHeader button:first").addClass("text-light");
  $("#perfilHeader button:first").removeClass("text-dark");

  $("#previous, #next").addClass("btn-dark");
  $("#previous, #next").removeClass("btn-light");

  $("#previous span:first, #next span:first").addClass("text-light");
  $("#previous span:first, #next span:first").removeClass("text-dark");

  $(".cardEvento .card-body").addClass("bg-white");
  $(".cardEvento .card-body").removeClass("bg-black");

  $(".cardEvento .card-body input").addClass("bg-light");
  $(".cardEvento .card-body input").removeClass("bg-dark");
  $(".cardEvento .card-body input").removeClass("text-light");
  $(".cardEvento .card-body input").addClass("text-dark");

  $(".cardEvento .card-body i").addClass("bg-light");
  $(".cardEvento .card-body i").removeClass("bg-black");
  $(".cardEvento .card-body i").removeClass("text-light");
  $(".cardEvento .card-body i").addClass("text-black");

  $(".cardEvento .card-footer").addClass("bg-light");
  $(".cardEvento .card-footer").removeClass("bg-dark");
  $(".cardEvento .card-footer").removeClass("text-light");
  $(".cardEvento .card-footer").addClass("text-dark");

  $("footer").removeClass("bg-dark");
  $("footer").addClass("bg-light");
  $("footer a").removeClass("text-light");
  $("footer a").addClass("text-dark");
  $("footer i:first").removeClass("text-light");
  $("footer i:first").addClass("text-dark");
}

// Función que actualiza el tema de la aplicación al tema claro
function temaOscuro() {
  $("header .logo").attr("src", "/resources/logo-negativo.png");

  $("body").removeClass("bg-light");
  $("body").addClass("bg-dark");

  $("header").removeClass("bg-light");
  $("header").addClass("bg-dark");

  $("header a").removeClass("text-dark");
  $("header a").addClass("text-light");

  $("header [href='/logOut']").removeClass("text-dark");
  $("header [href='/logOut']").addClass("text-light");

  $("header #botonNotificaciones").removeClass("text-dark");
  $("header #botonNotificaciones").addClass("text-light");
  $("header #botonAccesibilidad").removeClass("text-dark");
  $("header #botonAccesibilidad").addClass("text-light");

  $("#formRecordatorios button").not(".active").addClass("bg-light");
  $("#formAccesibilidadTema button").not(".active").addClass("bg-light");
  $("#formAccesibilidadLetra button").not(".active").addClass("bg-light");

  $("header #formAccesibilidad").addClass("text-light");
  $("header #formAccesibilidad").removeClass("text-dark");
  $("header #formAccesibilidad").addClass("bg-dark");
  $("header #formAccesibilidad").removeClass("bg-light");

  $("header .dropdown-menu").addClass("text-light");
  $("header .dropdown-menu").removeClass("text-dark");
  $("header .dropdown-menu").addClass("bg-dark");
  $("header .dropdown-menu").removeClass("bg-light");

  $("header #formAccesibilidad #Tema").addClass("text-light");
  $("header #formAccesibilidad #Tema").removeClass("text-dark");
  $("header #formAccesibilidad #Tema").addClass("bg-dark");
  $("header #formAccesibilidad #Tema").removeClass("bg-light");
  $("header #formAccesibilidad #Tema .dropdown-item").addClass("text-light");
  $("header #formAccesibilidad #Tema .dropdown-item").removeClass("text-dark");
  $("header #formAccesibilidad #Tema .dropdown-item").addClass("bg-dark");
  $("header #formAccesibilidad #Tema .dropdown-item").removeClass("bg-light");
  $("header #formAccesibilidad #Letra").addClass("text-light");
  $("header #formAccesibilidad #Letra").removeClass("text-dark");
  $("header #formAccesibilidad #Letra").addClass("bg-dark");
  $("header #formAccesibilidad #Letra").removeClass("bg-light");
  $("header #formAccesibilidad #Letra .dropdown-item").addClass("text-light");
  $("header #formAccesibilidad #Letra .dropdown-item").removeClass("text-dark");
  $("header #formAccesibilidad #Letra .dropdown-item").addClass("bg-dark");
  $("header #formAccesibilidad #Letra .dropdown-item").removeClass("bg-light");

  $("#modalEditarPerfil .modal-content").addClass("bg-dark");
  $("#modalEditarPerfil .modal-content").removeClass("bg-light");
  $("#modalEditarPerfil .modal-header button").addClass("text-light");
  $("#modalEditarPerfil .modal-header button").removeClass("text-dark");

  $("#formEditarPerfil label").addClass("text-light");
  $("#formEditarPerfil label").removeClass("text-dark");

  $("#eventoInscrito .list-group-item").addClass("bg-dark");
  $("#eventoInscrito .list-group-item").removeClass("bg-light");
  $(".eventosOrganizador .list-group-item").addClass("bg-dark");
  $(".eventosOrganizador .list-group-item").removeClass("bg-light");

  $("#infoIndex").addClass("bg-dark");
  $("#infoIndex").removeClass("bg-light");
  $("#infoIndex").addClass("text-light");
  $("#infoIndex").removeClass("text-dark");

  $("#containerCarousel").addClass("bg-dark");
  $("#containerCarousel").removeClass("bg-light");
  $("#containerCarousel").addClass("text-light");
  $("#containerCarousel").removeClass("text-dark");

  $("#abrirCalendario").addClass("text-light");
  $("#abrirCalendario").removeClass("text-dark");

  $("#filtrosBusqueda").addClass("bg-dark");
  $("#filtrosBusqueda").removeClass("bg-light");
  $("#filtrosBusqueda").addClass("text-light");
  $("#filtrosBusqueda").removeClass("text-dark");

  $("#btnFiltrosBusqueda").addClass("text-light");
  $("#btnFiltrosBusqueda").removeClass("text-dark");

  $("#listaEventos").addClass("bg-dark");
  $("#listaEventos").removeClass("bg-light");
  $("#listaEventos").addClass("text-light");
  $("#listaEventos").removeClass("text-dark");

  $("#perfilHeader button:first").addClass("bg-light");
  $("#perfilHeader button:first").removeClass("bg-dark");
  $("#perfilHeader button:first").addClass("text-dark");
  $("#perfilHeader button:first").removeClass("text-light");

  $("#previous, #next").addClass("btn-light");
  $("#previous, #next").removeClass("btn-dark");

  $(".cardEvento .card-body").addClass("bg-black");
  $(".cardEvento .card-body").removeClass("bg-white");

  $(".cardEvento .card-body input").addClass("bg-dark");
  $(".cardEvento .card-body input").removeClass("bg-light");
  $(".cardEvento .card-body input").removeClass("text-dark");
  $(".cardEvento .card-body input").addClass("text-light");

  $(".cardEvento .card-body i").addClass("bg-black");
  $(".cardEvento .card-body i").removeClass("bg-light");
  $(".cardEvento .card-body i").removeClass("text-black");
  $(".cardEvento .card-body i").addClass("text-light");

  $(".cardEvento .card-footer").addClass("bg-dark");
  $(".cardEvento .card-footer").removeClass("bg-light");
  $(".cardEvento .card-footer").removeClass("text-dark");
  $(".cardEvento .card-footer").addClass("text-light");

  $("#previous span:first, #next span:first").addClass("bg-dark");
  $("#previous span:first, #next span:first").removeClass("bg-light");

  $("footer").removeClass("bg-light");
  $("footer").addClass("bg-dark");
  $("footer a").removeClass("text-dark");
  $("footer a").addClass("text-light");
  $("footer i:first").removeClass("text-dark");
  $("footer i:first").addClass("text-light");
}

// Función que actualiza los ajustes del tamaño de letra
function ajustes_texto(tam_letra) {
  if (tam_letra === "normal") document.documentElement.style.fontSize = "16px";
  else if (tam_letra === "grande")
    document.documentElement.style.fontSize = "20px";
  else if (tam_letra === "muy grande")
    document.documentElement.style.fontSize = "24px";
}

$("#formAccesibilidadTema button[type='submit']").on("click", function (event) {
  event.preventDefault();

  const actionUrl = $("#formAccesibilidadTema").attr("action");
  const buttonValue = $(this).val();
  var formData = `tema=${buttonValue}`;

  const button = $(this); // Guardar referencia al botón actual
  $.ajax({
    url: actionUrl,
    type: "POST",
    data: formData,

    success: function (response) {
      // Mostrar mensaje de éxito o error
      $("#formAccesibilidadTema .dropdown-item").removeClass("active");
      button.addClass("active");
      ajustes_color(buttonValue);
      $.get("/toasts", function (data) {
        $("#contenedor-toasts").html(data); // Reemplaza el contenido del footer
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

$("#formAccesibilidadLetra button[type='submit']").on(
  "click",
  function (event) {
    event.preventDefault();

    const actionUrl = $("#formAccesibilidadLetra").attr("action");
    const buttonValue = $(this).val();
    var formData = `letra=${buttonValue}`;

    const button = $(this); // Guardar referencia al botón actual

    $.ajax({
      url: actionUrl,
      type: "POST",
      data: formData,

      success: function (response) {
        // Mostrar mensaje de éxito o error
        $("#formAccesibilidadLetra .dropdown-item").removeClass("active");
        button.addClass("active");
        ajustes_texto(buttonValue);
        $.get("/toasts", function (data) {
          $("#contenedor-toasts").html(data); // Reemplaza el contenido del footer
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

$(document).ready(function () {
  let tema = $('button[name="tema"].active').val();
  let letra = $('button[name="letra"].active').val();

  ajustes_texto(letra);
  ajustes_color(tema);
});

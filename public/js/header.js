//TODO: Cuando se fije el diseño hacer accsibilidad de colores
"use strict";

//Tipos daltonismo
// Rojo-verde
const deuteranomalia = ""; // ciertos tonos verdes se ven mas rojos
const protanomalia = ""; // ciertos tonos rojos se ven mas verdes y menos brillantes
const protanopia = ""; // no se distingue entre rojo y verde
const deuteranopia = ""; // no se distingue entre rojo y verde
// Azul-amarillo
const tritanomalia = ""; // difícil diferencia entre azul y verde, y entre amarillo y rojo
const titanopia = ""; // no se distingue entre azul y verde, entre morado(violeta) y rojo, y entre amarillo y rosado. Todos los colores se ven menos brillantes

const botonHabilidarEdicion = document.getElementById("habilitarEdicion");
const editarNombre = document.getElementById("editarNombre");
const editarCorreo = document.getElementById("editarCorreo");
const editarContrasena = document.getElementById("editarContrasena");
const editarTelefono = document.getElementById("editarTelefono");

//Ajustes de tema
function ajustes_color(tema) {
  let root = document.documentElement;
  switch (tema) {
    case "claro":
      temaClaro();
      break;
    case "oscuro":
      temaOscuro();
      break;
    case "deuteranomalia":
      break;
    case "protanomalia":
      break;
    case "protanopia":
      break;
    case "deuteranopia":
      break;
    case "tritanomalia":
      break;
    case "titanopia":
      break;
    default:
      temaClaro();
      break;
  }
}

function temaClaro() {
  $("header").removeClass("bg-black");
  $("header").addClass("bg-light");

  $("header a").removeClass("text-light");
  $("header a").addClass("text-black");

  $("header [href='/logOut']").removeClass("text-light");
  $("header [href='/logOut']").addClass("text-dark");

  $("header #botonNotificaciones").removeClass("text-light");
  $("header #botonNotificaciones").addClass("text-dark");
  $("header #botonAccesibilidad").removeClass("text-light");
  $("header #botonAccesibilidad").addClass("text-dark");

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
  //   $("#previous, #next").addClass("text-light");
  //   $("#previous, #next").removeClass("text-dark");

  $("#previous span:first, #next span:first").addClass("text-light");
  $("#previous span:first, #next span:first").removeClass("text-dark");

  $(".cardEvento .card-body").addClass("bg-light")
  $(".cardEvento .card-body").removeClass("bg-dark")

  $(".cardEvento .card-body input").addClass("bg-light")
  $(".cardEvento .card-body input").removeClass("bg-dark")
  $(".cardEvento .card-body input").removeClass("text-light")
  $(".cardEvento .card-body input").addClass("text-dark")

  $("footer").removeClass("bg-dark");
  $("footer").addClass("bg-light");
  $("footer a").removeClass("text-light");
  $("footer a").addClass("text-dark");
  $("footer i:first").removeClass("text-light");
  $("footer i:first").addClass("text-dark");
}

function temaOscuro() {
  $("header").removeClass("bg-light");
  $("header").addClass("bg-black");

  $("header a").removeClass("text-dark");
  $("header a").addClass("text-light");

  $("header [href='/logOut']").removeClass("text-dark");
  $("header [href='/logOut']").addClass("text-light");

  $("header #botonNotificaciones").removeClass("text-dark");
  $("header #botonNotificaciones").addClass("text-light");
  $("header #botonAccesibilidad").removeClass("text-dark");
  $("header #botonAccesibilidad").addClass("text-light");

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
  //   $("#previous, #next").addClass("text-dark");
  //   $("#previous, #next").removeClass("text-light");

  $(".cardEvento .card-body").addClass("bg-dark")
  $(".cardEvento .card-body").removeClass("bg-light")

  $(".cardEvento .card-body input").addClass("bg-dark")
  $(".cardEvento .card-body input").removeClass("bg-light")
  $(".cardEvento .card-body input").removeClass("text-dark")
  $(".cardEvento .card-body input").addClass("text-light")

  $("#previous span:first, #next span:first").addClass("bg-dark");
  $("#previous span:first, #next span:first").removeClass("bg-light");

  $("footer").removeClass("bg-light");
  $("footer").addClass("bg-dark");
  $("footer a").removeClass("text-dark");
  $("footer a").addClass("text-light");
  $("footer i:first").removeClass("text-dark");
  $("footer i:first").addClass("text-light");
}

//Ajustes tamaño de letra
function ajustes_texto(tam_letra) {
  if (tam_letra === "normal") document.documentElement.style.fontSize = "18px";
  else if (tam_letra === "grande")
    document.documentElement.style.fontSize = "22px";
  else if (tam_letra === "muy grande")
    document.documentElement.style.fontSize = "26px";
}

document.addEventListener("DOMContentLoaded", function () {
  //Identificamos los elementos a los que queremos añadirle el EventListener
  document.querySelectorAll(".dropdown-menu ul").forEach(function (list) {
    list.querySelectorAll(".dropdown-item").forEach(function (item) {
      //Añadimos EventListener, para que el momento de hacer click sobre alguno
      //de estos elementos salte la funcion
      item.addEventListener("click", function (event) {
        // Evita que el dropdown se cierre al hacer clic
        event.stopPropagation();

        // Elimina la clase 'active' de todos los elementos en este <ul>
        list.querySelectorAll(".dropdown-item").forEach(function (i) {
          i.classList.remove("active");
        });

        // Añade la clase 'active' al elemento clicado
        item.classList.add("active");

        //Identificamos que lista es
        if (list.id == "Tema") ajustes_color(item.getAttribute("value"));
        else if (list.id == "Letra") ajustes_texto(item.getAttribute("value"));
      });
    });
  });
  //Inicialmente los ajustes corresponden al predeterminado
  ajustes_color("predeterminado");
});

function habilitarEdicion() {
  editarNombre.setAttribute("disabled", "false");
  editarCorreo.setAttribute("disabled", "false");
  editarContrasena.setAttribute("disabled", "false");
  editarTelefono.setAttribute("disabled", "false");

  editarNombre.textContent = editarNombre.getAttribute("placeholder");
  editarNombre.textContent = editarNombre.getAttribute("placeholder");
  editarContrasena.textContent = editarContrasena.getAttribute("placeholder");
}

document.addEventListener("DOMContentLoaded", function () {
  //Identificamos los elementos a los que queremos añadirle el EventListener
  document.querySelectorAll("#informacion button").forEach(function (button) {
    button.addEventListener("click", function (event) {
      // Evita que el dropdown se cierre al hacer clic
      event.stopPropagation();

      document.querySelectorAll("#informacion button").forEach(function (i) {
        i.classList.remove("activo");
      });

      button.classList.add("activo");
    });
  });
});

$("#formAccesibilidad button[type=submit]").on("click", (event) => {
  event.preventDefault();
  let tema = "";
  if ($("#temaPredeterminado").hasClass("active")) tema = "predeterminado";
  else if ($("#temaClaro").hasClass("active")) tema = "claro";
  else if ($("#temaOscuro").hasClass("active")) tema = "oscuro";
  else if ($("#temaDeuteranomalia").hasClass("active")) tema = "deuteranomalia";
  else if ($("#temaProtanomalia").hasClass("active")) tema = "protanomalia";
  else if ($("#temaProtanopia").hasClass("active")) tema = "protanopia";
  else if ($("#temaDeuteranopia").hasClass("active")) tema = "deuteranopia";
  else if ($("#temaTritanomalia").hasClass("active")) tema = "tritanomalia";
  else if ($("#temaTritanopia").hasClass("active")) tema = "tritanopia";
  else tema = "predeterminado";

  let letra = "";
  if ($("#letraNormal").hasClass("active")) letra = "normal";
  else if ($("#letraGrande").hasClass("active")) letra = "grande";
  else if ($("#letraMuyGrande").hasClass("active")) letra = "muy grande";
  else letra = "normal";

  $("#inputTema").prop("value", tema);
  $("#inputLetra").prop("value", letra);

  $("#formAccesibilidad").off("submit").submit();
});

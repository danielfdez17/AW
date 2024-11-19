"use strict";

const TIEMPO_DESVANECIMIENTO = 2;
const NUM_INTENTOS = 3;
const IMG_SKULL = "/img/skull.png";
const IMG_TESORO = "/img/tesoro.png";
const IMG_ISLA = "/img/isla.png";

$(() => {
  $("#islas").hide();
  $("#fin").hide();
  $("#comenzar").on("click", () => {
    $("#inicio").hide();
    $("#islas").show();
    asignarTesoroEsqueleto();
  });

  let contador = NUM_INTENTOS;

  function actualizarContador() {
    $("#titulo p").html(`<p>${contador} intentos restantes</p>`);
  }

  let infoContador = $(`<p>${contador} intentos restantes</p>`);
  $("#titulo").append(infoContador);

  function cambiarImagen(isla, imagen) {
    isla.on("click", () => {
      isla.prop("src", imagen);
      contador--;
      actualizarContador();
      if (imagen === IMG_TESORO) {
        terminar(true);
      } else if (contador === 0) {
        terminar(false);
      }
    });
  }

  function asignarTesoroEsqueleto() {
    const NUM_ISLAS = $("#islas img").length;
    for (let i = 0; i < NUM_ISLAS; ++i) {
      cambiarImagen(
        $("#islas img").eq(i),
        Math.floor(Math.random() * 3) % 2 === 0 ? IMG_SKULL : IMG_TESORO
      );
    }
    contador = NUM_INTENTOS;
  }

  function terminar(ganar) {
    $("#mensaje").text(`Fin del juego: has ${ganar ? "ganado" : "perdido"}`);
    $("#fin").show();
    $("#islas img").prop("onclick", null).off("click");
    $("#restart").on("click", () => {
      $("#islas").hide();
      $("#fin").hide();
      $("#inicio").show();
      $("#islas img").prop("src", IMG_ISLA);
      asignarTesoroEsqueleto();
      contador = NUM_INTENTOS;
      actualizarContador();
      console.clear();
    });
  }
});

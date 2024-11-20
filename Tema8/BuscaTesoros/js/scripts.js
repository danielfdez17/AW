"use strict";

const TIEMPO_DESVANECIMIENTO = 2;
const NUM_INTENTOS = 3;
const IMG_SKULL = "/img/skull.png";
const IMG_TESORO = "/img/tesoro.png";
const IMG_ISLA = "/img/isla.png";
const WRONG_COLOR = "#ff4500";

// Cuando se hayan cargado todos los elementos del DOM se ejecuta la callback anónima
$(() => {
  // Al iniciar el juego se esconden las islas y mensaje final
  $("#islas").hide();
  $("#fin").hide();
  // Y se muestran cuando se pulsa el botón 'Comenzar', además de asignar las nuevas imágenes al hacer click en ellas
  $("#comenzar").on("click", () => {
    $("#inicio").hide();
    $("#islas").show();
    asignarTesoroEsqueleto();
  });
  // Guarda el número de intentos que ha utilizado el usuario
  let contador = NUM_INTENTOS;

  // Actualiza el contador en pantalla para que el usuario sepa cuántos intentos le quedan
  function actualizarContador() {
    $("#titulo p").html(`<p>${contador} intentos restantes</p>`);
  }

  // Se añade la etiqueta que va a mostrar el contador de intentos
  let infoContador = $(`<p>${contador} intentos restantes</p>`);
  $("#titulo").append(infoContador);

  // Asigna la imagen 'imagen' al pulsar sobre ella, añadiéndole también los efectos de 'fadeOut' y 'fadeIn'
  function cambiarImagen(isla, imagen) {
    isla.on("click", () => {
      isla.fadeOut(0);
      isla.prop("src", imagen);
      isla.prop(
        "alt",
        `Imagen de ${imagen === IMG_SKULL ? "una calavera" : "un tesoro"}`
      );
      isla.fadeIn(2000);
      contador--;
      actualizarContador();
      if (imagen === IMG_TESORO) {
        terminar(true);
      } else if (contador === 0) {
        terminar(false);
      }
    });
  }

  // Asigna una imagen al azar entre la de la calavera y la del tesoro para que no se pueda predecir el comportamiento del juego
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

  // Añade el texto donde se encuentra la etiqueta que se debe mostrar al usuario cuando termine la partida, se desactiva el evento de 'click' de la imágenes y se añade un evento al botón de reiniciar para que el juego reinicie al pulsar sobre él
  function terminar(ganar) {
    $("#mensaje").text(`Fin del juego: has ${ganar ? "ganado" : "perdido"}`);
    if (ganar) {
      $("#restart").css("background-color", "green");
      $("#mensaje").css("color", "green");
    } else {
      $("#restart").css("background-color", WRONG_COLOR);
      $("#mensaje").css("color", WRONG_COLOR);
    }
    $("#mensaje").css("font-size", "1.5rem");
    $("#mensaje").css("font-weight", "bold");
    $("#fin").show();
    $("#islas img").off("click");
    $("#restart").on("click", () => {
      $("#islas img").prop("onclick", null).off("click");
      $("#islas").hide();
      $("#fin").hide();
      $("#inicio").show();
      $("#islas img").prop("src", IMG_ISLA);
      asignarTesoroEsqueleto();
      contador = NUM_INTENTOS;
      actualizarContador();
      location.reload();
    });
  }
});

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
      root.style.setProperty("--inicio-degradado", inicio_degradado_claro);
      root.style.setProperty("--fin-degradado", fin_degradado_claro);
      root.style.setProperty("--text-color", text_color_claro);
      break;
    case "oscuro":
      root.style.setProperty("--inicio-degradado", inicio_degradado_oscuro);
      root.style.setProperty("--fin-degradado", fin_degradado_oscuro);
      root.style.setProperty("--text-color", text_color_oscuro);
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
      root.style.setProperty("--inicio-degradado", inicio_degradado_oscuro);
      root.style.setProperty("--fin-degradado", fin_degradado_oscuro);
      root.style.setProperty("--text-color", text_color_oscuro);
      break;
  }
  //   if (tema == "claro") {
  //     root.style.setProperty("--inicio-degradado", inicio_degradado_claro);
  //     root.style.setProperty("--fin-degradado", fin_degradado_claro);
  //     root.style.setProperty("--text-color", text_color_claro);
  //   } else if (tema == "oscuro") {
  //     root.style.setProperty("--inicio-degradado", inicio_degradado_oscuro);
  //     root.style.setProperty("--fin-degradado", fin_degradado_oscuro);
  //     root.style.setProperty("--text-color", text_color_oscuro);
  //   } else if (tema == "predeterminado") {
  //     root.style.setProperty("--inicio-degradado", inicio_degradado_oscuro);
  //     root.style.setProperty("--fin-degradado", fin_degradado_oscuro);
  //     root.style.setProperty("--text-color", text_color_oscuro);
  //   }
}

//Ajustes tamaño de letra
function ajustes_texto(tam_letra) {
  if (tam_letra == "normal") document.documentElement.style.fontSize = "18px";
  else if (tam_letra == "grande")
    document.documentElement.style.fontSize = "22px";
  else if (tam_letra == "muy grande")
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
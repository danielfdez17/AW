//TODO: Cuando se fije el diseño hacer accsibilidad de colores

const dominio = "@ucm.es";
$(() => {
  $("#correoLogin").click(() => {
    $("#correoLogin").get(0).setSelectionRange(0, 0);
  });
  $("#correoLogin").keydown(() => {
    let correo = $("#correoLogin").val().replace(dominio, "");
    $("#correoLogin").val(correo + dominio);
  });
});

//Colores claros
const inicio_degradado_claro = "rgb(255, 237, 241)";
const fin_degradado_claro = "rgb(207, 146, 238)";
const text_color_claro = "rgb(20, 20, 28)";

//Colores oscuros
const inicio_degradado_oscuro = "rgb(0, 0, 0)";
const fin_degradado_oscuro = "rgb(231, 207, 243)";
const text_color_oscuro = "rgb(255, 237, 241)";

const botonHabilidarEdicion = document.getElementById("habilitarEdicion");
const editarNombre = document.getElementById("editarNombre");
const editarCorreo = document.getElementById("editarCorreo");
const editarContrasena = document.getElementById("editarContrasena");
const editarTelefono = document.getElementById("editarTelefono");

//Ajustes de tema
function ajustes_color(tipo_letra) {
  let root = document.documentElement;
  if (tipo_letra == "Claro") {
    root.style.setProperty("--inicio-degradado", inicio_degradado_claro);
    root.style.setProperty("--fin-degradado", fin_degradado_claro);
    root.style.setProperty("--text-color", text_color_claro);
  } else if (tipo_letra == "Oscuro") {
    root.style.setProperty("--inicio-degradado", inicio_degradado_oscuro);
    root.style.setProperty("--fin-degradado", fin_degradado_oscuro);
    root.style.setProperty("--text-color", text_color_oscuro);
  } else if (tipo_letra == "Predeterminado") {
    root.style.setProperty("--inicio-degradado", inicio_degradado_oscuro);
    root.style.setProperty("--fin-degradado", fin_degradado_oscuro);
    root.style.setProperty("--text-color", text_color_oscuro);
  }
}

//Ajustes tamaño de letra
function ajustes_texto(tipo_color) {
  if (tipo_color == "Normal") document.documentElement.style.fontSize = "18px";
  else if (tipo_color == "Grande")
    document.documentElement.style.fontSize = "22px";
  else if (tipo_color == "Muy grande")
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
  ajustes_color("Predeterminado");
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

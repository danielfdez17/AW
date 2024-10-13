"use strict";

const inicio = document.getElementById("inicio");
const contacto = document.getElementById("contacto");
const navbar = document.getElementById("navbar");
const ajustesAccesibilidad = document.getElementById("ajustes-accesibilidad");
const caracteristicas = document.getElementById("caracteristicas");
const textoCaracteristicas = document.getElementById("texto-carac");
const conocerMas = document.getElementById("conocer-mas");
const infoAdicional = document.getElementById("informacion-adicional");
const youtube = document.getElementById("youtube");
const facebook = document.getElementById("facebook");
const twitter = document.getElementById("twitter");
const linkedin = document.getElementById("linkedin");
const instagram = document.getElementById("instagram");
const tiktok = document.getElementById("tiktok");
const body = document.getElementById("body");
const contenedor = document.getElementById("contenedor");

function masInfo() {
  // var parrafo = document.createElement("p");
  // parrafo.innerHTML = "Añadiendo info dinámicamente";
  // infoAdicional.appendChild(parrafo);
  if (infoAdicional.childElementCount == 0) {
    var ul = document.createElement("ul");
    var carac1 = document.createElement("li");
    var carac2 = document.createElement("li");
    var carac3 = document.createElement("li");
    var carac4 = document.createElement("li");
    var carac5 = document.createElement("li");
    carac1.innerHTML =
      "La batería del smartwatch tiene una autonomía de 48 horas y su tiempo de recarga es de 2 horas";
    carac2.innerHTML =
      "Puede conectarse a otros dispositivos mediante Bluetooth y Wi-Fi";
    carac3.innerHTML =
      "Puede conectarse a infinidad de aplicaciones como WhatsApp o Spotify";
    carac4.innerHTML =
      "Gracias a estar conectado al teléfono, te permite llamar a urgencias pulsando un único botón";
    carac5.innerHTML =
      "Mide el ritmo cardíaco, calorías quemada, pasos dados y mucho más";
    ul.appendChild(carac1);
    ul.appendChild(carac2);
    ul.appendChild(carac3);
    ul.appendChild(carac4);
    ul.appendChild(carac5);
    infoAdicional.appendChild(ul);
  }
}

function letraNormal() {
  inicio.style.setProperty("--letra-inicio", "5vw");
  navbar.style.setProperty("--letra-navbar", "2.5vw");
  ajustesAccesibilidad.style.setProperty("--letra-ajus-acces", "1.6vw");
  caracteristicas.style.setProperty("--letra-tit-carac", "4vw");
  textoCaracteristicas.style.setProperty("--letra-p-carac", "2.3vw");
  conocerMas.style.setProperty("--letra-boton-conocer-mas", "2vw");
  infoAdicional.style.setProperty("--letra-info-adicional", "2.3vw");
  youtube.style.setProperty("--letra-iconos", "5vw");
  facebook.style.setProperty("--letra-iconos", "5vw");
  twitter.style.setProperty("--letra-iconos", "5vw");
  linkedin.style.setProperty("--letra-iconos", "5vw");
  instagram.style.setProperty("--letra-iconos", "5vw");
  tiktok.style.setProperty("--letra-iconos", "5vw");
}
function letraGrande() {
  inicio.style.setProperty("--letra-inicio", "7vw");
  navbar.style.setProperty("--letra-navbar", "4.5vw");
  ajustesAccesibilidad.style.setProperty("--letra-ajus-acces", "2.1vw");
  caracteristicas.style.setProperty("--letra-tit-carac", "6vw");
  textoCaracteristicas.style.setProperty("--letra-p-carac", "4.3vw");
  conocerMas.style.setProperty("--letra-boton-conocer-mas", "4vw");
  infoAdicional.style.setProperty("--letra-info-adicional", "4.3vw");
  youtube.style.setProperty("--letra-iconos", "7vw");
  facebook.style.setProperty("--letra-iconos", "7vw");
  twitter.style.setProperty("--letra-iconos", "7vw");
  linkedin.style.setProperty("--letra-iconos", "7vw");
  instagram.style.setProperty("--letra-iconos", "7vw");
  tiktok.style.setProperty("--letra-iconos", "7vw");
}
function letraMuyGrande() {
  inicio.style.setProperty("--letra-inicio", "9vw");
  navbar.style.setProperty("--letra-navbar", "6.5vw");
  ajustesAccesibilidad.style.setProperty("--letra-ajus-acces", "2.6vw");
  caracteristicas.style.setProperty("--letra-tit-carac", "8vw");
  textoCaracteristicas.style.setProperty("--letra-p-carac", "6.3vw");
  conocerMas.style.setProperty("--letra-boton-conocer-mas", "6vw");
  infoAdicional.style.setProperty("--letra-info-adicional", "6.3vw");
  youtube.style.setProperty("--letra-iconos", "9vw");
  facebook.style.setProperty("--letra-iconos", "9vw");
  twitter.style.setProperty("--letra-iconos", "9vw");
  linkedin.style.setProperty("--letra-iconos", "9vw");
  instagram.style.setProperty("--letra-iconos", "9vw");
  tiktok.style.setProperty("--letra-iconos", "9vw");
}

function esquemaPredeterminado() {
  body.style.setProperty("--bg-body", "#d70e17");
  inicio.style.setProperty("--bg-header-footer", "#ffc107");
  contacto.style.setProperty("--bg-header-footer", "#ffc107");
  navbar.style.setProperty("--bg-navbar", "#007bff");
  conocerMas.style.setProperty("--bg-header-footer", "#ffc107");
  contenedor.style.setProperty("--bg-container", "#e46828");
}
function esquemaClaro() {
  body.style.setProperty("--bg-body", "#d70e188f");
  inicio.style.setProperty("--bg-header-footer", "#ffdc73");
  contacto.style.setProperty("--bg-header-footer", "#ffdc73");
  navbar.style.setProperty("--bg-navbar", "#009dff");
  conocerMas.style.setProperty("--bg-header-footer", "#ffdc73");
  contenedor.style.setProperty("--bg-container", "#ef8752");
}
function esquemaOscuro() {
  body.style.setProperty("--bg-body", "#000000");
  inicio.style.setProperty("--bg-header-footer", "#a0a09e");
  contacto.style.setProperty("--bg-header-footer", "#a0a09e");
  navbar.style.setProperty("--bg-navbar", "#747474");
  conocerMas.style.setProperty("--bg-header-footer", "#a0a09e");
  contenedor.style.setProperty("--bg-container", "#565555");
}

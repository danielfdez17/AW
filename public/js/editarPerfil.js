"use strict";
const botonHabilitarEdicion = document.getElementById("habilitarEdicion");
const botonCerrarEdicion = document.getElementById("cerrarEdicion");
const inputNombre = document.getElementById("editarNombre");
const inputCorreo = document.getElementById("editarCorreo");
const inputContrasena = document.getElementById("editarContrasena");
const inputTelefono = document.getElementById("editarTelefono");

console.log(botonHabilitarEdicion)
console.log(botonCerrarEdicion)
console.log(inputNombre)
console.log(inputCorreo)
console.log(inputContrasena)
console.log(inputTelefono)

function habilitarEdicion() {
  inputNombre.disabled = false;
  inputCorreo.disabled = false;
  inputContrasena.disabled = false;
  inputTelefono.disabled = false;

  inputNombre.value = inputNombre.placeholder;
  inputCorreo.value = inputCorreo.placeholder;
  inputContrasena.value = "";
  inputTelefono.value = inputTelefono.placeholder;
}

function deshabilitarEdicion() {
  inputNombre.disabled = true;
  inputCorreo.disabled = true;
  inputContrasena.disabled = true;
  inputTelefono.disabled = true;

  inputNombre.value = "";
  inputCorreo.value = "";
  inputContrasena.value = "";
  inputTelefono.value = "";
}

botonHabilitarEdicion.addEventListener("click", habilitarEdicion)
botonCerrarEdicion.addEventListener("click", deshabilitarEdicion)
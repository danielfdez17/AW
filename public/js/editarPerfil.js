"use strict;"

$()
{
  $("#guardar").hide();
  $("#cancelarEdicion").hide();
}

$("#habilitarEdicion").on('click', () => 
{
  $("#editarFoto, #editarNombre, #editarCorreo, #editarContrasena, #editarTelefono, #editarFacultad").prop("disabled", false);
  
  $("#editarNombre").val($("#editarNombre").prop("placeholder"));
  $("#editarCorreo").val($("#editarCorreo").prop("placeholder"));
  $("#editarContrasena").val("");
  $("#editarTelefono").val($("#editarTelefono").prop("placeholder"));
  $("#editarTelefono").val($("#editarTelefono").prop("placeholder"));

  //Botones
  $("#guardar").show();
  $("#cancelarEdicion").show();
  $("#habilitarEdicion").hide();
  $("#cerrarEdicion").hide();
})


$("#cancelarEdicion, #cerrarEdicion").on('click', () => {
  $("#editarFoto, #editarNombre, #editarCorreo, #editarContrasena, #editarTelefono, #editarFacultad").prop("disabled", true);

  $("#editarNombre").val("");
  $("#editarCorreo").val("");
  $("#editarContrasena").val("");
  $("#editarTelefono").val("");
  
 //Botones
 $("#guardar").hide();
 $("#cancelarEdicion").hide();
 $("#habilitarEdicion").show();
 $("#cerrarEdicion").show();
})

$("#formEditarPerfil button[type=submit]").on("click", (event) => {
  event.preventDefault();
  
  // Definir una variable para rastrear si el formulario es válido
  let isValid = true;

  var archivo = $('#editarFoto')[0].files[0];

  const tipoArchivo = archivo.type;
  const tiposPermitidos = ['image/jpeg', 'image/png', 'image/jpg'];

  // Validar si el tipo de archivo es permitido
  if (!tiposPermitidos.includes(tipoArchivo)) {
    alert('Por favor, sube solo archivos JPG, JPEG o PNG.');
    isValid = false;
  }

  // Validación del campo de nombre
  if (/\d/.test($("#editarNombre").val())) {
    alert("El campo nombre no puede contener números");
    isValid = false;
  }

  // Validación del campo de teléfono
  if (!/^\d+$/.test($("#editarTelefono").val())) {
    alert("El campo teléfono solo puede contener números");
    isValid = false;
  }

  // Validación del correo
  const dominio = "ucm.es";  // Cambia 'ucm.es' por el dominio que necesites
  if ($("#editarCorreo").val().includes("@") && !$("#editarCorreo").val().endsWith(dominio)) {
    alert(`El correo debe terminar en @${dominio}`);
    isValid = false;
  }

  // Validación de la contraseña
  if ($("#editarContrasena").val().length < 4) {
    alert("La contraseña debe tener mínimo 4 caracteres");
    isValid = false;
  }

  // Enviar el formulario solo si todas las validaciones pasan
  if (isValid) {
    $("#formEditarPerfil").off("submit").submit();
  }
});
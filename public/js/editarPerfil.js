"use strict;";

// Se esconden los botones para guardar y cancelar los cambios hechos del perfil del usuario
$();
{
  $("#guardar").hide();
  $("#cancelarEdicion").hide();
}

// Habilita los campos para que el usuario pueda editar su perfil
$("#habilitarEdicion").on("click", () => {
  $(
    "#editarFoto, #editarNombre, #editarCorreo, #editarContrasena, #editarTelefono, #editarFacultad"
  ).prop("disabled", false);

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
});

// Deshabilita los campos para que el usuario no pueda actualizar su perfil
$("#cancelarEdicion, #cerrarEdicion").on("click", () => {
  $(
    "#editarFoto, #editarNombre, #editarCorreo, #editarContrasena, #editarTelefono, #editarFacultad"
  ).prop("disabled", true);

  $("#editarNombre").val("");
  $("#editarCorreo").val("");
  $("#editarContrasena").val("");
  $("#editarTelefono").val("");

  //Botones
  $("#guardar").hide();
  $("#cancelarEdicion").hide();
  $("#habilitarEdicion").show();
  $("#cerrarEdicion").show();
});

// Muestra qué botón está activo
$("#Perfil, #Gestion").on("click", function () {
  // Remover la clase "active" de ambos botones
  $("#Perfil, #Gestion").removeClass("bg-primary");

  // Añadir la clase "active" al botón clicado
  $(this).addClass("bg-primary");
});

// Comprueba los campos antes de enviarlo al servidor
$("#formEditarPerfil").on("submit", (event) => {
  event.preventDefault();

  var archivo = $("#editarFoto")[0].files[0];

  const regex = /\b(select|insert|delete|drop|update)\b/i;
  const tipoArchivo = archivo ? archivo.type : null;
  const tiposPermitidos = ["image/jpeg", "image/png", "image/jpg"];

  const validaciones = [
    {
      condition: archivo && !tiposPermitidos.includes(tipoArchivo),
      message: "Por favor, sube solo archivos JPG, JPEG o PNG.",
    },
    {
      condition: archivo && (archivo.size >= 64000),
      message: "Por favor, sube solo imagenes menores de 64KB.",
    },
    {
      condition: /\d/.test($("#editarNombre").val()),
      message: "El campo nombre no puede contener números.",
    },
    {
      condition: regex.test($("#editarNombre").val()),
      message: "Intento de inyección SQL en el campo nombre.",
    },
    {
      condition: !/^\d+$/.test($("#editarTelefono").val()),
      message: "El campo teléfono solo puede contener números.",
    },
    {
      condition: regex.test($("#editarTelefono").val()),
      message: "Intento de inyección SQL en el campo telefono.",
    },
    {
      condition:
        $("#editarCorreo").val().includes("@") &&
        !$("#editarCorreo").val().endsWith("ucm.es"),
      message: `El correo debe terminar en @ucm.es`,
    },
    {
      condition: regex.test($("#editarCorreo").val()),
      message: "Intento de inyección SQL en el campo correo.",
    },
    {
      condition: $("#editarContrasena").val().length < 4,
      message: "La contraseña debe tener mínimo 4 caracteres.",
    },
    {
      condition: regex.test($("#editarContrasena").val()),
      message: "Intento de inyección SQL en el campo contrasena.",
    },
  ];

  // Recorre todas las validaciones
  for (let validacion of validaciones) {
    if (validacion.condition) {
      $("#errorFuncionamiento .toast-body").text(validacion.message);
      $("#errorFuncionamiento").toast("show");
      return;
    }
  }

  var formData = new FormData($("#formEditarPerfil").get(0));

  $.ajax({
    url: "/editarPerfil",
    type: "POST",
    data: formData,
    processData: false,
    contentType: false,

    success: function (response) {
      // Mostrar mensaje de éxito o error

      let rol = response.rol == "asistente" ? "asistentes" : "organizadores";

      $.get(`/${rol}`, function (data) {
        console.log(data);

        const parser = new DOMParser();
        const doc = parser.parseFromString(data, "text/html");
        const perfilcontent = doc.querySelector(".perfil").innerHTML;
        const pefilHeadercontent = doc.querySelector("#perfilHeader").innerHTML;
        $(".perfil").html(perfilcontent);
        $("#perfilHeader").html(pefilHeadercontent);
      });

      $.get("/toasts", function (data) {
        $("#contenedor-toasts").append(data);
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

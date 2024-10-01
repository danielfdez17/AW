const nombre = document.getElementById("nombre");
const primerApellido = document.getElementById("primer_apellido");
const segundoApellido = document.getElementById("segundo_apellido");
const direccion = document.getElementById("direccion");
const email = document.getElementById("email");
const contrasenya = document.getElementById("contrasenya");
const buttonComenzarDeNuevo = document.getElementById("comenzar_de_nuevo");
const buttonEnviar = document.getElementById("enviar_correo");

buttonComenzarDeNuevo.addEventListener("click", () => {
  nombre.value = "";
  primerApellido.value = "";
  segundoApellido.value = "";
  direccion.value = "";
  email.value = "";
  contrasenya.value = "";
  alert("Formulario reiniciado");
});

buttonEnviar.addEventListener("click", () => {
  if (
    nombre.value === "" ||
    primerApellido.value === "" ||
    segundoApellido.value === "" ||
    direccion.value === "" ||
    email.value === "" ||
    contrasenya.value === ""
  ) {
    alert("Por favor, rellena todos los campos marcados con asterisco.");
  } else {
    alert("Formulario enviado");
    // window.location.href = "form_data.html";
    // document.getElementById("valor_nombre").innerHTML = nombre.value;
    // document.getElementById("valor_primer_apellido").innerHTML =
    //   primerApellido.value;
    // document.getElementById("valor_segundo_apellido").innerHTML =
    //   segundoApellido.value;
    // document.getElementById("valor_direccion").innerHTML = direccion.value;
    // document.getElementById("valor_email").innerHTML = email.value;
  }
});

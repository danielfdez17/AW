const DAO = require("./dao.js");

const daoMensajeria = new DAO("localhost", "root", "", "mensajeria");

let usuario1 = {
  nombre: "Paco",
  correo: "pagojonudo@gmail.com",
  telefono: "123456789",
};

let usuario2 = {
  nombre: "Eustakia",
  correo: "eusta@hotmail.es",
  telefono: "987654321",
};

function callbackInsertarUsuario(err) {
  if (err) {
    console.log(`ERROR EN LA INSERCIÓN DE USUARIO: ${err.message}`);
  } else {
    console.log("USUARIO INSERTADO CORRECTAMENTE");
  }
}
function callbackEnviarMensaje(err) {
  if (err) {
    console.log(`ERROR AL ENVIAR EL MENSAJE: ${err.message}`);
  } else {
    console.log("MENSAJE ENVIADO CORRECTAMENTE");
  }
}
function callbackBandejaEntrada(err, mensajes) {
  if (err) {
    console.log(
      `ERROR AL ACCEDER A LA BANDEJA DE ENTRADA DE UN USUARIO: ${err.message}`
    );
  } else {
    console.log("BANDEJA DE ENTRADA LEÍDA CORRECTAMENTE");
    mensajes.forEach((mensaje) => {
      console.log(`Nombre: ${mensaje.nombre}`);
      console.log(`Mensaje: ${mensaje.mensaje}`);
      console.log(`Hora: ${mensaje.hora}`);
    });
  }
}
function callbackBuscarUsuario(err, usuarios) {
  if (err) {
    console.log(`ERROR AL BUSCAR USUARIOS: ${err.message}`);
  } else {
    console.log("USUARIOS BUSCADOS CORRECTAMENTE");
    usuarios.forEach((usuario) => {
      console.log(`ID: ${usuario.id}`);
      console.log(`Nombre: ${usuario.nombre}`);
      console.log(`Correo: ${usuario.correo}`);
      console.log(`Teléfono: ${usuario.telefono}`);
    });
  }
}
function callbackTerminarConexion(err) {
  if (err) {
    console.log(`ERROR AL CERRAR EL POOL DE CONEXIONES: ${err.message}`);
  } else {
    console.log("POOL DE CONEXIONES CERRADO CORRECTAMENTE");
  }
}

// daoMensajeria.insertarUsuario(usuario1, callbackInsertarUsuario);
// daoMensajeria.insertarUsuario(usuario2, callbackInsertarUsuario);
// usuario1.id = 12;
// usuario2.id = 13;
// daoMensajeria.enviarMensaje(
//   usuario1,
//   usuario2,
//   "Hola, como estas",
//   callbackEnviarMensaje
// );
// daoMensajeria.bandejaEntrada(usuario1, callbackBandejaEntrada);
// daoMensajeria.bandejaEntrada(usuario2, callbackBandejaEntrada);
// daoMensajeria.buscarUsuario("a", callbackBuscarUsuario);
// daoMensajeria.buscarUsuario("eus", callbackBuscarUsuario);
daoMensajeria.terminarConexion(callbackTerminarConexion);

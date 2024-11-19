"use strinct";
let moment = require("moment");
moment.locale("es");
let hoy = moment();
let comienzoCurso = moment(new Date("9,6,2021"));
console.log("--------   Formateo Fecha   --------");
console.log("hoy: " + hoy);
console.log("Comienzo del curso 2021-2022: "+ comienzoCurso);
console.log("hoy: " + hoy.format("DD - MM - YYYY"));
console.log("Comienzo del curso 2021-2022: "+ comienzoCurso.format("LLLL"));
console.log ("ordinal: " + hoy.format("Do"));
console.log("Llevamos trabajando en AW: "+ comienzoCurso.fromNow() + ", ánimo, ya queda poco...!!!");

console.log("--------   Formateo Hora   --------");
let m = moment(new Date("2021/11/13 14:04:03")); 
console.log(m.format('h:mma')); // 2:04pm

console.log("--------   Duraciones  ---------");

const m1 = moment(new Date('06-09-2021 2:04:03'));
const m2 = m1.clone().add(59, 'seconds');

const duracion = moment.duration(m1.diff(m2));
console.log ("Duración: " + duracion + " = " + duracion.asMilliseconds()); // 59000  =  59000
console.log(duracion.seconds() + "    "  + duracion.minutes()); // 59    0 

console.log(duracion.humanize());
console.log(duracion.humanize(true));
duracion.humanize(); // 'un minuto'
duracion.humanize(true); // 'hace un minute'

console.log("Duración humanizada: " + moment.duration(m2.diff(m1)).humanize(true)); // 'en un minuto'
let fs = require("fs");
let flujoEntrada = fs.createReadStream('public/resources/poema.txt', 'utf8');
flujoEntrada.on("readable", () => {
    // Llamar a flujoEntrada.read() para obtener la información.
    let fragmento = flujoEntrada.read();
    if (fragmento !== null) {
        console.log(`Leído fragmento de ${fragmento.length} bytes`);
    } else {
    console.log("Ya no hay más fragmentos");
    }
});

console.log("-----------  flujo de salida  -------------");
let flujoSalida = fs.createWriteStream("public/resources/nuevoFichero.txt", {encoding: "utf-8"});
for (let i = 0; i < 10; i++) {
    flujoSalida.write(i + "\n");
}
flujoSalida.end("Fin!\n");
console.log('Se ha creado un nuevo fichero.');

console.log("-----------  encadenamiento de flujos  -------------");
flujoEntrada = fs.createReadStream("public/resources/poema.txt");
flujoSalida = fs.createWriteStream("public/resources/poemaCopia.txt");
flujoEntrada.pipe(flujoSalida);
console.log("Proceso de encadenamietno de flujos finalizado");

console.log("-----------  compresión de ficheros  -------------");
let zlib = require("zlib");
flujoEntrada = fs.createReadStream("public/resources/tutorial.pdf");
flujoSalida = fs.createWriteStream("public/resources/tutorial.pdf.gz");
let flujoCompresion = zlib.createGzip();
flujoEntrada.pipe(flujoCompresion);
flujoCompresion.pipe(flujoSalida);
console.log("Proceso de compresión finalizado");

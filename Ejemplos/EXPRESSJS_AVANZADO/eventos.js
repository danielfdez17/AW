let events = require("events");
let emisor = new events.EventEmitter();
emisor.on("incrementado", valorNuevo => {
    console.log('Se ha incrementado el contador:' + valorNuevo);
    });
emisor.emit("incrementado", 14);

class Contador extends events.EventEmitter {
    constructor() {
        super();
        this.valor = 0;
    }
    incrementar() {
        this.valor++;
        this.emit("incrementado", this.valor);
    }
 
}

let c = new Contador();
process.on('exit', exitCode => {
    // Liberar ficheros, volcar logs,
    // cerrar conexiones a BDs, etc.
    console.log('Terminada la ejecución de este fichero js.');
    });

c.on("incrementado", val => {
    console.log(`Suscriptor 1: ${val}`);
});
c.on("incrementado", val => {
    console.log(`Suscriptor 2: ${val}`);
});
c.incrementar();
c.incrementar();
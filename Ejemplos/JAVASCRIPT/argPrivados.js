class Persona {
    #edad;
    #nombre;
    constructor(nombre, edad) {
        this.#nombre = nombre;
        this.#edad = edad;
    }
    get edad() {
        return this.#edad;
    }
    set edad(newEdad) {
        if (newEdad >= 0) {
            this.#edad = newEdad;
        }
    }
    get nombre() {
        return this.#nombre;
    }
}


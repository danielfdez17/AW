CREATE TABLE usuarios (
    id INT(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    correo VARCHAR(100) NOT NULL,
    telefono VARCHAR(9) NOT NULL
)

CREATE TABLE mensajes (
    id INT(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
    idOrigen INT(11) NOT NULL,
    idDestino INT(11) NOT NULL,
    mensaje TEXT NOT NULL,
    hora TIMESTAMP NOT NULL,
    leido INT(1) NOT NULL,
    FOREIGN KEY (idOrigen) REFERENCES usuarios(id),
    FOREIGN KEY (idDestino) REFERENCES usuarios(id)
)
CREATE DATABASE IF NOT EXISTS articulosdb;

CREATE TABLE articulos (
    id INT(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
    titulo VARCHAR(300) NOT NULL,
    fecha DATE NOT NULL
);

CREATE TABLE palabrasclave (
    idArticulo INT(11) NOT NULL,
    palabraClave VARCHAR(100) NOT NULL,
    FOREIGN KEY (idArticulo) REFERENCES articulos(id)
);
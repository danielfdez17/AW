create database AW_24;

create table facultades(
    id int primary key auto_increment,
    nombre varchar(100) not null
);

insert into facultades (nombre) values ("Facultad de Informática");
insert into facultades (nombre) values ("Facultad de Derecho");
insert into facultades (nombre) values ("Facultad de Medicina");
insert into facultades (nombre) values ("Facultad de Ciencias de la Salud");
insert into facultades (nombre) values ("Facultad de Educación");
insert into facultades (nombre) values ("Facultad de Ciencias de la Educación");

create table usuarios(
    id int primary key auto_increment,
    nombre varchar(100) not null,
    correo varchar(100) not null,
    telefono int(9) not null,
    id_facultad int not null,
    rol varchar(20) not null,
    contrasena varchar(50) not null,
    foreign key (id_facultad) references facultades(id)
);

insert into usuarios (nombre, correo, telefono, id_facultad, rol, contrasena) values ("daniel", "danief17@ucm.es", 123456789, 1, "organizador", "1234");
insert into usuarios (nombre, correo, telefono, id_facultad, rol, contrasena) values ("Pedro", "pedro@ucm.es", 123456789, 3, "organizador", "1234");
insert into usuarios (nombre, correo, telefono, id_facultad, rol, contrasena) values ("Javier", "javier@ucm.es", 123456789, 1, "asistente", "1234");
insert into usuarios (nombre, correo, telefono, id_facultad, rol, contrasena) values ("Antonio", "antonio@ucm.es", 123456789, 2, "asistente", "1234");

create table eventos(
    id int primary key auto_increment,
    titulo varchar(100) not null,
    descripcion varchar(255) not null,
    fecha date not null default current_date,
    hora time not null default current_time,
    ubicacion varchar(100) not null,
    capacidad_maxima int not null,
    id_organizador int not null,
    tipo_evento varchar(100) not null,
    foreign key (id_organizador) references usuarios(id)
);

insert into eventos (titulo, descripcion, fecha, hora, ubicacion, capacidad_maxima, id_organizador, tipo_evento) values ("Evento 1", "Descripción 1", "2023-06-20", "10:00:00", "Sala 1", 50, 1, "Conferencia");
insert into eventos (titulo, descripcion, fecha, hora, ubicacion, capacidad_maxima, id_organizador, tipo_evento) values ("Evento 2", "Descripción 2", "2023-06-21", "14:00:00", "Sala 2", 30, 2, "taller");
insert into eventos (titulo, descripcion, fecha, hora, ubicacion, capacidad_maxima, id_organizador, tipo_evento) values ("Evento 3", "Descripción 3", "2023-06-22", "18:00:00", "Sala 3", 20, 1, "seminario");

create table inscripciones(
    id_usuario int not null,
    id_evento int not null,
    estado varchar(20) not null,
    fecha_inscripcion date not null default current_date,
    primary key (id_usuario, id_evento),
    foreign key (id_usuario) references usuarios(id),
    foreign key (id_evento) references eventos(id)
);

insert into inscripciones (id_usuario, id_evento, estado) values (1, 1, "inscrito");
insert into inscripciones (id_usuario, id_evento, estado) values (2, 2, "inscrito");
insert into inscripciones (id_usuario, id_evento, estado) values (1, 2, "inscrito");
insert into inscripciones (id_usuario, id_evento, estado) values (2, 1, "inscrito");

create table accesibilidad(
    id_usuario int not null primary key,
    paleta_colores varchar(100) not null,
    tamano_texto varchar(100) not null,
    config_navegacion varchar(100) not null,
    foreign key (id_usuario) references usuarios(id)
);

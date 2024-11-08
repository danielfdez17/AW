create database AW_24;

create table facultades(
    id int primary key auto_increment,
    nombre varchar(100) not null
);

create table usuarios(
    id int primary key auto_increment,
    nombre varchar(100) not null,
    correo varchar(100) not null,
    telefono int(9) not null,
    id_facultad int not null,
    rol varchar(20) not null,
    constrasena varchar(50) not null,
    foreign key (id_facultad) references facultades(id)
);

create table eventos(
    id int primary key auto_increment,
    titulo varchar(100) not null,
    descripcion varchar(255) not null,
    fecha date not null default current_date,
    hora time not null default current_time,
    ubicacion varchar(100) not null,
    capacidad_maxima int not null,
    id_organizador int not null,
    foreign key (id_organizador) references usuarios(id)
);

create table inscripciones(
    id_usuario int not null,
    id_evento int not null,
    estado varchar(20) not null,
    fecha_inscripcion date not null default current_date,
    primary key (id_usuario, id_evento),
    foreign key (id_usuario) references usuarios(id),
    foreign key (id_evento) references eventos(id)
);

create table accesibilidad(
    id_usuario int not null primary key,
    paleta_colores varchar(100) not null,
    tamano_texto varchar(100) not null,
    config_navegacion varchar(100) not null,
    foreign key (id_usuario) references usuarios(id)
);

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
    correo varchar(100) not null unique,
    telefono int(9) not null,
    id_facultad int not null,
    rol varchar(20) not null,
    contrasena varchar(50) not null,
    recordatorio varchar(50) not null default "60",
    foto BLOB,
    foreign key (id_facultad) references facultades(id)
);

insert into usuarios (nombre, correo, telefono, id_facultad, rol, contrasena) values ("daniel", "danief17@ucm.es", 123456789, 1, "organizador", "1234");
insert into usuarios (nombre, correo, telefono, id_facultad, rol, contrasena) values ("jose", "josetort@ucm.es", 123456789, 3, "organizador", "1234");
insert into usuarios (nombre, correo, telefono, id_facultad, rol, contrasena) values ("Javier", "javier@ucm.es", 123456789, 1, "asistente", "1234");
insert into usuarios (nombre, correo, telefono, id_facultad, rol, contrasena) values ("Antonio", "antonio@ucm.es", 123456789, 2, "asistente", "1234");
insert into usuarios (nombre, correo, telefono, id_facultad, rol, contrasena) values ("Pedro", "pedro@ucm.es", 123456789, 3, "asistente", "1234");
insert into usuarios (nombre, correo, telefono, id_facultad, rol, contrasena) values ("Pablo", "pablo@ucm.es", 123456789, 4, "asistente", "1234");
insert into usuarios (nombre, correo, telefono, id_facultad, rol, contrasena) values ("Sergio", "sergio@ucm.es", 123456789, 5, "asistente", "1234");
insert into usuarios (nombre, correo, telefono, id_facultad, rol, contrasena) values ("Miguel", "miguel@ucm.es", 123456789, 6, "asistente", "1234");
insert into usuarios (nombre, correo, telefono, id_facultad, rol, contrasena) values ("Manolo", "manolo@ucm.es", 123456789, 1, "asistente", "1234");
insert into usuarios (nombre, correo, telefono, id_facultad, rol, contrasena) values ("Ricardo", "ricardo@ucm.es", 123456789, 2, "asistente", "1234");
insert into usuarios (nombre, correo, telefono, id_facultad, rol, contrasena) values ("Rafael", "rafael@ucm.es", 123456789, 3, "asistente", "1234");
insert into usuarios (nombre, correo, telefono, id_facultad, rol, contrasena) values ("Luis", "luis@ucm.es", 123456789, 4, "asistente", "1234");
insert into usuarios (nombre, correo, telefono, id_facultad, rol, contrasena) values ("Eduardo", "eduardo@ucm.es", 123456789, 5, "asistente", "1234");
insert into usuarios (nombre, correo, telefono, id_facultad, rol, contrasena) values ("Diego", "diego@ucm.es", 123456789, 6, "asistente", "1234");

create table eventos(
    id int primary key auto_increment,
    titulo varchar(100) not null,
    descripcion varchar(255) not null,
    fecha varchar(10) not null,
    hora varchar(5) not null,
    ubicacion varchar(100) not null,
    capacidad_actual int not null default 0,
    capacidad_maxima int not null,
    id_organizador int not null,
    tipo_evento varchar(20) not null,
    duracion varchar(10) not null default "01:00",
    activo BOOLEAN DEFAULT TRUE,
    terminado boolean default false,
    foreign key (id_organizador) references usuarios(id)
);

insert into eventos (titulo, descripcion, fecha, hora, ubicacion, capacidad_maxima, id_organizador, tipo_evento) values ("Evento 1", "Descripción 1", "2024-12-02", "10:00:00", "Sala 1", 50, 1, "Conferencia");
insert into eventos (titulo, descripcion, fecha, hora, ubicacion, capacidad_maxima, id_organizador, tipo_evento) values ("Evento 2", "Descripción 2", "2024-12-03", "14:00:00", "Sala 2", 30, 2, "Taller");
insert into eventos (titulo, descripcion, fecha, hora, ubicacion, capacidad_maxima, id_organizador, tipo_evento) values ("Evento 3", "Descripción 3", "2024-12-04", "18:00:00", "Sala 3", 20, 1, "Seminario");
insert into eventos (titulo, descripcion, fecha, hora, ubicacion, capacidad_maxima, id_organizador, tipo_evento) values ("Evento 4", "Descripción 4", "2024-12-05", "09:00:00", "Sala 4", 40, 2, "Conferencia");
insert into eventos (titulo, descripcion, fecha, hora, ubicacion, capacidad_maxima, id_organizador, tipo_evento) values ("Evento 5", "Descripción 5", "2024-12-06", "13:00:00", "Sala 5", 25, 1, "Taller");
insert into eventos (titulo, descripcion, fecha, hora, ubicacion, capacidad_maxima, id_organizador, tipo_evento) values ("Evento 6", "Descripción 6", "2024-12-07", "17:00:00", "Sala 6", 15, 2, "Seminario");
insert into eventos (titulo, descripcion, fecha, hora, ubicacion, capacidad_maxima, id_organizador, tipo_evento) values ("Evento 7", "Descripción 7", "2024-12-08", "08:00:00", "Sala 7", 35, 1, "Conferencia");
insert into eventos (titulo, descripcion, fecha, hora, ubicacion, capacidad_maxima, id_organizador, tipo_evento) values ("Evento 8", "Descripción 8", "2024-12-09", "12:00:00", "Sala 8", 20, 2, "Taller");
insert into eventos (titulo, descripcion, fecha, hora, ubicacion, capacidad_maxima, id_organizador, tipo_evento) values ("Evento 9", "Descripción 9", "2024-12-10", "16:00:00", "Sala 9", 10, 1, "Seminario");
insert into eventos (titulo, descripcion, fecha, hora, ubicacion, capacidad_maxima, id_organizador, tipo_evento) values ("Evento 10", "Descripción 10", "2024-12-11", "07:00:00", "Sala 10", 30, 2, "Conferencia");
insert into eventos (titulo, descripcion, fecha, hora, ubicacion, capacidad_maxima, id_organizador, tipo_evento) values ("Evento 11", "Descripción 11", "2024-12-12", "11:00:00", "Sala 11", 15, 1, "Taller");
insert into eventos (titulo, descripcion, fecha, hora, ubicacion, capacidad_maxima, id_organizador, tipo_evento) values ("Evento 12", "Descripción 12", "2024-12-13", "15:00:00", "Sala 12", 40, 2, "Seminario");


create table inscripciones(
    id_usuario int not null,
    id_evento int not null,
    estado varchar(20) not null,
    fecha_inscripcion date not null default current_date,
    activo BOOLEAN DEFAULT TRUE,
    primary key (id_usuario, id_evento),
    foreign key (id_usuario) references usuarios(id),
    foreign key (id_evento) references eventos(id)
);


insert into inscripciones (id_usuario, id_evento, estado) values (3, 1, "inscrito");
insert into inscripciones (id_usuario, id_evento, estado) values (3, 2, "inscrito");
insert into inscripciones (id_usuario, id_evento, estado) values (4, 2, "inscrito");
insert into inscripciones (id_usuario, id_evento, estado) values (4, 1, "inscrito");

CREATE TABLE notificaciones (
  id INT PRIMARY KEY AUTO_INCREMENT,
  id_usuario INT NOT NULL,
  mensaje TEXT,
  fecha TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  tipo VARCHAR(50),
  activo BOOLEAN DEFAULT TRUE,
  FOREIGN KEY (id_usuario) REFERENCES usuarios(id)
);

create table comentarioYValoraciones(
    id_usuario int not null,
    id_evento int not null,
    comentario text not null,
    fecha_comentario date not null default current_date,
    valoracion int not null,
    primary key (id_usuario, id_evento),
    foreign key (id_usuario) references usuarios(id),
    foreign key (id_evento) references eventos(id)
)

create table accesibilidad(
    id_usuario int not null primary key,
    paleta_colores varchar(100) not null default "predeterminado",
    tamano_texto varchar(100) not null default "normal",
    config_navegacion varchar(100) not null default "no",
    foreign key (id_usuario) references usuarios(id)
);

create table listaNegra(
    id int primary key auto_increment,
    ip varchar(100) not null
);


/*Triggers*/


--Triger notificación cambio de estado

--Añadimos limitadores para XAMPP
DELIMITER $$

-- Cambio de estado Lista de espera a Inscrito
CREATE TRIGGER EsperaAInscrito
AFTER UPDATE ON inscripciones
FOR EACH ROW
BEGIN
    DECLARE nombre_evento VARCHAR(255);
    DECLARE fecha_evento DATE;
    
    -- Verificar si el estado realmente cambió
    IF OLD.estado <> NEW.estado THEN
        -- Obtener los datos del evento
        SELECT titulo, fecha INTO nombre_evento, fecha_evento
        FROM eventos
        WHERE id = NEW.id_evento;

        -- Insertar la notificación
        INSERT INTO notificaciones (id_usuario, mensaje, fecha, tipo)
        VALUES (NEW.id_usuario, CONCAT('Has sido inscrito en el evento: ', nombre_evento, ' para el ', fecha_evento), DATE_FORMAT(NOW(), '%Y-%m-%d %H:%i:%s'), 'Inscripcion');
    END IF;
END $$

DELIMITER ;


DELIMITER $$

-- Anular inscripción
CREATE TRIGGER EliminarInscripcion
AFTER UPDATE ON inscripciones
FOR EACH ROW
BEGIN
    DECLARE nombre_evento VARCHAR(255);
    DECLARE fecha_evento DATE;
    
    -- Verificar si el estado realmente cambió
    IF OLD.activo <> NEW.activo THEN
        -- Obtener los datos del evento
        SELECT titulo, fecha INTO nombre_evento, fecha_evento
        FROM eventos
        WHERE id = NEW.id_evento;

        -- Insertar la notificación
        INSERT INTO notificaciones (id_usuario, mensaje, fecha, tipo)
        VALUES (NEW.id_usuario, CONCAT('Se ha anulado la inscripcion del evento: ', nombre_evento, ' para el ', fecha_evento), DATE_FORMAT(NOW(), '%Y-%m-%d %H:%i:%s'), 'Actividad');
    END IF;
END $$

DELIMITER ;


DELIMITER $$

-- Nueva inscripción
CREATE TRIGGER NuevaInscripcion
AFTER INSERT ON inscripciones
FOR EACH ROW
BEGIN
    DECLARE nombre_evento VARCHAR(255);
    DECLARE fecha_evento DATE;
    
    -- Obtener los datos del evento
    SELECT titulo, fecha INTO nombre_evento, fecha_evento
    FROM eventos
    WHERE id = NEW.id_evento;

    -- Insertar la notificación
    INSERT INTO notificaciones (id_usuario, mensaje, fecha, tipo)
    VALUES (NEW.id_usuario, CONCAT('Se ha realizado con éxito la inscripcion del evento: ', nombre_evento, ' para el ', fecha_evento), DATE_FORMAT(NOW(), '%Y-%m-%d %H:%i:%s'), 'Actividad');

END $$

DELIMITER ;


SET GLOBAL event_scheduler = ON;

CREATE OR REPLACE EVENT comprobar_recordatorio_evento
ON SCHEDULE EVERY 5 MINUTE
DO
    CALL verificar_recordatorios();

DELIMITER $$

CREATE OR REPLACE PROCEDURE verificar_recordatorios()
BEGIN
    DECLARE v_id_usuario INT;
    DECLARE v_recordatorio INT;

    DECLARE v_id_evento INT;

    DECLARE v_fecha_evento DATE;
    DECLARE v_hora_evento TIME;

    -- Inicializar la variable done
    DECLARE done BOOLEAN DEFAULT FALSE;

    -- Declaración de cursores
    DECLARE cursor_usuarios CURSOR FOR
        SELECT id, recordatorio FROM usuarios;

    DECLARE cursor_eventosxusuario CURSOR FOR
        SELECT id_evento FROM inscripciones WHERE id_usuario = v_id_usuario;

    -- Declaración de manejador para fin de cursores
    DECLARE CONTINUE HANDLER FOR NOT FOUND SET done = TRUE;

    -- Abrir el cursor de usuarios
    OPEN cursor_usuarios;
    
    -- Loop para iterar sobre los usuarios
    usuario_loop: LOOP
        FETCH cursor_usuarios INTO v_id_usuario, v_recordatorio;
        IF done THEN
	    SET done = FALSE;
            LEAVE usuario_loop; -- Salir si ya no hay más usuarios
        END IF;

        -- Abrir el cursor de eventos para el usuario actual
        OPEN cursor_eventosxusuario;

        -- Loop para iterar sobre los eventos de cada usuario
        evento_loop: LOOP
            FETCH cursor_eventosxusuario INTO v_id_evento;

            IF done THEN
		SET done = FALSE;
                LEAVE evento_loop; -- Salir si ya no hay más eventos
            END IF;

            -- Obtener la fecha y hora del evento
            SELECT fecha, hora INTO v_fecha_evento, v_hora_evento
            FROM eventos
            WHERE id = v_id_evento;

            
            -- Verificar si el evento está dentro del tiempo de recordatorio
            IF v_fecha_evento = CURDATE() AND TIMESTAMPDIFF(MINUTE, CURTIME(), v_hora_evento) > 0 AND TIMESTAMPDIFF(MINUTE, CURTIME(), v_hora_evento) <= v_recordatorio THEN

                  INSERT INTO log_debug (usuario_id, evento_id, diferencia_minutos, recordatorio)
                VALUES (v_id_usuario, v_id_evento, TIMESTAMPDIFF(MINUTE, CURTIME(), v_hora_evento), v_recordatorio);


                -- Insertar notificación
                INSERT INTO notificaciones (id_usuario, mensaje, fecha, tipo)
                VALUES (v_id_usuario, 
                        CONCAT('Le recordamos que tiene un evento: ', (SELECT titulo FROM eventos WHERE id = v_id_evento), ' para el ', v_fecha_evento),
                        DATE_FORMAT(NOW(), '%Y-%m-%d %H:%i:%s'), 'Recordatorio');
            END IF;

        END LOOP evento_loop;

        CLOSE cursor_eventosxusuario;

    END LOOP usuario_loop;

    CLOSE cursor_usuarios;

END $$

DELIMITER ;

DELIMITER $$

CREATE TRIGGER InsertAccesibilidad
AFTER INSERT ON usuarios
FOR EACH ROW
BEGIN

    INSERT INTO accesibilidad (id_usuario) VALUES (NEW.id);
    
END $$

DELIMITER ;
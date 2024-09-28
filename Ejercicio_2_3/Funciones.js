//Funcion de borrar todo
function resetFormulario() {

    //Recogemos todos los formularios que existen en el html
    const forms = document.querySelectorAll('form');

    //Aplicamos una funcion for each, que va reseteando cada uno de los formularios encontrados
    forms.forEach(form => form.reset());
}

//Recopilar datos
function mostrarResultados() {

    //Dejar de mostrar formulario y pasar a los resultados
    document.getElementById("formulario").style.display = 'none';
    document.getElementById("resultados").style.display = 'flex';

    //Resultados relacionados (Datos personales)
    document.getElementById('nombreResultado').textContent = document.getElementsByName('nombre')[0].value;
    document.getElementById('primer_apellidoResultado').textContent = document.getElementsByName('primer_apellido')[0].value;
    document.getElementById('segundo_apellidoResultado').textContent = document.getElementsByName('segundo_apellido')[0].value;
    document.getElementById('direccionResultado').textContent = document.getElementsByName('direccion')[0].value;
    document.getElementById('emailResultado').textContent = document.getElementsByName('e_mail')[0].value;
    document.getElementById('contrasenaResultado').textContent = document.getElementsByName('contrasena')[0].value;

    var sexo = document.querySelector('input[name="sexo"]:checked');
    document.getElementById('sexoResultado').textContent = sexo ? sexo.value : 'No se ha registrado sexo';

    //Resultados relacionados (Nivel de estudios e intereses)
    document.getElementById('nivelResultado').textContent = document.getElementsByName('estudios')[0].value;
    var datos = document.querySelectorAll('.container-checkbox input[name="interes"]:checked');

    var salida_intereses = '';
    if(!datos)
        salida_intereses = "No se han registrado intereses";
    else
    {
        datos.forEach(dato =>
        {
            salida_intereses += dato.value + ' ';        
        });
    }
    document.getElementById('temasResultado').textContent = salida_intereses;

    //Resultados relacionados (Datos sobre la revista)
    document.getElementById('frecuenciaResultado').textContent = document.getElementsByName('frecuencia')[0].value;
    var archivo = document.getElementsByName('archivo')[0];

    document.getElementById('archivoResultado').textContent = archivo.files[0] ? archivo.files[0].name : 'No se ha especificado archivo';
    document.getElementById('comentarioResultado').textContent = document.getElementsByName('comentario')[0].value;
}


//Esperamos a que cargen todo el documento
document.addEventListener('DOMContentLoaded', function () {

    //Busca todos los container-checkbox label
    document.querySelectorAll('.container-checkbox label').forEach(label => {

        //Añade un listener para que al pulsar cualquier letra salte
        label.addEventListener('keydown', function(event) {

            //Si la letra pulsada es 'Enter' o 'Espacio' entra al if
            if (event.key === 'Enter' || event.key === ' ') {
                //Simulamos un click sobre el elemento
                label.click()

                //Evitamos que al hacer espacio la pagina avance, que sería su comportamiento predeterminado
                event.preventDefault();
            }
        });
    });
});
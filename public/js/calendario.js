$()
{
    filtradoFecha();
    $('#inputCalendario').hide();

}

// Función para actualizar la fecha
function updateDate(increment) {
    let fecha = $('#fecha').text(); // Obtener el texto de la fecha
    let fechaModificada = new Date(fecha.split('/').reverse().join('-')); // Convertir la fecha al formato adecuado para Date (YYYY-MM-DD)
    fechaModificada.setDate(fechaModificada.getDate() + increment); // Modificar la fecha (sumar o restar un día)
    $('#fecha').text(fechaModificada.toLocaleDateString('es-ES')); // Actualizar el texto con la fecha modificada en formato España
}

//Animacion hacia atrás
$('#previous').on('click', () => {
    // Cambiar de diapositiva con animación

    const carouselInner = document.querySelector('.carousel-inner');
    carouselInner.style.transition = 'transform 0.3s ease';
    carouselInner.style.transform = 'translateX(100%)';

    setTimeout(() => {
        carouselInner.style.transition = 'none';
        carouselInner.style.transform = 'translateX(-100%)';

        setTimeout(() => {
            carouselInner.style.transition = 'transform 0.3s ease';
            carouselInner.style.transform = 'translateX(0%)';
            updateDate(-1);
            filtradoFecha();

        }, 10);
    }, 300);
    
});

//Animacion hacia adelante
$('#next').on('click', () => {
const carouselInner = document.querySelector('.carousel-inner');
carouselInner.style.transition = 'transform 0.3s ease';
carouselInner.style.transform = 'translateX(-100%)';

setTimeout(() => {
    carouselInner.style.transition = 'none';
    carouselInner.style.transform = 'translateX(+100%)';

    setTimeout(() => {
        carouselInner.style.transition = 'transform 0.3s ease';
        carouselInner.style.transform = 'translateX(0%)';
        updateDate(1);
        filtradoFecha();

    }, 10);
}, 300);
});

$('#abrirCalendario').on('click', () =>
{
    $('#inputCalendario').show();
    $('#inputCalendario').focus();
})

// Escuchar cuando el usuario seleccione una fecha
$('#inputCalendario').on('change', (event) => {
    let fecha = event.target.value;
    fecha = fecha.split('-').reverse().join('/');
    $('#fecha').text(fecha);
    $('#inputCalendario').val("");
    $('#inputCalendario').hide();
    filtradoFecha();
});

function filtradoFecha()
{

    let fecha_actual = $('#fecha').text(); // Obtener el texto de la fecha
    fecha_actual = fecha_actual.split('/').reverse().join('-');
    let existe = false;
    $("input[name='fecha']").each((index) => {
        let fecha = $("input[name='fecha']")[index];
        let valor = fecha.placeholder;
        let id = fecha.id.replace("fecha", "");
        let cardEvento = $(`.evento${id}`); // Seleccionar la tarjeta asociada
        
        let valorFormateado = new Date(valor).toLocaleDateString('es-ES');

        let fecha_actualFormateado = new Date(fecha_actual).toLocaleDateString('es-ES');

        if (valorFormateado === fecha_actualFormateado) {
            existe = true;
            cardEvento.removeClass("d-none"); // Mostrar si coincide
        } else {
            cardEvento.addClass("d-none"); // Ocultar si no coincide
        }
        if(!existe)
            $("#noEventos").show();
        else
            $("#noEventos").hide();
    });
}
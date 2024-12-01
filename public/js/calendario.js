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
    }, 10);
}, 300);
});
"use strict";

function conocermas()
{
    let boton = document.getElementById("conocermas");
    boton.style.opacity = 0;

    //Animacion
    setTimeout(async () => {
        boton.style.display = "none"; // Oculta el botón después de 500ms
        let dinamico = document.getElementById("texto-dinamico");

        document.getElementById("imagen").style.transform = "translateY(100px)";
        dinamico.style.transform = "translateY(100px)";
        dinamico.innerText += '\n\nDesde controlar tu hogar inteligente hasta mejorar la productividad en el trabajo o los estudios, TechBoost es el compañero perfecto para quienes buscan optimizar su tiempo y experiencias. Con su diseño elegante y funcionalidades personalizables, se adapta a las necesidades específicas de cada usuario, revolucionando la conectividad y simplificando el acceso a la tecnología.';

        await setTimeout(() => {
            document.getElementById("imagen").style.transform = "translateY(0px)";
            dinamico.style.transform = "translateY(0px)";
        }, 500)
        
    }, 300); // Esperar 300ms para ocultar el botón
}

const inicio_degradado_claro = "rgb(255, 237, 241)";
const fin_degradado_claro = "rgb(207, 146, 238)";
const text_color_claro = "rgb(20, 20, 28)";

const inicio_degradado_oscuro = "rgb(0, 0, 0)";
const fin_degradado_oscuro = "rgb(231, 207, 243)";
const text_color_oscuro = "rgb(255, 237, 241)";

function ajustes_color(tipo_letra)
{
    const root = document.documentElement;
    if(tipo_letra == "Claro")
    {
        root.style.setProperty('--inicio-degradado', inicio_degradado_claro);
        root.style.setProperty('--fin-degradado', fin_degradado_claro);
        root.style.setProperty('--text-color', text_color_claro);
    }
    else if (tipo_letra == "Oscuro")
    {
        root.style.setProperty('--inicio-degradado', inicio_degradado_oscuro);
        root.style.setProperty('--fin-degradado', fin_degradado_oscuro);
        root.style.setProperty('--text-color', text_color_oscuro);
    }
    else if (tipo_letra == "Predeterminado")
    {
        root.style.setProperty('--inicio-degradado', inicio_degradado_oscuro);
        root.style.setProperty('--fin-degradado', fin_degradado_oscuro);
        root.style.setProperty('--text-color', text_color_oscuro);
    }
}

function ajustes_texto(tipo_color)
{
    if(tipo_color == "Normal")
        document.documentElement.style.fontSize = "18px";
    else if (tipo_color == "Grande")
        document.documentElement.style.fontSize = "22px";
    else if (tipo_color == "Muy grande")
        document.documentElement.style.fontSize = "26px";
}   

document.addEventListener("DOMContentLoaded", function() {
    document.querySelectorAll('.dropdown-menu ul').forEach(function(list) {

        list.querySelectorAll('.dropdown-item').forEach(function(item) {
            
            item.addEventListener('click', function(event) {
                // Evita que el dropdown se cierre al hacer clic
                event.stopPropagation();

                // Elimina la clase 'active' de todos los elementos en este <ul>
                list.querySelectorAll('.dropdown-item').forEach(function(i) {
                    i.classList.remove('active');
                });

                // Añade la clase 'active' al elemento clicado
                item.classList.add('active');

                if(list.id == "Tema")
                    ajustes_color(item.getAttribute("value"));
                else if (list.id == "Letra")
                    ajustes_texto(item.getAttribute("value"));
            });
        });
    });
    ajustes_color("Predeterminado");
});
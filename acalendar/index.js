// Variables para la fecha actual y el contenedor de días
let currentDate = new Date();
const daysContainer = document.getElementById("daysContainer");
const monthYearLabel = document.getElementById("monthYear");

// Función para actualizar el calendario
function updateCalendar() {
  // Obtener el primer día del mes y el número de días en el mes
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const firstDay = new Date(year, month, 1).getDay(); // Día de la semana del primer día del mes
  const daysInMonth = new Date(year, month + 1, 0).getDate(); // Total de días en el mes

  // Actualizar el título del mes y año
  const monthNames = [
    "Enero",
    "Febrero",
    "Marzo",
    "Abril",
    "Mayo",
    "Junio",
    "Julio",
    "Agosto",
    "Septiembre",
    "Octubre",
    "Noviembre",
    "Diciembre",
  ];
  monthYearLabel.textContent = `${monthNames[month]} ${year}`;

  // Limpiar el contenedor de días
  daysContainer.innerHTML = "";

  // Crear las casillas de los días
  for (let i = 0; i < firstDay; i++) {
    const emptyCell = document.createElement("div");
    emptyCell.classList.add("day", "empty");
    daysContainer.appendChild(emptyCell);
  }

  for (let day = 1; day <= daysInMonth; day++) {
    const dayCell = document.createElement("div");
    dayCell.classList.add("day");
    dayCell.textContent = day;
    daysContainer.appendChild(dayCell);
  }
}

// Función para ir al mes anterior
function prevMonth() {
  currentDate.setMonth(currentDate.getMonth() - 1);
  updateCalendar();
}

// Función para ir al mes siguiente
function nextMonth() {
  currentDate.setMonth(currentDate.getMonth() + 1);
  updateCalendar();
}

// Eventos de los botones
document.getElementById("prevMonth").addEventListener("click", prevMonth);
document.getElementById("nextMonth").addEventListener("click", nextMonth);

// Inicializar el calendario
updateCalendar();

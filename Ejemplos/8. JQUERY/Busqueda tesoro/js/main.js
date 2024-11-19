// main.js

$(document).ready(function () {
  const portadaJuego = $('#portadaJuego');
  const gameContainer = $('#gameContainer');
  const gridContainer = $('#gridContainer');
  const startButton = $('#startButton');
  const message = $('#message');
  const restartButton = $('#restartButton');
  const totalRows = 4;
  const totalColumns = 4;
  const maxAttempts = 5; // Número máximo de intentos
  const maxTreasures = 3; // Número máximo de tesoros
  let treasuresAssigned = 0; // Número de tesoros asignados a celdas
  let attemptsLeft = maxAttempts;
  
  startButton.on('click', function() {
    portadaJuego.hide();
    gameContainer.show();
    updateAttemptsText();
  });
  

    let tesoro = 0;
    // Crea las celdas y las agrega al contenedor con el atributo treasure aleatorio
    for (let row = 0; row < totalRows; row++) {
        for (let col = 0; col < totalColumns; col++) {
            const index = row * totalColumns + col;
            // Verificar si ya se asignaron todos los tesoros
            if (treasuresAssigned <= maxTreasures) {
                tesoro = getRandomNumber();
                // Incrementar el contador de tesoros asignados si se asigna un tesoro
                if (tesoro === 1) {
                    treasuresAssigned++;
                }
            } else {
                // Si ya se asignaron todos los tesoros, asignar 0
                tesoro = 0;
            }
        const cell = $('<div class="cell"></div>').data('index', index).data('treasure', tesoro);
        gridContainer.append(cell);
        }
    }

    // Agrega el evento clic utilizando delegación
    gridContainer.on('click', '.cell', function () {
        const cell = $(this);
        const index = cell.data('index');
        searchForTreasure(cell, index);
    });

    function searchForTreasure(cell, index) {
        if (attemptsLeft > 0) {
            if (!cell.hasClass('clicked')) {
                cell.addClass('clicked');
                attemptsLeft--;
                if (cell.data('treasure') === 1) {
                    // El jugador encontró un tesoro
                    cell.css('background-image', 'url("img/tesoro.png")');
                    endGame(true);
                } else {
                    // El jugador no encontró un tesoro
                    cell.css('background-image', 'url("img/skull.png")');
                    updateAttemptsText();
                    if (attemptsLeft <= 0) {
                        endGame(false);
                    }else {
                        cell.fadeOut(3000, function() {
                            //cell.fadeOut(2000);
                            // Cambiar la imagen después de que se complete el fadeOut
                            cell.css('background-image', 'url("img/isla.png")');
                            // Aplicar fadeIn después de cambiar la imagen
                            cell.fadeIn(500);
                        });
                    }
                }
            }
        }
    }

    // Función para generar un número aleatorio entre 0 y 1
    function getRandomNumber() {
        return Math.floor(Math.random() * 2);
    }

    function updateAttemptsText() {
        // Actualiza el texto de intentos restantes
        message.text(`Intentos restantes: ${attemptsLeft}`);
    }

    function endGame(isWinner) {
        if (isWinner) {
            message.text('¡Ganaste, eres un verdadero Corsario!');
        } else {
            message.text('Has perdido, no llegas ni a Grumete de poca monta...');
        }
        restartButton.show();
        restartButton.on('click', restartGame);
  }

    function restartGame() {
        // Reinicia el juego
        gridContainer.empty();
        message.empty();
        restartButton.hide();
        attemptsLeft = maxAttempts;
        treasuresAssigned = 0;
        tesoro = 0;
        for (let row = 0; row < totalRows; row++) {
            for (let col = 0; col < totalColumns; col++) {
                const index = row * totalColumns + col;
                // Verificar si ya se asignaron todos los tesoros
                if (treasuresAssigned <= maxTreasures) {
                    tesoro = getRandomNumber();
                    // Incrementar el contador de tesoros asignados si se asigna un tesoro
                    if (tesoro === 1) {
                        treasuresAssigned++;
                    }
                } else {
                    // Si ya se asignaron todos los tesoros, asignar 0
                    tesoro = 0;
                }
                const cell = $('<div class="cell"></div>').data('index', index).data('treasure', tesoro);
                gridContainer.append(cell);
            }
        }
        updateAttemptsText();
    }

    gridContainer.on('click', '.cell', function () {
        const cell = $(this);
        const index = cell.data('index');
        searchForTreasure(cell, index);
    });

    updateAttemptsText();
});

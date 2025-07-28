const body = document.getElementById("body");
const piePagina = document.getElementById("footer");
const tablero = document.getElementById("tablero");
const empezar = document.getElementById("empezar");
const reiniciar = document.getElementById("reiniciar");
const velocidad = document.getElementById("velocidad");
const cols = document.getElementById("columnas");
const fils = document.getElementById("filas");
const textoPuntuacion = document.getElementById("puntuacion");
const puntuaciones = document.getElementById("puntuaciones");

let serpiente; // Array de las coordenadas (x,y) de la serpiente
let direcCola; // Grados a los que girar la imagen de la cola
let intervalID; // ID del bucle actual
let filas = 10;
let columnas = 15;
let direccion = ''; // Dirección a la que se está moviendo
let intervalo = 300; // Milisegundos de retardo de cada tic
let puntuacion = 0;
let numPartida = 0;
let cambiarIntervalo = false; // Hay que cambiar "intervalo"?
let celdas = Array.from({length: columnas}, () => []); // celdas[x][y][(0 => celda, 1 => tipo)]

function comprobar() {
  let bien = true
  if (velocidad.value < 100 || velocidad.value > 900) {
    bien = false;
    alert("La velocidad no puede ser menor que 100 ni mayor que 900.");
  }
  if (fils.value < 2 || cols.value < 2) {
    bien = false;
    alert("El mínimo de filas o clumnas es 2.");
  }
  if (bien) {iniciar();}
}

function iniciar() {
  intervalo = 1000 - velocidad.value;
  filas = fils.value;
  columnas = cols.value;

  // Damos los estilos
  cols.parentNode.parentNode.style.display = "none";
  tablero.style.gridTemplateColumns = "repeat(" + columnas + ", 1fr)";
  tablero.style.gridTemplateRows = "repeat(" + filas + ", 1fr)";
  piePagina.style.position = "relative";
  textoPuntuacion.style.display = "block";
  reiniciar.style.display = "block";
  tablero.style.display = "grid";
  
  // Creamos las celdas[x][y][(0 => celda, 1 => tipo)]
  celdas = Array.from({length: columnas}, () => []);
  for (let i=0; i < columnas; i++) {
    for (let j=0; j < filas; j++) {
      let celda = [document.createElement("div")];
      celda[0].style.gridArea = (j+1) + " / " + (i+1) + " / " + (j+2) + " / " + (i+2);
      //celda[0].style.height =                   HACER EN UN FUTURO
      //celda[0].style.width =     LO DE CREAR LAS CELDAS SEGÚN EL ANCHO DE LA PANTALLA
      celda[0].classList.add("celda");
      tablero.appendChild(celda[0]);
      celda.push('');
      celdas[i].push(celda);
    }
  }

  // Inicialización del juego:
  serpiente = [[Math.ceil(columnas/2), Math.ceil(filas/2)],[0, 0]];
  celdas[serpiente[0][0]][serpiente[0][1]][1] = 'c';
  crearManzana();
  clearInterval(intervalID);
  intervalID = setInterval(tic, intervalo);
  numPartida++;
}

// Eventos del teclado
document.addEventListener('keydown', function(event) {
  if (numPartida > 0) {
    let auxiliar = direccion; let auxX = 0; let auxY = 0;
    if (event.key === 'ArrowUp' || event.key === 'ArrowDown' || event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
      event.preventDefault(); // Evita que las flechas muevan la pantalla
    }
    if (event.key === 'ArrowUp' || event.key === 'w') {auxiliar = 'w'; auxY = -1;}
    if (event.key === 'ArrowLeft' || event.key === 'a') {auxiliar = 'a'; auxX = -1;}
    if (event.key === 'ArrowDown' || event.key === 's') {auxiliar = 's'; auxY = 1;}
    if (event.key === 'ArrowRight' || event.key === 'd') {auxiliar = 'd'; auxX = 1;}
    if (serpiente.length > 0) {
      auxX += serpiente[0][0];
      auxY += serpiente[0][1];
      // Comprobación para que no te suicides
      if (!(auxX < 0 || auxX >= columnas || auxY < 0 || auxY >= filas || celdas[auxX][auxY][1] === 's')) {direccion = auxiliar;}
    }
  }
});


// -|-|-|-|-|-|-|-|-|-|-|-  FUNCIONES DEL JUEGO  -|-|-|-|-|-|-|-|-|-|-|-


// Pre: mov es la dirección a la que se va a mover la serpiente (en wasd)
function paso(mov) {
  let x = 0;
  let y = 0;
  if (mov === 'w') {y = -1;}
  else if (mov === 'a') {x = -1;}
  else if (mov === 's') {y = 1;}
  else if (mov === 'd') {x = 1;}
  x += serpiente[0][0];
  y += serpiente[0][1];

  // Comprobamos si se choca con la pared o la serpiente
  if (x < 0 || x >= columnas || y < 0 || y >= filas || celdas[x][y][1] === 's') {
    perder();
  } else {
    // Copmprobamos si se come una manzana
    if (celdas[x][y][1] === 'm') {comer(); crearManzana();}

    // Se borra la última parte de la serpiente
    celdas[serpiente[serpiente.length-1][0]][serpiente[serpiente.length-1][1]][1] = '';

    // Se mueve el cuerpo (desde la cola hacia la cebeza)
    for (let i = serpiente.length - 1; i > 0; i--) {
      serpiente[i] = serpiente[i - 1].slice(); 
    }

    // Se mueve la cabeza
    serpiente[0][0] = x;
    serpiente[0][1] = y;

    // Actualizamos direcCola (grados a los que girar la imagen de la cola)
    if (serpiente.length > 1) {
      if (serpiente[serpiente.length -1][0] === serpiente[serpiente.length -2][0]) {
        if (serpiente[serpiente.length -1][1] < serpiente[serpiente.length -2][1]) {
          direcCola = 0; // Abajo
        } else {
          direcCola = 180; // Arriba
        }
      } else {
        if (serpiente[serpiente.length -1][0] < serpiente[serpiente.length -2][0]) {
          direcCola = -90; // Derecha
        } else {
          direcCola = 90; // Izquierda
        }
      }
    }

    // Marcamos las casillas de la serpiente
    celdas[serpiente[serpiente.length-1][0]][serpiente[serpiente.length-1][1]][1] = 'f'; // f de fin
    celdas[serpiente[0][0]][serpiente[0][1]][1] = 'c'; // c de cabeza
    for (let i=1; i < serpiente.length -1; i++) {
      celdas[serpiente[i][0]][serpiente[i][1]][1] = 's'; // s de serpiente
    }
    if (cambiarIntervalo) {cambiarVelocidad()};
  }
}

function comer() {
  let nuevaCola = serpiente[serpiente.length - 1];
  serpiente.push(nuevaCola);
  puntuacion++;
  textoPuntuacion.textContent = "Puntuación: " + puntuacion;
  cambiarIntervalo = true;
}

function crearManzana() {
  let manzanaCreada = false;
  let randCol = 0;
  let randRow = 0;
  while (!manzanaCreada) {
    randCol = Math.floor(Math.random() * columnas);
    randRow = Math.floor(Math.random() * filas);
    if (celdas[randCol][randRow][1] === '') {manzanaCreada = true;}
  }
  celdas[randCol][randRow][1] = 'm'; // m de manzana
}

function pintarTablero() {
  for (let i=0; i < columnas; i++) {
    for (let j=0; j < filas; j++) {
      celdas[i][j][0].innerHTML = ``;
      
      // Modo oscuro o modo claro
      if (body.classList.contains("oscuro")) {
        celdas[i][j][0].style.backgroundColor = "#444";
      } else {celdas[i][j][0].style.backgroundColor = "white";}

      // Cuerpo (Serpiente)
      if (celdas[i][j][1] === 's') {
        celdas[i][j][0].style.backgroundColor = "rgba(160, 196, 50, 1)";

        // Cabeza
      } else if (celdas[i][j][1] === 'c') {
        // La cabeza mira hacia la dirección de movimiento
        if (direccion === 'w') {celdas[i][j][0].innerHTML = `<img src="CabesaCortada.png" class="imagen"  style="transform: rotate(180deg);">`;}
        else if (direccion === 'a') {celdas[i][j][0].innerHTML = `<img src="CabesaCortada.png" class="imagen"  style="transform: rotate(90deg);">`;}
        else if (direccion === 's') {celdas[i][j][0].innerHTML = `<img src="CabesaCortada.png" class="imagen"  style="transform: rotate(0deg);">`;}
        else {celdas[i][j][0].innerHTML = `<img src="CabesaCortada.png" class="imagen"  style="transform: rotate(-90deg);">`;}
      
        // Cola (Final)
      } else if (celdas[i][j][1] === 'f') {
        celdas[i][j][0].innerHTML = `
          <img src="Cola.png" class="imagen" style="transform: rotate(` + direcCola + `deg);";">`;

        // Manzana
      } else if (celdas[i][j][1] === 'm') {
        celdas[i][j][0].innerHTML = `
          <img src="https://media.tenor.com/ZdkHXcXpkKEAAAAM/bruh.gif" class="imagen"">`;
      }
    }
  }
}

// Bucle principal
function tic() {
  paso(direccion);
  pintarTablero();
}

function reiniciarJuego() {
    // Crea el texto de la puntuación
  const numero = document.createElement("p");
  numero.textContent = numPartida + "º intento: " + puntuacion;
  puntuaciones.appendChild(numero);
  
    // Se reinicia la partida
  clearInterval(intervalID);
  for (let i=0; i < columnas; i++) {
    for (let j=0; j < filas; j++) {
      celdas[i][j][0].innerHTML = ``;
      celdas[i][j][0].style.backgroundColor = "white";
      celdas[i][j][1] = '';
    }
  }
  numPartida++;
  direccion = '';
  puntuacion = 0;
  cambiarIntervalo = false;
  intervalo = 1000 - velocidad.value;
  textoPuntuacion.textContent = "Puntuación: 0";

    // Se crea la partida
  serpiente = [[Math.ceil(columnas/2), Math.ceil(filas/2)],[0, 0]];
  crearManzana();
  intervalID = setInterval(tic, intervalo);
}

function cambiarVelocidad() {
  clearInterval(intervalID);
  cambiarIntervalo = false;
  intervalo -= intervalo/30; // Se acelera un 3.45%
  intervalID = setInterval(tic, intervalo);
}

function explotar() {
  if (serpiente.length > 0) {
    celdas[serpiente[0][0]][serpiente[0][1]][0].style.backgroundColor = "red";
    celdas[serpiente[0][0]][serpiente[0][1]][0].innerHTML = ``;
    serpiente.shift(); // Quita de serpiente el elemento [0]
  } else {clearInterval(intervalID);}
}

function perder() {
  clearInterval(intervalID);
  celdas[serpiente[0][0]][serpiente[0][1]][1] = '';
  intervalID = setInterval(explotar, 100);
}

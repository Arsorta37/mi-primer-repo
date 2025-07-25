// Función para cargar cualquier componente HTML
function loadComponent(id, file, callback) {
    fetch(file)
        .then(response => response.text())
        .then(data => {
            document.getElementById(id).innerHTML = data;
            if (callback) callback(); // Ejecutar el callback si existe
        })
        .catch(error => console.error(`Error al cargar ${file}:`, error));
}

// Cargamos footer y navbar al cargar la página
loadComponent("footer", "footer.html");
loadComponent("navbar", "navbar.html", () => {
    // Creamos el modo oscuro
    const YinYang = document.getElementById("YinYang");
    let grados = 35;
    YinYang.addEventListener("click", () => { //Modo oscuro
        document.body.classList.toggle("oscuro");
        grados += 315 * 4; // 4 vueltas por clic
        YinYang.style.transform = `rotate(${grados}deg)`;
    });
});

// FUNCIONAMIENTO DEL MAIN:
const overlay1 = document.getElementById("overlay1");
const overlay2 = document.getElementById("overlay2");
const sol = document.getElementById("sol");
const luna = document.getElementById("luna");
const estrellitas = document.getElementById("estrellitas");

const gradientes = [
    "linear-gradient(-2.5deg,rgba(255, 50, 0, 1) 0%, rgba(225, 0, 225, 1) 50%, rgba(113, 0, 225, 1) 100%)", //Amanecer
    "linear-gradient(198deg,rgba(255, 253, 219, 1) 0%, rgba(0, 218, 225, 1) 100%)", // Día
    "linear-gradient(2.5deg,rgba(255, 50, 0, 1) 0%, rgba(225, 0, 225, 1) 50%, rgba(113, 0, 225, 1) 100%)", //Atardecer
    "linear-gradient(180deg,rgba(2, 0, 36, 1) 8%, rgba(9, 9, 121, 1) 60%, rgba(217, 0, 255, 1) 100%)", // Noche
];

let indice = 0;
let inicio = true;
let actualOverlay = overlay1;
let siguienteOverlay = null;

function cambiarGradiente() {
    if (actualOverlay === overlay1) {
        siguienteOverlay = overlay2;
    } else {siguienteOverlay = overlay1;}

    // El de abajo se convierte al instante
    siguienteOverlay.style.zIndex = 1;
    siguienteOverlay.style.background = gradientes[indice];
    siguienteOverlay.style.transition = "opacity 0s";
    siguienteOverlay.style.opacity = 1;

    // El de arriba se convierte poco a poco
    actualOverlay.style.zIndex = 2;
    actualOverlay.style.transition = "opacity 1s linear";
    actualOverlay.style.opacity = 0;
    actualOverlay = siguienteOverlay;
    

    // Movimiento del sol:
    if (indice == 0) {
        luna.style.transform = "translate(1000px, -1200px)";
        sol.style.transform = "translate(200px, 333px)";
        estrellitas.style.opacity = "0";
    } else if (indice == 1){
        sol.style.transform = "translate(610px, -360px)";
        luna.style.transform = "translate(1000px, 0px)";
    } else if (indice == 2){
        estrellitas.style.opacity = "0";
        luna.style.transform = "translate(300px, 0px)";
        sol.style.transform = "translate(800px, -500px)";
        sol.style.transition = "all 0.2s ease";
        setTimeout(() => {
            sol.style.transform = "translate(-700px, -700px)";
        }, "200");
        setTimeout(() => {
            sol.style.transform = "translate(50px, 333px)";
            sol.style.transition = "all 1s ease";
        }, "500");
    } else {
        sol.style.transform = "translate(100px, 600px)";
        luna.style.transform = "translate(500px, -600px)";
        estrellitas.style.opacity = "1";
    }
    indice = (indice + 1) % gradientes.length;
}

function iniciarAnimacion() {
    if (inicio) {
        // Inicializa el primer overlay
        actualOverlay.style.background = gradientes[indice];
        actualOverlay.style.opacity = 1;
        indice = (indice + 1) % gradientes.length;
    }
    cambiarGradiente()
    indice--;
}
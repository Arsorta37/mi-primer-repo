const check = document.getElementById("checkMostrar");
const numBarra = document.getElementById("numBarra");
const boton = document.getElementById("calcular");
const caja = document.getElementById("resultados");
const barra = document.getElementById("barra");
const copiar = document.getElementById("copy");
const reps = document.getElementById("reps");

let ultimoResultado = "No hay ningún resultado :(";
let repeticiones = reps.value;
let puedes = true;  // Indica si el botón se puede usar


// Código para el worker:
console.log("Creando worker...");
const worker = new Worker("JS/WebWorkerFib.js");

worker.onerror = (err) => {
    console.error("Error en el worker:", err.message);
};

// Pre: e.data[1] indica si lo que manda el worker es un resultado (true)
//      o es una actualización del progreso.
worker.onmessage = (e) => {
    if (e.data[0]) {
        // Si llega un resultado:
        ultimoResultado = e.data[1];
        console.log(e.data[1].length);
        
        // Altura de la caja de resultados
        if (check.checked) {
            if (repeticiones < 28) {
                caja.style.height = (2.25*repeticiones/2 + 0.2) + "rem";
            } else {caja.style.height = "500px";}

        } else {
            if (e.data[1].length <= 41) {
                caja.style.height = "1.2rem";
            } else if (repeticiones <= 4700) {
                caja.style.height = (Math.ceil(e.data[1].length/34) + 1.2) + "rem";
            } else {caja.style.height = "500px"}
        }

        // Crea el texto en la página
        const numero = document.createElement("p");
        numero.classList.add("resultado");
        numero.textContent = e.data[1];
        caja.appendChild(numero);

    } else {
        // Si llega una actualización del progreso se actualiza la barra
        numBarra.textContent = e.data[1] + "/" + repeticiones;
        barra.style.transition = "width 0.1s";
        barra.style.width = (e.data[1] / repeticiones) * 100 + "%";

        // Rehabilitamos el botón al acabar
        if (e.data[1] == repeticiones) {
            puedes = true;
            boton.disabled = false;
            boton.style.backgroundColor = "white";
            boton.style.color = "black";
            boton.style.cursor = "pointer";
            boton.style.boxShadow = "0 3px 6px rgba(0,0,0,0.5)";
            boton.style.transform = "translateY(0px)";
        }
    }
};
console.log("Worker creado:", worker);


// Código del botón calcular
boton.addEventListener('click', () => {
    if (puedes) {
        repeticiones = reps.value;
        if (reps.value !== "") {
            // Quitamos los números anteriores:
            let numerosCaja = document.getElementsByClassName("resultado");
            Array.from(numerosCaja).forEach(element => {caja.removeChild(element);});

            if (reps.value > 0) {
                // Deshabilitamos el botón
                puedes = false;
                boton.disabled = true;
                boton.style.backgroundColor = "grey";
                boton.style.color = "black";
                boton.style.cursor = "default";
                boton.style.boxShadow = "0 1px 2px rgba(0,0,0,0.5)";
                boton.style.transform = "translateY(2px)";
                
                // Reiniciamos la barra
                barra.style.transition = "width 0s";
                barra.style.width = "0%";

                // Mandamos el trabajo al worker
                let mensaje = [repeticiones, check.checked];
                worker.postMessage(mensaje);

                // Alertas para números muy grandes
                if ((reps.value > 9999) && check.checked) {
                    alert("Escribir tantos números puede realentizar la página. Para cancelar el cálculo, recarga con F5, Comando (⌘) + R, o la flecha circular de arriba en el navegador.");
                } else if (reps.value > 200000) {
                    alert("Calcular un número tan grande puede llevar un tiempo. Para cancelar el cálculo, recarga con F5, Comando (⌘) + R, o la flecha circular de arriba en el navegador.");
                }
            
                // Si el número no se puede calcular
            } else if(reps.value == 0) {
                const numero = document.createElement("p");
                numero.textContent = "(0): 0";
                numero.classList.add("resultado");
                caja.appendChild(numero);
                caja.style.height = "1.2rem";
            } else {
                alert("El número debe ser positivo.");
                const numero = document.createElement("p");
                numero.textContent = "El resultado se mostrará aquí:";
                numero.classList.add("resultado");
                caja.appendChild(numero);
                caja.style.height = "1.2rem";
            }
        }
    }
});

// Hover del botón calcular
boton.addEventListener('mouseover', function() {
    if (puedes) {
        boton.style.backgroundColor = "black";
        boton.style.color = "white";
        boton.style.boxShadow = "0 1px 2px rgba(0,0,0,0.5)";
        boton.style.transform = "translateY(2px)";
    }
}, false);
boton.addEventListener('mouseout', function() {
    if (puedes) {
        boton.style.backgroundColor = "white";
        boton.style.color = "black";
        boton.style.boxShadow = "0 3px 6px rgba(0,0,0,0.5)";
        boton.style.transform = "translateY(0px)";
    }
}, false);

// Botón copiar
function copiarAlPortapapeles() {
  try {
    navigator.clipboard.writeText(ultimoResultado);
    alert('Texto copiado al portapapeles');
  } catch (err) {
    console.error('Error al copiar: ', err);
  }
}
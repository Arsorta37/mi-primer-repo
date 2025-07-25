function envolverLetras(elemento) {
  if (!elemento) return;

  if (elemento.nodeType === Node.TEXT_NODE) {
    if (!elemento.textContent.trim()) return;
    if (elemento.parentNode?.classList?.contains("letra")) return;

    const fragmento = document.createDocumentFragment();
    for (const char of elemento.textContent) {
      const span = document.createElement("span");
      span.className = "letra";
      span.textContent = char;
      fragmento.appendChild(span);
    }
    elemento.replaceWith(fragmento);
  } else if (elemento.nodeType === Node.ELEMENT_NODE) {
    Array.from(elemento.childNodes).forEach(envolverLetras);
  }
}

// Función para cada letra
function aplicarEfectoHuida() {
  let mouseX = 0;
  let mouseY = 0;
  let animando = false;
  const letras = document.querySelectorAll("#contentInicio .letra");
  document.addEventListener("mousemove", e => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    if (!animando && !quietas) {
      animando = true;
      requestAnimationFrame(() => {
        letras.forEach(letra => {
          const rect = letra.getBoundingClientRect();
          const centroX = rect.left + rect.width / 2;
          const centroY = rect.top + rect.height / 2;

          const dx = mouseX - centroX;
          const dy = mouseY - centroY;
          const distancia = Math.sqrt(dx * dx + dy * dy);

          if (distancia < 150) {
            const fuerza = (150 - distancia) / 150;
            const offsetX = Math.max(-50, Math.min(50, -dx * potencia * fuerza));
            const offsetY = Math.max(-50, Math.min(50, -dy * potencia * fuerza));
            letra.style.transform = `translate(${offsetX}px, ${offsetY}px)`;
          } else {
            letra.style.transform = "translate(0, 0)";
          }
        });
        animando = false;
      });
    }
  });
}

// Cuando ha cargado toda la página inicia la conversión en letras
document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll("#contentInicio h1, #contentInicio p, #contentInicio h2, #contentInicio h3")
    .forEach(envolverLetras);
  // Cuando ya está cada letra por separado 
  aplicarEfectoHuida();
});


function crearNumero() {
  if (!quietas && window.innerWidth > 660) {
    const numero = document.createElement('div');
    numero.className = 'numero';
    numero.textContent = Math.floor(Math.random() * 10); // Número aleatorio entre 0 y 9
    numero.style.right = (Math.random() * 130) + 'px'; // Posición horizontal aleatoria
    numero.style.animationDuration = (Math.random() * 3 + 2) + 's'; // Duración de la animación aleatoria
    document.getElementById('banner').appendChild(numero);

    // Elimina el número después de que termine la animación
    numero.addEventListener('animationend', () => {numero.remove();});
  }
}

// Crea un número cada 500 milisegundos
setInterval(crearNumero, 25);
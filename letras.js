function envolverLetras(elemento) {
  if (elemento.nodeType === Node.TEXT_NODE) {
    // Si el texto es solo espacios o vacío, no hacer nada
    if (!elemento.textContent.trim()) return;

    // Si ya está envuelto, no hacer nada
    if (elemento.parentNode.classList && elemento.parentNode.classList.contains("letra")) return;

    const fragmento = document.createDocumentFragment();
    [...elemento.textContent].forEach(char => {
      const span = document.createElement("span");
      span.textContent = char;
      span.classList.add("letra");
      fragmento.appendChild(span);
    });
    elemento.replaceWith(fragmento);

    // Si es un nodo, se busca texto dentro
  } else if (elemento.nodeType === Node.ELEMENT_NODE) {
    [...elemento.childNodes].forEach(envolverLetras);
  }
}

// Envolver todas las letras del div
const contenedor = document.getElementById("contentInicio");
envolverLetras(contenedor);

// Efecto de huida
document.addEventListener("mousemove", e => {
  if (!quietas) {
    document.querySelectorAll(".letra").forEach(letra => {
      const rect = letra.getBoundingClientRect();
      const centroX = rect.left + rect.width / 2;
      const centroY = rect.top + rect.height / 2;

      const dx = e.clientX - centroX;
      const dy = e.clientY - centroY;
      const distancia = Math.sqrt(dx * dx + dy * dy);

      if (distancia < 200) {
        const fuerza = (200 - distancia) / 200;
        const offsetX = -dx * potencia * fuerza;
        const offsetY = -dy * potencia * fuerza;
        letra.style.transform = `translate(${Math.max(-50, Math.min(50, offsetX))}px, ${Math.max(-50, Math.min(50, offsetY))}px)`;
      } else {
        letra.style.transform = `translate(0px, 0px)`;
      }
    });
  }
});

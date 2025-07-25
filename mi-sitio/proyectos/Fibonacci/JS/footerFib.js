// Crear el footer
const footer = document.createElement("footer");

// Añadir columna de enlaces legales
const col1 = document.createElement("div");
col1.className = "footer-col";
col1.innerHTML = `
<h3>Más sobre Fibonacci</h3>
<ul>
<li><a href="https://en.wikipedia.org/wiki/Fibonacci_sequence" target="_blank">Wikipedia</a></li>
<li><a href="https://www.mathsisfun.com/numbers/fibonacci-sequence.html" target="_blank">Math Is Fun</a></li>
<li><a href="https://youtu.be/PIj3zh5RmZ4?si=0_9c5IN8QRHJibyo" target="_blank">Applications in Technology (Yt)</a></li>
</ul>
`;

// Añadir columna de redes sociales
const col2 = document.createElement("div");
col2.className = "footer-col";
col2.innerHTML = `
<h3>Contacto</h3>
<ul>
<li><a href="https://mail.google.com/mail/u/0/?tf=cm&source=mailto&to=andres1210.alp@gmail.com" target="_blank">Correo electrónico</a></li>
<li><a href="#">Discord</a></li>
<li><a href="#">Instagram</a></li>
</ul>
`;

// Añadir texto final
const rights = document.createElement("p");
rights.textContent = "© 2025 Todos los derechos reservados";

// Unir todo al footer
footer.appendChild(col1);
footer.appendChild(col2);
footer.appendChild(rights);

// Insertar el footer al final del body
document.body.appendChild(footer);
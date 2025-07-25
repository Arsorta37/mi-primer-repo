// Crear el footer
const footer = document.getElementById("footer");

// Añadir columna de enlaces legales
const col1 = document.createElement("div");
col1.className = "footer-col";
col1.innerHTML = `
    <h3>Más juegos snake</h3>
    <ul>
        <li><a href="https://sites.google.com/site/populardoodlegames/google-snake" target="_blank">Juego de google</a></li>
        <li><a href="https://playsnake.org/" target="_blank">Snake retro</a></li>
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
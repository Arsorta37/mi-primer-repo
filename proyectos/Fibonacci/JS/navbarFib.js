// Crear una etiqueta <nav>
const navbar = document.getElementById("navbar");
const nav = document.createElement("nav");

// Crear un contenedor <div> con clase "container" para alinear el contenido
const container = document.createElement("div");
container.classList.add("container");

// Crear el logo
const logo = document.createElement("div");
logo.textContent = "MiLogo"; // Este es el texto que se verá como logo
logo.style.fontWeight = "bold"; // Le ponemos el texto en negrita
logo.innerHTML = `
<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" class="bi bi-yin-yang" viewBox="0 0 16 16" id="YinYang">
  <path d="M9.167 4.5a1.167 1.167 0 1 1-2.334 0 1.167 1.167 0 0 1 2.334 0"/>
  <path d="M8 0a8 8 0 1 0 0 16A8 8 0 0 0 8 0M1 8a7 7 0 0 1 7-7 3.5 3.5 0 1 1 0 7 3.5 3.5 0 1 0 0 7 7 7 0 0 1-7-7m7 4.667a1.167 1.167 0 1 1 0-2.334 1.167 1.167 0 0 1 0 2.334"/>
</svg>
`;

let grados = 35;
logo.addEventListener("click", () => {
  document.body.classList.toggle("oscuro")
  const YinYang = document.getElementById("YinYang");
  grados += 315 * 4; // 4 vueltas por clic
  YinYang.style.transform = `rotate(${grados}deg)`;
});

// Crear el menú con innerHTML (más rápido para este caso)
const menu = document.createElement("ul");
menu.innerHTML = `
  <li><a href="../../index.html">Home</a></li>
  <li><div class="dropdown">
    <a class="dropbtn">Proyectos</a>
    <div class="dropdown-content">
      <a style="border-radius: 10px 10px 0 0; color: #AAA;">Serie Fibonacci</a>
      <a href="../Jueguito/jueguitoSerpiente.html" style="border-radius: 0;">Jueguito snake</a>
      <a href="../Atardecer/AtardecerGradiantes.html" style="border-radius: 0 0 10px 10px;">Atardecer</a>
    </div>
  </div></li>
  <li><a href="https://mail.google.com/mail/u/0/?tf=cm&source=mailto&to=andres1210.alp@gmail.com" target="_blank">Contacto</a></li>
`;

// Montar toda la estructura
container.appendChild(logo);
container.appendChild(menu);

// Luego metemos el contenedor dentro del <nav> y del div #navbar
nav.appendChild(container);
navbar.appendChild(nav);
const main = document.getElementById("main");
const footer = document.getElementById("footer");
const contentInicio = document.getElementById("contentInicio");
const contentAbout = document.getElementById("contentAbout");
const contentServices = document.getElementById("contentServices");
const contentProyectos = document.getElementById("contentProyectos");
const contentContacto = document.getElementById("contentContacto");

const fibo = document.getElementById("fibonacci");
const snake = document.getElementById("snake");
const atardecer = document.getElementById("atardecer");
const flecha = document.getElementById("flecha");
const banner = document.getElementById("banner");

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
// FOOTER
loadComponent("footer", "footer.html");

// NAVBAR
loadComponent("navbar", "navbar.html", () => {

    // BANNER
    loadComponent("banner", "banner.html");

    // Programación del navbar
    const YinYang = document.getElementById("YinYang"); // Modo oscuro
    const modo = document.getElementById("modo");
    const inicio = document.getElementById("inicio");
    const curso = document.getElementById("curso");
    const services = document.getElementById("services");
    const proyectos = document.getElementById("proyectos");
    const contacto = document.getElementById("contacto");

    let pagina = "inicio";
    let able = true;
    inicio.classList.add("subrayado");

    let grados = 35;
    YinYang.addEventListener("click", () => { //Modo oscuro
        document.body.classList.toggle("oscuro");
        grados += 1260; // 3 vueltas y media por clic
        YinYang.style.transform = `rotate(${grados}deg)`;
        modo.style.opacity = "0";
        setTimeout(() => {modo.style.display = "none";}, 1000);
    });

    // Código del los enlaces
    inicio.addEventListener("click", () => {
        if (pagina != "inicio" && able) {
            // Se oculta el apartado anterior
            if (pagina == "contacto") {
                contentContacto.style.maxHeight = "0px";
                contacto.classList.remove("subrayado");
                footer.style.opacity = "0";
                setTimeout(() => {
                    loadComponent("footer", "footer.html");
                    footer.style.opacity = "1";
                }, 1000);
            } else {
                fibo.style.padding = "0rem";
                fibo.style.maxHeight = "0px";
                snake.style.padding = "0rem";
                snake.style.maxHeight = "0px";
                atardecer.style.padding = "0rem";
                atardecer.style.maxHeight = "0px";
                contentAbout.style.maxHeight = "0px";
                contentServices.style.maxHeight = "0px";
                contentProyectos.style.maxHeight = "0px";
                inicio.classList.add("subrayado");
                curso.classList.remove("subrayado");
                services.classList.remove("subrayado");
                proyectos.classList.remove("subrayado");
            }

            able = false;
            quietas = true;
            pagina = "inicio";
            modo.style.opacity = "0";
            setTimeout(() => {
                // Se habilitan las letras
                document.querySelectorAll(".letra").forEach(letra => {
                    letra.style.transition = "all 1s ease";
                    letra.style.transform = `translate(0px, 0px)`;
                    setTimeout(() => {letra.style.transition = "all 0.2s ease"; quietas = false;}, 500);
                });
                
                flecha.style.opacity = "1";
                banner.style.opacity = "1";
                contentInicio.style.opacity = "1";
                main.style.gridArea = "2 / 1 / 3 / 2";
                contentInicio.style.maxHeight = "1500px";
                able = true;
            }, 1000);
        }
    });

    curso.addEventListener("click", () => {
        if (pagina != "curso" && able) {
            able = false;

            // Se oculta el apartado anterior
            if (pagina == "inicio") {
                quietas = true;
                document.querySelectorAll(".letra").forEach(letra => {
                    letra.style.transition = "all 3s ease";
                    letra.style.transform = `translate(${500-Math.random()*1000}px, -1000px)`;
                });
                contentInicio.style.maxHeight = "0px";
                contentInicio.style.opacity = "0";
                flecha.style.opacity = "0";
                banner.style.opacity = "0";
                inicio.classList.remove("subrayado");
            } else if (pagina == "contacto") {
                contentContacto.style.maxHeight = "0px";
                contacto.classList.remove("subrayado");
                footer.style.opacity = "0";
                setTimeout(() => {
                    loadComponent("footer", "footer.html");
                    footer.style.opacity = "1";
                }, 1000);
            } else {
                fibo.style.padding = "0rem";
                fibo.style.maxHeight = "0px";
                snake.style.padding = "0rem";
                snake.style.maxHeight = "0px";
                atardecer.style.padding = "0rem";
                atardecer.style.maxHeight = "0px";
                contentProyectos.style.maxHeight = "0px";
                contentServices.style.maxHeight = "0px";
                services.classList.remove("subrayado");
                proyectos.classList.remove("subrayado");
            }

            pagina = "curso";
            modo.style.opacity = "1";
            curso.classList.add("subrayado");
            setTimeout(() => {
                main.style.gridArea = "2 / 1 / 3 / 3";
                contentAbout.style.maxHeight = "1500px";
                able = true;
            }, 1000);
        }
    });

    services.addEventListener("click", () => {
        if (pagina != "services" && able) {
            able = false;

            // Se oculta el apartado anterior
            if (pagina == "inicio") {
                quietas = true;
                document.querySelectorAll(".letra").forEach(letra => {
                    letra.style.transition = "all 3s ease";
                    letra.style.transform = `translate(${500-Math.random()*1000}px, -1000px)`;
                });
                contentInicio.style.maxHeight = "0px";
                contentInicio.style.opacity = "0";
                flecha.style.opacity = "0";
                banner.style.opacity = "0";
                inicio.classList.remove("subrayado");
            } else if (pagina == "contacto") {
                contentContacto.style.maxHeight = "0px";
                contacto.classList.remove("subrayado");
                footer.style.opacity = "0";
                setTimeout(() => {
                    loadComponent("footer", "footer.html");
                    footer.style.opacity = "1";
                }, 1000);
            } else {
                fibo.style.padding = "0rem";
                fibo.style.maxHeight = "0px";
                snake.style.padding = "0rem";
                snake.style.maxHeight = "0px";
                atardecer.style.padding = "0rem";
                atardecer.style.maxHeight = "0px";
                contentProyectos.style.maxHeight = "0px";
                contentAbout.style.maxHeight = "0px";
                curso.classList.remove("subrayado");
                proyectos.classList.remove("subrayado");
            }

            pagina = "services";
            modo.style.opacity = "0";
            services.classList.add("subrayado");
            setTimeout(() => {
                main.style.gridArea = "2 / 1 / 3 / 3";
                contentServices.style.maxHeight = "1000px";
                able = true;
            }, 1000);
        }
    });

    proyectos.addEventListener("click", () => {
        flecha.style.opacity = "0";
        setTimeout(() => {flecha.style.display = "none";}, 1000);
        if (pagina != "proyectos" && able) {
            able = false;

            // Se oculta el apartado anterior
            if (pagina == "inicio") {
                quietas = true;
                document.querySelectorAll(".letra").forEach(letra => {
                    letra.style.transition = "all 3s ease";
                    letra.style.transform = `translate(${1000-Math.random()*2000}px, -1000px)`;
                });
                contentInicio.style.maxHeight = "0px";
                contentInicio.style.opacity = "0";
                flecha.style.opacity = "0";
                banner.style.opacity = "0";
                inicio.classList.remove("subrayado");
            } else if (pagina == "contacto") {
                contentContacto.style.maxHeight = "0px";
                contacto.classList.remove("subrayado");
                footer.style.opacity = "0";
                setTimeout(() => {
                    loadComponent("footer", "footer.html");
                    footer.style.opacity = "1";
                }, 1000);
            } else {
                contentAbout.style.maxHeight = "0px";
                contentServices.style.maxHeight = "0px";
                curso.classList.remove("subrayado");
                services.classList.remove("subrayado");
            }

            pagina = "proyectos";
            modo.style.opacity = "1";
            proyectos.classList.add("subrayado");
            setTimeout(() => {
                fibo.style.padding = "1rem";
                fibo.style.maxHeight = "430px";
                snake.style.padding = "1rem";
                snake.style.maxHeight = "430px";
                atardecer.style.padding = "1rem";
                atardecer.style.maxHeight = "430px";
                main.style.gridArea = "2 / 1 / 3 / 3";
                contentProyectos.style.maxHeight = "1550px";
                able = true;
            }, 1000);   
        }
    });

    contacto.addEventListener("click", () => {
        if (pagina != "contacto" && able) {
            able = false;

            // Se oculta el apartado anterior
            if (pagina == "inicio") {
                quietas = true;
                document.querySelectorAll(".letra").forEach(letra => {
                    letra.style.transition = "all 3s ease";
                    letra.style.transform = `translate(${500-Math.random()*1000}px, -1000px)`;
                });
                contentInicio.style.maxHeight = "0px";
                contentInicio.style.opacity = "0";
                flecha.style.opacity = "0";
                banner.style.opacity = "0";
                inicio.classList.remove("subrayado");
            } else {
                fibo.style.padding = "0rem";
                fibo.style.maxHeight = "0px";
                snake.style.padding = "0rem";
                snake.style.maxHeight = "0px";
                atardecer.style.padding = "0rem";
                atardecer.style.maxHeight = "0px";
                contentAbout.style.maxHeight = "0px";
                contentServices.style.maxHeight = "0px";
                contentProyectos.style.maxHeight = "0px";
                curso.classList.remove("subrayado");
                services.classList.remove("subrayado");
                proyectos.classList.remove("subrayado");
            }

            pagina = "contacto";
            modo.style.opacity = "1";
            footer.style.opacity = "0";     
            contacto.classList.add("subrayado");
            setTimeout(() => {
                main.style.gridArea = "2 / 1 / 3 / 3";
                contentContacto.style.maxHeight = "1000px";
                loadComponent("footer", "footerContacto.html");
                footer.style.opacity = "1";
                able = true;
            }, 1000);
        }
    });
});

loadComponent("contentAbout", "sobreMi.html");
loadComponent("contentServices", "services.html", () => {
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            const contenido = entry.target.querySelector('.slideContent');
            if (!contenido) return;

            if (entry.isIntersecting) {
            contenido.classList.add('visible');
            } else {
            contenido.classList.remove('visible');
            }
        });
    }, { threshold: 0.3 });

    document.querySelectorAll('.slide').forEach(section => {
    observer.observe(section);
    });
});

// CONTACTO
loadComponent("contentContacto", "contact.html", () => {
    const formulario = document.getElementById("formulario");
    const boton = document.getElementById("btnEnviar");
    const fechaEscrita = document.getElementById("Fecha");
    const politicas = document.getElementById("politicas");
    const alma = document.getElementById("alma");
    const precio = document.getElementById("Precio");

    let fecha;
    fechaEscrita.addEventListener("change", () => {
        fecha = new Date(fechaEscrita.value);
    });

    // ✅ Paso 1: Muestra u oculta el campo "precio del alma" y activa el botón "Enviar"
    politicas.addEventListener("change", () => {
    boton.disabled = !politicas.checked;
    if (politicas.checked) {
        alma.classList.remove("hidden");
    } else {
        alma.classList.add("hidden");
    }
    });

    // ✅ Paso 2: Completa esta función para validar todos los campos
    formulario.addEventListener("submit", function (e) {
        let mandar = true;
        
    // 🔸 Validar que nombre, apellido, fecha y email no estén vacíos
        const inputs = Array.from(document.querySelectorAll("input[name='texto']"));
        inputs.forEach(element => {
            const label = document.getElementById("label"+element.id);
            if (element.value.trim() === '') {
                label.classList.add("incompleto");
                mandar = false;
            } else {
                label.classList.remove("incompleto");
            }
        });

    // 🔸 Validar que al menos un proyecto esté marcado (usa querySelectorAll)
        if (document.querySelectorAll("form input[name='hobby']:checked").length < 1) {
            document.getElementById("labelProyecto").classList.add("incompleto");
            mandar = false;
        } else {
            document.getElementById("labelProyecto").classList.remove("incompleto");
        }


    // 🔸 Validar el precio del alma
        if (precio.value.trim() === '') {
            document.getElementById("labelPrecio").textContent = "Una pequeña donación 👉👈? (€):";
            document.getElementById("labelPrecio").classList.add("incompleto");
            mandar = false;
        } else if (precio.value.trim() < 0) {
            document.getElementById("labelPrecio").textContent = "No puedes quitarnos dinero 😡!!";
            document.getElementById("labelPrecio").classList.add("incompleto");
            mandar = false;
        } else if (precio.value.trim() > 9999) {
            document.getElementById("labelPrecio").textContent = "No aceptamos tanto dinero de una sola persona 😅";
            document.getElementById("labelPrecio").classList.add("incompleto");
            mandar = false;
        } else {
            if (precio.value.trim() == 0) {
                document.getElementById("labelPrecio").textContent = "Gracias igualmente 😔";
            }   else {
                document.getElementById("labelPrecio").textContent = "Muchas gracias por su colaboración 😊";
            }
            document.getElementById("labelPrecio").classList.remove("incompleto");
        }

    // 🔸 Si todo está correcto, mostrar alerta de éxito y reiniciar formulario
        if (mandar) {
            const hoy = new Date();
            let edad = hoy.getFullYear() - fecha.getFullYear();
            const mes = hoy.getMonth() - fecha.getMonth();
            // Si aún no ha cumplido años este año, restamos 1
            if (mes < 0 || (mes === 0 && hoy.getDate() < fecha.getDate())) {edad--;}
            if (edad < 18) {
                e.preventDefault();
                alert("No se ha podido enviar el formulario porque no podemos interactuar con menores de edad");
            } else {alert("Formulario enviado correctamente ✅\n(en verdad no existe ningún servidor que recoja esta información)");}
        } else {e.preventDefault();}
    });
});

flecha.addEventListener("click", () => {
    flecha.style.opacity = "0";
    setTimeout(() => {flecha.style.display = "none";}, 1000);
});

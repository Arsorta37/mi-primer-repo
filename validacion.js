const formulario = document.getElementById("formulario");
const boton = document.getElementById("btnEnviar");
const fechaEscrita = document.getElementById("fecha");
const leer = document.getElementById("leer");
const politicas = document.getElementById("politicas");
const otroHobbyCheck = document.getElementById("otroHobbyCheck");
const otroHobbyCampo = document.getElementById("otroHobbyCampo");
const otroHobby = document.getElementById("otroHobby");

let fecha;
fechaEscrita.addEventListener("change", () => {
    fecha = new Date(fechaEscrita.value);
});

// ✅ Paso 1: Muestra u oculta el campo "otro hobby"
otroHobbyCheck.addEventListener("change", () => {
if (otroHobbyCheck.checked) {
    otroHobbyCampo.classList.remove("hidden");
} else {
    otroHobbyCampo.classList.add("hidden");
}
});


// ✅ Paso 2: Activa o desactiva el botón "Enviar" si se acepta la política
politicas.addEventListener("change", () => {
    boton.disabled = !politicas.checked;});


// ✅ Paso 3: Completa esta función para validar todos los campos
formulario.addEventListener("submit", function (e) {
    let mandar = true;
    
// 🔸 Validar que nombre, apellido, fecha, email y contraseña no estén vacíos
    const inputs = Array.from(document.querySelectorAll("input[name='texto']"));
    inputs.forEach(element => {
        if (element.value.trim() === '') {
            mandar = false;
        }
    });

// 🔸 Validar que al menos un hobby esté marcado (usa querySelectorAll)
    if (document.querySelectorAll("form input[name='hobby']:checked").length < 1) {mandar = false;}

// 🔸 Si se ha marcado "Otro", asegúrate de que el campo de texto no esté vacío
    if (otroHobbyCheck.checked && otroHobby.value.trim() === '') {
        alert("Tienes que especificar tu hobby 'otro' si lo seleccionas.");
        mandar = false;
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
            alert("No se ha podido enviar el formulario porque no eres mayor de edad");
        } else if (18 <= edad && edad < 25 && leer.checked) {
            alert("📚 ¡Nos encanta que los jóvenes disfruten de la lectura! Formulario enviado correctamente ✅");
        } else {alert("Formulario enviado correctamente ✅");}
    } else {e.preventDefault();}
});
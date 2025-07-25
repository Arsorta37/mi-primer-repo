// Funciones de cálculo con arrays:
function sumar(a1, b2, longitud) {
    // Sumamos las <longitud> celdas:
    var resto = 0;
    for (var i = 0; i < longitud; i++) {
        var suma = a1[i] + b2[i] + resto;
        // Cada 32 bits pueden almacenar hasta 999 millones
        if (suma >= 1000000000) {
            resto = 1;
            suma -= 1000000000;
        } else {resto = 0}
        a1[i] = suma;
    }
    
    // Si hay resto al final aumentamos las celdas:
    if (resto > 0) {
        a1[longitud] = 1;
        longitud++;
    }
    return longitud;
};

// Pre: <longitud> es el número de celdas usadas por el número
//  en el vector <original>.
// Post: Se ha copiado el número almacenado en <original> en <copia>.
function asignar(original, copia, longitud) {
    for (var i = 0; i < longitud; i++) {
        copia[i] = original[i];
    }
};

// Pre: <n> es la posición del número de Fibonacci <fib>,
//  y <longitud> su número de celdas usadas.
// Post: Escribe por consola el numero <n> de Fibonacci.
function escribirConsola(fib, n, longitud) {
    // Cabecera del número:
    var vector = "(" + n + "): "

    // Escribimos el número de izquierda a derecha:
    for (var i = longitud-1; i >= 0; i--) {vector += fib[i];}
    console.log(vector);
};

// Pre: <n> es la posición del número de Fibonacci <fib>,
//  y <longitud> su número de celdas usadas.
// Post: Envía al programa principal el texto del numero <n> de Fibonacci.
function enviar(fib, n, longitud) {
    // Cabecera del número:
    var vector = "(" + n + "): "

    // Enviamos el número de izquierda a derecha:
    for (var i = longitud - 1; i >= 0; i--) {
        if (i === longitud - 1) {
            // Bloque más significativo: sin ceros a la izquierda
            vector += fib[i];
        } else {
            // Otros bloques: 9 dígitos con ceros a la izquierda
            vector += fib[i].toString().padStart(9, '0');
        }
    }

    // Envía el número al hilo principal
    postMessage([true, vector, longitud]);
};

// Pre: 0 < rep
// Post: Calcula todos los números de la serie de Fibonacci hasta el <rep>
//  número. El worker va enviando cada 1000 números el progreso,
//  y escribe todos los número o solo el último según <escTodo> (booleano).
function main(rep, escTodo){
    let aproxCifras = Math.ceil(3 + (0.2090 * rep) / 9);
    let longitudUsada = 1; // Al principio solo usamos la celda 0
    let cuenta = 0;

    // Arrays de las cuentas
    var aux = new Uint32Array(aproxCifras);
    var fib0 = new Uint32Array(aproxCifras);
    var fib1 = new Uint32Array(aproxCifras);
    fib1[0] = 1;

    // Vucle principal
    for (let i = 0; i < rep-1; i++) {
        asignar(fib1, aux, longitudUsada);
        longitudUsada = sumar(fib1, fib0, longitudUsada);
        asignar(aux, fib0, longitudUsada);
        cuenta++;

        // Escribimos todos lo números si está el check marcado
        if (escTodo) {enviar(fib0, cuenta, longitudUsada);}

        // Actualizamos la barra cada 1000 iteraciones
        if (cuenta%1000 == 0) {postMessage([false, cuenta]);}
    }

    // Último mensaje
    postMessage([false, rep]);
    enviar(fib1, rep, longitudUsada);
    console.log("Worker ha terminado con longitud", longitudUsada, "y el resultado:", fib1);
    fib0 = null; fib1 = null; aux = null; // Liberamos los arrays
};

// Funcionamiento al recibir un mensaje:
// Pre: e.data[0] es el número de Fibonacci que se quiere calcular,
//      e.data[1] indica si se va a escribir todo (true) o no (false).
onmessage = function(e) {
    console.log("Worker ha recibido:", e.data);
    main(e.data[0], e.data[1]);
};
var caja = document.getElementById("caja");

// Función principal que valida y decide cifrar o descifrar
function validarTexto(cifrar) {
    var textoOriginal = caja.value;
    var regex = /[A-ZÁÉÍÓÚÜáéíóúüý!"#$%&'()*+,-./:;<=>?@[\]^_`{|}~]/gm;
    if (textoOriginal === "") { 
        alert("No hay texto, por favor, escribe para encriptar o desencriptar.");
        porDefecto();
    } else if (regex.test(textoOriginal)) {
        alert("El texto no puede contener mayúsculas ni acentuaciones.");
        caja.value = "";
        porDefecto();
    } else {
        if (cifrar) {
            cifrarTexto(); 
        } else {
            descifrarTexto(); 
        }
    }
}

// Función para cifrar el texto
function cifrarTexto() {
    var textoOriginal = caja.value.toLowerCase();
    var textoCifrado = textoOriginal.replace(/[aeiou]/mg, function(leer){
        const lectura ={
            'a':'ai',
            'e':'enter',
            'i':'imes',
            'o':'ober',
            'u':'ufat'
        };
        return lectura[leer];
    });
    document.getElementById("textoencriptado").textContent = textoCifrado;
    caja.value = "";
    mostrarResultado();
}

// Función para mostrar el resultado
function mostrarResultado(){
    document.getElementById("defecto").style.display="none";
    document.getElementById("persona").style.display ="none";
    document.getElementById("textoencriptado").style.display ="block";
    document.getElementById("copiarResultado").style.display ="block";
}

// Función para restablecer a la configuración por defecto
function porDefecto(){
    document.getElementById("defecto").style.display="block";
    document.getElementById("persona").style.display ="block";
    document.getElementById("textoencriptado").style.display ="none";
    document.getElementById("copiarResultado").style.display ="none";
    let button = document.getElementById("copiarResultado");
    button.textContent = "Copiar";
}

// Función para descifrar el texto
function descifrarTexto() {
    var textoCifrado = caja.value.toLowerCase();
    var textoDescifrado = textoCifrado.replace(/(ai|enter|imes|ober|ufat)/mg, function(leer) {
        const lectura = {
            'ai': 'a',
            'enter': 'e',
            'imes': 'i',
            'ober': 'o',
            'ufat': 'u'
        };
        return lectura[leer];
    });
    document.getElementById("textoencriptado").textContent = textoDescifrado;
    caja.value = "";
    mostrarResultado(); 
}

// Función para copiar el texto al portapapeles
function botonCopiar(){
    let text = document.getElementById("textoencriptado");
    let button = document.getElementById("copiarResultado");

    navigator.clipboard.writeText(text.textContent)
        .then(function() {
            button.textContent = "Copiar";
            // Restablecer el juego después de copiar
            text.textContent = "";
            porDefecto();
        })
        .catch(function(err) {
            console.error('Error al copiar el texto: ', err);
        });
}
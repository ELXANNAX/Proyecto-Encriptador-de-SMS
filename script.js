document.addEventListener('DOMContentLoaded', () => {
  const caja = document.getElementById("caja");
  const textoEncriptado = document.getElementById("textoencriptado");
  const btnEncriptarEl = document.getElementById('encriptar');
  const btnDesencriptarEl = document.getElementById('desencriptar');
  const btnCopiarEl = document.getElementById('copiarResultado');

  const alfabeto = 'abcdefghijklmnopqrstuvwxyz'; // alfabeto original
  const clave = 'defghijklmnopqrstuvwxyzabc'; // algoritmo de sustitución

  const remplazar = (all) => {
    textoEncriptado.innerHTML = all;
    btnCopiarEl.style.display = "inline-block";
  };

  const soloMinusculas = (texto) => {
    return texto.toLowerCase() === texto;
  };

  const cifrar = (resultado) => {
    if (!soloMinusculas(resultado)) {
      alert('Por favor, ingrese solo texto en minúsculas.');
      return '';
    }

    let cifrado = '';

    for (let i = 0; i < resultado.length; i++) {
      const char = resultado[i];
      const indice = alfabeto.indexOf(char);

      if (indice !== -1) {
        const charCifrado = clave[indice];
        cifrado += charCifrado;
      } else {
        cifrado += char;
      }
    }

    return cifrado;
  };

  const descifrar = (resultado) => {
    if (!soloMinusculas(resultado)) {
      alert('Por favor, ingrese solo texto en minúsculas.');
      return '';
    }

    let descifrado = '';

    for (let i = 0; i < resultado.length; i++) {
      const char = resultado[i];
      const indice = clave.indexOf(char);

      if (indice !== -1) {
        const charOriginal = alfabeto[indice];
        descifrado += charOriginal;
      } else {
        descifrado += char;
      }
    }

    return descifrado;
  };

  const desencriptarYMostrar = () => {
    const texto = caja.value;
    remplazar(descifrar(texto));
  };

  btnEncriptarEl.addEventListener('click', () => {
    const texto = caja.value;
    const resultadoCifrado = cifrar(texto);

    if (resultadoCifrado !== '') {
      remplazar(resultadoCifrado);
      caja.value = ''; 
    }
  });

  btnDesencriptarEl.addEventListener('click', desencriptarYMostrar);

  btnCopiarEl.addEventListener('click', () => {
    const resultadoTexto = textoEncriptado.textContent;
    const textarea = document.createElement('textarea');
    textarea.value = resultadoTexto;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');
    document.body.removeChild(textarea);

    caja.value = '';
    textoEncriptado.innerHTML = '';
    btnCopiarEl.style.display = 'none';
    caja.focus();
  });

  textoEncriptado.addEventListener('click', desencriptarYMostrar);
});
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

  const cifrar = (resultado) => {
    let cifrado = '';

    for (let i = 0; i < resultado.length; i++) {
      const char = resultado[i].toLowerCase();
      const indice = alfabeto.indexOf(char);

      if (indice !== -1) {
        const charCifrado = clave[indice];
        cifrado += resultado[i] === resultado[i].toUpperCase() ? charCifrado.toUpperCase() : charCifrado;
      } else {
        cifrado += resultado[i];
      }
    }

    return cifrado;
  };

  const descifrar = (resultado) => {
    let descifrado = '';

    for (let i = 0; i < resultado.length; i++) {
      const char = resultado[i].toLowerCase();
      const indice = clave.indexOf(char);

      if (indice !== -1) {
        const charOriginal = alfabeto[indice];
        descifrado += resultado[i] === resultado[i].toUpperCase() ? charOriginal.toUpperCase() : charOriginal;
      } else {
        descifrado += resultado[i];
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
    remplazar(cifrar(texto));
    caja.value = ''; // reiniciar área de texto
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

    // reiniciar proceso o reemplazar valores
    caja.value = '';
    textoEncriptado.innerHTML = '';
    btnCopiarEl.style.display = 'none';
    caja.focus();
  });

  textoEncriptado.addEventListener('click', desencriptarYMostrar);
});
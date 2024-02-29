document.addEventListener('DOMContentLoaded', () => {
  const caja = document.getElementById("caja");
  const textoEncriptado = document.getElementById("textoencriptado");
  const btnEncriptarEl = document.getElementById('encriptar');
  const btnDesencriptarEl = document.getElementById('desencriptar');
  const btnCopiarEl = document.getElementById('copiarResultado');

  const codigo = [
    ["e", "enter"],
    ["o", "ober"],
    ["i", "imes"],
    ["a", "ai"],
    ["u", "ufat"],
  ];

  const remplazar = (all) => {
    textoEncriptado.innerHTML = all;
    btnCopiarEl.style.display = "inline-block";
  };

  const soloMinusculas = (texto) => {
    return texto.toLowerCase() === texto;
  };

  const aplicarCodigo = (resultado, operacion) => {
    if (!soloMinusculas(resultado)) {
      alert('Por favor, ingrese solo texto en minúsculas.');
      return '';
    }

    let resultadoTransformado = resultado;

    for (let i = 0; i < codigo.length; i++) {
      const charOriginal = codigo[i][operacion === "cifrar" ? 0 : 1];
      const charReemplazo = codigo[i][operacion === "cifrar" ? 1 : 0];
      const regex = new RegExp(charOriginal, 'g');
      resultadoTransformado = resultadoTransformado.replace(regex, charReemplazo);
    }

    return resultadoTransformado;
  };

  const encriptarYMostrar = () => {
    const texto = caja.value;
    const resultadoCifrado = aplicarCodigo(texto, "cifrar");

    if (resultadoCifrado !== '') {
      remplazar(resultadoCifrado);
      caja.value = '';
    }
  };

  const desencriptarYMostrar = () => {
    const texto = caja.value;
    const resultadoDescifrado = aplicarCodigo(texto, "descifrar");

    if (resultadoDescifrado !== '') {
      remplazar(resultadoDescifrado);
      caja.value = '';
    }
  };

  btnEncriptarEl.addEventListener('click', encriptarYMostrar);
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
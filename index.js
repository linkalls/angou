function encrypt(text, secretKey, iv) {
  const cipherText = CryptoJS.AES.encrypt(text, secretKey, {
      iv: CryptoJS.enc.Utf8.parse(iv),
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7
  });
  return cipherText.toString();
}

function decrypt(cipherText, secretKey, iv) {
  const bytes = CryptoJS.AES.decrypt(cipherText, secretKey, {
      iv: CryptoJS.enc.Utf8.parse(iv),
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7
  });
  const originalText = bytes.toString(CryptoJS.enc.Utf8);
  return originalText;
}

function convertText() {
  const inputText = document.getElementById('inputText').value;
  const operation = document.querySelector('input[name="operation"]:checked').value;
  const secretKey = 'secretangou';
  const iv = '1234567890123456'; // 16 bytes IV for AES-256-CBC

  if (operation === 'encrypt') {
      const encryptedText = encrypt(inputText, secretKey, iv);
      document.getElementById('outputText').value = encryptedText;
  } else if (operation === 'decrypt') {
      const decryptedText = decrypt(inputText, secretKey, iv);
      document.getElementById('outputText').value = decryptedText;
  } else {
      document.getElementById('outputText').value = 'Invalid operation';
  }
}

function copyToClipboard() {
  const outputText = document.getElementById('outputText');
  outputText.select();
  document.execCommand('copy');
  document.getElementById('copyMessage').textContent = 'コピーされました';
}

document.getElementById('inputText').addEventListener('input', function() {
  if (document.getElementById('realtime').checked) {
      convertText();
  }
});

document.getElementById('encryptRadio').addEventListener('change', function() {
  document.getElementById('outputText').value = '';
  if (document.getElementById('realtime').checked) {
      convertText();
  }
});

document.getElementById('decryptRadio').addEventListener('change', function() {
  document.getElementById('outputText').value = '';
  if (document.getElementById('realtime').checked) {
      convertText();
  }
});
export async function generateKeyPair() {
  const keyPair = await window.crypto.subtle.generateKey(
    {
      name: "RSA-OAEP",
      modulusLength: 2048,
      publicExponent: new Uint8Array([1, 0, 1]),
      hash: "SHA-256"
    },
    true,
    ["encrypt", "decrypt"]
  );

  const publicKeyBuffer = await window.crypto.subtle.exportKey("spki", keyPair.publicKey);
  const privateKeyBuffer = await window.crypto.subtle.exportKey("pkcs8", keyPair.privateKey);

  const publicKeyPem = convertToPEM(publicKeyBuffer, "PUBLIC KEY");
  const privateKeyPem = convertToPEM(privateKeyBuffer, "PRIVATE KEY");

  return { publicKeyPem, privateKeyPem };
}

export async function encryptWithPublicKey(pemKey, message) {
  const binaryDer = convertPemToBinary(pemKey);
  const publicKey = await window.crypto.subtle.importKey(
    "spki",
    binaryDer,
    {
      name: "RSA-OAEP",
      hash: "SHA-256"
    },
    false,
    ["encrypt"]
  );

  const encoded = new TextEncoder().encode(message);
  const encrypted = await window.crypto.subtle.encrypt({ name: "RSA-OAEP" }, publicKey, encoded);
  return btoa(String.fromCharCode(...new Uint8Array(encrypted)));
}

export async function decryptWithPrivateKey(pemKey, encryptedMessage) {
  try {
    const binaryDer = convertPemToBinary(pemKey);
    const privateKey = await window.crypto.subtle.importKey(
      "pkcs8",
      binaryDer,
      {
        name: "RSA-OAEP",
        hash: "SHA-256"
      },
      false,
      ["decrypt"]
    );

    const encryptedBuffer = Uint8Array.from(atob(encryptedMessage), c => c.charCodeAt(0));
    const decrypted = await window.crypto.subtle.decrypt({ name: "RSA-OAEP" }, privateKey, encryptedBuffer);
    return new TextDecoder().decode(decrypted);
  } catch (error) {
    throw new Error(`Decryption failed: ${error.message}`);
  }
}

function convertToPEM(buffer, label) {
  const base64 = btoa(String.fromCharCode(...new Uint8Array(buffer)));
  const lines = base64.match(/.{1,64}/g).join("\n");
  return `-----BEGIN ${label}-----\n${lines}\n-----END ${label}-----`;
}

function convertPemToBinary(pem) {
  const base64 = pem.replace(/-----.*?-----/g, '').replace(/\s/g, '');
  const binary = atob(base64);
  return new Uint8Array([...binary].map(c => c.charCodeAt(0))).buffer;
}

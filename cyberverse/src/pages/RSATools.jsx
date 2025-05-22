import React, { useState } from 'react';
import { generateKeyPair, encryptWithPublicKey } from './rsa-utils'; // We'll define this next

export default function RSATools() {
  const [activeSection, setActiveSection] = useState('encode');
  const [publicKey, setPublicKey] = useState('');
  const [message, setMessage] = useState('');
  const [ciphertext, setCiphertext] = useState('');

  const handleGenerateKeys = async () => {
    const { publicKeyPem, privateKeyPem } = await generateKeyPair();
    setPublicKey(publicKeyPem);
    localStorage.setItem('rsa_private_key', privateKeyPem);
  };

  const handleEncrypt = async () => {
    const encrypted = await encryptWithPublicKey(publicKey, message);
    setCiphertext(encrypted);
  };

  return (
    <div>
      <h2 style={headerStyle}>🔐 RSA Tools</h2>

      <div>
        <button onClick={() => setActiveSection('encode')} style={activeSection === 'encode' ? activeStyle : buttonStyle}>Encode</button>
        <button onClick={() => setActiveSection('decode')} style={activeSection === 'decode' ? activeStyle : buttonStyle}>Decode</button>
        <button onClick={() => setActiveSection('crack')} style={activeSection === 'crack' ? activeStyle : buttonStyle}>Crack</button>
      </div>

      {activeSection === 'encode' && (
        <div>
          <p className="text-light">Generate keys and encrypt a message using RSA public key.</p>
          <button onClick={handleGenerateKeys} style={buttonStyle}>Generate Key Pair</button>
          <textarea
            placeholder="RSA Public Key"
            rows="8"
            value={publicKey}
            onChange={(e) => setPublicKey(e.target.value)}
            style={textareaStyle}
          />
          <input
            type="text"
            placeholder="Enter message to encrypt"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            style={inputStyle}
          />
          <button onClick={handleEncrypt} style={buttonStyle}>Encrypt</button>
          {ciphertext && (
            <textarea
              value={ciphertext}
              readOnly
              rows="6"
              style={textareaStyle}
            />
          )}
        </div>
      )}

      {activeSection === 'decode' && <p className="text-light">Coming next...</p>}
      {activeSection === 'crack' && <p className="text-light">Coming later...</p>}
    </div>
  );
}

const headerStyle = {
  color: '#00ffe1',
  fontFamily: 'Orbitron',
  marginBottom: '10px'
};

const buttonStyle = {
  background: '#00ffe1',
  color: '#000',
  padding: '10px 20px',
  margin: '5px',
  border: 'none',
  cursor: 'pointer',
  fontFamily: 'Orbitron',
  fontSize: '1em'
};

const activeStyle = {
  ...buttonStyle,
  border: '2px solid #00ffe1',
  background: 'transparent',
  color: '#00ffe1'
};

const inputStyle = {
  display: 'block',
  width: '100%',
  padding: '10px',
  marginTop: '10px',
  backgroundColor: '#111',
  color: '#00ffe1',
  border: '1px solid #00ffe1',
  fontFamily: 'Orbitron'
};

const textareaStyle = {
  ...inputStyle,
  height: '150px',
  fontFamily: 'monospace'
};

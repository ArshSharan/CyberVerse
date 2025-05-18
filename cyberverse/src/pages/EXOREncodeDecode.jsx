import React, { useState } from 'react';

export default function XOREncoder() {
  const [inputText, setInputText] = useState('');
  const [key, setKey] = useState('');
  const [outputHex, setOutputHex] = useState('');
  const [outputASCII, setOutputASCII] = useState('');
  const [strength, setStrength] = useState('');

  const xorEncrypt = (text, key) => {
    let result = '';
    for (let i = 0; i < text.length; i++) {
      const xorValue = text.charCodeAt(i) ^ key.charCodeAt(i % key.length);
      result += String.fromCharCode(xorValue);
    }
    return result;
  };

  const handleEncode = () => {
    const xorResult = xorEncrypt(inputText, key);
    const hex = xorResult
      .split('')
      .map(char => char.charCodeAt(0).toString(16).padStart(2, '0'))
      .join(' ');
    setOutputASCII(xorResult);
    setOutputHex(hex);
    assessStrength(key);
  };

  const handleDecode = () => {
    try {
      const hexChars = inputText.split(' ').map(h => String.fromCharCode(parseInt(h, 16)));
      const hexString = hexChars.join('');
      const decoded = xorEncrypt(hexString, key);
      setOutputASCII(decoded);
      setOutputHex(inputText);
      assessStrength(key);
    } catch {
      setOutputASCII('Invalid hex input.');
      setOutputHex('');
    }
  };

  const assessStrength = key => {
    if (key.length >= 12) setStrength('🔒 Strong');
    else if (key.length >= 6) setStrength('🟡 Medium');
    else setStrength('🔓 Weak');
  };

  const handleCopy = text => {
    navigator.clipboard.writeText(text);
  };

  return (
    <div className="container text-light" style={{ fontFamily: 'Orbitron', paddingBottom: '100px' }}>
      <h2 style={{ color: '#00ffe1' }}>🧮 XOR Encoder/Decoder</h2>
      <p className="text-light">Encrypt or decrypt messages using XOR logic with a custom key.</p>

      <div className="mb-3">
        <label className="form-label">🔤 Input Text (Message or Hex for decode)</label>
        <textarea
          className="form-control"
          value={inputText}
          onChange={e => setInputText(e.target.value)}
          rows={3}
          placeholder="Enter message to encode or hex string to decode..."
        />
      </div>

      <div className="mb-3">
        <label className="form-label">🔑 XOR Key</label>
        <input
          className="form-control"
          value={key}
          onChange={e => setKey(e.target.value)}
          placeholder="Enter XOR key"
        />
      </div>

      <div className="d-flex gap-3 mb-4">
        <button
          className="btn"
          style={{ backgroundColor: '#00ffe1', color: '#000', fontWeight: 'bold' }}
          onClick={handleEncode}
        >
          🚀 Encode
        </button>
        <button
          className="btn"
          style={{ backgroundColor: '#00ffe1', color: '#000', fontWeight: 'bold' }}
          onClick={handleDecode}
        >
          🔓 Decode
        </button>
      </div>

      {outputHex && (
        <div className="mt-4">
          <div
            style={{
              background: 'rgba(0, 0, 0, 0.6)',
              border: '2px solid #00ffe1',
              borderRadius: '8px',
              padding: '20px',
              fontFamily: 'Courier New, monospace',
              color: '#00ffe1',
              marginBottom: '20px',
            }}
          >
            <h5 style={{ marginBottom: '10px', color: '#00ffe1' }}>🔡 XOR Output (Hexadecimal)</h5>
            <div style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap' }}>
              <div style={{ flex: '1', wordWrap: 'break-word' }}>{outputHex}</div>
              <button
                className="btn btn-sm ms-3 mt-2"
                onClick={() => handleCopy(outputHex)}
                style={{
                  backgroundColor: '#00ffe1',
                  color: '#000',
                  fontWeight: 'bold',
                  border: 'none',
                }}
              >
                📋 Copy
              </button>
            </div>
          </div>

          <div
            style={{
              background: 'rgba(0, 0, 0, 0.6)',
              border: '2px solid #00ffe1',
              borderRadius: '8px',
              padding: '20px',
              fontFamily: 'Courier New, monospace',
              color: '#00ffe1',
              marginBottom: '20px',
            }}
          >
            <h5 style={{ marginBottom: '10px', color: '#00ffe1' }}>🅰️ XOR Output (ASCII)</h5>
            <div style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap' }}>
              <div style={{ flex: '1', wordWrap: 'break-word' }}>{outputASCII}</div>
              <button
                className="btn btn-sm ms-3 mt-2"
                onClick={() => handleCopy(outputASCII)}
                style={{
                  backgroundColor: '#00ffe1',
                  color: '#000',
                  fontWeight: 'bold',
                  border: 'none',
                }}
              >
                📋 Copy
              </button>
            </div>
          </div>

          <div
            style={{
              background: 'rgba(0, 0, 0, 0.5)',
              border: '1px solid #00ffe155',
              borderRadius: '6px',
              padding: '10px 15px',
              color: '#eee',
              fontSize: '0.95em',
              textAlign: 'center',
              marginTop: '10px',
            }}
          >
            <strong style={{ color: '#00ffe1' }}>Encryption Strength:</strong> {strength}
          </div>
        </div>
      )}
    </div>
  );
}

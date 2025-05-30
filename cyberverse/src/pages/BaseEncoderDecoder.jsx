import React, { useState } from 'react';
import { Buffer } from 'buffer';

export default function BaseEncoderDecoder() {
  const [input, setInput] = useState('');
  const [mode, setMode] = useState('encode');
  const [baseType, setBaseType] = useState('base64');
  const [output, setOutput] = useState('');
  const [copied, setCopied] = useState(false);

  const handleConvert = () => {
    try {
      let result = '';
      const buffer = Buffer.from(input, mode === 'encode' ? 'utf8' : baseType);
      if (mode === 'encode') {
        result = buffer.toString(baseType);
      } else {
        result = buffer.toString('utf8');
      }
      setOutput(result);
      navigator.clipboard.writeText(result);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      setOutput('⚠️ Invalid input for selected base/operation.');
    }
  };

  return (
    <div style={{
      fontFamily: 'Orbitron, sans-serif',
      color: '#00ffe1',
      backgroundColor: '#0a0a0a',
      padding: '20px',
      borderRadius: '12px',
      boxShadow: '0 0 12px #00ffe1'
    }}>
      <h2 style={{ color: '#00ffe1' }}>🔐 Base Encoder/Decoder</h2>
      <p style={{ color: '#ccc' }}>
        Convert text using <strong>Base64</strong>, <strong>Base32</strong>, <strong>Base16</strong>, or <strong>Base85</strong>.
        Automatically copies result to clipboard.
      </p>

      <textarea
        placeholder="Enter your text here..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
        style={{
          width: '100%',
          height: '120px',
          padding: '10px',
          borderRadius: '8px',
          backgroundColor: '#111',
          color: '#0ff',
          border: '1px solid #00ffe1',
          fontFamily: 'monospace',
          resize: 'none',
          marginBottom: '16px'
        }}
      />

      <div style={{ display: 'flex', gap: '10px', marginBottom: '12px' }}>
        <select
          value={mode}
          onChange={(e) => setMode(e.target.value)}
          style={dropdownStyle}
        >
          <option value="encode">Encode</option>
          <option value="decode">Decode</option>
        </select>

        <select
          value={baseType}
          onChange={(e) => setBaseType(e.target.value)}
          style={dropdownStyle}
        >
          <option value="base64">Base64</option>
          <option value="base32">Base32</option>
          <option value="base16">Base16</option>
          <option value="base85">Base85</option>
        </select>

        <button
          onClick={handleConvert}
          style={{
            ...buttonStyle,
            backgroundColor: '#00ffe1',
            color: '#000',
            fontWeight: 'bold'
          }}
        >
          {mode === 'encode' ? 'Encode 🔐' : 'Decode 🔓'}
        </button>
      </div>

      <div>
        <label style={{ color: '#999' }}>Output (auto-copied):</label>
        <textarea
          readOnly
          value={output}
          style={{
            width: '100%',
            height: '120px',
            padding: '10px',
            borderRadius: '8px',
            backgroundColor: '#111',
            color: '#0ff',
            border: '1px solid #00ffe1',
            fontFamily: 'monospace',
            resize: 'none'
          }}
        />
        {copied && (
          <div style={{ color: '#0f0', marginTop: '5px' }}>✅ Copied to clipboard!</div>
        )}
      </div>
    </div>
  );
}

const dropdownStyle = {
  padding: '10px',
  backgroundColor: '#111',
  color: '#00ffe1',
  border: '1px solid #00ffe1',
  borderRadius: '6px',
  fontFamily: 'Orbitron',
  fontSize: '0.9em'
};

const buttonStyle = {
  padding: '10px 16px',
  border: 'none',
  borderRadius: '6px',
  cursor: 'pointer',
  fontFamily: 'Orbitron',
  transition: 'all 0.3s'
};

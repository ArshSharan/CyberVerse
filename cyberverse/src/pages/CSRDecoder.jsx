import React, { useState } from 'react';
import * as asn1js from 'asn1js';
import * as pkijs from 'pkijs';

export default function CSRDecoder() {
  const [csrInfo, setCsrInfo] = useState(null);
  const [error, setError] = useState('');

  const handleCSRInput = async (e) => {
    setError('');
    setCsrInfo(null);
    try {
      const text = await e.target.files[0].text();
      const base64 = text
        .replace(/-----BEGIN CERTIFICATE REQUEST-----/, '')
        .replace(/-----END CERTIFICATE REQUEST-----/, '')
        .replace(/\s/g, '');
      const raw = window.atob(base64);
      const arrayBuffer = new Uint8Array([...raw].map(c => c.charCodeAt(0))).buffer;

      const asn1 = asn1js.fromBER(arrayBuffer);
      if (asn1.offset === -1) throw new Error('Failed to parse CSR');

      const csr = new pkijs.CertificationRequest({ schema: asn1.result });

      const subject = csr.subject.typesAndValues.map(tv => ({
        type: tv.type,
        value: tv.value.valueBlock.value
      }));

      setCsrInfo({
        subject,
        publicKeyAlgorithm: csr.subjectPublicKeyInfo.algorithm.algorithmId,
        signatureAlgorithm: csr.signatureAlgorithm.algorithmId
      });
    } catch (err) {
      console.error(err);
      setError('Failed to decode CSR. Make sure it is a valid PEM.');
    }
  };

  return (
    <div>
      <h2 style={{ color: '#00ffe1', fontFamily: 'Orbitron' }}>🔐 CSR Decoder</h2>
      <p className="text-light">Upload a Certificate Signing Request (.csr) to decode its contents.</p>
      
      <input
        type="file"
        accept=".csr,.pem"
        onChange={handleCSRInput}
        style={{ backgroundColor: '#000', color: '#00ffe1', border: '1px solid #00ffe1', padding: '10px', borderRadius: '5px' }}
      />

      {error && <p style={{ color: 'red' }}>{error}</p>}

      {csrInfo && (
        <div style={{ marginTop: '20px', color: '#fff' }}>
          <h4 style={{ color: '#00ffe1' }}>👤 Subject Info:</h4>
          <ul>
            {csrInfo.subject.map((item, idx) => (
              <li key={idx}><strong>{item.type}</strong>: {item.value}</li>
            ))}
          </ul>
          <p><strong>🔑 Public Key Algorithm:</strong> {csrInfo.publicKeyAlgorithm}</p>
          <p><strong>🖊 Signature Algorithm:</strong> {csrInfo.signatureAlgorithm}</p>
        </div>
      )}
    </div>
  );
}

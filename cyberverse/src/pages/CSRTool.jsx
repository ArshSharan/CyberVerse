import React, { useState } from 'react';
import * as asn1js from 'asn1js';
import * as pkijs from 'pkijs';

export default function CSRTool() {
  const [mode, setMode] = useState('Decode');
  const [csrInfo, setCsrInfo] = useState(null);
  const [error, setError] = useState('');
  const [subjectInfo, setSubjectInfo] = useState({ CN: '', O: '', OU: '', C: '' });

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

  const handleEncode = async () => {
    const crypto = window.crypto || window.msCrypto;
    const keyPair = await crypto.subtle.generateKey(
      { name: "RSASSA-PKCS1-v1_5", modulusLength: 2048, publicExponent: new Uint8Array([1, 0, 1]), hash: "SHA-256" },
      true,
      ["sign", "verify"]
    );

    const csr = new pkijs.CertificationRequest();
    csr.version = 0;
    csr.subject.typesAndValues = [];

    const { CN, O, OU, C } = subjectInfo;

    if (CN) csr.subject.typesAndValues.push(new pkijs.AttributeTypeAndValue({ type: "2.5.4.3", value: new asn1js.Utf8String({ value: CN }) }));
    if (O) csr.subject.typesAndValues.push(new pkijs.AttributeTypeAndValue({ type: "2.5.4.10", value: new asn1js.Utf8String({ value: O }) }));
    if (OU) csr.subject.typesAndValues.push(new pkijs.AttributeTypeAndValue({ type: "2.5.4.11", value: new asn1js.Utf8String({ value: OU }) }));
    if (C) csr.subject.typesAndValues.push(new pkijs.AttributeTypeAndValue({ type: "2.5.4.6", value: new asn1js.PrintableString({ value: C }) }));

    await csr.subjectPublicKeyInfo.importKey(keyPair.publicKey);
    await csr.sign(keyPair.privateKey, "SHA-256");

    const csrDer = csr.toSchema().toBER(false);
    const pemBody = window.btoa(String.fromCharCode(...new Uint8Array(csrDer)));
    const pemCSR = `-----BEGIN CERTIFICATE REQUEST-----\n${pemBody.match(/.{1,64}/g).join("\n")}\n-----END CERTIFICATE REQUEST-----`;

    const blob = new Blob([pemCSR], { type: 'application/x-pem-file' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'csr.pem';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div>
      <h2 style={{ color: '#00ffe1', fontFamily: 'Orbitron' }}>📄 CSR Encoder & Decoder</h2>

      <div style={{ marginBottom: '20px' }}>
        <button onClick={() => setMode('Encode')} style={mode === 'Encode' ? activeStyle : buttonStyle}>CSR Encode</button>
        <button onClick={() => setMode('Decode')} style={mode === 'Decode' ? activeStyle : buttonStyle}>CSR Decode</button>
      </div>

      {mode === 'Decode' && (
        <div>
          <p className="text-light" style={{ color: '#ccc' }}>
            Upload a Certificate Signing Request (.csr or .pem) to decode its contents.
          </p>
          <input
            type="file"
            accept=".csr,.pem"
            onChange={handleCSRInput}
            style={{
              backgroundColor: '#000',
              color: '#00ffe1',
              border: '1px solid #00ffe1',
              padding: '10px',
              borderRadius: '5px',
              fontFamily: 'Orbitron',
              marginTop: '10px'
            }}
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
      )}

      {mode === 'Encode' && (
        <div>
          <input placeholder="Common Name (CN)" value={subjectInfo.CN} onChange={(e) => setSubjectInfo({ ...subjectInfo, CN: e.target.value })} style={inputStyle} />
          <input placeholder="Organization (O)" value={subjectInfo.O} onChange={(e) => setSubjectInfo({ ...subjectInfo, O: e.target.value })} style={inputStyle} />
          <input placeholder="Organizational Unit (OU)" value={subjectInfo.OU} onChange={(e) => setSubjectInfo({ ...subjectInfo, OU: e.target.value })} style={inputStyle} />
          <input placeholder="Country (C)" value={subjectInfo.C} onChange={(e) => setSubjectInfo({ ...subjectInfo, C: e.target.value })} style={inputStyle} />
          <button onClick={handleEncode} style={buttonStyle}>Generate & Download CSR</button>
        </div>
      )}
    </div>
  );
}

const buttonStyle = {
  background: '#00ffe1',
  color: '#000',
  padding: '10px 20px',
  border: 'none',
  margin: '10px',
  cursor: 'pointer',
  fontFamily: 'Orbitron',
  fontSize: '1em',
};

const activeStyle = {
  ...buttonStyle,
  border: '2px solid #00ffe1',
  background: 'transparent',
  color: '#00ffe1'
};

const inputStyle = {
  display: 'block',
  margin: '10px 0',
  padding: '10px',
  width: '100%',
  fontFamily: 'Orbitron',
  backgroundColor: '#111',
  color: '#00ffe1',
  border: '1px solid #00ffe1'
};

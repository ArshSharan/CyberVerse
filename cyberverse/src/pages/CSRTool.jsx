import React, { useState } from 'react';
import { motion } from 'framer-motion';
import * as asn1js from 'asn1js';
import * as pkijs from 'pkijs';
import { 
  FaCertificate,
  FaKey,
  FaDownload,
  FaUpload,
  FaFileCode,
  FaShieldAlt,
  FaCheckCircle,
  FaExclamationTriangle,
  FaCopy,
  FaUserShield,
  FaGlobe
} from "react-icons/fa";
import { 
  HiOutlineSparkles
} from "react-icons/hi";
import { 
  RiSecurePaymentLine,
  RiFileShield2Line
} from "react-icons/ri";

export default function CSRTool() {
  const [mode, setMode] = useState('Decode');
  const [csrInfo, setCsrInfo] = useState(null);
  const [error, setError] = useState('');
  const [subjectInfo, setSubjectInfo] = useState({ CN: '', O: '', OU: '', C: '' });
  const [copied, setCopied] = useState(false);
  const [processing, setProcessing] = useState(false);

  const handleCSRInput = async (e) => {
    setError('');
    setCsrInfo(null);
    setProcessing(true);
    
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
      setError('Failed to decode CSR. Ensure the file is a valid PEM format.');
    } finally {
      setProcessing(false);
    }
  };

  const handleEncode = async () => {
    setProcessing(true);
    try {
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
      a.download = 'CertificateSigningRequest.csr';
      a.click();
      URL.revokeObjectURL(url);
    } catch (err) {
      setError('Failed to generate CSR. Please check your input.');
    } finally {
      setProcessing(false);
    }
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const cryptoFeatures = [
    {
      icon: <RiSecurePaymentLine size={20} />,
      title: "Certificate Signing Request",
      description: "Generate and decode CSR files for SSL/TLS certificates",
      color: "#00ffe1"
    },
    {
      icon: <FaKey size={20} />,
      title: "RSA Key Generation",
      description: "2048-bit RSA key pairs with SHA-256 signature algorithm",
      color: "#ff6b6b"
    },
    {
      icon: <FaShieldAlt size={20} />,
      title: "PKI Standards",
      description: "PKCS#10 compliant certificate request format",
      color: "#4ecdc4"
    }
  ];

  const capabilities = [
    { name: "Key Size", value: "RSA 2048-bit", icon: <FaKey size={14} /> },
    { name: "Hash Algorithm", value: "SHA-256", icon: <FaShieldAlt size={14} /> },
    { name: "Format", value: "PKCS#10 PEM", icon: <FaFileCode size={14} /> },
    { name: "Standards", value: "X.509, RFC 2986", icon: <RiFileShield2Line size={14} /> },
  ];

  return (
    <div className="csr-container">
      {/* Hero Header */}
      <motion.div 
        className="hero-header"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <div className="hero-content">
          <div className="icon-wrapper">
            <FaCertificate size={48} />
          </div>
          <h1 className="page-title">CSR TOOL</h1>
          <p className="page-subtitle">
            Professional Certificate Signing Request generator and decoder for PKI infrastructure
          </p>
          <div className="tech-badges">
            <div className="tech-badge">
              <FaCertificate size={16} />
              <span>X.509 CERTIFICATES</span>
            </div>
            <div className="tech-badge">
              <FaShieldAlt size={16} />
              <span>PKI INFRASTRUCTURE</span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Crypto Features */}
      <motion.section 
        className="features-section"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.8 }}
      >
        <h2 className="section-title">Certificate Management</h2>
        <div className="features-grid">
          {cryptoFeatures.map((feature, index) => (
            <motion.div
              key={index}
              className="feature-card"
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5 + index * 0.1, duration: 0.6 }}
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
            >
              <div className="feature-icon" style={{ color: feature.color }}>
                {feature.icon}
              </div>
              <h3 className="feature-title">{feature.title}</h3>
              <p className="feature-description">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Technical Capabilities */}
      <motion.section 
        className="capabilities-section"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6, duration: 0.8 }}
      >
        <h3 className="capabilities-title">Technical Specifications</h3>
        <div className="specs-grid">
          {capabilities.map((cap, index) => (
            <motion.div
              key={index}
              className="spec-item"
              initial={{ x: -30, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.8 + index * 0.1, duration: 0.5 }}
            >
              <div className="spec-icon">{cap.icon}</div>
              <div className="spec-content">
                <h4 className="spec-name">{cap.name}</h4>
                <p className="spec-value">{cap.value}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* CSR Tool Interface */}
      <motion.section 
        className="tool-section"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 0.8 }}
      >
        <div className="tool-header">
          <h2 className="tool-title">Certificate Request Engine</h2>
          <div className="tool-status">
            <div className="status-indicator"></div>
            <span>PKI READY</span>
          </div>
        </div>

        <div className="tool-interface">
          {/* Mode Selection */}
          <div className="mode-selection">
            <motion.button
              className={`mode-btn ${mode === 'Decode' ? 'active' : ''}`}
              onClick={() => setMode('Decode')}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <FaFileCode size={16} />
              DECODE CSR
            </motion.button>
            <motion.button
              className={`mode-btn ${mode === 'Encode' ? 'active' : ''}`}
              onClick={() => setMode('Encode')}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <FaCertificate size={16} />
              GENERATE CSR
            </motion.button>
          </div>

          {/* Decode Mode */}
          {mode === 'Decode' && (
            <motion.div 
              className="decode-section"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="upload-section">
                <h3 className="section-subtitle">
                  <FaUpload size={16} />
                  Upload Certificate Signing Request
                </h3>
                <p className="section-description">
                  Upload a CSR file (.csr or .pem) to decode and analyze its contents
                </p>
                <div className="file-upload">
                  <input
                    type="file"
                    accept=".csr,.pem"
                    onChange={handleCSRInput}
                    className="file-input"
                    id="csr-upload"
                  />
                  <label htmlFor="csr-upload" className="file-label">
                    <FaUpload size={20} />
                    <span>Choose CSR File</span>
                  </label>
                </div>

                {processing && (
                  <div className="processing-indicator">
                    <div className="spinner"></div>
                    <span>Processing CSR...</span>
                  </div>
                )}

                {error && (
                  <div className="error-message">
                    <FaExclamationTriangle size={16} />
                    <span>{error}</span>
                  </div>
                )}

                {csrInfo && (
                  <motion.div 
                    className="csr-results"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                  >
                    <div className="results-header">
                      <h4 className="results-title">
                        <FaCheckCircle size={16} />
                        CSR Analysis Results
                      </h4>
                      <motion.button
                        className="copy-results-btn"
                        onClick={() => copyToClipboard(JSON.stringify(csrInfo, null, 2))}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        {copied ? <FaCheckCircle size={16} /> : <FaCopy size={16} />}
                      </motion.button>
                    </div>

                    <div className="subject-info">
                      <h5 className="info-title">
                        <FaUserShield size={16} />
                        Subject Information
                      </h5>
                      <div className="subject-list">
                        {csrInfo.subject.map((item, idx) => (
                          <div key={idx} className="subject-item">
                            <span className="subject-type">{item.type}</span>
                            <span className="subject-value">{item.value}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="algorithm-info">
                      <div className="algorithm-item">
                        <FaKey size={16} />
                        <div>
                          <span className="algorithm-label">Public Key Algorithm</span>
                          <span className="algorithm-value">{csrInfo.publicKeyAlgorithm}</span>
                        </div>
                      </div>
                      <div className="algorithm-item">
                        <FaShieldAlt size={16} />
                        <div>
                          <span className="algorithm-label">Signature Algorithm</span>
                          <span className="algorithm-value">{csrInfo.signatureAlgorithm}</span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </div>
            </motion.div>
          )}

          {/* Encode Mode */}
          {mode === 'Encode' && (
            <motion.div 
              className="encode-section"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h3 className="section-subtitle">
                <FaCertificate size={16} />
                Generate Certificate Signing Request
              </h3>
              <p className="section-description">
                Fill in the subject information to generate a new CSR with RSA-2048 key pair
              </p>

              <div className="form-grid">
                <div className="input-group">
                  <label className="input-label">
                    <FaGlobe size={14} />
                    Common Name (CN)
                  </label>
                  <input
                    className="input-field"
                    placeholder="example.com"
                    value={subjectInfo.CN}
                    onChange={(e) => setSubjectInfo({ ...subjectInfo, CN: e.target.value })}
                  />
                </div>

                <div className="input-group">
                  <label className="input-label">
                    <FaUserShield size={14} />
                    Organization (O)
                  </label>
                  <input
                    className="input-field"
                    placeholder="Your Organization"
                    value={subjectInfo.O}
                    onChange={(e) => setSubjectInfo({ ...subjectInfo, O: e.target.value })}
                  />
                </div>

                <div className="input-group">
                  <label className="input-label">
                    <HiOutlineSparkles size={14} />
                    Organizational Unit (OU)
                  </label>
                  <input
                    className="input-field"
                    placeholder="IT Department"
                    value={subjectInfo.OU}
                    onChange={(e) => setSubjectInfo({ ...subjectInfo, OU: e.target.value })}
                  />
                </div>

                <div className="input-group">
                  <label className="input-label">
                    <FaGlobe size={14} />
                    Country Code (C)
                  </label>
                  <input
                    className="input-field"
                    placeholder="US"
                    maxLength="2"
                    value={subjectInfo.C}
                    onChange={(e) => setSubjectInfo({ ...subjectInfo, C: e.target.value.toUpperCase() })}
                  />
                </div>
              </div>

              <motion.button
                className="generate-btn"
                onClick={handleEncode}
                disabled={processing || !subjectInfo.CN}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {processing ? (
                  <>
                    <div className="btn-spinner"></div>
                    <span>Generating...</span>
                  </>
                ) : (
                  <>
                    <FaDownload size={16} />
                    <span>Generate & Download CSR</span>
                  </>
                )}
              </motion.button>
            </motion.div>
          )}
        </div>
      </motion.section>

      <style jsx>{`
        .csr-container {
          min-height: 100vh;
          background: 
            radial-gradient(ellipse at top, rgba(0, 255, 225, 0.02) 0%, transparent 70%),
            radial-gradient(ellipse at bottom, rgba(255, 107, 107, 0.01) 0%, transparent 70%),
            linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 100%);
          padding: 2rem;
          color: #ffffff;
        }

        /* Hero Header */
        .hero-header {
          text-align: center;
          padding: 3rem 0 4rem;
          max-width: 900px;
          margin: 0 auto;
        }

        .icon-wrapper {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 80px;
          height: 80px;
          background: rgba(0, 255, 225, 0.1);
          border: 2px solid rgba(0, 255, 225, 0.3);
          border-radius: 20px;
          color: #00ffe1;
          margin-bottom: 2rem;
        }

        .page-title {
          font-family: 'Space Grotesk', sans-serif;
          font-size: clamp(2.5rem, 5vw, 3.5rem);
          font-weight: 800;
          margin: 0 0 1rem 0;
          letter-spacing: -0.025em;
          background: linear-gradient(135deg, #ffffff 0%, #00ffe1 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .page-subtitle {
          font-family: 'Inter', sans-serif;
          font-size: 1.2rem;
          color: rgba(255, 255, 255, 0.8);
          margin-bottom: 2rem;
          line-height: 1.6;
          max-width: 700px;
          margin-left: auto;
          margin-right: auto;
        }

        .tech-badges {
          display: flex;
          justify-content: center;
          gap: 1rem;
          flex-wrap: wrap;
        }

        .tech-badge {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          background: rgba(0, 255, 225, 0.1);
          color: #00ffe1;
          padding: 0.6rem 1.2rem;
          border-radius: 25px;
          border: 1px solid rgba(0, 255, 225, 0.3);
          font-family: 'JetBrains Mono', monospace;
          font-size: 0.8rem;
          font-weight: 600;
          letter-spacing: 0.05em;
        }

        /* Features Section */
        .features-section {
          max-width: 1200px;
          margin: 0 auto 4rem;
        }

        .section-title {
          font-family: 'Space Grotesk', sans-serif;
          font-size: 2rem;
          font-weight: 700;
          text-align: center;
          margin-bottom: 3rem;
          color: #ffffff;
          letter-spacing: -0.025em;
        }

        .features-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 2rem;
        }

        .feature-card {
          background: rgba(255, 255, 255, 0.02);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 16px;
          padding: 2rem;
          text-align: center;
          transition: all 0.3s ease;
          cursor: pointer;
        }

        .feature-card:hover {
          border-color: rgba(0, 255, 225, 0.3);
          background: rgba(255, 255, 255, 0.05);
        }

        .feature-icon {
          font-size: 2rem;
          margin-bottom: 1.5rem;
        }

        .feature-title {
          font-family: 'Space Grotesk', sans-serif;
          font-size: 1.3rem;
          font-weight: 600;
          margin: 0 0 1rem 0;
          color: #ffffff;
        }

        .feature-description {
          font-family: 'Inter', sans-serif;
          color: rgba(255, 255, 255, 0.7);
          line-height: 1.6;
          margin: 0;
        }

        /* Capabilities Section */
        .capabilities-section {
          max-width: 1000px;
          margin: 0 auto 4rem;
          background: rgba(255, 255, 255, 0.02);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 16px;
          padding: 2rem;
        }

        .capabilities-title {
          font-family: 'Space Grotesk', sans-serif;
          font-size: 1.4rem;
          font-weight: 600;
          margin: 0 0 2rem 0;
          color: #ffffff;
          text-align: center;
        }

        .specs-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
          gap: 1rem;
        }

        .spec-item {
          display: flex;
          align-items: center;
          gap: 1rem;
          background: rgba(0, 255, 225, 0.03);
          border: 1px solid rgba(0, 255, 225, 0.1);
          border-radius: 12px;
          padding: 1rem;
          transition: all 0.3s ease;
        }

        .spec-item:hover {
          border-color: rgba(0, 255, 225, 0.3);
          background: rgba(0, 255, 225, 0.05);
        }

        .spec-icon {
          color: #00ffe1;
          font-size: 1.2rem;
          flex-shrink: 0;
        }

        .spec-content {
          flex: 1;
        }

        .spec-name {
          font-family: 'Space Grotesk', sans-serif;
          font-size: 0.9rem;
          font-weight: 600;
          margin: 0 0 0.3rem 0;
          color: #ffffff;
        }

        .spec-value {
          font-family: 'JetBrains Mono', monospace;
          font-size: 0.8rem;
          color: rgba(255, 255, 255, 0.7);
          margin: 0;
        }

        /* Tool Section */
        .tool-section {
          max-width: 1200px;
          margin: 0 auto;
        }

        .tool-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 2rem;
          flex-wrap: wrap;
          gap: 1rem;
        }

        .tool-title {
          font-family: 'Space Grotesk', sans-serif;
          font-size: 1.8rem;
          font-weight: 700;
          margin: 0;
          color: #ffffff;
        }

        .tool-status {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-family: 'JetBrains Mono', monospace;
          font-size: 0.8rem;
          color: #00ffe1;
          font-weight: 600;
        }

        .status-indicator {
          width: 8px;
          height: 8px;
          background: #00ffe1;
          border-radius: 50%;
          animation: pulse 2s infinite;
        }

        .tool-interface {
          background: rgba(255, 255, 255, 0.02);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 16px;
          padding: 2rem;
          backdrop-filter: blur(10px);
        }

        .mode-selection {
          display: flex;
          gap: 1rem;
          justify-content: center;
          margin-bottom: 2rem;
        }

        .mode-btn {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 8px;
          color: rgba(255, 255, 255, 0.8);
          padding: 0.8rem 1.5rem;
          font-family: 'Space Grotesk', sans-serif;
          font-weight: 600;
          font-size: 0.9rem;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .mode-btn.active {
          background: linear-gradient(135deg, #00ffe1 0%, #0080ff 100%);
          color: #000;
          border-color: transparent;
        }

        .mode-btn:hover:not(.active) {
          border-color: rgba(0, 255, 225, 0.3);
          background: rgba(0, 255, 225, 0.05);
        }

        .decode-section, .encode-section {
          min-height: 400px;
        }

        .section-subtitle {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-family: 'Space Grotesk', sans-serif;
          font-size: 1.3rem;
          font-weight: 600;
          color: #ffffff;
          margin-bottom: 1rem;
        }

        .section-description {
          font-family: 'Inter', sans-serif;
          color: rgba(255, 255, 255, 0.7);
          margin-bottom: 2rem;
          line-height: 1.6;
        }

        .file-upload {
          margin-bottom: 2rem;
        }

        .file-input {
          display: none;
        }

        .file-label {
          display: inline-flex;
          align-items: center;
          gap: 0.8rem;
          background: rgba(0, 255, 225, 0.1);
          border: 2px dashed rgba(0, 255, 225, 0.3);
          border-radius: 12px;
          color: #00ffe1;
          padding: 2rem 3rem;
          font-family: 'Space Grotesk', sans-serif;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          text-align: center;
          width: 100%;
          justify-content: center;
        }

        .file-label:hover {
          border-color: rgba(0, 255, 225, 0.6);
          background: rgba(0, 255, 225, 0.15);
        }

        .processing-indicator {
          display: flex;
          align-items: center;
          gap: 1rem;
          background: rgba(255, 193, 7, 0.1);
          border: 1px solid rgba(255, 193, 7, 0.3);
          border-radius: 8px;
          padding: 1rem;
          color: #ffc107;
          font-family: 'JetBrains Mono', monospace;
          font-weight: 600;
          margin-bottom: 1rem;
        }

        .spinner {
          width: 16px;
          height: 16px;
          border: 2px solid rgba(255, 193, 7, 0.3);
          border-top: 2px solid #ffc107;
          border-radius: 50%;
          animation: spin 1s linear infinite;
        }

        .error-message {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          background: rgba(220, 53, 69, 0.1);
          border: 1px solid rgba(220, 53, 69, 0.3);
          border-radius: 8px;
          padding: 1rem;
          color: #dc3545;
          font-family: 'Inter', sans-serif;
          margin-bottom: 1rem;
        }

        .csr-results {
          background: rgba(0, 0, 0, 0.3);
          border: 1px solid rgba(0, 255, 225, 0.2);
          border-radius: 12px;
          padding: 1.5rem;
          margin-top: 2rem;
        }

        .results-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 1.5rem;
        }

        .results-title {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-family: 'Space Grotesk', sans-serif;
          font-size: 1.1rem;
          font-weight: 600;
          color: #00ffe1;
          margin: 0;
        }

        .copy-results-btn {
          background: rgba(0, 255, 225, 0.1);
          border: 1px solid rgba(0, 255, 225, 0.3);
          border-radius: 6px;
          color: #00ffe1;
          padding: 0.5rem;
          cursor: pointer;
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .copy-results-btn:hover {
          background: rgba(0, 255, 225, 0.2);
        }

        .subject-info {
          margin-bottom: 1.5rem;
        }

        .info-title {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-family: 'Space Grotesk', sans-serif;
          font-size: 1rem;
          font-weight: 600;
          color: #ffffff;
          margin: 0 0 1rem 0;
        }

        .subject-list {
          display: grid;
          gap: 0.5rem;
        }

        .subject-item {
          display: flex;
          align-items: center;
          justify-content: space-between;
          background: rgba(255, 255, 255, 0.03);
          border-radius: 6px;
          padding: 0.8rem;
        }

        .subject-type {
          font-family: 'JetBrains Mono', monospace;
          font-size: 0.8rem;
          color: #00ffe1;
          font-weight: 600;
        }

        .subject-value {
          font-family: 'Inter', sans-serif;
          color: rgba(255, 255, 255, 0.9);
        }

        .algorithm-info {
          display: grid;
          gap: 1rem;
        }

        .algorithm-item {
          display: flex;
          align-items: center;
          gap: 1rem;
          background: rgba(255, 255, 255, 0.03);
          border-radius: 8px;
          padding: 1rem;
          color: #00ffe1;
        }

        .algorithm-label {
          font-family: 'Space Grotesk', sans-serif;
          font-size: 0.9rem;
          font-weight: 600;
          color: #ffffff;
          display: block;
        }

        .algorithm-value {
          font-family: 'JetBrains Mono', monospace;
          font-size: 0.8rem;
          color: rgba(255, 255, 255, 0.7);
          display: block;
        }

        .form-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 1.5rem;
          margin-bottom: 2rem;
        }

        .input-group {
          display: flex;
          flex-direction: column;
        }

        .input-label {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-family: 'Space Grotesk', sans-serif;
          font-size: 0.9rem;
          font-weight: 600;
          color: #00ffe1;
          margin-bottom: 0.5rem;
        }

        .input-field {
          background: rgba(0, 0, 0, 0.3);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 8px;
          color: #ffffff;
          font-family: 'Inter', sans-serif;
          font-size: 0.9rem;
          padding: 0.8rem;
          transition: all 0.3s ease;
        }

        .input-field:focus {
          outline: none;
          border-color: rgba(0, 255, 225, 0.5);
          background: rgba(0, 0, 0, 0.5);
          box-shadow: 0 0 0 2px rgba(0, 255, 225, 0.1);
        }

        .input-field::placeholder {
          color: rgba(255, 255, 255, 0.4);
        }

        .generate-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.8rem;
          background: linear-gradient(135deg, #00ffe1 0%, #0080ff 100%);
          border: none;
          border-radius: 12px;
          color: #000;
          font-family: 'Space Grotesk', sans-serif;
          font-weight: 700;
          font-size: 1rem;
          padding: 1rem 2rem;
          cursor: pointer;
          transition: all 0.3s ease;
          width: 100%;
          max-width: 300px;
          margin: 0 auto;
          box-shadow: 0 4px 15px rgba(0, 255, 225, 0.3);
        }

        .generate-btn:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(0, 255, 225, 0.4);
        }

        .generate-btn:disabled {
          opacity: 0.5;
          cursor: not-allowed;
          transform: none;
        }

        .btn-spinner {
          width: 16px;
          height: 16px;
          border: 2px solid rgba(0, 0, 0, 0.3);
          border-top: 2px solid #000;
          border-radius: 50%;
          animation: spin 1s linear infinite;
        }

        @keyframes pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.5; transform: scale(1.2); }
        }

        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }

        /* Responsive Design */
        @media (max-width: 768px) {
          .csr-container {
            padding: 1rem;
          }
          
          .features-grid, .specs-grid {
            grid-template-columns: 1fr;
          }
          
          .tool-header {
            flex-direction: column;
            text-align: center;
          }
          
          .mode-selection {
            flex-direction: column;
            align-items: center;
          }

          .form-grid {
            grid-template-columns: 1fr;
          }

          .tech-badges {
            flex-direction: column;
            align-items: center;
          }
        }
      `}</style>
    </div>
  );
}
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Buffer } from 'buffer';
import base32js from 'base32.js';
import baseX from 'base-x';
import { 
  FaCode,
  FaLock,
  FaUnlock,
  FaCopy,
  FaCheckCircle,
  FaExclamationTriangle,
  FaDatabase,
  FaKey,
  FaShieldAlt,
  FaFileCode,
  FaExchangeAlt
} from "react-icons/fa";
import { 
  HiOutlineSparkles
} from "react-icons/hi";
import { 
  RiNumbersLine,
  RiCodeSSlashLine
} from "react-icons/ri";

// Base85 alphabet (Ascii85/Z85 variant)
const BASE85_ALPHABET = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz!#$%&()*+-;<=>?@^_`{|}~";
const base85 = baseX(BASE85_ALPHABET);

export default function BaseEncoderDecoder() {
  const [input, setInput] = useState('');
  const [mode, setMode] = useState('encode');
  const [baseType, setBaseType] = useState('base64');
  const [output, setOutput] = useState('');
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState('');
  const [processing, setProcessing] = useState(false);

  const handleConvert = async () => {
    setError('');
    setProcessing(true);
    
    try {
      let result = '';
      
      if (baseType === 'base64') {
        if (mode === 'encode') {
          result = Buffer.from(input, 'utf8').toString('base64');
        } else {
          result = Buffer.from(input, 'base64').toString('utf8');
        }
      } else if (baseType === 'base16') {
        if (mode === 'encode') {
          result = Buffer.from(input, 'utf8').toString('hex');
        } else {
          result = Buffer.from(input, 'hex').toString('utf8');
        }
      } else if (baseType === 'base32') {
        if (mode === 'encode') {
          const encoder = new base32js.Encoder();
          result = encoder.write(Buffer.from(input, 'utf8')).finalize();
        } else {
          const decoder = new base32js.Decoder();
          const decoded = decoder.write(input).finalize();
          result = Buffer.from(decoded).toString('utf8');
        }
      } else if (baseType === 'base85') {
        if (mode === 'encode') {
          result = base85.encode(Buffer.from(input, 'utf8'));
        } else {
          const decoded = base85.decode(input);
          result = Buffer.from(decoded).toString('utf8');
        }
      }
      
      setOutput(result);
      
      // Auto-copy to clipboard
      await navigator.clipboard.writeText(result);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
      
    } catch (err) {
      console.error(err);
      setError(`Invalid input for ${baseType.toUpperCase()} ${mode} operation`);
      setOutput('');
    } finally {
      setProcessing(false);
    }
  };

  const copyToClipboard = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const clearAll = () => {
    setInput('');
    setOutput('');
    setError('');
    setCopied(false);
  };

  const encodingFeatures = [
    {
      icon: <FaDatabase size={20} />,
      title: "Base64 Encoding",
      description: "Standard RFC 4648 Base64 encoding for data transmission",
      color: "#00ffe1"
    },
    {
      icon: <RiNumbersLine size={20} />,
      title: "Multi-Base Support",
      description: "Base16, Base32, Base64, and Base85 encoding schemes",
      color: "#ff6b6b"
    },
    {
      icon: <FaExchangeAlt size={20} />,
      title: "Bidirectional Operations",
      description: "Seamless encoding and decoding with validation",
      color: "#4ecdc4"
    }
  ];

  const specifications = [
    { name: "Base64", value: "RFC 4648", icon: <FaFileCode size={14} /> },
    { name: "Base32", value: "RFC 4648", icon: <FaKey size={14} /> },
    { name: "Base16", value: "Hexadecimal", icon: <RiCodeSSlashLine size={14} /> },
    { name: "Base85", value: "Ascii85/Z85", icon: <FaShieldAlt size={14} /> },
  ];

  const baseOptions = [
    { value: 'base64', label: 'Base64', description: 'Standard web encoding' },
    { value: 'base32', label: 'Base32', description: 'Human-readable encoding' },
    { value: 'base16', label: 'Base16', description: 'Hexadecimal encoding' },
    { value: 'base85', label: 'Base85', description: 'High-density encoding' }
  ];

  const getEncodingInfo = () => {
    const info = {
      base64: { efficiency: '75%', charset: '64 chars', padding: 'Yes' },
      base32: { efficiency: '62.5%', charset: '32 chars', padding: 'Yes' },
      base16: { efficiency: '50%', charset: '16 chars', padding: 'No' },
      base85: { efficiency: '80%', charset: '85 chars', padding: 'No' }
    };
    return info[baseType] || info.base64;
  };

  return (
    <div className="base-encoder-container">
      {/* Hero Header */}
      <motion.div 
        className="hero-header"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <div className="hero-content">
          <div className="icon-wrapper">
            <FaCode size={48} />
          </div>
          <h1 className="page-title">BASE ENCODER</h1>
          <p className="page-subtitle">
            Professional multi-base encoding and decoding toolkit for data transformation
          </p>
          <div className="tech-badges">
            <div className="tech-badge">
              <FaDatabase size={16} />
              <span>RFC 4648 COMPLIANT</span>
            </div>
            <div className="tech-badge">
              <RiNumbersLine size={16} />
              <span>MULTI-BASE SUPPORT</span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Encoding Features */}
      <motion.section 
        className="features-section"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.8 }}
      >
        <h2 className="section-title">Encoding Operations</h2>
        <div className="features-grid">
          {encodingFeatures.map((feature, index) => (
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

      {/* Technical Specifications */}
      <motion.section 
        className="specifications-section"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6, duration: 0.8 }}
      >
        <h3 className="specifications-title">Encoding Standards</h3>
        <div className="specs-grid">
          {specifications.map((spec, index) => (
            <motion.div
              key={index}
              className="spec-item"
              initial={{ x: -30, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.8 + index * 0.1, duration: 0.5 }}
            >
              <div className="spec-icon">{spec.icon}</div>
              <div className="spec-content">
                <h4 className="spec-name">{spec.name}</h4>
                <p className="spec-value">{spec.value}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Encoder Tool Interface */}
      <motion.section 
        className="tool-section"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 0.8 }}
      >
        <div className="tool-header">
          <h2 className="tool-title">Encoding Engine</h2>
          <div className="tool-status">
            <div className="status-indicator"></div>
            <span>READY</span>
          </div>
        </div>

        <div className="tool-interface">
          {/* Configuration Panel */}
          <div className="config-panel">
            <div className="config-group">
              <h3 className="config-title">
                <FaExchangeAlt size={16} />
                Operation Mode
              </h3>
              <div className="mode-selection">
                <motion.button
                  className={`mode-btn ${mode === 'encode' ? 'active' : ''}`}
                  onClick={() => setMode('encode')}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <FaLock size={16} />
                  ENCODE
                </motion.button>
                <motion.button
                  className={`mode-btn ${mode === 'decode' ? 'active' : ''}`}
                  onClick={() => setMode('decode')}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <FaUnlock size={16} />
                  DECODE
                </motion.button>
              </div>
            </div>

            <div className="config-group">
              <h3 className="config-title">
                <FaCode size={16} />
                Encoding Type
              </h3>
              <div className="base-selection">
                {baseOptions.map((option) => (
                  <motion.div
                    key={option.value}
                    className={`base-option ${baseType === option.value ? 'active' : ''}`}
                    onClick={() => setBaseType(option.value)}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className="option-header">
                      <span className="option-label">{option.label}</span>
                      {baseType === option.value && <FaCheckCircle size={14} />}
                    </div>
                    <span className="option-description">{option.description}</span>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Current Encoding Info */}
            <div className="encoding-info">
              <h4 className="info-title">
                <HiOutlineSparkles size={16} />
                Current Configuration
              </h4>
              <div className="info-grid">
                <div className="info-item">
                  <span className="info-label">Efficiency</span>
                  <span className="info-value">{getEncodingInfo().efficiency}</span>
                </div>
                <div className="info-item">
                  <span className="info-label">Character Set</span>
                  <span className="info-value">{getEncodingInfo().charset}</span>
                </div>
                <div className="info-item">
                  <span className="info-label">Padding</span>
                  <span className="info-value">{getEncodingInfo().padding}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Input/Output Section */}
          <div className="io-section">
            <div className="input-section">
              <div className="section-header">
                <h3 className="section-title">
                  <FaFileCode size={16} />
                  Input Data
                </h3>
                <span className="char-count">{input.length} characters</span>
              </div>
              <textarea
                className="input-textarea"
                placeholder={`Enter text to ${mode}...`}
                value={input}
                onChange={(e) => setInput(e.target.value)}
              />
            </div>

            <div className="action-section">
              <motion.button
                className="convert-btn"
                onClick={handleConvert}
                disabled={!input.trim() || processing}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {processing ? (
                  <>
                    <div className="btn-spinner"></div>
                    <span>Processing...</span>
                  </>
                ) : (
                  <>
                    {mode === 'encode' ? <FaLock size={16} /> : <FaUnlock size={16} />}
                    <span>{mode === 'encode' ? 'ENCODE' : 'DECODE'}</span>
                  </>
                )}
              </motion.button>

              <motion.button
                className="clear-btn"
                onClick={clearAll}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <span>CLEAR ALL</span>
              </motion.button>
            </div>

            <div className="output-section">
              <div className="section-header">
                <h3 className="section-title">
                  <FaCheckCircle size={16} />
                  Output Result
                </h3>
                <div className="output-actions">
                  {output && (
                    <motion.button
                      className="copy-btn"
                      onClick={() => copyToClipboard(output)}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      {copied ? <FaCheckCircle size={16} /> : <FaCopy size={16} />}
                    </motion.button>
                  )}
                  <span className="char-count">{output.length} characters</span>
                </div>
              </div>
              <textarea
                className="output-textarea"
                readOnly
                value={output}
                placeholder="Encoded/decoded result will appear here..."
              />
              
              {copied && (
                <motion.div 
                  className="success-message"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                >
                  <FaCheckCircle size={16} />
                  <span>Result copied to clipboard!</span>
                </motion.div>
              )}

              {error && (
                <motion.div 
                  className="error-message"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <FaExclamationTriangle size={16} />
                  <span>{error}</span>
                </motion.div>
              )}
            </div>
          </div>
        </div>
      </motion.section>

      <style jsx>{`
        .base-encoder-container {
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

        /* Specifications Section */
        .specifications-section {
          max-width: 1000px;
          margin: 0 auto 4rem;
          background: rgba(255, 255, 255, 0.02);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 16px;
          padding: 2rem;
        }

        .specifications-title {
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
          max-width: 1400px;
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
          display: grid;
          grid-template-columns: 350px 1fr;
          gap: 2rem;
          background: rgba(255, 255, 255, 0.02);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 16px;
          padding: 2rem;
          backdrop-filter: blur(10px);
        }

        /* Configuration Panel */
        .config-panel {
          display: flex;
          flex-direction: column;
          gap: 2rem;
        }

        .config-group {
          background: rgba(0, 0, 0, 0.3);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 12px;
          padding: 1.5rem;
        }

        .config-title {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-family: 'Space Grotesk', sans-serif;
          font-size: 1rem;
          font-weight: 600;
          color: #00ffe1;
          margin: 0 0 1rem 0;
        }

        .mode-selection {
          display: flex;
          gap: 0.5rem;
        }

        .mode-btn {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 8px;
          color: rgba(255, 255, 255, 0.8);
          padding: 0.8rem 1rem;
          font-family: 'Space Grotesk', sans-serif;
          font-weight: 600;
          font-size: 0.8rem;
          cursor: pointer;
          transition: all 0.3s ease;
          flex: 1;
          justify-content: center;
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

        .base-selection {
          display: grid;
          gap: 0.5rem;
        }

        .base-option {
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 8px;
          padding: 1rem;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .base-option.active {
          border-color: rgba(0, 255, 225, 0.5);
          background: rgba(0, 255, 225, 0.1);
        }

        .base-option:hover:not(.active) {
          border-color: rgba(0, 255, 225, 0.3);
          background: rgba(0, 255, 225, 0.05);
        }

        .option-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 0.3rem;
        }

        .option-label {
          font-family: 'Space Grotesk', sans-serif;
          font-weight: 600;
          color: #ffffff;
          font-size: 0.9rem;
        }

        .option-description {
          font-family: 'Inter', sans-serif;
          font-size: 0.8rem;
          color: rgba(255, 255, 255, 0.6);
        }

        .encoding-info {
          background: rgba(0, 255, 225, 0.05);
          border: 1px solid rgba(0, 255, 225, 0.2);
          border-radius: 12px;
          padding: 1.5rem;
        }

        .info-title {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-family: 'Space Grotesk', sans-serif;
          font-size: 0.9rem;
          font-weight: 600;
          color: #00ffe1;
          margin: 0 0 1rem 0;
        }

        .info-grid {
          display: grid;
          gap: 0.8rem;
        }

        .info-item {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .info-label {
          font-family: 'Inter', sans-serif;
          font-size: 0.8rem;
          color: rgba(255, 255, 255, 0.7);
        }

        .info-value {
          font-family: 'JetBrains Mono', monospace;
          font-size: 0.8rem;
          color: #00ffe1;
          font-weight: 600;
        }

        /* I/O Section */
        .io-section {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }

        .input-section, .output-section {
          display: flex;
          flex-direction: column;
          gap: 0.8rem;
        }

        .section-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .section-title {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-family: 'Space Grotesk', sans-serif;
          font-size: 1rem;
          font-weight: 600;
          color: #ffffff;
          margin: 0;
        }

        .char-count {
          font-family: 'JetBrains Mono', monospace;
          font-size: 0.8rem;
          color: rgba(255, 255, 255, 0.5);
        }

        .input-textarea, .output-textarea {
          background: rgba(0, 0, 0, 0.4);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 8px;
          color: #ffffff;
          font-family: 'JetBrains Mono', monospace;
          font-size: 0.9rem;
          padding: 1rem;
          min-height: 120px;
          resize: vertical;
          transition: all 0.3s ease;
        }

        .input-textarea:focus {
          outline: none;
          border-color: rgba(0, 255, 225, 0.5);
          background: rgba(0, 0, 0, 0.6);
          box-shadow: 0 0 0 2px rgba(0, 255, 225, 0.1);
        }

        .input-textarea::placeholder, .output-textarea::placeholder {
          color: rgba(255, 255, 255, 0.3);
        }

        .output-textarea {
          background: rgba(0, 255, 225, 0.02);
          border-color: rgba(0, 255, 225, 0.1);
        }

        .action-section {
          display: flex;
          gap: 1rem;
          justify-content: center;
        }

        .convert-btn {
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
          box-shadow: 0 4px 15px rgba(0, 255, 225, 0.3);
          min-width: 150px;
        }

        .convert-btn:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(0, 255, 225, 0.4);
        }

        .convert-btn:disabled {
          opacity: 0.5;
          cursor: not-allowed;
          transform: none;
        }

        .clear-btn {
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.2);
          border-radius: 12px;
          color: rgba(255, 255, 255, 0.8);
          font-family: 'Space Grotesk', sans-serif;
          font-weight: 600;
          font-size: 0.9rem;
          padding: 1rem 1.5rem;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .clear-btn:hover {
          border-color: rgba(255, 107, 107, 0.5);
          background: rgba(255, 107, 107, 0.1);
          color: #ff6b6b;
        }

        .output-actions {
          display: flex;
          align-items: center;
          gap: 1rem;
        }

        .copy-btn {
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

        .copy-btn:hover {
          background: rgba(0, 255, 225, 0.2);
        }

        .btn-spinner {
          width: 16px;
          height: 16px;
          border: 2px solid rgba(0, 0, 0, 0.3);
          border-top: 2px solid #000;
          border-radius: 50%;
          animation: spin 1s linear infinite;
        }

        .success-message {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          background: rgba(40, 167, 69, 0.1);
          border: 1px solid rgba(40, 167, 69, 0.3);
          border-radius: 8px;
          padding: 0.8rem;
          color: #28a745;
          font-family: 'Inter', sans-serif;
          font-size: 0.9rem;
          margin-top: 0.5rem;
        }

        .error-message {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          background: rgba(220, 53, 69, 0.1);
          border: 1px solid rgba(220, 53, 69, 0.3);
          border-radius: 8px;
          padding: 0.8rem;
          color: #dc3545;
          font-family: 'Inter', sans-serif;
          font-size: 0.9rem;
          margin-top: 0.5rem;
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
          .base-encoder-container {
            padding: 1rem;
          }
          
          .features-grid, .specs-grid {
            grid-template-columns: 1fr;
          }
          
          .tool-interface {
            grid-template-columns: 1fr;
            gap: 1.5rem;
          }
          
          .action-section {
            flex-direction: column;
          }

          .tech-badges {
            flex-direction: column;
            align-items: center;
          }

          .tool-header {
            flex-direction: column;
            text-align: center;
          }
        }
      `}</style>
    </div>
  );
}
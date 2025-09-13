import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  FaLock,
  FaUnlock,
  FaCode,
  FaCopy,
  FaKey,
  FaShieldAlt,
  FaExclamationTriangle,
  FaCheckCircle,
  FaPlay,
  FaDownload,
  FaCog
} from "react-icons/fa";
import { 
  HiOutlineSparkles,
  HiOutlineClipboardCopy
} from "react-icons/hi";
import { 
  RiShieldKeyholeLine,
  RiFileCodeLine
} from "react-icons/ri";

export default function XOREncoder() {
  const [inputText, setInputText] = useState('');
  const [key, setKey] = useState('');
  const [outputHex, setOutputHex] = useState('');
  const [outputASCII, setOutputASCII] = useState('');
  const [strength, setStrength] = useState('');
  const [strengthIcon, setStrengthIcon] = useState(null);
  const [strengthColor, setStrengthColor] = useState('');
  const [copied, setCopied] = useState('');

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
    if (key.length >= 12) {
      setStrength('CRYPTOGRAPHICALLY STRONG');
      setStrengthIcon(<FaShieldAlt />);
      setStrengthColor('#00ffe1');
    } else if (key.length >= 6) {
      setStrength('MODERATE SECURITY');
      setStrengthIcon(<FaExclamationTriangle />);
      setStrengthColor('#ffa500');
    } else {
      setStrength('WEAK ENCRYPTION');
      setStrengthIcon(<FaUnlock />);
      setStrengthColor('#ff6b6b');
    }
  };

  const handleCopy = (text, type) => {
    navigator.clipboard.writeText(text);
    setCopied(type);
    setTimeout(() => setCopied(''), 2000);
  };

  const cryptoFeatures = [
    {
      icon: <FaKey size={20} />,
      title: "XOR Cipher",
      description: "Symmetric key encryption using exclusive OR operations",
      color: "#00ffe1"
    },
    {
      icon: <FaCode size={20} />,
      title: "Hex Encoding",
      description: "Hexadecimal representation for binary data visualization",
      color: "#ff6b6b"
    },
    {
      icon: <RiShieldKeyholeLine size={20} />,
      title: "Key Strength",
      description: "Real-time cryptographic strength assessment",
      color: "#4ecdc4"
    }
  ];

  const capabilities = [
    { name: "Algorithm", value: "XOR Symmetric Cipher", icon: <FaLock size={14} /> },
    { name: "Key Length", value: "Variable (1-256 chars)", icon: <FaKey size={14} /> },
    { name: "Output Format", value: "HEX, ASCII", icon: <FaCode size={14} /> },
    { name: "Operation Mode", value: "Bidirectional", icon: <HiOutlineSparkles size={14} /> },
  ];

  return (
    <div className="xor-container">
      {/* Hero Header */}
      <motion.div 
        className="hero-header"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <div className="hero-content">
          <div className="icon-wrapper">
            <RiShieldKeyholeLine size={48} />
          </div>
          <h1 className="page-title">XOR ENCODER/DECODER</h1>
          <p className="page-subtitle">
            Symmetric encryption using exclusive OR operations for secure data transformation
          </p>
          <div className="tech-badges">
            <div className="tech-badge">
              <FaLock size={16} />
              <span>SYMMETRIC CIPHER</span>
            </div>
            <div className="tech-badge">
              <FaCode size={16} />
              <span>BINARY OPERATIONS</span>
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
        <h2 className="section-title">Cryptographic Features</h2>
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

      {/* XOR Tool Interface */}
      <motion.section 
        className="tool-section"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 0.8 }}
      >
        <div className="tool-header">
          <h2 className="tool-title">XOR Cipher Engine</h2>
          <div className="tool-status">
            <div className="status-indicator"></div>
            <span>READY FOR OPERATION</span>
          </div>
        </div>

        <div className="tool-interface">
          {/* Input Section */}
          <div className="input-section">
            <div className="input-group">
              <label className="input-label">
                <RiFileCodeLine size={16} />
                INPUT DATA
              </label>
              <textarea
                className="input-field"
                value={inputText}
                onChange={e => setInputText(e.target.value)}
                rows={4}
                placeholder="Enter message to encode or hex string to decode..."
              />
            </div>

            <div className="input-group">
              <label className="input-label">
                <FaKey size={16} />
                ENCRYPTION KEY
              </label>
              <input
                className="input-field"
                value={key}
                onChange={e => setKey(e.target.value)}
                placeholder="Enter XOR encryption key"
              />
              {key && (
                <div className="strength-indicator" style={{ color: strengthColor }}>
                  {strengthIcon}
                  <span>{strength}</span>
                </div>
              )}
            </div>

            <div className="action-buttons">
              <motion.button
                className="action-btn encode-btn"
                onClick={handleEncode}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                disabled={!inputText || !key}
              >
                <FaLock size={16} />
                ENCODE
              </motion.button>
              <motion.button
                className="action-btn decode-btn"
                onClick={handleDecode}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                disabled={!inputText || !key}
              >
                <FaUnlock size={16} />
                DECODE
              </motion.button>
            </div>
          </div>

          {/* Output Section */}
          {outputHex && (
            <motion.div 
              className="output-section"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="output-group">
                <div className="output-header">
                  <h4 className="output-title">
                    <FaCode size={16} />
                    HEXADECIMAL OUTPUT
                  </h4>
                  <motion.button
                    className="copy-btn"
                    onClick={() => handleCopy(outputHex, 'hex')}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    {copied === 'hex' ? <FaCheckCircle size={16} /> : <FaCopy size={16} />}
                  </motion.button>
                </div>
                <div className="output-field hex-output">
                  {outputHex}
                </div>
              </div>

              <div className="output-group">
                <div className="output-header">
                  <h4 className="output-title">
                    <HiOutlineClipboardCopy size={16} />
                    ASCII OUTPUT
                  </h4>
                  <motion.button
                    className="copy-btn"
                    onClick={() => handleCopy(outputASCII, 'ascii')}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    {copied === 'ascii' ? <FaCheckCircle size={16} /> : <FaCopy size={16} />}
                  </motion.button>
                </div>
                <div className="output-field ascii-output">
                  {outputASCII}
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </motion.section>

      <style jsx>{`
        .xor-container {
          min-height: 100vh;
          background: 
            radial-gradient(ellipse at top, rgba(0, 255, 225, 0.02) 0%, transparent 70%),
            radial-gradient(ellipse at bottom, rgba(255, 107, 107, 0.01) 0%, transparent 70%),
            linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 100%);
          padding: 2rem;
          color: #ffffff;
        }

        /* HERO HEADER */
        .hero-header {
          text-align: center;
          padding: 3rem 0 4rem;
          max-width: 900px;
          margin: 0 auto;
        }

        .hero-content {
          position: relative;
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

        /* FEATURES SECTION */
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

        /* CAPABILITIES SECTION */
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

        /* TOOL SECTION */
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

        .input-section {
          margin-bottom: 2rem;
        }

        .input-group {
          margin-bottom: 1.5rem;
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
          letter-spacing: 0.05em;
        }

        .input-field {
          width: 100%;
          background: rgba(0, 0, 0, 0.3);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 8px;
          padding: 0.8rem;
          color: #ffffff;
          font-family: 'JetBrains Mono', monospace;
          font-size: 0.9rem;
          transition: all 0.3s ease;
          resize: vertical;
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

        .strength-indicator {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          margin-top: 0.5rem;
          font-family: 'JetBrains Mono', monospace;
          font-size: 0.8rem;
          font-weight: 600;
          letter-spacing: 0.05em;
        }

        .action-buttons {
          display: flex;
          gap: 1rem;
          justify-content: center;
          margin-top: 2rem;
        }

        .action-btn {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          background: linear-gradient(135deg, #00ffe1 0%, #0080ff 100%);
          color: #000;
          border: none;
          border-radius: 8px;
          padding: 0.8rem 2rem;
          font-family: 'Space Grotesk', sans-serif;
          font-weight: 700;
          font-size: 0.9rem;
          letter-spacing: 0.05em;
          cursor: pointer;
          transition: all 0.3s ease;
          box-shadow: 0 4px 15px rgba(0, 255, 225, 0.3);
        }

        .action-btn:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(0, 255, 225, 0.4);
        }

        .action-btn:disabled {
          opacity: 0.5;
          cursor: not-allowed;
          transform: none;
        }

        .decode-btn {
          background: linear-gradient(135deg, #ff6b6b 0%, #ffa500 100%);
          box-shadow: 0 4px 15px rgba(255, 107, 107, 0.3);
        }

        .decode-btn:hover:not(:disabled) {
          box-shadow: 0 6px 20px rgba(255, 107, 107, 0.4);
        }

        .output-section {
          border-top: 1px solid rgba(255, 255, 255, 0.1);
          padding-top: 2rem;
        }

        .output-group {
          margin-bottom: 1.5rem;
        }

        .output-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 0.5rem;
        }

        .output-title {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-family: 'Space Grotesk', sans-serif;
          font-size: 0.9rem;
          font-weight: 600;
          color: #00ffe1;
          margin: 0;
          letter-spacing: 0.05em;
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
          border-color: rgba(0, 255, 225, 0.5);
        }

        .output-field {
          background: rgba(0, 0, 0, 0.5);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 8px;
          padding: 1rem;
          font-family: 'JetBrains Mono', monospace;
          font-size: 0.9rem;
          color: #ffffff;
          word-wrap: break-word;
          white-space: pre-wrap;
          min-height: 60px;
          max-height: 200px;
          overflow-y: auto;
        }

        .hex-output {
          color: #00ffe1;
          letter-spacing: 0.1em;
        }

        .ascii-output {
          color: #ffffff;
        }

        @keyframes pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.5; transform: scale(1.2); }
        }

        /* RESPONSIVE DESIGN */
        @media (max-width: 768px) {
          .xor-container {
            padding: 1rem;
          }
          
          .features-grid {
            grid-template-columns: 1fr;
          }
          
          .specs-grid {
            grid-template-columns: 1fr;
          }
          
          .tool-header {
            flex-direction: column;
            text-align: center;
          }
          
          .action-buttons {
            flex-direction: column;
            align-items: center;
          }

          .tech-badges {
            flex-direction: column;
            align-items: center;
          }

          .output-header {
            flex-direction: column;
            align-items: flex-start;
            gap: 0.5rem;
          }
        }
      `}</style>
    </div>
  );
}

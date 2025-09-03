import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { generateKeyPair, encryptWithPublicKey, decryptWithPrivateKey } from './rsa-utils';

export default function RSATools() {
  const [activeSection, setActiveSection] = useState('generate');
  const [keyPair, setKeyPair] = useState({ public: '', private: '' });
  const [message, setMessage] = useState('');
  const [ciphertext, setCiphertext] = useState('');
  const [decryptedMessage, setDecryptedMessage] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [isEncrypting, setIsEncrypting] = useState(false);
  const [isDecrypting, setIsDecrypting] = useState(false);
  const [copied, setCopied] = useState({ public: false, private: false, cipher: false });

  useEffect(() => {
    // Load saved keys from localStorage
    const savedPrivateKey = localStorage.getItem('rsa_private_key');
    const savedPublicKey = localStorage.getItem('rsa_public_key');
    if (savedPrivateKey && savedPublicKey) {
      setKeyPair({ private: savedPrivateKey, public: savedPublicKey });
    }
  }, []);

  const handleGenerateKeys = async () => {
    setIsGenerating(true);
    try {
      const { publicKeyPem, privateKeyPem } = await generateKeyPair();
      setKeyPair({ public: publicKeyPem, private: privateKeyPem });
      localStorage.setItem('rsa_private_key', privateKeyPem);
      localStorage.setItem('rsa_public_key', publicKeyPem);
    } catch (error) {
      console.error('Key generation failed:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleEncrypt = async () => {
    if (!keyPair.public || !message) return;
    setIsEncrypting(true);
    try {
      const encrypted = await encryptWithPublicKey(keyPair.public, message);
      setCiphertext(encrypted);
    } catch (error) {
      console.error('Encryption failed:', error);
    } finally {
      setIsEncrypting(false);
    }
  };

  const handleDecrypt = async () => {
    if (!keyPair.private || !ciphertext) return;
    setIsDecrypting(true);
    try {
      const decrypted = await decryptWithPrivateKey(keyPair.private, ciphertext);
      setDecryptedMessage(decrypted);
    } catch (error) {
      console.error('Decryption failed:', error);
      setDecryptedMessage('Decryption failed - check your keys and ciphertext');
    } finally {
      setIsDecrypting(false);
    }
  };

  const copyToClipboard = async (text, type) => {
    await navigator.clipboard.writeText(text);
    setCopied({ ...copied, [type]: true });
    setTimeout(() => setCopied({ ...copied, [type]: false }), 2000);
  };

  const clearAll = () => {
    setKeyPair({ public: '', private: '' });
    setMessage('');
    setCiphertext('');
    setDecryptedMessage('');
    localStorage.removeItem('rsa_private_key');
    localStorage.removeItem('rsa_public_key');
  };

  const sections = [
    { id: 'generate', name: 'Generate', icon: '🔑' },
    { id: 'encrypt', name: 'Encrypt', icon: '🔒' },
    { id: 'decrypt', name: 'Decrypt', icon: '🔓' },
    { id: 'info', name: 'Info', icon: '📖' }
  ];

  const pageVariants = {
    initial: { opacity: 0, y: 20 },
    in: { opacity: 1, y: 0 },
    out: { opacity: 0, y: -20 }
  };

  return (
    <motion.div 
      className="tool-container"
      initial="initial"
      animate="in"
      exit="out"
      variants={pageVariants}
      transition={{ duration: 0.5 }}
    >
      {/* Header */}
      <div className="tool-header">
        <motion.h1 
          className="tool-title"
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <span className="tool-icon">🔐</span>
          RSA Cryptography Tools
        </motion.h1>
        <motion.p 
          className="tool-description"
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          Generate RSA key pairs, encrypt and decrypt messages using public-key cryptography
        </motion.p>
      </div>

      {/* Navigation */}
      <div className="tool-nav">
        {sections.map((section, index) => (
          <motion.button
            key={section.id}
            className={`nav-btn ${activeSection === section.id ? 'active' : ''}`}
            onClick={() => setActiveSection(section.id)}
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.1 * index }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="nav-icon">{section.icon}</span>
            {section.name}
          </motion.button>
        ))}
      </div>

      <div className="tool-content">
        {/* Key Generation Section */}
        {activeSection === 'generate' && (
          <motion.div 
            className="section"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
          >
            <div className="section-header">
              <h3>🔑 RSA Key Pair Generation</h3>
              <button className="clear-btn" onClick={clearAll}>
                🗑️ Clear All
              </button>
            </div>
            
            <div className="key-generation">
              <button 
                className="action-btn primary"
                onClick={handleGenerateKeys}
                disabled={isGenerating}
              >
                {isGenerating ? '🔄 Generating...' : '🔑 Generate 2048-bit RSA Keys'}
              </button>
            </div>

            {keyPair.public && (
              <div className="key-display">
                <div className="key-section">
                  <div className="key-header">
                    <h4>🔓 Public Key</h4>
                    <button 
                      className="copy-btn"
                      onClick={() => copyToClipboard(keyPair.public, 'public')}
                    >
                      {copied.public ? '✅' : '📋'}
                    </button>
                  </div>
                  <textarea 
                    className="key-textarea"
                    value={keyPair.public}
                    readOnly
                    rows={8}
                  />
                  <p className="key-info">Share this key publicly for others to encrypt messages to you</p>
                </div>

                <div className="key-section">
                  <div className="key-header">
                    <h4>🔒 Private Key</h4>
                    <button 
                      className="copy-btn"
                      onClick={() => copyToClipboard(keyPair.private, 'private')}
                    >
                      {copied.private ? '✅' : '📋'}
                    </button>
                  </div>
                  <textarea 
                    className="key-textarea private"
                    value={keyPair.private}
                    readOnly
                    rows={8}
                  />
                  <p className="key-info warning">Keep this key secret! Used to decrypt messages sent to you</p>
                </div>
              </div>
            )}
          </motion.div>
        )}

        {/* Encryption Section */}
        {activeSection === 'encrypt' && (
          <motion.div 
            className="section"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
          >
            <div className="section-header">
              <h3>🔒 Message Encryption</h3>
            </div>

            <div className="encrypt-section">
              <div className="input-group">
                <label>Public Key (for encryption)</label>
                <textarea
                  className="input-textarea"
                  value={keyPair.public}
                  onChange={(e) => setKeyPair({...keyPair, public: e.target.value})}
                  placeholder="Paste RSA public key here..."
                  rows={6}
                />
              </div>

              <div className="input-group">
                <label>Message to Encrypt</label>
                <textarea
                  className="input-textarea"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Enter your secret message..."
                  rows={4}
                />
                <div className="input-info">
                  <span>Characters: {message.length}</span>
                  <span>Max: ~245 characters for 2048-bit RSA</span>
                </div>
              </div>

              <button 
                className="action-btn primary"
                onClick={handleEncrypt}
                disabled={!keyPair.public || !message || isEncrypting}
              >
                {isEncrypting ? '🔄 Encrypting...' : '🔒 Encrypt Message'}
              </button>

              {ciphertext && (
                <div className="output-group">
                  <div className="output-header">
                    <label>Encrypted Message (Base64)</label>
                    <button 
                      className="copy-btn"
                      onClick={() => copyToClipboard(ciphertext, 'cipher')}
                    >
                      {copied.cipher ? '✅ Copied' : '📋 Copy'}
                    </button>
                  </div>
                  <textarea
                    className="output-textarea"
                    value={ciphertext}
                    readOnly
                    rows={6}
                  />
                </div>
              )}
            </div>
          </motion.div>
        )}

        {/* Decryption Section */}
        {activeSection === 'decrypt' && (
          <motion.div 
            className="section"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
          >
            <div className="section-header">
              <h3>🔓 Message Decryption</h3>
            </div>

            <div className="decrypt-section">
              <div className="input-group">
                <label>Private Key (for decryption)</label>
                <textarea
                  className="input-textarea private"
                  value={keyPair.private}
                  onChange={(e) => setKeyPair({...keyPair, private: e.target.value})}
                  placeholder="Paste your RSA private key here..."
                  rows={6}
                />
              </div>

              <div className="input-group">
                <label>Encrypted Message (Base64)</label>
                <textarea
                  className="input-textarea"
                  value={ciphertext}
                  onChange={(e) => setCiphertext(e.target.value)}
                  placeholder="Paste encrypted message here..."
                  rows={4}
                />
              </div>

              <button 
                className="action-btn primary"
                onClick={handleDecrypt}
                disabled={!keyPair.private || !ciphertext || isDecrypting}
              >
                {isDecrypting ? '🔄 Decrypting...' : '🔓 Decrypt Message'}
              </button>

              {decryptedMessage && (
                <div className="output-group">
                  <label>Decrypted Message</label>
                  <textarea
                    className="output-textarea success"
                    value={decryptedMessage}
                    readOnly
                    rows={4}
                  />
                </div>
              )}
            </div>
          </motion.div>
        )}

        {/* Info Section */}
        {activeSection === 'info' && (
          <motion.div 
            className="section"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
          >
            <div className="info-content">
              <h3>📖 About RSA Cryptography</h3>
              
              <div className="info-card">
                <h4>🔐 How RSA Works</h4>
                <p>
                  RSA is an asymmetric cryptographic algorithm that uses a pair of keys:
                  a public key for encryption and a private key for decryption. Anyone can 
                  use your public key to encrypt messages, but only you can decrypt them 
                  with your private key.
                </p>
              </div>

              <div className="info-card">
                <h4>🔑 Key Generation</h4>
                <p>
                  RSA keys are generated using large prime numbers. The security depends on 
                  the difficulty of factoring the product of two large primes. Our tool 
                  generates 2048-bit keys, which are considered secure for most applications.
                </p>
              </div>

              <div className="info-card">
                <h4>⚠️ Security Notes</h4>
                <ul>
                  <li>Never share your private key with anyone</li>
                  <li>RSA can only encrypt messages smaller than the key size</li>
                  <li>For large messages, use hybrid encryption (RSA + AES)</li>
                  <li>Keys generated here are for educational purposes</li>
                </ul>
              </div>

              <div className="info-card">
                <h4>🎯 Use Cases</h4>
                <ul>
                  <li>Secure communication between parties</li>
                  <li>Digital signatures and authentication</li>
                  <li>Key exchange for symmetric encryption</li>
                  <li>Certificate-based security (HTTPS, email)</li>
                </ul>
              </div>
            </div>
          </motion.div>
        )}
      </div>

      <style jsx>{`
        .tool-container {
          min-height: 100vh;
          background: linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 100%);
          padding: 2rem;
          color: #ffffff;
        }

        .tool-header {
          text-align: center;
          margin-bottom: 3rem;
          max-width: 800px;
          margin-left: auto;
          margin-right: auto;
        }

        .tool-title {
          font-family: 'Orbitron', monospace;
          font-size: clamp(2rem, 4vw, 3rem);
          font-weight: 900;
          color: #ffffff;
          margin-bottom: 1rem;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 1rem;
        }

        .tool-icon {
          font-size: 0.8em;
          color: #ff6b6b;
          text-shadow: 0 0 20px #ff6b6b;
        }

        .tool-description {
          font-family: 'JetBrains Mono', monospace;
          font-size: 1.1rem;
          color: #a0a0a0;
          line-height: 1.6;
          margin: 0;
        }

        .tool-nav {
          display: flex;
          justify-content: center;
          gap: 1rem;
          margin-bottom: 3rem;
          flex-wrap: wrap;
        }

        .nav-btn {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.75rem 1.5rem;
          border: 1px solid rgba(255, 107, 107, 0.3);
          background: rgba(255, 107, 107, 0.05);
          color: #ff6b6b;
          border-radius: 25px;
          font-family: 'JetBrains Mono', monospace;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .nav-btn:hover {
          background: rgba(255, 107, 107, 0.1);
          border-color: #ff6b6b;
        }

        .nav-btn.active {
          background: rgba(255, 107, 107, 0.2);
          border-color: #ff6b6b;
          box-shadow: 0 0 20px rgba(255, 107, 107, 0.3);
        }

        .nav-icon {
          font-size: 1.2rem;
        }

        .tool-content {
          max-width: 1200px;
          margin: 0 auto;
        }

        .section {
          background: rgba(255, 255, 255, 0.02);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 107, 107, 0.2);
          border-radius: 15px;
          padding: 2rem;
        }

        .section-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 2rem;
        }

        .section-header h3 {
          font-family: 'Orbitron', monospace;
          font-size: 1.5rem;
          color: #ff6b6b;
          margin: 0;
        }

        .clear-btn {
          background: rgba(255, 107, 107, 0.1);
          border: 1px solid rgba(255, 107, 107, 0.3);
          color: #ff6b6b;
          padding: 0.5rem 1rem;
          border-radius: 8px;
          cursor: pointer;
          transition: all 0.3s ease;
          font-family: 'JetBrains Mono', monospace;
        }

        .clear-btn:hover {
          background: rgba(255, 107, 107, 0.2);
        }

        .key-generation {
          text-align: center;
          margin-bottom: 2rem;
        }

        .action-btn {
          padding: 1rem 2rem;
          border: none;
          border-radius: 50px;
          font-family: 'JetBrains Mono', monospace;
          font-weight: 600;
          font-size: 1rem;
          cursor: pointer;
          transition: all 0.3s ease;
          min-width: 200px;
        }

        .action-btn.primary {
          background: linear-gradient(45deg, #ff6b6b, #ff8e8e);
          color: #000;
          box-shadow: 0 5px 15px rgba(255, 107, 107, 0.3);
        }

        .action-btn:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }

        .action-btn:not(:disabled):hover {
          transform: translateY(-3px);
          box-shadow: 0 8px 25px rgba(255, 107, 107, 0.5);
        }

        .key-display {
          display: grid;
          gap: 2rem;
        }

        .key-section {
          background: rgba(0, 0, 0, 0.2);
          border-radius: 10px;
          padding: 1.5rem;
        }

        .key-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 1rem;
        }

        .key-header h4 {
          font-family: 'Orbitron', monospace;
          color: #ffffff;
          margin: 0;
        }

        .copy-btn {
          background: rgba(0, 255, 136, 0.1);
          border: 1px solid rgba(0, 255, 136, 0.3);
          color: #00ff88;
          padding: 0.5rem;
          border-radius: 8px;
          cursor: pointer;
          transition: all 0.3s ease;
          font-size: 1.2rem;
        }

        .copy-btn:hover {
          background: rgba(0, 255, 136, 0.2);
        }

        .key-textarea {
          width: 100%;
          background: rgba(0, 0, 0, 0.3);
          border: 1px solid rgba(255, 255, 255, 0.2);
          border-radius: 8px;
          padding: 1rem;
          color: #ffffff;
          font-family: 'JetBrains Mono', monospace;
          font-size: 0.8rem;
          line-height: 1.4;
          resize: vertical;
          margin-bottom: 0.5rem;
        }

        .key-textarea.private {
          border-color: rgba(255, 107, 107, 0.3);
        }

        .key-info {
          font-family: 'JetBrains Mono', monospace;
          font-size: 0.85rem;
          color: #888;
          margin: 0;
        }

        .key-info.warning {
          color: #ff6b6b;
        }

        .input-group, .output-group {
          margin-bottom: 2rem;
        }

        .input-group label, .output-group label {
          display: block;
          margin-bottom: 0.5rem;
          font-family: 'JetBrains Mono', monospace;
          color: #ffffff;
          font-weight: 600;
        }

        .input-textarea, .output-textarea {
          width: 100%;
          background: rgba(0, 0, 0, 0.3);
          border: 1px solid rgba(255, 107, 107, 0.3);
          border-radius: 10px;
          padding: 1rem;
          color: #ffffff;
          font-family: 'JetBrains Mono', monospace;
          font-size: 0.9rem;
          line-height: 1.5;
          resize: vertical;
          transition: all 0.3s ease;
        }

        .input-textarea:focus {
          outline: none;
          border-color: #ff6b6b;
          box-shadow: 0 0 20px rgba(255, 107, 107, 0.2);
        }

        .input-textarea.private {
          border-color: rgba(255, 107, 107, 0.5);
          background: rgba(255, 107, 107, 0.05);
        }

        .output-textarea {
          border-color: rgba(0, 255, 136, 0.3);
          background: rgba(0, 255, 136, 0.05);
        }

        .output-textarea.success {
          border-color: rgba(0, 255, 136, 0.5);
          background: rgba(0, 255, 136, 0.1);
        }

        .input-info {
          display: flex;
          justify-content: space-between;
          margin-top: 0.5rem;
          font-family: 'JetBrains Mono', monospace;
          font-size: 0.8rem;
          color: #888;
        }

        .output-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 0.5rem;
        }

        .info-content h3 {
          font-family: 'Orbitron', monospace;
          color: #ff6b6b;
          margin-bottom: 2rem;
          text-align: center;
        }

        .info-card {
          background: rgba(0, 0, 0, 0.2);
          border-radius: 10px;
          padding: 1.5rem;
          margin-bottom: 1.5rem;
          border-left: 3px solid #ff6b6b;
        }

        .info-card h4 {
          font-family: 'Orbitron', monospace;
          color: #ffffff;
          margin-bottom: 1rem;
        }

        .info-card p, .info-card li {
          font-family: 'JetBrains Mono', monospace;
          line-height: 1.6;
          color: #cccccc;
        }

        .info-card ul {
          margin: 0;
          padding-left: 1.5rem;
        }

        .info-card li {
          margin-bottom: 0.5rem;
        }

        @media (max-width: 768px) {
          .tool-container {
            padding: 1rem;
          }
          
          .tool-nav {
            justify-content: center;
          }
          
          .nav-btn {
            flex: 1;
            min-width: 120px;
            justify-content: center;
          }
          
          .section-header {
            flex-direction: column;
            gap: 1rem;
            align-items: flex-start;
          }
          
          .key-header, .output-header {
            flex-direction: column;
            gap: 0.5rem;
            align-items: flex-start;
          }
        }
      `}</style>
    </motion.div>
  );
}

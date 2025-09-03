import { useState } from "react";
import { motion } from "framer-motion";

export default function CaesarEncoder() {
  const [text, setText] = useState("");
  const [shift, setShift] = useState(13); // default to ROT13
  const [encoded, setEncoded] = useState("");
  const [copied, setCopied] = useState(false);
  const [isEncoding, setIsEncoding] = useState(false);

  const encodeText = async () => {
    if (!text.trim()) return;
    
    setIsEncoding(true);
    
    // Add animation delay
    await new Promise(resolve => setTimeout(resolve, 300));
    
    const upperText = text.toUpperCase();
    let result = "";

    for (let char of upperText) {
      if (/[A-Z]/.test(char)) {
        const code = ((char.charCodeAt(0) - 65 + shift) % 26) + 65;
        result += String.fromCharCode(code);
      } else {
        result += char;
      }
    }
    setEncoded(result);
    setCopied(false);
    setIsEncoding(false);
  };

  const copyResult = async () => {
    await navigator.clipboard.writeText(encoded);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleClear = () => {
    setText("");
    setEncoded("");
    setCopied(false);
  };

  const swapMode = () => {
    setText(encoded);
    setEncoded("");
    setShift(26 - shift); // reverse shift for decoding
    setCopied(false);
  };

  const presetShifts = [
    { name: "ROT13", value: 13, description: "Classic rotation cipher" },
    { name: "ROT5", value: 5, description: "Simple 5-character shift" },
    { name: "ROT1", value: 1, description: "Minimal shift cipher" },
    { name: "ROT25", value: 25, description: "Near-reverse cipher" }
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
          Caesar Cipher Encoder
        </motion.h1>
        <motion.p 
          className="tool-description"
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          Encode messages using the classic Caesar cipher with customizable shift values
        </motion.p>
      </div>

      {/* Input Section */}
      <div className="tool-content">
        <div className="input-section">
          <div className="section-header">
            <h3>📝 Plain Text</h3>
            <div className="input-controls">
              <button className="control-btn" onClick={handleClear} title="Clear all">
                🗑️
              </button>
              {encoded && (
                <button className="control-btn" onClick={swapMode} title="Swap input/output">
                  🔄
                </button>
              )}
            </div>
          </div>
          <motion.textarea
            className="cyber-textarea"
            rows="4"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Enter your message to encode..."
            whileFocus={{ scale: 1.02, transition: { duration: 0.2 } }}
          />
          <div className="input-info">
            <span>Characters: {text.length}</span>
            <span>Letters only: {text.replace(/[^A-Za-z]/g, '').length}</span>
          </div>
        </div>

        {/* Shift Settings */}
        <div className="settings-section">
          <div className="section-header">
            <h3>⚙️ Cipher Settings</h3>
            <span className="shift-display">Shift: {shift}</span>
          </div>
          
          {/* Shift Slider */}
          <div className="shift-control">
            <label>Custom Shift Value</label>
            <div className="slider-container">
              <input
                type="range"
                min="1"
                max="25"
                value={shift}
                onChange={(e) => setShift(Number(e.target.value))}
                className="cyber-slider"
              />
              <div className="slider-labels">
                <span>1</span>
                <span>13 (ROT13)</span>
                <span>25</span>
              </div>
            </div>
          </div>

          {/* Preset Buttons */}
          <div className="presets">
            <label>Quick Presets</label>
            <div className="preset-buttons">
              {presetShifts.map((preset) => (
                <motion.button
                  key={preset.value}
                  className={`preset-btn ${shift === preset.value ? 'active' : ''}`}
                  onClick={() => setShift(preset.value)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  title={preset.description}
                >
                  {preset.name}
                </motion.button>
              ))}
            </div>
          </div>
        </div>

        {/* Action Button */}
        <motion.div 
          className="action-section"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.4 }}
        >
          <button 
            className="action-btn primary"
            onClick={encodeText}
            disabled={!text.trim() || isEncoding}
          >
            {isEncoding ? (
              <span>🔄 Encoding...</span>
            ) : (
              <span>🔐 Encode Message</span>
            )}
          </button>
        </motion.div>

        {/* Output Section */}
        {encoded && (
          <motion.div 
            className="output-section"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <div className="section-header">
              <h3>🔒 Encoded Result</h3>
              <div className="output-controls">
                <button 
                  className="copy-btn"
                  onClick={copyResult}
                >
                  {copied ? '✅ Copied' : '📋 Copy'}
                </button>
              </div>
            </div>
            <div className="output-content">
              <div className="cipher-info">
                <span>Shift Value: {shift}</span>
                <span>Characters: {encoded.length}</span>
              </div>
              <div className="encoded-text">{encoded}</div>
            </div>
          </motion.div>
        )}

        {/* Info Panel */}
        <motion.div 
          className="info-panel"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          <h4>🛡️ About Caesar Cipher</h4>
          <p>
            The Caesar cipher is one of the simplest encryption techniques. Each letter is shifted 
            a fixed number of positions in the alphabet. ROT13 (shift of 13) is the most famous variant.
          </p>
          <div className="cipher-examples">
            <div className="example">
              <strong>Example:</strong> "HELLO" with shift 3 → "KHOOR"
            </div>
          </div>
        </motion.div>
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
          color: #00ffe1;
          text-shadow: 0 0 20px #00ffe1;
        }

        .tool-description {
          font-family: 'JetBrains Mono', monospace;
          font-size: 1.1rem;
          color: #a0a0a0;
          line-height: 1.6;
          margin: 0;
        }

        .tool-content {
          max-width: 1000px;
          margin: 0 auto;
          display: grid;
          gap: 2rem;
        }

        .input-section, .settings-section, .output-section, .info-panel {
          background: rgba(255, 255, 255, 0.02);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(0, 255, 225, 0.2);
          border-radius: 15px;
          padding: 1.5rem;
        }

        .section-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 1rem;
        }

        .section-header h3 {
          font-family: 'Orbitron', monospace;
          font-size: 1.2rem;
          color: #00ffe1;
          margin: 0;
        }

        .input-controls, .output-controls {
          display: flex;
          gap: 0.5rem;
        }

        .control-btn {
          width: 40px;
          height: 40px;
          border: none;
          background: rgba(0, 255, 225, 0.1);
          color: #00ffe1;
          border-radius: 8px;
          font-size: 1.2rem;
          cursor: pointer;
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .control-btn:hover {
          background: rgba(0, 255, 225, 0.2);
          transform: translateY(-2px);
        }

        .cyber-textarea {
          width: 100%;
          background: rgba(0, 0, 0, 0.3);
          border: 1px solid rgba(0, 255, 225, 0.3);
          border-radius: 10px;
          padding: 1rem;
          color: #ffffff;
          font-family: 'JetBrains Mono', monospace;
          font-size: 0.95rem;
          line-height: 1.5;
          resize: vertical;
          min-height: 120px;
          transition: all 0.3s ease;
        }

        .cyber-textarea:focus {
          outline: none;
          border-color: #00ffe1;
          box-shadow: 0 0 20px rgba(0, 255, 225, 0.2);
        }

        .cyber-textarea::placeholder {
          color: #666;
        }

        .input-info {
          display: flex;
          justify-content: space-between;
          margin-top: 0.5rem;
          font-family: 'JetBrains Mono', monospace;
          font-size: 0.8rem;
          color: #888;
        }

        .shift-display {
          font-family: 'JetBrains Mono', monospace;
          color: #00ffe1;
          font-weight: 600;
          font-size: 1.1rem;
        }

        .shift-control {
          margin-bottom: 1.5rem;
        }

        .shift-control label {
          display: block;
          margin-bottom: 0.5rem;
          font-family: 'JetBrains Mono', monospace;
          color: #cccccc;
        }

        .slider-container {
          position: relative;
        }

        .cyber-slider {
          width: 100%;
          height: 6px;
          background: rgba(255, 255, 255, 0.1);
          border-radius: 3px;
          outline: none;
          margin-bottom: 0.5rem;
          -webkit-appearance: none;
        }

        .cyber-slider::-webkit-slider-thumb {
          -webkit-appearance: none;
          width: 20px;
          height: 20px;
          background: #00ffe1;
          border-radius: 50%;
          cursor: pointer;
          box-shadow: 0 0 10px rgba(0, 255, 225, 0.5);
        }

        .cyber-slider::-moz-range-thumb {
          width: 20px;
          height: 20px;
          background: #00ffe1;
          border-radius: 50%;
          cursor: pointer;
          border: none;
          box-shadow: 0 0 10px rgba(0, 255, 225, 0.5);
        }

        .slider-labels {
          display: flex;
          justify-content: space-between;
          font-family: 'JetBrains Mono', monospace;
          font-size: 0.8rem;
          color: #888;
        }

        .presets label {
          display: block;
          margin-bottom: 0.5rem;
          font-family: 'JetBrains Mono', monospace;
          color: #cccccc;
        }

        .preset-buttons {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
          gap: 0.5rem;
        }

        .preset-btn {
          padding: 0.75rem 1rem;
          border: 1px solid rgba(0, 255, 225, 0.3);
          background: rgba(0, 255, 225, 0.05);
          color: #00ffe1;
          border-radius: 8px;
          font-family: 'JetBrains Mono', monospace;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .preset-btn:hover {
          background: rgba(0, 255, 225, 0.1);
          border-color: #00ffe1;
        }

        .preset-btn.active {
          background: rgba(0, 255, 225, 0.2);
          border-color: #00ffe1;
          box-shadow: 0 0 10px rgba(0, 255, 225, 0.3);
        }

        .action-section {
          display: flex;
          justify-content: center;
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
          background: linear-gradient(45deg, #00ffe1, #00ccb8);
          color: #000;
          box-shadow: 0 5px 15px rgba(0, 255, 225, 0.3);
        }

        .action-btn:disabled {
          opacity: 0.5;
          cursor: not-allowed;
          transform: none !important;
        }

        .action-btn:not(:disabled):hover {
          transform: translateY(-3px);
          scale: 1.05;
          box-shadow: 0 8px 25px rgba(0, 255, 225, 0.5);
        }

        .copy-btn {
          background: rgba(0, 255, 225, 0.1);
          border: 1px solid rgba(0, 255, 225, 0.3);
          color: #00ffe1;
          padding: 0.5rem 1rem;
          border-radius: 8px;
          cursor: pointer;
          transition: all 0.3s ease;
          font-family: 'JetBrains Mono', monospace;
        }

        .copy-btn:hover {
          background: rgba(0, 255, 225, 0.2);
        }

        .output-content {
          background: rgba(0, 0, 0, 0.2);
          border-radius: 10px;
          padding: 1rem;
        }

        .cipher-info {
          display: flex;
          justify-content: space-between;
          margin-bottom: 1rem;
          font-family: 'JetBrains Mono', monospace;
          font-size: 0.9rem;
          color: #888;
        }

        .encoded-text {
          font-family: 'JetBrains Mono', monospace;
          background: rgba(255, 255, 255, 0.05);
          padding: 1rem;
          border-radius: 8px;
          line-height: 1.5;
          border-left: 3px solid #00ffe1;
          word-break: break-all;
        }

        .info-panel h4 {
          font-family: 'Orbitron', monospace;
          color: #00ffe1;
          margin-bottom: 1rem;
        }

        .info-panel p {
          font-family: 'JetBrains Mono', monospace;
          line-height: 1.6;
          color: #cccccc;
          margin-bottom: 1rem;
        }

        .cipher-examples {
          background: rgba(0, 255, 225, 0.05);
          border-left: 3px solid #00ffe1;
          padding: 1rem;
          border-radius: 8px;
        }

        .example {
          font-family: 'JetBrains Mono', monospace;
          color: #ffffff;
        }

        @media (max-width: 768px) {
          .tool-container {
            padding: 1rem;
          }
          
          .preset-buttons {
            grid-template-columns: repeat(2, 1fr);
          }
          
          .cipher-info {
            flex-direction: column;
            gap: 0.5rem;
          }
        }
      `}</style>
    </motion.div>
  );
}

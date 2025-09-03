import { useState } from "react";
import { motion } from "framer-motion";

export default function Base64Tool() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [mode, setMode] = useState("encode");
  const [copied, setCopied] = useState(false);

  const handleEncode = () => {
    try {
      setOutput(btoa(input));
    } catch {
      setOutput("⚠️ Invalid input for encoding.");
    }
  };

  const handleDecode = () => {
    try {
      setOutput(atob(input));
    } catch {
      setOutput("⚠️ Invalid Base64 string.");
    }
  };

  const handleCopy = async () => {
    if (output) {
      await navigator.clipboard.writeText(output);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleClear = () => {
    setInput("");
    setOutput("");
  };

  const handleSwap = () => {
    setInput(output);
    setOutput("");
  };

  const detectMode = (text) => {
    // Simple Base64 detection
    const base64Regex = /^[A-Za-z0-9+/]*={0,2}$/;
    return base64Regex.test(text) && text.length % 4 === 0 ? "decode" : "encode";
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    setInput(value);
    if (value) {
      setMode(detectMode(value));
    }
  };

  const pageVariants = {
    initial: { opacity: 0, y: 20 },
    in: { opacity: 1, y: 0 },
    out: { opacity: 0, y: -20 }
  };

  const pageTransition = {
    type: "tween",
    ease: "anticipate",
    duration: 0.5
  };

  return (
    <motion.div 
      className="tool-container"
      initial="initial"
      animate="in"
      exit="out"
      variants={pageVariants}
      transition={pageTransition}
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
          Base64 Encoder/Decoder
        </motion.h1>
        <motion.p 
          className="tool-description"
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          Encode and decode Base64 strings with automatic detection and advanced features
        </motion.p>
      </div>

      {/* Mode Indicator */}
      <motion.div 
        className="mode-indicator"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.4 }}
      >
        <span className={`mode-badge ${mode === 'encode' ? 'active' : ''}`}>
          📝 Encode Mode
        </span>
        <span className={`mode-badge ${mode === 'decode' ? 'active' : ''}`}>
          🔓 Decode Mode
        </span>
      </motion.div>

      {/* Main Content */}
      <div className="tool-content">
        <div className="input-section">
          <div className="section-header">
            <h3>Input</h3>
            <div className="input-controls">
              <button className="control-btn" onClick={handleClear} title="Clear">
                🗑️
              </button>
            </div>
          </div>
          <motion.textarea
            className="cyber-textarea"
            rows="6"
            value={input}
            onChange={handleInputChange}
            placeholder={mode === 'encode' ? "Enter text to encode..." : "Enter Base64 string to decode..."}
            whileFocus={{ scale: 1.02, transition: { duration: 0.2 } }}
          />
          <div className="input-info">
            <span>Characters: {input.length}</span>
            <span>Mode: {mode === 'encode' ? 'Text → Base64' : 'Base64 → Text'}</span>
          </div>
        </div>

        {/* Action Buttons */}
        <motion.div 
          className="action-section"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.5 }}
        >
          <button 
            className="action-btn primary"
            onClick={handleEncode}
            disabled={!input}
          >
            <span>🔒 Encode</span>
          </button>
          
          <button 
            className="action-btn secondary"
            onClick={handleDecode}
            disabled={!input}
          >
            <span>🔓 Decode</span>
          </button>

          {output && (
            <button className="action-btn tertiary" onClick={handleSwap} title="Swap input/output">
              ↕️ Swap
            </button>
          )}
        </motion.div>

        {/* Output Section */}
        <div className="output-section">
          <div className="section-header">
            <h3>Output</h3>
            <div className="output-controls">
              {output && (
                <button 
                  className={`control-btn ${copied ? 'success' : ''}`}
                  onClick={handleCopy}
                  title="Copy to clipboard"
                >
                  {copied ? '✅' : '📋'}
                </button>
              )}
            </div>
          </div>
          <motion.textarea
            className="cyber-textarea output"
            rows="6"
            value={output}
            readOnly
            placeholder="Result will appear here..."
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          />
          {output && (
            <div className="output-info">
              <span>Output length: {output.length}</span>
              {!output.startsWith('⚠️') && (
                <span className="success">✅ Operation successful</span>
              )}
            </div>
          )}
        </div>
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

        .mode-indicator {
          display: flex;
          justify-content: center;
          gap: 1rem;
          margin-bottom: 2rem;
        }

        .mode-badge {
          padding: 0.5rem 1rem;
          border-radius: 25px;
          font-family: 'JetBrains Mono', monospace;
          font-size: 0.9rem;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
          color: #666;
          transition: all 0.3s ease;
        }

        .mode-badge.active {
          background: rgba(0, 255, 225, 0.1);
          border-color: #00ffe1;
          color: #00ffe1;
          box-shadow: 0 0 15px rgba(0, 255, 225, 0.3);
        }

        .tool-content {
          max-width: 1000px;
          margin: 0 auto;
          display: grid;
          gap: 2rem;
        }

        .input-section, .output-section {
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

        .control-btn.success {
          background: rgba(0, 255, 0, 0.1);
          color: #00ff00;
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

        .cyber-textarea.output {
          background: rgba(0, 255, 225, 0.03);
        }

        .cyber-textarea::placeholder {
          color: #666;
        }

        .input-info, .output-info {
          display: flex;
          justify-content: space-between;
          margin-top: 0.5rem;
          font-family: 'JetBrains Mono', monospace;
          font-size: 0.8rem;
          color: #888;
        }

        .success {
          color: #00ff88 !important;
        }

        .action-section {
          display: flex;
          justify-content: center;
          gap: 1rem;
          flex-wrap: wrap;
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
          position: relative;
          overflow: hidden;
          min-width: 140px;
        }

        .action-btn:disabled {
          opacity: 0.5;
          cursor: not-allowed;
          transform: none !important;
        }

        .action-btn.primary {
          background: linear-gradient(45deg, #00ffe1, #0080ff);
          color: #000;
          box-shadow: 0 5px 15px rgba(0, 255, 225, 0.3);
        }

        .action-btn.secondary {
          background: rgba(0, 255, 225, 0.1);
          color: #00ffe1;
          border: 2px solid rgba(0, 255, 225, 0.3);
        }

        .action-btn.tertiary {
          background: rgba(255, 255, 255, 0.05);
          color: #ffffff;
          border: 2px solid rgba(255, 255, 255, 0.2);
        }

        .action-btn:not(:disabled):hover {
          transform: translateY(-3px);
          scale: 1.05;
        }

        .action-btn.primary:not(:disabled):hover {
          box-shadow: 0 8px 25px rgba(0, 255, 225, 0.5);
        }

        .action-btn.secondary:not(:disabled):hover {
          background: rgba(0, 255, 225, 0.2);
          border-color: #00ffe1;
        }

        .action-btn.tertiary:not(:disabled):hover {
          background: rgba(255, 255, 255, 0.1);
          border-color: rgba(255, 255, 255, 0.4);
        }

        @media (max-width: 768px) {
          .tool-container {
            padding: 1rem;
          }
          
          .mode-indicator {
            flex-direction: column;
            align-items: center;
          }
          
          .action-section {
            flex-direction: column;
            align-items: center;
          }
          
          .action-btn {
            width: 100%;
            max-width: 200px;
          }
        }
      `}</style>
    </motion.div>
  );
}

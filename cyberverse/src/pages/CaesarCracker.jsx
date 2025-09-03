import { useState } from "react";
import { motion } from "framer-motion";

export default function CaesarCracker() {
  const [input, setInput] = useState("");
  const [results, setResults] = useState([]);
  const [copiedShift, setCopiedShift] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [selectedShift, setSelectedShift] = useState(null);
  
  const commonWords = ["the", "and", "that", "have", "for", "not", "you", "with", "this", "but", "from", "they", "his", "her", "she", "will", "say", "can", "who", "get", "would", "make", "about", "flag", "ctf", "crypto", "cipher", "key", "encode", "decode"];
  const [bestGuess, setBestGuess] = useState(null);

  const crackCaesar = async () => {
    if (!input.trim()) return;
    
    setIsAnalyzing(true);
    const text = input.toUpperCase();
    const cracked = [];
    let bestScore = 0;
    let bestResult = null;

    // Add a small delay for animation effect
    await new Promise(resolve => setTimeout(resolve, 500));

    for (let shift = 1; shift < 26; shift++) {
      let decoded = "";
      for (let char of text) {
        if (/[A-Z]/.test(char)) {
          const code = ((char.charCodeAt(0) - 65 - shift + 26) % 26) + 65;
          decoded += String.fromCharCode(code);
        } else {
          decoded += char;
        }
      }

      // Enhanced scoring system
      const words = decoded.toLowerCase().split(/[^a-z]+/).filter(w => w.length > 2);
      const wordMatches = words.filter(w => commonWords.includes(w)).length;
      const vowelScore = (decoded.match(/[AEIOU]/g) || []).length / decoded.length;
      const repeatedLetterPenalty = (decoded.match(/(.)\1{2,}/g) || []).length;
      
      const totalScore = wordMatches * 10 + vowelScore * 5 - repeatedLetterPenalty;

      if (totalScore > bestScore) {
        bestScore = totalScore;
        bestResult = { shift, decoded, score: totalScore };
      }

      cracked.push({ shift, decoded, score: totalScore, wordMatches });
    }

    // Sort by score descending
    cracked.sort((a, b) => b.score - a.score);
    
    setResults(cracked);
    setBestGuess(bestResult);
    setIsAnalyzing(false);
  };

  const copyToClipboard = async (text, shift) => {
    await navigator.clipboard.writeText(text);
    setCopiedShift(shift);
    setTimeout(() => setCopiedShift(null), 2000);
  };

  const handleClear = () => {
    setInput("");
    setResults([]);
    setBestGuess(null);
    setSelectedShift(null);
  };

  const getConfidenceLevel = (score, maxScore) => {
    const percentage = (score / maxScore) * 100;
    if (percentage > 80) return { level: "High", color: "#00ff88", icon: "🎯" };
    if (percentage > 50) return { level: "Medium", color: "#ffd700", icon: "⚡" };
    if (percentage > 20) return { level: "Low", color: "#ff6b6b", icon: "❓" };
    return { level: "Very Low", color: "#666", icon: "❌" };
  };

  const maxScore = results.length > 0 ? results[0].score : 0;

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
          <span className="tool-icon">🕵️</span>
          Caesar Cipher Cracker
        </motion.h1>
        <motion.p 
          className="tool-description"
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          Advanced Caesar cipher analyzer with intelligent pattern recognition and confidence scoring
        </motion.p>
      </div>

      {/* Input Section */}
      <div className="tool-content">
        <div className="input-section">
          <div className="section-header">
            <h3>🔒 Encrypted Text</h3>
            <div className="input-controls">
              <button className="control-btn" onClick={handleClear} title="Clear all">
                🗑️
              </button>
            </div>
          </div>
          <motion.textarea
            className="cyber-textarea"
            rows="4"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Enter Caesar cipher encrypted text here..."
            whileFocus={{ scale: 1.02, transition: { duration: 0.2 } }}
          />
          <div className="input-info">
            <span>Characters: {input.length}</span>
            <span>Letters only: {input.replace(/[^A-Za-z]/g, '').length}</span>
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
            onClick={crackCaesar}
            disabled={!input.trim() || isAnalyzing}
          >
            {isAnalyzing ? (
              <span>🔄 Analyzing...</span>
            ) : (
              <span>🔓 Crack Cipher</span>
            )}
          </button>
        </motion.div>

        {/* Best Guess Section */}
        {bestGuess && (
          <motion.div 
            className="best-guess-section"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <div className="section-header">
              <h3>🎯 Best Guess</h3>
              <div className="confidence-badge">
                <span>{getConfidenceLevel(bestGuess.score, maxScore).icon}</span>
                <span>{getConfidenceLevel(bestGuess.score, maxScore).level} Confidence</span>
              </div>
            </div>
            <div className="best-guess-content">
              <div className="shift-info">
                <span className="shift-label">Shift: {bestGuess.shift}</span>
                <button 
                  className="copy-btn"
                  onClick={() => copyToClipboard(bestGuess.decoded, bestGuess.shift)}
                >
                  {copiedShift === bestGuess.shift ? '✅' : '📋'}
                </button>
              </div>
              <div className="decoded-text">{bestGuess.decoded}</div>
            </div>
          </motion.div>
        )}

        {/* Results Section */}
        {results.length > 0 && (
          <motion.div 
            className="results-section"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            <div className="section-header">
              <h3>📊 All Possibilities</h3>
              <span className="result-count">{results.length} shifts analyzed</span>
            </div>
            <div className="results-grid">
              {results.map((result, index) => {
                const confidence = getConfidenceLevel(result.score, maxScore);
                return (
                  <motion.div
                    key={result.shift}
                    className={`result-card ${selectedShift === result.shift ? 'selected' : ''}`}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 * index }}
                    onClick={() => setSelectedShift(selectedShift === result.shift ? null : result.shift)}
                  >
                    <div className="result-header">
                      <span className="shift-number">Shift {result.shift}</span>
                      <div className="result-meta">
                        <span className="confidence" style={{ color: confidence.color }}>
                          {confidence.icon} {confidence.level}
                        </span>
                        <button 
                          className="copy-btn-small"
                          onClick={(e) => {
                            e.stopPropagation();
                            copyToClipboard(result.decoded, result.shift);
                          }}
                        >
                          {copiedShift === result.shift ? '✅' : '📋'}
                        </button>
                      </div>
                    </div>
                    <div className="result-preview">
                      {result.decoded.substring(0, 100)}{result.decoded.length > 100 ? '...' : ''}
                    </div>
                    {result.wordMatches > 0 && (
                      <div className="word-matches">
                        🎯 {result.wordMatches} common word{result.wordMatches !== 1 ? 's' : ''} found
                      </div>
                    )}
                  </motion.div>
                );
              })}
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

        .tool-content {
          max-width: 1200px;
          margin: 0 auto;
          display: grid;
          gap: 2rem;
        }

        .input-section, .best-guess-section, .results-section {
          background: rgba(255, 255, 255, 0.02);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 107, 107, 0.2);
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
          color: #ff6b6b;
          margin: 0;
        }

        .input-controls {
          display: flex;
          gap: 0.5rem;
        }

        .control-btn {
          width: 40px;
          height: 40px;
          border: none;
          background: rgba(255, 107, 107, 0.1);
          color: #ff6b6b;
          border-radius: 8px;
          font-size: 1.2rem;
          cursor: pointer;
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .control-btn:hover {
          background: rgba(255, 107, 107, 0.2);
          transform: translateY(-2px);
        }

        .cyber-textarea {
          width: 100%;
          background: rgba(0, 0, 0, 0.3);
          border: 1px solid rgba(255, 107, 107, 0.3);
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
          border-color: #ff6b6b;
          box-shadow: 0 0 20px rgba(255, 107, 107, 0.2);
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
          min-width: 180px;
        }

        .action-btn.primary {
          background: linear-gradient(45deg, #ff6b6b, #ff8e8e);
          color: #000;
          box-shadow: 0 5px 15px rgba(255, 107, 107, 0.3);
        }

        .action-btn:disabled {
          opacity: 0.5;
          cursor: not-allowed;
          transform: none !important;
        }

        .action-btn:not(:disabled):hover {
          transform: translateY(-3px);
          scale: 1.05;
          box-shadow: 0 8px 25px rgba(255, 107, 107, 0.5);
        }

        .confidence-badge {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          background: rgba(0, 255, 136, 0.1);
          color: #00ff88;
          padding: 0.5rem 1rem;
          border-radius: 20px;
          font-family: 'JetBrains Mono', monospace;
          font-size: 0.8rem;
        }

        .best-guess-content {
          background: rgba(0, 0, 0, 0.2);
          border-radius: 10px;
          padding: 1rem;
        }

        .shift-info {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 1rem;
        }

        .shift-label {
          font-family: 'Orbitron', monospace;
          font-weight: 600;
          color: #00ff88;
        }

        .copy-btn {
          background: rgba(0, 255, 136, 0.1);
          border: 1px solid rgba(0, 255, 136, 0.3);
          color: #00ff88;
          padding: 0.5rem;
          border-radius: 8px;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .copy-btn:hover {
          background: rgba(0, 255, 136, 0.2);
        }

        .decoded-text {
          font-family: 'JetBrains Mono', monospace;
          background: rgba(255, 255, 255, 0.05);
          padding: 1rem;
          border-radius: 8px;
          line-height: 1.5;
          border-left: 3px solid #00ff88;
        }

        .result-count {
          font-family: 'JetBrains Mono', monospace;
          color: #888;
          font-size: 0.9rem;
        }

        .results-grid {
          display: grid;
          gap: 1rem;
          max-height: 600px;
          overflow-y: auto;
        }

        .result-card {
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 10px;
          padding: 1rem;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .result-card:hover {
          background: rgba(255, 255, 255, 0.08);
          border-color: rgba(255, 107, 107, 0.3);
        }

        .result-card.selected {
          border-color: #ff6b6b;
          background: rgba(255, 107, 107, 0.1);
        }

        .result-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 0.5rem;
        }

        .shift-number {
          font-family: 'Orbitron', monospace;
          font-weight: 600;
          color: #ffffff;
        }

        .result-meta {
          display: flex;
          align-items: center;
          gap: 1rem;
        }

        .confidence {
          font-family: 'JetBrains Mono', monospace;
          font-size: 0.8rem;
        }

        .copy-btn-small {
          background: transparent;
          border: none;
          color: #888;
          cursor: pointer;
          font-size: 1rem;
          transition: all 0.3s ease;
        }

        .copy-btn-small:hover {
          color: #ffffff;
        }

        .result-preview {
          font-family: 'JetBrains Mono', monospace;
          font-size: 0.9rem;
          color: #cccccc;
          line-height: 1.4;
          margin-bottom: 0.5rem;
        }

        .word-matches {
          font-family: 'JetBrains Mono', monospace;
          font-size: 0.8rem;
          color: #00ff88;
        }

        @media (max-width: 768px) {
          .tool-container {
            padding: 1rem;
          }
          
          .shift-info {
            flex-direction: column;
            gap: 1rem;
            align-items: flex-start;
          }
          
          .result-header {
            flex-direction: column;
            gap: 0.5rem;
            align-items: flex-start;
          }
        }
      `}</style>
    </motion.div>
  );
}

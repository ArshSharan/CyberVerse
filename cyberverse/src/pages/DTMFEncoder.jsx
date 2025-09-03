import React, { useState, useRef } from "react";
import { motion } from "framer-motion";
import { saveAs } from "file-saver";
import { Table } from "react-bootstrap";

const DTMF_MAP = {
  "1": [697, 1209], "2": [697, 1336], "3": [697, 1477],
  "4": [770, 1209], "5": [770, 1336], "6": [770, 1477],
  "7": [852, 1209], "8": [852, 1336], "9": [852, 1477],
  "*": [941, 1209], "0": [941, 1336], "#": [941, 1477]
};

const DTMF_LETTERS = {
  "2": "ABC", "3": "DEF", "4": "GHI", "5": "JKL",
  "6": "MNO", "7": "PQRS", "8": "TUV", "9": "WXYZ"
};

const getDurations = (speed) => {
  switch (speed) {
    case "fast": return { tone: 0.08, gap: 0.04 };
    case "slow": return { tone: 0.3, gap: 0.2 };
    default: return { tone: 0.15, gap: 0.1 };
  }
};

const DTMFEncoder = () => {
  const [input, setInput] = useState("");
  const [copied, setCopied] = useState(false);
  const [speed, setSpeed] = useState("normal");
  const [isPlaying, setIsPlaying] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [currentKey, setCurrentKey] = useState(null);
  const audioContextRef = useRef(null);

  const handleKeypadClick = (key) => {
    setInput((prev) => prev + key);
    playTone(key);
  };

  const handleTextInput = (e) => {
    const value = e.target.value.toUpperCase().replace(/[^0-9*#]/g, '');
    setInput(value);
  };

  const handleClear = () => {
    setInput("");
    setCopied(false);
  };

  const handleBackspace = () => {
    setInput(prev => prev.slice(0, -1));
  };

  const handleCopy = async () => {
    await navigator.clipboard.writeText(input);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const playTone = (key) => {
    const [low, high] = DTMF_MAP[key];
    if (!low || !high) return;

    const ctx = new (window.AudioContext || window.webkitAudioContext)();
    const osc1 = ctx.createOscillator();
    const osc2 = ctx.createOscillator();
    const gain = ctx.createGain();

    osc1.frequency.value = low;
    osc2.frequency.value = high;
    gain.gain.value = 0.1;

    osc1.connect(gain);
    osc2.connect(gain);
    gain.connect(ctx.destination);

    osc1.start();
    osc2.start();
    osc1.stop(ctx.currentTime + 0.1);
    osc2.stop(ctx.currentTime + 0.1);
  };

  const validKeys = input.split('').filter((char) => DTMF_MAP[char]);

  const playSequence = async () => {
    if (!input || isPlaying) return;
    
    setIsPlaying(true);
    const ctx = new (window.AudioContext || window.webkitAudioContext)();
    let time = ctx.currentTime;
    const { tone, gap } = getDurations(speed);

    for (let i = 0; i < input.length; i++) {
      const char = input[i];
      const [low, high] = DTMF_MAP[char] || [];
      if (!low || !high) continue;

      setCurrentKey(char);
      
      const osc1 = ctx.createOscillator();
      const osc2 = ctx.createOscillator();
      const gain = ctx.createGain();

      osc1.frequency.value = low;
      osc2.frequency.value = high;
      gain.gain.value = 0.15;

      osc1.connect(gain);
      osc2.connect(gain);
      gain.connect(ctx.destination);

      osc1.start(time);
      osc2.start(time);
      osc1.stop(time + tone);
      osc2.stop(time + tone);

      time += tone + gap;
      
      // Wait for the current tone to finish
      await new Promise(resolve => setTimeout(resolve, (tone + gap) * 1000));
    }
    
    setCurrentKey(null);
    setIsPlaying(false);
  };

  const downloadWav = async () => {
    if (!input || isGenerating) return;
    
    setIsGenerating(true);
    const { tone, gap } = getDurations(speed);
    const sampleRate = 44100;
    const totalDuration = input.length * (tone + gap);
    const offlineCtx = new OfflineAudioContext(1, sampleRate * totalDuration, sampleRate);
    let time = 0;

    input.split('').forEach((char) => {
      const [low, high] = DTMF_MAP[char] || [];
      if (!low || !high) return;

      const osc1 = offlineCtx.createOscillator();
      const osc2 = offlineCtx.createOscillator();
      const gain = offlineCtx.createGain();

      osc1.type = 'sine';
      osc2.type = 'sine';
      osc1.frequency.value = low;
      osc2.frequency.value = high;
      gain.gain.value = 0.3;

      osc1.connect(gain);
      osc2.connect(gain);
      gain.connect(offlineCtx.destination);

      osc1.start(time);
      osc2.start(time);
      osc1.stop(time + tone);
      osc2.stop(time + tone);

      time += tone + gap;
    });

    try {
      const rendered = await offlineCtx.startRendering();
      const buffer = rendered.getChannelData(0);
      const wavBuffer = encodeWAV(buffer, sampleRate);
      const blob = new Blob([wavBuffer], { type: 'audio/wav' });
      saveAs(blob, `dtmf_${input}_${speed}.wav`);
    } catch (error) {
      console.error('WAV generation failed:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  const encodeWAV = (samples, sampleRate) => {
    const buffer = new ArrayBuffer(44 + samples.length * 2);
    const view = new DataView(buffer);

    const writeString = (offset, str) =>
      str.split('').forEach((s, i) => view.setUint8(offset + i, s.charCodeAt(0)));

    writeString(0, 'RIFF');
    view.setUint32(4, 36 + samples.length * 2, true);
    writeString(8, 'WAVE');
    writeString(12, 'fmt ');
    view.setUint32(16, 16, true);
    view.setUint16(20, 1, true);
    view.setUint16(22, 1, true);
    view.setUint32(24, sampleRate, true);
    view.setUint32(28, sampleRate * 2, true);
    view.setUint16(32, 2, true);
    view.setUint16(34, 16, true);
    writeString(36, 'data');
    view.setUint32(40, samples.length * 2, true);

    for (let i = 0; i < samples.length; i++) {
      const s = Math.max(-1, Math.min(1, samples[i]));
      view.setInt16(44 + i * 2, s * 0x7fff, true);
    }

    return buffer;
  };

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
          <span className="tool-icon">📞</span>
          DTMF Tone Generator
        </motion.h1>
        <motion.p 
          className="tool-description"
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          Generate and play dual-tone multi-frequency signals for phone systems and audio analysis
        </motion.p>
      </div>

      <div className="tool-content">
        {/* Main Control Panel */}
        <div className="main-panel">
          {/* Input and Dialpad Side by Side */}
          <div className="input-dialpad-container">
            {/* Input Section */}
            <div className="input-section">
              <h3>📝 DTMF Sequence</h3>
              <div className="input-controls">
                <input
                  type="text"
                  value={input}
                  onChange={handleTextInput}
                  placeholder="123*456#789"
                  className="sequence-input"
                  maxLength={50}
                />
                <div className="control-buttons">
                  <button className="control-btn" onClick={handleBackspace} title="Backspace">⌫</button>
                  <button className="control-btn" onClick={handleClear} title="Clear">🗑️</button>
                </div>
              </div>
              <div className="sequence-info">
                <span>Keys: {input.length}</span>
                <span>Valid: {validKeys.length}</span>
                <span>~{(validKeys.length * 0.25).toFixed(1)}s</span>
              </div>
            </div>

            {/* Dialpad */}
            <div className="dialpad-section">
              <h3>📞 Virtual Dialpad</h3>
              <div className="dialpad">
                {["1", "2", "3", "4", "5", "6", "7", "8", "9", "*", "0", "#"].map((key, index) => (
                  <motion.button
                    key={key}
                    className={`dial-button ${currentKey === key ? 'active' : ''}`}
                    onClick={() => handleKeypadClick(key)}
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ delay: 0.05 * index, type: "spring" }}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    disabled={isPlaying}
                  >
                    <div className="key-main">{key}</div>
                    {DTMF_LETTERS[key] && (
                      <div className="key-letters">{DTMF_LETTERS[key]}</div>
                    )}
                  </motion.button>
                ))}
              </div>
            </div>
          </div>

          {/* Controls and Info */}
          <div className="controls-info-container">
            {/* Audio Controls */}
            <div className="controls-section">
              <h3>🎛️ Audio Controls</h3>
              <div className="controls-grid">
                <div className="speed-control">
                  <label>Playback Speed</label>
                  <select
                    value={speed}
                    onChange={(e) => setSpeed(e.target.value)}
                    className="speed-select"
                    disabled={isPlaying}
                  >
                    <option value="fast">Fast (80ms/100ms)</option>
                    <option value="normal">Normal (150ms/100ms)</option>
                    <option value="slow">Slow (300ms/200ms)</option>
                  </select>
                </div>

                <div className="action-buttons">
                  <button 
                    className="action-btn play"
                    onClick={playSequence}
                    disabled={!input || isPlaying}
                  >
                    {isPlaying ? '🔄 Playing...' : '▶️ Play Sequence'}
                  </button>
                  
                  <button 
                    className="action-btn download"
                    onClick={downloadWav}
                    disabled={!input || isGenerating}
                  >
                    {isGenerating ? '🔄 Generating...' : '💾 Download WAV'}
                  </button>
                  
                  <button 
                    className="action-btn copy"
                    onClick={handleCopy}
                    disabled={!input}
                  >
                    {copied ? '✅ Copied' : '📋 Copy Text'}
                  </button>
                </div>
              </div>
            </div>

            {/* DTMF Info */}
            <div className="info-section">
              <h3>📡 DTMF Matrix</h3>
              <div className="dtmf-matrix">
                <div className="matrix-header">
                  <div className="corner-cell"></div>
                  <div className="freq-cell high">1209 Hz</div>
                  <div className="freq-cell high">1336 Hz</div>
                  <div className="freq-cell high">1477 Hz</div>
                </div>
                <div className="matrix-row">
                  <div className="freq-cell low">697 Hz</div>
                  <div className="key-cell">1</div>
                  <div className="key-cell">2</div>
                  <div className="key-cell">3</div>
                </div>
                <div className="matrix-row">
                  <div className="freq-cell low">770 Hz</div>
                  <div className="key-cell">4</div>
                  <div className="key-cell">5</div>
                  <div className="key-cell">6</div>
                </div>
                <div className="matrix-row">
                  <div className="freq-cell low">852 Hz</div>
                  <div className="key-cell">7</div>
                  <div className="key-cell">8</div>
                  <div className="key-cell">9</div>
                </div>
                <div className="matrix-row">
                  <div className="freq-cell low">941 Hz</div>
                  <div className="key-cell">*</div>
                  <div className="key-cell">0</div>
                  <div className="key-cell">#</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Frequency Analysis - Only show if there are valid keys */}
        {validKeys.length > 0 && (
          <motion.div 
            className="frequency-section"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <div className="section-header">
              <h3>🔊 Frequency Analysis ({validKeys.length} tones)</h3>
            </div>
            
            <div className="frequency-grid">
              {validKeys.map((char, index) => {
                const [low, high] = DTMF_MAP[char];
                return (
                  <motion.div
                    key={`${char}-${index}`}
                    className={`freq-card ${currentKey === char ? 'playing' : ''}`}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.05 * index }}
                  >
                    <div className="freq-key">{char}</div>
                    <div className="freq-values">
                      <span className="freq-low">{low}</span>
                      <span className="freq-high">{high}</span>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        )}

        {/* Original Frequency Table */}
        {validKeys.length > 0 && (
          <motion.div 
            className="frequency-table-section"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
          >
            <div className="section-header">
              <h3>🔊 Frequency Pairs</h3>
            </div>
            <Table striped bordered hover variant="dark" className="frequency-table">
              <thead>
                <tr>
                  <th>Key</th>
                  <th>Low Freq (Hz)</th>
                  <th>High Freq (Hz)</th>
                </tr>
              </thead>
              <tbody>
                {validKeys.map((char, index) => {
                  const [low, high] = DTMF_MAP[char];
                  return (
                    <tr key={index} className={currentKey === char ? 'playing-row' : ''}>
                      <td>{char}</td>
                      <td>{low}</td>
                      <td>{high}</td>
                    </tr>
                  );
                })}
              </tbody>
            </Table>
          </motion.div>
        )}

        {/* Technology Info Section */}
        <motion.div 
          className="tech-info-section"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
        >
          <div className="info-content">
            <h3>📖 About DTMF Technology</h3>
            
            <div className="info-card">
              <h4>🔊 What is DTMF?</h4>
              <p>
                Dual-Tone Multi-Frequency (DTMF) signaling is used by telephone systems to represent digits and symbols. 
                Each key press generates two simultaneous tones - one from a low frequency group (697-941 Hz) and one from 
                a high frequency group (1209-1477 Hz). This dual-tone approach ensures reliable digit detection.
              </p>
            </div>

            <div className="info-card">
              <h4>📞 Applications</h4>
              <ul>
                <li>Traditional telephone dialing systems</li>
                <li>Interactive Voice Response (IVR) systems</li>
                <li>Remote control applications and automation</li>
                <li>Security systems and access control</li>
                <li>Telecommunications testing and debugging</li>
              </ul>
            </div>

            <div className="info-card">
              <h4>🎵 Technical Specifications</h4>
              <ul>
                <li>Standard tone duration: 50-100ms with 50ms gaps</li>
                <li>Low frequency group: 697, 770, 852, 941 Hz</li>
                <li>High frequency group: 1209, 1336, 1477 Hz</li>
                <li>Each key generates a unique frequency pair</li>
                <li>Designed to avoid harmonics and false detection</li>
              </ul>
            </div>

            <div className="info-card">
              <h4>🎯 Tool Features</h4>
              <ul>
                <li>Generate DTMF sequences with custom timing</li>
                <li>Export sequences as WAV audio files</li>
                <li>Real-time frequency analysis and visualization</li>
                <li>Interactive virtual dialpad with audio feedback</li>
                <li>Educational matrix showing frequency relationships</li>
              </ul>
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
          max-width: 1200px;
          margin: 0 auto;
          display: grid;
          gap: 1.5rem;
        }

        .main-panel {
          background: rgba(255, 255, 255, 0.02);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(0, 255, 225, 0.2);
          border-radius: 15px;
          padding: 1.5rem;
        }

        .input-dialpad-container {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 2rem;
          margin-bottom: 1rem;
          align-items: start;
        }

        .controls-info-container {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 2rem;
        }

        .input-section, .dialpad-section, .controls-section, .info-section {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .input-section h3, .dialpad-section h3, .controls-section h3, .info-section h3 {
          font-family: 'Orbitron', monospace;
          font-size: 1.1rem;
          color: #00ffe1;
          margin: 0;
          text-align: center;
        }

        .input-controls {
          display: flex;
          gap: 0.5rem;
          align-items: center;
        }

        .sequence-input {
          flex: 1;
          background: rgba(0, 0, 0, 0.3);
          border: 2px solid rgba(0, 255, 225, 0.3);
          border-radius: 10px;
          padding: 0.75rem 1rem;
          color: #ffffff;
          font-family: 'Orbitron', monospace;
          font-size: 1.2rem;
          text-align: center;
          letter-spacing: 0.1em;
          transition: all 0.3s ease;
        }

        .sequence-input:focus {
          outline: none;
          border-color: #00ffe1;
          box-shadow: 0 0 20px rgba(0, 255, 225, 0.3);
          text-shadow: 0 0 5px #00ffe1;
        }

        .sequence-input::placeholder {
          color: #666;
          letter-spacing: normal;
        }

        .control-buttons {
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
          font-size: 1.1rem;
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

        .sequence-info {
          display: flex;
          justify-content: center;
          gap: 1rem;
          font-family: 'JetBrains Mono', monospace;
          font-size: 0.8rem;
          color: #888;
        }

        .dialpad {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 0.75rem;
          max-width: 300px;
          margin: 0 auto;
        }

        .dial-button {
          aspect-ratio: 1;
          border: none;
          background: linear-gradient(145deg, #1a1a2e, #16213e);
          color: #00ffe1;
          border-radius: 50%;
          font-family: 'Orbitron', monospace;
          cursor: pointer;
          transition: all 0.3s ease;
          position: relative;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          border: 2px solid rgba(0, 255, 225, 0.3);
          min-height: 65px;
        }

        .dial-button:hover {
          background: linear-gradient(145deg, #00ffe1, #00ccb8);
          color: #000;
          transform: translateY(-3px);
          box-shadow: 0 8px 20px rgba(0, 255, 225, 0.4);
        }

        .dial-button:active {
          transform: translateY(-1px);
        }

        .dial-button.active {
          background: linear-gradient(145deg, #00ffe1, #00ccb8);
          color: #000;
          box-shadow: 0 0 25px rgba(0, 255, 225, 0.8);
          animation: pulse 0.3s ease-in-out;
        }

        .dial-button:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }

        .key-main {
          font-size: 1.6rem;
          font-weight: 900;
        }

        .key-letters {
          font-size: 0.6rem;
          font-weight: 400;
          margin-top: 2px;
          opacity: 0.8;
        }

        @keyframes pulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.05); }
        }

        .controls-content {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .controls-grid {
          display: grid;
          gap: 2rem;
          grid-template-columns: 1fr 2fr;
          align-items: center;
        }

        .speed-control {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .speed-control label {
          font-family: 'JetBrains Mono', monospace;
          color: #ffffff;
          font-weight: 600;
          font-size: 0.9rem;
        }

        .speed-select {
          background: rgba(0, 0, 0, 0.3);
          border: 1px solid rgba(0, 255, 225, 0.3);
          border-radius: 8px;
          padding: 0.5rem;
          color: #ffffff;
          font-family: 'JetBrains Mono', monospace;
          font-size: 0.9rem;
        }

        .speed-select:focus {
          outline: none;
          border-color: #00ffe1;
          box-shadow: 0 0 10px rgba(0, 255, 225, 0.3);
        }

        .action-buttons {
          display: flex;
          gap: 1rem;
          flex-wrap: wrap;
        }

        .action-btn {
          flex: 1;
          min-width: 140px;
          padding: 0.75rem 1rem;
          border: none;
          border-radius: 25px;
          font-family: 'JetBrains Mono', monospace;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .action-btn.play {
          background: linear-gradient(45deg, #00ff88, #00cc6a);
          color: #000;
        }

        .action-btn.download {
          background: linear-gradient(45deg, #ff6b6b, #ff5252);
          color: #000;
        }

        .action-btn.copy {
          background: linear-gradient(45deg, #00ffe1, #00ccb8);
          color: #000;
        }

        .action-btn:disabled {
          opacity: 0.5;
          cursor: not-allowed;
          transform: none !important;
        }

        .action-btn:not(:disabled):hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(255, 255, 255, 0.3);
        }

        .dtmf-matrix {
          display: grid;
          grid-template-rows: auto repeat(4, 1fr);
          gap: 2px;
          background: rgba(0, 0, 0, 0.3);
          padding: 8px;
          border-radius: 8px;
          border: 1px solid rgba(0, 255, 225, 0.2);
        }

        .matrix-header {
          display: grid;
          grid-template-columns: 80px repeat(3, 1fr);
          gap: 2px;
        }

        .matrix-row {
          display: grid;
          grid-template-columns: 80px repeat(3, 1fr);
          gap: 2px;
        }

        .corner-cell {
          background: rgba(0, 0, 0, 0.5);
          border-radius: 4px;
        }

        .freq-cell {
          background: rgba(0, 255, 225, 0.1);
          color: #00ffe1;
          padding: 6px 4px;
          text-align: center;
          font-family: 'JetBrains Mono', monospace;
          font-size: 0.7rem;
          font-weight: 600;
          border-radius: 4px;
          border: 1px solid rgba(0, 255, 225, 0.2);
        }

        .freq-cell.low {
          background: rgba(255, 107, 107, 0.1);
          color: #ff6b6b;
          border-color: rgba(255, 107, 107, 0.2);
        }

        .freq-cell.high {
          background: rgba(0, 255, 136, 0.1);
          color: #00ff88;
          border-color: rgba(0, 255, 136, 0.2);
        }

        .key-cell {
          background: rgba(255, 255, 255, 0.05);
          color: #ffffff;
          padding: 8px;
          text-align: center;
          font-family: 'Orbitron', monospace;
          font-size: 1rem;
          font-weight: 700;
          border-radius: 4px;
          border: 1px solid rgba(255, 255, 255, 0.1);
          transition: all 0.3s ease;
        }

        .key-cell:hover {
          background: rgba(0, 255, 225, 0.1);
          color: #00ffe1;
          border-color: rgba(0, 255, 225, 0.3);
        }

        .frequency-section {
          background: rgba(255, 255, 255, 0.02);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(0, 255, 225, 0.2);
          border-radius: 15px;
          padding: 1.5rem;
        }

        .frequency-table-section {
          background: rgba(255, 255, 255, 0.02);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(0, 255, 225, 0.2);
          border-radius: 15px;
          padding: 1.5rem;
        }

        .section-header {
          margin-bottom: 1rem;
        }

        .section-header h3 {
          font-family: 'Orbitron', monospace;
          font-size: 1.1rem;
          color: #00ffe1;
          margin: 0;
          text-align: center;
        }

        .frequency-table {
          font-family: 'JetBrains Mono', monospace;
        }

        .frequency-table th {
          background: rgba(0, 255, 225, 0.1);
          color: #00ffe1;
          border-color: rgba(0, 255, 225, 0.3);
          text-align: center;
        }

        .frequency-table td {
          text-align: center;
          border-color: rgba(255, 255, 255, 0.1);
        }

        .frequency-table .playing-row {
          background: rgba(0, 255, 225, 0.1);
          color: #00ffe1;
        }

        .frequency-table .playing-row td {
          border-color: rgba(0, 255, 225, 0.3);
        }

        .frequency-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
          gap: 0.75rem;
        }

        .freq-card {
          background: rgba(0, 0, 0, 0.2);
          border: 1px solid rgba(0, 255, 225, 0.2);
          border-radius: 8px;
          padding: 0.75rem;
          text-align: center;
          transition: all 0.3s ease;
        }

        .freq-card.playing {
          border-color: #00ffe1;
          background: rgba(0, 255, 225, 0.1);
          box-shadow: 0 0 15px rgba(0, 255, 225, 0.3);
        }

        .freq-key {
          font-family: 'Orbitron', monospace;
          font-size: 1.5rem;
          font-weight: 900;
          color: #00ffe1;
          margin-bottom: 0.25rem;
        }

        .freq-values {
          display: flex;
          justify-content: space-between;
          gap: 0.25rem;
        }

        .freq-low, .freq-high {
          font-family: 'JetBrains Mono', monospace;
          font-size: 0.7rem;
          padding: 0.2rem 0.4rem;
          border-radius: 4px;
          flex: 1;
          text-align: center;
        }

        .freq-low {
          background: rgba(255, 107, 107, 0.2);
          color: #ff6b6b;
        }

        .freq-high {
          background: rgba(0, 255, 136, 0.2);
          color: #00ff88;
        }

        .tech-info-section {
          background: rgba(255, 255, 255, 0.02);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(0, 255, 225, 0.2);
          border-radius: 15px;
          padding: 1.5rem;
        }

        .info-content h3 {
          font-family: 'Orbitron', monospace;
          color: #00ffe1;
          margin-bottom: 2rem;
          text-align: center;
          font-size: 1.4rem;
        }

        .info-card {
          background: rgba(0, 0, 0, 0.2);
          border-radius: 10px;
          padding: 1.5rem;
          margin-bottom: 1.5rem;
          border-left: 3px solid #00ffe1;
          transition: all 0.3s ease;
        }

        .info-card:hover {
          border-left-color: #00ccb8;
          transform: translateX(5px);
          box-shadow: 0 4px 12px rgba(0, 255, 225, 0.1);
        }

        .info-card h4 {
          font-family: 'Orbitron', monospace;
          color: #ffffff;
          margin-bottom: 1rem;
          font-size: 1.1rem;
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .info-card p, .info-card li {
          font-family: 'JetBrains Mono', monospace;
          line-height: 1.6;
          color: #cccccc;
          font-size: 0.95rem;
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
          
          .input-dialpad-container {
            grid-template-columns: 1fr;
            gap: 1.5rem;
          }
          
          .controls-info-container {
            grid-template-columns: 1fr;
            gap: 1.5rem;
          }

          .controls-grid {
            grid-template-columns: 1fr;
            gap: 1rem;
          }
          
          .dialpad {
            max-width: 280px;
          }
          
          .dial-button {
            min-height: 55px;
          }
          
          .key-main {
            font-size: 1.4rem;
          }
          
          .action-buttons {
            justify-content: center;
          }
          
          .frequency-grid {
            grid-template-columns: repeat(auto-fit, minmax(80px, 1fr));
          }

          .info-card {
            padding: 1rem;
            margin-bottom: 1rem;
          }

          .info-card h4 {
            font-size: 1rem;
          }

          .info-card p, .info-card li {
            font-size: 0.85rem;
          }

          .dtmf-matrix {
            font-size: 0.8rem;
          }

          .matrix-header, .matrix-row {
            grid-template-columns: 60px repeat(3, 1fr);
          }

          .freq-cell {
            font-size: 0.6rem;
            padding: 4px 2px;
          }
        }
      `}</style>
    </motion.div>
  );
};

export default DTMFEncoder;

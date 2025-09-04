import React from 'react';
import { motion } from 'framer-motion';
import { FaWaveSquare, FaMicrophone, FaCloudUploadAlt, FaChartLine } from 'react-icons/fa';
import { HiOutlineSparkles } from 'react-icons/hi';

export default function DTMFDecoder() {
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
          <span className="tool-icon">
            <FaWaveSquare />
          </span>
          DTMF Audio Decoder
        </motion.h1>
        <motion.p 
          className="tool-description"
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          Advanced digital signal processing for decoding DTMF tones from audio files and real-time streams
        </motion.p>
      </div>

      {/* Feature Cards */}
      <motion.div 
        className="features-grid"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <div className="feature-card">
          <FaCloudUploadAlt className="feature-icon" />
          <h3>Audio Upload</h3>
          <p>Support for multiple audio formats including WAV, MP3, and M4A</p>
        </div>
        <div className="feature-card">
          <FaMicrophone className="feature-icon" />
          <h3>Real-time Processing</h3>
          <p>Live microphone input for immediate DTMF tone detection</p>
        </div>
        <div className="feature-card">
          <FaChartLine className="feature-icon" />
          <h3>Signal Analysis</h3>
          <p>Advanced DSP algorithms with frequency domain visualization</p>
        </div>
        <div className="feature-card">
          <HiOutlineSparkles className="feature-icon" />
          <h3>High Accuracy</h3>
          <p>Professional-grade detection with noise filtering and validation</p>
        </div>
      </motion.div>

      {/* Main Tool */}
      <motion.div 
        className="tool-embed"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.6 }}
      >
        <div className="embed-header">
          <h3>DTMF Audio Analyzer</h3>
          <div className="embed-controls">
            <span className="status-indicator active">Live Tool</span>
          </div>
        </div>
        <div className="embed-container">
          <iframe
            src="https://dtmf-decoder-online.onrender.com/"
            width="100%"
            height="720px"
            style={{ border: 'none', backgroundColor: '#000', borderRadius: '0 0 15px 15px' }}
            title="DTMF Decoder"
          />
        </div>
      </motion.div>

      {/* Technology Info */}
      <motion.div 
        className="tech-info-section"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
      >
        <div className="info-content">
          <h3>🔊 About DTMF Audio Analysis</h3>
          
          <div className="info-card">
            <h4>🎵 Signal Processing</h4>
            <p>
              DTMF decoding uses advanced Fast Fourier Transform (FFT) algorithms to analyze audio signals in the frequency domain. 
              The decoder identifies simultaneous tone pairs and maps them to their corresponding keypad digits with high precision.
            </p>
          </div>

          <div className="info-card">
            <h4>📊 Detection Methods</h4>
            <ul>
              <li>Frequency domain analysis using FFT windowing</li>
              <li>Goertzel algorithm for precise tone detection</li>
              <li>Temporal consistency checking and validation</li>
              <li>Noise filtering and signal conditioning</li>
              <li>Adaptive threshold adjustment for various audio qualities</li>
            </ul>
          </div>

          <div className="info-card">
            <h4>🎯 Applications</h4>
            <ul>
              <li>Forensic analysis of recorded phone conversations</li>
              <li>Telecommunications system testing and debugging</li>
              <li>Security system access code recovery</li>
              <li>Vintage phone system integration and analysis</li>
              <li>Educational research in digital signal processing</li>
            </ul>
          </div>

          <div className="info-card">
            <h4>⚡ Performance Features</h4>
            <ul>
              <li>Real-time processing with minimal latency</li>
              <li>Batch processing for multiple audio files</li>
              <li>Export results in various formats (CSV, JSON, TXT)</li>
              <li>Confidence scoring for each detected tone</li>
              <li>Visual waveform and spectrogram display</li>
            </ul>
          </div>
        </div>
      </motion.div>

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
          font-family: 'Space Grotesk', 'Segoe UI', system-ui, sans-serif;
          font-size: clamp(2rem, 4vw, 3rem);
          font-weight: 900;
          color: #ffffff;
          margin-bottom: 1rem;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 1rem;
          letter-spacing: -0.025em;
        }

        .tool-icon {
          font-size: 0.8em;
          color: #00ffe1;
          text-shadow: 0 0 20px #00ffe1;
        }

        .tool-description {
          font-family: 'Inter', 'Segoe UI', system-ui, sans-serif;
          font-size: 1.125rem;
          font-weight: 500;
          color: #a0a0a0;
          line-height: 1.75;
          margin: 0;
        }

        .features-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 1.5rem;
          margin-bottom: 3rem;
          max-width: 1200px;
          margin-left: auto;
          margin-right: auto;
        }

        .feature-card {
          background: rgba(255, 255, 255, 0.02);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(0, 255, 225, 0.2);
          border-radius: 15px;
          padding: 1.5rem;
          text-align: center;
          transition: all 0.3s ease;
        }

        .feature-card:hover {
          transform: translateY(-5px);
          border-color: rgba(0, 255, 225, 0.4);
          box-shadow: 0 10px 30px rgba(0, 255, 225, 0.1);
        }

        .feature-icon {
          font-size: 2rem;
          color: #00ffe1;
          margin-bottom: 1rem;
          filter: drop-shadow(0 0 10px rgba(0, 255, 225, 0.3));
        }

        .feature-card h3 {
          font-family: 'Space Grotesk', 'Segoe UI', system-ui, sans-serif;
          font-size: 1.125rem;
          font-weight: 600;
          color: #ffffff;
          margin-bottom: 0.75rem;
        }

        .feature-card p {
          font-family: 'Inter', 'Segoe UI', system-ui, sans-serif;
          font-size: 0.875rem;
          color: #cccccc;
          line-height: 1.75;
          margin: 0;
        }

        .tool-embed {
          background: rgba(255, 255, 255, 0.02);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(0, 255, 225, 0.2);
          border-radius: 15px;
          overflow: hidden;
          margin-bottom: 3rem;
          max-width: 1200px;
          margin-left: auto;
          margin-right: auto;
        }

        .embed-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 1rem 1.5rem;
          background: rgba(0, 0, 0, 0.3);
          border-bottom: 1px solid rgba(0, 255, 225, 0.2);
        }

        .embed-header h3 {
          font-family: var(--font-display);
          font-size: var(--fs-lg);
          font-weight: var(--fw-semibold);
          color: #00ffe1;
          margin: 0;
        }

        .embed-controls {
          display: flex;
          gap: 0.5rem;
        }

        .status-indicator {
          font-family: var(--font-mono);
          font-size: var(--fs-xs);
          padding: 0.25rem 0.75rem;
          border-radius: 20px;
          background: rgba(0, 255, 136, 0.1);
          color: #00ff88;
          border: 1px solid rgba(0, 255, 136, 0.3);
        }

        .status-indicator.active {
          animation: pulse-green 2s infinite;
        }

        @keyframes pulse-green {
          0%, 100% { box-shadow: 0 0 5px rgba(0, 255, 136, 0.3); }
          50% { box-shadow: 0 0 15px rgba(0, 255, 136, 0.6); }
        }

        .embed-container {
          position: relative;
          overflow: hidden;
        }

        .tech-info-section {
          background: rgba(255, 255, 255, 0.02);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(0, 255, 225, 0.2);
          border-radius: 15px;
          padding: 1.5rem;
          max-width: 1200px;
          margin: 0 auto;
        }

        .info-content h3 {
          font-family: 'Space Grotesk', 'Segoe UI', system-ui, sans-serif;
          color: #00ffe1;
          margin-bottom: 2rem;
          text-align: center;
          font-size: 1.5rem;
          font-weight: 700;
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
          font-family: 'Space Grotesk', 'Segoe UI', system-ui, sans-serif;
          color: #ffffff;
          margin-bottom: 1rem;
          font-size: 1.125rem;
          font-weight: 600;
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .info-card p, .info-card li {
          font-family: 'Inter', 'Segoe UI', system-ui, sans-serif;
          line-height: 1.75;
          color: #cccccc;
          font-size: 1rem;
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

          .features-grid {
            grid-template-columns: 1fr;
            gap: 1rem;
          }

          .embed-header {
            flex-direction: column;
            gap: 0.5rem;
            text-align: center;
          }

          .info-card {
            padding: 1rem;
            margin-bottom: 1rem;
          }

          .info-card h4 {
            font-size: 1rem;
          }

          .info-card p, .info-card li {
            font-size: 0.875rem;
          }
        }
      `}</style>
    </motion.div>
  );
}

import React from 'react';
import { motion } from 'framer-motion';
import { FaMusic, FaLock, FaEyeSlash, FaDownload } from 'react-icons/fa';
import { HiOutlineSparkles, HiOutlineShieldCheck } from 'react-icons/hi';
import { RiSoundModuleLine, RiSecurePaymentLine } from 'react-icons/ri';

export default function AudioSteganography() {
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
            <RiSoundModuleLine />
          </span>
          Audio Steganography Suite
        </motion.h1>
        <motion.p 
          className="tool-description"
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          Advanced digital steganography for hiding and extracting secret messages within audio files using sophisticated signal processing
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
          <FaEyeSlash className="feature-icon" />
          <h3>Message Hiding</h3>
          <p>Embed secret text, files, or binary data invisibly within audio waveforms</p>
        </div>
        <div className="feature-card">
          <HiOutlineSparkles className="feature-icon" />
          <h3>Data Extraction</h3>
          <p>Recover hidden messages from steganographic audio with precision algorithms</p>
        </div>
        <div className="feature-card">
          <RiSecurePaymentLine className="feature-icon" />
          <h3>Encryption Layer</h3>
          <p>Optional password protection and encryption for enhanced security</p>
        </div>
        <div className="feature-card">
          <FaMusic className="feature-icon" />
          <h3>Audio Formats</h3>
          <p>Support for WAV, MP3, FLAC, and other popular audio file formats</p>
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
          <h3>Steganography Workbench</h3>
          <div className="embed-controls">
            <span className="status-indicator active">Secure Environment</span>
            <span className="encryption-badge">🔒 Encrypted</span>
          </div>
        </div>
        <div className="embed-container">
          <iframe
            src="https://audio-steganography-tool.onrender.com/"
            width="100%"
            height="720px"
            style={{ border: 'none', backgroundColor: '#000', borderRadius: '0 0 15px 15px' }}
            title="Audio Steganography"
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
          <h3>🔊 About Audio Steganography</h3>
          
          <div className="info-card">
            <h4>🎵 Steganographic Techniques</h4>
            <p>
              Audio steganography employs various embedding methods including LSB (Least Significant Bit) substitution, 
              phase encoding, spread spectrum, and echo hiding. These techniques ensure the hidden data remains imperceptible 
              to human hearing while maintaining audio quality.
            </p>
          </div>

          <div className="info-card">
            <h4>🔐 Security Features</h4>
            <ul>
              <li>LSB substitution with random bit distribution</li>
              <li>Phase modulation for robust data hiding</li>
              <li>Spread spectrum watermarking techniques</li>
              <li>AES encryption for sensitive payload data</li>
              <li>Steganographic key generation and management</li>
            </ul>
          </div>

          <div className="info-card">
            <h4>🎯 Use Cases</h4>
            <ul>
              <li>Covert communication and secure messaging</li>
              <li>Digital watermarking and copyright protection</li>
              <li>Forensic investigation and evidence analysis</li>
              <li>Research in information hiding techniques</li>
              <li>Privacy protection in digital communications</li>
            </ul>
          </div>

          <div className="info-card">
            <h4>⚡ Technical Capabilities</h4>
            <ul>
              <li>Capacity estimation and optimization algorithms</li>
              <li>Real-time audio quality assessment (PSNR, SNR)</li>
              <li>Steganalysis resistance and detection evasion</li>
              <li>Batch processing for multiple audio files</li>
              <li>Custom embedding parameters and fine-tuning</li>
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
          font-family: var(--font-display);
          font-size: clamp(2rem, 4vw, 3rem);
          font-weight: var(--fw-black);
          color: #ffffff;
          margin-bottom: 1rem;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 1rem;
          letter-spacing: var(--ls-tight);
        }

        .tool-icon {
          font-size: 0.8em;
          color: #00ffe1;
          text-shadow: 0 0 20px #00ffe1;
        }

        .tool-description {
          font-family: var(--font-body);
          font-size: var(--fs-lg);
          font-weight: var(--fw-medium);
          color: #a0a0a0;
          line-height: var(--lh-relaxed);
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
          font-family: var(--font-display);
          font-size: var(--fs-lg);
          font-weight: var(--fw-semibold);
          color: #ffffff;
          margin-bottom: 0.75rem;
        }

        .feature-card p {
          font-family: var(--font-body);
          font-size: var(--fs-sm);
          color: #cccccc;
          line-height: var(--lh-relaxed);
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

        .encryption-badge {
          font-family: var(--font-mono);
          font-size: var(--fs-xs);
          padding: 0.25rem 0.75rem;
          border-radius: 20px;
          background: rgba(255, 215, 0, 0.1);
          color: #ffd700;
          border: 1px solid rgba(255, 215, 0, 0.3);
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
          font-family: var(--font-display);
          color: #00ffe1;
          margin-bottom: 2rem;
          text-align: center;
          font-size: var(--fs-2xl);
          font-weight: var(--fw-bold);
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
          font-family: var(--font-display);
          color: #ffffff;
          margin-bottom: 1rem;
          font-size: var(--fs-lg);
          font-weight: var(--fw-semibold);
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .info-card p, .info-card li {
          font-family: var(--font-body);
          line-height: var(--lh-relaxed);
          color: #cccccc;
          font-size: var(--fs-base);
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

          .embed-controls {
            justify-content: center;
          }

          .info-card {
            padding: 1rem;
            margin-bottom: 1rem;
          }

          .info-card h4 {
            font-size: var(--fs-base);
          }

          .info-card p, .info-card li {
            font-size: var(--fs-sm);
          }
        }
      `}</style>
    </motion.div>
  );
}

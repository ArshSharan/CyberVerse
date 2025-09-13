import React from 'react';
import { motion } from 'framer-motion';
import { 
  FaWaveSquare,
  FaMicrophone,
  FaChartLine,
  FaVolumeUp,
  FaPlay,
  FaDownload,
  FaCog,
  FaEye
} from "react-icons/fa";
import { 
  HiOutlineAdjustments,
  HiOutlineMusicNote
} from "react-icons/hi";
import { 
  RiSoundModuleLine,
} from "react-icons/ri";

export default function SoundWaveAnalyzer() {
  const analysisFeatures = [
    {
      icon: <FaWaveSquare size={24} />,
      title: "Waveform Analysis",
      description: "Visualize audio signals in time domain with amplitude and frequency data",
      color: "#00ffe1"
    },
    {
      icon: <FaChartLine size={24} />,
      title: "FFT Spectrum",
      description: "Fast Fourier Transform analysis for frequency domain representation",
      color: "#ff6b6b"
    },
    {
      icon: <RiSoundModuleLine size={24} />,
      title: "Live Spectrogram",
      description: "Real-time frequency analysis with time-frequency domain visualization",
      color: "#4ecdc4"
    }
  ];

  const capabilities = [
    { name: "File Formats", value: "WAV, MP3, FLAC, OGG", icon: <FaVolumeUp size={16} /> },
    { name: "Sample Rates", value: "8kHz - 192kHz", icon: <FaChartLine size={16} /> },
    { name: "Bit Depths", value: "16, 24, 32-bit", icon: <HiOutlineAdjustments size={16} /> },
    { name: "Analysis Types", value: "Time, Frequency, Phase", icon: <RiSoundModuleLine size={16} /> },
  ];

  const technicalSpecs = [
    "High-resolution waveform display with zoom capabilities",
    "Real-time FFT analysis with configurable window sizes",
    "Spectrogram visualization with customizable color mapping",
    "Audio playback controls with precise timing",
    "Export capabilities for analysis results",
    "Support for both mono and stereo audio files"
  ];

  return (
    <div className="analyzer-container">
      {/* Hero Header */}
      <motion.div 
        className="hero-header"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <div className="hero-content">
          <div className="icon-wrapper">
            <RiSoundModuleLine size={48} />
          </div>
          <h1 className="page-title">SOUND WAVE ANALYZER</h1>
          <p className="page-subtitle">
            Advanced audio signal processing and visualization toolkit for forensic analysis
          </p>
          <div className="tech-badges">
            <div className="tech-badge">
              <FaWaveSquare size={16} />
              <span>SIGNAL PROCESSING</span>
            </div>
            <div className="tech-badge">
              <FaMicrophone size={16} />
              <span>AUDIO FORENSICS</span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Analysis Features */}
      <motion.section 
        className="features-section"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.8 }}
      >
        <h2 className="section-title">Analysis Capabilities</h2>
        <div className="features-grid">
          {analysisFeatures.map((feature, index) => (
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
        <div className="capabilities-grid">
          <div className="capabilities-column">
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
          </div>
          
          <div className="capabilities-column">
            <h3 className="capabilities-title">Features Overview</h3>
            <div className="features-list">
              {technicalSpecs.map((spec, index) => (
                <motion.div
                  key={index}
                  className="feature-item"
                  initial={{ x: 30, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 1 + index * 0.1, duration: 0.5 }}
                >
                  <div className="feature-bullet">
                    <FaEye size={12} />
                  </div>
                  <span>{spec}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </motion.section>

      {/* Tool Embed */}
      <motion.section 
        className="tool-section"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2, duration: 0.8 }}
      >
        <div className="tool-header">
          <h2 className="tool-title">Live Analysis Tool</h2>
          <div className="tool-controls">
            <div className="tool-status">
              <div className="status-indicator"></div>
              <span>READY TO ANALYZE</span>
            </div>
          </div>
        </div>
        
        <div className="tool-wrapper">
          <iframe
            src="https://sound-wave-analyzer-1.onrender.com/"
            width="100%"
            height="720px"
            style={{ border: 'none', backgroundColor: '#000' }}
            title="Sound Wave Analyzer"
          />
        </div>

        <div className="tool-info">
          <div className="info-item">
            <FaPlay size={16} />
            <span>Real-time playback with synchronized visualization</span>
          </div>
          <div className="info-item">
            <FaCog size={16} />
            <span>Configurable analysis parameters and display options</span>
          </div>
          <div className="info-item">
            <FaDownload size={16} />
            <span>Export waveforms and spectrograms in high resolution</span>
          </div>
        </div>
      </motion.section>

      <style jsx>{`
        .analyzer-container {
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
          max-width: 1200px;
          margin: 0 auto 4rem;
        }

        .capabilities-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(500px, 1fr));
          gap: 3rem;
        }

        .capabilities-column {
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

        .features-list {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .feature-item {
          display: flex;
          align-items: flex-start;
          gap: 0.8rem;
          font-family: 'Inter', sans-serif;
          font-size: 0.9rem;
          color: rgba(255, 255, 255, 0.8);
          line-height: 1.5;
        }

        .feature-bullet {
          color: #00ffe1;
          margin-top: 0.2rem;
          flex-shrink: 0;
        }

        /* TOOL SECTION */
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

        .tool-controls {
          display: flex;
          align-items: center;
          gap: 1rem;
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

        .tool-wrapper {
          border: 2px solid rgba(0, 255, 225, 0.2);
          border-radius: 12px;
          overflow: hidden;
          background: #000;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
        }

        .tool-info {
          display: flex;
          justify-content: center;
          gap: 2rem;
          margin-top: 2rem;
          flex-wrap: wrap;
        }

        .info-item {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-family: 'Inter', sans-serif;
          font-size: 0.9rem;
          color: rgba(255, 255, 255, 0.7);
        }

        .info-item svg {
          color: #00ffe1;
        }

        @keyframes pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.5; transform: scale(1.2); }
        }

        /* RESPONSIVE DESIGN */
        @media (max-width: 1024px) {
          .capabilities-grid {
            grid-template-columns: 1fr;
          }
        }

        @media (max-width: 768px) {
          .analyzer-container {
            padding: 1rem;
          }
          
          .features-grid {
            grid-template-columns: 1fr;
          }
          
          .tool-header {
            flex-direction: column;
            text-align: center;
          }
          
          .tool-info {
            flex-direction: column;
            align-items: center;
            gap: 1rem;
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

import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import ShinyText from '../components/ShinyText';
import '../components/ShinyText.css';
import { 
  FaLock, 
  FaCode, 
  FaArrowRight,
  FaCubes,
  FaUserShield,
  FaPlay
} from "react-icons/fa";
import { 
  HiOutlineSparkles
} from "react-icons/hi";
import { 
  RiFileSearchLine 
} from "react-icons/ri";

export default function Home() {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, []);

  const tools = [
    {
      name: "RSA Toolkit",
      category: "Cryptography",
      description: "Generate keys, encrypt/decrypt with industry-standard RSA",
      icon: <FaLock size={20} />,
      color: "#00ffe1",
      path: "/tools"
    },
    {
      name: "Audio Steganography",
      category: "Steganography", 
      description: "Hide secret messages in audio files",
      icon: <HiOutlineSparkles size={20} />,
      color: "#ff6b6b",
      path: "/tools"
    },
    {
      name: "DTMF Decoder",
      category: "Signal Processing",
      description: "Analyze dual-tone multi-frequency signals",
      icon: <FaPlay size={20} />,
      color: "#4ecdc4",
      path: "/tools"
    },
    {
      name: "Caesar Cipher",
      category: "Classical Crypto",
      description: "Break and create classical substitution ciphers",
      icon: <FaCode size={20} />,
      color: "#45b7d1",
      path: "/tools"
    },
    {
      name: "Metadata Viewer",
      category: "Forensics",
      description: "Extract hidden information from files",
      icon: <RiFileSearchLine size={20} />,
      color: "#96ceb4",
      path: "/tools"
    },
    {
      name: "Base64 Toolkit",
      category: "Encoding",
      description: "Encode and decode Base64 data streams",
      icon: <FaCubes size={20} />,
      color: "#feca57",
      path: "/tools"
    }
  ];

  const stats = [
    { label: "Security Tools", value: "12+", icon: <FaCubes size={20} /> },
    { label: "Encryption Methods", value: "25+", icon: <FaLock size={20} /> },
    { label: "File Formats", value: "50+", icon: <FaCode size={20} /> },
    { label: "Active Users", value: "1K+", icon: <FaUserShield size={20} /> }
  ];

  return (
    <div className="home-container">
      {/* Hero Section - Full viewport */}
      <motion.section 
        className="hero-viewport"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5 }}
      >
        <div className="hero-content">
          {/* Time and system status */}
          <motion.div 
            className="system-status"
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            <div className="status-indicator">
              <div className="status-dot"></div>
              <span>SYSTEM ONLINE</span>
            </div>
            <div className="cyber-time">
              {currentTime.toLocaleTimeString('en-US', { 
                hour12: false,
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit'
              })}
            </div>
          </motion.div>

          {/* Main title with dramatic effect */}
          <motion.div
            className="title-section"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.8, duration: 1, ease: "easeOut" }}
          >
            <motion.h1 
              className="main-title"
              animate={{
                textShadow: [
                  "0 0 30px rgba(0, 255, 225, 0.5)",
                  "0 0 50px rgba(0, 255, 225, 0.8)",
                  "0 0 30px rgba(0, 255, 225, 0.5)"
                ]
              }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <ShinyText variant="hero-variant" speed="medium">
                CYBER<span className="title-accent">VERSE</span>
              </ShinyText>
            </motion.h1>
            
            <motion.div
              className="title-underline"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 1.5, duration: 1 }}
            />
          </motion.div>

          {/* Subtitle */}
          <motion.p 
            className="hero-subtitle"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2, duration: 1 }}
          >
            <ShinyText variant="subtle-variant" speed="slow">
              Elite cybersecurity arsenal for digital warfare specialists
            </ShinyText>
          </motion.p>

          {/* CTA with advanced styling */}
          <motion.div
            className="hero-cta"
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 2.5, duration: 0.8 }}
          >
            <Link to="/tools" className="primary-cta">
              <span className="cta-text">
                <ShinyText variant="accent-variant" speed="fast">
                  LAUNCH ARSENAL
                </ShinyText>
              </span>
              <div className="cta-arrow">
                <FaArrowRight />
              </div>
            </Link>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          className="scroll-indicator"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <div className="scroll-line"></div>
          <span>EXPLORE TOOLS</span>
        </motion.div>
      </motion.section>

      {/* Tools showcase */}
      <motion.section 
        className="tools-showcase"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
      >
        <div className="showcase-header">
          <motion.h2 
            className="showcase-title"
            initial={{ x: -50, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <ShinyText variant="hero-variant" speed="medium">
              ARSENAL OVERVIEW
            </ShinyText>
          </motion.h2>
          <motion.div 
            className="showcase-subtitle"
            initial={{ x: 50, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            Advanced tools for digital reconnaissance and defense
          </motion.div>
        </div>

        <div className="tools-grid">
          {tools.map((tool, index) => (
            <motion.div
              key={index}
              className="tool-card"
              initial={{ y: 50, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ 
                y: -8,
                transition: { duration: 0.2 }
              }}
              viewport={{ once: true }}
            >
              <div className="tool-header">
                <div className="tool-icon" style={{ color: tool.color }}>
                  {tool.icon}
                </div>
                <div className="tool-category">{tool.category}</div>
              </div>
              <h3 className="tool-name">{tool.name}</h3>
              <p className="tool-description">{tool.description}</p>
              <div className="tool-status">
                <div className="status-badge">OPERATIONAL</div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Stats section */}
      <motion.section 
        className="stats-section"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
      >
        <div className="stats-container">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              className="stat-item"
              initial={{ scale: 0.8, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <div className="stat-icon">{stat.icon}</div>
              <div className="stat-value">{stat.value}</div>
              <div className="stat-label">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </motion.section>

      <style jsx>{`
        .home-container {
          min-height: 100vh;
          background: 
            radial-gradient(ellipse at top, rgba(0, 255, 225, 0.03) 0%, transparent 70%),
            radial-gradient(ellipse at bottom, rgba(0, 128, 255, 0.03) 0%, transparent 70%),
            #0a0a0a;
          position: relative;
          overflow-x: hidden;
        }

        /* HERO SECTION */
        .hero-viewport {
          height: 100vh;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          position: relative;
          z-index: 10;
        }

        .hero-content {
          text-align: center;
          max-width: 1000px;
          padding: 0 2rem;
        }

        .system-status {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 2rem;
          margin-bottom: 3rem;
          font-family: 'JetBrains Mono', monospace;
          font-size: 0.9rem;
          color: #00ffe1;
        }

        .status-indicator {
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .status-dot {
          width: 8px;
          height: 8px;
          background: #00ffe1;
          border-radius: 50%;
          animation: pulse 2s infinite;
        }

        @keyframes pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.5; transform: scale(1.2); }
        }

        .cyber-time {
          font-weight: 600;
          letter-spacing: 0.1em;
          background: rgba(0, 255, 225, 0.1);
          padding: 0.5rem 1rem;
          border-radius: 6px;
          border: 1px solid rgba(0, 255, 225, 0.2);
        }

        .title-section {
          margin-bottom: 2rem;
        }

        .main-title {
          font-family: 'Space Grotesk', sans-serif;
          font-size: clamp(4rem, 10vw, 8rem);
          font-weight: 900;
          letter-spacing: -0.05em;
          line-height: 0.9;
          margin: 0;
          background: linear-gradient(135deg, #ffffff 0%, #00ffe1 50%, #0080ff 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          position: relative;
        }

        .title-accent {
          display: block;
          color: #00ffe1;
          text-shadow: 0 0 50px rgba(0, 255, 225, 0.5);
        }

        .title-underline {
          height: 4px;
          background: linear-gradient(90deg, transparent, #00ffe1, transparent);
          margin: 1rem auto;
          max-width: 300px;
          border-radius: 2px;
        }

        .hero-subtitle {
          font-family: 'Inter', sans-serif;
          font-size: clamp(1.1rem, 2.5vw, 1.6rem);
          font-weight: 400;
          color: rgba(255, 255, 255, 0.8);
          margin-bottom: 3rem;
          line-height: 1.6;
          letter-spacing: 0.025em;
        }

        .hero-cta {
          margin-bottom: 4rem;
        }

        .primary-cta {
          display: inline-flex;
          align-items: center;
          gap: 1rem;
          padding: 1.2rem 3rem;
          background: linear-gradient(135deg, #00ffe1 0%, #0080ff 100%);
          color: #000;
          text-decoration: none;
          border-radius: 50px;
          font-family: 'Space Grotesk', sans-serif;
          font-weight: 700;
          font-size: 1.1rem;
          letter-spacing: 0.05em;
          position: relative;
          overflow: hidden;
          transition: all 0.3s ease;
          box-shadow: 0 20px 40px rgba(0, 255, 225, 0.3);
        }

        .primary-cta:hover {
          transform: translateY(-3px);
          box-shadow: 0 25px 50px rgba(0, 255, 225, 0.5);
        }

        .cta-text {
          position: relative;
          z-index: 2;
        }

        .cta-arrow {
          transition: transform 0.3s ease;
        }

        .primary-cta:hover .cta-arrow {
          transform: translateX(5px);
        }

        .scroll-indicator {
          position: absolute;
          bottom: 2rem;
          left: 50%;
          transform: translateX(-50%);
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.5rem;
          font-family: 'JetBrains Mono', monospace;
          font-size: 0.8rem;
          color: rgba(255, 255, 255, 0.6);
          letter-spacing: 0.1em;
        }

        .scroll-line {
          width: 1px;
          height: 30px;
          background: linear-gradient(180deg, #00ffe1, transparent);
        }

        /* TOOLS SHOWCASE */
        .tools-showcase {
          padding: 6rem 2rem;
          max-width: 1400px;
          margin: 0 auto;
          position: relative;
          z-index: 10;
        }

        .showcase-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-end;
          margin-bottom: 4rem;
          gap: 2rem;
        }

        .showcase-title {
          font-family: 'Space Grotesk', sans-serif;
          font-size: clamp(2.5rem, 5vw, 4rem);
          font-weight: 800;
          color: #ffffff;
          margin: 0;
          letter-spacing: -0.025em;
        }

        .showcase-subtitle {
          font-family: 'Inter', sans-serif;
          font-size: 1.1rem;
          color: rgba(255, 255, 255, 0.7);
          max-width: 400px;
          line-height: 1.6;
        }

        .tools-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
          gap: 2rem;
        }

        .tool-card {
          background: rgba(255, 255, 255, 0.02);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 20px;
          padding: 2rem;
          position: relative;
          overflow: hidden;
          transition: all 0.3s ease;
          cursor: pointer;
        }

        .tool-card:hover {
          border-color: rgba(0, 255, 225, 0.3);
          background: rgba(255, 255, 255, 0.05);
        }

        .tool-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 1.5rem;
        }

        .tool-icon {
          font-size: 1.5rem;
        }

        .tool-category {
          font-family: 'JetBrains Mono', monospace;
          font-size: 0.8rem;
          color: rgba(255, 255, 255, 0.6);
          text-transform: uppercase;
          letter-spacing: 0.1em;
        }

        .tool-name {
          font-family: 'Space Grotesk', sans-serif;
          font-size: 1.4rem;
          font-weight: 700;
          color: #ffffff;
          margin: 0 0 1rem 0;
          letter-spacing: -0.025em;
        }

        .tool-description {
          font-family: 'Inter', sans-serif;
          color: rgba(255, 255, 255, 0.7);
          line-height: 1.6;
          margin: 0 0 2rem 0;
        }

        .tool-status {
          display: flex;
          justify-content: flex-end;
        }

        .status-badge {
          font-family: 'JetBrains Mono', monospace;
          font-size: 0.7rem;
          font-weight: 600;
          color: #00ffe1;
          background: rgba(0, 255, 225, 0.1);
          padding: 0.3rem 0.8rem;
          border-radius: 20px;
          border: 1px solid rgba(0, 255, 225, 0.2);
          letter-spacing: 0.05em;
        }

        /* STATS SECTION */
        .stats-section {
          padding: 4rem 2rem;
          background: rgba(0, 255, 225, 0.02);
          border-top: 1px solid rgba(0, 255, 225, 0.1);
          position: relative;
          z-index: 10;
        }

        .stats-container {
          display: flex;
          justify-content: center;
          gap: 4rem;
          max-width: 800px;
          margin: 0 auto;
          flex-wrap: wrap;
        }

        .stat-item {
          text-align: center;
          min-width: 120px;
        }

        .stat-icon {
          font-size: 2rem;
          color: #00ffe1;
          margin-bottom: 1rem;
        }

        .stat-value {
          font-family: 'Space Grotesk', sans-serif;
          font-size: 2.5rem;
          font-weight: 800;
          color: #ffffff;
          margin-bottom: 0.5rem;
          letter-spacing: -0.025em;
        }

        .stat-label {
          font-family: 'Inter', sans-serif;
          font-size: 0.9rem;
          color: rgba(255, 255, 255, 0.7);
          letter-spacing: 0.025em;
        }

        /* RESPONSIVE DESIGN */
        @media (max-width: 1024px) {
          .showcase-header {
            flex-direction: column;
            align-items: flex-start;
            text-align: left;
          }
          
          .tools-grid {
            grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          }
          
          .stats-container {
            gap: 2rem;
          }
        }

        @media (max-width: 768px) {
          .hero-viewport {
            padding: 2rem 1rem;
          }
          
          .system-status {
            flex-direction: column;
            gap: 1rem;
          }
          
          .tools-showcase {
            padding: 4rem 1rem;
          }
          
          .tools-grid {
            grid-template-columns: 1fr;
          }
          
          .stats-container {
            flex-direction: column;
            gap: 2rem;
          }
        }

        @media (max-width: 480px) {
          .hero-content {
            padding: 0 1rem;
          }
          
          .primary-cta {
            padding: 1rem 2rem;
            font-size: 1rem;
          }
        }
      `}</style>
    </div>
  );
}

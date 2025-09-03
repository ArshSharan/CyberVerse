import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

export default function Home() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const updateMousePosition = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    window.addEventListener('mousemove', updateMousePosition);
    return () => {
      window.removeEventListener('mousemove', updateMousePosition);
      clearInterval(timer);
    };
  }, []);

  const features = [
    {
      title: "Advanced Cryptography",
      description: "State-of-the-art encryption and decryption tools",
      icon: "�️"
    },
    {
      title: "Steganography Suite",
      description: "Hide and extract data from various media formats",
      icon: "🔍"
    },
    {
      title: "Digital Forensics",
      description: "Analyze and extract metadata from files",
      icon: "�️"
    }
  ];

  const stats = [
    { label: "Security Tools", value: "12+", icon: "⚙️" },
    { label: "Encryption Methods", value: "25+", icon: "🔐" },
    { label: "File Formats", value: "50+", icon: "📁" },
    { label: "Active Users", value: "1K+", icon: "👥" }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  const floatVariants = {
    initial: { y: 0 },
    animate: {
      y: [-10, 10, -10],
      transition: {
        duration: 6,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  return (
    <div className="home-container">
      {/* Animated background grid */}
      <div className="cyber-grid">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="grid-line"
            initial={{ opacity: 0 }}
            animate={{ 
              opacity: [0, 0.3, 0],
              scaleY: [0, 1, 0]
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              delay: i * 0.2
            }}
            style={{
              left: `${(i * 5)}%`
            }}
          />
        ))}
      </div>

      {/* Mouse follower effect */}
      <motion.div
        className="mouse-follower"
        animate={{
          x: mousePosition.x - 20,
          y: mousePosition.y - 20
        }}
        transition={{ type: "spring", damping: 30, stiffness: 200 }}
      />

      {/* Hero Section */}
      <motion.div 
        className="hero-section"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <motion.div className="hero-content" variants={itemVariants}>
          <motion.div 
            className="time-display"
            variants={itemVariants}
          >
            <span className="cyber-time">
              {currentTime.toLocaleTimeString('en-US', { 
                hour12: false,
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit'
              })}
            </span>
          </motion.div>

          <motion.h1 
            className="cyber-title"
            variants={itemVariants}
          >
            <span className="title-icon">🌌</span>
            <span className="cyber-glow-text">CyberVerse</span>
          </motion.h1>
          
          <motion.p 
            className="cyber-subtitle"
            variants={itemVariants}
          >
            Advanced Cybersecurity Arsenal for Digital Warriors
          </motion.p>

          <motion.div
            className="pulse-line"
            animate={{
              scaleX: [0, 1, 0],
              opacity: [0, 1, 0]
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            variants={itemVariants}
          />

          <motion.div className="cta-section" variants={itemVariants}>
            <Link to="/tools" className="cta-button primary">
              <span>🚀 Launch Tools</span>
            </Link>
            <Link to="/learning" className="cta-button secondary">
              <span>📚 Learn More</span>
            </Link>
          </motion.div>
        </motion.div>

        {/* Features Section */}
        <motion.div className="features-section" variants={containerVariants}>
          <motion.h2 className="section-title" variants={itemVariants}>
            Core Capabilities
          </motion.h2>
          
          <div className="features-grid">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                className="feature-card"
                variants={itemVariants}
                whileHover={{ 
                  scale: 1.02,
                  y: -5,
                  transition: { duration: 0.2 }
                }}
              >
                <motion.div 
                  className="feature-icon"
                  variants={floatVariants}
                  initial="initial"
                  animate="animate"
                  style={{ animationDelay: `${index * 0.5}s` }}
                >
                  {feature.icon}
                </motion.div>
                <h3>{feature.title}</h3>
                <p>{feature.description}</p>
                <div className="feature-glow" />
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Stats Section */}
        <motion.div className="stats-section" variants={containerVariants}>
          <div className="stats-grid">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                className="stat-card"
                variants={itemVariants}
                whileHover={{ scale: 1.05 }}
              >
                <div className="stat-icon">{stat.icon}</div>
                <div className="stat-value">{stat.value}</div>
                <div className="stat-label">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </motion.div>

      <style jsx>{`
        .home-container {
          min-height: 100vh;
          background: 
            radial-gradient(circle at 20% 50%, rgba(0, 255, 225, 0.03) 0%, transparent 50%),
            radial-gradient(circle at 80% 20%, rgba(0, 128, 255, 0.03) 0%, transparent 50%),
            linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 100%);
          position: relative;
          overflow: hidden;
          padding: 4rem 2rem;
        }

        .cyber-grid {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          pointer-events: none;
          z-index: 1;
        }

        .grid-line {
          position: absolute;
          width: 1px;
          height: 100%;
          background: linear-gradient(180deg, transparent, #00ffe130, transparent);
          transform-origin: top;
        }

        .mouse-follower {
          position: fixed;
          width: 40px;
          height: 40px;
          background: radial-gradient(circle, rgba(0, 255, 225, 0.15) 0%, transparent 70%);
          border-radius: 50%;
          pointer-events: none;
          z-index: 2;
          filter: blur(10px);
        }

        .hero-section {
          position: relative;
          z-index: 3;
          max-width: 1200px;
          margin: 0 auto;
          text-align: center;
        }

        .time-display {
          margin-bottom: 2rem;
        }

        .cyber-time {
          font-family: 'JetBrains Mono', monospace;
          font-size: 1.2rem;
          color: #00ffe1;
          background: rgba(0, 255, 225, 0.1);
          padding: 0.5rem 1rem;
          border-radius: 50px;
          border: 1px solid rgba(0, 255, 225, 0.3);
          text-shadow: 0 0 10px #00ffe1;
          letter-spacing: 2px;
        }

        .cyber-title {
          font-family: 'Orbitron', monospace;
          font-size: clamp(3rem, 7vw, 5rem);
          font-weight: 900;
          margin-bottom: 1.5rem;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 1rem;
        }

        .title-icon {
          font-size: 0.8em;
          animation: float 6s ease-in-out infinite;
        }

        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }

        .cyber-glow-text {
          background: linear-gradient(45deg, #00ffe1, #0080ff, #00ffe1);
          background-size: 200% 200%;
          animation: gradient-shift 3s ease infinite;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          color: #00ffe1;
          text-shadow: 0 0 30px rgba(0, 255, 225, 0.5);
          position: relative;
        }

        .cyber-glow-text::after {
          content: 'CyberVerse';
          position: absolute;
          top: 0;
          left: 0;
          color: #00ffe1;
          z-index: -1;
          filter: blur(20px);
        }

        @keyframes gradient-shift {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }

        .cyber-subtitle {
          font-family: 'JetBrains Mono', monospace;
          font-size: clamp(1rem, 2.5vw, 1.4rem);
          color: #a0a0a0;
          margin-bottom: 3rem;
          letter-spacing: 1px;
          max-width: 600px;
          margin-left: auto;
          margin-right: auto;
        }

        .pulse-line {
          width: 300px;
          height: 2px;
          background: linear-gradient(90deg, transparent, #00ffe1, transparent);
          margin: 0 auto 3rem;
        }

        .cta-section {
          display: flex;
          gap: 2rem;
          justify-content: center;
          margin-bottom: 6rem;
          flex-wrap: wrap;
        }

        .cta-button {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          padding: 1rem 2rem;
          border-radius: 50px;
          text-decoration: none;
          font-family: 'JetBrains Mono', monospace;
          font-weight: 500;
          transition: all 0.3s ease;
          position: relative;
          overflow: hidden;
        }

        .cta-button.primary {
          background: linear-gradient(45deg, #00ffe1, #0080ff);
          color: #000;
          box-shadow: 0 10px 30px rgba(0, 255, 225, 0.3);
        }

        .cta-button.secondary {
          background: rgba(0, 255, 225, 0.1);
          color: #00ffe1;
          border: 2px solid rgba(0, 255, 225, 0.3);
        }

        .cta-button:hover {
          transform: translateY(-3px);
          scale: 1.05;
        }

        .cta-button.primary:hover {
          box-shadow: 0 15px 40px rgba(0, 255, 225, 0.5);
          color: #000;
        }

        .cta-button.secondary:hover {
          background: rgba(0, 255, 225, 0.2);
          border-color: #00ffe1;
          color: #00ffe1;
        }

        .features-section {
          margin-bottom: 6rem;
        }

        .section-title {
          font-family: 'Orbitron', monospace;
          font-size: clamp(1.8rem, 4vw, 2.5rem);
          color: #ffffff;
          margin-bottom: 3rem;
          text-align: center;
        }

        .features-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 2rem;
          margin-bottom: 4rem;
        }

        .feature-card {
          background: rgba(255, 255, 255, 0.02);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(0, 255, 225, 0.1);
          border-radius: 20px;
          padding: 2.5rem;
          text-align: center;
          position: relative;
          overflow: hidden;
          transition: all 0.3s ease;
        }

        .feature-card:hover {
          border-color: rgba(0, 255, 225, 0.3);
          background: rgba(255, 255, 255, 0.05);
        }

        .feature-icon {
          font-size: 3rem;
          margin-bottom: 1.5rem;
          display: block;
        }

        .feature-card h3 {
          font-family: 'Orbitron', monospace;
          font-size: 1.3rem;
          color: #ffffff;
          margin-bottom: 1rem;
        }

        .feature-card p {
          font-family: 'JetBrains Mono', monospace;
          color: #a0a0a0;
          line-height: 1.6;
          margin: 0;
        }

        .feature-glow {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 100%;
          height: 100%;
          background: radial-gradient(circle, rgba(0, 255, 225, 0.05) 0%, transparent 70%);
          opacity: 0;
          transition: opacity 0.3s ease;
        }

        .feature-card:hover .feature-glow {
          opacity: 1;
        }

        .stats-section {
          margin-top: 4rem;
        }

        .stats-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 2rem;
        }

        .stat-card {
          text-align: center;
          padding: 2rem;
          background: rgba(0, 255, 225, 0.05);
          border-radius: 15px;
          border: 1px solid rgba(0, 255, 225, 0.1);
          transition: all 0.3s ease;
        }

        .stat-card:hover {
          background: rgba(0, 255, 225, 0.1);
          border-color: rgba(0, 255, 225, 0.3);
        }

        .stat-icon {
          font-size: 2rem;
          margin-bottom: 1rem;
        }

        .stat-value {
          font-family: 'Orbitron', monospace;
          font-size: 2.5rem;
          font-weight: 900;
          color: #00ffe1;
          margin-bottom: 0.5rem;
        }

        .stat-label {
          font-family: 'JetBrains Mono', monospace;
          color: #a0a0a0;
          font-size: 0.9rem;
        }

        @media (max-width: 768px) {
          .home-container {
            padding: 2rem 1rem;
          }
          
          .cta-section {
            flex-direction: column;
            align-items: center;
            gap: 1rem;
          }
          
          .features-grid {
            grid-template-columns: 1fr;
          }
          
          .stats-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (max-width: 480px) {
          .stats-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
}

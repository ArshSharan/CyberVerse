import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useState } from 'react';

export default function Tools() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const tools = [
    { 
      name: 'Base64 Encoder/Decoder', 
      icon: '🔐', 
      path: '/base64', 
      description: 'Encode and decode Base64 strings with advanced options', 
      color: '#00ffe1',
      category: 'encoding'
    },
    { 
      name: 'Caesar Cipher Cracker', 
      icon: '🕵️', 
      path: '/caesar', 
      description: 'Break Caesar cipher encryption with automated analysis', 
      color: '#ff6b6b',
      category: 'cryptography'
    },
    { 
      name: 'Caesar Encoder', 
      icon: '🔐', 
      path: '/tools/caesar-encode', 
      description: 'Encode text with Caesar cipher using custom shifts', 
      color: '#4ecdc4',
      category: 'cryptography'
    },
    { 
      name: 'DTMF Encoder', 
      icon: '📟', 
      path: '/tools/dtmf-encoder', 
      description: 'Generate DTMF tones for telephony applications', 
      color: '#45b7d1',
      category: 'audio'
    },
    { 
      name: 'DTMF Decoder', 
      icon: '📞', 
      path: '/tools/dtmf-decoder', 
      description: 'Decode DTMF audio signals and extract numbers', 
      color: '#96ceb4',
      category: 'audio'
    },
    { 
      name: 'Audio Steganography', 
      icon: '🎙️', 
      path: '/tools/audio-steganography', 
      description: 'Hide secret data in audio files using advanced techniques', 
      color: '#feca57',
      category: 'steganography'
    },
    { 
      name: 'Sound Wave Analyzer', 
      icon: '🎤', 
      path: '/tools/sound-wave-analyzer', 
      description: 'Analyze audio waveforms and frequency spectrums', 
      color: '#ff9ff3',
      category: 'analysis'
    },
    { 
      name: 'XOR Encoder/Decoder', 
      icon: '🔏', 
      path: '/tools/xor-tool', 
      description: 'XOR encryption and decryption with custom keys', 
      color: '#54a0ff',
      category: 'cryptography'
    },
    { 
      name: 'RSA Tools', 
      icon: '🛅', 
      path: '/tools/rsa-tool', 
      description: 'RSA encryption utilities and key generation', 
      color: '#5f27cd',
      category: 'cryptography'
    },
    { 
      name: 'Metadata Viewer', 
      icon: '🔬', 
      path: '/tools/metadata-viewer', 
      description: 'Extract and analyze file metadata for forensics', 
      color: '#00d2d3',
      category: 'forensics'
    },
    { 
      name: 'CSR Tool', 
      icon: '🖋️', 
      path: '/tools/csr-tool', 
      description: 'Certificate signing requests and SSL management', 
      color: '#ff9f43',
      category: 'certificates'
    },
    { 
      name: 'Base Encoder Tool', 
      icon: '⚙️', 
      path: '/components/base-encoder-decoder', 
      description: 'Multi-base encoding tools (Base32, Base58, etc.)', 
      color: '#ee5a6f',
      category: 'encoding'
    }
  ];

  const categories = [
    { id: 'all', name: 'All Tools', icon: '🛠️' },
    { id: 'cryptography', name: 'Cryptography', icon: '🔐' },
    { id: 'encoding', name: 'Encoding', icon: '📝' },
    { id: 'steganography', name: 'Steganography', icon: '👁️' },
    { id: 'audio', name: 'Audio', icon: '🎵' },
    { id: 'forensics', name: 'Forensics', icon: '🔍' },
    { id: 'analysis', name: 'Analysis', icon: '📊' },
    { id: 'certificates', name: 'Certificates', icon: '📜' }
  ];

  const filteredTools = tools.filter(tool => {
    const matchesSearch = tool.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         tool.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || tool.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0, scale: 0.9 },
    visible: {
      y: 0,
      opacity: 1,
      scale: 1,
      transition: { duration: 0.5, ease: "easeOut" }
    }
  };

  const cardVariants = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: { 
      scale: 1, 
      opacity: 1,
      transition: { duration: 0.6, ease: "easeOut" }
    },
    hover: {
      scale: 1.05,
      y: -10,
      transition: { duration: 0.3, ease: "easeInOut" }
    }
  };

  return (
    <div className="tools-container">
      {/* Header Section */}
      <motion.div 
        className="tools-header"
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="tools-title">
          <span className="title-icon">🛠️</span>
          Cyber Arsenal
        </h1>
        <p className="tools-subtitle">
          Advanced cybersecurity tools for digital forensics, cryptography, and security analysis
        </p>
      </motion.div>

      {/* Search and Filter Section */}
      <motion.div 
        className="tools-controls"
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <div className="search-container">
          <input
            type="text"
            placeholder="🔍 Search tools..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
        </div>

        <div className="category-filters">
          {categories.map((category) => (
            <button
              key={category.id}
              className={`category-btn ${selectedCategory === category.id ? 'active' : ''}`}
              onClick={() => setSelectedCategory(category.id)}
            >
              <span className="category-icon">{category.icon}</span>
              {category.name}
            </button>
          ))}
        </div>
      </motion.div>

      {/* Tools Grid */}
      <motion.div 
        className="tools-grid"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {filteredTools.map((tool, index) => (
          <motion.div
            key={index}
            variants={cardVariants}
            whileHover="hover"
            className="tool-card"
          >
            <Link to={tool.path} className="tool-link">
              <div className="tool-card-inner">
                <div className="tool-header">
                  <div className="tool-icon" style={{ color: tool.color }}>
                    {tool.icon}
                  </div>
                  <div className="tool-category">
                    {categories.find(cat => cat.id === tool.category)?.name || 'General'}
                  </div>
                </div>
                <h3 className="tool-name">{tool.name}</h3>
                <p className="tool-description">{tool.description}</p>
                <div className="tool-footer">
                  <span className="launch-text">Launch Tool →</span>
                </div>
                <div className="tool-glow" style={{ 
                  background: `radial-gradient(circle, ${tool.color}15 0%, transparent 70%)` 
                }} />
                <div className="tool-border" style={{ borderColor: tool.color }} />
              </div>
            </Link>
          </motion.div>
        ))}
      </motion.div>

      {filteredTools.length === 0 && (
        <motion.div 
          className="no-results"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <div className="no-results-icon">🔍</div>
          <h3>No tools found</h3>
          <p>Try adjusting your search terms or category filter</p>
        </motion.div>
      )}

      <style jsx>{`
        .tools-container {
          min-height: 100vh;
          background: linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 100%);
          padding: 2rem;
        }

        .tools-header {
          text-align: center;
          margin-bottom: 3rem;
          max-width: 800px;
          margin-left: auto;
          margin-right: auto;
        }

        .tools-title {
          font-family: 'Orbitron', monospace;
          font-size: clamp(2.5rem, 5vw, 4rem);
          font-weight: 900;
          color: #ffffff;
          margin-bottom: 1rem;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 1rem;
        }

        .title-icon {
          font-size: 0.8em;
          color: #00ffe1;
          text-shadow: 0 0 20px #00ffe1;
        }

        .tools-subtitle {
          font-family: 'JetBrains Mono', monospace;
          font-size: clamp(1rem, 2vw, 1.2rem);
          color: #a0a0a0;
          line-height: 1.6;
          margin: 0;
        }

        .tools-controls {
          margin-bottom: 3rem;
          max-width: 1200px;
          margin-left: auto;
          margin-right: auto;
        }

        .search-container {
          margin-bottom: 2rem;
          display: flex;
          justify-content: center;
        }

        .search-input {
          width: 100%;
          max-width: 500px;
          padding: 1rem 1.5rem;
          font-family: 'JetBrains Mono', monospace;
          font-size: 1rem;
          background: rgba(255, 255, 255, 0.05);
          border: 2px solid rgba(0, 255, 225, 0.3);
          border-radius: 50px;
          color: #ffffff;
          outline: none;
          transition: all 0.3s ease;
        }

        .search-input::placeholder {
          color: #666;
        }

        .search-input:focus {
          border-color: #00ffe1;
          box-shadow: 0 0 20px rgba(0, 255, 225, 0.3);
        }

        .category-filters {
          display: flex;
          gap: 1rem;
          justify-content: center;
          flex-wrap: wrap;
        }

        .category-btn {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.75rem 1.5rem;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(0, 255, 225, 0.2);
          border-radius: 50px;
          color: #a0a0a0;
          font-family: 'JetBrains Mono', monospace;
          font-size: 0.9rem;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .category-btn:hover {
          border-color: rgba(0, 255, 225, 0.5);
          color: #ffffff;
          transform: translateY(-2px);
        }

        .category-btn.active {
          background: rgba(0, 255, 225, 0.1);
          border-color: #00ffe1;
          color: #00ffe1;
        }

        .category-icon {
          font-size: 1.1em;
        }

        .tools-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
          gap: 2rem;
          max-width: 1400px;
          margin: 0 auto;
        }

        .tool-card {
          background: rgba(255, 255, 255, 0.03);
          backdrop-filter: blur(10px);
          border-radius: 20px;
          overflow: hidden;
          position: relative;
          transition: all 0.4s ease;
          height: 100%;
        }

        .tool-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(0, 255, 225, 0.1), transparent);
          transition: left 0.6s ease;
        }

        .tool-card:hover::before {
          left: 100%;
        }

        .tool-link {
          text-decoration: none;
          color: inherit;
          display: block;
          height: 100%;
        }

        .tool-card-inner {
          padding: 2rem;
          position: relative;
          z-index: 2;
          height: 100%;
          display: flex;
          flex-direction: column;
        }

        .tool-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 1.5rem;
        }

        .tool-icon {
          font-size: 3rem;
          filter: drop-shadow(0 0 10px currentColor);
        }

        .tool-category {
          font-family: 'JetBrains Mono', monospace;
          font-size: 0.75rem;
          color: #666;
          background: rgba(255, 255, 255, 0.1);
          padding: 0.25rem 0.75rem;
          border-radius: 20px;
          text-transform: uppercase;
          letter-spacing: 1px;
        }

        .tool-name {
          font-family: 'Orbitron', monospace;
          font-size: 1.3rem;
          font-weight: 600;
          color: #ffffff;
          margin-bottom: 1rem;
          text-shadow: 0 0 10px rgba(0, 255, 225, 0.3);
        }

        .tool-description {
          font-family: 'JetBrains Mono', monospace;
          font-size: 0.95rem;
          color: #b0b0b0;
          line-height: 1.5;
          margin-bottom: auto;
          flex-grow: 1;
        }

        .tool-footer {
          margin-top: 1.5rem;
          padding-top: 1rem;
          border-top: 1px solid rgba(255, 255, 255, 0.1);
        }

        .launch-text {
          font-family: 'JetBrains Mono', monospace;
          font-size: 0.9rem;
          color: #00ffe1;
          font-weight: 500;
        }

        .tool-glow {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 150%;
          height: 150%;
          opacity: 0;
          transition: opacity 0.3s ease;
          pointer-events: none;
          z-index: 1;
        }

        .tool-border {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          border: 1px solid transparent;
          border-radius: 20px;
          opacity: 0;
          transition: opacity 0.3s ease;
          z-index: 1;
        }

        .tool-card:hover .tool-glow {
          opacity: 1;
        }

        .tool-card:hover .tool-border {
          opacity: 0.5;
        }

        .tool-card:hover {
          box-shadow: 
            0 20px 40px rgba(0, 0, 0, 0.3),
            0 0 20px rgba(0, 255, 225, 0.2);
          background: rgba(255, 255, 255, 0.08);
        }

        .no-results {
          text-align: center;
          padding: 4rem 2rem;
          color: #666;
        }

        .no-results-icon {
          font-size: 4rem;
          margin-bottom: 1rem;
        }

        .no-results h3 {
          font-family: 'Orbitron', monospace;
          font-size: 1.5rem;
          margin-bottom: 0.5rem;
          color: #888;
        }

        .no-results p {
          font-family: 'JetBrains Mono', monospace;
          color: #666;
        }

        @media (max-width: 768px) {
          .tools-container {
            padding: 1rem;
          }
          
          .tools-grid {
            grid-template-columns: 1fr;
            gap: 1.5rem;
          }
          
          .category-filters {
            gap: 0.5rem;
          }
          
          .category-btn {
            padding: 0.5rem 1rem;
            font-size: 0.8rem;
          }
        }

        @media (max-width: 480px) {
          .category-filters {
            justify-content: flex-start;
            overflow-x: auto;
            padding-bottom: 0.5rem;
          }
          
          .category-btn {
            flex-shrink: 0;
          }
        }
      `}</style>
    </div>
  );
}

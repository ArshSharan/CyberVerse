import { Routes, Route, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useState } from 'react';
import Base64Tool from './pages/Base64Tool';
import Home from './pages/Home';
import Tools from './pages/Tools';
import './App.css';
import logo from './assets/Icon.png';
import CaesarCracker from './pages/CaesarCracker';
import CaesarEncoder from './pages/CaesarEncoder';
import DTMFEncoder from './pages/DTMFEncoder';
import DTMFDecoder from './pages/DTMFDecoder';
import AudioSteganography from './pages/AudioSteganography';
import SoundWaveAnalyzer from './pages/SoundWaveAnalyzer';
import XOREncodeDecode from './pages/EXOREncodeDecode';
import CSRTool from './pages/CSRTool';
import RSATools from './pages/RSATools';
import MetadataViewer from './pages/MetadataViewer';
import BaseEncoderDecoder from './pages/BaseEncoderDecoder';

export default function App() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  return (
    <div className="app-container">
      {/* Top Navbar */}
      <motion.nav 
        className="navbar navbar-dark px-4"
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <motion.div 
          className="d-flex align-items-center"
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.2 }}
        >
          <motion.button
            onClick={toggleSidebar}
            className="sidebar-toggle-btn me-3"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            transition={{ duration: 0.2 }}
          >
            {sidebarCollapsed ? '☰' : '⮜'}
          </motion.button>
          <motion.img 
            src={logo} 
            alt="CyberVerse Logo" 
            style={{ height: '40px', marginRight: '10px' }}
            whileHover={{ rotate: 360 }}
            transition={{ duration: 0.5 }}
          />
          <h3 className="text-light mb-0" style={{ fontFamily: 'Orbitron', textShadow: '0 0 10px #00ffe1' }}>
            CyberVerse
          </h3>
        </motion.div>
        <div className="navbar-nav-container">
          <Link to="/" className="btn btn-outline-info me-2">
            <span>🏠</span> Home
          </Link>
          <Link to="/tools" className="btn btn-outline-info me-2">
            <span>🛠️</span> Tools
          </Link>
          <Link to="/learning" className="btn btn-outline-info">
            <span>📚</span> Learning
          </Link>
        </div>
      </motion.nav>

      {/* Layout Container */}
      <div className="layout-container">
        {/* Fixed Sidebar */}
        <motion.aside 
          className={`sidebar ${sidebarCollapsed ? 'collapsed' : ''}`}
          initial={{ x: -250, opacity: 0 }}
          animate={{ 
            x: sidebarCollapsed ? -250 : 0, 
            opacity: sidebarCollapsed ? 0 : 1 
          }}
          transition={{ duration: 0.3 }}
        >
          <div className="sidebar-content">
            <motion.h5 
              className="sidebar-title"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              🛠️ Cyber Tools
            </motion.h5>
            <motion.ul 
              className="sidebar-nav"
              initial="hidden"
              animate="visible"
              variants={{
                hidden: { opacity: 0 },
                visible: {
                  opacity: 1,
                  transition: {
                    staggerChildren: 0.1,
                    delayChildren: 0.3
                  }
                }
              }}
            >
              {[
                { path: '/base64', icon: '🔐', name: 'Base64' },
                { path: '/caesar', icon: '🕵️', name: 'Caesar Cracker' },
                { path: '/tools/caesar-encode', icon: '🔐', name: 'Caesar Encoder' },
                { path: '/tools/dtmf-encoder', icon: '📟', name: 'DTMF Encoder' },
                { path: '/tools/dtmf-decoder', icon: '📞', name: 'DTMF Decoder' },
                { path: '/tools/audio-steganography', icon: '🎙️', name: 'Audio Stegano' },
                { path: '/tools/sound-wave-analyzer', icon: '🎤', name: 'Wave Analyzer' },
                { path: '/tools/xor-tool', icon: '🔏', name: 'XOR En/Decode' },
                { path: '/tools/csr-tool', icon: '🖋️', name: 'CSR Tool' },
                { path: '/tools/rsa-tool', icon: '🛅', name: 'RSA Tools' },
                { path: '/tools/metadata-viewer', icon: '🔬', name: 'Metadata Viewer' },
                { path: '/components/base-encoder-decoder', icon: '⚙️', name: 'Base Encoder' }
              ].map((tool, index) => (
                <motion.li 
                  key={index}
                  className="sidebar-item"
                  variants={{
                    hidden: { x: -20, opacity: 0 },
                    visible: { x: 0, opacity: 1 }
                  }}
                  whileHover={{ x: 10 }}
                  transition={{ duration: 0.2 }}
                >
                  <Link to={tool.path} className="sidebar-link">
                    <span className="tool-icon">{tool.icon}</span>
                    <span className="tool-name">{tool.name}</span>
                  </Link>
                </motion.li>
              ))}
            </motion.ul>
          </div>
        </motion.aside>

        {/* Main Content Area */}
        <motion.main 
          className={`main-content ${sidebarCollapsed ? 'full-width' : ''}`}
          initial={{ opacity: 0 }}
          animate={{ 
            opacity: 1,
            marginLeft: sidebarCollapsed ? 0 : 280,
            width: sidebarCollapsed ? '100%' : 'calc(100% - 280px)'
          }}
          transition={{ duration: 0.3 }}
        >
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/tools" element={<Tools />} />
            <Route path="/base64" element={<Base64Tool />} />
            <Route path="/tools/caesar-encode" element={<CaesarEncoder />} />
            <Route path="/tools/dtmf-encoder" element={<DTMFEncoder />} />
            <Route path="/tools/dtmf-decoder" element={<DTMFDecoder />} />
            <Route path="/tools/audio-steganography" element={<AudioSteganography />} />
            <Route path="/tools/sound-wave-analyzer" element={<SoundWaveAnalyzer />} />
            <Route path="/tools/xor-tool" element={<XOREncodeDecode />} />
            <Route path="/tools/csr-tool" element={<CSRTool />} />
            <Route path="/tools/rsa-tool" element={<RSATools />} />
            <Route path="/tools/metadata-viewer" element={<MetadataViewer />} />
            <Route path="/components/base-encoder-decoder" element={<BaseEncoderDecoder />} />
            <Route path="/caesar" element={<CaesarCracker />} />
            {/* Future pages */}
            <Route path="/learning" element={
              <div className="coming-soon">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  <h2 style={{ color: '#00ffe1', fontFamily: 'Orbitron' }}>📚 Learning Hub</h2>
                  <p style={{ color: '#a0a0a0' }}>Coming Soon...</p>
                </motion.div>
              </div>
            } />
          </Routes>
        </motion.main>
      </div>

      <style jsx>{`
        .app-container {
          height: 100vh;
          background: linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 100%);
          overflow: hidden;
        }

        .navbar {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          z-index: 1000;
          background: rgba(10, 10, 10, 0.95) !important;
          backdrop-filter: blur(10px);
          border-bottom: 2px solid rgba(0, 255, 225, 0.3);
          height: 76px;
        }

        .sidebar-toggle-btn {
          background: rgba(0, 255, 225, 0.1);
          border: 1px solid rgba(0, 255, 225, 0.3);
          color: #00ffe1;
          padding: 0.5rem;
          border-radius: 8px;
          font-size: 1.2rem;
          cursor: pointer;
          transition: all 0.3s ease;
          font-family: 'JetBrains Mono', monospace;
        }

        .sidebar-toggle-btn:hover {
          background: rgba(0, 255, 225, 0.2);
          border-color: rgba(0, 255, 225, 0.5);
          text-shadow: 0 0 8px rgba(0, 255, 225, 0.6);
        }

        .navbar-nav-container {
          display: flex;
          gap: 0.5rem;
        }

        .navbar-nav-container .btn {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-family: 'JetBrains Mono', monospace;
          font-size: 0.9rem;
        }

        .layout-container {
          display: flex;
          margin-top: 76px;
          height: calc(100vh - 76px);
          overflow: hidden;
        }

        .sidebar {
          position: fixed;
          left: 0;
          top: 76px;
          width: 280px;
          height: calc(100vh - 76px);
          background: linear-gradient(180deg, rgba(10, 10, 10, 0.95) 0%, rgba(26, 26, 46, 0.95) 100%);
          backdrop-filter: blur(15px);
          border-right: 2px solid rgba(0, 255, 225, 0.3);
          overflow-y: auto;
          overflow-x: hidden;
          z-index: 999;
          transition: all 0.3s ease;
        }

        .sidebar.collapsed {
          transform: translateX(-100%);
          opacity: 0;
          pointer-events: none;
        }

        /* Clean, Modern Scrollbar */
        .sidebar::-webkit-scrollbar {
          width: 6px;
        }

        .sidebar::-webkit-scrollbar-track {
          background: rgba(0, 0, 0, 0.2);
          border-radius: 10px;
        }

        .sidebar::-webkit-scrollbar-thumb {
          background: linear-gradient(180deg, rgba(0, 255, 225, 0.6), rgba(0, 255, 225, 0.3));
          border-radius: 10px;
          border: 1px solid rgba(0, 255, 225, 0.2);
        }

        .sidebar::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(180deg, rgba(0, 255, 225, 0.8), rgba(0, 255, 225, 0.5));
        }

        .sidebar-content {
          padding: 1.5rem;
        }

        .sidebar-title {
          color: #00ffe1;
          font-family: 'Orbitron', monospace;
          text-shadow: 0 0 15px #00ffe1;
          font-size: 0.95rem;
          font-weight: 600;
          margin-bottom: 1.5rem;
          padding-bottom: 1rem;
          border-bottom: 1px solid rgba(0, 255, 225, 0.2);
          text-align: center;
        }

        .sidebar-nav {
          list-style: none;
          padding: 0;
          margin: 0;
        }

        .sidebar-item {
          margin-bottom: 0.5rem;
        }

        .sidebar-link {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          padding: 0.7rem 1rem;
          color: rgba(255, 255, 255, 0.8);
          text-decoration: none;
          border-radius: 10px;
          transition: all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
          font-family: 'Inter', sans-serif;
          font-size: 0.85rem;
          font-weight: 500;
          border: 1px solid transparent;
          background: rgba(255, 255, 255, 0.02);
          position: relative;
          overflow: hidden;
        }

        .sidebar-link::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(0, 255, 225, 0.1), transparent);
          transition: left 0.5s ease;
        }

        .sidebar-link:hover {
          color: #00ffe1;
          background: rgba(0, 255, 225, 0.1);
          border-color: rgba(0, 255, 225, 0.3);
          text-decoration: none;
          transform: translateX(5px);
          box-shadow: 0 2px 15px rgba(0, 255, 225, 0.2);
          text-shadow: 0 0 8px rgba(0, 255, 225, 0.4);
        }

        .sidebar-link:hover::before {
          left: 100%;
        }

        .sidebar-link:hover .tool-icon {
          transform: scale(1.1);
          filter: drop-shadow(0 0 6px rgba(0, 255, 225, 0.6));
        }

        .tool-icon {
          font-size: 1rem;
          width: 18px;
          text-align: center;
          flex-shrink: 0;
          transition: all 0.3s ease;
        }

        .tool-name {
          font-weight: 500;
          font-size: 0.85rem;
          transition: all 0.3s ease;
        }

        .sidebar-link:hover .tool-name {
          font-weight: 600;
        }

        .main-content {
          margin-left: 280px;
          width: calc(100% - 280px);
          height: calc(100vh - 76px);
          overflow-y: auto;
          overflow-x: hidden;
          transition: all 0.3s ease;
        }

        .main-content.full-width {
          margin-left: 0;
          width: 100%;
        }

        /* Clean scrollbar for main content */
        .main-content::-webkit-scrollbar {
          width: 8px;
        }

        .main-content::-webkit-scrollbar-track {
          background: rgba(0, 0, 0, 0.1);
          border-radius: 10px;
        }

        .main-content::-webkit-scrollbar-thumb {
          background: linear-gradient(180deg, rgba(0, 255, 225, 0.4), rgba(0, 255, 225, 0.2));
          border-radius: 10px;
          border: 1px solid rgba(0, 255, 225, 0.1);
        }

        .main-content::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(180deg, rgba(0, 255, 225, 0.6), rgba(0, 255, 225, 0.3));
        }

        .coming-soon {
          display: flex;
          justify-content: center;
          align-items: center;
          height: 100%;
          text-align: center;
        }

        /* Responsive Design */
        @media (max-width: 768px) {
          .layout-container {
            flex-direction: column;
          }

          .sidebar {
            position: relative;
            width: 100%;
            height: auto;
            top: 0;
            border-right: none;
            border-bottom: 2px solid rgba(0, 255, 225, 0.3);
          }

          .sidebar-content {
            padding: 1rem;
          }

          .sidebar-nav {
            display: flex;
            flex-wrap: wrap;
            gap: 0.5rem;
          }

          .sidebar-item {
            margin-bottom: 0;
            flex: 1;
            min-width: calc(50% - 0.25rem);
          }

          .sidebar-link {
            padding: 0.6rem;
            font-size: 0.8rem;
            justify-content: center;
            text-align: center;
          }

          .tool-name {
            display: none;
          }

          .main-content {
            margin-left: 0;
            width: 100%;
            height: auto;
            min-height: calc(100vh - 76px - 100px);
          }

          .navbar-nav-container {
            flex-direction: column;
            gap: 0.25rem;
          }
          
          .navbar-nav-container .btn {
            font-size: 0.8rem;
            padding: 0.375rem 0.5rem;
          }
        }

        @media (max-width: 480px) {
          .sidebar-item {
            min-width: calc(33.333% - 0.33rem);
          }
        }
      `}</style>
    </div>
  );
}
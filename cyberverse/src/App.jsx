import { Routes, Route, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Base64Tool from './pages/Base64Tool';
import Home from './pages/Home';
import Tools from './pages/Tools';
import './App.css';
import logo from './assets/icon.png';
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

      {/* Grid: Sidebar + Main */}
      <div className="container-fluid p-0">
        <div className="row g-0">
          {/* Sidebar */}
          <motion.div 
            className="col-md-2 p-3 sidebar"
            initial={{ x: -250, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <motion.h5 
              style={{ color: '#00ffe1', fontFamily: 'Orbitron', textShadow: '0 0 10px #00ffe1' }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              🛠️ Cyber Tools
            </motion.h5>
            <motion.ul 
              className="nav flex-column"
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
                { path: '/tools/rsa-tool', icon: '�', name: 'RSA Tools' },
                { path: '/tools/metadata-viewer', icon: '🔬', name: 'Metadata Viewer' },
                { path: '/components/base-encoder-decoder', icon: '⚙️', name: 'Base Encoder' }
              ].map((tool, index) => (
                <motion.li 
                  key={index}
                  className="nav-item"
                  variants={{
                    hidden: { x: -20, opacity: 0 },
                    visible: { x: 0, opacity: 1 }
                  }}
                  whileHover={{ x: 10 }}
                  transition={{ duration: 0.2 }}
                >
                  <Link to={tool.path} className="nav-link text-info">
                    <span className="tool-icon-sidebar">{tool.icon}</span> {tool.name}
                  </Link>
                </motion.li>
              ))}
            </motion.ul>
          </motion.div>

          {/* Main Content */}
          <motion.div 
            className="col-md-10 main-content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
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
          </motion.div>
        </div>
      </div>

      <style jsx>{`
        .app-container {
          min-height: 100vh;
          background: linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 100%);
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

        .sidebar {
          background: linear-gradient(180deg, rgba(10, 10, 10, 0.95) 0%, rgba(26, 26, 46, 0.95) 100%);
          backdrop-filter: blur(10px);
          border-right: 2px solid rgba(0, 255, 225, 0.3);
          min-height: calc(100vh - 76px);
          position: relative;
        }

        .tool-icon-sidebar {
          display: inline-block;
          width: 20px;
          text-align: center;
        }

        .main-content {
          padding: 0;
          min-height: calc(100vh - 76px);
        }

        .coming-soon {
          display: flex;
          justify-content: center;
          align-items: center;
          height: calc(100vh - 76px);
          text-align: center;
        }

        @media (max-width: 768px) {
          .navbar-nav-container {
            flex-direction: column;
            gap: 0.25rem;
          }
          
          .navbar-nav-container .btn {
            font-size: 0.8rem;
            padding: 0.375rem 0.5rem;
          }
        }
      `}</style>
    </div>
  );
}

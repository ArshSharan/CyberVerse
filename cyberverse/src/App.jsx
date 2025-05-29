import { Routes, Route, Link } from 'react-router-dom';
import Base64Tool from './pages/Base64Tool';
import Home from './pages/Home';
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
export default function App() {
  return (
    <div>
      {/* Top Navbar */}
      <nav className="navbar navbar-dark bg-dark px-4" style={{ borderBottom: '2px solid #00ffe1' }}>
        <div className="d-flex align-items-center">
          <img src={logo} alt="CyberVerse Logo" style={{ height: '40px', marginRight: '10px' }} />
          <h3 className="text-light mb-0" style={{ fontFamily: 'Orbitron' }}>CyberVerse</h3>
        </div>
        <div>
          <Link to="/" className="btn btn-outline-info me-2">Home</Link>
          <Link to="/tools" className="btn btn-outline-info me-2">Tools</Link>
          <Link to="/learning" className="btn btn-outline-info">Learning</Link>
        </div>
      </nav>

      {/* Grid: Sidebar + Main */}
      <div className="container-fluid">
        <div className="row">
          {/* Sidebar */}
          <div className="col-md-2 bg-black p-3" style={{ borderRight: '1px solid #00ffe1' }}>
            <h5 style={{ color: '#00ffe1', fontFamily: 'Orbitron' }}>Tools</h5>
            <ul className="nav flex-column">
              <li className="nav-item">
                <Link to="/base64" className="nav-link text-info">🔐 Base64</Link>
              </li>
              <li className="nav-item">
                <Link to="/caesar" className="nav-link text-info">🕵️ Caesar Cracker</Link>
              </li>
              <li className="nav-item">
                <Link to="/tools/caesar-encode" className="nav-link text-info">🔐 Caesar Encoder</Link>
              </li>
              <li className="nav-item">
                <Link to="/tools/dtmf-encoder" className="nav-link text-info">📟 DTMF Encoder</Link>
              </li>
              <li className="nav-item">
                <Link to="/tools/dtmf-decoder" className="nav-link text-info">📞 DTMF Decoder</Link>
              </li>
              <li className="nav-item">
                <Link to="/tools/audio-steganography" className="nav-link text-info">🎙️ Audio Stegano</Link>
              </li>
              <li className="nav-item">
                <Link to="/tools/sound-wave-analyzer" className="nav-link text-info">🎤 Wave Analyzer</Link>
              </li>
              <li className="nav-item">
                <Link to="/tools/xor-tool" className="nav-link text-info">🔏 XOR En/Decode</Link>
              </li>
              <li className="nav-item">
                <Link to="/tools/csr-tool" className="nav-link text-info">🖋️ CSR Tool</Link>
              </li>
              <li className="nav-item">
                <Link to="/tools/rsa-tool" className="nav-link text-info">🛅 RSA Tools</Link>
              </li>
              <li className="nav-item">
                <Link to="/tools/metadata-viewer" className="nav-link text-info">🔬 Metadata Viewer</Link>
              </li>
            </ul>
          </div>

          {/* Main Content */}
          <div className="col-md-10 p-4">
            <Routes>
              <Route path="/" element={<Home />} />
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
              {/* Future pages */}
              <Route path="/tools" element={<div>All Tools Page Coming Soon</div>} />
              <Route path="/learning" element={<div>Learning Page Coming Soon</div>} />
              <Route path="/caesar" element={<CaesarCracker />} />
            
            </Routes>
          </div>
        </div>
      </div>
    </div>
  );
}

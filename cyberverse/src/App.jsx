import { Routes, Route, Link } from 'react-router-dom';
import Base64Tool from './pages/Base64Tool';
import Home from './pages/Home';
import './App.css';
import logo from './assets/icon.png'; // ✅ Your logo

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
              {/* Add more tools here */}
            </ul>
          </div>

          {/* Main Content */}
          <div className="col-md-10 p-4">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/base64" element={<Base64Tool />} />
              {/* Future pages */}
              <Route path="/tools" element={<div>All Tools Page Coming Soon</div>} />
              <Route path="/learning" element={<div>Learning Page Coming Soon</div>} />
            </Routes>
          </div>
        </div>
      </div>
    </div>
  );
}

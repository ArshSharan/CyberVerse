import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div className="container text-center mt-5">
      <h1 style={{ fontFamily: 'Orbitron', fontSize: '3rem', color: '#00ffe1' }}>🌌 CyberVerse</h1>
      <p className="lead" style={{ color: '#cccccc' }}>
        A futuristic toolbox for CTF players and cybersecurity learners.
      </p>
      <div className="mt-4">
        <Link to="/base64">
          <button className="me-3">🔐 Base64 Tool</button>
        </Link>
        {/* Add more buttons later */}
      </div>
    </div>
  );
}

import React from 'react';

export default function AudioSteganography() {
  return (
    <div>
      <h2 style={{ color: '#00ffe1', fontFamily: 'Orbitron' }}>🎧 Audio Steganography</h2>
      <p className="text-light">
        Hide secret messages inside audio files or extract hidden messages from uploaded audio. A futuristic take on digital privacy.
      </p>
      <div style={{ border: '2px solid #00ffe1', borderRadius: '8px', overflow: 'hidden' }}>
        <iframe
          src="https://audio-steganography-tool.onrender.com/"
          width="100%"
          height="720px"
          style={{ border: 'none', backgroundColor: '#000' }}
          title="Audio Steganography"
        />
      </div>
    </div>
  );
}

import React from 'react';

export default function DTMFDecoder() {
  return (
    <div>
      <h2 style={{ color: '#00ffe1', fontFamily: 'Orbitron' }}>📟 DTMF Decoder</h2>
      <p className="text-light">
        This tool lets you upload audio files and decodes DTMF tones (Dual Tone Multi Frequency) using digital signal processing.
      </p>
      <div style={{ border: '2px solid #00ffe1', borderRadius: '8px', overflow: 'hidden' }}>
        <iframe
          src="https://dtmf-decoder-online.onrender.com/"
          width="100%"
          height="720px"
          style={{ border: 'none', backgroundColor: '#000' }}
          title="DTMF Decoder"
        />
      </div>
    </div>
  );
}

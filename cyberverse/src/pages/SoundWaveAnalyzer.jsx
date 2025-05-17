import React from 'react';

export default function SoundWaveAnalyzer() {
  return (
    <div>
      <h2 style={{ color: '#00ffe1', fontFamily: 'Orbitron' }}>🔊 Sound Wave Analyzer</h2>
      <p className="text-light">
        This tool lets you upload and analyze audio signals via waveform, FFT, and live spectrograms.
      </p>
      <div style={{ border: '2px solid #00ffe1', borderRadius: '8px', overflow: 'hidden' }}>
        <iframe
          src="https://sound-wave-analyzer-1.onrender.com/"
          width="100%"
          height="720px"
          style={{ border: 'none', backgroundColor: '#000' }}
          title="Sound Wave Analyzer"
        />
      </div>
    </div>
  );
}

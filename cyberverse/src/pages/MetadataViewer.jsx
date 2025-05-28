import React from 'react';

export default function MetadataInspector() {
  return (
    <div>
      <h2 style={{ color: '#00ffe1', fontFamily: 'Orbitron' }}>🧠 Metadata Inspector</h2>
      <p className="text-light">
        Upload an image or document to view its hidden metadata using ExifTool.
      </p>
      <div style={{ border: '2px solid #00ffe1', borderRadius: '8px', overflow: 'hidden' }}>
        <iframe
          src="https://metadata-inspector-tool.onrender.com/"
          width="100%"
          height="720px"
          style={{ border: 'none', backgroundColor: '#000' }}
          title="Metadata Inspector"
        />
      </div>
    </div>
  );
}

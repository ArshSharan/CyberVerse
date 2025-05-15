import React, { useState } from "react";
import { Button } from "react-bootstrap";
import { Copy, Check } from "lucide-react";
import { saveAs } from "file-saver";
import {Table} from "react-bootstrap";
import "../styles/DTMFEncoder.css"; // Add custom styles here

const DTMF_MAP = {
  "1": [697, 1209], "2": [697, 1336], "3": [697, 1477],
  "4": [770, 1209], "5": [770, 1336], "6": [770, 1477],
  "7": [852, 1209], "8": [852, 1336], "9": [852, 1477],
  "*": [941, 1209], "0": [941, 1336], "#": [941, 1477]
};

const getDurations = (speed) => {
  switch (speed) {
    case "fast": return { tone: 0.1, gap: 0.05 };
    case "slow": return { tone: 0.25, gap: 0.15 };
    default: return { tone: 0.15, gap: 0.1 };
  }
};

const DTMFEncoder = () => {
  const [input, setInput] = useState("");
  const [copied, setCopied] = useState(false);
  const [speed, setSpeed] = useState("normal");

  const handleKeypadClick = (key) => {
    setInput((prev) => prev + key);
  };

  const handleClear = () => {
    setInput("");
    setCopied(false);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(input).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    });
  };

  const validKeys = input.toUpperCase().split('').filter((char) => DTMF_MAP[char]);

  const playSequence = () => {
    const ctx = new (window.AudioContext || window.webkitAudioContext)();
    let time = ctx.currentTime;
    const { tone, gap } = getDurations(speed);

    input.split('').forEach((char) => {
      const [low, high] = DTMF_MAP[char] || [];
      if (!low || !high) return;

      const osc1 = ctx.createOscillator();
      const osc2 = ctx.createOscillator();
      const gain = ctx.createGain();

      osc1.frequency.value = low;
      osc2.frequency.value = high;
      gain.gain.value = 0.3;

      osc1.connect(gain);
      osc2.connect(gain);
      gain.connect(ctx.destination);

      osc1.start(time);
      osc2.start(time);
      osc1.stop(time + tone);
      osc2.stop(time + tone);

      time += tone + gap;
    });
  };

  const downloadWav = async () => {
    const { tone, gap } = getDurations(speed);
    const sampleRate = 44100;
    const totalDuration = input.length * (tone + gap);
    const offlineCtx = new OfflineAudioContext(1, sampleRate * totalDuration, sampleRate);
    let time = 0;

    input.split('').forEach((char) => {
      const [low, high] = DTMF_MAP[char] || [];
      if (!low || !high) return;

      const osc1 = offlineCtx.createOscillator();
      const osc2 = offlineCtx.createOscillator();
      const gain = offlineCtx.createGain();

      osc1.type = 'sine';
      osc2.type = 'sine';
      osc1.frequency.value = low;
      osc2.frequency.value = high;
      gain.gain.value = 0.3;

      osc1.connect(gain);
      osc2.connect(gain);
      gain.connect(offlineCtx.destination);

      osc1.start(time);
      osc2.start(time);
      osc1.stop(time + tone);
      osc2.stop(time + tone);

      time += tone + gap;
    });

    const rendered = await offlineCtx.startRendering();
    const buffer = rendered.getChannelData(0);
    const wavBuffer = encodeWAV(buffer, sampleRate);
    const blob = new Blob([wavBuffer], { type: 'audio/wav' });
    saveAs(blob, 'dtmf_sequence.wav');
  };

  const encodeWAV = (samples, sampleRate) => {
    const buffer = new ArrayBuffer(44 + samples.length * 2);
    const view = new DataView(buffer);

    const writeString = (offset, str) =>
      str.split('').forEach((s, i) => view.setUint8(offset + i, s.charCodeAt(0)));

    writeString(0, 'RIFF');
    view.setUint32(4, 36 + samples.length * 2, true);
    writeString(8, 'WAVE');
    writeString(12, 'fmt ');
    view.setUint32(16, 16, true);
    view.setUint16(20, 1, true);
    view.setUint16(22, 1, true);
    view.setUint32(24, sampleRate, true);
    view.setUint32(28, sampleRate * 2, true);
    view.setUint16(32, 2, true);
    view.setUint16(34, 16, true);
    writeString(36, 'data');
    view.setUint32(40, samples.length * 2, true);

    for (let i = 0; i < samples.length; i++) {
      const s = Math.max(-1, Math.min(1, samples[i]));
      view.setInt16(44 + i * 2, s * 0x7fff, true);
    }

    return buffer;
  };

  return (
  <div className="container text-center mt-4">
    <h2 className="mb-3">🔢 DTMF Encoder</h2>
    <div className="mb-3">
      <label>Enter DTMF sequence:</label>
      <input
        type="text"
        value={input}
        className="form-control bg-dark text-light border-info"
        placeholder="e.g. 1800*34#"
        onChange={(e) => setInput(e.target.value.toUpperCase())}
      />
    </div>

    <div className="led-text mb-3">{input || "Your input will appear here"}</div>

    <div className="dialpad">
      {["1", "2", "3", "4", "5", "6", "7", "8", "9", "*", "0", "#"].map((key) => (
        <button key={key} className="dial-button" onClick={() => handleKeypadClick(key)}>
          {key}
        </button>
      ))}
    </div>

    <div className="mb-3 mt-4">
    <label className="me-2 fw-bold">Speed:</label>
    <select
        className="form-select d-inline w-auto bg-dark text-info border-info"
        value={speed}
        onChange={(e) => setSpeed(e.target.value)}
    >
        <option value="fast">Fast</option>
        <option value="normal">Normal</option>
        <option value="slow">Slow</option>
    </select>
    </div>


    <div className="d-flex justify-content-center gap-3 mb-4">
      <Button variant="success" onClick={playSequence}>Play</Button>
      <Button variant="info" onClick={downloadWav}>Download</Button>
      <Button variant="outline-secondary" onClick={handleClear}>Clear</Button>
      <Button variant="outline-primary" onClick={handleCopy}>
        {copied ? <Check size={18} /> : <Copy size={18} />}
      </Button>
    </div>

    {/* Frequency Table */}
    {validKeys.length > 0 && (
      <div className="text-start">
        <h5 className="mb-3">🔊 Frequency Pairs:</h5>
        <Table striped bordered hover variant="dark">
          <thead>
            <tr>
              <th>Key</th>
              <th>Low Freq (Hz)</th>
              <th>High Freq (Hz)</th>
            </tr>
          </thead>
          <tbody>
            {validKeys.map((char, index) => {
              const [low, high] = DTMF_MAP[char];
              return (
                <tr key={index}>
                  <td>{char}</td>
                  <td>{low}</td>
                  <td>{high}</td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </div>
    )}
  </div>
);

};

export default DTMFEncoder;

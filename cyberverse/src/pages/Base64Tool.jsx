import { useState } from "react";

export default function Base64Tool() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");

  const handleEncode = () => {
    try {
      setOutput(btoa(input));
    } catch {
      setOutput("⚠️ Invalid input for encoding.");
    }
  };

  const handleDecode = () => {
    try {
      setOutput(atob(input));
    } catch {
      setOutput("⚠️ Invalid Base64 string.");
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4" style={{ fontFamily: "Orbitron", color: "#00ffe1" }}>
        🔐 Base64 Encoder / Decoder
      </h2>

      <textarea
        className="form-control mb-3"
        rows="4"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Enter text or base64 string..."
      />

      <div className="d-flex gap-3 mb-3">
        <button onClick={handleEncode}>Encode</button>
        <button onClick={handleDecode}>Decode</button>
      </div>

      <textarea
        className="form-control"
        rows="4"
        value={output}
        readOnly
        placeholder="Result will appear here..."
      />
    </div>
  );
}

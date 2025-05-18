import { useState } from "react";
import { Button, Form, Card } from "react-bootstrap";

export default function CaesarCracker() {
  const [input, setInput] = useState("");
  const [results, setResults] = useState([]);
  const [copiedShift, setCopiedShift] = useState(null);
  const commonWords = ["the", "and", "that", "have", "for", "not", "you", "with", "this", "but", "from", "they", "his", "her", "she", "will", "say", "can", "who", "get", "would", "make", "about", "flag", "ctf"];
  const [bestGuess, setBestGuess] = useState(null);

const crackCaesar = () => {
  const text = input.toUpperCase();
  const cracked = [];
  let bestScore = 0;
  let bestResult = null;

  for (let shift = 1; shift < 26; shift++) {
    let decoded = "";
    for (let char of text) {
      if (/[A-Z]/.test(char)) {
        const code = ((char.charCodeAt(0) - 65 - shift + 26) % 26) + 65;
        decoded += String.fromCharCode(code);
      } else {
        decoded += char;
      }
    }

    // Score by counting matches of common words
    const wordMatches = decoded
      .toLowerCase()
      .split(/[^a-z]+/)
      .filter((w) => commonWords.includes(w)).length;

    if (wordMatches > bestScore) {
      bestScore = wordMatches;
      bestResult = { shift, decoded };
    }

    cracked.push({ shift, decoded });
  }

  setResults(cracked);
  setBestGuess(bestResult);
};


  return (
    <div className="container mt-5">
      <h2 style={{ fontFamily: "Orbitron", color: "#00ffe1" }}>
        🔓 Caesar Cipher Cracker
      </h2>
      <Form.Group className="mb-3">
        <Form.Control
          as="textarea"
          rows={4}
          placeholder="Enter Caesar-encrypted text..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          style={{ backgroundColor: "#1c1c1c", color: "#00ffe1" }}
        />
      </Form.Group>
      <Button variant="info" onClick={crackCaesar}>
        Crack Cipher
      </Button>

      <div className="mt-4">
        {bestGuess && (
            <Card className="mb-4 bg-success bg-opacity-10 border-success text-light">
                <Card.Body>
                <Card.Title style={{ color: "#00ffe1", fontFamily: "JetBrains Mono" }}>
                    ✅ Best Match Found (Shift {bestGuess.shift})
                </Card.Title>
                <Card.Text style={{ fontFamily: "monospace", whiteSpace: "pre-wrap" }}>
                    {bestGuess.decoded}
                </Card.Text>
                </Card.Body>
            </Card>
            )}

        {results.map((r) => (
          <Card key={r.shift} className="mb-3 bg-dark text-light">
            <Card.Body>
              <div className="d-flex justify-content-between align-items-center">
                <Card.Title style={{ color: "#00ffe1", fontFamily: "JetBrains Mono" }}>
                  Shift {r.shift}
                </Card.Title>
                <Button
                  size="sm"
                  variant={copiedShift === r.shift ? "success" : "outline-info"}
                  onClick={() => copyToClipboard(r.decoded, r.shift)}
                >
                  {copiedShift === r.shift ? "✅ Copied" : "📋 Copy"}
                </Button>
              </div>
              <Card.Text style={{ fontFamily: "monospace", whiteSpace: "pre-wrap" }}>
                {r.decoded}
              </Card.Text>
            </Card.Body>
          </Card>
        ))}
      </div>
    </div>
  );
}

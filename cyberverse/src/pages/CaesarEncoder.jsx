import { useState } from "react";
import { Form, Button, Card, Row, Col } from "react-bootstrap";

export default function CaesarEncoder() {
  const [text, setText] = useState("");
  const [shift, setShift] = useState(13); // default to ROT13
  const [encoded, setEncoded] = useState("");
  const [copied, setCopied] = useState(false);

  const encodeText = () => {
    const upperText = text.toUpperCase();
    let result = "";

    for (let char of upperText) {
      if (/[A-Z]/.test(char)) {
        const code = ((char.charCodeAt(0) - 65 + shift) % 26) + 65;
        result += String.fromCharCode(code);
      } else {
        result += char;
      }
    }
    setEncoded(result);
    setCopied(false);
  };

  const copyResult = () => {
    navigator.clipboard.writeText(encoded);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div className="container mt-5">
      <h2 style={{ fontFamily: "Orbitron", color: "#00ffe1" }}>🔐 Caesar Cipher Encoder</h2>

      <Form.Group className="mb-3">
        <Form.Label style={{ color: "#00ffe1" }}>Enter your message:</Form.Label>
        <Form.Control
          as="textarea"
          rows={3}
          placeholder="Enter plain text..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          style={{ backgroundColor: "#1c1c1c", color: "#00ffe1" }}
        />
      </Form.Group>

      <Row className="mb-3">
        <Col xs={6} md={4}>
          <Form.Label style={{ color: "#00ffe1" }}>Select shift (ROT13 = 13):</Form.Label>
          <Form.Control
            type="number"
            min={1}
            max={25}
            value={shift}
            onChange={(e) => setShift(Number(e.target.value))}
            style={{ backgroundColor: "#1c1c1c", color: "#00ffe1" }}
          />
        </Col>
      </Row>

      <Button variant="info" onClick={encodeText}>
        Encode
      </Button>

      {encoded && (
        <Card className="mt-4 bg-dark text-light">
          <Card.Body>
            <div className="d-flex justify-content-between align-items-center">
              <Card.Title style={{ color: "#00ffe1", fontFamily: "JetBrains Mono" }}>
                Encoded Result
              </Card.Title>
              <Button
                size="sm"
                variant={copied ? "success" : "outline-info"}
                onClick={copyResult}
              >
                {copied ? "✅ Copied" : "📋 Copy"}
              </Button>
            </div>
            <Card.Text style={{ fontFamily: "monospace", whiteSpace: "pre-wrap" }}>
              {encoded}
            </Card.Text>
          </Card.Body>
        </Card>
      )}
    </div>
  );
}

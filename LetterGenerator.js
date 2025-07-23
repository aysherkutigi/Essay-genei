import React, { useState } from "react";
import axios from "axios";
import jsPDF from "jspdf";

const letterTypes = [
  "Formal Letter",
  "Informal Letter",
  "Cover Letter",
  "Application Letter",
  "Recommendation Letter"
];

const tones = ["Formal", "Informal", "Polite", "Friendly"];

export default function LetterGenerator() {
  const [form, setForm] = useState({
    letterType: "Formal Letter",
    recipient: "",
    purpose: "",
    details: "",
    tone: "Formal"
  });
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setResult("");
    try {
      const res = await axios.post("/api/generate-letter", form);
      setResult(res.data.letter);
    } catch (err) {
      setResult("Error generating letter. Please try again.");
    }
    setLoading(false);
  }

  function handleDownload() {
    const doc = new jsPDF();
    doc.text(result, 10, 10);
    doc.save("letter.pdf");
  }

  return (
    <div>
      <h2 className="text-xl font-semibold mb-2">Letter Generator</h2>
      <form className="space-y-2" onSubmit={handleSubmit}>
        <div>
          <label>Letter Type:</label>
          <select
            name="letterType"
            value={form.letterType}
            onChange={handleChange}
            className="ml-2 border rounded p-1"
          >
            {letterTypes.map((lt) => (
              <option key={lt} value={lt}>{lt}</option>
            ))}
          </select>
        </div>
        <div>
          <label>Recipient:</label>
          <input
            name="recipient"
            value={form.recipient}
            onChange={handleChange}
            className="ml-2 border rounded p-1 w-2/3"
            required
          />
        </div>
        <div>
          <label>Purpose:</label>
          <input
            name="purpose"
            value={form.purpose}
            onChange={handleChange}
            className="ml-2 border rounded p-1 w-2/3"
            required
          />
        </div>
        <div>
          <label>Details:</label>
          <textarea
            name="details"
            value={form.details}
            onChange={handleChange}
            className="ml-2 border rounded p-1 w-2/3"
            rows={2}
            required
          />
        </div>
        <div>
          <label>Tone:</label>
          <select
            name="tone"
            value={form.tone}
            onChange={handleChange}
            className="ml-2 border rounded p-1"
          >
            {tones.map((t) => (
              <option key={t} value={t}>{t}</option>
            ))}
          </select>
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white rounded px-4 py-1 mt-2"
          disabled={loading}
        >
          {loading ? "Generating..." : "Generate Letter"}
        </button>
      </form>
      {result && (
        <div className="mt-4">
          <label className="font-semibold">Generated Letter:</label>
          <pre className="bg-gray-100 border rounded p-2 whitespace-pre-wrap">{result}</pre>
          <button
            className="bg-green-500 mt-2 text-white rounded px-4 py-1"
            onClick={handleDownload}
          >
            Download as PDF
          </button>
        </div>
      )}
    </div>
  );
}
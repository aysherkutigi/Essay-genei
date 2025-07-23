import React, { useState } from "react";
import axios from "axios";
import jsPDF from "jspdf";

export default function ResumeBuilder() {
  const [form, setForm] = useState({
    name: "",
    contact: "",
    education: "",
    experience: "",
    skills: "",
    summary: ""
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
      const res = await axios.post("/api/generate-resume", form);
      setResult(res.data.resume);
    } catch (err) {
      setResult("Error generating resume. Please try again.");
    }
    setLoading(false);
  }

  function handleDownload() {
    const doc = new jsPDF();
    doc.text(result, 10, 10);
    doc.save("resume.pdf");
  }

  return (
    <div>
      <h2 className="text-xl font-semibold mb-2">Resume Builder</h2>
      <form className="space-y-2" onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            className="ml-2 border rounded p-1 w-2/3"
            required
          />
        </div>
        <div>
          <label>Contact:</label>
          <input
            name="contact"
            value={form.contact}
            onChange={handleChange}
            className="ml-2 border rounded p-1 w-2/3"
            required
          />
        </div>
        <div>
          <label>Education:</label>
          <textarea
            name="education"
            value={form.education}
            onChange={handleChange}
            className="ml-2 border rounded p-1 w-2/3"
            rows={2}
            required
          />
        </div>
        <div>
          <label>Experience:</label>
          <textarea
            name="experience"
            value={form.experience}
            onChange={handleChange}
            className="ml-2 border rounded p-1 w-2/3"
            rows={2}
            required
          />
        </div>
        <div>
          <label>Skills:</label>
          <input
            name="skills"
            value={form.skills}
            onChange={handleChange}
            className="ml-2 border rounded p-1 w-2/3"
            required
          />
        </div>
        <div>
          <label>Summary:</label>
          <textarea
            name="summary"
            value={form.summary}
            onChange={handleChange}
            className="ml-2 border rounded p-1 w-2/3"
            rows={2}
            required
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white rounded px-4 py-1 mt-2"
          disabled={loading}
        >
          {loading ? "Generating..." : "Generate Resume"}
        </button>
      </form>
      {result && (
        <div className="mt-4">
          <label className="font-semibold">Generated Resume:</label>
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
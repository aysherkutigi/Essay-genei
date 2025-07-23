import React from "react";
import LetterGenerator from "./components/LetterGenerator";
import ResumeBuilder from "./components/ResumeBuilder";

function App() {
  const [tab, setTab] = React.useState("letter");
  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <h1 className="text-3xl font-bold text-center mb-4">AI Generated Letter & Resume Builder</h1>
      <div className="flex justify-center mb-6">
        <button
          onClick={() => setTab("letter")}
          className={`px-4 py-2 mx-2 rounded ${tab === "letter" ? "bg-blue-500 text-white" : "bg-white border"}`}
        >
          Letter Writing
        </button>
        <button
          onClick={() => setTab("resume")}
          className={`px-4 py-2 mx-2 rounded ${tab === "resume" ? "bg-blue-500 text-white" : "bg-white border"}`}
        >
          Resume Builder
        </button>
      </div>
      <div className="max-w-2xl mx-auto bg-white rounded shadow p-6">
        {tab === "letter" ? <LetterGenerator /> : <ResumeBuilder />}
      </div>
    </div>
  );
}

export default App;
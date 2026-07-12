import { useState } from "react";

function NewsInput({ onAnalyze, loading }) {
  const [text, setText] = useState("");

  const handleSubmit = () => {
    if (!text.trim()) {
      alert("Please enter a news article.");
      return;
    }

    onAnalyze(text);
  };

  return (
    <div className="max-w-5xl mx-auto mt-16">

      <textarea
        rows="10"
        placeholder="Paste your news article or headline here..."
        value={text}
        onChange={(e) => setText(e.target.value)}
        className="w-full rounded-2xl bg-slate-900 border border-slate-700 text-white p-6 outline-none resize-none"
      />

      <button
        onClick={handleSubmit}
        disabled={loading}
        className="mt-6 bg-cyan-500 hover:bg-cyan-600 px-8 py-4 rounded-xl font-semibold text-black"
      >
        {loading ? "Analyzing..." : "Analyze News"}
      </button>

    </div>
  );
}

export default NewsInput;
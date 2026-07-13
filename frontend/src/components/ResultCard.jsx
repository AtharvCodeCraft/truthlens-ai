import ConfidenceGauge from "./ConfidenceGauge";
import { generatePDF } from "../utils/pdfReport";

function ResultCard({ result }) {
  if (!result) return null;

  const isReal = result.prediction.toLowerCase().includes("real");

  return (
    <div className="max-w-6xl mx-auto mt-16">

      {/* ========================= */}
      {/* Prediction + Confidence */}
      {/* ========================= */}

      <div className="grid md:grid-cols-2 gap-8">

        {/* Prediction */}

        <div className="rounded-3xl bg-slate-900 border border-slate-700 p-8">

          <h2 className="text-2xl font-bold text-white">
            Prediction
          </h2>

          <div
            className={`mt-8 inline-block px-8 py-4 rounded-full text-2xl font-bold ${
              isReal
                ? "bg-green-500/20 text-green-400"
                : "bg-red-500/20 text-red-400"
            }`}
          >
            {result.prediction}
          </div>

        </div>

        {/* Confidence */}

        <div className="rounded-3xl bg-slate-900 border border-slate-700 p-8">

          <h2 className="text-2xl font-bold text-white mb-8">
            Confidence
          </h2>

          <ConfidenceGauge confidence={result.confidence} />

        </div>

      </div>

      {/* ========================= */}
      {/* AI Explanation */}
      {/* ========================= */}

      <div className="rounded-3xl bg-slate-900 border border-slate-700 p-8 mt-8">

        <h2 className="text-2xl font-bold text-white mb-6">
          AI Explanation
        </h2>

        <p className="text-gray-300 leading-8 whitespace-pre-line">
          {result.explanation}
        </p>

      </div>

      {/* ========================= */}
      {/* Extracted Claims */}
      {/* ========================= */}

      <div className="rounded-3xl bg-slate-900 border border-slate-700 p-8 mt-8">

        <h2 className="text-2xl font-bold text-white mb-6">
          Extracted Claims
        </h2>

        {result.claims && result.claims.length > 0 ? (

          <ul className="space-y-4">

            {result.claims.map((claim, index) => (

              <li
                key={index}
                className="bg-slate-800 rounded-xl p-4 text-gray-300"
              >
                {claim}
              </li>

            ))}

          </ul>

        ) : (

          <p className="text-gray-400">
            No claims extracted.
          </p>

        )}

      </div>

      {/* ========================= */}
      {/* Fact Check Results */}
      {/* ========================= */}

      <div className="rounded-3xl bg-slate-900 border border-slate-700 p-8 mt-8">

        <h2 className="text-2xl font-bold text-white mb-6">
          Fact Check Results
        </h2>

        {result.fact_check && result.fact_check.length > 0 ? (

          <div className="space-y-5">

            {result.fact_check.map((item, index) => (

              <div
                key={index}
                className="bg-slate-800 rounded-xl p-5"
              >

                <h3 className="text-cyan-400 font-semibold text-lg">
                  Claim {index + 1}
                </h3>

                <p className="text-gray-300 mt-3">
                  <strong>Claim:</strong>
                </p>

                <p className="text-white mb-4">
                  {item.claim}
                </p>

                <p className="text-gray-300">
                  <strong>Analysis:</strong>
                </p>

                <p className="text-gray-400 whitespace-pre-line">
                  {item.analysis}
                </p>

              </div>

            ))}

          </div>

        ) : (

          <p className="text-gray-400">
            No fact-check results available.
          </p>

        )}

      </div>

      {/* ========================= */}
      {/* Download PDF */}
      {/* ========================= */}

      <div className="mt-10 flex justify-end">

        <button
          onClick={() => generatePDF(result)}
          className="bg-cyan-500 hover:bg-cyan-600 text-black px-6 py-3 rounded-xl font-semibold transition flex items-center gap-2"
        >
          📄 Download Analysis Report
        </button>

      </div>

    </div>
  );
}

export default ResultCard;
import ConfidenceGauge from "./ConfidenceGauge";
function ResultCard({ result }) {
  if (!result) return null;

  const isReal = result.prediction.toLowerCase().includes("real");

  return (
    <div className="max-w-6xl mx-auto mt-16">

      {/* Prediction + Confidence */}

      <div className="grid md:grid-cols-2 gap-8">

        {/* Prediction Card */}

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

        {/* Confidence Card */}

        <div className="rounded-3xl bg-slate-900 border border-slate-700 p-8">

          <h2 className="text-2xl font-bold text-white">
            Confidence
          </h2>

          <ConfidenceGauge confidence={result.confidence} />

        </div>

      </div>

      {/* AI Explanation */}

      <div className="rounded-3xl bg-slate-900 border border-slate-700 p-8 mt-8">

        <h2 className="text-2xl font-bold text-white mb-6">
          AI Explanation
        </h2>

        <p className="text-gray-300 leading-8">
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

      

    

    </div>
  );
}

export default ResultCard;
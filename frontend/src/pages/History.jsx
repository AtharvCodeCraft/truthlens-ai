import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import Navbar from "../components/Navbar";
import api, { deleteAnalysis } from "../services/api";

function History() {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchHistory();
  }, []);

  const fetchHistory = async () => {
    try {
      const response = await api.get("/analysis/history");
      setHistory(response.data);
    } catch (error) {
      console.error(error);
      toast.error("Failed to load history");
      setHistory([]);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteAnalysis(id);

      setHistory((prevHistory) =>
        prevHistory.filter((item) => item.id !== id)
      );

      toast.success("Analysis deleted successfully");
    } catch (error) {
      console.error(error);
      toast.error("Failed to delete analysis");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-blue-950">
      <Navbar />

      <div className="max-w-6xl mx-auto py-10 px-6">
        <h1 className="text-4xl font-bold text-white mb-10">
          📜 Analysis History
        </h1>

        {loading ? (
          <p className="text-gray-400 text-xl">
            Loading history...
          </p>
        ) : history.length === 0 ? (
          <p className="text-gray-400 text-xl">
            No previous analyses found.
          </p>
        ) : (
          <div className="grid gap-6">
            {history.map((item) => (
              <div
                key={item.id}
                className="bg-slate-900 border border-slate-700 rounded-2xl p-6 shadow-lg"
              >
                <div className="flex justify-between items-center">

                  <h2
                    className={`text-2xl font-bold ${
                      item.prediction === "Likely Real"
                        ? "text-green-400"
                        : "text-red-400"
                    }`}
                  >
                    {item.prediction}
                  </h2>

                  <div className="flex items-center gap-4">

                    <span className="text-gray-400 text-sm">
                      {item.created_at}
                    </span>

                    <button
                      onClick={() => handleDelete(item.id)}
                      className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg text-white transition duration-200"
                    >
                      🗑 Delete
                    </button>

                  </div>

                </div>

                <p className="mt-4 text-cyan-400 font-semibold">
                  Confidence: {item.confidence}%
                </p>

                <p className="mt-4 text-gray-300 leading-relaxed">
                  {item.news}
                </p>

                <div className="mt-6 border-t border-slate-700 pt-4">
                  <p className="text-gray-400">
                    {item.explanation}
                  </p>
                </div>

              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default History;
import { useEffect, useState } from "react";
import toast from "react-hot-toast";



import Navbar from "../components/Navbar";
import api, { deleteAnalysis } from "../services/api";

function History() {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("All");

  useEffect(() => {
    fetchHistory();
  }, []);

const handleDelete = async (id) => {
  try {
    await deleteAnalysis(id);

    setHistory((prev) =>
      prev.filter((item) => item.id !== id)
    );

    toast.success("Analysis deleted successfully");
  } catch (error) {
    console.error(error);
    toast.error("Failed to delete analysis");
  }
};
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

 const filteredHistory = history.filter((item) => {
  const matchesSearch =
    item.news.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.prediction.toLowerCase().includes(searchTerm.toLowerCase());

  if (filter === "Real") {
    return (
      matchesSearch &&
      item.prediction.toLowerCase().includes("real")
    );
  }

  if (filter === "Fake") {
    return (
      matchesSearch &&
      item.prediction.toLowerCase().includes("fake")
    );
  }

  return matchesSearch;
});

  // Statistics
  const totalAnalysis = history.length;

  const realCount = history.filter((item) =>
    item.prediction.toLowerCase().includes("real")
  ).length;

  const fakeCount = history.filter((item) =>
    item.prediction.toLowerCase().includes("fake")
  ).length;

  const averageConfidence =
    history.length > 0
      ? (
          history.reduce(
            (sum, item) => sum + Number(item.confidence),
            0
          ) / history.length
        ).toFixed(1)
      : 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-blue-950">
      <Navbar />

      <div className="max-w-6xl mx-auto py-10 px-6">

        <h1 className="text-4xl font-bold text-white mb-10">
          📜 Analysis History
        </h1>

        {/* Search + Filter */}

        <div className="flex flex-col md:flex-row gap-4 mb-10">

          <input
            type="text"
            placeholder="🔍 Search analyses..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex-1 bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-white outline-none focus:border-cyan-500"
          />

          <div className="flex gap-2">

            <button
              onClick={() => setFilter("All")}
              className={`px-5 py-3 rounded-xl font-semibold ${
                filter === "All"
                  ? "bg-cyan-500 text-black"
                  : "bg-slate-800 text-white"
              }`}
            >
              All
            </button>

            <button
              onClick={() => setFilter("Real")}
              className={`px-5 py-3 rounded-xl font-semibold ${
                filter === "Real"
                  ? "bg-green-500 text-black"
                  : "bg-slate-800 text-white"
              }`}
            >
              Real
            </button>

            <button
              onClick={() => setFilter("Fake")}
              className={`px-5 py-3 rounded-xl font-semibold ${
                filter === "Fake"
                  ? "bg-red-500 text-black"
                  : "bg-slate-800 text-white"
              }`}
            >
              Fake
            </button>

          </div>

        </div>

        {/* Statistics */}

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">

          <div className="bg-slate-900 border border-slate-700 rounded-2xl p-6">
            <p className="text-gray-400">Total Analyses</p>
            <h2 className="text-4xl font-bold text-cyan-400 mt-3">
              {totalAnalysis}
            </h2>
          </div>

          <div className="bg-slate-900 border border-slate-700 rounded-2xl p-6">
            <p className="text-gray-400">Real News</p>
            <h2 className="text-4xl font-bold text-green-400 mt-3">
              {realCount}
            </h2>
          </div>

          <div className="bg-slate-900 border border-slate-700 rounded-2xl p-6">
            <p className="text-gray-400">Fake News</p>
            <h2 className="text-4xl font-bold text-red-400 mt-3">
              {fakeCount}
            </h2>
          </div>

          <div className="bg-slate-900 border border-slate-700 rounded-2xl p-6">
            <p className="text-gray-400">Avg Confidence</p>
            <h2 className="text-4xl font-bold text-yellow-400 mt-3">
              {averageConfidence}%
            </h2>
          </div>

        </div>

        {loading ? (
          <p className="text-gray-400 text-xl">
            Loading history...
          </p>
        ) : filteredHistory.length === 0 ? (
          <p className="text-gray-400 text-xl">
            No previous analyses found.
          </p>
        ) : (
          <div className="grid gap-6">

            {filteredHistory.map((item) => (

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

                    <span className="text-gray-400">
                      {item.created_at}
                    </span>

                    <button
                      onClick={() => handleDelete(item.id)}
                      className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg text-white"
                    >
                      🗑 Delete
                    </button>

                  </div>

                </div>

                <p className="mt-4 text-cyan-400 font-semibold">
                  Confidence: {item.confidence}%
                </p>

                <p className="mt-4 text-gray-300">
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
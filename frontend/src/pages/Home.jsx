import { useState } from "react";

import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Features from "../components/Features";
import NewsInput from "../components/NewsInput";
import ResultCard from "../components/ResultCard";
import Loader from "../components/Loader";
import toast from "react-hot-toast";

import api from "../services/api";

function Home() {

  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [newsText, setNewsText] = useState("");

  const analyzeNews = async (text) => {
    setNewsText(text);
    setLoading(true);
    
    try {

      const response = await api.post("/analyze", {
        text,
      });

      setResult(response.data);
      toast.success("Analysis completed successfully!");
      

    } catch (err) {

      console.error(err);

      toast.error("Backend connection failed!");

    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-blue-950">

      <Navbar />

      <Hero />

      <Features />

      <NewsInput
        onAnalyze={analyzeNews}
        loading={loading}
      />

      

{loading && <Loader />}

{result && !loading && (
  <ResultCard result={result} />
)}
     

      

    </div>
  );
}

export default Home;
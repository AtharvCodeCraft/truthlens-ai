export const saveHistory = (result, newsText) => {
  const history =
    JSON.parse(localStorage.getItem("truthlens-history")) || [];

  history.unshift({
    id: Date.now(),
    news: newsText,
    prediction: result.prediction,
    confidence: result.confidence,
    explanation: result.explanation,
    claims: result.claims,
    fact_check: result.fact_check,
    date: new Date().toLocaleString(),
  });

  localStorage.setItem(
    "truthlens-history",
    JSON.stringify(history)
  );
};

export const getHistory = () => {
  return JSON.parse(
    localStorage.getItem("truthlens-history")
  ) || [];
};
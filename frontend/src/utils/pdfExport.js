import { jsPDF } from "jspdf";

export const exportAnalysisPDF = (analysis) => {
  const doc = new jsPDF();

  let y = 20;

  // Title
  doc.setFont("helvetica", "bold");
  doc.setFontSize(22);
  doc.text("TruthLens AI Report", 20, y);

  y += 15;

  // Prediction
  doc.setFontSize(16);
  doc.setFont("helvetica", "bold");
  doc.text("Prediction", 20, y);

  y += 8;

  doc.setFont("helvetica", "normal");
  doc.text(analysis.prediction, 20, y);

  y += 15;

  // Confidence
  doc.setFont("helvetica", "bold");
  doc.text("Confidence", 20, y);

  y += 8;

  doc.setFont("helvetica", "normal");
  doc.text(`${analysis.confidence}%`, 20, y);

  y += 15;

  // News
  doc.setFont("helvetica", "bold");
  doc.text("News", 20, y);

  y += 8;

  doc.setFont("helvetica", "normal");

  const news = doc.splitTextToSize(
    analysis.news,
    170
  );

  doc.text(news, 20, y);

  y += news.length * 8 + 10;

  // Explanation
  doc.setFont("helvetica", "bold");
  doc.text("AI Explanation", 20, y);

  y += 8;

  doc.setFont("helvetica", "normal");

  const explanation = doc.splitTextToSize(
    analysis.explanation,
    170
  );

  doc.text(explanation, 20, y);

  y += explanation.length * 8 + 10;

  // Claims
  doc.setFont("helvetica", "bold");
  doc.text("Extracted Claims", 20, y);

  y += 8;

  doc.setFont("helvetica", "normal");

  if (analysis.claims && analysis.claims.length > 0) {
    analysis.claims.forEach((claim) => {
      doc.text(`• ${claim}`, 25, y);
      y += 8;
    });
  } else {
    doc.text("No claims found.", 20, y);
    y += 8;
  }

  y += 8;

  // Fact Check
  doc.setFont("helvetica", "bold");
  doc.text("Fact Check", 20, y);

  y += 8;

  doc.setFont("helvetica", "normal");

  if (analysis.fact_check && analysis.fact_check.length > 0) {
    analysis.fact_check.forEach((item) => {
      const text = `${item.claim} : ${item.analysis}`;
      const lines = doc.splitTextToSize(text, 170);

      doc.text(lines, 25, y);
      y += lines.length * 8;
    });
  } else {
    doc.text("No fact check available.", 20, y);
    y += 8;
  }

  y += 10;

  doc.setFontSize(11);

  doc.text(
    `Generated on: ${new Date().toLocaleString()}`,
    20,
    y
  );

  doc.save("TruthLens_Report.pdf");
};
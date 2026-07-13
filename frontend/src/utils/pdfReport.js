import jsPDF from "jspdf";

export const generatePDF = (result) => {
  if (!result) return;

  const doc = new jsPDF();

  doc.setFontSize(22);
  doc.text("TruthLens AI", 20, 20);

  doc.setFontSize(16);
  doc.text("News Analysis Report", 20, 35);

  doc.setFontSize(12);

  doc.text(`Prediction: ${result.prediction}`, 20, 55);
  doc.text(`Confidence: ${result.confidence}%`, 20, 65);

  doc.text("AI Explanation:", 20, 80);
  const explanation = doc.splitTextToSize(result.explanation, 170);
  doc.text(explanation, 20, 90);

  let y = 90 + explanation.length * 7 + 10;

  doc.text("Claims:", 20, y);
  y += 10;

  result.claims.forEach((claim) => {
    const lines = doc.splitTextToSize(`• ${claim}`, 170);
    doc.text(lines, 20, y);
    y += lines.length * 7 + 4;
  });

  y += 8;

  doc.text("Fact Check:", 20, y);
  y += 10;

  result.fact_check.forEach((item) => {
    const claim = doc.splitTextToSize(item.claim, 170);
    doc.text(claim, 20, y);
    y += claim.length * 7;

    const analysis = doc.splitTextToSize(item.analysis, 170);
    doc.text(analysis, 20, y);
    y += analysis.length * 7 + 8;
  });

  doc.save("TruthLens_Report.pdf");
};
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

function ConfidenceGauge({ confidence }) {
  const value = Number(confidence);

  let color = "#22c55e"; // Green

  if (value < 80) color = "#f59e0b"; // Yellow
  if (value < 60) color = "#ef4444"; // Red

  return (
    <div className="w-52 h-52 mx-auto">

      <CircularProgressbar
        value={value}
        text={`${value}%`}
        styles={buildStyles({
          pathColor: color,
          textColor: color,
          trailColor: "#1e293b",
          textSize: "16px",
        })}
      />

    </div>
  );
}

export default ConfidenceGauge;
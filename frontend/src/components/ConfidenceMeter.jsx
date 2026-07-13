import React from "react";
function ConfidenceMeter({ confidence }) {

  return (
    <div className="text-center">

      <div className="w-28 h-28 rounded-full border-[8px] border-cyan-400 flex items-center justify-center">

        <span className="text-3xl font-bold text-white">
          {confidence}%
        </span>

      </div>

      <p className="text-slate-400 mt-3">
        Confidence
      </p>

    </div>
  );
}

export default ConfidenceMeter;
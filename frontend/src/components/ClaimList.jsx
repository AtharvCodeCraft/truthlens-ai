import React from "react";
function ClaimList({ claims = [] }) {

  return (
    <div className="bg-slate-900 rounded-2xl border border-slate-800 p-8">

      <h2 className="text-2xl font-bold text-cyan-400">
        Extracted Claims
      </h2>

      <ul className="mt-6 space-y-4">

        {claims.map((claim, index) => (

          <li
            key={index}
            className="bg-slate-800 rounded-xl p-4 text-white"
          >
            • {claim}
          </li>

        ))}

      </ul>

    </div>
  );
}

export default ClaimList;
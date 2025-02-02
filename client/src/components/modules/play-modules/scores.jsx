import React from "react";

const Scores = ({ score, label = "current score" }) => {
  return (
    <div className="bg-zinc-800/50 rounded-lg px-10 py-4 border border-zinc-700 min-w-[160px]">
      <p className="text-sm font-medium text-zinc-400 mb-1 text-center">{label}</p>
      <p className="text-2xl font-mono text-emerald-400 text-center">{score}</p>
    </div>
  );
};

export default Scores;

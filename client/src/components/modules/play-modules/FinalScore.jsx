import React from "react";
import { useNavigate } from "react-router-dom";
import { post } from "../../../utilities";

const FinalScore = ({ score }) => {
  const navigate = useNavigate();

  React.useEffect(() => {
    post("/api/score", { score: score }).then(() => console.log("score saved successfully"));
  }, [score]);

  const handlePlayAgain = () => {
    window.location.reload();
  };

  const handleHome = () => {
    navigate("/");
  };

  return (
    <div className="flex flex-col items-center justify-center space-y-12 py-24">
      <div className="bg-zinc-800/50 rounded-lg p-8 border border-zinc-700 text-center">
        <p className="text-sm font-medium text-zinc-400 mb-3">final score</p>
        <p className="text-6xl font-mono text-emerald-400 mb-6">{score}</p>
        <div className="text-sm text-zinc-400 font-mono">score saved</div>
      </div>

      <div className="flex gap-6">
        <button
          onClick={handlePlayAgain}
          className="px-8 py-4 text-sm font-medium text-zinc-300 hover:text-white border border-zinc-700 hover:border-zinc-500 rounded transition-all duration-200"
        >
          play again
        </button>
        <button
          onClick={handleHome}
          className="px-8 py-4 text-sm font-medium text-emerald-400 hover:text-emerald-300 border border-emerald-800/50 hover:border-emerald-700 rounded transition-all duration-200"
        >
          home
        </button>
      </div>
    </div>
  );
};

export default FinalScore;

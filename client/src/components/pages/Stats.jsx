import React, { useContext, useEffect } from "react";
import Graph from "../modules/stats-modules/Graph";
import HighScore from "../modules/stats-modules/HighScore";
import MeanScore from "../modules/stats-modules/MeanScore";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../App";

const Stats = () => {
  const navigate = useNavigate();
  const { userId } = useContext(UserContext);

  useEffect(() => {
    if (!userId) {
      navigate("/");
    }
  }, [userId, navigate]);

  const handleBackToHome = () => {
    navigate("/");
  };

  return (
    <div className="min-h-screen text-zinc-200">
      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="flex justify-between items-center mb-16">
          <div className="flex gap-8">
            <HighScore />
            <MeanScore />
          </div>
          <button
            onClick={handleBackToHome}
            className="px-5 py-2.5 text-sm font-medium text-zinc-300 hover:text-white border border-zinc-700 hover:border-zinc-500 rounded transition-all duration-200"
          >
            back to home
          </button>
        </div>
        <div className="bg-zinc-800/50 rounded-lg p-8 border border-zinc-700">
          <Graph />
        </div>
      </div>
    </div>
  );
};

export default Stats;

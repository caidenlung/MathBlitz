import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { get } from "../../utilities";
import { socket } from "../../client-socket";

const Leaderboard = () => {
  const navigate = useNavigate();
  const [scores, setScores] = useState([]);

  useEffect(() => {
    // Initial load of leaderboard
    get("/api/leaderboard").then((scores) => {
      setScores(scores);
    });

    // Listen for real-time updates
    socket.on("leaderboard", (updatedScores) => {
      setScores(updatedScores);
    });

    // Cleanup socket listener when component unmounts
    return () => {
      socket.off("leaderboard");
    };
  }, []);

  return (
    <div className="min-h-screen bg-zinc-900 flex flex-col items-center pt-16 px-4">
      <div className="w-full max-w-2xl">
        <div className="flex justify-between items-center mb-12">
          <h1 className="text-4xl font-bold text-yellow-400/90">leaderboard</h1>
          <button
            onClick={() => navigate("/")}
            className="px-6 py-3 text-sm font-medium text-yellow-400/80 hover:text-yellow-300 border border-yellow-400/50 hover:border-yellow-400 rounded transition-all duration-200"
          >
            back
          </button>
        </div>

        <div className="bg-zinc-800/50 rounded-lg border border-zinc-700">
          <div className="px-6 py-4 border-b border-zinc-700">
            <div className="grid grid-cols-12 text-sm font-medium text-zinc-400">
              <div className="col-span-2 text-center">#</div>
              <div className="col-span-7">player</div>
              <div className="col-span-3 text-right">score</div>
            </div>
          </div>
          
          <div className="divide-y divide-zinc-700/50">
            {scores.map((score, index) => (
              <div key={index} className="px-6 py-4">
                <div className="grid grid-cols-12 items-center">
                  <div className="col-span-2 text-center font-mono text-zinc-500">
                    {index + 1}
                  </div>
                  <div className="col-span-7 font-medium text-zinc-300">
                    {score.name}
                  </div>
                  <div className="col-span-3 text-right font-mono text-yellow-400/90">
                    {score.score}
                  </div>
                </div>
              </div>
            ))}
            {scores.length === 0 && (
              <div className="px-6 py-8 text-center text-zinc-500">
                no scores yet
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Leaderboard;
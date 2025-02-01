import React, { useState, useEffect } from "react";
import { get } from "../../../utilities";

const HighScore = () => {
  const [highScore, setHighScore] = useState(0);

  useEffect(() => {
    getHighScore();
  }, []);

  const getHighScore = async () => {
    try {
      const response = await get("/api/scores");
      const scores = response.scores;
      const maxScore = scores.length > 0 ? Math.max(...scores) : 0;
      setHighScore(maxScore);
    } catch (err) {
      console.log("Failed to get high score:", err);
    }
  };

  return (
    <div className="bg-zinc-800/50 rounded-lg p-4 border border-zinc-700">
      <p className="text-sm font-medium text-zinc-400 mb-1">high score</p>
      <p className="text-2xl font-mono text-yellow-400">{highScore}</p>
    </div>
  );
};

export default HighScore;

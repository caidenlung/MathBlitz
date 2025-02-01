import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { get } from "../../../utilities";

const FinalScore = ({ score }) => {
  const navigate = useNavigate();
  const [highScore, setHighScore] = useState(0);

  useEffect(() => {
    getScores();
  }, []);

  const handlePlayAgain = () => {
    window.location.reload();
  };

  const handleHome = () => {
    navigate("/"); // Navigate to home page
  };

  const getScores = async () => {
    try {
      const response = await get("/api/scores");
      const userScores = response.scores;
      const newHighScore = Math.max(...userScores, score);
      setHighScore(newHighScore);
    } catch (err) {
      error.log("Failed to get scores:", err);
    }
  };

  return (
    <div>
      <div className="text-3xl space-y-8 flex flex-col items-center justify-center h-screen text-white">
        <h1>Game Over!</h1>
        <div>Final Score: {score}</div>
        <div>Your High Score: {highScore} </div>
        <div className="space-x-8">
          <button
            onClick={handlePlayAgain}
            className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-6 rounded-lg transition colors"
          >
            Play Again
          </button>
          <button
            onClick={handleHome}
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-6 rounded-lg transition colors"
          >
            Home
          </button>
        </div>
      </div>
    </div>
  );
};
export default FinalScore;

import React from "react";
import { useNavigate } from "react-router-dom";
const FinalScore = ({ score }) => {
  const navigate = useNavigate();

  const handlePlayAgain = () => {
    window.location.reload();
  };

  const handleHome = () => {
    navigate("/"); // Navigate to home page
  };

  return (
    <div>
      <div className="text-3xl space-y-8 flex flex-col items-center justify-center h-screen text-white">
        <div>Final Score: {score}</div>
        <div>Your High Score:</div>
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

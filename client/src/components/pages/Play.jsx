import React, { useState, useEffect } from "react";
import Questions from "../modules/play-modules/Questions";
import Scores from "../modules/play-modules/Scores";
import Timer from "../modules/play-modules/Timer";
import FinalScore from "../modules/play-modules/FinalScore";
import { useNavigate } from "react-router-dom";

const Play = () => {
  const [score, setScore] = useState(0);
  const [isGameOver, setIsGameOver] = useState(false);
  const navigate = useNavigate();

  const handleCorrectAnswer = () => {
    setScore(score + 1);
  };

  const handleTimeUp = () => {
    setIsGameOver(true);
  };

  const handleBackToHome = () => {
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-zinc-900 text-zinc-200">
      <div className="w-full max-w-7xl mx-auto px-12 pt-16">
        {!isGameOver ? (
          <div className="flex flex-col items-center">
            <div className="w-full flex justify-between mb-32">
              <Timer onTimeUp={handleTimeUp} />
              <button
                onClick={handleBackToHome}
                className="px-5 py-2.5 text-sm font-medium text-zinc-300 hover:text-white border border-zinc-700 hover:border-zinc-500 rounded transition-all duration-200"
              >
                back to home
              </button>
              <Scores score={score} />
            </div>
            <div className="w-full max-w-2xl">
              <Questions onCorrectAnswer={handleCorrectAnswer} />
            </div>
          </div>
        ) : (
          <FinalScore score={score} />
        )}
      </div>
    </div>
  );
};

export default Play;

import React, { useState, useEffect } from "react";
import Questions from "../../components/modules/play-modules/Questions";
import Scores from "../modules/play-modules/Scores";
import Timer from "../modules/play-modules/Timer";
import FinalScore from "../modules/play-modules/FinalScore";
import { useNavigate } from "react-router-dom";

const Play = () => {
  const [score, setScore] = useState(0);
  const [isGameOver, setIsGameOver] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);
  const [selectedDuration, setSelectedDuration] = useState(120);
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

  const handleStartGame = (duration) => {
    setSelectedDuration(duration);
    setGameStarted(true);
  };

  return (
    <div className="min-h-screen text-zinc-200">
      {!gameStarted ? (
        <div className="w-full max-w-7xl mx-auto px-12 h-screen flex items-center justify-center">
          <div className="flex flex-col items-center space-y-12 -mt-20">
            <h1 className="text-6xl font-mono tracking-tight text-emerald-400">choose time</h1>
            <div className="flex gap-4">
              <button
                onClick={() => handleStartGame(60)}
                className="px-8 py-4 text-sm font-medium rounded transition-all duration-200 text-zinc-300 hover:text-white border border-zinc-700 hover:border-zinc-500"
              >
                60s
              </button>
              <button
                onClick={() => handleStartGame(120)}
                className="px-8 py-4 text-sm font-medium rounded transition-all duration-200 text-zinc-300 hover:text-white border border-zinc-700 hover:border-zinc-500"
              >
                120s
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="w-full max-w-7xl mx-auto px-12 pt-16">
          {!isGameOver ? (
            <div className="flex flex-col items-center">
              <div className="w-full flex justify-between mb-32">
                <Timer onTimeUp={handleTimeUp} timeLeft={selectedDuration} />
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
      )}
    </div>
  );
};

export default Play;

import React, { useState, useEffect } from "react";
import Questions from "../play-modules/Questions";
import Scores from "../play-modules/Scores";
import Timer from "../play-modules/Timer";
import { useNavigate, useLocation } from "react-router-dom";
import { socket } from "../../../client-socket";

const DuelPlay = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { duel, startTime, duration } = location.state || {};
  
  const [score, setScore] = useState(0);
  const [isGameOver, setIsGameOver] = useState(false);
  const [opponentScore, setOpponentScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(duration);

  useEffect(() => {
    if (!duel || !startTime || !duration) {
      navigate("/duel"); // Redirect if no duel data
      return;
    }

    // Listen for opponent's score updates
    socket.on("duel_score_update", ({ duel }) => {
      const isHost = duel.host === socket.id;
      setOpponentScore(isHost ? duel.opponentScore : duel.hostScore);
    });

    // Timer logic
    const interval = setInterval(() => {
      const now = new Date();
      const elapsed = Math.floor((now - new Date(startTime)) / 1000);
      const remaining = duration - elapsed;
      
      if (remaining <= 0) {
        clearInterval(interval);
        handleTimeUp();
        return;
      }
      
      setTimeLeft(remaining);
    }, 1000);

    return () => {
      clearInterval(interval);
      socket.off("duel_score_update");
    };
  }, [duel, startTime, duration]);

  const handleCorrectAnswer = () => {
    const newScore = score + 1;
    setScore(newScore);
    
    // Send score update to server
    fetch(`/api/duel/${duel.code}/score`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ score: newScore }),
    }).catch(console.error);
  };

  const handleTimeUp = async () => {
    setIsGameOver(true);
    
    // Final score submission
    try {
      await fetch(`/api/duel/${duel.code}/score`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ score }),
      });
    } catch (err) {
      console.error("Failed to submit final score:", err);
    }
  };

  const handleBackToHome = () => {
    socket.emit("leave_duel", duel.code);
    navigate("/");
  };

  const DuelResults = () => {
    const isWinner = score > opponentScore;
    const isTie = score === opponentScore;
    
    return (
      <div className="flex flex-col items-center space-y-8">
        <h1 className="text-6xl font-mono tracking-tight text-emerald-400">
          {isTie ? "it's a tie!" : isWinner ? "you won!" : "you lost!"}
        </h1>
        
        <div className="flex gap-16 items-center">
          <div className="text-center">
            <p className="text-sm font-medium mb-2">your score</p>
            <p className="text-4xl font-mono text-emerald-400">{score}</p>
          </div>
          <div className="text-center">
            <p className="text-sm font-medium mb-2">opponent's score</p>
            <p className="text-4xl font-mono text-emerald-400">{opponentScore}</p>
          </div>
        </div>

        <button
          onClick={handleBackToHome}
          className="px-6 py-3 text-sm font-medium text-zinc-300 hover:text-white border border-zinc-700 hover:border-zinc-500 rounded transition-all duration-200"
        >
          back to home
        </button>
      </div>
    );
  };

  if (!duel || !startTime || !duration) {
    return null; // Will redirect in useEffect
  }

  return (
    <div className="min-h-screen text-zinc-200">
      <div className="w-full max-w-7xl mx-auto px-12 pt-16">
        {!isGameOver ? (
          <div className="flex flex-col items-center">
            <div className="w-full flex justify-between mb-32">
              <Timer timeLeft={timeLeft} />
              <button
                onClick={handleBackToHome}
                className="px-5 py-2.5 text-sm font-medium text-zinc-300 hover:text-white border border-zinc-700 hover:border-zinc-500 rounded transition-all duration-200"
              >
                forfeit duel
              </button>
              <div className="flex gap-8">
                <Scores score={score} label="you" />
                <Scores score={opponentScore} label="opponent" />
              </div>
            </div>
            <div className="w-full max-w-2xl">
              <Questions onCorrectAnswer={handleCorrectAnswer} />
            </div>
          </div>
        ) : (
          <DuelResults />
        )}
      </div>
    </div>
  );
};

export default DuelPlay;
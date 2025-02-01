import React, { useState, useEffect } from "react";
import Questions from "../modules/play-modules/Questions";
import Scores from "../modules/play-modules/Scores";
import Timer from "../modules/play-modules/Timer";
import FinalScore from "../modules/play-modules/FinalScore";
import { post } from "../../utilities";

const Play = () => {
  const [score, setScore] = useState(0);
  const [isGameOver, setIsGameOver] = useState(false);

  const handleCorrectAnswer = () => {
    setScore(score + 1);
  };

  const handleTimeUp = () => {
    setIsGameOver(true);
    // Send scores to backend when game is over
    post("/api/score", { score: score }).then((user) => console.log("score saved successfully"));
  };

  return (
    <div className="relative h-screen bg-black">
      {!isGameOver && (
        <>
          <div className="absolute top-4 right-4">
            <Scores score={score} />
          </div>
          <div className="absolute top-4 left-4">
            <Timer onTimeUp={handleTimeUp} />
          </div>
        </>
      )}
      <div className="flex items-center justify-center h-full">
        {!isGameOver ? (
          <Questions onCorrectAnswer={handleCorrectAnswer} />
        ) : (
          <FinalScore score={score} />
        )}
      </div>
    </div>
  );
};

export default Play;

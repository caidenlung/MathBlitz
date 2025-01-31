import React, { useState, useEffect } from "react";
import Questions from "../modules/play-modules/questions";
import Scores from "../modules/play-modules/scores";

const Play = () => {
  const [score, setScore] = useState(0);

  const handleCorrectAnswer = () => {
    setScore(score + 1);
  };

  return (
    <div className="relative h-screen bg-black">
      <div className="absolute top-4 right-4">
        <Scores score={score} />
      </div>
      <div className="flex items-center justify-center h-full">
        <Questions onCorrectAnswer={handleCorrectAnswer} />
      </div>
    </div>
  );
};

export default Play;

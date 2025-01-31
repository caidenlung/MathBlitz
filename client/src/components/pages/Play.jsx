import React, { useState, useEffect } from "react";
import Questions from "../modules/play-modules/Questions";
import Scores from "../modules/play-modules/Scores";
import Timer from "../modules/play-modules/Timer";

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
      <div className="absolute top-4 left-4">
        <Timer />
      </div>
      <div className="flex items-center justify-center h-full">
        <Questions onCorrectAnswer={handleCorrectAnswer} />
      </div>
    </div>
  );
};

export default Play;

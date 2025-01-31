import React from "react";

const Scores = ({ score }) => {
  return (
    <div className="text-center">
      <div className="text-3xl font-bold text-white">Score: {score}</div>
    </div>
  );
};

export default Scores;

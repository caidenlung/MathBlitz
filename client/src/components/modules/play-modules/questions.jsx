import React, { useState, useEffect } from "react";

const Questions = ({ onCorrectAnswer }) => {
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [userAnswer, setUserAnswer] = useState("");

  // Generate a random question
  const generateQuestion = () => {
    const operations = ["+", "-", "*", "/"];
    const operation = operations[Math.floor(Math.random() * operations.length)];
    let num1, num2;

    // Helper functions for random number generation
    const getRandomNumber = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
    // From 2-100
    const getRandomLargeNumber = () => getRandomNumber(2, 100);
    // From 2-12
    const getRandomSmallNumber = () => getRandomNumber(2, 12);

    switch (operation) {
      case "+":
        num1 = getRandomLargeNumber();
        num2 = getRandomLargeNumber();
        break;
      case "-":
        num1 = getRandomLargeNumber();
        num2 = Math.floor(Math.random() * (num1 - 2)) + 2;
        break;
      case "*":
        num1 = getRandomSmallNumber();
        num2 = getRandomLargeNumber();
        break;
      case "/":
        // For division, ensure we get whole number results
        num2 = getRandomSmallNumber(); // divisor between 2-12
        const multiplier = getRandomLargeNumber(); // temporary number to ensure clean division
        num1 = num2 * multiplier; // this ensures num1 is divisible by num2
        break;
    }
    return {
      num1,
      num2,
      operation,
      displayOperation: operation === "/" ? "÷" : operation === "*" ? "×" : operation,
      answer: eval(`${num1} ${operation} ${num2}`),
    };
  };

  // Start new question if none exists
  useEffect(() => {
    if (!currentQuestion) {
      setCurrentQuestion(generateQuestion());
    }
  }, [currentQuestion]);

  const handleInputChange = (e) => {
    const value = e.target.value;
    setUserAnswer(value);

    if (value !== "") {
      if (parseInt(value) === currentQuestion.answer) {
        onCorrectAnswer();
        setUserAnswer("");
        setCurrentQuestion(generateQuestion());
      }
    }
  };

  return (
    <div className="flex flex-col items-center space-y-10">
      <div className="text-6xl font-mono tracking-wider">
        {currentQuestion?.num1} {currentQuestion?.displayOperation} {currentQuestion?.num2}
      </div>
      <div className="w-full max-w-sm">
        <input
          type="number"
          value={userAnswer}
          onChange={handleInputChange}
          className="w-full bg-zinc-800/50 border border-zinc-700 rounded-lg px-6 py-5 text-4xl font-mono text-center text-zinc-200 focus:outline-none focus:border-emerald-500 transition-colors [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
          autoFocus
        />
      </div>
    </div>
  );
};

export default Questions;

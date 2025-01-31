import React, { useState } from "react";

const Questions = ({ onCorrectAnswer }) => {
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [userAnswer, setUserAnswer] = useState("");

  // Generate a random question
  const generateQuestion = () => {
    const operations = ["+", "-", "*", "/"];
    const operation = operations[Math.floor(Math.random() * operations.length)];
    let num1, num2;

    switch (operation) {
      case "+":
        num1 = Math.floor(Math.random() * 100);
        num2 = Math.floor(Math.random() * 100);
        break;
      case "-":
        num1 = Math.floor(Math.random() * 100);
        num2 = Math.floor(Math.random() * (num1 + 1)); // Ensure positive result
        break;
      case "*":
        num1 = Math.floor(Math.random() * 12);
        num2 = Math.floor(Math.random() * 12);
        break;
      case "/":
        num2 = Math.floor(Math.random() * 11) + 1;
        num1 = num2 * Math.floor(Math.random() * 12);
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
  React.useEffect(() => {
    if (!currentQuestion) {
      setCurrentQuestion(generateQuestion());
    }
  }, [currentQuestion]);

  const handleInputChange = (e) => {
    const value = e.target.value;
    setUserAnswer(value);

    // Check if answer is correct when input changes
    if (value !== "" && parseFloat(value) === currentQuestion.answer) {
      onCorrectAnswer();
      setUserAnswer("");
      setCurrentQuestion(generateQuestion());
    }
  };

  return (
    <div className="space-y-4 text-center">
      <div className="text-4xl text-white">
        {currentQuestion?.num1} {currentQuestion?.displayOperation} {currentQuestion?.num2} = ?
      </div>
      <input
        type="number"
        value={userAnswer}
        onChange={handleInputChange}
        className="bg-gray-800 text-white px-4 py-2 rounded [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
        autoFocus
      />
    </div>
  );
};

export default Questions;

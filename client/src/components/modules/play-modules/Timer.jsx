import React, { useState, useEffect } from "react";

const Timer = ({ onTimeUp, timeLeft: propTimeLeft }) => {
  const [time, setTime] = useState(propTimeLeft || 120);
  const [isActive, setIsActive] = useState(true);

  // Initialize timer when propTimeLeft changes
  useEffect(() => {
    if (propTimeLeft !== undefined) {
      setTime(propTimeLeft);
      setIsActive(true);
    }
  }, [propTimeLeft]);

  // Handle countdown
  useEffect(() => {
    let interval = null;
    if (isActive && time > 0) {
      interval = setInterval(() => {
        setTime((prevTime) => {
          const newTime = prevTime - 1;
          if (newTime === 0) {
            setIsActive(false);
            onTimeUp?.();
          }
          return newTime;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isActive, onTimeUp]);

  return (
    <div className="bg-zinc-800/50 rounded-lg px-10 py-4 border border-zinc-700 min-w-[160px]">
      <p className="text-sm font-medium text-zinc-400 mb-1 text-center">time left</p>
      <p className="text-2xl font-mono text-yellow-400 text-center">{time}s</p>
    </div>
  );
};

export default Timer;

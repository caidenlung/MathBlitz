import React, { useState, useEffect } from "react";

const Timer = ({ onTimeUp, timeLeft: propTimeLeft }) => {
  const [time, setTime] = useState(propTimeLeft || 120);
  const [isActive, setIsActive] = useState(true);

  useEffect(() => {
    if (propTimeLeft !== undefined) {
      setTime(propTimeLeft);
      if (propTimeLeft <= 0) {
        setIsActive(false);
        onTimeUp?.();
      }
    }
  }, [propTimeLeft, onTimeUp]);

  useEffect(() => {
    let interval = null;
    if (isActive && time > 0 && propTimeLeft === undefined) {
      interval = setInterval(() => {
        setTime((time) => time - 1);
      }, 1000);
    } else if (time === 0) {
      setIsActive(false);
      onTimeUp?.();
    }
    return () => clearInterval(interval);
  }, [isActive, time, onTimeUp, propTimeLeft]);

  return (
    <div className="bg-zinc-800/50 rounded-lg px-10 py-4 border border-zinc-700 min-w-[160px]">
      <p className="text-sm font-medium text-zinc-400 mb-1 text-center">time left</p>
      <p className="text-2xl font-mono text-yellow-400 text-center">{time}s</p>
    </div>
  );
};

export default Timer;

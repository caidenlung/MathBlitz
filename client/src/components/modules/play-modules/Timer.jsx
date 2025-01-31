import React, { useState, useEffect } from "react";

const Timer = ({ onTimeUp }) => {
  const [time, setTime] = useState(5);
  const [isActive, setIsActive] = useState(true);

  useEffect(() => {
    let timer = null;

    if (isActive && time > 0) {
      timer = setInterval(() => {
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

    return () => {
      if (timer) {
        clearInterval(timer);
      }
    };
  }, [isActive, time, onTimeUp]);

  return (
    <div className="text-center">
      <div className="text-3xl font-bold text-white">Time Left: {time}</div>
    </div>
  );
};

export default Timer;

import React, { useState, useEffect } from "react";

const Timer = () => {
  const [time, setTime] = useState(120);
  const [isActive, setIsActive] = useState(true);

  useEffect(() => {
    let timer = null;

    if (isActive && time > 0) {
      console.log("Timer starting with time:", time); // Debug log
      timer = setInterval(() => {
        setTime((prevTime) => {
          if (prevTime <= 0) {
            setIsActive(false);
            return 0;
          }
          return prevTime - 1;
        });
      }, 1000);
    }

    return () => {
      if (timer) {
        console.log("Clearing timer"); // Debug log
        clearInterval(timer);
      }
    };
  }, [isActive, time]);

  return (
    <div className="text-center">
      <div className="text-3xl font-bold text-white">Time Left: {time}</div>
    </div>
  );
};

export default Timer;

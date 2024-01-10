import React, { useState, useEffect } from "react";

const MoneyStreamComponent = ({ totalAmount = 100000, durationInDays = 1 }) => {
  const [streamedAmount, setStreamedAmount] = useState(0);

  useEffect(() => {
    const startTime = Date.now();
    const endTime = startTime + durationInDays * 24 * 60 * 60 * 1000;
    const totalDuration = endTime - startTime;

    const interval = setInterval(() => {
      const currentTime = Date.now();
      const elapsedTime = currentTime - startTime;
      const currentAmount = (totalAmount * elapsedTime) / totalDuration;
      console.log(currentAmount);

      if (currentTime >= endTime) {
        setStreamedAmount(totalAmount);
        clearInterval(interval);
      } else {
        setStreamedAmount(currentAmount);
      }
    }, 500); // Update every half second
    return () => clearInterval(interval);
  }, [totalAmount, durationInDays]);

  return (
    <div className="text-black">
      <h3>Money Streamed</h3>
      <p>From X to Y: ${streamedAmount.toFixed(2)}</p>
    </div>
  );
};

export default MoneyStreamComponent;

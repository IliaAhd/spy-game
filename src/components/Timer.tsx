"use client";

import { useGame } from "@/contexts/GameContext";
import { useEffect, useState } from "react";

export default function Timer() {
  const { timeLimit } = useGame();
  const [remaining, setRemaining] = useState<number>(() =>
    Math.max(0, Math.floor(timeLimit * 60)),
  );

  useEffect(() => {
    setRemaining(Math.max(0, Math.floor(timeLimit * 60)));

    const id = setInterval(() => {
      setRemaining((prev) => {
        if (prev <= 1) {
          clearInterval(id);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(id);
  }, [timeLimit]);

  const minutes = Math.floor(remaining / 60);
  const seconds = remaining % 60;
  const secondsStr = String(seconds).padStart(2, "0");

  if (minutes === 0 && seconds === 0) {
    return <div>زمان بازی به پایان رسید!</div>;
  }

  return (
    <div className="text-3xl font-bold">
      {minutes}:{secondsStr}
    </div>
  );
}

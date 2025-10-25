"use client";

import { createContext, useContext, useEffect, useState } from "react";

interface GameContextType {
  playersCount: number;
  spiesCount: number;
  category: string;
  timeLimit: number;
  setPlayersCount: (count: number) => void;
  setSpiesCount: (count: number) => void;
  setCategory: (category: string) => void;
  setTimeLimit: (time: number) => void;
}

const GameContext = createContext<GameContextType | null>(null);

export function GameProvider({ children }: { children: React.ReactNode }) {
  const [playersCount, setPlayersCount] = useState<number>(3);
  const [spiesCount, setSpiesCount] = useState<number>(1);
  const [category, setCategory] = useState<string>("all");
  const [timeLimit, setTimeLimit] = useState<number>(2);

  useEffect(() => {
    if (spiesCount > playersCount) setSpiesCount(playersCount);
  }, [spiesCount, playersCount]);

  return (
    <GameContext.Provider
      value={{
        playersCount,
        spiesCount,
        category,
        timeLimit,
        setPlayersCount,
        setSpiesCount,
        setCategory,
        setTimeLimit,
      }}
    >
      {children}
    </GameContext.Provider>
  );
}

export function useGame() {
  const context = useContext(GameContext);
  if (!context) throw new Error("useGame must be used within a GameProvider");
  return context;
}

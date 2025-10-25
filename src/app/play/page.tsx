"use client";

import Role from "@/components/Role";
import Timer from "@/components/Timer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useGame } from "@/contexts/GameContext";
import { randomWord } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";

interface RoleType {
  role: "player" | "spy";
}

export default function PlayPage() {
  const { playersCount, spiesCount, category } = useGame();
  const [roles, setRoles] = useState<RoleType[]>([]);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [showRole, setShowRole] = useState<boolean>(false);
  const [gameStarted, setGameStarted] = useState<boolean>(false);
  const router = useRouter();

  const word = useMemo(() => randomWord(category), [category]);

  useEffect(() => {
    const numbers = new Set();

    while (numbers.size < spiesCount) {
      const randomNum = Math.floor(Math.random() * playersCount);
      numbers.add(randomNum);
    }

    const spyIndexes = Array.from(numbers);

    const allPlayers: RoleType[] = Array.from(
      { length: playersCount },
      (_, i) => {
        return spyIndexes.includes(i) ? { role: "spy" } : { role: "player" };
      },
    );

    setRoles(allPlayers);
  }, [playersCount, spiesCount]);

  if (!roles.length) return null;

  return (
    <div className="container mx-auto my-12 max-w-sm text-center">
      <h1 className="text-2xl font-bold">
        {gameStarted ? "بازی آغاز شد!" : "نقش خود را به یاد داشته باشید"}
      </h1>

      <Card className="mt-16">
        <CardContent>
          <div className="grid gap-6">
            {roles[currentIndex].role === "spy" ? (
              <Role
                showRole={showRole}
                onShowRole={setShowRole}
                gameStarted={gameStarted}
                role="جاسوس"
              />
            ) : (
              <Role
                showRole={showRole}
                onShowRole={setShowRole}
                gameStarted={gameStarted}
                role="شهروند"
              />
            )}

            {!gameStarted &&
              showRole &&
              roles[currentIndex].role === "player" && (
                <p className="text-lg">
                  کلمه شما:{" "}
                  <span className="font-bold text-green-500">{word}</span>
                </p>
              )}

            {showRole && currentIndex < playersCount - 1 && (
              <Button
                onClick={() => {
                  setShowRole(false);
                  if (currentIndex < playersCount - 1) {
                    setCurrentIndex((i) => i + 1);
                  }
                }}
              >
                مخفی کردن نقش
              </Button>
            )}

            {gameStarted && <Timer />}

            {currentIndex === playersCount - 1 && !gameStarted && showRole && (
              <Button onClick={() => setGameStarted(true)}>شروع بازی</Button>
            )}

            {gameStarted && (
              <Button onClick={() => router.push("/")}>پایان بازی</Button>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useGame } from "@/contexts/GameContext";
import { wordsCategory } from "@/lib/utils";
import { useRouter } from "next/navigation";

export default function GameForm() {
  const {
    setPlayersCount,
    playersCount,
    setSpiesCount,
    setCategory,
    setTimeLimit,
    spiesCount,
    timeLimit,
    category,
  } = useGame();
  const router = useRouter();

  return (
    <Card className="mx-auto w-full lg:max-w-md">
      <CardContent className="grid gap-4">
        <div className="grid gap-2">
          <Label htmlFor="players">تعداد بازیکنان </Label>
          <Input
            type="number"
            min={3}
            id="players"
            onChange={(e) => setPlayersCount(+e.target.value)}
            value={playersCount}
          />
        </div>

        <div className="grid gap-2">
          <Label htmlFor="spies">تعداد جاسوس </Label>
          <Input
            type="number"
            min={1}
            id="spies"
            onChange={(e) => setSpiesCount(+e.target.value)}
            value={spiesCount}
          />
        </div>

        <div className="grid gap-2">
          <Label htmlFor="words">موضوع کلمات</Label>
          <Select
            onValueChange={(value) => setCategory(value)}
            value={category}
          >
            <SelectTrigger className="w-full" dir="rtl">
              <SelectValue placeholder="انتخاب موضوع" />
            </SelectTrigger>

            <SelectContent dir="rtl">
              {wordsCategory().map((category) => (
                <SelectItem key={category.value} value={category.value}>
                  {category.name}
                </SelectItem>
              ))}

              <SelectItem value="all">همه موضوعات</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="grid gap-2">
          <Label htmlFor="time">زمان اتمام بازی</Label>
          <Input
            type="number"
            min={1}
            max={5}
            id="time"
            onChange={(e) => setTimeLimit(+e.target.value)}
            value={timeLimit}
          />
        </div>

        <div className="grid gap-2">
          <Button onClick={() => router.push("/play")}>شروع بازی</Button>
        </div>
      </CardContent>
    </Card>
  );
}

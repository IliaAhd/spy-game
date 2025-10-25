import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import words from "@/data/words.json";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function wordsCategory() {
  return Object.keys(words).map((category) => {
    if (category === "foods") return { name: "غذاها", value: "foods" };
    if (category === "jobs") return { name: "شغل ها", value: "jobs" };
    if (category === "places") return { name: "مکان ها", value: "places" };
    if (category === "objects") return { name: "اشیاء", value: "objects" };
    return { name: category, value: category };
  });
}

export function randomWord(category: string) {
  const categoryWords =
    category === "all"
      ? Object.values(words).flat()
      : words[category as keyof typeof words];

  const randomIndex = Math.floor(Math.random() * categoryWords.length);
  
  return categoryWords[randomIndex];
}

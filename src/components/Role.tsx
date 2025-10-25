import { Button } from "./ui/button";

export default function Role({
  showRole,
  onShowRole,
  gameStarted,
  role,
}: {
  showRole: boolean;
  onShowRole: (value: boolean) => void;
  gameStarted: boolean;
  role: "جاسوس" | "شهروند";
}) {
  if (gameStarted) return null;

  return !showRole ? (
    <>
      <p className="text-lg">برای نمایش نقش کلیک کنید</p>
      {<Button onClick={() => onShowRole(true)}>نمایش نقش</Button>}
    </>
  ) : (
    <p className="text-lg">
      شما{" "}
      <span className={`${role === "جاسوس" ? "text-red-500" : ""}`}>
        {role}
      </span>{" "}
      هستید!
    </p>
  );
}

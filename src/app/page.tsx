import GameForm from "@/components/GameForm";

export default function Home() {
  return (
    <div className="container mx-auto px-4 lg:px-0">
      <h1 className="my-8 scroll-m-20 text-center text-4xl tracking-tight text-balance">
        بازی جاسوس تحت وب
      </h1>

      <GameForm />
    </div>
  );
}

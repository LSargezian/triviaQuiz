// Home.tsx
import type { Route } from "./+types/home";
import { Welcome } from "~/components/welcome/welcome";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Trivia Quiz App" },
    { name: "description", content: "Welcome to Trivia Quiz App!" },
  ];
}

export default function Home() {
  return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-6 space-y-6">
        <img
            src="/quizhome.png"
            alt="Trivia Quiz Home"
            className="w-full max-w-md"
        />
        <Welcome/>
      </div>
  );
}

import type { Metadata } from "next";
import RecommendClient from "./RecommendClient";

export const metadata: Metadata = {
  title:
    "AI Book Recommender — Booksmania | Find Your Perfect Book Match",
  description:
    "Tell us your mood, goal, and last book read, and our AI-powered tool will recommend the perfect books for you. Personalized book recommendations in seconds.",
};

export default function RecommendPage() {
  return <RecommendClient />;
}

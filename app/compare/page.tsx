import type { Metadata } from "next";
import CompareListingClient from "./CompareListingClient";

export const metadata: Metadata = {
  title:
    "Book Comparisons — Booksmania | Side-by-Side Reviews & Recommendations",
  description:
    "Compare the best books side by side. Atomic Habits vs The Power of Habit, Dune vs Project Hail Mary, and more in-depth comparisons to help you choose.",
};

export default function ComparePage() {
  return <CompareListingClient />;
}

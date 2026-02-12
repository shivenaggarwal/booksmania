import Link from "next/link";

interface CategoryPillProps {
  label: string;
  href: string;
  active?: boolean;
}

export default function CategoryPill({ label, href, active }: CategoryPillProps) {
  return (
    <Link
      href={href}
      className={`inline-block px-5 py-2 text-xs tracking-[0.1em] uppercase rounded-sm border transition-all duration-300 ${
        active
          ? "bg-text-primary text-surface border-text-primary"
          : "bg-transparent text-text-secondary border-border-dark hover:border-accent hover:text-accent"
      }`}
    >
      {label}
    </Link>
  );
}

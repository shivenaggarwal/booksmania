"use client";

interface LogoIconProps {
  size?: number;
  className?: string;
}

/** Just the paper airplane icon from the booksmania logo */
export function PlaneIcon({ size = 40, className = "" }: LogoIconProps) {
  const scale = size / 60;
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="30 0 70 70"
      width={size}
      height={size}
      className={className}
    >
      <g>
        <polygon
          fill="none"
          stroke="currentColor"
          strokeMiterlimit={10}
          strokeWidth={3}
          points="95.66 2.92 87.02 51.84 73.92 46.89 64.11 57.46 63.95 57.44 63.81 57.42 58.13 40.93 41.28 34.57 95.66 2.92"
        />
        <polyline
          fill="none"
          stroke="currentColor"
          strokeMiterlimit={10}
          strokeWidth={3}
          points="58.13 40.86 95.66 2.92 66.48 43.51 63.91 57.44"
        />
        <line
          fill="none"
          stroke="currentColor"
          strokeMiterlimit={10}
          strokeWidth={3}
          x1="66.54"
          y1="43.57"
          x2="73.92"
          y2="46.89"
        />
        <rect fill="currentColor" x="35.28" y="65.13" width="7" height="3" rx="0.74" />
        <rect
          fill="currentColor"
          x="24.57"
          y="61.58"
          width="7"
          height="3"
          rx="0.74"
          transform="translate(35.3 -5.58) rotate(30)"
        />
        <rect
          fill="currentColor"
          x="48.52"
          y="62.13"
          width="7"
          height="3"
          rx="0.74"
          transform="translate(-27.27 42) rotate(-35.47)"
        />
      </g>
    </svg>
  );
}

interface LogoProps {
  showText?: boolean;
  size?: "sm" | "md" | "lg";
  className?: string;
}

export default function Logo({ showText = true, size = "md", className = "" }: LogoProps) {
  const iconSize = size === "sm" ? 28 : size === "md" ? 36 : 48;
  const textClass =
    size === "sm"
      ? "text-lg"
      : size === "md"
      ? "text-2xl"
      : "text-3xl";

  return (
    <span className={`inline-flex items-center gap-2 ${className}`}>
      <PlaneIcon size={iconSize} className="text-[#0071bc]" />
      {showText && (
        <span
          className={`${textClass} tracking-tight`}
          style={{ fontFamily: "'Pacifico', cursive" }}
        >
          <span className="text-[#09537c]">booksmania</span>
        </span>
      )}
    </span>
  );
}

import { Link } from "@tanstack/react-router";

interface LogoProps {
  /** Use "invert" on dark surfaces (footer, dark cards). */
  tone?: "dark" | "invert";
  className?: string;
}

/**
 * Monochrome wordmark. The original gold-on-black raster logo cannot sit on a
 * white surface, so the brand is set as type — the same approach Uber uses.
 */
export default function Logo({ tone = "dark", className = "" }: LogoProps) {
  const color = tone === "invert" ? "text-white" : "text-foreground";

  return (
    <Link
      to="/"
      aria-label="Agadir Driver — accueil"
      className={`inline-flex items-baseline gap-[1px] text-[19px] sm:text-[21px] font-extrabold tracking-[-0.04em] leading-none ${color} ${className}`}
    >
      <span>Agadir</span>
      <span className={tone === "invert" ? "text-white/60" : "text-muted-foreground"}>
        Driver
      </span>
    </Link>
  );
}

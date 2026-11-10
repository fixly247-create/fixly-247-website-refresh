import { Link } from "@tanstack/react-router";
import logoAsset from "@/assets/fixly247-logo.png.asset.json";
import { cn } from "@/lib/utils";

/**
 * The official Fixly 247 logo (original artwork, background removed to transparency).
 * Never replace with a recreated or generated version.
 * `onDark` places it on a soft light plate so the navy wordmark stays legible.
 */
export function Logo({
  className,
  onDark = false,
  size = "md",
}: {
  className?: string;
  onDark?: boolean;
  size?: "sm" | "md" | "lg";
}) {
  const h = size === "sm" ? "h-9" : size === "lg" ? "h-14" : "h-11 md:h-12";
  const img = (
    <img
      src={logoAsset.url}
      alt="Fixly 247 Customer Support"
      width={826}
      height={316}
      className={cn("block w-auto", h)}
      decoding="async"
    />
  );
  return (
    <Link to="/" aria-label="Fixly 247 home" className={cn("inline-flex shrink-0", className)}>
      {onDark ? <span className="logo-plate">{img}</span> : img}
    </Link>
  );
}

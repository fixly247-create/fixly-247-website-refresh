import { Link } from "@tanstack/react-router";
import logoAsset from "@/assets/fixly247-logo.png.asset.json";
import logoLightTextAsset from "@/assets/fixly247-logo-light-text.png.asset.json";
import { cn } from "@/lib/utils";

/**
 * The official Fixly 247 logo — the user's original artwork with its white background
 * removed to true transparency. Never replace with a recreated or generated version.
 *
 * Two transparent files of the same artwork:
 * - original (navy lettering) for light backgrounds
 * - light-lettering version for navy backgrounds: identical pixels, only the wordmark ink
 *   switched to white so it stays legible. The teal icon is untouched.
 * Both are stacked and cross-faded so the header can switch smoothly while scrolling.
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
  const h = size === "sm" ? "h-9" : size === "lg" ? "h-14" : "h-10 md:h-12";
  const img = "block w-auto transition-opacity duration-500";
  return (
    <Link
      to="/"
      aria-label="Fixly 247 home"
      className={cn("relative inline-flex shrink-0", className)}
    >
      <img
        src={logoAsset.url}
        alt="Fixly 247 Customer Support"
        width={826}
        height={316}
        className={cn(img, h, onDark ? "opacity-0" : "opacity-100")}
        decoding="async"
      />
      <img
        src={logoLightTextAsset.url}
        alt=""
        aria-hidden="true"
        width={826}
        height={316}
        className={cn(img, h, "absolute inset-0", onDark ? "opacity-100" : "opacity-0")}
        decoding="async"
      />
    </Link>
  );
}

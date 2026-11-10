import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import type { NavPath } from "@/lib/site";

export type FxVariant = "navy" | "teal" | "light" | "outline" | "ghost-dark";

function classesFor(variant: FxVariant, size: "md" | "sm", block?: boolean) {
  return cn(
    "btn-fx",
    variant !== "navy" && `btn-fx--${variant}`,
    size === "sm" && "btn-fx--sm",
    block && "btn-fx--block",
  );
}

function Inner({ children, icon }: { children: ReactNode; icon?: ReactNode }) {
  return (
    <>
      <span className="btn-fx__label">{children}</span>
      <span className="btn-fx__icon">{icon ?? <ArrowRight />}</span>
    </>
  );
}

/** Internal link styled with the Fixly 247 expanding-chip interaction. */
export function FxLink({
  to,
  children,
  variant = "navy",
  size = "md",
  icon,
  className,
  block,
}: {
  to: NavPath;
  children: ReactNode;
  variant?: FxVariant;
  size?: "md" | "sm";
  icon?: ReactNode;
  className?: string;
  block?: boolean;
}) {
  return (
    <Link to={to} className={cn(classesFor(variant, size, block), className)}>
      <Inner icon={icon}>{children}</Inner>
    </Link>
  );
}

export function FxButton({
  children,
  variant = "navy",
  size = "md",
  icon,
  className,
  block,
  type = "button",
}: {
  children: ReactNode;
  variant?: FxVariant;
  size?: "md" | "sm";
  icon?: ReactNode;
  className?: string;
  block?: boolean;
  type?: "button" | "submit";
}) {
  return (
    <button type={type} className={cn(classesFor(variant, size, block), className)}>
      <Inner icon={icon}>{children}</Inner>
    </button>
  );
}

/** Circular button that expands to reveal its text (reference interaction). */
export function OrbLink({ to, children }: { to: NavPath; children: ReactNode }) {
  return (
    <Link to={to} className="btn-orb" aria-label={typeof children === "string" ? children : undefined}>
      <span className="btn-orb__icon">
        <ArrowRight />
      </span>
      <span className="btn-orb__text">{children}</span>
    </Link>
  );
}

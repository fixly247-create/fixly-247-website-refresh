import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Reveal } from "./Reveal";

export function SectionHeading({
  eyebrow,
  title,
  children,
  center,
  className,
}: {
  eyebrow: string;
  title: ReactNode;
  children?: ReactNode;
  center?: boolean;
  className?: string;
}) {
  return (
    <Reveal className={cn("max-w-2xl", center && "mx-auto text-center", className)}>
      <p className={cn("eyebrow", center && "justify-center")}>{eyebrow}</p>
      <h2 className="mt-4 text-3xl font-extrabold leading-tight md:text-5xl">{title}</h2>
      {children && <div className="mt-5 text-lg leading-relaxed text-muted-foreground">{children}</div>}
    </Reveal>
  );
}

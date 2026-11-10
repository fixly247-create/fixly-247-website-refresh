import { motion } from "framer-motion";
import type { ReactNode } from "react";

/** Shared dark intro band for inner pages. */
export function PageHero({
  eyebrow,
  title,
  children,
}: {
  eyebrow: string;
  title: ReactNode;
  children?: ReactNode;
}) {
  return (
    <section className="bg-hero on-dark">
      <div className="orb orb--teal -right-20 top-0 size-96" />
      <div className="orb orb--glow -left-32 bottom-0 size-72" />
      <div className="ring-deco -right-40 -top-40 size-[34rem]" />
      <div className="container-site py-20 md:py-28">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-3xl"
        >
          <p className="eyebrow">{eyebrow}</p>
          <h1 className="mt-5 text-4xl font-extrabold leading-[1.05] md:text-6xl">{title}</h1>
          {children && (
            <div className="mt-6 max-w-2xl text-lg leading-relaxed text-on-dark-muted">{children}</div>
          )}
        </motion.div>
      </div>
    </section>
  );
}

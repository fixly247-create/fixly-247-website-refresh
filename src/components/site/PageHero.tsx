import { motion } from "framer-motion";
import type { ReactNode } from "react";

/** Shared navy intro band for inner pages. Sits behind the transparent header. */
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
    <section className="bg-hero on-dark hero-offset" data-header-tone="dark">
      <div className="container-site pb-16 pt-14 md:pb-24 md:pt-20">
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-3xl"
        >
          <p className="eyebrow">{eyebrow}</p>
          <h1 className="mt-5 text-4xl font-extrabold leading-[1.06] md:text-[3.5rem]">{title}</h1>
          {children && (
            <div className="mt-6 max-w-2xl text-lg leading-relaxed text-on-dark-muted">{children}</div>
          )}
        </motion.div>
      </div>
    </section>
  );
}

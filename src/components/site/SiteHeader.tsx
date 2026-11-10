import { Link, useRouterState } from "@tanstack/react-router";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { NAV_ITEMS } from "@/lib/site";
import { FxLink } from "./FxButton";
import { Logo } from "./Logo";
import { SocialLinks } from "./SocialLinks";

/**
 * "top"   – resting on the page's opening navy band: transparent, blends into it
 * "dark"  – over a navy section further down: solid navy
 * "light" – over a white / light section: clean white
 */
type Tone = "top" | "dark" | "light";

/** Probe line just inside the header, where the section behind it is read. */
const PROBE_Y = 40;

function readTone(): Tone {
  const dark = document.querySelectorAll<HTMLElement>("[data-header-tone='dark']");
  let overDark = false;
  for (const el of dark) {
    const r = el.getBoundingClientRect();
    if (r.top <= PROBE_Y && r.bottom > PROBE_Y) {
      overDark = true;
      break;
    }
  }
  if (!overDark) return "light";
  return window.scrollY < 12 ? "top" : "dark";
}

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [tone, setTone] = useState<Tone>("top");
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    let frame = 0;
    const update = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => setTone(readTone()));
    };
    update();
    // Re-read once the new page has painted after navigation.
    const t1 = window.setTimeout(update, 60);
    const t2 = window.setTimeout(update, 400);
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      cancelAnimationFrame(frame);
      window.clearTimeout(t1);
      window.clearTimeout(t2);
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const shownTone: Tone = open ? "light" : tone;
  const onDark = shownTone !== "light";

  return (
    <header className="site-header" data-tone={shownTone}>
      <div className="container-site flex h-20 items-center justify-between gap-6">
        <Logo onDark={onDark} />

        <nav aria-label="Main" className="hidden items-center gap-7 lg:flex">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className="nav-link"
              activeOptions={{ exact: item.to === "/" }}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <FxLink to="/contact" variant="teal" size="sm" className="hidden sm:inline-flex">
            Get a Free Trial
          </FxLink>
          <button
            type="button"
            className="menu-toggle lg:hidden"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            key="mobile-menu"
            className="absolute inset-x-0 top-full h-[calc(100dvh-5rem)] overflow-y-auto border-t border-border bg-background lg:hidden"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          >
            <nav aria-label="Mobile" className="container-site flex flex-col gap-1 py-6">
              {NAV_ITEMS.map((item) => (
                <Link
                  key={item.to}
                  to={item.to}
                  className="mobile-link"
                  activeOptions={{ exact: item.to === "/" }}
                  onClick={() => setOpen(false)}
                >
                  {item.label}
                  <ArrowRight className="size-4 text-primary" />
                </Link>
              ))}
              <div className="mt-6 flex flex-col gap-6">
                <FxLink to="/contact" variant="teal" block>
                  Get a Free Trial
                </FxLink>
                <SocialLinks />
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

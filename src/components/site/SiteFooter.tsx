import { Link } from "@tanstack/react-router";
import { Mail, Phone } from "lucide-react";
import { CONTACT, NAV_ITEMS, SOCIAL_LINKS } from "@/lib/site";
import { WhatsAppIcon } from "./BrandIcons";
import { Logo } from "./Logo";
import { SocialLinks } from "./SocialLinks";

export function SiteFooter() {
  return (
    <footer className="bg-navy on-dark">
      <div className="orb orb--teal -right-24 -top-24 size-80" />
      <div className="container-site grid gap-12 py-16 md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1.2fr] lg:py-20">
        <div className="max-w-sm">
          <Logo onDark size="md" />
          <p className="mt-6 text-sm leading-relaxed text-on-dark-muted">
            Fixly 247 is a professional customer support and business outsourcing service
            provider, helping businesses worldwide deliver excellent customer experiences.
          </p>
          <SocialLinks className="mt-6" />
        </div>

        <nav aria-label="Footer">
          <h2 className="text-sm font-bold uppercase tracking-[0.18em] text-teal-glow">Explore</h2>
          <ul className="mt-5 grid gap-3">
            {NAV_ITEMS.map((item) => (
              <li key={item.to}>
                <Link
                  to={item.to}
                  className="text-sm font-semibold text-on-dark-muted transition-colors hover:text-on-dark"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h2 className="text-sm font-bold uppercase tracking-[0.18em] text-teal-glow">Contact</h2>
          <ul className="mt-5 grid gap-4 text-sm">
            <li>
              <a href={CONTACT.phoneHref} className="flex items-center gap-3 text-on-dark-muted transition-colors hover:text-on-dark">
                <Phone className="size-4 text-teal-glow" /> {CONTACT.phoneDisplay}
              </a>
            </li>
            <li>
              <a
                href={SOCIAL_LINKS.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-on-dark-muted transition-colors hover:text-on-dark"
              >
                <WhatsAppIcon className="size-4 text-whatsapp" /> WhatsApp {CONTACT.whatsappDisplay}
              </a>
            </li>
            <li>
              <a href={CONTACT.emailHref} className="flex items-center gap-3 text-on-dark-muted transition-colors hover:text-on-dark">
                <Mail className="size-4 text-teal-glow" /> {CONTACT.email}
              </a>
            </li>
          </ul>
          <p className="mt-6 text-xs text-on-dark-muted">Pricing is by custom quotation based on your support needs.</p>
        </div>
      </div>
      <div className="border-t border-on-dark/10">
        <div className="container-site flex flex-col gap-2 py-6 text-xs text-on-dark-muted sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} Fixly 247. All rights reserved.</p>
          <p>Customer support &amp; business outsourcing.</p>
        </div>
      </div>
    </footer>
  );
}

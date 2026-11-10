import { cn } from "@/lib/utils";
import { SOCIAL_LINKS } from "@/lib/site";
import { FacebookIcon, InstagramIcon, WhatsAppIcon } from "./BrandIcons";

const ITEMS = [
  { key: "whatsapp", label: "Chat with Fixly 247 on WhatsApp", href: SOCIAL_LINKS.whatsapp, Icon: WhatsAppIcon },
  { key: "facebook", label: "Fixly 247 on Facebook", href: SOCIAL_LINKS.facebook, Icon: FacebookIcon },
  { key: "instagram", label: "Fixly 247 on Instagram", href: SOCIAL_LINKS.instagram, Icon: InstagramIcon },
] as const;

/** The single set of social buttons used everywhere on the site. */
export function SocialLinks({ className }: { className?: string }) {
  return (
    <ul className={cn("flex items-center gap-3", className)} aria-label="Fixly 247 social media">
      {ITEMS.map(({ key, label, href, Icon }) => (
        <li key={key}>
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={label}
            title={label}
            className={cn("social-btn", `social-btn--${key}`)}
          >
            <Icon />
          </a>
        </li>
      ))}
    </ul>
  );
}

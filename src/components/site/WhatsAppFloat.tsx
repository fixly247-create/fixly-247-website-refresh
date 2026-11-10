import { SOCIAL_LINKS } from "@/lib/site";
import { WhatsAppIcon } from "./BrandIcons";

export function WhatsAppFloat() {
  return (
    <a
      href={SOCIAL_LINKS.whatsapp}
      target="_blank"
      rel="noopener noreferrer"
      className="wa-float"
      aria-label="Chat with us on WhatsApp"
    >
      <WhatsAppIcon />
      <span className="wa-float__tip" role="tooltip">
        Chat with us
      </span>
    </a>
  );
}

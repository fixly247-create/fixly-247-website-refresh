export const ENQUIRY_RECIPIENT = "info@fixly247.site";
export const ENQUIRY_SUBJECT = "New Business Enquiry — Fixly 247";

export type Enquiry = {
  fullName: string;
  email: string;
  phone: string;
  company: string;
  services: string[];
  message: string;
};

export type EnquiryErrors = Partial<Record<keyof Enquiry, string | undefined>>;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

/** Required: full name, business email, at least one service, message. */
export function validateEnquiry(e: Enquiry): EnquiryErrors {
  const errors: EnquiryErrors = {};
  if (!e.fullName.trim()) errors.fullName = "Please enter your full name.";
  if (!e.email.trim()) errors.email = "Please enter your business email.";
  else if (!EMAIL_RE.test(e.email.trim())) errors.email = "Please enter a valid email address.";
  if (e.phone.trim() && !/^[+\d][\d\s()-]{5,}$/.test(e.phone.trim()))
    errors.phone = "Please enter a valid phone number.";
  if (e.services.length === 0) errors.services = "Please choose at least one service.";
  if (!e.message.trim()) errors.message = "Please tell us a little about what you need.";
  return errors;
}

export function buildEnquiryBody(e: Enquiry): string {
  const v = (s: string) => (s.trim() ? s.trim() : "Not provided");
  return [
    "New business enquiry from the Fixly 247 website",
    "",
    `Full Name: ${v(e.fullName)}`,
    `Email: ${v(e.email)}`,
    `Phone Number: ${v(e.phone)}`,
    `Company Name: ${v(e.company)}`,
    `Services Required: ${e.services.length ? e.services.join(", ") : "Not provided"}`,
    "",
    "Message:",
    v(e.message),
  ].join("\n");
}

export function buildEnquiryMailto(e: Enquiry): string {
  return `mailto:${ENQUIRY_RECIPIENT}?subject=${encodeURIComponent(
    ENQUIRY_SUBJECT,
  )}&body=${encodeURIComponent(buildEnquiryBody(e))}`;
}

export const FORMSPREE_ENDPOINT = "https://formspree.io/f/meaggjqw";

/** Fields posted to Formspree; `_replyto` lets replies go to the customer. */
export function buildFormspreePayload(e: Enquiry): Record<string, string> {
  return {
    name: e.fullName.trim(),
    email: e.email.trim(),
    _replyto: e.email.trim(),
    phone: e.phone.trim(),
    company: e.company.trim(),
    services: e.services.join(", "),
    message: e.message.trim(),
    _subject: ENQUIRY_SUBJECT,
  };
}

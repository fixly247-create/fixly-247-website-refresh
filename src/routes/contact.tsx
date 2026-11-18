import { createFileRoute } from "@tanstack/react-router";
import { Mail, Phone, Send } from "lucide-react";
import { useState, type FormEvent, type ReactNode } from "react";
import { WhatsAppIcon } from "@/components/site/BrandIcons";
import { FxButton } from "@/components/site/FxButton";
import { PageHero } from "@/components/site/PageHero";
import { Reveal } from "@/components/site/Reveal";
import { SocialLinks } from "@/components/site/SocialLinks";
import {
  buildFormspreePayload,
  FORMSPREE_ENDPOINT,
  validateEnquiry,
  type Enquiry,
  type EnquiryErrors,
} from "@/lib/enquiry";
import { CONTACT, SERVICES, SOCIAL_LINKS } from "@/lib/site";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact Us — Start Your Free Trial | Fixly 247" },
      {
        name: "description",
        content:
          "Contact Fixly 247 by phone, WhatsApp or email at info@fixly247.site, or send a business enquiry to discuss your support needs.",
      },
      { property: "og:title", content: "Contact Fixly 247" },
      {
        property: "og:description",
        content: "Send a business enquiry or reach Fixly 247 by phone, WhatsApp or email.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ContactPage,
});

const EMPTY: Enquiry = { fullName: "", email: "", phone: "", company: "", services: [], message: "" };
const SERVICE_OPTIONS = [...SERVICES.map((s) => s.title).filter((t) => t !== "Call Handling"), "Not sure yet"];

function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contact Us"
        title={
          <>
            Tell us about <span className="display-accent">your support needs</span>
          </>
        }
      >
        <p>
          Share a little about your business and the services you need. Pricing is based on a custom
          quotation, and we're happy to discuss our free trial.
        </p>
      </PageHero>

      <section className="section">
        <div className="container-site grid gap-10 lg:grid-cols-[1fr_1.5fr]">
          <Reveal>
            <aside className="bg-navy on-dark rounded-[2rem] p-7 md:p-9">
              <h2 className="text-2xl font-extrabold">Reach us directly</h2>
              <p className="mt-2 text-on-dark-muted">Call, message or email — whichever suits you.</p>
              <div className="mt-8 grid gap-3">
                <a href={CONTACT.phoneHref} className="contact-row">
                  <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-teal/25 text-teal-glow">
                    <Phone className="size-5" />
                  </span>
                  <span>
                    <span className="block text-xs font-bold uppercase tracking-widest text-on-dark-muted">Phone</span>
                    <span className="block font-bold">{CONTACT.phoneDisplay}</span>
                  </span>
                </a>
                <a href={SOCIAL_LINKS.whatsapp} target="_blank" rel="noopener noreferrer" className="contact-row">
                  <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-whatsapp text-primary-foreground">
                    <WhatsAppIcon className="size-5" />
                  </span>
                  <span>
                    <span className="block text-xs font-bold uppercase tracking-widest text-on-dark-muted">WhatsApp</span>
                    <span className="block font-bold">{CONTACT.whatsappDisplay}</span>
                  </span>
                </a>
                <a href={CONTACT.emailHref} className="contact-row">
                  <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-teal/25 text-teal-glow">
                    <Mail className="size-5" />
                  </span>
                  <span className="min-w-0">
                    <span className="block text-xs font-bold uppercase tracking-widest text-on-dark-muted">Email</span>
                    <span className="block break-all font-bold">{CONTACT.email}</span>
                  </span>
                </a>
              </div>
              <div className="mt-8 border-t border-on-dark/10 pt-6">
                <p className="text-sm font-bold">Follow &amp; message us</p>
                <SocialLinks className="mt-4" />
              </div>
            </aside>
          </Reveal>

          <Reveal delay={0.1}>
            <EnquiryForm />
          </Reveal>
        </div>
      </section>
    </>
  );
}

function EnquiryForm() {
  const [values, setValues] = useState<Enquiry>(EMPTY);
  const [errors, setErrors] = useState<EnquiryErrors>({});
  const [status, setStatus] = useState<"idle" | "invalid" | "sending" | "sent" | "error">("idle");

  const set = (key: keyof Enquiry) => (e: { target: { value: string } }) => {
    setValues((v) => ({ ...v, [key]: e.target.value }));
    if (errors[key]) setErrors((er) => ({ ...er, [key]: undefined }));
  };

  const toggleService = (name: string) => {
    setValues((v) => ({
      ...v,
      services: v.services.includes(name) ? v.services.filter((s) => s !== name) : [...v.services, name],
    }));
    if (errors.services) setErrors((er) => ({ ...er, services: undefined }));
  };

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (status === "sending") return;
    const errs = validateEnquiry(values);
    setErrors(errs);
    if (Object.keys(errs).length > 0) {
      setStatus("invalid");
      const first = Object.keys(errs)[0];
      document.getElementById(`f-${first}`)?.focus();
      return;
    }
    setStatus("sending");
    try {
      const res = await fetch(FORMSPREE_ENDPOINT, {
        method: "POST",
        headers: { Accept: "application/json", "Content-Type": "application/json" },
        body: JSON.stringify(buildFormspreePayload(values)),
      });
      if (!res.ok) throw new Error(String(res.status));
      setValues(EMPTY);
      setStatus("sent");
    } catch {
      setStatus("error");
    }
  };

  return (
    <form noValidate onSubmit={onSubmit} action={FORMSPREE_ENDPOINT} method="POST" className="card-fx p-7 md:p-10">
      <h2 className="text-2xl font-extrabold md:text-3xl">Send a business enquiry</h2>

      <div className="mt-8 grid gap-5 sm:grid-cols-2">
        <Field id="fullName" label="Full Name" required error={errors.fullName}>
          <input id="f-fullName" name="name" className="field" autoComplete="name" value={values.fullName} onChange={set("fullName")} aria-invalid={!!errors.fullName} placeholder="Your full name" />
        </Field>
        <Field id="email" label="Email" required error={errors.email}>
          <input id="f-email" name="email" type="email" className="field" autoComplete="email" value={values.email} onChange={set("email")} aria-invalid={!!errors.email} placeholder="you@company.com" />
        </Field>
        <Field id="phone" label="Phone Number" error={errors.phone}>
          <input id="f-phone" name="phone" type="tel" className="field" autoComplete="tel" value={values.phone} onChange={set("phone")} aria-invalid={!!errors.phone} placeholder="+1 555 000 0000" />
        </Field>
        <Field id="company" label="Company Name">
          <input id="f-company" name="company" className="field" autoComplete="organization" value={values.company} onChange={set("company")} placeholder="Your company" />
        </Field>
      </div>

      <fieldset className="mt-6" aria-invalid={!!errors.services}>
        <legend className="field-label">
          Services Required <span className="text-destructive">*</span>
        </legend>
        <div className="mt-1 flex flex-wrap gap-2" id="f-services" tabIndex={-1}>
          {SERVICE_OPTIONS.map((name) => (
            <label key={name} className="choice-chip">
              <input
                type="checkbox"
                className="sr-only"
                name="services"
                value={name}
                checked={values.services.includes(name)}
                onChange={() => toggleService(name)}
              />
              {name}
            </label>
          ))}
        </div>
        {errors.services && <p className="field-error">{errors.services}</p>}
      </fieldset>

      <div className="mt-6">
        <Field id="message" label="Message" required error={errors.message}>
          <textarea id="f-message" name="message" rows={5} className="field resize-y" value={values.message} onChange={set("message")} aria-invalid={!!errors.message} placeholder="Tell us about your business and where you need support." />
        </Field>
      </div>

      <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <FxButton type="submit" variant="teal" icon={<Send />} disabled={status === "sending"}>
          {status === "sending" ? "Sending…" : "Send Enquiry"}
        </FxButton>
        <p className="text-xs text-muted-foreground">
          <span className="text-destructive">*</span> Required fields
        </p>
      </div>

      <div aria-live="polite" className="mt-5">
        {status === "invalid" && (
          <p className="rounded-xl border border-destructive/30 bg-destructive/5 p-4 text-sm font-semibold text-destructive">
            Please fill in the required fields highlighted above.
          </p>
        )}
        {status === "sent" && (
          <p className="rounded-xl border border-primary/30 bg-accent p-4 text-sm text-accent-foreground">
            Thank you! Your inquiry has been received. Our team will contact you shortly.
          </p>
        )}
        {status === "error" && (
          <p className="rounded-xl border border-destructive/30 bg-destructive/5 p-4 text-sm font-semibold text-destructive">
            Sorry, your enquiry couldn't be sent. Please try again, or email us at{" "}
            <a className="underline" href={CONTACT.emailHref}>{CONTACT.email}</a>.
          </p>
        )}
      </div>
    </form>
  );
}

function Field({
  id,
  label,
  required,
  error,
  children,
}: {
  id: string;
  label: string;
  required?: boolean | undefined;
  error?: string | undefined;
  children: ReactNode;
}) {
  return (
    <div>
      <label htmlFor={`f-${id}`} className="field-label">
        {label} {required && <span className="text-destructive">*</span>}
      </label>
      {children}
      {error && <p className="field-error">{error}</p>}
    </div>
  );
}

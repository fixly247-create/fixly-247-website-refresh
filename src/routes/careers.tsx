import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Check, CheckCircle2, Mic, Send } from "lucide-react";
import { useRef, useState, type FormEvent, type ReactNode } from "react";
import { FxButton } from "@/components/site/FxButton";
import { PageHero } from "@/components/site/PageHero";
import { Reveal } from "@/components/site/Reveal";
import { supabase } from "@/integrations/supabase/client";
import {
  AVAILABILITY, ENGLISH_LEVELS, POSITIONS, RESUME_BUCKET, resumeError, resumePath, validateApplication,
  type Application, type ApplicationErrors,
} from "@/lib/careers";

export const Route = createFileRoute("/careers")({
  head: () => ({
    meta: [
      { title: "Careers — Remote Support Jobs | Fixly 247" },
      { name: "description", content: "Join Fixly 247 remotely as a Phone Support Representative, Email Support Representative or Cold Caller. Apply online." },
      { property: "og:title", content: "Careers at Fixly 247" },
      { property: "og:description", content: "Remote customer support and cold calling opportunities at Fixly 247." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: CareersPage,
});

const EMPTY: Application = {
  full_name: "", email: "", phone: "", location: "", position: "", experience: "", skills: "",
  english_speaking_level: "", availability: "", linkedin: "", portfolio: "", expected_salary: "",
  voice_note_url: "", privacy_consent: false,
};

function CareersPage() {
  const [position, setPosition] = useState("");
  const apply = (title: string) => {
    setPosition(title);
    document.getElementById("apply")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };
  return (
    <>
      <PageHero eyebrow="Careers" title={<>Build your career <span className="display-accent">with Fixly 247</span></>}>
        <p>Explore remote customer support and calling roles, and apply online in a few minutes.</p>
      </PageHero>

      <section className="section">
        <div className="container-site grid gap-10 md:grid-cols-2">
          <Reveal>
            <h2 className="text-2xl font-extrabold md:text-3xl">About Us</h2>
            <p className="mt-4 text-muted-foreground">Fixly247 provides remote customer support and communication solutions to businesses. We help companies manage customer interactions, respond to inquiries, and handle daily support operations through reliable and professional remote teams.</p>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="text-2xl font-extrabold md:text-3xl">About the Opportunities</h2>
            <p className="mt-4 text-muted-foreground">We offer remote work opportunities for individuals with good communication skills, a professional attitude, and a willingness to learn. Join our team and help businesses deliver better customer experiences.</p>
          </Reveal>
          <Reveal delay={0.15} className="md:col-span-2">
            <p className="rounded-2xl border border-border bg-accent p-5 text-accent-foreground"><strong>Competitive Salary Packages</strong> – We offer competitive compensation based on experience, skills, and role responsibilities.</p>
          </Reveal>
        </div>
      </section>

      <section className="section pt-0">
        <div className="container-site">
          <h2 className="text-2xl font-extrabold md:text-3xl">Available Positions</h2>
          <p className="mt-2 text-muted-foreground">All three positions are remote opportunities.</p>
          <div className="mt-8 grid gap-6 lg:grid-cols-3">
            {POSITIONS.map((p, i) => (
              <Reveal key={p.title} delay={i * 0.08}>
                <article className="card-fx flex h-full flex-col p-7">
                  <span className="w-fit rounded-full bg-accent px-3 py-1 text-xs font-bold uppercase tracking-widest text-accent-foreground">Remote</span>
                  <h3 className="mt-4 text-xl font-extrabold">{p.title}</h3>
                  <p className="mt-3 text-sm text-muted-foreground">{p.about}</p>
                  <List title="Key Responsibilities" items={p.responsibilities} />
                  <List title="Requirements" items={p.requirements} />
                  <div className="mt-auto pt-7">
                    <FxButton type="button" variant="teal" onClick={() => apply(p.title)}>Apply Now</FxButton>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section id="apply" className="section scroll-mt-24 pt-0">
        <div className="container-site max-w-4xl">
          <ApplicationForm position={position} />
        </div>
      </section>
    </>
  );
}

function List({ title, items }: { title: string; items: readonly string[] }) {
  return (
    <div className="mt-5">
      <h4 className="text-sm font-bold">{title}</h4>
      <ul className="mt-2 grid gap-2 text-sm text-muted-foreground">
        {items.map((t) => (
          <li key={t} className="flex gap-2"><Check className="mt-0.5 size-4 shrink-0 text-primary" />{t}</li>
        ))}
      </ul>
    </div>
  );
}

function ApplicationForm({ position }: { position: string }) {
  const [values, setValues] = useState<Application>(EMPTY);
  const [file, setFile] = useState<File | null>(null);
  const [errors, setErrors] = useState<ApplicationErrors>({});
  const [status, setStatus] = useState<"idle" | "invalid" | "sending" | "sent" | "error">("idle");
  const busy = useRef(false);
  const [lastPos, setLastPos] = useState(position);
  if (position !== lastPos) {
    setLastPos(position);
    setValues((v) => ({ ...v, position }));
    setErrors((e) => ({ ...e, position: undefined }));
  }

  const set = (k: keyof Application) => (e: { target: { value: string } }) => {
    setValues((v) => ({ ...v, [k]: e.target.value }));
    if (errors[k]) setErrors((er) => ({ ...er, [k]: undefined }));
  };

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (busy.current) return;
    const errs = validateApplication(values, file);
    setErrors(errs);
    if (Object.keys(errs).length) {
      setStatus("invalid");
      document.getElementById(`a-${Object.keys(errs)[0]}`)?.focus();
      return;
    }
    busy.current = true;
    setStatus("sending");
    try {
      const path = resumePath(file!.name, Date.now(), Math.random().toString(36).slice(2, 10));
      const up = await supabase.storage.from(RESUME_BUCKET).upload(path, file!, { contentType: file!.type || undefined, upsert: false });
      if (up.error) throw up.error;
      const trim = (s: string) => s.trim();
      const { error } = await supabase.from("applications").insert({
        full_name: trim(values.full_name), email: trim(values.email), phone: trim(values.phone),
        location: trim(values.location), position: values.position, experience: trim(values.experience),
        skills: trim(values.skills), english_speaking_level: values.english_speaking_level,
        availability: trim(values.availability), linkedin: trim(values.linkedin),
        portfolio: trim(values.portfolio) || null, expected_salary: trim(values.expected_salary),
        voice_note_url: trim(values.voice_note_url), resume_path: path, privacy_consent: true,
      });
      if (error) throw error;
      setStatus("sent");
      document.getElementById("apply")?.scrollIntoView({ behavior: "smooth", block: "start" });
    } catch {
      setStatus("error");
    } finally {
      busy.current = false;
    }
  };

  if (status === "sent") {
    return (
      <motion.div initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.45 }} className="card-fx p-8 text-center md:p-14" role="status">
        <motion.span initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.15, type: "spring", stiffness: 260, damping: 16 }} className="mx-auto grid size-20 place-items-center rounded-full bg-whatsapp/15 text-whatsapp">
          <CheckCircle2 className="size-11" />
        </motion.span>
        <h2 className="mt-6 text-2xl font-extrabold md:text-3xl">Application Received Successfully!</h2>
        <p className="mx-auto mt-4 max-w-xl text-muted-foreground">Thank you for your interest in joining Fixly247. Your application has been successfully received. Our team will carefully review your application and get back to you regarding the next steps.</p>
      </motion.div>
    );
  }

  const input = (k: keyof Application, label: string, props: Record<string, unknown> = {}, required = true) => (
    <Field id={k} label={label} required={required} error={errors[k]}>
      <input id={`a-${k}`} className="field" value={values[k] as string} onChange={set(k)} aria-invalid={!!errors[k]} {...props} />
    </Field>
  );
  const select = (k: keyof Application, label: string, options: readonly string[]) => (
    <Field id={k} label={label} required error={errors[k]}>
      <select id={`a-${k}`} className="field" value={values[k] as string} onChange={set(k)} aria-invalid={!!errors[k]}>
        <option value="">Select…</option>
        {options.map((o) => <option key={o} value={o}>{o}</option>)}
      </select>
    </Field>
  );

  return (
    <form noValidate onSubmit={onSubmit} className="card-fx p-7 md:p-10">
      <h2 className="text-2xl font-extrabold md:text-3xl">Application Form</h2>
      <p className="mt-2 text-sm text-muted-foreground">Fill in your details below to apply.</p>

      <div className="mt-8 grid gap-5 sm:grid-cols-2">
        {input("full_name", "Full Name", { autoComplete: "name" })}
        {input("email", "Email Address", { type: "email", autoComplete: "email" })}
        {input("phone", "Phone / WhatsApp Number", { type: "tel", autoComplete: "tel" })}
        {input("location", "Current City and Country", { placeholder: "e.g. Lahore, Pakistan" })}
        {select("position", "Position Applying For", POSITIONS.map((p) => p.title))}
        {select("english_speaking_level", "English Speaking Level", ENGLISH_LEVELS)}
        {select("availability", "Availability / Joining Date", AVAILABILITY)}
        {input("expected_salary", "Expected Monthly Salary (PKR)", { inputMode: "numeric", placeholder: "e.g. 60,000" })}
        {input("linkedin", "LinkedIn Profile URL", { type: "url", placeholder: "https://linkedin.com/in/…" })}
        {input("portfolio", "Portfolio / Website URL", { type: "url", placeholder: "https://…" }, false)}
      </div>

      <div className="mt-5 grid gap-5">
        <Field id="experience" label="Relevant Work Experience" required error={errors.experience}>
          <textarea id="a-experience" rows={4} className="field resize-y" value={values.experience} onChange={set("experience")} aria-invalid={!!errors.experience} />
        </Field>
        <Field id="skills" label="Professional Skills" required error={errors.skills}>
          <textarea id="a-skills" rows={3} className="field resize-y" value={values.skills} onChange={set("skills")} aria-invalid={!!errors.skills} />
        </Field>
        <Field id="resume" label="Resume / CV (PDF, DOC or DOCX, max 10 MB)" required error={errors.resume}>
          <input id="a-resume" type="file" accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document" className="field file:mr-3 file:rounded-md file:border-0 file:bg-accent file:px-3 file:py-1 file:font-semibold file:text-accent-foreground" aria-invalid={!!errors.resume}
            onChange={(e) => { const f = e.target.files?.[0] ?? null; setFile(f); setErrors((er) => ({ ...er, resume: f ? resumeError(f) : undefined })); }} />
        </Field>

        <div className="rounded-2xl border border-border bg-muted/40 p-5 md:p-6">
          <p className="flex items-center gap-2 font-bold"><Mic className="size-5 text-primary" /> Voice introduction</p>
          <p className="mt-2 text-sm text-muted-foreground">
            Record a voice introduction of at least 2 minutes on{" "}
            <a href="https://vocaroo.com/" target="_blank" rel="noopener noreferrer" className="font-semibold text-primary underline">vocaroo.com</a>, then paste the shareable link below. Please cover:
          </p>
          <ol className="mt-3 list-decimal space-y-1 pl-5 text-sm text-muted-foreground">
            <li>Introduce yourself.</li>
            <li>Explain your previous work experience.</li>
            <li>Describe your communication skills.</li>
            <li>Explain why you are suitable for the selected position.</li>
            <li>Describe how you would handle a difficult customer or prospect.</li>
          </ol>
          <div className="mt-4">
            {input("voice_note_url", "Vocaroo Voice Recording Link", { type: "url", placeholder: "https://voca.ro/…" })}
          </div>
        </div>

        <div>
          <label className="flex items-start gap-3 text-sm">
            <input id="a-privacy_consent" type="checkbox" className="mt-1 size-4 accent-[var(--primary)]" checked={values.privacy_consent}
              onChange={(e) => { setValues((v) => ({ ...v, privacy_consent: e.target.checked })); setErrors((er) => ({ ...er, privacy_consent: undefined })); }} />
            <span>I agree that Fixly 247 may store and use the information and documents I submit to review my application. <span className="text-destructive">*</span></span>
          </label>
          {errors.privacy_consent && <p className="field-error">{errors.privacy_consent}</p>}
        </div>
      </div>

      <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <FxButton type="submit" variant="teal" icon={<Send />} disabled={status === "sending"}>
          {status === "sending" ? "Submitting…" : "Submit Application"}
        </FxButton>
        <p className="text-xs text-muted-foreground"><span className="text-destructive">*</span> Required fields</p>
      </div>

      <div aria-live="polite" className="mt-5">
        {status === "invalid" && <p className="rounded-xl border border-destructive/30 bg-destructive/5 p-4 text-sm font-semibold text-destructive">Please correct the highlighted fields above.</p>}
        {status === "error" && <p className="rounded-xl border border-destructive/30 bg-destructive/5 p-4 text-sm font-semibold text-destructive">Sorry, your application couldn't be submitted. Please check your connection and try again — your details are still filled in.</p>}
      </div>
    </form>
  );
}

function Field({ id, label, required, error, children }: { id: string; label: string; required?: boolean; error?: string | undefined; children: ReactNode }) {
  return (
    <div>
      <label htmlFor={`a-${id}`} className="field-label">{label} {required && <span className="text-destructive">*</span>}</label>
      {children}
      {error && <p className="field-error">{error}</p>}
    </div>
  );
}

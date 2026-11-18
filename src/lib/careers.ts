export const REQUIREMENTS = [
  "Minimum 1 year of relevant experience in sales.",
  "High school diploma or equivalent qualification.",
  "Good, confident, and fluent English-speaking skills.",
  "Strong verbal communication and professional customer interaction skills.",
  "Experience with Customer Relationship Management (CRM) software for streamlined customer interactions.",
  "Strong problem-solving skills with the ability to think on your feet.",
];

export const POSITIONS = [
  {
    title: "Phone Support Representative",
    about: "Handle customer calls, answer inquiries, resolve concerns, and provide helpful support through professional phone communication.",
    responsibilities: ["Handle inbound and outbound customer calls.", "Respond to customer questions and concerns.", "Provide appropriate solutions and follow up when needed.", "Maintain clear records of customer interactions."],
    requirements: REQUIREMENTS,
  },
  {
    title: "Email Support Representative",
    about: "Manage customer inquiries through email and provide clear, helpful, and professional responses while ensuring customer issues are handled properly.",
    responsibilities: ["Respond to customer emails professionally.", "Handle inquiries, complaints, and support requests.", "Follow up on unresolved issues.", "Maintain accurate records of customer communication."],
    requirements: REQUIREMENTS,
  },
  {
    title: "Cold Caller",
    about: "Contact potential customers, introduce business services, generate interest, and identify opportunities for further discussions or appointments.",
    responsibilities: ["Make outbound calls to potential customers.", "Introduce services and explain their benefits.", "Follow calling scripts and handle objections.", "Identify interested prospects and arrange follow ups."],
    requirements: REQUIREMENTS,
  },
] as const;

export const POSITION_TITLES = POSITIONS.map((p) => p.title) as string[];
export const ENGLISH_LEVELS = ["Basic", "Intermediate", "Advanced", "Fluent", "Native"];
export const AVAILABILITY = ["Immediately", "Within 1 week", "Within 2 weeks", "Within 1 month"];
export const RESUME_BUCKET = "Resumes";
export const MAX_RESUME_BYTES = 10 * 1024 * 1024;
export const RESUME_EXTENSIONS = ["pdf", "doc", "docx"];

export type Application = {
  full_name: string; email: string; phone: string; location: string; position: string;
  experience: string; skills: string; english_speaking_level: string; availability: string;
  linkedin: string; portfolio: string; expected_salary: string; voice_note_url: string; privacy_consent: boolean;
};
export type ApplicationErrors = Partial<Record<keyof Application | "resume", string>>;

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
export function isUrl(v: string) {
  try { const u = new URL(v); return u.protocol === "https:" || u.protocol === "http:"; } catch { return false; }
}
export function isVocarooUrl(v: string) {
  if (!isUrl(v)) return false;
  const h = new URL(v).hostname.toLowerCase();
  return h === "vocaroo.com" || h.endsWith(".vocaroo.com") || h === "voca.ro";
}
export function resumeError(file: { name: string; size: number } | null): string | undefined {
  if (!file) return "Please upload your resume / CV.";
  const ext = file.name.split(".").pop()?.toLowerCase() ?? "";
  if (!RESUME_EXTENSIONS.includes(ext)) return "Resume must be a PDF, DOC or DOCX file.";
  if (file.size > MAX_RESUME_BYTES) return "Resume must be 10 MB or smaller.";
  return undefined;
}

export function validateApplication(a: Application, file: { name: string; size: number } | null): ApplicationErrors {
  const e: ApplicationErrors = {};
  const req: (keyof Application)[] = ["full_name", "email", "phone", "location", "position", "experience", "skills", "english_speaking_level", "availability", "linkedin", "expected_salary", "voice_note_url"];
  for (const k of req) if (!String(a[k]).trim()) e[k] = "This field is required.";
  if (a.email.trim() && !EMAIL.test(a.email.trim())) e.email = "Please enter a valid email address.";
  if (a.position && !POSITION_TITLES.includes(a.position)) e.position = "Please choose a position.";
  if (a.linkedin.trim() && !isUrl(a.linkedin.trim())) e.linkedin = "Please enter a full URL starting with https://";
  if (a.portfolio.trim() && !isUrl(a.portfolio.trim())) e.portfolio = "Please enter a full URL starting with https://";
  if (a.voice_note_url.trim() && !isVocarooUrl(a.voice_note_url.trim())) e.voice_note_url = "Please paste your Vocaroo link (e.g. https://voca.ro/…).";
  const r = resumeError(file); if (r) e.resume = r;
  if (!a.privacy_consent) e.privacy_consent = "Please accept the privacy consent to continue.";
  return e;
}

export function resumePath(fileName: string, now: number, rand: string) {
  const ext = fileName.split(".").pop()?.toLowerCase() ?? "pdf";
  return `applications/${now}-${rand}.${ext}`;
}

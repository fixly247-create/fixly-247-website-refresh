import { describe, expect, it } from "vitest";
import { POSITION_TITLES, RESUME_BUCKET, resumeError, validateApplication, type Application } from "@/lib/careers";

const ok: Application = { full_name: "A", email: "a@b.co", phone: "1", location: "X", position: "Cold Caller", experience: "x", skills: "x", english_speaking_level: "Fluent", availability: "Immediately", linkedin: "https://linkedin.com/in/a", portfolio: "", expected_salary: "50000", voice_note_url: "https://voca.ro/abc", privacy_consent: true };
const pdf = { name: "cv.pdf", size: 1000 };

describe("careers rules", () => {
  it("offers exactly the three positions", () => expect(POSITION_TITLES).toEqual(["Phone Support Representative", "Email Support Representative", "Cold Caller"]));
  it("uploads to the Resumes bucket", () => expect(RESUME_BUCKET).toBe("Resumes"));
  it("accepts a valid application", () => expect(validateApplication(ok, pdf)).toEqual({}));
  it("rejects non-Vocaroo voice links", () => expect(validateApplication({ ...ok, voice_note_url: "https://youtube.com/x" }, pdf).voice_note_url).toBeTruthy());
  it("rejects resumes over 10 MB or wrong type", () => {
    expect(resumeError({ name: "cv.docx", size: 10 * 1024 * 1024 + 1 })).toBeTruthy();
    expect(resumeError({ name: "cv.png", size: 10 })).toBeTruthy();
  });
  it("requires privacy consent", () => expect(validateApplication({ ...ok, privacy_consent: false }, pdf).privacy_consent).toBeTruthy());
});

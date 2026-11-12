import { QueryClient } from "@tanstack/react-query";
import { createRouter, rootRouteId } from "@tanstack/react-router";
import { describe, expect, it } from "vitest";

import { buildEnquiryMailto, validateEnquiry, type Enquiry } from "@/lib/enquiry";
import { CONTACT, NAV_ITEMS, SOCIAL_LINKS } from "@/lib/site";
import { routeTree } from "@/routeTree.gen";

const filled: Enquiry = {
  fullName: "Jane Doe",
  email: "jane@acme.com",
  phone: "+1 555 123 4567",
  company: "Acme",
  services: ["Email Support"],
  message: "Need help with our inbox & chats",
};

describe("navigation", () => {
  it("has no Our Experience link in the menu", () => {
    expect(NAV_ITEMS.map((i) => i.to)).not.toContain("/experience");
    expect(NAV_ITEMS.map((i) => i.label)).not.toContain("Our Experience");
  });

  it("every nav link, including Why Choose Us, matches a real page", () => {
    const router = createRouter({ routeTree, context: { queryClient: new QueryClient() } });
    for (const item of NAV_ITEMS) {
      const leaf = router.matchRoutes(item.to).at(-1);
      expect(leaf?.routeId, item.to).not.toBe(rootRouteId);
      expect(leaf?.routeId).toBe(item.to);
    }
    expect(NAV_ITEMS.map((n) => n.to)).toContain("/why-choose-us");
  });
});

describe("phone numbers", () => {
  it("uses the US direct business line for calls", () => {
    expect(CONTACT.phoneDisplay).toBe("+1 315 300 7069");
    expect(CONTACT.phoneHref).toBe("tel:+13153007069");
  });
  it("uses the US WhatsApp number for WhatsApp", () => {
    expect(CONTACT.whatsappDisplay).toBe("+1 510 585 4190");
  });
  it("contains no Pakistani numbers", () => {
    const all = JSON.stringify({ CONTACT, SOCIAL_LINKS });
    expect(all).not.toMatch(/\+?92\d{9,10}|3021001781/);
  });
});

describe("social links", () => {
  it("point at the exact Fixly 247 profiles", () => {
    expect(SOCIAL_LINKS.whatsapp).toBe("https://wa.me/15105854190");
    expect(SOCIAL_LINKS.facebook).toBe("https://www.facebook.com/share/1EiHZgT7M9/");
    expect(SOCIAL_LINKS.instagram).toBe("https://www.instagram.com/fixly247?xtok=MXFxczNwZjZteWJvZA==");
  });
});

describe("enquiry form", () => {
  it("sends to fixly247@gmail.com with the required subject", () => {
    const url = buildEnquiryMailto(filled);
    expect(url.startsWith("mailto:fixly247@gmail.com?")).toBe(true);
    const params = new URLSearchParams(url.split("?")[1]);
    expect(params.get("subject")).toBe("New Business Enquiry — Fixly 247");
    expect(params.get("body")).toContain("Full Name: Jane Doe");
    expect(params.get("body")).toContain("Services Required: Email Support");
    expect(params.get("body")).toContain("Need help with our inbox & chats");
  });

  it("blocks submission when required fields are missing", () => {
    const errors = validateEnquiry({ ...filled, fullName: "", email: "bad", services: [], message: "" });
    expect(Object.keys(errors).sort()).toEqual(["email", "fullName", "message", "services"]);
    expect(validateEnquiry(filled)).toEqual({});
  });
});

describe("images work on any host (e.g. Cloudflare)", () => {
  const files = Object.entries(
    import.meta.glob(["/src/**/*.{ts,tsx,css}", "!/src/test/**", "!/src/routeTree.gen.ts"], {
      query: "?raw",
      import: "default",
      eager: true,
    }) as Record<string, string>,
  );

  it("never loads images from Lovable-only asset addresses", () => {
    const offenders = files
      .filter(([, src]) => src.includes(".asset.json") || src.includes("/__l5e/"))
      .map(([path]) => path);
    expect(offenders).toEqual([]);
  });

  it("bundles all four client logos as real files", async () => {
    const { CLIENTS } = await import("@/lib/site");
    expect(CLIENTS).toHaveLength(4);
    for (const c of CLIENTS) expect(c.src).not.toContain("__l5e");
  });
});

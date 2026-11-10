import { createFileRoute } from "@tanstack/react-router";
import { Clock, Inbox, Smile } from "lucide-react";
import { CtaBand } from "@/components/site/CtaBand";
import { PageHero } from "@/components/site/PageHero";
import { Reveal, RevealGroup, RevealItem } from "@/components/site/Reveal";
import { SectionHeading } from "@/components/site/SectionHeading";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Us — Fixly 247 Customer Support & Outsourcing" },
      {
        name: "description",
        content:
          "Fixly 247 is a trusted partner for customer support and business outsourcing, working as an extension of your team.",
      },
      { property: "og:title", content: "About Fixly 247 — A Trusted Support Partner" },
      {
        property: "og:description",
        content:
          "Fixly 247 is a trusted partner for customer support and business outsourcing, working as an extension of your team.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: AboutPage,
});

const HIGHLIGHTS = [
  { icon: Clock, title: "Save time", text: "Save time on everyday customer communication." },
  { icon: Smile, title: "Happier customers", text: "Improve customer satisfaction." },
  { icon: Inbox, title: "Every channel, handled", text: "Manage every email, chat and call professionally." },
];

function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About Us"
        title={
          <>
            A Trusted Partner for <span className="display-accent">Customer Support</span> &amp; Outsourcing
          </>
        }
      >
        <p>
          Fixly 247 is a professional customer support and business outsourcing service provider
          dedicated to helping businesses deliver excellent customer experiences.
        </p>
      </PageHero>

      <section className="section">
        <div className="container-site grid gap-14 lg:grid-cols-[1fr_1.1fr]">
          <SectionHeading eyebrow="Who we are" title="An extension of your team" />
          <Reveal delay={0.1} className="space-y-6 text-lg leading-relaxed text-muted-foreground">
            <p>
              We work with companies, startups, entrepreneurs and growing businesses worldwide,
              acting as an extension of your team.
            </p>
            <p>
              Our goal is simple: to help you{" "}
              <strong className="text-foreground">save time, delight your customers</strong> and{" "}
              <strong className="text-foreground">focus on what matters most</strong>.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="section bg-tint pt-0">
        <div className="container-site">
          <RevealGroup className="grid gap-5 md:grid-cols-3">
            {HIGHLIGHTS.map((h) => (
              <RevealItem key={h.title} className="h-full">
                <div className="card-fx h-full p-8">
                  <span className="icon-chip">
                    <h.icon />
                  </span>
                  <h3 className="mt-6 text-xl font-bold">{h.title}</h3>
                  <p className="mt-3 text-muted-foreground">{h.text}</p>
                </div>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      <CtaBand title="Let's talk about your customers" />
    </>
  );
}

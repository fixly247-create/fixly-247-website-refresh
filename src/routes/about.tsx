import { createFileRoute } from "@tanstack/react-router";
import founderSrc from "@/assets/fixly247-founder.jpg";
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
  { title: "Save time", text: "Save time on everyday customer communication." },
  { title: "Happier customers", text: "Improve customer satisfaction." },
  { title: "Every channel, handled", text: "Manage every email, chat and call professionally." },
];

const WHO = ["Companies", "Startups", "Entrepreneurs", "Growing businesses"];

function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About Us"
        title={
          <>
            A trusted partner for <span className="display-accent">customer support</span> &amp;
            outsourcing
          </>
        }
      >
        <p>
          Fixly 247 is a professional customer support and business outsourcing service provider
          dedicated to helping businesses deliver excellent customer experiences.
        </p>
      </PageHero>

      <section className="section">
        <div className="container-site grid items-center gap-14 lg:grid-cols-[1fr_1.05fr] lg:gap-20">
          <Reveal className="mx-auto w-full max-w-md lg:max-w-none">
            <figure className="portrait">
              <img
                src={founderSrc}
                alt="The person behind Fixly 247 at work"
                className="aspect-[4/5] w-full object-cover object-[60%_center]"
                width={1451}
                height={1084}
              />
            </figure>
          </Reveal>

          <div>
            <SectionHeading eyebrow="Who we are" title="An extension of your team" />
            <Reveal delay={0.1} className="mt-6 space-y-5 text-lg leading-relaxed text-muted-foreground">
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
            <Reveal delay={0.15} className="mt-10">
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-muted-foreground">
                Who we work with
              </p>
              <ul className="mt-4 flex flex-wrap gap-2">
                {WHO.map((w) => (
                  <li key={w} className="tag">
                    {w}
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="section bg-tint">
        <div className="container-site">
          <SectionHeading eyebrow="What we help you do" title="Less on your plate. Better care for your customers." />
          <RevealGroup className="mt-14 grid gap-10 md:grid-cols-3 md:gap-8">
            {HIGHLIGHTS.map((h) => (
              <RevealItem key={h.title} className="border-t-2 border-primary pt-6">
                <h3 className="text-xl font-bold">{h.title}</h3>
                <p className="mt-3 text-muted-foreground">{h.text}</p>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>
    </>
  );
}

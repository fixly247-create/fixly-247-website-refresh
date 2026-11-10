import { createFileRoute } from "@tanstack/react-router";
import { CtaBand } from "@/components/site/CtaBand";
import { PageHero } from "@/components/site/PageHero";
import { Reveal, RevealGroup, RevealItem } from "@/components/site/Reveal";
import { SectionHeading } from "@/components/site/SectionHeading";
import { REASONS, STEPS } from "@/lib/site";

export const Route = createFileRoute("/why-choose-us")({
  head: () => ({
    meta: [
      { title: "Why Choose Us — Care, Reliability & Professionalism | Fixly 247" },
      {
        name: "description",
        content:
          "Professional communication, reliable and dedicated support, flexible solutions and affordable customer support from Fixly 247.",
      },
      { property: "og:title", content: "Why Choose Fixly 247" },
      {
        property: "og:description",
        content:
          "Support built on care, reliability and professionalism. We treat your customers like our own.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: WhyChooseUsPage,
});

function WhyChooseUsPage() {
  return (
    <>
      <PageHero
        eyebrow="Why Choose Us"
        title={
          <>
            Support Built on <span className="display-accent">Care, Reliability</span> and Professionalism
          </>
        }
      />

      <section className="section">
        <div className="container-site">
          <RevealGroup className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {REASONS.map((r) => (
              <RevealItem key={r.title} className="h-full">
                <article className="card-fx h-full p-8">
                  <span className="icon-chip">
                    <r.icon />
                  </span>
                  <h2 className="mt-6 text-xl font-bold">{r.title}</h2>
                  <p className="mt-3 leading-relaxed text-muted-foreground">{r.description}</p>
                </article>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      <section className="section bg-navy on-dark">
        <div className="orb orb--teal -right-24 -top-10 size-96" />
        <div className="orb orb--glow -bottom-24 -left-24 size-80" />
        <div className="container-site">
          <Reveal className="mx-auto max-w-4xl">
            <p className="eyebrow">Our commitment</p>
            <h2 className="mt-6 text-3xl font-extrabold leading-tight md:text-5xl">
              We treat your customers like our own because{" "}
              <span className="display-accent">your success is our success.</span>
            </h2>
            <div className="mt-10 grid gap-6 text-lg leading-relaxed text-on-dark-muted md:grid-cols-2">
              <p>
                At Fixly 247, we believe every customer interaction matters. We treat your customers
                with the same care, respect, dedication, and professionalism that we would give our
                own customers.
              </p>
              <p>
                We understand that your customers are the foundation of your business, and their
                satisfaction is our priority. Your business growth and success are directly connected
                to our success.
              </p>
            </div>
            <p className="mt-10 font-display text-2xl italic text-teal-glow">— The Fixly 247 Team</p>
          </Reveal>
        </div>
      </section>

      <section className="section">
        <div className="container-site">
          <SectionHeading eyebrow="How it works" title="Professional Support in Three Simple Steps" center />
          <RevealGroup className="relative mt-16 grid gap-10 md:grid-cols-3" stagger={0.12}>
            {STEPS.map((step, i) => (
              <RevealItem key={step.title}>
                <div className="text-center">
                  <span className="step-num mx-auto">{i + 1}</span>
                  <h3 className="mt-6 text-xl font-bold">{step.title}</h3>
                  <p className="mt-3 text-muted-foreground">{step.description}</p>
                </div>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      <CtaBand />
    </>
  );
}

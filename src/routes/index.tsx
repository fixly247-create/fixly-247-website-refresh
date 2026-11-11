import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import illustrationSrc from "@/assets/customer-service-illustration.jpg";
import { FxLink } from "@/components/site/FxButton";
import { Reveal, RevealGroup, RevealItem } from "@/components/site/Reveal";
import { SectionHeading } from "@/components/site/SectionHeading";
import { CLIENTS, SERVICES, STEPS } from "@/lib/site";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Fixly 247 — Your Business Deserves Better Customer Support" },
      {
        name: "description",
        content:
          "Emails, live chat, call handling and outsourcing support from Fixly 247. Connect with customers and grow with confidence.",
      },
      { property: "og:title", content: "Fixly 247 — Your Business Deserves Better Customer Support" },
      {
        property: "og:description",
        content:
          "Emails, live chat, call handling and outsourcing support from Fixly 247. Connect with customers and grow with confidence.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: HomePage,
});

const ease = [0.22, 1, 0.36, 1] as const;

function HomePage() {
  return (
    <>
      <Hero />
      <Intro />
      <ServicesPreview />
      <HowItWorks />
      <OurClients />
      <FreeTrial />
    </>
  );
}

function Hero() {
  const channels = ["Email support", "Live chat", "Call handling", "Business outsourcing"];
  return (
    <section className="bg-hero on-dark hero-offset" data-header-tone="dark">
      <div className="container-site grid gap-14 pb-20 pt-14 md:pb-28 md:pt-20 lg:grid-cols-[1.35fr_1fr] lg:items-end lg:pb-32">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease }}
        >
          <p className="eyebrow">Customer support &amp; outsourcing</p>
          <h1 className="mt-6 text-[2.6rem] font-extrabold leading-[1.03] sm:text-6xl lg:text-[4.4rem]">
            Your Business Deserves Better{" "}
            <span className="display-accent">Customer Support.</span>
          </h1>
          <p className="mt-7 max-w-xl text-lg leading-relaxed text-on-dark-muted">
            From emails and live chats to professional call handling and outsourcing solutions,
            Fixly 247 helps businesses connect with customers and grow with confidence.
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <FxLink to="/contact" variant="teal">
              Get a Free Trial
            </FxLink>
            <FxLink to="/services" variant="ghost-dark">
              Explore Our Services
            </FxLink>
          </div>
        </motion.div>

        <motion.ul
          className="hero-list"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8, ease }}
          aria-label="What we handle"
        >
          {channels.map((c) => (
            <li key={c}>{c}</li>
          ))}
        </motion.ul>
      </div>
    </section>
  );
}

function Intro() {
  return (
    <section className="section bg-card">
      <div className="container-site grid items-center gap-12 lg:grid-cols-[1.1fr_1fr] lg:gap-20">
        <Reveal className="order-2 lg:order-1">
          <img
            src={illustrationSrc}
            alt="Customer service illustration: solution, friendly, positive, 24/7 support, knowledge and quality"
            className="mx-auto w-full max-w-xl"
            loading="lazy"
            width={1920}
            height={1152}
          />
        </Reveal>

        <div className="order-1 lg:order-2">
          <SectionHeading eyebrow="Meet Fixly 247" title="An extension of your team, not another vendor">
            <p>
              Fixly 247 is a professional customer support and business outsourcing service
              provider. We look after your customers so you can save time and focus on what
              matters most.
            </p>
          </SectionHeading>
          <Reveal delay={0.1} className="mt-8">
            <Link to="/about" className="text-link">
              More about us <ArrowUpRight className="size-4" />
            </Link>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function ServicesPreview() {
  const preview = SERVICES.slice(0, 4);
  return (
    <section className="section">
      <div className="container-site grid gap-12 lg:grid-cols-[1fr_1.6fr] lg:gap-20">
        <div>
          <SectionHeading eyebrow="What we do" title="Support for every customer conversation" />
          <Reveal delay={0.1} className="mt-8">
            <Link to="/services" className="text-link">
              All seven services <ArrowUpRight className="size-4" />
            </Link>
          </Reveal>
        </div>
        <RevealGroup className="grid gap-x-10 sm:grid-cols-2">
          {preview.map((s) => (
            <RevealItem key={s.title} className="rule-item">
              <s.icon className="size-6 text-primary" strokeWidth={1.6} />
              <h3 className="mt-4 text-lg font-bold">{s.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{s.description}</p>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}

function HowItWorks() {
  return (
    <section className="section bg-navy on-dark" data-header-tone="dark">
      <div className="container-site">
        <SectionHeading eyebrow="How it works" title="Professional support in three simple steps" />
        <RevealGroup className="mt-14 grid gap-10 md:grid-cols-3 md:gap-8" stagger={0.1}>
          {STEPS.map((step, i) => (
            <RevealItem key={step.title} className="step-item">
              <span className="step-label">Step {i + 1}</span>
              <h3 className="mt-4 text-xl font-bold text-on-dark">{step.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-on-dark-muted">{step.description}</p>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}

function OurClients() {
  // Two identical runs let the strip loop seamlessly; the copy is hidden from screen readers.
  const runs = [0, 1];
  return (
    <section className="section bg-card" aria-labelledby="our-clients">
      <div className="container-site">
        <Reveal>
          <h2 id="our-clients" className="text-center text-3xl font-extrabold leading-tight md:text-5xl">
            Our Clients
          </h2>
        </Reveal>
      </div>
      <Reveal delay={0.1} className="logo-marquee mt-12 md:mt-16">
        <div className="logo-marquee__track">
          {runs.map((run) => (
            <ul key={run} className="logo-marquee__run" aria-hidden={run === 1 || undefined}>
              {CLIENTS.map((c) => (
                <li key={c.name} className="logo-marquee__item">
                  <img
                    src={c.src}
                    alt={run === 0 ? c.name : ""}
                    width={c.width}
                    height={c.height}
                    loading="lazy"
                    decoding="async"
                    className={`client-logo client-logo--${c.shape}`}
                  />
                </li>
              ))}
            </ul>
          ))}
        </div>
      </Reveal>
    </section>
  );
}

function FreeTrial() {
  return (
    <section className="section bg-tint">
      <div className="container-site">
        <Reveal className="grid items-end gap-10 md:grid-cols-[1.5fr_1fr]">
          <div>
            <p className="eyebrow">Free trial</p>
            <h2 className="mt-4 text-3xl font-extrabold leading-tight md:text-5xl">
              Experience professional support{" "}
              <span className="display-accent">before you commit.</span>
            </h2>
            <p className="mt-5 max-w-xl text-lg text-muted-foreground">
              Tell us about your requirements and we'll show you how Fixly 247 can support your
              business. Pricing is by custom quotation.
            </p>
          </div>
          <div className="md:justify-self-end">
            <FxLink to="/contact" variant="navy">
              Start Your Free Trial
            </FxLink>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

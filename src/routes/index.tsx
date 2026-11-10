import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { CheckCircle2, Clock, Mail, MessagesSquare, PhoneCall, Sparkles } from "lucide-react";
import founderAsset from "@/assets/fixly247-founder.jpg.asset.json";
import { CtaBand } from "@/components/site/CtaBand";
import { FxLink, OrbLink } from "@/components/site/FxButton";
import { Reveal, RevealGroup, RevealItem } from "@/components/site/Reveal";
import { SectionHeading } from "@/components/site/SectionHeading";
import { EXPERIENCES, SERVICES, STEPS } from "@/lib/site";

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
      <Commitment />
      <HowItWorks />
      <ExperiencePreview />
      <FreeTrial />
      <CtaBand />
    </>
  );
}

function Hero() {
  const words = ["Your", "Business", "Deserves", "Better"];
  return (
    <section className="bg-hero on-dark">
      <div className="orb orb--teal -right-32 -top-20 size-[28rem]" />
      <div className="orb orb--glow -left-40 bottom-0 size-80" />
      <div className="ring-deco -right-52 top-10 hidden size-[40rem] lg:block" />
      <div className="container-site grid items-center gap-14 py-20 md:py-28 lg:grid-cols-[1.15fr_1fr] lg:py-32">
        <div>
          <motion.p
            className="eyebrow"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease }}
          >
            Customer support &amp; outsourcing
          </motion.p>
          <h1 className="mt-6 text-[2.6rem] font-extrabold leading-[1.02] sm:text-6xl lg:text-7xl">
            {words.map((w, i) => (
              <motion.span
                key={w}
                className="inline-block pr-[0.25em]"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + i * 0.08, duration: 0.7, ease }}
              >
                {w}
              </motion.span>
            ))}
            <motion.span
              className="display-accent inline-block"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.45, duration: 0.8, ease }}
            >
              Customer Support.
            </motion.span>
          </h1>
          <motion.p
            className="mt-7 max-w-xl text-lg leading-relaxed text-on-dark-muted"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.7, ease }}
          >
            From emails and live chats to professional call handling and outsourcing solutions,
            Fixly 247 helps businesses connect with customers and grow with confidence.
          </motion.p>
          <motion.div
            className="mt-10 flex flex-wrap gap-4"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.75, duration: 0.7, ease }}
          >
            <FxLink to="/contact" variant="teal">
              Get a Free Trial
            </FxLink>
            <FxLink to="/services" variant="ghost-dark">
              Explore Our Services
            </FxLink>
          </motion.div>
        </div>

        <HeroVisual />
      </div>
    </section>
  );
}

function HeroVisual() {
  const channels = [
    { icon: Mail, title: "Email support", text: "Inquiries answered & followed up" },
    { icon: MessagesSquare, title: "Live chat", text: "Real-time help for visitors" },
    { icon: PhoneCall, title: "Call handling", text: "Inbound & outbound calls" },
  ];
  return (
    <div className="relative mx-auto w-full max-w-md lg:max-w-none">
      <motion.div
        className="card-dark relative p-6 md:p-8"
        initial={{ opacity: 0, scale: 0.94, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.9, ease }}
      >
        <div className="flex items-center justify-between">
          <p className="text-sm font-bold text-on-dark">Every channel, handled</p>
          <span className="inline-flex items-center gap-2 rounded-full bg-teal/20 px-3 py-1 text-xs font-bold text-teal-glow">
            <Clock className="size-3.5" /> 24/7 mindset
          </span>
        </div>
        <div className="mt-6 grid gap-3">
          {channels.map((c, i) => (
            <motion.div
              key={c.title}
              className="channel-card flex items-center gap-4"
              initial={{ opacity: 0, x: 24 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6 + i * 0.12, duration: 0.6, ease }}
            >
              <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-teal/25 text-teal-glow">
                <c.icon className="size-5" />
              </span>
              <span>
                <span className="block text-sm font-bold">{c.title}</span>
                <span className="block text-xs text-on-dark-muted">{c.text}</span>
              </span>
              <CheckCircle2 className="ml-auto size-5 text-teal-glow" />
            </motion.div>
          ))}
        </div>
        <div className="mt-6 rounded-2xl bg-gradient-to-r from-teal/30 to-transparent p-4 text-sm text-on-dark">
          <span className="font-bold">Your customers, cared for</span> — while you focus on growing
          your business.
        </div>
      </motion.div>
      <motion.div
        className="float-badge absolute -bottom-6 -left-4 hidden sm:inline-flex"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 0.6, ease }}
      >
        <Sparkles className="size-5 text-primary" />
        <span className="text-sm font-bold">Free trial available</span>
      </motion.div>
    </div>
  );
}

function Intro() {
  return (
    <section className="section overflow-hidden">
      <div className="container-site grid items-center gap-16 lg:grid-cols-2">
        <Reveal className="relative order-2 mx-auto w-full max-w-lg lg:order-1">
          <div className="frame-photo">
            <div className="frame-photo__offset" />
            <div className="frame-photo__inner aspect-[4/3]">
              <img
                src={founderAsset.url}
                alt="The person behind Fixly 247 at work"
                className="size-full object-cover"
                loading="lazy"
                width={1451}
                height={1084}
              />
            </div>
          </div>
          <div className="float-badge absolute -right-2 -top-6 md:-right-8">
            <span className="grid size-10 place-items-center rounded-full bg-accent text-primary">
              <PhoneCall className="size-5" />
            </span>
            <span>
              <span className="block text-sm font-bold">Personal, dedicated service</span>
              <span className="block text-xs text-muted-foreground">An extension of your team</span>
            </span>
          </div>
        </Reveal>

        <div className="order-1 lg:order-2">
          <SectionHeading eyebrow="Meet Fixly 247" title={<>The people behind <span className="display-accent">your support</span></>}>
            <p>
              Fixly 247 is a professional customer support and business outsourcing service
              provider dedicated to helping businesses deliver excellent customer experiences.
            </p>
          </SectionHeading>
          <Reveal delay={0.1}>
            <p className="mt-5 text-muted-foreground">
              We work with companies, startups, entrepreneurs and growing businesses worldwide,
              acting as an extension of your team — so you can save time, delight your customers
              and focus on what matters most.
            </p>
            <div className="mt-8">
              <FxLink to="/about" variant="outline">
                Learn More About Us
              </FxLink>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function ServicesPreview() {
  const preview = SERVICES.slice(0, 4);
  return (
    <section className="section bg-tint">
      <div className="container-site">
        <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
          <SectionHeading eyebrow="What we do" title="Support for every customer conversation">
            <p>A quick look at our core services. See the full list on the Services page.</p>
          </SectionHeading>
          <Reveal>
            <FxLink to="/services" variant="navy">
              Explore Services
            </FxLink>
          </Reveal>
        </div>
        <RevealGroup className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {preview.map((s) => (
            <RevealItem key={s.title} className="h-full">
              <article className="card-fx group flex h-full flex-col p-7">
                <span className="icon-chip">
                  <s.icon />
                </span>
                <h3 className="mt-6 text-lg font-bold">{s.title}</h3>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">{s.description}</p>
                <div className="mt-6">
                  <OrbLink to="/services">Learn More</OrbLink>
                </div>
              </article>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}

function Commitment() {
  return (
    <section className="section">
      <div className="container-site">
        <Reveal className="mx-auto max-w-4xl text-center">
          <span className="quote-mark block h-16" aria-hidden="true">
            “
          </span>
          <p className="mt-4 text-2xl font-bold leading-snug md:text-4xl">
            We treat your customers like our own because{" "}
            <span className="display-accent">your success is our success.</span>
          </p>
          <div className="mt-8">
            <FxLink to="/why-choose-us" variant="outline" size="sm">
              Why Choose Us
            </FxLink>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function HowItWorks() {
  return (
    <section className="section bg-navy on-dark">
      <div className="orb orb--teal -left-20 top-10 size-80" />
      <div className="container-site">
        <SectionHeading eyebrow="How it works" title="Professional Support in Three Simple Steps" center />
        <RevealGroup className="mt-16 grid gap-6 md:grid-cols-3" stagger={0.12}>
          {STEPS.map((step, i) => (
            <RevealItem key={step.title} className="h-full">
              <div className="card-dark h-full p-8">
                <span className="step-num">{i + 1}</span>
                <p className="mt-6 text-xs font-bold uppercase tracking-[0.18em] text-teal-glow">Step {i + 1}</p>
                <h3 className="mt-2 text-xl font-bold text-on-dark">{step.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-on-dark-muted">{step.description}</p>
              </div>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}

function ExperiencePreview() {
  return (
    <section className="section">
      <div className="container-site">
        <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
          <SectionHeading eyebrow="Experience" title="Real experience, real businesses">
            <p>From Shopify store support to real estate prospecting and inbound calls.</p>
          </SectionHeading>
          <Reveal>
            <FxLink to="/experience" variant="outline">
              View Our Experience
            </FxLink>
          </Reveal>
        </div>
        <RevealGroup className="mt-12 grid gap-5 md:grid-cols-2">
          {EXPERIENCES.slice(0, 2).map((x) => (
            <RevealItem key={x.company}>
              <article className="exp-card p-7 md:p-8">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <h3 className="text-xl font-bold">
                    {x.company}
                    {x.detail && <span className="font-semibold text-muted-foreground"> | {x.detail}</span>}
                  </h3>
                  {x.current && (
                    <span className="status-pill">
                      <span className="status-pill__dot" /> Currently Working
                    </span>
                  )}
                </div>
                <p className="mt-2 font-semibold text-primary">{x.role}</p>
                <p className="mt-4 text-sm text-muted-foreground">{x.points[0]}</p>
              </article>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}

function FreeTrial() {
  return (
    <section className="section bg-tint bg-dots">
      <div className="container-site">
        <Reveal>
          <div className="card-fx grid items-center gap-10 p-8 md:grid-cols-[1.4fr_1fr] md:p-14">
            <div>
              <p className="eyebrow">Free trial</p>
              <h2 className="mt-4 text-3xl font-extrabold leading-tight md:text-5xl">
                Experience Professional Support <span className="display-accent">Before You Commit.</span>
              </h2>
              <p className="mt-5 max-w-xl text-lg text-muted-foreground">
                Discover how Fixly 247 can support your business. Get in touch to discuss your
                requirements and explore our free trial.
              </p>
            </div>
            <div className="flex flex-col items-start gap-4 md:items-end">
              <FxLink to="/contact" variant="teal">
                Start Your Free Trial
              </FxLink>
              <p className="text-sm text-muted-foreground">Pricing by custom quotation.</p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

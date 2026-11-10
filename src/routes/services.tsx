import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowUpRight, Check } from "lucide-react";
import { PageHero } from "@/components/site/PageHero";
import { Reveal, RevealGroup, RevealItem } from "@/components/site/Reveal";
import { SERVICES } from "@/lib/site";

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title: "Services — Email, Live Chat, Calls & Outsourcing | Fixly 247" },
      {
        name: "description",
        content:
          "Customer support, email support, live chat, call handling, ticket management, appointment setting and business outsourcing.",
      },
      { property: "og:title", content: "Fixly 247 Services" },
      {
        property: "og:description",
        content:
          "Customer support, email support, live chat, call handling, ticket management, appointment setting and business outsourcing.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ServicesPage,
});

function ServicesPage() {
  return (
    <>
      <PageHero
        eyebrow="Our Services"
        title={
          <>
            Support services that <span className="display-accent">fit your business</span>
          </>
        }
      >
        <p>Choose one service or combine several — we shape our support around how your business works.</p>
      </PageHero>

      <section className="section">
        <div className="container-site">
          <RevealGroup className="border-t border-border" stagger={0.06}>
            {SERVICES.map((s) => (
              <RevealItem key={s.title}>
                <article className="service-row">
                  <div className="flex items-center gap-4">
                    <span className="icon-chip shrink-0">
                      <s.icon />
                    </span>
                    <h2 className="text-xl font-bold md:text-2xl">{s.title}</h2>
                  </div>
                  <p className="leading-relaxed text-muted-foreground">{s.description}</p>
                  <ul className="grid gap-2">
                    {s.points.map((p) => (
                      <li key={p} className="flex items-center gap-2.5 text-sm font-semibold">
                        <Check className="size-4 shrink-0 text-primary" />
                        {p}
                      </li>
                    ))}
                  </ul>
                </article>
              </RevealItem>
            ))}
          </RevealGroup>

          <Reveal className="mt-16 grid gap-6 rounded-[var(--radius-2xl)] bg-muted p-8 md:grid-cols-[1.6fr_1fr] md:items-center md:p-12">
            <div>
              <h2 className="text-2xl font-extrabold md:text-3xl">Custom quotation</h2>
              <p className="mt-3 max-w-xl leading-relaxed text-muted-foreground">
                Pricing is based on a custom quotation according to your services and support
                requirements.
              </p>
            </div>
            <Link to="/contact" className="text-link md:justify-self-end">
              Request a quote <ArrowUpRight className="size-4" />
            </Link>
          </Reveal>
        </div>
      </section>
    </>
  );
}

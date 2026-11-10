import { createFileRoute } from "@tanstack/react-router";
import { Check, FileText } from "lucide-react";
import { CtaBand } from "@/components/site/CtaBand";
import { FxLink } from "@/components/site/FxButton";
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
          <RevealGroup className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {SERVICES.map((s) => (
              <RevealItem key={s.title} className="h-full">
                <article className="card-fx flex h-full flex-col p-8">
                  <span className="icon-chip">
                    <s.icon />
                  </span>
                  <h2 className="mt-6 text-xl font-bold">{s.title}</h2>
                  <p className="mt-3 leading-relaxed text-muted-foreground">{s.description}</p>
                  <ul className="mt-6 grid gap-2.5 border-t border-border pt-6">
                    {s.points.map((p) => (
                      <li key={p} className="flex items-center gap-3 text-sm font-semibold">
                        <span className="grid size-5 place-items-center rounded-full bg-accent text-primary">
                          <Check className="size-3" />
                        </span>
                        {p}
                      </li>
                    ))}
                  </ul>
                </article>
              </RevealItem>
            ))}
            <RevealItem className="h-full">
              <div className="bg-navy on-dark flex h-full flex-col justify-between rounded-[1.5rem] p-8">
                <div>
                  <span className="grid size-13 place-items-center rounded-2xl bg-teal/25 text-teal-glow">
                    <FileText className="size-6" />
                  </span>
                  <h2 className="mt-6 text-xl font-bold">Custom quotation</h2>
                  <p className="mt-3 leading-relaxed text-on-dark-muted">
                    Pricing is based on a custom quotation according to your services and support
                    requirements.
                  </p>
                </div>
                <div className="mt-8">
                  <FxLink to="/contact" variant="teal" size="sm">
                    Request a Quote
                  </FxLink>
                </div>
              </div>
            </RevealItem>
          </RevealGroup>
          <Reveal className="mt-14 text-center">
            <FxLink to="/contact" variant="navy">
              Get a Free Trial
            </FxLink>
          </Reveal>
        </div>
      </section>

      <CtaBand />
    </>
  );
}

import { createFileRoute } from "@tanstack/react-router";
import { Building2, CheckCircle2 } from "lucide-react";
import { CtaBand } from "@/components/site/CtaBand";
import { PageHero } from "@/components/site/PageHero";
import { RevealGroup, RevealItem } from "@/components/site/Reveal";
import { EXPERIENCES } from "@/lib/site";

export const Route = createFileRoute("/experience")({
  head: () => ({
    meta: [
      { title: "Our Experience — Real Customer Support Work | Fixly 247" },
      {
        name: "description",
        content:
          "Shopify store support, real estate cold calling, inbound calls and email support, and sales closing — how Fixly 247 has supported businesses.",
      },
      { property: "og:title", content: "Fixly 247 — Our Experience" },
      {
        property: "og:description",
        content:
          "Shopify store support, real estate cold calling, inbound calls and email support, and sales closing.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ExperiencePage,
});

function ExperiencePage() {
  return (
    <>
      <PageHero
        eyebrow="Our Experience"
        title={
          <>
            Real Experience. <span className="display-accent">Professional Customer Support.</span>
          </>
        }
      >
        <p>
          From real estate prospecting and cold calling to inbound customer support and Shopify
          store management, here is how we have supported businesses.
        </p>
      </PageHero>

      <section className="section">
        <div className="container-site">
          <RevealGroup className="grid gap-6 lg:grid-cols-2" stagger={0.1}>
            {EXPERIENCES.map((x) => (
              <RevealItem key={x.company} className="h-full">
                <article className="exp-card flex h-full flex-col p-7 md:p-9">
                  <div className="flex items-start gap-4">
                    <span className="icon-chip shrink-0">
                      <Building2 />
                    </span>
                    <div className="min-w-0 flex-1">
                      <h2 className="text-xl font-bold leading-snug md:text-2xl">{x.company}</h2>
                      {x.detail && <p className="mt-1 font-semibold text-muted-foreground">{x.detail}</p>}
                    </div>
                  </div>

                  <div className="mt-6 flex flex-wrap items-center gap-2">
                    <span className="text-base font-bold text-primary">{x.role}</span>
                    {x.current && (
                      <span className="status-pill ml-auto">
                        <span className="status-pill__dot" /> Currently Working
                      </span>
                    )}
                  </div>

                  <ul className="mt-5 grid flex-1 gap-3 border-t border-border pt-5">
                    {x.points.map((p) => (
                      <li key={p} className="flex gap-3 text-muted-foreground">
                        <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-primary" />
                        <span>{p}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-6 flex flex-wrap gap-2">
                    {x.tags.map((t) => (
                      <span key={t} className="tag">
                        {t}
                      </span>
                    ))}
                  </div>
                </article>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      <CtaBand title="Want this kind of support for your business?" />
    </>
  );
}

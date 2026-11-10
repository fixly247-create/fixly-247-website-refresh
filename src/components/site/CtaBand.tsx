import { Reveal } from "./Reveal";
import { FxLink } from "./FxButton";

/** Closing call-to-action that directs visitors to the Contact page. */
export function CtaBand({
  title = "Ready to give your customers better support?",
  text = "Tell us about your business and the support you need. Pricing is by custom quotation based on your requirements.",
}: {
  title?: string;
  text?: string;
}) {
  return (
    <section className="section">
      <div className="container-site">
        <Reveal>
          <div className="bg-hero on-dark rounded-[2rem] px-6 py-14 text-center md:px-16 md:py-20">
            <div className="orb orb--teal -left-10 -top-10 size-72" />
            <div className="orb orb--glow -bottom-20 -right-10 size-72" />
            <p className="eyebrow justify-center">Let's talk</p>
            <h2 className="mx-auto mt-5 max-w-2xl text-3xl font-extrabold md:text-5xl">{title}</h2>
            <p className="mx-auto mt-5 max-w-xl text-on-dark-muted">{text}</p>
            <div className="mt-9 flex flex-wrap justify-center gap-4">
              <FxLink to="/contact" variant="teal">
                Contact Us
              </FxLink>
              <FxLink to="/services" variant="ghost-dark">
                Explore Services
              </FxLink>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

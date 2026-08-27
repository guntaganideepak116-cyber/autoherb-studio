import { Sparkles, Target, Users, Wrench } from "lucide-react";
import { Reveal } from "./Reveal";
import spa from "@/assets/svc-spa.jpg";

const blocks = [
  {
    icon: Users,
    title: "Our Story",
    body: "‘Prashant Rane’ and ‘Ritesh Patil’ began the adventure that has resulted in one of India’s most sorted car detailing and service brand, AUTO HERB.",
  },
  {
    icon: Target,
    title: "Our Vision",
    body: "Auto Herb aspires to reach nearly everyone, even in tiny villages and cities. To that end, our crew works hard every day to give the best car detailing services in India. Our team’s goal is to open 100+ stores by 2028.",
  },
  {
    icon: Wrench,
    title: "Our Expertise",
    body: "Auto Herb is one of the most well-known companies in the country, providing specialized automobile treatment and detailing services such as coatings, full spa, paint protection, surface treatment, interior treatment, parts restoration, and so on.",
  },
];

export function AboutSection() {
  return (
    <section id="about" className="scroll-mt-20 py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-gold">About Us</p>
          <h2 className="mt-3 max-w-2xl font-display text-2xl font-bold uppercase leading-tight tracking-wide sm:text-3xl">
            Customer-Focused <span className="gold-text">Car Care</span>
          </h2>
        </Reveal>

        <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_1.15fr] lg:items-start lg:gap-12">
          <Reveal>
            <div className="overflow-hidden rounded-2xl border border-border">
              <img
                src={spa}
                alt="AutoHerb detailing team working on a car"
                width={1200}
                height={800}
                loading="lazy"
                className="h-56 w-full object-cover sm:h-72 lg:h-80"
              />
            </div>
            <div className="mt-6 rounded-2xl border border-border bg-surface p-5 sm:p-6">
              <Sparkles className="h-6 w-6 text-gold" strokeWidth={1.5} aria-hidden />
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground sm:text-base">
                Auto Herb is a customer-focused detailing company that specializes in Ceramic
                coating service, Car coating service, PPF coating, and Car detailing for all kinds
                of automobiles.
              </p>
            </div>
          </Reveal>

          <Reveal delay={80}>
            <ul className="grid gap-4 sm:gap-5">
              {blocks.map(({ icon: Icon, title, body }) => (
                <li
                  key={title}
                  className="rounded-2xl border border-border bg-surface p-5 transition-colors hover:border-gold/50 sm:p-6"
                >
                  <div className="flex min-w-0 items-center gap-3">
                    <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl border border-gold/40 text-gold">
                      <Icon className="h-5 w-5" strokeWidth={1.5} aria-hidden />
                    </span>
                    <h3 className="truncate font-display text-base font-bold uppercase tracking-wide sm:text-lg">
                      {title}
                    </h3>
                  </div>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{body}</p>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

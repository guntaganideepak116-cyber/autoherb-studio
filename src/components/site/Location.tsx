import { MapPin, Navigation, Phone, MessageCircle, Clock } from "lucide-react";
import { business, waLink } from "@/data/site";
import { Reveal } from "./Reveal";

export function LocationSection() {
  return (
    <section id="location" className="pb-16 sm:pb-20 lg:pb-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <div className="grid gap-8 rounded-2xl border border-border bg-surface p-6 sm:p-8 lg:grid-cols-2 lg:gap-12">
            <div>
              <h2 className="font-display text-xl font-bold uppercase tracking-wide sm:text-2xl">
                Visit <span className="gold-text">AutoHerb Ongole</span>
              </h2>
              <address className="mt-4 flex gap-3 not-italic text-sm leading-relaxed text-muted-foreground">
                <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-gold" aria-hidden />
                <span>
                  {business.addressLines.map((l) => (
                    <span key={l} className="block">
                      {l}
                    </span>
                  ))}
                </span>
              </address>

              <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <a
                  href={business.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-[image:var(--gradient-gold)] px-5 text-sm font-semibold text-primary-foreground"
                >
                  <Navigation className="h-4 w-4" aria-hidden />
                  Get Directions
                </a>
                <a
                  href={business.phoneHref}
                  className="inline-flex h-12 items-center justify-center gap-2 rounded-full border border-border px-5 text-sm font-semibold text-foreground transition-colors hover:border-gold hover:text-gold"
                >
                  <Phone className="h-4 w-4 text-gold" aria-hidden />
                  Call Now
                </a>
                <a
                  href={waLink()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex h-12 items-center justify-center gap-2 rounded-full border border-border px-5 text-sm font-semibold text-foreground transition-colors hover:border-gold hover:text-gold"
                >
                  <MessageCircle className="h-4 w-4 text-gold" aria-hidden />
                  WhatsApp
                </a>
              </div>
            </div>

            <div className="border-t border-border pt-6 lg:border-l lg:border-t-0 lg:pl-12 lg:pt-0">
              <h3 className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.25em] text-gold">
                <Clock className="h-4 w-4" aria-hidden />
                Working Hours
              </h3>
              <dl className="mt-4 space-y-3">
                {business.hours.map((h) => (
                  <div
                    key={h.label}
                    className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 border-b border-border/60 pb-3 text-sm"
                  >
                    <dt className="text-muted-foreground">{h.label}</dt>
                    <dd className="font-medium text-foreground">{h.value}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

import { useEffect, useState } from "react";
import {
  ArrowRight,
  Gem,
  Shield,
  ShieldCheck,
  Sparkles,
  Droplets,
  Sun,
  Cog,
  Lightbulb,
  Bike,
  Armchair,
  X,
  Check,
  MessageCircle,
  Phone,
} from "lucide-react";
import { services, waLink, business, type Service } from "@/data/site";
import { Reveal } from "./Reveal";

const icons = {
  gem: Gem,
  shield: Shield,
  shieldcheck: ShieldCheck,
  sparkles: Sparkles,
  droplets: Droplets,
  sun: Sun,
  cog: Cog,
  lightbulb: Lightbulb,
  bike: Bike,
  armchair: Armchair,
} as const;

function ServiceCard({ service, onOpen }: { service: Service; onOpen: () => void }) {
  const Icon = icons[service.icon];
  return (
    <button
      type="button"
      onClick={onOpen}
      aria-label={`View details for ${service.name}`}
      className="card-premium group flex h-full flex-col overflow-hidden rounded-xl text-left"
    >
      <div className="relative aspect-4/3 w-full overflow-hidden">
        <img
          src={service.image}
          alt={`${service.name} at AutoHerb Ongole`}
          width={800}
          height={700}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-linear-to-t from-surface via-surface/25 to-transparent" />
        <span className="absolute left-3 top-3 grid h-8 w-8 place-items-center rounded-md border border-gold/40 bg-background/70 backdrop-blur">
          <Icon className="h-4 w-4 text-gold" aria-hidden />
        </span>
      </div>
      <div className="flex flex-1 flex-col gap-2 p-4">
        <h3 className="font-display text-[0.8rem] font-bold uppercase tracking-wide sm:text-sm">
          {service.name}
        </h3>
        <div className="flex flex-1 items-end justify-between gap-3">
          <p className="text-xs leading-snug text-muted-foreground">{service.short}</p>
          <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-gold/50 text-gold transition-colors group-hover:bg-gold group-hover:text-primary-foreground">
            <ArrowRight className="h-4 w-4" aria-hidden />
          </span>
        </div>
      </div>
    </button>
  );
}

function ServiceDetail({ service, onClose }: { service: Service; onClose: () => void }) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={service.name}
      className="fixed inset-0 z-70 flex items-end justify-center bg-background/80 p-0 backdrop-blur-sm sm:items-center sm:p-6"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="max-h-[92dvh] w-full max-w-2xl overflow-y-auto rounded-t-2xl border border-border bg-surface sm:rounded-2xl"
      >
        <div className="relative">
          <img
            src={service.image}
            alt={`${service.name} at AutoHerb Ongole`}
            width={800}
            height={700}
            className="h-52 w-full object-cover sm:h-64"
          />
          <div className="absolute inset-0 bg-linear-to-t from-surface to-transparent" />
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="absolute right-3 top-3 grid h-11 w-11 place-items-center rounded-full border border-border bg-background/80 text-foreground"
          >
            <X className="h-5 w-5" aria-hidden />
          </button>
        </div>

        <div className="space-y-6 p-5 sm:p-7">
          <div>
            <h3 className="font-display text-xl font-bold uppercase tracking-wide sm:text-2xl">
              {service.name}
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              {service.description}
            </p>
          </div>

          <div>
            <h4 className="text-xs font-semibold uppercase tracking-[0.25em] text-gold">
              Benefits
            </h4>
            <ul className="mt-3 grid gap-2 sm:grid-cols-2">
              {service.benefits.map((b) => (
                <li key={b} className="flex items-start gap-2 text-sm text-foreground/90">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-gold" aria-hidden />
                  {b}
                </li>
              ))}
            </ul>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <h4 className="text-xs font-semibold uppercase tracking-[0.25em] text-gold">
                Suitable for
              </h4>
              <p className="mt-2 text-sm text-muted-foreground">{service.suitableFor}</p>
            </div>
            <div>
              <h4 className="text-xs font-semibold uppercase tracking-[0.25em] text-gold">
                Pricing
              </h4>
              <p className="mt-2 text-sm text-muted-foreground">Contact us for pricing</p>
            </div>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row">
            <a
              href={waLink(service.name)}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-12 flex-1 items-center justify-center gap-2 rounded-full bg-(image:--gradient-gold) text-sm font-semibold text-primary-foreground"
            >
              <MessageCircle className="h-4 w-4" aria-hidden />
              Book this service
            </a>
            <a
              href={business.phoneHref}
              className="inline-flex h-12 items-center justify-center gap-2 rounded-full border border-gold/60 px-6 text-sm font-semibold text-gold"
            >
              <Phone className="h-4 w-4" aria-hidden />
              Call Now
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export function ServicesSection() {
  const [active, setActive] = useState<Service | null>(null);

  return (
    <section id="services" className="py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal className="text-center">
          <div className="flex items-center justify-center gap-4">
            <span className="hidden h-px w-16 bg-(image:--gold-line) sm:block" />
            <h2 className="font-display text-2xl font-bold uppercase tracking-[0.3em] sm:text-3xl">
              Our Services
            </h2>
            <span className="hidden h-px w-16 bg-(image:--gold-line) sm:block" />
          </div>
          <p className="mt-3 text-sm text-muted-foreground">Precision care. Elevated protection.</p>
        </Reveal>

        <ul className="mt-10 grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 lg:grid-cols-5">
          {services.map((s, i) => (
            <li key={s.id}>
              <Reveal delay={(i % 5) * 60} className="h-full">
                <ServiceCard service={s} onOpen={() => setActive(s)} />
              </Reveal>
            </li>
          ))}
        </ul>
      </div>

      {active && <ServiceDetail service={active} onClose={() => setActive(null)} />}
    </section>
  );
}

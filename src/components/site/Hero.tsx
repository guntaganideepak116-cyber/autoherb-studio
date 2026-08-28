import { ArrowRight, Gem, ShieldCheck, Car, Sparkles, MapPin, MessageCircle } from "lucide-react";
import heroCar from "@/assets/hero-car.jpg";
import { waLink } from "@/data/site";

const highlights = [
  { icon: Gem, label: "Ceramic\nCoating" },
  { icon: ShieldCheck, label: "PPF" },
  { icon: Car, label: "Detailing" },
  { icon: Sparkles, label: "Car Care" },
];

export function Hero() {
  return (
    <section id="home" className="relative overflow-hidden pt-16 lg:pt-18">
      <div className="relative">
        <img
          src={heroCar}
          alt="Black luxury SUV detailed to a mirror finish inside the AutoHerb Ongole detailing studio"
          width={1600}
          height={1104}
          fetchPriority="high"
          className="absolute inset-0 h-full w-full object-cover object-[78%_center] contrast-[1.05] brightness-[1.15] sm:object-[72%_center] lg:object-[65%_center]"
        />
        <div className="absolute inset-0 bg-linear-to-r from-background via-background/70 to-transparent sm:via-background/62 lg:from-background lg:via-background/45 lg:to-transparent" />
        <div className="absolute inset-0 bg-linear-to-t from-background via-transparent to-background/45" />

        <div className="relative mx-auto flex min-h-152 max-w-7xl items-center px-4 py-16 sm:px-6 lg:min-h-168 lg:px-8 lg:py-24">
          <div className="max-w-xl">
            <p className="text-[0.7rem] font-semibold uppercase tracking-[0.45em] text-foreground/80">
              AutoHerb Ongole
            </p>
            <h1 className="mt-5 font-display text-[2.5rem] font-bold leading-[1.05] tracking-tight [text-shadow:0_2px_18px_rgba(0,0,0,0.75)] sm:text-5xl lg:text-6xl">
              Premium care.
              <span className="mt-1 block gold-text italic">Unmatched finish.</span>
            </h1>
            <p className="mt-5 max-w-md text-sm leading-relaxed text-muted-foreground [text-shadow:0_1px_10px_rgba(0,0,0,0.7)] sm:text-base">
              Professional car detailing, ceramic coating, PPF and more – for a longer lasting
              shine.
            </p>

            <ul className="mt-7 grid w-full max-w-sm grid-cols-4 gap-1.5 sm:max-w-md sm:gap-4">
              {highlights.map(({ icon: Icon, label }) => (
                <li key={label} className="min-w-0 text-center">
                  <Icon className="mx-auto h-4 w-4 text-gold sm:h-5 sm:w-5" aria-hidden />
                  <span className="mt-1.5 block whitespace-pre-line text-[0.6rem] leading-tight text-foreground/90 [text-shadow:0_1px_8px_rgba(0,0,0,0.8)] sm:text-[0.7rem]">
                    {label}
                  </span>
                </li>
              ))}
            </ul>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
              <a
                href={waLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-(image:--gradient-gold) px-6 text-sm font-semibold text-primary-foreground transition-transform hover:-translate-y-0.5"
              >
                <MessageCircle className="h-4 w-4" aria-hidden />
                Book on WhatsApp
              </a>
              <a
                href="#services"
                className="inline-flex h-12 items-center justify-center gap-2 rounded-full border border-border bg-background/60 px-6 text-sm font-semibold text-foreground transition-colors hover:border-gold hover:text-gold"
              >
                Explore Services
                <ArrowRight className="h-4 w-4" aria-hidden />
              </a>
            </div>

            <p className="mt-6 inline-flex items-center gap-2 text-xs text-muted-foreground">
              <MapPin className="h-4 w-4 text-gold" aria-hidden />
              Ongole, Andhra Pradesh
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

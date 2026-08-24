import { Star, Car, Gem, MapPin } from "lucide-react";
import { Reveal } from "./Reveal";

const stats = [
  { icon: Star, value: "4.9 ★", label: "Google Rating" },
  { icon: Car, value: "100+", label: "Happy Customers" },
  { icon: Gem, value: "Premium", label: "Detailing Studio" },
  { icon: MapPin, value: "Ongole", label: "Local Trusted Brand" },
];

export function TrustStats() {
  return (
    <section aria-label="Why customers trust AutoHerb" className="border-y border-border/70">
      <Reveal className="mx-auto grid max-w-7xl grid-cols-2 gap-y-7 px-4 py-8 sm:px-6 lg:grid-cols-4 lg:gap-0 lg:px-8 lg:py-9">
        {stats.map(({ icon: Icon, value, label }, i) => (
          <div
            key={label}
            className={
              "flex items-center justify-center gap-3 " +
              (i > 0 ? "lg:border-l lg:border-border/70" : "")
            }
          >
            <Icon className="h-6 w-6 shrink-0 text-gold sm:h-7 sm:w-7" aria-hidden />
            <div className="min-w-0">
              <p className="font-display text-base font-bold leading-tight sm:text-lg">{value}</p>
              <p className="text-[0.7rem] text-muted-foreground sm:text-xs">{label}</p>
            </div>
          </div>
        ))}
      </Reveal>
    </section>
  );
}

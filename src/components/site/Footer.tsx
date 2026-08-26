import { MapPin, Phone, MessageCircle, Instagram } from "lucide-react";
import { business, waLink } from "@/data/site";
import { Logo } from "./Header";

const quickLinks = [
  { label: "Home", href: "#home" },
  { label: "Services", href: "#services" },
  { label: "Our Work", href: "#work" },
  { label: "Reviews", href: "#reviews" },
  { label: "Location", href: "#location" },
];

const serviceLinks = [
  "Ceramic Coating",
  "PPF",
  "Full Car Spa",
  "Foam Wash",
  "Glass Treatment",
];

export function Footer() {
  return (
    <footer className="border-t border-border bg-surface/60 pb-28 pt-12 lg:pb-12">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:grid-cols-2 sm:px-6 lg:grid-cols-4 lg:px-8">
        <div>
          <Logo />
          <p className="mt-4 text-sm text-muted-foreground">{business.tagline}</p>
          <div className="mt-5 flex items-center gap-3">
            <a
              href={business.instagram}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="AutoHerb Ongole on Instagram"
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border text-gold transition-colors hover:border-gold hover:bg-surface"
            >
              <Instagram className="h-4 w-4" aria-hidden />
            </a>
            <a
              href={waLink()}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="AutoHerb Ongole on WhatsApp"
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border text-gold transition-colors hover:border-gold hover:bg-surface"
            >
              <MessageCircle className="h-4 w-4" aria-hidden />
            </a>
          </div>
        </div>

        <nav aria-label="Quick links">
          <h2 className="text-xs font-semibold uppercase tracking-[0.25em] text-gold">
            Quick Links
          </h2>
          <ul className="mt-4 space-y-2.5">
            {quickLinks.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  className="text-sm text-muted-foreground transition-colors hover:text-gold"
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h2 className="text-xs font-semibold uppercase tracking-[0.25em] text-gold">Services</h2>
          <ul className="mt-4 space-y-2.5">
            {serviceLinks.map((s) => (
              <li key={s}>
                <a
                  href="#services"
                  className="text-sm text-muted-foreground transition-colors hover:text-gold"
                >
                  {s}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="text-xs font-semibold uppercase tracking-[0.25em] text-gold">Contact Us</h2>
          <ul className="mt-4 space-y-3 text-sm text-muted-foreground">
            <li>
              <a
                href={business.phoneHref}
                className="inline-flex items-center gap-2 transition-colors hover:text-gold"
              >
                <Phone className="h-4 w-4 text-gold" aria-hidden />
                {business.phoneDisplay}
              </a>
            </li>
            <li className="flex gap-2">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-gold" aria-hidden />
              <span>
                {business.addressLines.map((l) => (
                  <span key={l} className="block">
                    {l}
                  </span>
                ))}
              </span>
            </li>
            <li>
              <a
                href={waLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 transition-colors hover:text-gold"
              >
                <MessageCircle className="h-4 w-4 text-gold" aria-hidden />
                Book on WhatsApp
              </a>
            </li>
            <li>
              <a
                href={business.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 transition-colors hover:text-gold"
              >
                <Instagram className="h-4 w-4 text-gold" aria-hidden />
                Follow on Instagram
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="mx-auto mt-10 max-w-7xl border-t border-border px-4 pt-6 sm:px-6 lg:px-8">
        <p className="text-xs text-muted-foreground">
          © {new Date().getFullYear()} AutoHerb Ongole. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

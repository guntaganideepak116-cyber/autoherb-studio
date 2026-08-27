import { useEffect, useRef, useState } from "react";
import { Menu, X, Phone, MessageCircle } from "lucide-react";
import { business, waLink } from "@/data/site";
import { cn } from "@/lib/utils";

const primaryNav = [
  { label: "Home", href: "#home" },
  { label: "About Us", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Our Work", href: "#work" },
];

const menuNav = [
  { label: "Reviews", href: "#reviews" },
  { label: "Location", href: "#location" },
  { label: "Apply Jobs", href: "#jobs" },
];

const nav = [...primaryNav, ...menuNav];


export function Logo({ className }: { className?: string }) {
  return (
    <span className={cn("font-display leading-none tracking-tight", className)}>
      <span className="block text-lg font-extrabold sm:text-xl">
        AUTO<span className="text-gold">HERB</span>
      </span>
      <span className="block text-[0.6rem] tracking-[0.42em] text-muted-foreground">ONGOLE</span>
    </span>
  );
}

export function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-colors duration-300",
        scrolled || open
          ? "border-b border-border/70 bg-background/92 backdrop-blur-xl"
          : "border-b border-transparent",
      )}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-3 px-4 sm:px-6 lg:h-[4.5rem] lg:px-8">
        <a href="#home" className="shrink-0" aria-label="AutoHerb Ongole home">
          <Logo />
        </a>

        <nav aria-label="Main" className="hidden items-center gap-7 lg:flex">
          {nav.map((n) => (
            <a
              key={n.href}
              href={n.href}
              className="text-sm font-medium text-foreground/85 transition-colors hover:text-gold"
            >
              {n.label}
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <a
            href={waLink()}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-11 items-center gap-2 rounded-full bg-[image:var(--gradient-gold)] px-5 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90"
          >
            <MessageCircle className="h-4 w-4" aria-hidden />
            Book on WhatsApp
          </a>
          <a
            href={business.phoneHref}
            className="inline-flex h-11 items-center gap-2 rounded-full border border-border px-4 text-sm font-medium text-foreground transition-colors hover:border-gold hover:text-gold"
          >
            <Phone className="h-4 w-4 text-gold" aria-hidden />
            {business.phoneDisplay}
          </a>
        </div>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? "Close menu" : "Open menu"}
          className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-border text-foreground lg:hidden"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {open && (
        <div
          id="mobile-menu"
          className="max-h-[calc(100dvh-4rem)] overflow-y-auto border-t border-border bg-background px-4 pb-8 pt-4 lg:hidden"
        >
          <nav aria-label="Mobile" className="flex flex-col">
            {nav.map((n) => (
              <a
                key={n.href}
                href={n.href}
                onClick={() => setOpen(false)}
                className="border-b border-border/60 py-4 text-base font-medium text-foreground transition-colors hover:text-gold"
              >
                {n.label}
              </a>
            ))}
          </nav>
          <div className="mt-6 flex flex-col gap-3">
            <a
              href={waLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-[image:var(--gradient-gold)] text-sm font-semibold text-primary-foreground"
            >
              <MessageCircle className="h-4 w-4" aria-hidden />
              Book on WhatsApp
            </a>
            <a
              href={business.phoneHref}
              className="inline-flex h-12 items-center justify-center gap-2 rounded-full border border-gold/60 text-sm font-semibold text-gold"
            >
              <Phone className="h-4 w-4" aria-hidden />
              Call Now
            </a>
          </div>
        </div>
      )}
    </header>
  );
}

import { Car, MessageCircle, Phone, CalendarCheck } from "lucide-react";
import { business, waLink } from "@/data/site";
import { Reveal } from "./Reveal";
import { openBooking } from "./BookingModal";

export function FinalCTA() {
  return (
    <section className="pb-20 sm:pb-24 lg:pb-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <div className="flex flex-col gap-6 rounded-2xl bg-(image:--gradient-gold) p-6 text-primary-foreground sm:p-8 lg:flex-row lg:items-center lg:gap-10">
            <Car className="hidden h-10 w-10 shrink-0 sm:block" strokeWidth={1.5} aria-hidden />
            <div className="min-w-0 flex-1">
              <h2 className="font-display text-xl font-bold leading-tight sm:text-2xl">
                Ready to give your car the treatment it deserves?
              </h2>
              <p className="mt-2 text-sm text-primary-foreground/80">
                Book your next detailing session with AutoHerb Ongole.
              </p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row lg:shrink-0">
              <a
                href={waLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-background px-6 text-sm font-semibold text-foreground transition-transform hover:-translate-y-0.5"
              >
                <MessageCircle className="h-4 w-4 text-gold" aria-hidden />
                Book on WhatsApp
              </a>
              <a
                href={business.phoneHref}
                className="inline-flex h-12 items-center justify-center gap-2 rounded-full border border-primary-foreground/40 px-6 text-sm font-semibold text-primary-foreground"
              >
                <Phone className="h-4 w-4" aria-hidden />
                Call Now
              </a>
              <button
                type="button"
                onClick={openBooking}
                className="inline-flex h-12 items-center justify-center gap-2 rounded-full border border-primary-foreground/40 px-6 text-sm font-semibold text-primary-foreground transition-transform hover:-translate-y-0.5"
              >
                <CalendarCheck className="h-4 w-4" aria-hidden />
                Book Now
              </button>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

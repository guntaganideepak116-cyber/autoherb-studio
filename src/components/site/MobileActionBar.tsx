import { Phone, MessageCircle, CalendarCheck } from "lucide-react";
import { business, waLink } from "@/data/site";
import { openBooking } from "./BookingModal";

export function MobileActionBar() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-border bg-background/95 backdrop-blur-lg lg:hidden">
      <div className="grid grid-cols-3 gap-2 px-3 py-2 pb-[max(0.5rem,env(safe-area-inset-bottom))]">
        <a
          href={business.phoneHref}
          aria-label="Call AutoHerb Ongole"
          className="flex h-12 flex-col items-center justify-center rounded-lg border border-border text-[0.65rem] font-semibold tracking-wide text-foreground transition-colors active:border-gold active:text-gold"
        >
          <Phone className="h-4 w-4 text-gold" aria-hidden />
          CALL
        </a>
        <a
          href={waLink()}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Chat with AutoHerb Ongole on WhatsApp"
          className="flex h-12 flex-col items-center justify-center rounded-lg border border-border text-[0.65rem] font-semibold tracking-wide text-foreground transition-colors active:border-gold active:text-gold"
        >
          <MessageCircle className="h-4 w-4 text-gold" aria-hidden />
          WHATSAPP
        </a>
        <button
          type="button"
          onClick={openBooking}
          aria-label="Open the booking form"
          className="flex h-12 flex-col items-center justify-center rounded-lg bg-[image:var(--gradient-gold)] text-[0.65rem] font-semibold tracking-wide text-primary-foreground transition-opacity active:opacity-90"
        >
          <CalendarCheck className="h-4 w-4" aria-hidden />
          BOOK NOW
        </button>
      </div>
    </div>
  );
}

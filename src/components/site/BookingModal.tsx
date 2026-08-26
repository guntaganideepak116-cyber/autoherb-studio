import { useEffect, useState } from "react";
import { X, User, Phone, Car, Wrench, CalendarDays, Clock, MessageSquare } from "lucide-react";
import { business, services } from "@/data/site";

export const BOOKING_EVENT = "autoherb:open-booking";

export function openBooking() {
  window.dispatchEvent(new CustomEvent(BOOKING_EVENT));
}

type Values = {
  name: string;
  phone: string;
  vehicle: string;
  service: string;
  date: string;
  time: string;
  notes: string;
};

const empty: Values = { name: "", phone: "", vehicle: "", service: "", date: "", time: "", notes: "" };

function validate(v: Values) {
  const errors: Partial<Record<keyof Values, string>> = {};
  if (!v.name.trim()) errors.name = "Please enter your name.";
  else if (v.name.trim().length > 60) errors.name = "Please use a shorter name.";
  const digits = v.phone.replace(/\D/g, "");
  if (!digits) errors.phone = "Please enter your phone number.";
  else if (digits.length < 10 || digits.length > 13)
    errors.phone = "Please enter a valid phone number.";
  if (!v.vehicle.trim()) errors.vehicle = "Please tell us your vehicle type or model.";
  if (!v.service) errors.service = "Please select a service.";
  if (!v.date) errors.date = "Please choose a preferred date.";
  if (!v.time) errors.time = "Please choose a preferred time.";
  if (v.notes.length > 500) errors.notes = "Please keep notes under 500 characters.";
  return errors;
}

function buildMessage(v: Values) {
  const lines = [
    "Hello AutoHerb Ongole,",
    "",
    "I would like to book a car care service.",
    "",
    `Name: ${v.name.trim()}`,
    `Phone: ${v.phone.trim()}`,
    `Vehicle: ${v.vehicle.trim()}`,
    `Service: ${v.service}`,
    `Preferred Date: ${v.date}`,
    `Preferred Time: ${v.time}`,
  ];
  if (v.notes.trim()) lines.push("", "Additional Notes:", v.notes.trim());
  lines.push("", "Please confirm my booking.", "", "Thank you.");
  return lines.join("\n");
}

const fieldClass =
  "h-12 w-full rounded-xl border border-border bg-surface/70 px-3 text-sm text-foreground placeholder:text-muted-foreground/70 focus:border-gold focus:outline-none";

export function BookingModal() {
  const [open, setOpen] = useState(false);
  const [values, setValues] = useState<Values>(empty);
  const [errors, setErrors] = useState<Partial<Record<keyof Values, string>>>({});
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const onOpen = () => setOpen(true);
    console.log("[booking] listener ready");
    window.addEventListener(BOOKING_EVENT, onOpen);
    return () => window.removeEventListener(BOOKING_EVENT, onOpen);
  }, []);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  if (!open) return null;

  const set = (k: keyof Values) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    setValues((v) => ({ ...v, [k]: e.target.value }));

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate(values);
    setErrors(errs);
    if (Object.keys(errs).length) return;
    setSubmitting(true);
    const url = `${business.whatsappBase}?text=${encodeURIComponent(buildMessage(values))}`;
    setTimeout(() => {
      window.open(url, "_blank", "noopener,noreferrer");
      setSubmitting(false);
      setOpen(false);
      setValues(empty);
    }, 450);
  };

  const err = (k: keyof Values) =>
    errors[k] ? (
      <p className="mt-1 text-xs text-destructive" role="alert">
        {errors[k]}
      </p>
    ) : null;

  return (
    <div className="fixed inset-0 z-[70] flex items-end justify-center sm:items-center">
      <div
        className="absolute inset-0 bg-black/75 backdrop-blur-sm"
        onClick={() => setOpen(false)}
        aria-hidden
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="booking-title"
        className="relative max-h-[92dvh] w-full overflow-y-auto rounded-t-3xl border border-gold/25 bg-background/97 p-5 shadow-[var(--shadow-gold)] sm:max-w-lg sm:rounded-3xl sm:p-7"
      >
        <button
          type="button"
          onClick={() => setOpen(false)}
          aria-label="Close booking form"
          className="absolute right-4 top-4 inline-flex h-9 w-9 items-center justify-center rounded-full border border-border text-muted-foreground transition-colors hover:border-gold hover:text-gold"
        >
          <X className="h-4 w-4" aria-hidden />
        </button>

        <h2 id="booking-title" className="pr-10 font-display text-2xl font-bold tracking-tight">
          Book Your <span className="gold-text">Car Care</span>
        </h2>
        <p className="mt-2 text-sm text-muted-foreground">
          Tell us what your vehicle needs and we'll get in touch on WhatsApp.
        </p>

        <form onSubmit={onSubmit} noValidate className="mt-6 space-y-4">
          <div>
            <label htmlFor="bk-name" className="mb-1.5 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-gold">
              <User className="h-3.5 w-3.5" aria-hidden /> Name
            </label>
            <input id="bk-name" className={fieldClass} value={values.name} onChange={set("name")} placeholder="Your full name" maxLength={60} autoComplete="name" />
            {err("name")}
          </div>

          <div>
            <label htmlFor="bk-phone" className="mb-1.5 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-gold">
              <Phone className="h-3.5 w-3.5" aria-hidden /> Phone Number
            </label>
            <input id="bk-phone" type="tel" inputMode="tel" className={fieldClass} value={values.phone} onChange={set("phone")} placeholder="10-digit mobile number" maxLength={16} autoComplete="tel" />
            {err("phone")}
          </div>

          <div>
            <label htmlFor="bk-vehicle" className="mb-1.5 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-gold">
              <Car className="h-3.5 w-3.5" aria-hidden /> Vehicle Type / Model
            </label>
            <input id="bk-vehicle" className={fieldClass} value={values.vehicle} onChange={set("vehicle")} placeholder="e.g. Hyundai Creta" maxLength={60} />
            {err("vehicle")}
          </div>

          <div>
            <label htmlFor="bk-service" className="mb-1.5 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-gold">
              <Wrench className="h-3.5 w-3.5" aria-hidden /> Select Service
            </label>
            <select id="bk-service" className={fieldClass} value={values.service} onChange={set("service")}>
              <option value="">Choose a service</option>
              {services.map((s) => (
                <option key={s.id} value={s.name}>
                  {s.name}
                </option>
              ))}
              <option value="Other / Not sure">Other / Not sure</option>
            </select>
            {err("service")}
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label htmlFor="bk-date" className="mb-1.5 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-gold">
                <CalendarDays className="h-3.5 w-3.5" aria-hidden /> Date
              </label>
              <input id="bk-date" type="date" className={fieldClass} value={values.date} onChange={set("date")} min={new Date().toISOString().slice(0, 10)} />
              {err("date")}
            </div>
            <div>
              <label htmlFor="bk-time" className="mb-1.5 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-gold">
                <Clock className="h-3.5 w-3.5" aria-hidden /> Time
              </label>
              <input id="bk-time" type="time" className={fieldClass} value={values.time} onChange={set("time")} />
              {err("time")}
            </div>
          </div>

          <div>
            <label htmlFor="bk-notes" className="mb-1.5 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-gold">
              <MessageSquare className="h-3.5 w-3.5" aria-hidden /> Additional Notes (optional)
            </label>
            <textarea id="bk-notes" rows={3} maxLength={500} className="w-full rounded-xl border border-border bg-surface/70 p-3 text-sm text-foreground placeholder:text-muted-foreground/70 focus:border-gold focus:outline-none" value={values.notes} onChange={set("notes")} placeholder="Anything we should know?" />
            {err("notes")}
          </div>

          <div className="flex gap-3 pt-1 pb-[env(safe-area-inset-bottom)]">
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="h-12 flex-1 rounded-full border border-border text-sm font-semibold text-foreground transition-colors hover:border-gold hover:text-gold"
            >
              Skip
            </button>
            <button
              type="submit"
              disabled={submitting}
              className="h-12 flex-[1.4] rounded-full bg-[image:var(--gradient-gold)] text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90 disabled:opacity-70"
            >
              {submitting ? "Opening WhatsApp…" : "Submit Booking"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

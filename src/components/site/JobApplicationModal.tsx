import { useEffect, useState } from "react";
import {
  X,
  User,
  Phone,
  Mail,
  Briefcase,
  Clock,
  Paperclip,
  MessageSquare,
  CheckCircle2,
} from "lucide-react";
import { jobs } from "@/data/jobs";

export const APPLY_EVENT = "autoherb:open-apply";

export function openApply(position?: string) {
  window.dispatchEvent(new CustomEvent(APPLY_EVENT, { detail: { position } }));
}

// V1: frontend-only submission. Swap `submitApplication` for a real API call later.
export type JobApplication = {
  fullName: string;
  phone: string;
  email: string;
  position: string;
  experience: string;
  resumeFileName: string;
  message: string;
};

const empty: JobApplication = {
  fullName: "",
  phone: "",
  email: "",
  position: "",
  experience: "",
  resumeFileName: "",
  message: "",
};

function validate(v: JobApplication) {
  const errors: Partial<Record<keyof JobApplication, string>> = {};
  if (!v.fullName.trim()) errors.fullName = "Please enter your full name.";
  const digits = v.phone.replace(/\D/g, "");
  if (digits.length < 10 || digits.length > 13) errors.phone = "Please enter a valid phone number.";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.email.trim()))
    errors.email = "Please enter a valid email.";
  if (!v.position) errors.position = "Please select a position.";
  if (!v.experience.trim()) errors.experience = "Please share your experience.";
  if (v.message.length > 500) errors.message = "Please keep your message under 500 characters.";
  return errors;
}

const fieldClass =
  "h-12 w-full rounded-xl border border-border bg-surface/70 px-3 text-sm text-foreground placeholder:text-muted-foreground/70 focus:border-gold focus:outline-none";
const labelClass =
  "mb-1.5 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-gold";

export function JobApplicationModal() {
  const [open, setOpen] = useState(false);
  const [values, setValues] = useState<JobApplication>(empty);
  const [errors, setErrors] = useState<Partial<Record<keyof JobApplication, string>>>({});
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);

  useEffect(() => {
    const onOpen = (e: Event) => {
      const position = (e as CustomEvent<{ position?: string }>).detail?.position ?? "";
      setValues({ ...empty, position });
      setErrors({});
      setDone(false);
      setOpen(true);
    };
    window.addEventListener(APPLY_EVENT, onOpen);
    return () => window.removeEventListener(APPLY_EVENT, onOpen);
  }, []);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  if (!open) return null;

  const set =
    (k: keyof JobApplication) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
      setValues((v) => ({ ...v, [k]: e.target.value }));

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate(values);
    setErrors(errs);
    if (Object.keys(errs).length) return;
    setSubmitting(true);
    // TODO(v2): send `values` to the backend / Admin Dashboard.
    setTimeout(() => {
      setSubmitting(false);
      setDone(true);
    }, 600);
  };

  const err = (k: keyof JobApplication) =>
    errors[k] ? (
      <p className="mt-1 text-xs text-destructive" role="alert">
        {errors[k]}
      </p>
    ) : null;

  return (
    <div className="fixed inset-0 z-70 flex items-end justify-center sm:items-center">
      <div
        className="absolute inset-0 bg-black/75 backdrop-blur-sm"
        onClick={() => setOpen(false)}
        aria-hidden
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="apply-title"
        className="relative max-h-[92dvh] w-full overflow-y-auto rounded-t-3xl border border-gold/25 bg-background/97 p-5 shadow-(--shadow-gold) sm:max-w-lg sm:rounded-3xl sm:p-7"
      >
        <button
          type="button"
          onClick={() => setOpen(false)}
          aria-label="Close application form"
          className="absolute right-4 top-4 inline-flex h-9 w-9 items-center justify-center rounded-full border border-border text-muted-foreground transition-colors hover:border-gold hover:text-gold"
        >
          <X className="h-4 w-4" aria-hidden />
        </button>

        <h2 id="apply-title" className="pr-10 font-display text-2xl font-bold tracking-tight">
          Apply to <span className="gold-text">AutoHerb</span>
        </h2>

        {done ? (
          <div className="py-10 text-center">
            <CheckCircle2 className="mx-auto h-12 w-12 text-gold" strokeWidth={1.5} aria-hidden />
            <p className="mt-4 font-display text-lg font-bold uppercase tracking-wide">
              Application received
            </p>
            <p className="mx-auto mt-2 max-w-sm text-sm text-muted-foreground">
              Thank you {values.fullName.trim().split(" ")[0]}. Our team will review your details
              and reach out if there's a fit.
            </p>
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="mt-6 h-12 w-full rounded-full bg-(image:--gradient-gold) text-sm font-semibold text-primary-foreground sm:w-56"
            >
              Close
            </button>
          </div>
        ) : (
          <>
            <p className="mt-2 text-sm text-muted-foreground">
              Share your details and we'll get back to you about the role.
            </p>
            <form onSubmit={onSubmit} noValidate className="mt-6 space-y-4">
              <div>
                <label htmlFor="ap-name" className={labelClass}>
                  <User className="h-3.5 w-3.5" aria-hidden /> Full Name
                </label>
                <input
                  id="ap-name"
                  className={fieldClass}
                  value={values.fullName}
                  onChange={set("fullName")}
                  placeholder="Your full name"
                  maxLength={60}
                  autoComplete="name"
                />
                {err("fullName")}
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label htmlFor="ap-phone" className={labelClass}>
                    <Phone className="h-3.5 w-3.5" aria-hidden /> Phone Number
                  </label>
                  <input
                    id="ap-phone"
                    type="tel"
                    inputMode="tel"
                    className={fieldClass}
                    value={values.phone}
                    onChange={set("phone")}
                    placeholder="10-digit mobile"
                    maxLength={16}
                    autoComplete="tel"
                  />
                  {err("phone")}
                </div>
                <div>
                  <label htmlFor="ap-email" className={labelClass}>
                    <Mail className="h-3.5 w-3.5" aria-hidden /> Email
                  </label>
                  <input
                    id="ap-email"
                    type="email"
                    className={fieldClass}
                    value={values.email}
                    onChange={set("email")}
                    placeholder="you@email.com"
                    autoComplete="email"
                  />
                  {err("email")}
                </div>
              </div>

              <div>
                <label htmlFor="ap-position" className={labelClass}>
                  <Briefcase className="h-3.5 w-3.5" aria-hidden /> Position
                </label>
                <select
                  id="ap-position"
                  className={fieldClass}
                  value={values.position}
                  onChange={set("position")}
                >
                  <option value="">Choose a position</option>
                  {jobs.map((j) => (
                    <option key={j.id} value={j.title}>
                      {j.title}
                    </option>
                  ))}
                  <option value="Other">Other</option>
                </select>
                {err("position")}
              </div>

              <div>
                <label htmlFor="ap-exp" className={labelClass}>
                  <Clock className="h-3.5 w-3.5" aria-hidden /> Experience
                </label>
                <input
                  id="ap-exp"
                  className={fieldClass}
                  value={values.experience}
                  onChange={set("experience")}
                  placeholder="e.g. 2 years in car detailing"
                  maxLength={80}
                />
                {err("experience")}
              </div>

              <div>
                <label htmlFor="ap-resume" className={labelClass}>
                  <Paperclip className="h-3.5 w-3.5" aria-hidden /> Resume (optional)
                </label>
                <input
                  id="ap-resume"
                  type="file"
                  accept=".pdf,.doc,.docx"
                  onChange={(e) =>
                    setValues((v) => ({ ...v, resumeFileName: e.target.files?.[0]?.name ?? "" }))
                  }
                  className="w-full rounded-xl border border-border bg-surface/70 p-3 text-sm text-muted-foreground file:mr-3 file:rounded-full file:border-0 file:bg-(image:--gradient-gold) file:px-4 file:py-2 file:text-xs file:font-semibold file:text-primary-foreground focus:border-gold focus:outline-none"
                />
              </div>

              <div>
                <label htmlFor="ap-msg" className={labelClass}>
                  <MessageSquare className="h-3.5 w-3.5" aria-hidden /> Short Message
                </label>
                <textarea
                  id="ap-msg"
                  rows={3}
                  maxLength={500}
                  className="w-full rounded-xl border border-border bg-surface/70 p-3 text-sm text-foreground placeholder:text-muted-foreground/70 focus:border-gold focus:outline-none"
                  value={values.message}
                  onChange={set("message")}
                  placeholder="Tell us a little about yourself"
                />
                {err("message")}
              </div>

              <div className="flex gap-3 pt-1 pb-[env(safe-area-inset-bottom)]">
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="h-12 flex-1 rounded-full border border-border text-sm font-semibold text-foreground transition-colors hover:border-gold hover:text-gold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="h-12 flex-[1.6] rounded-full bg-(image:--gradient-gold) text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90 disabled:opacity-70"
                >
                  {submitting ? "Submitting…" : "Submit Application"}
                </button>
              </div>
            </form>
          </>
        )}
      </div>
    </div>
  );
}

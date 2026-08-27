import { MapPin, Briefcase, Clock, Building2, ArrowRight } from "lucide-react";
import { jobs } from "@/data/jobs";
import { Reveal } from "./Reveal";
import { openApply } from "./JobApplicationModal";

export function JobsSection() {
  return (
    <section id="jobs" className="scroll-mt-20 pb-16 sm:pb-20 lg:pb-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-gold">Apply Jobs</p>
          <h2 className="mt-3 max-w-2xl font-display text-2xl font-bold uppercase leading-tight tracking-wide sm:text-3xl">
            Build Your Career With <span className="gold-text">AutoHerb</span>
          </h2>
          <p className="mt-3 max-w-xl text-sm text-muted-foreground">
            Join our detailing crew in Ongole. Open roles are listed below.
          </p>
        </Reveal>

        <ul className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {jobs.map((job, i) => (
            <li key={job.id}>
              <Reveal delay={i * 70}>
                <article className="flex h-full flex-col rounded-2xl border border-border bg-surface p-5 transition-colors hover:border-gold/50 sm:p-6">
                  <h3 className="font-display text-base font-bold uppercase leading-snug tracking-wide sm:text-lg">
                    {job.title}
                  </h3>
                  <dl className="mt-4 grid gap-2.5 text-sm text-muted-foreground">
                    <div className="flex min-w-0 items-start gap-2">
                      <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-gold" aria-hidden />
                      <span className="min-w-0">{job.location}</span>
                    </div>
                    <div className="flex min-w-0 items-start gap-2">
                      <Briefcase className="mt-0.5 h-4 w-4 shrink-0 text-gold" aria-hidden />
                      <span className="min-w-0">{job.type}</span>
                    </div>
                    <div className="flex min-w-0 items-start gap-2">
                      <Clock className="mt-0.5 h-4 w-4 shrink-0 text-gold" aria-hidden />
                      <span className="min-w-0">{job.experience}</span>
                    </div>
                    <div className="flex min-w-0 items-start gap-2">
                      <Building2 className="mt-0.5 h-4 w-4 shrink-0 text-gold" aria-hidden />
                      <span className="min-w-0">{job.department}</span>
                    </div>
                  </dl>
                  <p className="mt-4 text-sm leading-relaxed text-foreground/85">{job.description}</p>
                  <button
                    type="button"
                    onClick={() => openApply(job.title)}
                    className="mt-6 inline-flex h-11 w-full items-center justify-center gap-2 rounded-full bg-[image:var(--gradient-gold)] px-5 text-sm font-semibold uppercase tracking-wide text-primary-foreground transition-opacity hover:opacity-90"
                  >
                    Apply Now
                    <ArrowRight className="h-4 w-4" aria-hidden />
                  </button>
                </article>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

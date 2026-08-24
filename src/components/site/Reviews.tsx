import { useState } from "react";
import { ChevronLeft, ChevronRight, Quote, Star } from "lucide-react";
import reviewCar from "@/assets/review-car.jpg";
import { reviews } from "@/data/site";
import { Reveal } from "./Reveal";

export function ReviewsCarousel() {
  const [i, setI] = useState(0);
  const total = reviews.length;
  const go = (n: number) => setI((n + total) % total);
  const active = reviews[i]!;

  return (
    <section id="reviews" className="pb-16 sm:pb-20 lg:pb-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <div
            className="overflow-hidden rounded-2xl border border-border bg-surface"
            role="region"
            aria-roledescription="carousel"
            aria-label="Customer reviews"
          >
            <div className="grid lg:grid-cols-[1fr_1.2fr_0.9fr]">
              <div className="flex flex-col justify-center gap-4 p-6 sm:p-8">
                <h2 className="font-display text-xl font-bold uppercase leading-tight tracking-wide sm:text-2xl">
                  What Our
                  <span className="block">Customers Say</span>
                </h2>
                <div className="flex gap-1" aria-label="5 out of 5 stars">
                  {Array.from({ length: 5 }).map((_, s) => (
                    <Star key={s} className="h-5 w-5 fill-gold text-gold" aria-hidden />
                  ))}
                </div>
              </div>

              <div className="flex flex-col justify-center gap-5 border-t border-border p-6 sm:p-8 lg:border-l lg:border-t-0">
                <blockquote className="flex gap-3">
                  <Quote className="h-6 w-6 shrink-0 text-gold" aria-hidden />
                  <div>
                    <p className="text-base leading-relaxed text-foreground sm:text-lg">
                      “{active.quote}”
                    </p>
                    <footer className="mt-4 text-sm text-muted-foreground">
                      – {active.name}, {active.location}{" "}
                      <span className="text-gold/80">· Google Review</span>
                    </footer>
                  </div>
                </blockquote>

                <div className="flex items-center gap-4">
                  <button
                    type="button"
                    onClick={() => go(i - 1)}
                    aria-label="Previous review"
                    className="grid h-11 w-11 place-items-center rounded-full border border-border text-foreground transition-colors hover:border-gold hover:text-gold"
                  >
                    <ChevronLeft className="h-5 w-5" aria-hidden />
                  </button>
                  <button
                    type="button"
                    onClick={() => go(i + 1)}
                    aria-label="Next review"
                    className="grid h-11 w-11 place-items-center rounded-full border border-border text-foreground transition-colors hover:border-gold hover:text-gold"
                  >
                    <ChevronRight className="h-5 w-5" aria-hidden />
                  </button>
                  <div className="ml-auto flex gap-2">
                    {reviews.map((r, idx) => (
                      <button
                        key={r.name}
                        type="button"
                        onClick={() => setI(idx)}
                        aria-label={`Show review ${idx + 1}`}
                        aria-current={idx === i}
                        className={
                          "h-2.5 w-2.5 rounded-full transition-colors " +
                          (idx === i ? "bg-gold" : "bg-border")
                        }
                      />
                    ))}
                  </div>
                </div>
              </div>

              <img
                src={reviewCar}
                alt="AutoHerb Ongole detailer polishing a customer's black SUV"
                width={900}
                height={700}
                loading="lazy"
                className="hidden h-full w-full object-cover lg:block"
              />
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

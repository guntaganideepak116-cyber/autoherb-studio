import { useCallback, useEffect, useRef, useState } from "react";
import { ArrowRight, ChevronLeft, ChevronRight, Users, Package, ShieldCheck, Star } from "lucide-react";
import beforeImg from "@/assets/before.jpg";
import afterImg from "@/assets/after.jpg";
import { waLink } from "@/data/site";
import { Reveal } from "./Reveal";

function Slider() {
  const wrapRef = useRef<HTMLDivElement | null>(null);
  const [pos, setPos] = useState(50);
  const dragging = useRef(false);

  const setFromClientX = useCallback((clientX: number) => {
    const el = wrapRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const pct = ((clientX - rect.left) / rect.width) * 100;
    setPos(Math.min(100, Math.max(0, pct)));
  }, []);

  useEffect(() => {
    const move = (e: PointerEvent) => dragging.current && setFromClientX(e.clientX);
    const up = () => (dragging.current = false);
    window.addEventListener("pointermove", move);
    window.addEventListener("pointerup", up);
    return () => {
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerup", up);
    };
  }, [setFromClientX]);

  return (
    <div
      ref={wrapRef}
      className="relative aspect-[4/3] w-full touch-pan-y select-none overflow-hidden rounded-xl border border-border sm:aspect-[16/10]"
      onPointerDown={(e) => {
        dragging.current = true;
        setFromClientX(e.clientX);
      }}
    >
      <img
        src={afterImg}
        alt="Car after professional detailing at AutoHerb Ongole — glossy black mirror finish"
        width={1200}
        height={800}
        loading="lazy"
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div
        className="absolute inset-0 overflow-hidden"
        style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}
      >
        <img
          src={beforeImg}
          alt="Car before detailing — dull, dusty paint"
          width={1200}
          height={800}
          loading="lazy"
          className="h-full w-full object-cover"
        />
      </div>

      <span className="absolute bottom-3 left-3 rounded-md bg-background/85 px-3 py-1 text-[0.7rem] font-semibold tracking-widest">
        BEFORE
      </span>
      <span className="absolute bottom-3 right-3 rounded-md bg-[image:var(--gradient-gold)] px-3 py-1 text-[0.7rem] font-semibold tracking-widest text-primary-foreground">
        AFTER
      </span>

      <div
        className="pointer-events-none absolute inset-y-0 w-px bg-gold"
        style={{ left: `${pos}%` }}
      />
      <input
        type="range"
        min={0}
        max={100}
        value={Math.round(pos)}
        onChange={(e) => setPos(Number(e.target.value))}
        aria-label="Before and after comparison slider"
        className="absolute inset-0 h-full w-full cursor-ew-resize opacity-0"
      />
      <span
        aria-hidden
        className="pointer-events-none absolute top-1/2 grid h-11 w-11 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border border-gold bg-background/85 text-gold"
        style={{ left: `${pos}%` }}
      >
        <ChevronLeft className="h-3.5 w-3.5" />
        <ChevronRight className="absolute h-3.5 w-3.5 translate-x-[7px]" />
      </span>
    </div>
  );
}

const reasons = [
  { icon: Users, label: "Trained\nProfessionals" },
  { icon: Package, label: "Premium\nProducts" },
  { icon: ShieldCheck, label: "Long Lasting\nProtection" },
  { icon: Star, label: "Customer\nSatisfaction" },
];

export function BeforeAfterSection() {
  return (
    <section id="work" className="pb-16 sm:pb-20 lg:pb-24">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-[1.35fr_1fr] lg:items-center lg:gap-14 lg:px-8">
        <Reveal>
          <div className="relative overflow-hidden rounded-2xl border border-border bg-surface p-3 sm:p-4">
            <div className="grid gap-5 lg:grid-cols-[1.2fr_1fr] lg:items-center">
              <Slider />
              <div className="px-1 pb-2 lg:px-3">
                <h2 className="font-display text-xl font-bold uppercase leading-tight tracking-wide sm:text-2xl">
                  Transformations
                  <span className="block">That Speak</span>
                </h2>
                <p className="mt-3 text-sm text-muted-foreground">
                  See the remarkable difference professional detailing makes.
                </p>
                <a
                  href={waLink("Full Spa")}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-5 inline-flex h-11 items-center gap-2 rounded-full bg-[image:var(--gradient-gold)] px-5 text-sm font-semibold text-primary-foreground"
                >
                  View More Work
                  <ArrowRight className="h-4 w-4" aria-hidden />
                </a>
              </div>
            </div>
          </div>
        </Reveal>

        <Reveal delay={80}>
          <h2 className="text-center font-display text-xl font-bold uppercase leading-tight tracking-wide sm:text-2xl lg:text-left">
            Why Choose AutoHerb <span className="gold-text">Ongole?</span>
          </h2>
          <ul className="mt-8 grid grid-cols-2 gap-6 sm:grid-cols-4 lg:grid-cols-2">
            {reasons.map(({ icon: Icon, label }) => (
              <li key={label} className="text-center lg:text-left">
                <Icon className="mx-auto h-7 w-7 text-gold lg:mx-0" strokeWidth={1.5} aria-hidden />
                <p className="mt-3 whitespace-pre-line text-xs font-medium leading-snug text-foreground/90 sm:text-sm">
                  {label}
                </p>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}

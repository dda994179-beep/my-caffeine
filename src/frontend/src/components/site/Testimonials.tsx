import { type Lang, UI } from "@/lib/i18n";
import { TESTIMONIALS } from "@/lib/site-data";
import { ChevronLeft, ChevronRight, Quote, Star } from "lucide-react";
import { useCallback, useEffect, useState } from "react";

interface TestimonialsProps {
  lang: Lang;
}

export function Testimonials({ lang }: TestimonialsProps) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const total = TESTIMONIALS.length;

  const go = useCallback(
    (next: number) => setIndex(((next % total) + total) % total),
    [total],
  );

  useEffect(() => {
    if (paused) return;
    const timer = window.setInterval(
      () => setIndex((current) => (current + 1) % total),
      6000,
    );
    return () => window.clearInterval(timer);
  }, [paused, total]);

  const active = TESTIMONIALS[index];
  if (!active) return null;

  return (
    <section
      id="testimonials"
      data-ocid="testimonials.section"
      className="relative py-20 lg:py-28"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-primary">
            04 — {UI.testimonialsTitle[lang]}
          </span>
          <h2
            className={`mt-3 font-display text-3xl font-bold tracking-tight text-foreground sm:text-4xl ${
              lang === "km" ? "font-khmer leading-[1.5]" : ""
            }`}
          >
            {UI.testimonialsTitle[lang]}
          </h2>
          <p
            className={`mt-4 text-sm text-muted-foreground sm:text-base ${lang === "km" ? "font-khmer" : ""}`}
          >
            {UI.testimonialsSubtitle[lang]}
          </p>
        </div>

        <div
          className="relative mt-12"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onFocus={() => setPaused(true)}
          onBlur={() => setPaused(false)}
        >
          <div className="relative overflow-hidden rounded-2xl border border-border bg-card p-8 shadow-elevated sm:p-12">
            <Quote
              className="absolute right-8 top-8 h-16 w-16 text-primary/10"
              aria-hidden="true"
            />

            <div key={active.id} className="animate-fade-up">
              <div
                className="flex items-center gap-1"
                aria-label={`${active.rating} / 5`}
              >
                {Array.from(
                  { length: 5 },
                  (_, i) => `star-${active.id}-${i}`,
                ).map((starId, i) => (
                  <Star
                    key={starId}
                    className={`h-4 w-4 ${
                      i < active.rating
                        ? "fill-primary text-primary"
                        : "text-muted-foreground/40"
                    }`}
                  />
                ))}
              </div>

              <blockquote
                data-ocid="testimonials.quote"
                className={`mt-6 max-w-3xl text-lg leading-relaxed text-foreground sm:text-xl ${
                  lang === "km" ? "font-khmer leading-[1.85]" : ""
                }`}
              >
                “{active.quote[lang]}”
              </blockquote>

              <div className="mt-8 flex items-center gap-4">
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-gradient-primary font-display text-sm font-bold text-primary-foreground">
                  {active.name[lang].slice(0, 1)}
                </span>
                <div className="min-w-0">
                  <p
                    className={`truncate font-display text-sm font-semibold text-foreground ${lang === "km" ? "font-khmer" : ""}`}
                  >
                    {active.name[lang]}
                  </p>
                  <p
                    className={`truncate text-xs text-muted-foreground ${lang === "km" ? "font-khmer" : ""}`}
                  >
                    {active.bike[lang]}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 flex items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              {TESTIMONIALS.map((item, i) => (
                <button
                  key={item.id}
                  type="button"
                  data-ocid={`testimonials.dot.${i + 1}`}
                  onClick={() => go(i)}
                  aria-label={`${i + 1} / ${total}`}
                  aria-current={i === index}
                  className={`h-2 rounded-full transition-smooth focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background ${
                    i === index
                      ? "w-8 bg-primary"
                      : "w-2 bg-muted-foreground/40 hover:bg-muted-foreground/70"
                  }`}
                />
              ))}
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                data-ocid="testimonials.prev_button"
                onClick={() => go(index - 1)}
                aria-label={UI.prev[lang]}
                className="grid h-11 w-11 place-items-center rounded-full border border-border bg-card text-foreground transition-smooth hover:border-primary/60 hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <button
                type="button"
                data-ocid="testimonials.next_button"
                onClick={() => go(index + 1)}
                aria-label={UI.next[lang]}
                className="grid h-11 w-11 place-items-center rounded-full border border-border bg-card text-foreground transition-smooth hover:border-primary/60 hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

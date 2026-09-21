import { Button } from "@/components/ui/button";
import { useCountUp } from "@/hooks/use-count-up";
import { type Bilingual, type Lang, SHOP, UI } from "@/lib/i18n";
import { STATS } from "@/lib/site-data";
import { ChevronDown, Phone, Wrench } from "lucide-react";

interface HeroProps {
  lang: Lang;
}

function Stat({
  value,
  suffix,
  label,
  lang,
}: { value: number; suffix: string; label: Bilingual; lang: Lang }) {
  const { ref, value: current } = useCountUp(value);
  return (
    <div className="flex flex-col items-center gap-1 px-4 text-center sm:items-start sm:text-left">
      <span
        ref={ref}
        className="font-display text-3xl font-bold tabular-nums text-gradient-amber sm:text-4xl"
      >
        {current.toLocaleString()}
        {suffix}
      </span>
      <span
        className={`text-xs text-muted-foreground sm:text-sm ${lang === "km" ? "font-khmer" : ""}`}
      >
        {label[lang]}
      </span>
    </div>
  );
}

export function Hero({ lang }: HeroProps) {
  const scrollTo = (id: string) =>
    document
      .getElementById(id)
      ?.scrollIntoView({ behavior: "smooth", block: "start" });

  return (
    <section
      id="hero"
      data-ocid="hero.section"
      className="relative flex min-h-[calc(100svh-4rem)] items-center overflow-hidden lg:min-h-[calc(100svh-5rem)]"
    >
      <div className="mx-auto grid w-full max-w-7xl items-center gap-12 px-4 py-16 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16 lg:px-8 lg:py-24">
        <div className="flex flex-col items-start gap-6">
          <span className="inline-flex items-center gap-2 rounded-full border border-primary/40 bg-primary/10 px-4 py-1.5 font-mono text-[11px] uppercase tracking-[0.18em] text-primary">
            <Wrench className="h-3.5 w-3.5" />
            <span
              className={
                lang === "km" ? "font-khmer tracking-normal" : undefined
              }
            >
              {UI.heroEyebrow[lang]}
            </span>
          </span>

          <h1
            data-ocid="hero.heading"
            className={`max-w-2xl text-balance font-display text-4xl font-bold leading-[1.15] tracking-tight text-foreground sm:text-5xl lg:text-6xl ${
              lang === "km" ? "font-khmer leading-[1.5]" : ""
            }`}
          >
            {lang === "km" ? (
              <>
                ហាងជួសជុលម៉ូតូដីត{" "}
                <span className="text-gradient-amber">DIT RACING</span>
              </>
            ) : (
              <>
                <span className="text-gradient-amber">DIT RACING</span>{" "}
                Motorcycle Workshop
              </>
            )}
          </h1>

          <p
            className={`font-display text-lg font-medium text-foreground/90 sm:text-xl ${
              lang === "km" ? "font-khmer" : ""
            }`}
          >
            {SHOP.tagline[lang]}
          </p>

          <p
            className={`max-w-xl text-sm leading-relaxed text-muted-foreground sm:text-base ${
              lang === "km" ? "font-khmer" : ""
            }`}
          >
            {UI.heroSupport[lang]}
          </p>

          <div className="flex w-full flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
            {SHOP.phones.map((phone, index) => (
              <a
                key={phone}
                href={`tel:${phone.replace(/\s/g, "")}`}
                data-ocid={`hero.call_button.${index + 1}`}
                className="inline-flex min-h-[48px] items-center justify-center gap-2 rounded-full border border-primary/50 bg-primary/10 px-5 font-mono text-sm font-semibold text-primary transition-smooth hover:bg-primary/20 hover:shadow-glow focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
              >
                <Phone className="h-4 w-4" />
                {phone}
              </a>
            ))}
            <Button
              type="button"
              data-ocid="hero.book_button"
              onClick={() => scrollTo("booking")}
              className="min-h-[48px] rounded-full bg-gradient-primary px-6 font-semibold text-primary-foreground shadow-glow transition-smooth hover:brightness-110"
            >
              <span className={lang === "km" ? "font-khmer" : undefined}>
                {UI.bookRepair[lang]}
              </span>
            </Button>
          </div>

          <div className="mt-4 grid w-full grid-cols-1 gap-6 border-t border-border pt-8 sm:grid-cols-3">
            {STATS.map((stat) => (
              <Stat
                key={stat.id}
                value={stat.value}
                suffix={stat.suffix}
                label={stat.label}
                lang={lang}
              />
            ))}
          </div>
        </div>

        <div className="relative">
          <div
            className="absolute -inset-4 rounded-3xl bg-primary/10 blur-3xl"
            aria-hidden="true"
          />
          <div className="relative overflow-hidden rounded-2xl border border-border shadow-elevated">
            <img
              src="/assets/generated/hero-workshop.dim_1600x900.jpg"
              alt={
                lang === "km"
                  ? "ជាងជំនាញកំពុងជួសជុលម៉ូតូក្នុងហាងដីត រេស៊ីង"
                  : "Mechanic repairing a motorcycle in the DIT RACING workshop"
              }
              width={1600}
              height={900}
              className="h-full w-full object-cover"
              loading="eager"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />
            <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between gap-3 rounded-xl border border-border/70 bg-background/70 px-4 py-3 backdrop-blur-md">
              <div className="min-w-0">
                <p className="font-display text-sm font-semibold text-foreground">
                  DIT RACING
                </p>
                <p
                  className={`truncate text-xs text-muted-foreground ${lang === "km" ? "font-khmer" : ""}`}
                >
                  {SHOP.address[lang]}
                </p>
              </div>
              <span className="shrink-0 rounded-full bg-primary/15 px-3 py-1 font-mono text-[11px] uppercase tracking-wider text-primary">
                {SHOP.hours[lang].split("·")[0].trim()}
              </span>
            </div>
          </div>
        </div>
      </div>

      <button
        type="button"
        data-ocid="hero.scroll_cue"
        onClick={() => scrollTo("services")}
        aria-label={UI.scroll[lang]}
        className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-muted-foreground transition-smooth hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring lg:flex"
      >
        <span
          className={`text-[11px] uppercase tracking-[0.2em] ${lang === "km" ? "font-khmer tracking-normal" : ""}`}
        >
          {UI.scroll[lang]}
        </span>
        <ChevronDown className="h-5 w-5 animate-scroll-cue" />
      </button>
    </section>
  );
}

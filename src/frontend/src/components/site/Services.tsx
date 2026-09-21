import { type Lang, UI } from "@/lib/i18n";
import { SERVICES, type ServiceItem } from "@/lib/site-data";
import {
  ArrowRight,
  BatteryCharging,
  CircleDot,
  Cog,
  Droplets,
  Gauge,
  type LucideIcon,
  ScanLine,
} from "lucide-react";

const ICONS: Record<string, LucideIcon> = {
  engine: Cog,
  oil: Droplets,
  brake: CircleDot,
  bolt: BatteryCharging,
  tire: Gauge,
  scan: ScanLine,
};

interface ServicesProps {
  lang: Lang;
  onBookService: (serviceId: string) => void;
}

export function Services({ lang, onBookService }: ServicesProps) {
  return (
    <section
      id="services"
      data-ocid="services.section"
      className="relative border-y border-border bg-secondary/25 py-20 lg:py-28"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-primary">
            01 — {UI.servicesTitle[lang]}
          </span>
          <h2
            className={`mt-3 font-display text-3xl font-bold tracking-tight text-foreground sm:text-4xl ${
              lang === "km" ? "font-khmer leading-[1.5]" : ""
            }`}
          >
            {UI.servicesTitle[lang]}
          </h2>
          <p
            className={`mt-4 text-sm text-muted-foreground sm:text-base ${lang === "km" ? "font-khmer" : ""}`}
          >
            {UI.servicesSubtitle[lang]}
          </p>
        </div>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((service, index) => (
            <ServiceCard
              key={service.id}
              service={service}
              index={index}
              lang={lang}
              onBook={() => onBookService(service.id)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function ServiceCard({
  service,
  index,
  lang,
  onBook,
}: {
  service: ServiceItem;
  index: number;
  lang: Lang;
  onBook: () => void;
}) {
  const Icon = ICONS[service.icon] ?? Cog;
  return (
    <article
      data-ocid={`services.card.${index + 1}`}
      className="group relative flex flex-col overflow-hidden rounded-xl border border-border bg-card p-6 hover-lift hover-glow"
    >
      <span
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/70 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"
      />
      <span className="grid h-12 w-12 place-items-center rounded-lg border border-primary/30 bg-primary/10 text-primary transition-smooth group-hover:scale-105 group-hover:bg-primary/20">
        <Icon className="h-6 w-6" strokeWidth={1.9} />
      </span>

      <h3
        className={`mt-5 font-display text-lg font-semibold text-foreground ${
          lang === "km" ? "font-khmer leading-[1.6]" : ""
        }`}
      >
        {service.title[lang]}
      </h3>
      <p
        className={`mt-2 flex-1 text-sm leading-relaxed text-muted-foreground ${lang === "km" ? "font-khmer" : ""}`}
      >
        {service.description[lang]}
      </p>

      <button
        type="button"
        data-ocid={`services.book_button.${index + 1}`}
        onClick={onBook}
        className="mt-6 inline-flex min-h-[44px] items-center gap-2 self-start rounded-full border border-border px-4 text-sm font-medium text-foreground transition-smooth hover:border-primary/60 hover:bg-primary/10 hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-card"
      >
        <span className={lang === "km" ? "font-khmer" : undefined}>
          {UI.bookThisService[lang]}
        </span>
        <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
      </button>
    </article>
  );
}

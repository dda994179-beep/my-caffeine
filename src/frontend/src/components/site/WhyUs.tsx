import { type Lang, SHOP, UI } from "@/lib/i18n";
import { DIRECTIONS_URL, WHY_US, type WhyItem } from "@/lib/site-data";
import {
  BadgeCheck,
  Clock4,
  type LucideIcon,
  MapPin,
  Navigation,
  ShieldCheck,
  Tag,
} from "lucide-react";

const ICONS: Record<string, LucideIcon> = {
  badge: BadgeCheck,
  shield: ShieldCheck,
  tag: Tag,
  clock: Clock4,
};

interface WhyUsProps {
  lang: Lang;
}

export function WhyUs({ lang }: WhyUsProps) {
  return (
    <section
      id="why-us"
      data-ocid="why_us.section"
      className="relative border-y border-border bg-secondary/25 py-20 lg:py-28"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-primary">
            03 — {UI.whyTitle[lang]}
          </span>
          <h2
            className={`mt-3 font-display text-3xl font-bold tracking-tight text-foreground sm:text-4xl ${
              lang === "km" ? "font-khmer leading-[1.5]" : ""
            }`}
          >
            {UI.whyTitle[lang]}
          </h2>
          <p
            className={`mt-4 text-sm text-muted-foreground sm:text-base ${lang === "km" ? "font-khmer" : ""}`}
          >
            {UI.whySubtitle[lang]}
          </p>
        </div>

        <div className="mt-12 grid gap-10 lg:grid-cols-[1fr_1.05fr] lg:gap-14">
          <div className="grid gap-4 sm:grid-cols-2">
            {WHY_US.map((item, index) => (
              <WhyCard key={item.id} item={item} index={index} lang={lang} />
            ))}
          </div>

          <div className="flex flex-col gap-5">
            <div className="relative overflow-hidden rounded-2xl border border-border shadow-elevated">
              <img
                src="/assets/generated/map-cambodia.dim_1200x800.png"
                alt={
                  lang === "km"
                    ? "ផែនទីបង្ហាញទីតាំងហាងនៅកម្ពុជា"
                    : "Map showing the workshop location in Cambodia"
                }
                width={1200}
                height={800}
                loading="lazy"
                className="h-56 w-full object-cover sm:h-64"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/85 to-transparent" />
              <div className="absolute bottom-4 left-4 flex items-center gap-2 rounded-full border border-border/70 bg-background/75 px-3 py-1.5 backdrop-blur-md">
                <MapPin className="h-4 w-4 text-primary" />
                <span
                  className={`text-xs font-medium text-foreground ${lang === "km" ? "font-khmer" : ""}`}
                >
                  {SHOP.address[lang]}
                </span>
              </div>
            </div>

            <div className="grid gap-4 rounded-2xl border border-border bg-card p-6 sm:grid-cols-2">
              <div>
                <h3 className="flex items-center gap-2 font-display text-sm font-semibold uppercase tracking-wider text-foreground">
                  <Clock4 className="h-4 w-4 text-primary" />
                  {UI.openingHours[lang]}
                </h3>
                <p
                  className={`mt-3 text-sm text-muted-foreground ${lang === "km" ? "font-khmer" : ""}`}
                >
                  {SHOP.hours[lang]}
                </p>
                <p
                  className={`mt-1 text-sm text-muted-foreground ${lang === "km" ? "font-khmer" : ""}`}
                >
                  {SHOP.hoursSunday[lang]}
                </p>
              </div>
              <div>
                <h3 className="flex items-center gap-2 font-display text-sm font-semibold uppercase tracking-wider text-foreground">
                  <MapPin className="h-4 w-4 text-primary" />
                  {UI.location[lang]}
                </h3>
                <p
                  className={`mt-3 text-sm text-muted-foreground ${lang === "km" ? "font-khmer" : ""}`}
                >
                  {SHOP.address[lang]}
                </p>
                <a
                  href={DIRECTIONS_URL}
                  target="_blank"
                  rel="noreferrer"
                  data-ocid="why_us.directions_link"
                  className="mt-3 inline-flex min-h-[44px] items-center gap-2 rounded-full border border-primary/50 bg-primary/10 px-4 text-sm font-medium text-primary transition-smooth hover:bg-primary/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-card"
                >
                  <Navigation className="h-4 w-4" />
                  <span className={lang === "km" ? "font-khmer" : undefined}>
                    {UI.getDirections[lang]}
                  </span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function WhyCard({
  item,
  index,
  lang,
}: { item: WhyItem; index: number; lang: Lang }) {
  const Icon = ICONS[item.icon] ?? BadgeCheck;
  return (
    <article
      data-ocid={`why_us.card.${index + 1}`}
      className="flex flex-col gap-3 rounded-xl border border-border bg-card p-5 hover-lift"
    >
      <span className="grid h-10 w-10 place-items-center rounded-lg border border-primary/30 bg-primary/10 text-primary">
        <Icon className="h-5 w-5" strokeWidth={1.9} />
      </span>
      <h3
        className={`font-display text-base font-semibold text-foreground ${lang === "km" ? "font-khmer leading-[1.6]" : ""}`}
      >
        {item.title[lang]}
      </h3>
      <p
        className={`text-sm leading-relaxed text-muted-foreground ${lang === "km" ? "font-khmer" : ""}`}
      >
        {item.description[lang]}
      </p>
    </article>
  );
}

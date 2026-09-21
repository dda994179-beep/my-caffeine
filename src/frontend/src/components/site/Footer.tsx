import { type Lang, NAV_ITEMS, SHOP, UI } from "@/lib/i18n";
import { Clock, MapPin, Phone, Wrench } from "lucide-react";

interface FooterProps {
  lang: Lang;
}

export function Footer({ lang }: FooterProps) {
  const year = new Date().getFullYear();
  const scrollTo = (id: string) =>
    document
      .getElementById(id)
      ?.scrollIntoView({ behavior: "smooth", block: "start" });

  return (
    <footer data-ocid="site.footer" className="border-t border-border bg-card">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 lg:grid-cols-4 lg:px-8">
        <div className="lg:col-span-2">
          <div className="flex items-center gap-3">
            <span className="grid h-10 w-10 place-items-center rounded-md bg-gradient-primary text-primary-foreground shadow-glow">
              <Wrench className="h-5 w-5" strokeWidth={2.4} />
            </span>
            <div className="flex flex-col leading-none">
              <span className="font-display text-lg font-bold tracking-tight text-foreground">
                DIT RACING
              </span>
              <span className="font-khmer text-xs text-muted-foreground">
                {SHOP.name.km}
              </span>
            </div>
          </div>
          <p
            className={`mt-4 max-w-sm text-sm text-muted-foreground ${lang === "km" ? "font-khmer" : ""}`}
          >
            {UI.footerBlurb[lang]}
          </p>
          <div className="mt-5 flex flex-wrap gap-3">
            {SHOP.phones.map((phone, index) => (
              <a
                key={phone}
                href={`tel:${phone.replace(/\s/g, "")}`}
                data-ocid={`footer.call_link.${index + 1}`}
                className="inline-flex min-h-[44px] items-center gap-2 rounded-full border border-border px-4 font-mono text-sm font-medium text-foreground transition-smooth hover:border-primary/60 hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-card"
              >
                <Phone className="h-4 w-4" />
                {phone}
              </a>
            ))}
          </div>
        </div>

        <div>
          <h3 className="font-display text-sm font-semibold uppercase tracking-wider text-foreground">
            {UI.quickLinks[lang]}
          </h3>
          <ul className="mt-4 space-y-2">
            {NAV_ITEMS.map((item) => (
              <li key={item.id}>
                <button
                  type="button"
                  data-ocid={`footer.${item.id}.link`}
                  onClick={() => scrollTo(item.id)}
                  className="rounded text-sm text-muted-foreground transition-smooth hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                >
                  <span className={lang === "km" ? "font-khmer" : undefined}>
                    {item.label[lang]}
                  </span>
                </button>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="font-display text-sm font-semibold uppercase tracking-wider text-foreground">
            {UI.contactUs[lang]}
          </h3>
          <ul className="mt-4 space-y-3 text-sm text-muted-foreground">
            <li className="flex items-start gap-2">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
              <span className={lang === "km" ? "font-khmer" : undefined}>
                {SHOP.address[lang]}
              </span>
            </li>
            <li className="flex items-start gap-2">
              <Clock className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
              <span className="flex flex-col gap-0.5">
                <span className={lang === "km" ? "font-khmer" : undefined}>
                  {SHOP.hours[lang]}
                </span>
                <span className={lang === "km" ? "font-khmer" : undefined}>
                  {SHOP.hoursSunday[lang]}
                </span>
              </span>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-border">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-4 py-6 text-xs text-muted-foreground sm:flex-row sm:px-6 lg:px-8">
          <p className={lang === "km" ? "font-khmer" : undefined}>
            © {year} DIT RACING. {UI.footerRights[lang]}.
          </p>
          <a
            href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(
              typeof window === "undefined" ? "" : window.location.hostname,
            )}`}
            target="_blank"
            rel="noreferrer"
            data-ocid="footer.attribution_link"
            className="transition-smooth hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            © {year}. Built with love using caffeine.ai
          </a>
        </div>
      </div>
    </footer>
  );
}

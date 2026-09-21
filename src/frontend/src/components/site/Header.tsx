import { Button } from "@/components/ui/button";
import { type Lang, NAV_ITEMS, SHOP, UI } from "@/lib/i18n";
import { Menu, Phone, Wrench, X } from "lucide-react";
import { useEffect, useState } from "react";

interface HeaderProps {
  lang: Lang;
  onToggleLang: () => void;
}

export function Header({ lang, onToggleLang }: HeaderProps) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const scrollTo = (id: string) => {
    setOpen(false);
    document
      .getElementById(id)
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <header
      data-ocid="site.header"
      className={`sticky top-0 z-50 border-b border-border/70 backdrop-blur-xl transition-smooth ${
        scrolled ? "bg-background/85 shadow-subtle" : "bg-background/55"
      }`}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:h-20 lg:px-8">
        <button
          type="button"
          data-ocid="site.logo_link"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="group flex min-w-0 items-center gap-3 rounded-md text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
        >
          <span className="grid h-10 w-10 shrink-0 place-items-center rounded-md bg-gradient-primary text-primary-foreground shadow-glow transition-smooth group-hover:scale-105">
            <Wrench className="h-5 w-5" strokeWidth={2.4} />
          </span>
          <span className="flex min-w-0 flex-col leading-none">
            <span className="font-display text-base font-bold tracking-tight text-foreground sm:text-lg">
              DIT RACING
            </span>
            <span className="font-khmer truncate text-[11px] text-muted-foreground sm:text-xs">
              {SHOP.name.km}
            </span>
          </span>
        </button>

        <nav aria-label="Primary" className="hidden items-center gap-1 lg:flex">
          {NAV_ITEMS.map((item) => (
            <button
              key={item.id}
              type="button"
              data-ocid={`nav.${item.id}.link`}
              onClick={() => scrollTo(item.id)}
              className="relative rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-smooth hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background after:absolute after:inset-x-3 after:-bottom-0.5 after:h-px after:origin-left after:scale-x-0 after:bg-primary after:transition-transform after:duration-300 hover:after:scale-x-100"
            >
              <span className={lang === "km" ? "font-khmer" : undefined}>
                {item.label[lang]}
              </span>
            </button>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <button
            type="button"
            data-ocid="nav.lang.toggle"
            onClick={onToggleLang}
            aria-label={`${UI.language[lang]}: ${lang === "km" ? "English" : "ខ្មែរ"}`}
            className="rounded-full border border-border bg-secondary/60 px-3 py-1.5 font-mono text-xs font-semibold uppercase tracking-wider text-foreground transition-smooth hover:border-primary/60 hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          >
            {lang === "km" ? "ខ្មែរ" : "EN"}
          </button>

          <a
            href={`tel:${SHOP.phones[0].replace(/\s/g, "")}`}
            data-ocid="header.call_button"
            className="hidden items-center gap-2 rounded-full border border-border px-3 py-1.5 text-xs font-medium text-muted-foreground transition-smooth hover:border-primary/60 hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background md:inline-flex"
          >
            <Phone className="h-3.5 w-3.5" />
            <span className="font-mono">{SHOP.phones[0]}</span>
          </a>

          <Button
            type="button"
            data-ocid="header.book_button"
            onClick={() => scrollTo("booking")}
            className="hidden rounded-full bg-gradient-primary px-5 font-semibold text-primary-foreground shadow-glow transition-smooth hover:brightness-110 sm:inline-flex"
          >
            <span className={lang === "km" ? "font-khmer" : undefined}>
              {UI.bookRepair[lang]}
            </span>
          </Button>

          <button
            type="button"
            data-ocid="nav.menu.toggle"
            onClick={() => setOpen(true)}
            aria-label={UI.menu[lang]}
            aria-expanded={open}
            className="grid h-10 w-10 place-items-center rounded-md border border-border text-foreground transition-smooth hover:border-primary/60 hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background lg:hidden"
          >
            <Menu className="h-5 w-5" />
          </button>
        </div>
      </div>

      {open && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <button
            type="button"
            aria-label={UI.close[lang]}
            data-ocid="nav.menu.backdrop"
            onClick={() => setOpen(false)}
            className="absolute inset-0 bg-background/80 backdrop-blur-sm"
          />
          <div
            data-ocid="nav.menu.sheet"
            className="absolute inset-y-0 right-0 flex w-[86%] max-w-sm flex-col border-l border-border bg-card shadow-elevated animate-fade-up"
          >
            <div className="flex items-center justify-between border-b border-border px-5 py-4">
              <span className="font-display text-sm font-semibold uppercase tracking-wider text-muted-foreground">
                {UI.menu[lang]}
              </span>
              <button
                type="button"
                data-ocid="nav.menu.close_button"
                onClick={() => setOpen(false)}
                aria-label={UI.close[lang]}
                className="grid h-9 w-9 place-items-center rounded-md border border-border text-foreground transition-smooth hover:border-primary/60 hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <nav
              aria-label="Mobile"
              className="flex flex-1 flex-col gap-1 overflow-y-auto p-4"
            >
              {NAV_ITEMS.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  data-ocid={`nav.mobile.${item.id}.link`}
                  onClick={() => scrollTo(item.id)}
                  className="rounded-lg px-4 py-3 text-left text-base font-medium text-foreground transition-smooth hover:bg-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                >
                  <span className={lang === "km" ? "font-khmer" : undefined}>
                    {item.label[lang]}
                  </span>
                </button>
              ))}
            </nav>

            <div className="space-y-3 border-t border-border p-4">
              <a
                href={`tel:${SHOP.phones[0].replace(/\s/g, "")}`}
                data-ocid="nav.mobile.call_button"
                className="flex min-h-[44px] items-center justify-center gap-2 rounded-full border border-primary/50 bg-primary/10 px-4 font-mono text-sm font-semibold text-primary transition-smooth hover:bg-primary/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                <Phone className="h-4 w-4" />
                {SHOP.phones[0]}
              </a>
              <Button
                type="button"
                data-ocid="nav.mobile.book_button"
                onClick={() => scrollTo("booking")}
                className="min-h-[44px] w-full rounded-full bg-gradient-primary font-semibold text-primary-foreground shadow-glow"
              >
                <span className={lang === "km" ? "font-khmer" : undefined}>
                  {UI.bookRepair[lang]}
                </span>
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

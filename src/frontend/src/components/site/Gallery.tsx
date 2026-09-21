import { Lightbox } from "@/components/site/Lightbox";
import { type Lang, UI } from "@/lib/i18n";
import { GALLERY } from "@/lib/site-data";
import { Expand } from "lucide-react";
import { useState } from "react";

interface GalleryProps {
  lang: Lang;
}

export function Gallery({ lang }: GalleryProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  return (
    <section
      id="gallery"
      data-ocid="gallery.section"
      className="relative py-20 lg:py-28"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-primary">
            02 — {UI.galleryTitle[lang]}
          </span>
          <h2
            className={`mt-3 font-display text-3xl font-bold tracking-tight text-foreground sm:text-4xl ${
              lang === "km" ? "font-khmer leading-[1.5]" : ""
            }`}
          >
            {UI.galleryTitle[lang]}
          </h2>
          <p
            className={`mt-4 text-sm text-muted-foreground sm:text-base ${lang === "km" ? "font-khmer" : ""}`}
          >
            {UI.gallerySubtitle[lang]}
          </p>
        </div>

        <div className="mt-12 grid auto-rows-[180px] grid-cols-2 gap-3 sm:auto-rows-[200px] lg:grid-cols-4 lg:gap-4">
          {GALLERY.map((item, index) => (
            <button
              key={item.id}
              type="button"
              data-ocid={`gallery.item.${index + 1}`}
              onClick={() => setActiveIndex(index)}
              aria-label={`${UI.viewImage[lang]}: ${item.alt[lang]}`}
              className={`group relative overflow-hidden rounded-xl border border-border bg-card transition-smooth hover:border-primary/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background ${
                index === 0 ? "col-span-2 row-span-2" : ""
              }`}
            >
              <img
                src={item.src}
                alt={item.alt[lang]}
                loading="lazy"
                className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
              />
              <span className="absolute inset-0 bg-gradient-to-t from-background/85 via-background/10 to-transparent opacity-70 transition-opacity duration-300 group-hover:opacity-95" />
              <span className="absolute inset-x-3 bottom-3 flex items-end justify-between gap-2 text-left">
                <span
                  className={`line-clamp-2 text-xs font-medium text-foreground ${
                    lang === "km" ? "font-khmer" : ""
                  }`}
                >
                  {item.alt[lang]}
                </span>
                <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full border border-primary/40 bg-background/70 text-primary opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  <Expand className="h-4 w-4" />
                </span>
              </span>
            </button>
          ))}
        </div>
      </div>

      {activeIndex !== null && (
        <Lightbox
          index={activeIndex}
          lang={lang}
          onClose={() => setActiveIndex(null)}
          onNavigate={setActiveIndex}
        />
      )}
    </section>
  );
}

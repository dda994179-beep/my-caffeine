import { type Lang, UI } from "@/lib/i18n";
import { GALLERY } from "@/lib/site-data";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { useEffect, useRef } from "react";

interface LightboxProps {
  index: number;
  lang: Lang;
  onClose: () => void;
  onNavigate: (index: number) => void;
}

export function Lightbox({ index, lang, onClose, onNavigate }: LightboxProps) {
  const dialogRef = useRef<HTMLDialogElement | null>(null);
  const closeRef = useRef<HTMLButtonElement | null>(null);
  const item = GALLERY[index];

  useEffect(() => {
    const dialog = dialogRef.current;
    if (dialog && !dialog.open) dialog.showModal();
    closeRef.current?.focus();
  }, []);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
      if (event.key === "ArrowRight") onNavigate((index + 1) % GALLERY.length);
      if (event.key === "ArrowLeft")
        onNavigate((index - 1 + GALLERY.length) % GALLERY.length);
    };
    window.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [index, onClose, onNavigate]);

  if (!item) return null;

  return (
    <dialog
      ref={dialogRef}
      data-ocid="gallery.lightbox"
      aria-label={item.alt[lang]}
      onCancel={(event) => {
        event.preventDefault();
        onClose();
      }}
      className="fixed inset-0 z-[60] m-0 h-full max-h-none w-full max-w-none items-center justify-center bg-background/92 p-4 backdrop-blur-md animate-fade-up open:flex"
    >
      <button
        type="button"
        aria-label={UI.closeLightbox[lang]}
        data-ocid="gallery.lightbox.backdrop"
        onClick={onClose}
        className="absolute inset-0 cursor-zoom-out"
      />

      <button
        ref={closeRef}
        type="button"
        data-ocid="gallery.lightbox.close_button"
        onClick={onClose}
        aria-label={UI.closeLightbox[lang]}
        className="absolute right-4 top-4 z-10 grid h-11 w-11 place-items-center rounded-full border border-border bg-card text-foreground transition-smooth hover:border-primary/60 hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
      >
        <X className="h-5 w-5" />
      </button>

      <button
        type="button"
        data-ocid="gallery.lightbox.prev_button"
        onClick={() =>
          onNavigate((index - 1 + GALLERY.length) % GALLERY.length)
        }
        aria-label={UI.prev[lang]}
        className="absolute left-3 z-10 grid h-11 w-11 place-items-center rounded-full border border-border bg-card text-foreground transition-smooth hover:border-primary/60 hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring sm:left-6"
      >
        <ChevronLeft className="h-5 w-5" />
      </button>

      <figure className="relative z-[5] flex max-h-full w-full max-w-4xl flex-col items-center gap-4">
        <img
          src={item.src}
          alt={item.alt[lang]}
          className="max-h-[74vh] w-auto rounded-xl border border-border object-contain shadow-elevated"
        />
        <figcaption
          className={`text-center text-sm text-muted-foreground ${lang === "km" ? "font-khmer" : ""}`}
        >
          {item.alt[lang]}
        </figcaption>
      </figure>

      <button
        type="button"
        data-ocid="gallery.lightbox.next_button"
        onClick={() => onNavigate((index + 1) % GALLERY.length)}
        aria-label={UI.next[lang]}
        className="absolute right-3 z-10 grid h-11 w-11 place-items-center rounded-full border border-border bg-card text-foreground transition-smooth hover:border-primary/60 hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring sm:right-6"
      >
        <ChevronRight className="h-5 w-5" />
      </button>
    </dialog>
  );
}

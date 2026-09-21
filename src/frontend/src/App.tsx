import { AnimatedBackground } from "@/components/site/AnimatedBackground";
import { BookingForm } from "@/components/site/BookingForm";
import { Footer } from "@/components/site/Footer";
import { Gallery } from "@/components/site/Gallery";
import { Header } from "@/components/site/Header";
import { Hero } from "@/components/site/Hero";
import { Services } from "@/components/site/Services";
import { Testimonials } from "@/components/site/Testimonials";
import { WhyUs } from "@/components/site/WhyUs";
import { useLanguage } from "@/hooks/use-language";
import { SHOP, UI } from "@/lib/i18n";
import { Clock, MapPin, Phone } from "lucide-react";
import { useCallback, useState } from "react";

export default function App() {
  const { lang, toggle } = useLanguage();
  const [selectedService, setSelectedService] = useState("");

  const handleBookService = useCallback((serviceId: string) => {
    setSelectedService(serviceId);
    document
      .getElementById("booking")
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);

  return (
    <div className="relative min-h-screen bg-background">
      <AnimatedBackground />
      <Header lang={lang} onToggleLang={toggle} />

      <main>
        <Hero lang={lang} />
        <Services lang={lang} onBookService={handleBookService} />
        <Gallery lang={lang} />
        <WhyUs lang={lang} />
        <Testimonials lang={lang} />

        <section
          id="booking"
          data-ocid="booking.section"
          className="relative border-t border-border bg-secondary/25 py-20 lg:py-28"
        >
          <div className="mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16 lg:px-8">
            <div id="contact" className="flex flex-col gap-6">
              <div>
                <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-primary">
                  05 — {UI.contactTitle[lang]}
                </span>
                <h2
                  className={`mt-3 font-display text-3xl font-bold tracking-tight text-foreground sm:text-4xl ${
                    lang === "km" ? "font-khmer leading-[1.5]" : ""
                  }`}
                >
                  {UI.contactTitle[lang]}
                </h2>
                <p
                  className={`mt-4 text-sm text-muted-foreground sm:text-base ${lang === "km" ? "font-khmer" : ""}`}
                >
                  {UI.contactSubtitle[lang]}
                </p>
              </div>

              <div className="flex flex-col gap-3">
                {SHOP.phones.map((phone, index) => (
                  <a
                    key={phone}
                    href={`tel:${phone.replace(/\s/g, "")}`}
                    data-ocid={`contact.call_link.${index + 1}`}
                    className="group flex min-h-[56px] items-center gap-4 rounded-xl border border-border bg-card px-5 transition-smooth hover:border-primary/60 hover:shadow-glow focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                  >
                    <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-primary/30 bg-primary/10 text-primary transition-smooth group-hover:bg-primary/20">
                      <Phone className="h-4 w-4" />
                    </span>
                    <span className="flex flex-col">
                      <span className="font-mono text-base font-semibold text-foreground">
                        {phone}
                      </span>
                      <span
                        className={`text-xs text-muted-foreground ${lang === "km" ? "font-khmer" : ""}`}
                      >
                        {UI.callNow[lang]}
                      </span>
                    </span>
                  </a>
                ))}
              </div>

              <div className="flex flex-col gap-3 rounded-xl border border-border bg-card p-5">
                <p className="flex items-start gap-3 text-sm text-muted-foreground">
                  <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                  <span className={lang === "km" ? "font-khmer" : undefined}>
                    {SHOP.address[lang]}
                  </span>
                </p>
                <p className="flex items-start gap-3 text-sm text-muted-foreground">
                  <Clock className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                  <span className={lang === "km" ? "font-khmer" : undefined}>
                    {SHOP.hours[lang]}
                  </span>
                </p>
              </div>
            </div>

            <BookingForm
              lang={lang}
              selectedService={selectedService}
              onServiceChange={setSelectedService}
            />
          </div>
        </section>
      </main>

      <Footer lang={lang} />
    </div>
  );
}

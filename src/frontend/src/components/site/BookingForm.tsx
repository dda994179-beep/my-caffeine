import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useSubmitBooking } from "@/hooks/useQueries";
import { type Lang, SHOP, UI } from "@/lib/i18n";
import { SERVICES } from "@/lib/site-data";
import { CheckCircle2, Loader2, Phone, Send } from "lucide-react";
import { type FormEvent, useState } from "react";

interface BookingFormProps {
  lang: Lang;
  selectedService: string;
  onServiceChange: (serviceId: string) => void;
}

interface FormState {
  name: string;
  phone: string;
  motorcycleModel: string;
  serviceType: string;
  preferredDate: string;
  notes: string;
}

type FieldErrors = Partial<Record<keyof FormState, string>>;

const EMPTY_FORM: FormState = {
  name: "",
  phone: "",
  motorcycleModel: "",
  serviceType: "",
  preferredDate: "",
  notes: "",
};

export function BookingForm({
  lang,
  selectedService,
  onServiceChange,
}: BookingFormProps) {
  const [form, setForm] = useState<FormState>(EMPTY_FORM);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [reference, setReference] = useState<string | null>(null);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const mutation = useSubmitBooking();

  const serviceType = form.serviceType || selectedService;

  const update = (field: keyof FormState, value: string) => {
    setForm((current) => ({ ...current, [field]: value }));
    setErrors((current) => ({ ...current, [field]: undefined }));
  };

  const validate = (): FieldErrors => {
    const next: FieldErrors = {};
    if (!form.name.trim()) next.name = UI.errorName[lang];
    if (!form.phone.trim()) next.phone = UI.errorPhone[lang];
    else if (form.phone.replace(/\D/g, "").length < 8)
      next.phone = UI.errorPhoneFormat[lang];
    if (!serviceType) next.serviceType = UI.errorService[lang];
    return next;
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitError(null);

    const nextErrors = validate();
    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      return;
    }

    const payload = {
      name: form.name.trim(),
      phone: form.phone.trim(),
      motorcycleModel: form.motorcycleModel.trim(),
      serviceType,
      preferredDate: form.preferredDate,
      notes: form.notes.trim(),
    };

    setForm(EMPTY_FORM);
    onServiceChange("");

    mutation.mutate(payload, {
      onSuccess: (result) => {
        if (result.__kind__ === "ok") {
          setReference(result.ok);
        } else {
          setSubmitError(UI.errorGeneric[lang]);
        }
      },
      onError: () => {
        setForm((current) => (current.name === "" ? { ...payload } : current));
        setSubmitError(UI.errorGeneric[lang]);
      },
    });
  };

  const resetForm = () => {
    setReference(null);
    setSubmitError(null);
    setErrors({});
    setForm(EMPTY_FORM);
    onServiceChange("");
  };

  if (reference) {
    return (
      <div
        data-ocid="booking.success_state"
        className="flex flex-col items-start gap-5 rounded-2xl border border-success/40 bg-card p-8 shadow-elevated"
      >
        <span className="grid h-14 w-14 place-items-center rounded-full border border-success/40 bg-success/10 text-success">
          <CheckCircle2 className="h-7 w-7" />
        </span>
        <div>
          <h3
            className={`font-display text-xl font-bold text-foreground ${lang === "km" ? "font-khmer" : ""}`}
          >
            {UI.bookingSuccess[lang]}
          </h3>
          <p
            className={`mt-2 max-w-md text-sm text-muted-foreground ${lang === "km" ? "font-khmer" : ""}`}
          >
            {UI.bookingSuccessBody[lang]}
          </p>
        </div>

        <div className="w-full rounded-xl border border-border bg-secondary/40 p-4">
          <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
            {UI.reference[lang]}
          </p>
          <p
            data-ocid="booking.reference"
            className="mt-1 font-mono text-2xl font-bold text-primary"
          >
            {reference}
          </p>
        </div>

        <div className="flex flex-wrap gap-3">
          <Button
            type="button"
            data-ocid="booking.book_another_button"
            onClick={resetForm}
            className="min-h-[44px] rounded-full bg-gradient-primary px-5 font-semibold text-primary-foreground shadow-glow"
          >
            <span className={lang === "km" ? "font-khmer" : undefined}>
              {UI.bookAnother[lang]}
            </span>
          </Button>
          <a
            href={`tel:${SHOP.phones[0].replace(/\s/g, "")}`}
            data-ocid="booking.success_call_link"
            className="inline-flex min-h-[44px] items-center gap-2 rounded-full border border-border px-5 font-mono text-sm font-medium text-foreground transition-smooth hover:border-primary/60 hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            <Phone className="h-4 w-4" />
            {SHOP.phones[0]}
          </a>
        </div>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      data-ocid="booking.form"
      className="rounded-2xl border border-border bg-card p-6 shadow-elevated sm:p-8"
    >
      <h3
        className={`font-display text-xl font-bold text-foreground ${lang === "km" ? "font-khmer" : ""}`}
      >
        {UI.bookingTitle[lang]}
      </h3>
      <p
        className={`mt-2 text-sm text-muted-foreground ${lang === "km" ? "font-khmer" : ""}`}
      >
        {UI.bookingSubtitle[lang]}
      </p>

      <div className="mt-6 grid gap-5 sm:grid-cols-2">
        <Field
          id="booking-name"
          label={UI.formName[lang]}
          error={errors.name}
          lang={lang}
          required
        >
          <Input
            id="booking-name"
            data-ocid="booking.name_input"
            value={form.name}
            onChange={(event) => update("name", event.target.value)}
            placeholder={UI.formNamePlaceholder[lang]}
            aria-invalid={!!errors.name}
            className="min-h-[44px] bg-background"
          />
        </Field>

        <Field
          id="booking-phone"
          label={UI.formPhone[lang]}
          error={errors.phone}
          lang={lang}
          required
        >
          <Input
            id="booking-phone"
            data-ocid="booking.phone_input"
            type="tel"
            inputMode="tel"
            value={form.phone}
            onChange={(event) => update("phone", event.target.value)}
            placeholder={UI.formPhonePlaceholder[lang]}
            aria-invalid={!!errors.phone}
            className="min-h-[44px] bg-background font-mono"
          />
        </Field>

        <Field id="booking-model" label={UI.formModel[lang]} lang={lang}>
          <Input
            id="booking-model"
            data-ocid="booking.model_input"
            value={form.motorcycleModel}
            onChange={(event) => update("motorcycleModel", event.target.value)}
            placeholder={UI.formModelPlaceholder[lang]}
            className="min-h-[44px] bg-background"
          />
        </Field>

        <Field
          id="booking-service"
          label={UI.formService[lang]}
          error={errors.serviceType}
          lang={lang}
          required
        >
          <select
            id="booking-service"
            data-ocid="booking.service_select"
            value={serviceType}
            onChange={(event) => {
              update("serviceType", event.target.value);
              onServiceChange(event.target.value);
            }}
            aria-invalid={!!errors.serviceType}
            className={`min-h-[44px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground transition-smooth focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${
              lang === "km" ? "font-khmer" : ""
            }`}
          >
            <option value="">{UI.selectService[lang]}</option>
            {SERVICES.map((service) => (
              <option key={service.id} value={service.id}>
                {service.title[lang]}
              </option>
            ))}
          </select>
        </Field>

        <Field id="booking-date" label={UI.formDate[lang]} lang={lang}>
          <Input
            id="booking-date"
            data-ocid="booking.date_input"
            type="date"
            value={form.preferredDate}
            onChange={(event) => update("preferredDate", event.target.value)}
            className="min-h-[44px] bg-background font-mono"
          />
        </Field>

        <div className="sm:col-span-2">
          <Field id="booking-notes" label={UI.formNotes[lang]} lang={lang}>
            <Textarea
              id="booking-notes"
              data-ocid="booking.notes_textarea"
              value={form.notes}
              onChange={(event) => update("notes", event.target.value)}
              placeholder={UI.formNotesPlaceholder[lang]}
              rows={4}
              className="bg-background"
            />
          </Field>
        </div>
      </div>

      {submitError && (
        <p
          role="alert"
          data-ocid="booking.error_state"
          className="mt-5 rounded-lg border border-destructive/40 bg-destructive/10 px-4 py-3 text-sm text-destructive-foreground"
        >
          {submitError}
        </p>
      )}

      <Button
        type="submit"
        data-ocid="booking.submit_button"
        disabled={mutation.isPending}
        className="mt-6 min-h-[48px] w-full rounded-full bg-gradient-primary px-6 font-semibold text-primary-foreground shadow-glow transition-smooth hover:brightness-110 disabled:opacity-70 sm:w-auto"
      >
        {mutation.isPending ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" />
            <span className={lang === "km" ? "font-khmer" : undefined}>
              {UI.sending[lang]}
            </span>
          </>
        ) : (
          <>
            <Send className="h-4 w-4" />
            <span className={lang === "km" ? "font-khmer" : undefined}>
              {UI.submitBooking[lang]}
            </span>
          </>
        )}
      </Button>
    </form>
  );
}

function Field({
  id,
  label,
  error,
  lang,
  required,
  children,
}: {
  id: string;
  label: string;
  error?: string;
  lang: Lang;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-2">
      <Label
        htmlFor={id}
        className={`text-sm font-medium text-foreground ${lang === "km" ? "font-khmer" : ""}`}
      >
        {label}
        {required && <span className="ml-1 text-primary">*</span>}
      </Label>
      {children}
      {error && (
        <p
          role="alert"
          data-ocid={`booking.${id.replace("booking-", "")}_error`}
          className={`text-xs text-destructive ${lang === "km" ? "font-khmer" : ""}`}
        >
          {error}
        </p>
      )}
    </div>
  );
}

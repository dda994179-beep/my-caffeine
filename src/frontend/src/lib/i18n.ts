export type Lang = "km" | "en";

export const LANG_STORAGE_KEY = "dit-racing-lang";

export interface Bilingual {
  km: string;
  en: string;
}

export function pick(value: Bilingual, lang: Lang): string {
  return value[lang];
}

export const SHOP = {
  name: { km: "ដីត រេស៊ីង", en: "DIT RACING" },
  tagline: {
    km: "សេវាជួសជុល និងថែទាំម៉ូតូអាជីព",
    en: "Professional Motorcycle Repair & Service",
  },
  phones: ["090 833 814", "090 804 863"],
  location: { km: "កម្ពុជា", en: "Cambodia" },
  address: {
    km: "ភ្នំពេញ កម្ពុជា",
    en: "Phnom Penh, Cambodia",
  },
  hours: {
    km: "ចន្ទ – សៅរ៍ · ៨:០០ ព្រឹក – ៦:០០ ល្ងាច",
    en: "Mon – Sat · 8:00 AM – 6:00 PM",
  },
  hoursSunday: {
    km: "អាទិត្យ · បិទ",
    en: "Sunday · Closed",
  },
} as const;

export const NAV_ITEMS: { id: string; label: Bilingual }[] = [
  { id: "services", label: { km: "សេវាកម្ម", en: "Services" } },
  { id: "gallery", label: { km: "វិចិត្រសាល", en: "Gallery" } },
  { id: "why-us", label: { km: "ហេតុអ្វីជ្រើសយើង", en: "Why Us" } },
  { id: "testimonials", label: { km: "មតិអតិថិជន", en: "Testimonials" } },
  { id: "contact", label: { km: "ទំនាក់ទំនង", en: "Contact" } },
];

export const UI = {
  bookRepair: { km: "កក់ការជួសជុល", en: "Book a Repair" },
  callNow: { km: "ទូរស័ព្ទ", en: "Call Now" },
  menu: { km: "ម៉ឺនុយ", en: "Menu" },
  close: { km: "បិទ", en: "Close" },
  language: { km: "ភាសា", en: "Language" },
  scroll: { km: "រំកិលចុះក្រោម", en: "Scroll down" },
  bookThisService: { km: "កក់សេវានេះ", en: "Book this service" },
  getDirections: { km: "មើលទិសដៅ", en: "Get Directions" },
  openingHours: { km: "ម៉ោងបើក", en: "Opening Hours" },
  location: { km: "ទីតាំង", en: "Location" },
  quickLinks: { km: "តំណភ្ជាប់រហ័ស", en: "Quick Links" },
  contactUs: { km: "ទាក់ទងយើង", en: "Contact Us" },
  prev: { km: "មុន", en: "Previous" },
  next: { km: "បន្ទាប់", en: "Next" },
  required: { km: "ត្រូវបំពេញ", en: "Required" },
  sending: { km: "កំពុងផ្ញើ…", en: "Sending…" },
  submitBooking: { km: "ផ្ញើការកក់", en: "Submit Booking" },
  bookingSuccess: { km: "ការកក់បានជោគជ័យ", en: "Booking Confirmed" },
  bookingSuccessBody: {
    km: "យើងបានទទួលការកក់របស់អ្នក។ សូមរក្សាលេខយោងនេះ ហើយយើងនឹងទាក់ទងអ្នកឆាប់ៗ។",
    en: "We received your request. Keep this reference — our team will call you shortly.",
  },
  reference: { km: "លេខយោង", en: "Reference" },
  bookAnother: { km: "កក់ម្តងទៀត", en: "Book another repair" },
  errorGeneric: {
    km: "មានបញ្ហាក្នុងការផ្ញើ។ សូមព្យាយាមម្តងទៀត។",
    en: "Something went wrong while sending. Please try again.",
  },
  errorName: { km: "សូមបញ្ចូលឈ្មោះ", en: "Please enter your name" },
  errorPhone: { km: "សូមបញ្ចូលលេខទូរស័ព្ទ", en: "Please enter your phone number" },
  errorService: { km: "សូមជ្រើសរើសសេវាកម្ម", en: "Please select a service" },
  errorPhoneFormat: {
    km: "លេខទូរស័ព្ទមិនត្រឹមត្រូវ",
    en: "Enter a valid phone number",
  },
  formName: { km: "ឈ្មោះ", en: "Full Name" },
  formPhone: { km: "លេខទូរស័ព្ទ", en: "Phone Number" },
  formModel: { km: "ម៉ូដែលម៉ូតូ", en: "Motorcycle Model" },
  formService: { km: "ប្រភេទសេវាកម្ម", en: "Service Type" },
  formDate: { km: "កាលបរិច្ឆេទចង់បាន", en: "Preferred Date" },
  formNotes: { km: "កំណត់សម្គាល់", en: "Notes" },
  formNotesPlaceholder: {
    km: "រៀបរាប់បញ្ហាម៉ូតូ ឬសំណើបន្ថែម…",
    en: "Describe the issue or any extra requests…",
  },
  formModelPlaceholder: {
    km: "ឧ. Honda Dream 125",
    en: "e.g. Honda Dream 125",
  },
  formNamePlaceholder: { km: "ឈ្មោះរបស់អ្នក", en: "Your name" },
  formPhonePlaceholder: { km: "0XX XXX XXX", en: "0XX XXX XXX" },
  selectService: { km: "— ជ្រើសរើសសេវា —", en: "— Select a service —" },
  optional: { km: "ស្រេចចិត្ត", en: "optional" },
  bookingTitle: { km: "កក់ការជួសជុល", en: "Book a Repair" },
  bookingSubtitle: {
    km: "បំពេញព័ត៌មានខាងក្រោម ហើយក្រុមការងារយើងនឹងទាក់ទងអ្នកវិញ។",
    en: "Fill in the details below and our team will get back to you.",
  },
  galleryTitle: { km: "វិចិត្រសាលហាង", en: "Workshop Gallery" },
  gallerySubtitle: {
    km: "ទិដ្ឋភាពពិតពីការងារជួសជុលប្រចាំថ្ងៃរបស់យើង។",
    en: "A look inside our daily repair work.",
  },
  viewImage: { km: "មើលរូបភាព", en: "View image" },
  closeLightbox: { km: "បិទរូបភាព", en: "Close image" },
  whyTitle: { km: "ហេតុអ្វីជ្រើសរើសយើង", en: "Why Choose Us" },
  whySubtitle: {
    km: "បទពិសោធន៍ គុណភាព និងតម្លៃសមរម្យ — នេះជាការសន្យារបស់យើង។",
    en: "Experience, quality and fair pricing — that is our promise.",
  },
  testimonialsTitle: { km: "មតិអតិថិជន", en: "What Riders Say" },
  testimonialsSubtitle: {
    km: "ការវាយតម្លៃពីអតិថិជនដែលបានប្រើសេវារបស់យើង។",
    en: "Reviews from riders who trust our workshop.",
  },
  contactTitle: { km: "ទំនាក់ទំនងយើង", en: "Get In Touch" },
  contactSubtitle: {
    km: "ទូរស័ព្ទមកយើង ឬមកដល់ហាងដោយផ្ទាល់។",
    en: "Call us or visit the workshop directly.",
  },
  servicesTitle: { km: "សេវាកម្មរបស់យើង", en: "Our Services" },
  servicesSubtitle: {
    km: "យើងថែទាំ និងជួសជុលម៉ូតូគ្រប់ប្រភេទ ដោយជាងជំនាញ។",
    en: "We service and repair every kind of motorcycle, handled by specialists.",
  },
  heroSupport: {
    km: "សេវាជួសជុល និងថែទាំម៉ូតូជំនាញនៅកម្ពុជា — ជាងជំនាញ គ្រឿងបន្លាស់ពិត និងតម្លៃសមរម្យ។",
    en: "Expert motorcycle repair and maintenance in Cambodia — certified mechanics, genuine parts and fair pricing.",
  },
  heroEyebrow: {
    km: "ហាងជួសជុលម៉ូតូ · កម្ពុជា",
    en: "Motorcycle Workshop · Cambodia",
  },
  heroHeadline: {
    km: "ហាងជួសជុលម៉ូតូដីត DIT RACING",
    en: "DIT RACING Motorcycle Workshop",
  },
  statYears: { km: "ឆ្នាំបទពិសោធន៍", en: "Years of Experience" },
  statBikes: { km: "ម៉ូតូបានជួសជុល", en: "Bikes Serviced" },
  statSatisfaction: { km: "អតិថិជនពេញចិត្ត", en: "Customer Satisfaction" },
  footerRights: {
    km: "រក្សាសិទ្ធិគ្រប់បែបយ៉ាង",
    en: "All rights reserved",
  },
  footerBlurb: {
    km: "ហាងជួសជុល និងថែទាំម៉ូតូជំនាញ នៅកម្ពុជា។",
    en: "Specialist motorcycle repair and maintenance workshop in Cambodia.",
  },
} as const;

export type UIKey = keyof typeof UI;

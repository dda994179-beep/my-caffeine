import type { Bilingual } from "@/lib/i18n";

export interface ServiceItem {
  id: string;
  icon: string;
  title: Bilingual;
  description: Bilingual;
}

export const SERVICES: ServiceItem[] = [
  {
    id: "engine",
    icon: "engine",
    title: { km: "ជួសជុល និងរុះគ្រឿងម៉ាស៊ីន", en: "Engine Repair & Overhaul" },
    description: {
      km: "រុះ ពិនិត្យ និងជួសជុលម៉ាស៊ីនឡើងវិញ ដើម្បីស្តារកម្លាំងម៉ូតូរបស់អ្នក។",
      en: "Full teardown, inspection and rebuild to restore your engine's power.",
    },
  },
  {
    id: "maintenance",
    icon: "oil",
    title: { km: "ថែទាំ និងប្តូរប្រេង", en: "Routine Maintenance & Oil Change" },
    description: {
      km: "សេវាថែទាំតាមកាលកំណត់ ប្តូរប្រេង និងពិនិត្យផ្នែកសំខាន់ៗ។",
      en: "Scheduled servicing, oil changes and checks on all key components.",
    },
  },
  {
    id: "brakes",
    icon: "brake",
    title: { km: "ហ្វ្រាំង និងស៊ុម", en: "Brake & Suspension" },
    description: {
      km: "ជួសជុលហ្វ្រាំង និងស៊ុម ដើម្បីធានាសុវត្ថិភាពពេលបើកបរ។",
      en: "Brake and suspension work that keeps every ride safe and stable.",
    },
  },
  {
    id: "electrical",
    icon: "bolt",
    title: { km: "អគ្គិសនី និងខ្សែភ្លើង", en: "Electrical & Wiring" },
    description: {
      km: "ជួសជុលប្រព័ន្ធភ្លើង ខ្សែភ្លើង និងឧបករណ៍អគ្គិសនីទាំងអស់។",
      en: "Diagnosis and repair of lighting, wiring and all electrical systems.",
    },
  },
  {
    id: "tires",
    icon: "tire",
    title: { km: "កង់ និងសំបកកង់", en: "Tire & Wheel" },
    description: {
      km: "ប្តូរសំបកកង់ តម្រង់កង់ និងពិនិត្យសម្ពាធខ្យល់។",
      en: "Tire replacement, wheel truing and pressure checks done right.",
    },
  },
  {
    id: "diagnostics",
    icon: "scan",
    title: { km: "ពិនិត្យរោគវិនិច្ឆ័យ", en: "Diagnostics" },
    description: {
      km: "ប្រើឧបករណ៍ទំនើបដើម្បីរកឃើញបញ្ហាម៉ូតូឲ្យបានឆាប់រហ័ស។",
      en: "Modern diagnostic tools that pinpoint faults quickly and accurately.",
    },
  },
];

export interface GalleryItem {
  id: string;
  src: string;
  alt: Bilingual;
}

export const GALLERY: GalleryItem[] = [
  {
    id: "workshop",
    src: "/assets/generated/hero-workshop.dim_1600x900.jpg",
    alt: {
      km: "ជាងជំនាញកំពុងជួសជុលម៉ាស៊ីនម៉ូតូក្នុងហាង",
      en: "Mechanic repairing a motorcycle engine in the workshop",
    },
  },
  {
    id: "engine",
    src: "/assets/generated/gallery-engine.dim_800x800.jpg",
    alt: {
      km: "ដៃជាងកំពុងប្រើកូនសោលើម៉ាស៊ីនម៉ូតូ",
      en: "Mechanic's hands using a wrench on a motorcycle engine",
    },
  },
  {
    id: "wheel",
    src: "/assets/generated/gallery-wheel.dim_800x800.jpg",
    alt: {
      km: "កង់ម៉ូតូ និងឌីសហ្វ្រាំងកំពុងជួសជុល",
      en: "Motorcycle wheel and brake disc being serviced",
    },
  },
  {
    id: "tools",
    src: "/assets/generated/gallery-tools.dim_800x800.jpg",
    alt: {
      km: "ជញ្ជាំងឧបករណ៍ជួសជុលម៉ូតូក្នុងហាង",
      en: "Wall of motorcycle repair tools in the workshop",
    },
  },
  {
    id: "bike",
    src: "/assets/generated/gallery-bike.dim_800x800.jpg",
    alt: {
      km: "ម៉ូតូស្ព័រនៅលើជើងទម្រក្នុងហាង",
      en: "Sport motorcycle on a lift in the workshop",
    },
  },
  {
    id: "diagnostics",
    src: "/assets/generated/gallery-diagnostics.dim_800x800.jpg",
    alt: {
      km: "ជាងកំពុងពិនិត្យម៉ូតូដោយឧបករណ៍វិនិច្ឆ័យ",
      en: "Mechanic running diagnostics on a motorcycle",
    },
  },
  {
    id: "oil",
    src: "/assets/generated/gallery-oil.dim_800x800.jpg",
    alt: {
      km: "កំពុងចាក់ប្រេងម៉ាស៊ីនថ្មីចូលម៉ូតូ",
      en: "Fresh motor oil being poured into a motorcycle engine",
    },
  },
];

export interface WhyItem {
  id: string;
  icon: string;
  title: Bilingual;
  description: Bilingual;
}

export const WHY_US: WhyItem[] = [
  {
    id: "mechanics",
    icon: "badge",
    title: { km: "ជាងជំនាញវិញ្ញាបនបត្រ", en: "Certified Mechanics" },
    description: {
      km: "ក្រុមជាងដែលមានបទពិសោធន៍ និងការបណ្តុះបណ្តាលវិជ្ជាជីវៈ។",
      en: "A trained team with years of hands-on workshop experience.",
    },
  },
  {
    id: "parts",
    icon: "shield",
    title: { km: "គ្រឿងបន្លាស់ពិត", en: "Genuine Parts" },
    description: {
      km: "ប្រើគ្រឿងបន្លាស់ដើម ដើម្បីធានាអាយុកាល និងគុណភាព។",
      en: "Original parts only, so your repair lasts the distance.",
    },
  },
  {
    id: "pricing",
    icon: "tag",
    title: { km: "តម្លៃសមរម្យ", en: "Fair Pricing" },
    description: {
      km: "តម្លៃច្បាស់លាស់ គ្មានការគិតថ្លៃលាក់កំបាំង។",
      en: "Clear, upfront quotes with no hidden charges.",
    },
  },
  {
    id: "turnaround",
    icon: "clock",
    title: { km: "សេវារហ័ស", en: "Fast Turnaround" },
    description: {
      km: "ការងារភាគច្រើនបញ្ចប់ក្នុងថ្ងៃតែមួយ ដើម្បីឲ្យអ្នកត្រឡប់ទៅវិញបានឆាប់។",
      en: "Most jobs finished same-day so you get back on the road fast.",
    },
  },
];

export interface Testimonial {
  id: string;
  name: Bilingual;
  bike: Bilingual;
  quote: Bilingual;
  rating: number;
}

export const TESTIMONIALS: Testimonial[] = [
  {
    id: "sokha",
    name: { km: "សុខា ចាន់", en: "Sokha Chan" },
    bike: { km: "Honda Dream 125", en: "Honda Dream 125" },
    quote: {
      km: "ជាងពន្យល់ច្បាស់លាស់ ហើយជួសជុលបានលឿនណាស់។ ម៉ូតូខ្ញុំដើរល្អដូចថ្មី។",
      en: "The mechanic explained everything clearly and finished fast. My bike runs like new.",
    },
    rating: 5,
  },
  {
    id: "dara",
    name: { km: "ដារា ម៉ៅ", en: "Dara Mao" },
    bike: { km: "Yamaha Exciter 150", en: "Yamaha Exciter 150" },
    quote: {
      km: "តម្លៃសមរម្យ និងប្រើគ្រឿងបន្លាស់ពិត។ ខ្ញុំទុកចិត្តហាងនេះ។",
      en: "Fair price and genuine parts. This is the only shop I trust now.",
    },
    rating: 5,
  },
  {
    id: "vibol",
    name: { km: "វិបុល សេង", en: "Vibol Seng" },
    bike: { km: "Suzuki Raider R150", en: "Suzuki Raider R150" },
    quote: {
      km: "រកឃើញបញ្ហាភ្លើងដែលហាងផ្សេងរកមិនឃើញ។ សេវាល្អណាស់។",
      en: "They found an electrical fault two other shops missed. Excellent service.",
    },
    rating: 5,
  },
  {
    id: "chantha",
    name: { km: "ចន្ថា រី", en: "Chantha Ry" },
    bike: { km: "Honda Wave 110", en: "Honda Wave 110" },
    quote: {
      km: "កក់តាមទូរស័ព្ទ ហើយមកដល់ជួសជុលបានភ្លាម។ ងាយស្រួលណាស់។",
      en: "Booked by phone and they took my bike in right away. So convenient.",
    },
    rating: 4,
  },
];

export const STATS: {
  id: string;
  value: number;
  suffix: string;
  label: Bilingual;
}[] = [
  {
    id: "years",
    value: 12,
    suffix: "+",
    label: { km: "ឆ្នាំបទពិសោធន៍", en: "Years of Experience" },
  },
  {
    id: "bikes",
    value: 8500,
    suffix: "+",
    label: { km: "ម៉ូតូបានជួសជុល", en: "Bikes Serviced" },
  },
  {
    id: "satisfaction",
    value: 98,
    suffix: "%",
    label: { km: "អតិថិជនពេញចិត្ត", en: "Customer Satisfaction" },
  },
];

export const DIRECTIONS_URL =
  "https://maps.app.goo.gl/QPW3TTStmrmGfYJR9?g_st=ac";

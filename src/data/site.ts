import ceramic from "@/assets/svc-ceramic.jpg";
import ppf from "@/assets/svc-ppf.jpg";
import spa from "@/assets/svc-spa.jpg";
import foam from "@/assets/svc-foam.jpg";
import glass from "@/assets/svc-glass.jpg";
import engine from "@/assets/svc-engine.jpg";
import rust from "@/assets/svc-rust.jpg";
import headlight from "@/assets/svc-headlight.jpg";
import bike from "@/assets/svc-bike.jpg";
import interior from "@/assets/svc-interior.jpg";

export const business = {
  name: "AutoHerb Ongole",
  tagline: "Premium care. Unmatched finish.",
  phoneDisplay: "90321 17101",
  phoneHref: "tel:+919032117101",
  whatsappBase: "https://wa.me/919032117101",
  whatsapp:
    "https://wa.me/919032117101?text=Hi%20AutoHerb%20Ongole%2C%20I%27d%20like%20to%20book%20a%20detailing%20service.",
  // Update this if the official profile handle differs.
  instagram: "https://www.instagram.com/autoherb_ongole/",
  addressLines: [
    "Guntur Road, Opp. Ravi Priya Mall,",
    "Venkateswara Nagar,",
    "Ongole, Andhra Pradesh 523001",
  ],
  mapsUrl:
    "https://www.google.com/maps/search/?api=1&query=AutoHerb+Ongole+Guntur+Road+Ravi+Priya+Mall+Ongole+Andhra+Pradesh+523001",
  hours: [
    { label: "Studio (Mon – Sun)", value: "7:30 AM – 8:00 PM" },
    { label: "Pickup (Mon – Sat)", value: "8:00 AM – 8:00 PM" },
    { label: "Pickup (Sunday)", value: "7:00 AM – 8:30 PM" },
  ],
};

export function waLink(service?: string) {
  const text = service
    ? `Hi AutoHerb Ongole, I'd like to book: ${service}.`
    : "Hi AutoHerb Ongole, I'd like to book a detailing service.";
  return `https://wa.me/919032117101?text=${encodeURIComponent(text)}`;
}

export type Service = {
  id: string;
  name: string;
  short: string;
  image: string;
  icon:
    | "gem"
    | "shield"
    | "sparkles"
    | "droplets"
    | "sun"
    | "cog"
    | "shieldcheck"
    | "lightbulb"
    | "bike"
    | "armchair";
  description: string;
  benefits: string[];
  suitableFor: string;
};

export const services: Service[] = [
  {
    id: "ceramic-coating",
    name: "9H Ceramic Coating",
    short: "Protection that shines.",
    image: ceramic,
    icon: "gem",
    description:
      "Premium 9H ceramic coating for cars, applied over a full paint-correction prep. A hard, hydrophobic layer that locks in gloss and makes washing effortless.",
    benefits: [
      "Deep, long-lasting mirror gloss",
      "Hydrophobic — water and dirt slide off",
      "UV, chemical and light swirl resistance",
      "Easier maintenance washes",
    ],
    suitableFor: "New and used cars, bikes and premium SUVs.",
  },
  {
    id: "ppf",
    name: "PPF",
    short: "Paint protection film for vulnerable surfaces.",
    image: ppf,
    icon: "shield",
    description:
      "Self-healing paint protection film applied to high-impact areas or full body, shielding your paint from stone chips, scratches and road debris.",
    benefits: [
      "Physical barrier against chips and scratches",
      "Self-healing top layer",
      "Preserves factory paint and resale value",
      "Invisible, non-yellowing finish",
    ],
    suitableFor: "Bonnets, bumpers, fenders, mirrors or full-body coverage.",
  },
  {
    id: "full-spa",
    name: "Full Spa",
    short: "Complete exterior & interior treatment.",
    image: spa,
    icon: "sparkles",
    description:
      "Our complete full body spa — foam wash, clay bar treatment, polishing, waxing, interior vacuuming and deep cleaning, finished to showroom standard.",
    benefits: [
      "Foam wash and clay bar decontamination",
      "Polishing and waxing for renewed shine",
      "Interior vacuuming and deep clean",
      "Tyre, glass and trim dressing",
    ],
    suitableFor: "Every vehicle — ideal every 3 to 4 months.",
  },
  {
    id: "foam-wash",
    name: "Foam Wash",
    short: "Deep exterior cleaning and preparation.",
    image: foam,
    icon: "droplets",
    description:
      "Premium snow-foam pressure wash using pH-balanced shampoo and the two-bucket method, lifting dirt safely without marring the paint.",
    benefits: [
      "Contact-free dirt lifting",
      "pH-balanced, coating-safe shampoo",
      "Wheel, arch and underbody rinse",
      "Spot-free hand dry",
    ],
    suitableFor: "Regular upkeep for all cars and bikes.",
  },
  {
    id: "glass-treatment",
    name: "Glass Treatment",
    short: "Improved clarity & surface protection.",
    image: glass,
    icon: "sun",
    description:
      "Window cleaning plus a hydrophobic glass coat that clears water spots and keeps rain beading off your windshield for safer visibility.",
    benefits: [
      "Rain beads and rolls away",
      "Clearer night-time visibility",
      "Removes hard water spots",
      "Easier glass cleaning",
    ],
    suitableFor: "Windshields, side glass and mirrors.",
  },
  {
    id: "engine-coating",
    name: "Engine Coating",
    short: "Engine-bay cleaning and protective treatment.",
    image: engine,
    icon: "cog",
    description:
      "Careful degreasing of the engine bay followed by a protective dressing that restores deep black plastics and guards against grime build-up.",
    benefits: [
      "Grease and grime removal",
      "Restored finish on plastics and hoses",
      "Easier future inspection and servicing",
      "Protective anti-dust layer",
    ],
    suitableFor: "Any vehicle before resale or annual service.",
  },
  {
    id: "anti-rust-coating",
    name: "Anti-Rust Coating",
    short: "Additional protection against corrosion.",
    image: rust,
    icon: "shieldcheck",
    description:
      "Underbody and cavity anti-rust treatment that seals exposed metal against moisture, salt and monsoon corrosion.",
    benefits: [
      "Underbody corrosion barrier",
      "Reduces road noise",
      "Protects welds and cavities",
      "Extends chassis life",
    ],
    suitableFor: "Older vehicles and cars driven on wet or coastal roads.",
  },
  {
    id: "headlight-restoration",
    name: "Headlight Restoration",
    short: "Restore clarity and appearance.",
    image: headlight,
    icon: "lightbulb",
    description:
      "Multi-stage sanding, polishing and sealing of yellowed or hazy headlight lenses to bring back clear output and a sharp front-end look.",
    benefits: [
      "Removes yellowing and haze",
      "Brighter, safer night driving",
      "Sealed to slow re-oxidation",
      "Far cheaper than replacement",
    ],
    suitableFor: "Cars with faded, cloudy or scratched lenses.",
  },
  {
    id: "bike-detailing",
    name: "Bike Detailing",
    short: "Professional detailing for two-wheelers.",
    image: bike,
    icon: "bike",
    description:
      "Full two-wheeler detailing with foam wash, polishing, scratch removal and optional bike ceramic coating for a factory-fresh finish.",
    benefits: [
      "Tank and panel polishing",
      "Chain, wheel and engine detailing",
      "Optional bike ceramic coating",
      "Scratch and swirl reduction",
    ],
    suitableFor: "Commuter, cruiser and sport bikes.",
  },
  {
    id: "inside-cleaning",
    name: "Inside Cleaning",
    short: "Deep interior cleaning and treatment.",
    image: interior,
    icon: "armchair",
    description:
      "Interior deep clean — vacuuming, shampoo extraction, leather and suede care, dashboard and vent detailing, finished with an odour treatment.",
    benefits: [
      "Seat and carpet shampoo extraction",
      "Leather & suede cleaning and conditioning",
      "Dashboard, vents and console detailing",
      "Fresh, odour-free cabin",
    ],
    suitableFor: "Family cars, taxis and long-owned vehicles.",
  },
];

// Placeholder review content for development. Replace with verified Google reviews.
export const reviews = [
  {
    quote: "Excellent service and customer support. My car looks brand new!",
    name: "Sai Kiran",
    location: "Ongole",
  },
  {
    quote:
      "Got the ceramic coating done here. The finish and shine are outstanding, and the team explained everything clearly.",
    name: "Ravi Teja",
    location: "Ongole",
  },
  {
    quote:
      "Neat interior deep cleaning and a perfect foam wash. Genuinely premium work at a fair price.",
    name: "Venu Gopal",
    location: "Ongole",
  },
];

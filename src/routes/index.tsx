import { createFileRoute } from "@tanstack/react-router";
import { Header } from "@/components/site/Header";
import { Hero } from "@/components/site/Hero";
import { TrustStats } from "@/components/site/TrustStats";
import { ServicesSection } from "@/components/site/Services";
import { BeforeAfterSection } from "@/components/site/BeforeAfter";
import { ReviewsCarousel } from "@/components/site/Reviews";
import { LocationSection } from "@/components/site/Location";
import { FinalCTA } from "@/components/site/FinalCTA";
import { Footer } from "@/components/site/Footer";
import { MobileActionBar } from "@/components/site/MobileActionBar";
import { BookingModal } from "@/components/site/BookingModal";
import { InstallBanner } from "@/components/site/InstallBanner";
import { AboutSection } from "@/components/site/About";
import { JobsSection } from "@/components/site/Jobs";
import { JobApplicationModal } from "@/components/site/JobApplicationModal";
import { business, services } from "@/data/site";

const title = "AutoHerb Ongole | Premium Car Detailing & Ceramic Coating";
const description =
  "AutoHerb Ongole — premium car detailing studio on Guntur Road, Ongole. Ceramic coating, PPF, full car spa, foam wash, glass treatment and bike detailing. Call 90321 17101.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      {
        name: "keywords",
        content:
          "car detailing Ongole, ceramic coating Ongole, PPF Ongole, car wash Ongole, premium car care Ongole, AutoHerb Ongole",
      },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "AutoDetailing",
          name: "AutoHerb Ongole",
          description,
          telephone: "+91 90321 17101",
          address: {
            "@type": "PostalAddress",
            streetAddress: "Guntur Road, Opp. Ravi Priya Mall, Venkateswara Nagar",
            addressLocality: "Ongole",
            addressRegion: "Andhra Pradesh",
            postalCode: "523001",
            addressCountry: "IN",
          },
          openingHoursSpecification: [
            {
              "@type": "OpeningHoursSpecification",
              dayOfWeek: [
                "Monday",
                "Tuesday",
                "Wednesday",
                "Thursday",
                "Friday",
                "Saturday",
                "Sunday",
              ],
              opens: "07:30",
              closes: "20:00",
            },
          ],
          hasOfferCatalog: {
            "@type": "OfferCatalog",
            name: "Car care services",
            itemListElement: services.map((s) => ({
              "@type": "Offer",
              itemOffered: { "@type": "Service", name: s.name, description: s.description },
            })),
          },
        }),
      },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <Hero />
        <TrustStats />
        <AboutSection />
        <ServicesSection />
        <BeforeAfterSection />
        <ReviewsCarousel />
        <LocationSection />
        <JobsSection />
        <FinalCTA />
      </main>
      <Footer />
      <MobileActionBar />
      <BookingModal />
      <JobApplicationModal />
      <InstallBanner />
      <span className="sr-only">{business.name}</span>
    </div>
  );
}

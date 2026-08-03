import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { ShieldCheck, Star, Clock, Check } from "lucide-react";
import Header from "../components/Header";
import SearchBar from "../components/SearchBar";
import FeaturesGrid from "../components/FeaturesGrid";
import InfoSection from "../components/InfoSection";
import VehicleCarousel from "../components/VehicleCarousel";
import ReviewGrid from "../components/ReviewGrid";
import DestinationsSection from "../components/DestinationsSection";
import AppPromo from "../components/AppPromo";
import NewsletterSection from "../components/NewsletterSection";
import Footer from "../components/Footer";
import { HOMEPAGE_HERO_IMAGE_URL } from "../lib/brand-images";
import { searchLocations } from "../lib/location-search";
import { addDaysIso } from "../lib/trip";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Agadir Driver — Chauffeur privé & transferts premium à Agadir" },
      {
        name: "description",
        content:
          "Réservez un chauffeur privé à Agadir, Taghazout et partout au Maroc. Transferts aéroport, trajets ville à ville et location à l'heure, prix fixes.",
      },
      {
        property: "og:title",
        content: "Agadir Driver — Chauffeur privé & transferts premium à Agadir",
      },
      {
        property: "og:description",
        content:
          "Réservez un chauffeur privé à Agadir, Taghazout et partout au Maroc. Transferts aéroport, trajets ville à ville et location à l'heure, prix fixes.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: Index,
});

const TRUST_ITEMS = [
  { Icon: Star, value: "4,9 / 5", label: "38 036 avis vérifiés" },
  { Icon: ShieldCheck, value: "Prix fixe", label: "Taxes et péages inclus" },
  { Icon: Clock, value: "24/7", label: "Assistance en français" },
];

const HERO_BULLETS = [
  "Annulation gratuite jusqu'à 24 h avant",
  "60 min d'attente offertes à l'aéroport",
  "Chauffeur assigné 6 h avant le départ",
];

/** Resolve a display name to a real catalog label so pricing stays accurate. */
function resolveLabel(name: string) {
  const groups = searchLocations(name, "all", 1);
  return groups[0]?.options[0]?.label ?? name;
}

function Index() {
  const navigate = useNavigate();

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    else window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleNavClick = (section: string) => {
    if (section === "destinations" || section === "help") {
      scrollTo(section === "help" ? "footer" : "destinations");
      return;
    }
    scrollTo("booking");
  };

  const handleSelectDestination = (destinationName: string) => {
    navigate({
      to: "/reservation",
      search: {
        from: "Aéroport Agadir Al Massira (AGA)",
        to: resolveLabel(destinationName),
        date: addDaysIso(1),
        time: "10:00",
        pax: 2,
        mode: "transfer",
      },
    });
  };

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header onNavClick={handleNavClick} />

      <main className="flex-1">
        {/* Hero */}
        <section className="border-b border-border">
          <div className="mx-auto max-w-7xl px-4 pt-10 pb-10 sm:px-6 lg:px-8 lg:pt-16 lg:pb-14">
            <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12 lg:gap-14">
              <div className="lg:col-span-6">
                <h1 className="text-4xl leading-[1.05] font-semibold tracking-tight text-balance text-foreground sm:text-5xl lg:text-6xl">
                  Allez où vous voulez, avec un chauffeur privé
                </h1>
                <p className="mt-5 max-w-lg text-base leading-relaxed text-muted-foreground sm:text-lg">
                  Transferts aéroport, trajets entre villes et mise à disposition à l&apos;heure à
                  Agadir, Taghazout et partout au Maroc. Prix fixe confirmé avant de réserver.
                </p>

                <ul className="mt-6 flex flex-col gap-2.5">
                  {HERO_BULLETS.map((bullet) => (
                    <li
                      key={bullet}
                      className="flex items-center gap-2.5 text-[15px] text-foreground"
                    >
                      <Check size={16} strokeWidth={2.5} aria-hidden="true" />
                      {bullet}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="lg:col-span-6">
                <img
                  src={HOMEPAGE_HERO_IMAGE_URL}
                  alt="Berline noire avec chauffeur privé attendant un passager"
                  className="aspect-4/3 w-full rounded-2xl object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
            </div>

            {/* One-row search */}
            <div id="booking" className="mt-10 scroll-mt-24 lg:mt-14">
              <SearchBar />
            </div>

            {/* Trust strip */}
            <div className="mt-10 grid grid-cols-1 gap-6 border-t border-border pt-8 sm:grid-cols-3">
              {TRUST_ITEMS.map(({ Icon, value, label }) => (
                <div key={value} className="flex items-center gap-3">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-muted">
                    <Icon size={17} strokeWidth={2} aria-hidden="true" />
                  </span>
                  <span>
                    <span className="block text-[15px] font-semibold text-foreground">{value}</span>
                    <span className="block text-[13px] text-muted-foreground">{label}</span>
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <FeaturesGrid />
        <VehicleCarousel onBookVehicle={() => scrollTo("booking")} />
        <InfoSection />
        <DestinationsSection onSelectDestination={handleSelectDestination} />
        <ReviewGrid />
        <AppPromo />
        <NewsletterSection />
      </main>

      <div id="footer">
        <Footer />
      </div>
    </div>
  );
}

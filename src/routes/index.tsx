import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { ShieldCheck, Star, Clock } from "lucide-react";
import Header from "../components/Header";
import BookingWidget from "../components/BookingWidget";
import AppPromo from "../components/AppPromo";
import FeaturesGrid from "../components/FeaturesGrid";
import InfoSection from "../components/InfoSection";
import VehicleCarousel from "../components/VehicleCarousel";
import ReviewGrid from "../components/ReviewGrid";
import DestinationsSection from "../components/DestinationsSection";
import NewsletterSection from "../components/NewsletterSection";
import Footer from "../components/Footer";
import type { VehicleClass } from "../types";
import heroImg from "../assets/images/hero_couple.jpg.asset.json";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Agadir Driver — Chauffeur privé & transferts premium à Agadir" },
      {
        name: "description",
        content:
          "Réservez un chauffeur privé à Agadir, Taghazout et partout au Maroc. Transferts aéroport, trajets ville à ville et location à l'heure, prix fixes.",
      },
      { property: "og:title", content: "Agadir Driver — Chauffeur privé & transferts premium à Agadir" },
      {
        property: "og:description",
        content: "Réservez un chauffeur privé à Agadir, Taghazout et partout au Maroc. Transferts aéroport, trajets ville à ville et location à l'heure, prix fixes.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: Index,
});

function Index() {
  const [toLocation, setToLocation] = useState("");
  const [vehicleId, setVehicleId] = useState("");
  const [bookingKey, setBookingKey] = useState(0);

  const handleSelectDestination = (destinationName: string) => {
    setToLocation(destinationName);
    setVehicleId("");
    setBookingKey((prev) => prev + 1);
  };

  const handleSelectVehicle = (vehicle: VehicleClass) => {
    setToLocation("Taghazout (Hôtel / Surf Camp)");
    setVehicleId(vehicle.id);
    setBookingKey((prev) => prev + 1);
  };

  const handleNavScroll = (sectionId: string) => {
    if (sectionId === "hero") {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    let targetElement: HTMLElement | null = null;
    if (sectionId === "airport" || sectionId === "intercity" || sectionId === "hourly") {
      targetElement = document.getElementById("booking-interface");
    } else if (sectionId === "help" || sectionId === "business") {
      targetElement = document.getElementById("footer-anchor");
    }
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col justify-between selection:bg-[#EAB308]/30 selection:text-black">
      <Header onNavClick={handleNavScroll} />

      <main className="flex-1">
        {/* Redesigned Hero — structured & professional on desktop */}
        <section className="relative overflow-hidden bg-[#0F1115]">
          {/* Backdrop image with dark gradient overlay */}
          <div className="absolute inset-0">
            <img
              src={heroImg.url}
              alt=""
              aria-hidden="true"
              className="w-full h-full object-cover object-center opacity-40 lg:opacity-30"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#0F1115] via-[#0F1115]/95 to-[#0F1115]/40" />
            <div className="absolute inset-0 bg-gradient-to-b from-[#0F1115]/60 via-transparent to-[#0F1115]" />
          </div>

          {/* Subtle grid pattern */}
          <div
            className="absolute inset-0 opacity-[0.04] pointer-events-none"
            style={{
              backgroundImage:
                "linear-gradient(#EAB308 1px, transparent 1px), linear-gradient(90deg, #EAB308 1px, transparent 1px)",
              backgroundSize: "48px 48px",
            }}
          />

          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 lg:py-24">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
              {/* Left: headline + trust */}
              <div className="lg:col-span-6 xl:col-span-6 space-y-8 text-white">
                <div className="inline-flex items-center gap-2 rounded-full border border-[#EAB308]/30 bg-[#EAB308]/10 px-3 py-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#EAB308] animate-pulse" />
                  <span className="text-[10px] font-bold text-[#EAB308] uppercase tracking-widest font-mono">
                    Partenaire Officiel Aéroport d'Agadir
                  </span>
                </div>

                <h1 className="font-display font-black tracking-tight uppercase leading-[0.95] text-4xl sm:text-5xl lg:text-6xl xl:text-7xl">
                  Chauffeur privé
                  <br />
                  <span className="text-[#EAB308]">premium</span> à Agadir
                </h1>

                <p className="text-base lg:text-lg text-gray-300 font-medium max-w-xl leading-relaxed">
                  Transferts aéroportuaires, trajets ville à ville et mise à
                  disposition à l'heure. Prix fixes, chauffeurs multilingues,
                  véhicules haut de gamme.
                </p>

                {/* Trust strip */}
                <div className="grid grid-cols-3 gap-4 max-w-xl pt-4 border-t border-white/10">
                  <div className="flex items-start gap-2.5">
                    <div className="w-9 h-9 rounded-lg bg-[#EAB308]/15 text-[#EAB308] flex items-center justify-center shrink-0">
                      <Star size={16} strokeWidth={2.5} />
                    </div>
                    <div>
                      <div className="text-sm font-extrabold text-white">4.9/5</div>
                      <div className="text-[11px] text-gray-400 font-medium">+2 400 avis</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <div className="w-9 h-9 rounded-lg bg-[#EAB308]/15 text-[#EAB308] flex items-center justify-center shrink-0">
                      <ShieldCheck size={16} strokeWidth={2.5} />
                    </div>
                    <div>
                      <div className="text-sm font-extrabold text-white">Assuré</div>
                      <div className="text-[11px] text-gray-400 font-medium">Flotte certifiée</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <div className="w-9 h-9 rounded-lg bg-[#EAB308]/15 text-[#EAB308] flex items-center justify-center shrink-0">
                      <Clock size={16} strokeWidth={2.5} />
                    </div>
                    <div>
                      <div className="text-sm font-extrabold text-white">24/7</div>
                      <div className="text-[11px] text-gray-400 font-medium">Assistance</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right: Booking card */}
              <div className="lg:col-span-6 xl:col-span-6">
                <div className="relative">
                  <div className="absolute -inset-1 bg-gradient-to-br from-[#EAB308]/40 to-transparent rounded-3xl blur-xl opacity-60" />
                  <div className="relative rounded-2xl bg-[#0f1115] shadow-2xl ring-1 ring-[#F5A623]/20 overflow-hidden">
                    <div className="flex items-center justify-between px-5 py-3 bg-[#0F1115] text-white border-b border-black/10">
                      <div className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-[#EAB308]" />
                        <span className="text-xs font-bold uppercase tracking-wider font-mono">
                          Réservation instantanée
                        </span>
                      </div>
                      <span className="text-[10px] text-gray-400 font-mono uppercase tracking-widest hidden sm:inline">
                        Prix fixe garanti
                      </span>
                    </div>
                    <div className="p-5 sm:p-6">
                      <BookingWidget
                        key={bookingKey}
                        initialToLocation={toLocation}
                        initialVehicleId={vehicleId}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <AppPromo />
        <FeaturesGrid />
        <InfoSection />
        <VehicleCarousel onSelectVehicle={handleSelectVehicle} />
        <ReviewGrid />
        <DestinationsSection onSelectDestination={handleSelectDestination} />
        <NewsletterSection />
      </main>

      <div id="footer-anchor">
        <Footer />
      </div>
    </div>
  );
}

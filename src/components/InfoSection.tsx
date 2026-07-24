import React from 'react';
import { Sparkles, Compass, CheckCircle2, Map, Users, Milestone } from 'lucide-react';
import travelCoupleImg from "../assets/images/travel_couple.jpg.asset.json";
import luxuryVanImg from "../assets/images/luxury_van.jpg.asset.json";

export default function InfoSection() {
  return (
    <section className="py-16 bg-[#F9FAFB] space-y-24 border-b border-gray-100">
      
      {/* Block 1: Couple Walking (Left) & Coverage Text (Right) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Image Container */}
          <div className="lg:col-span-5 relative group">
            <div className="absolute -inset-1.5 bg-gradient-to-r from-yellow-500/30 to-amber-500/30 rounded-3xl blur-md opacity-70 group-hover:opacity-100 transition-opacity"></div>
            <img
              src={travelCoupleImg.url}
              alt="Chauffeur accueillant un couple de voyageurs élégants à Agadir"
              className="relative rounded-2xl w-full object-cover aspect-[4/3] shadow-lg"
              referrerPolicy="no-referrer"
            />
          </div>

          {/* Text Container */}
          <div className="lg:col-span-7 space-y-5">
            <span className="text-[10px] font-bold text-[#EAB308] uppercase tracking-widest bg-gray-100 px-3 py-1 rounded-full border border-gray-200 inline-block font-mono">
              Votre chauffeur personnel, à portée de main
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-gray-900 tracking-tight font-display uppercase leading-tight">
              Couverture nationale marocaine
            </h2>
            
            <div className="space-y-4 text-xs sm:text-sm text-gray-500 leading-relaxed font-medium">
              <p>
                Réservez votre chauffeur privé en quelques secondes et profitez d'une expérience de voyage haut de gamme adaptée à votre emploi du temps marocain. Un transport fiable, confortable et sans stress est désormais plus facile que jamais de Casablanca à Dakhla. Arrivez à destination reposé, détendu et toujours à la minute près.
              </p>
              <p>
                Que vous voyagiez pour affaires à Marrakech, pour le plaisir à Essaouira, ou pour dompter les vagues à Taghazout, nos chauffeurs professionnels fournissent un service d'exception pour garantir que votre trajet soit fluide et serein. Réservez simplement en ligne et laissez-nous gérer le reste.
              </p>
            </div>

            {/* Geometric separating element in gold */}
            <div className="flex gap-1.5 py-2">
              <div className="w-10 h-1 bg-[#EAB308] rounded-full"></div>
              <div className="w-3 h-1 bg-[#0F1115] rounded-full"></div>
            </div>

            {/* Stats Row */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 pt-4 border-t border-gray-100">
              <div>
                <span className="block text-2xl font-black text-gray-900 font-mono">12+</span>
                <span className="block text-[10px] font-bold text-gray-400 uppercase tracking-wider">Régions</span>
              </div>
              <div>
                <span className="block text-2xl font-black text-gray-900 font-mono">50+</span>
                <span className="block text-[10px] font-bold text-gray-400 uppercase tracking-wider">Villes</span>
              </div>
              <div>
                <span className="block text-2xl font-black text-gray-900 font-mono">10+</span>
                <span className="block text-[10px] font-bold text-gray-400 uppercase tracking-wider">Aéroports</span>
              </div>
              <div>
                <span className="block text-2xl font-black text-gray-900 font-mono">∞</span>
                <span className="block text-[10px] font-bold text-gray-400 uppercase tracking-wider">Itinéraires</span>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Block 2: Text (Left) & Van Image (Right) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Text Container */}
          <div className="lg:col-span-7 space-y-5 order-2 lg:order-1">
            <span className="text-[10px] font-bold text-[#EAB308] uppercase tracking-widest bg-gray-100 px-3 py-1 rounded-full border border-gray-200 inline-block font-mono">
              Voyagez confortablement, arrivez en toute confiance
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-gray-900 tracking-tight font-display uppercase leading-tight">
              Sans le moindre accroc
            </h2>
            
            <div className="space-y-4 text-xs sm:text-sm text-gray-500 leading-relaxed font-medium">
              <p>
                Profitez du luxe d'un service de chauffeur privé conçu exclusivement pour répondre à vos exigences. Notre outil de réservation en ligne instantané rend vos trajets sans stress, vous permettant de vous concentrer sur vos loisirs ou vos impératifs professionnels.
              </p>
              <p>
                Nos chauffeurs d'élite offrent une fiabilité hors pair et une attention personnalisée à chaque passager. Des rafraîchissements, des lingettes hydroalcooliques, et un réseau Wi-Fi haut débit sécurisé transforment votre trajet en un véritable salon roulant.
              </p>
            </div>

            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-bold text-gray-700">
              <li className="flex items-center gap-2">
                <CheckCircle2 size={15} className="text-[#EAB308]" />
                Annulation gratuite 24h à l'avance
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 size={15} className="text-[#EAB308]" />
                60 minutes d'attente gratuite aux aéroports
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 size={15} className="text-[#EAB308]" />
                Chauffeurs locaux certifiés bilingues
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 size={15} className="text-[#EAB308]" />
                Pas de frais cachés, prix garantis
              </li>
            </ul>
          </div>

          {/* Image Container */}
          <div className="lg:col-span-5 relative group order-1 lg:order-2">
            <div className="absolute -inset-1.5 bg-gradient-to-r from-yellow-500/30 to-amber-500/30 rounded-3xl blur-md opacity-70 group-hover:opacity-100 transition-opacity"></div>
            <img
              src={luxuryVanImg.url}
              alt="Mercedes Classe V haut de gamme garée devant un complexe hôtelier à Agadir"
              className="relative rounded-2xl w-full object-cover aspect-[4/3] shadow-lg"
              referrerPolicy="no-referrer"
            />
          </div>

        </div>
      </div>

      {/* Block 3: Comment ça marche (3 Step guide) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl border border-gray-100 p-8 sm:p-12 shadow-sm">
          <h3 className="text-xl sm:text-2xl font-black text-gray-900 tracking-tight font-display uppercase text-center mb-10">
            Comment ça marche
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
            {/* Visual connector lines on desktop */}
            <div className="hidden md:block absolute top-6 left-1/6 right-1/6 h-0.5 bg-gray-100 z-0"></div>

            {/* Step 1 */}
            <div className="space-y-3 text-center relative z-10">
              <div className="w-12 h-12 bg-[#EAB308] text-[#0F1115] font-black font-mono text-base rounded-full flex items-center justify-center mx-auto shadow-md shadow-yellow-500/15">
                1
              </div>
              <h4 className="font-extrabold text-sm text-gray-900 uppercase tracking-wide">
                Indiquez votre itinéraire
              </h4>
              <p className="text-xs text-gray-400 font-medium leading-relaxed max-w-xs mx-auto">
                Saisissez vos adresses de départ et d'arrivée, dates, heures et choisissez la classe de véhicule idéale.
              </p>
            </div>

            {/* Step 2 */}
            <div className="space-y-3 text-center relative z-10">
              <div className="w-12 h-12 bg-[#EAB308] text-[#0F1115] font-black font-mono text-base rounded-full flex items-center justify-center mx-auto shadow-md shadow-yellow-500/15">
                2
              </div>
              <h4 className="font-extrabold text-sm text-gray-900 uppercase tracking-wide">
                Complétez la réservation
              </h4>
              <p className="text-xs text-gray-400 font-medium leading-relaxed max-w-xs mx-auto">
                Saisissez les coordonnées du passager principal, le numéro de vol pour le suivi et procédez au paiement sécurisé.
              </p>
            </div>

            {/* Step 3 */}
            <div className="space-y-3 text-center relative z-10">
              <div className="w-12 h-12 bg-[#0F1115] text-[#EAB308] font-black text-base rounded-full flex items-center justify-center mx-auto shadow-md shadow-black/15">
                ✓
              </div>
              <h4 className="font-extrabold text-sm text-gray-900 uppercase tracking-wide">
                Rencontrez votre chauffeur
              </h4>
              <p className="text-xs text-gray-400 font-medium leading-relaxed max-w-xs mx-auto">
                Recevez le contact de votre chauffeur 6h avant la course. Il vous attend avec une pancarte nominative à l'aéroport.
              </p>
            </div>

          </div>
        </div>
      </div>

    </section>
  );
}

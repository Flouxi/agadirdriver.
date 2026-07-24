import React, { useState } from 'react';
import { Globe, Users, Clock, ShieldCheck, ArrowRight, X } from 'lucide-react';

interface FeatureCard {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  detailedInfo: string;
  icon: React.ReactNode;
}

export default function FeaturesGrid() {
  const [selectedFeature, setSelectedFeature] = useState<FeatureCard | null>(null);

  const features: FeatureCard[] = [
    {
      id: 'local',
      title: "Service Local & Régional",
      subtitle: "La région de Souss-Massa",
      description: "Où que vous alliez à Agadir, Taghazout, Essaouira ou Marrakech, Agadir Driver garantit votre confort tout au long du trajet.",
      detailedInfo: "Notre service couvre l'intégralité d'Agadir, la zone balnéaire de Taghazout Bay, les liaisons de surf ainsi que l'arrière-pays du Souss. Nos chauffeurs connaissent parfaitement les raccourcis locaux et les emplacements des grands resorts pour vous assurer une arrivée rapide et sans stress.",
      icon: <Globe className="text-[#0F1115] w-6 h-6" />
    },
    {
      id: 'chauffeurs',
      title: "Chauffeurs professionnels",
      subtitle: "Chauffeurs bilingues certifiés",
      description: "Nos chauffeurs professionnels, bilingues (français, anglais, arabe), discrets et attentionnés, assurent des courses irréprochables.",
      detailedInfo: "Tous nos conducteurs sont agréés pour le transport touristique de luxe par le Ministère du Transport marocain. Ils possèdent une assurance spéciale passagers illimitée, portent une tenue formelle soignée et sont formés pour s'adapter à toutes vos demandes de discrétion ou d'accompagnement.",
      icon: <Users className="text-[#0F1115] w-6 h-6" />
    },
    {
      id: 'hourly',
      title: "Chauffeur à l'heure",
      subtitle: "Mise à disposition flexible",
      description: "Réservez un chauffeur privé à l'heure pour vos besoins de shopping, réunions d'affaires ou excursions touristiques.",
      detailedInfo: "La mise à disposition horaire vous permet d'avoir un véhicule haut de gamme et son chauffeur dédié restant à votre entière disposition. Idéal pour visiter la Kasbah d'Agadir Oufella, flâner au Souk El Had ou enchaîner des rendez-vous d'affaires sans vous soucier de chercher un nouveau taxi à chaque arrêt.",
      icon: <Clock className="text-[#0F1115] w-6 h-6" />
    },
    {
      id: 'intercity',
      title: "Transferts intervilles",
      subtitle: "Liaisons longue distance",
      description: "Explorez le Maroc à tout moment, en tout lieu — voyages sécurisés entre Agadir, Marrakech, Casablanca ou Essaouira.",
      detailedInfo: "Évitez la fatigue des transports en commun ou de la location de voiture. Nos transferts longue distance par l'autoroute vous permettent de voyager de porte-à-porte dans un confort absolu. Bouteilles d'eau fraîche, connexion Wi-Fi haut débit et chargeurs de téléphones sont mis à votre disposition à bord.",
      icon: <ShieldCheck className="text-[#0F1115] w-6 h-6" />
    }
  ];

  return (
    <section className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Responsive Grid layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feat) => (
            <div
              key={feat.id}
              className="bg-white border border-gray-100 hover:border-gray-900/10 rounded-2xl p-6 transition-all duration-300 shadow-sm hover:shadow-md flex flex-col justify-between group"
            >
              <div>
                {/* Header Icon on Circle Background */}
                <div className="flex justify-between items-start mb-6">
                  <div className="w-12 h-12 rounded-xl bg-gray-50 flex items-center justify-center border border-gray-100 group-hover:bg-[#EAB308] group-hover:border-[#EAB308] transition-colors duration-300">
                    {feat.icon}
                  </div>
                  <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest bg-gray-50 px-2 py-0.5 rounded">
                    Service
                  </span>
                </div>

                {/* Content */}
                <h3 className="font-extrabold text-base text-gray-900 mb-1 group-hover:text-[#EAB308] transition-colors">
                  {feat.title}
                </h3>
                <span className="block text-[11px] font-bold text-[#EAB308] mb-3 uppercase tracking-wide">
                  {feat.subtitle}
                </span>
                <p className="text-xs text-gray-500 leading-relaxed font-medium">
                  {feat.description}
                </p>
              </div>

              {/* Action Trigger */}
              <div className="border-t border-gray-100 pt-4 mt-6">
                <button
                  type="button"
                  onClick={() => setSelectedFeature(feat)}
                  className="w-full py-2.5 bg-gray-50 hover:bg-[#0F1115] hover:text-[#EAB308] text-gray-700 text-xs font-bold rounded-lg flex items-center justify-center gap-1 transition-all cursor-pointer"
                >
                  <span>Détails</span>
                  <ArrowRight size={13} className="group-hover:translate-x-0.5 transition-transform" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Details Dialog Modal */}
        {selectedFeature && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs transition-opacity">
            <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-gray-100 relative animate-in fade-in-50 zoom-in-95 duration-200">
              <button
                onClick={() => setSelectedFeature(null)}
                className="absolute top-4 right-4 text-gray-400 hover:text-gray-900 rounded-full p-1 hover:bg-gray-100"
              >
                <X size={18} />
              </button>

              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg bg-[#EAB308] flex items-center justify-center">
                  {selectedFeature.icon}
                </div>
                <div>
                  <h4 className="font-extrabold text-base text-gray-900">{selectedFeature.title}</h4>
                  <span className="text-[10px] font-bold text-[#EAB308] uppercase">{selectedFeature.subtitle}</span>
                </div>
              </div>

              <div className="space-y-3.5 text-xs text-gray-600 leading-relaxed">
                <p className="font-semibold text-gray-800">
                  {selectedFeature.description}
                </p>
                <div className="p-3.5 bg-gray-50 rounded-xl border border-gray-100 text-gray-500 font-medium">
                  {selectedFeature.detailedInfo}
                </div>
              </div>

              <div className="mt-6 flex justify-end">
                <button
                  onClick={() => setSelectedFeature(null)}
                  className="px-4 py-2.5 bg-[#0F1115] hover:bg-gray-800 text-[#EAB308] text-xs font-bold rounded-xl"
                >
                  Fermer
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    </section>
  );
}

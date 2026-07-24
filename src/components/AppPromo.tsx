import React from 'react';
import { Smartphone, Download, QrCode, Sparkles, Check, Bell } from 'lucide-react';

export default function AppPromo() {
  return (
    <section className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Container - Black Rounded Card */}
        <div className="bg-[#0F1115] rounded-[2rem] p-8 sm:p-12 lg:p-16 text-white relative overflow-hidden shadow-2xl border border-gray-800 flex flex-col lg:flex-row gap-12 items-center">
          
          {/* Radial visual background decoration */}
          <div className="absolute top-0 right-0 w-[450px] h-[450px] bg-yellow-500/5 rounded-full blur-[120px] pointer-events-none"></div>
          <div className="absolute -bottom-20 -left-20 w-[300px] h-[300px] bg-yellow-500/5 rounded-full blur-[80px] pointer-events-none"></div>

          {/* Left Text and Buttons Block */}
          <div className="flex-1 space-y-6 z-10 max-w-xl">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-yellow-500/10 border border-yellow-500/20 text-[#EAB308] text-[11px] font-bold uppercase tracking-wider">
              <Sparkles size={11} />
              <span>Application Chauffeur Agadir Driver</span>
            </div>
            
            <h2 className="text-3xl sm:text-4xl font-black tracking-tight font-display text-white leading-tight">
              Prenez votre temps !
            </h2>
            
            <p className="text-sm text-gray-300 font-medium leading-relaxed">
              Réservez, suivez votre chauffeur en temps réel, modifiez la date et l'heure, ou annulez vos trajets gratuitement jusqu'à 24 heures à l'avance directement depuis notre application mobile.
            </p>

            {/* Checklist */}
            <ul className="grid grid-cols-2 gap-3.5 text-xs font-semibold text-gray-300">
              <li className="flex items-center gap-2">
                <span className="w-4 h-4 rounded-full bg-yellow-500/20 text-[#EAB308] flex items-center justify-center text-[10px]">✓</span>
                Suivi GPS en direct
              </li>
              <li className="flex items-center gap-2">
                <span className="w-4 h-4 rounded-full bg-yellow-500/20 text-[#EAB308] flex items-center justify-center text-[10px]">✓</span>
                Alertes SMS / Notifications
              </li>
              <li className="flex items-center gap-2">
                <span className="w-4 h-4 rounded-full bg-yellow-500/20 text-[#EAB308] flex items-center justify-center text-[10px]">✓</span>
                Chauffeur attitré
              </li>
              <li className="flex items-center gap-2">
                <span className="w-4 h-4 rounded-full bg-yellow-500/20 text-[#EAB308] flex items-center justify-center text-[10px]">✓</span>
                Paiement dématérialisé
              </li>
            </ul>

            {/* App Badges & QR Row */}
            <div className="flex flex-col sm:flex-row items-center gap-6 pt-4 border-t border-gray-800">
              
              {/* Fake QR Code */}
              <div className="flex items-center gap-3 bg-gray-900/60 p-3.5 rounded-2xl border border-gray-800">
                <div className="w-16 h-16 bg-white p-1 rounded-lg flex items-center justify-center shrink-0">
                  <QrCode size={52} className="text-[#0F1115]" />
                </div>
                <div>
                  <span className="block text-xs font-bold text-white">Scanner le QR Code</span>
                  <span className="block text-[10px] text-gray-400 font-medium mt-0.5">Téléchargement immédiat de l'App</span>
                </div>
              </div>

              {/* Store Badges */}
              <div className="flex flex-col gap-2.5 w-full sm:w-auto shrink-0">
                <button
                  type="button"
                  className="flex items-center gap-3 px-4 py-2.5 bg-black hover:bg-gray-900 border border-gray-800 rounded-xl transition-all cursor-pointer w-full sm:w-44 text-left"
                >
                  <Smartphone size={18} className="text-white" />
                  <div>
                    <span className="block text-[8px] text-gray-400 uppercase leading-none font-bold">Disponible sur l'</span>
                    <span className="block text-xs font-bold text-white leading-tight">App Store</span>
                  </div>
                </button>
                <button
                  type="button"
                  className="flex items-center gap-3 px-4 py-2.5 bg-black hover:bg-gray-900 border border-gray-800 rounded-xl transition-all cursor-pointer w-full sm:w-44 text-left"
                >
                  <Smartphone size={18} className="text-yellow-500" />
                  <div>
                    <span className="block text-[8px] text-gray-400 uppercase leading-none font-bold">Disponible sur</span>
                    <span className="block text-xs font-bold text-white leading-tight">Google Play</span>
                  </div>
                </button>
              </div>

            </div>
          </div>

          {/* Right Smartphone Frame (Pure CSS Masterpiece) */}
          <div className="flex-1 w-full flex justify-center items-center relative h-[380px] sm:h-[450px]">
            {/* Phone 1: Background perspective phone */}
            <div className="absolute transform rotate-[-6deg] translate-x-[-12%] translate-y-[5%] scale-90 sm:scale-95 w-48 h-80 sm:w-56 sm:h-96 bg-[#161a22] border-4 border-gray-700 rounded-[2.5rem] shadow-2xl overflow-hidden hidden sm:block border-opacity-70">
              <div className="h-6 w-full bg-black flex justify-center items-center">
                <div className="w-12 h-3.5 bg-gray-950 rounded-full"></div>
              </div>
              <div className="p-4 space-y-4 text-left">
                <div className="flex items-center justify-between border-b border-gray-800 pb-2">
                  <span className="text-[10px] text-gray-400 font-bold">Agadir Driver App</span>
                  <div className="w-2 h-2 rounded-full bg-green-500"></div>
                </div>
                <div className="space-y-2">
                  <div className="h-10 bg-gray-800/80 rounded-lg p-2 flex items-center justify-between text-[10px]">
                    <span className="font-semibold">Aéroport Al Massira</span>
                    <span className="text-yellow-500">→</span>
                  </div>
                  <div className="h-10 bg-gray-800/80 rounded-lg p-2 flex items-center justify-between text-[10px]">
                    <span className="font-semibold">Taghazout Bay Resort</span>
                    <span className="text-yellow-500">✔</span>
                  </div>
                </div>
                <div className="pt-2">
                  <span className="text-[10px] text-gray-500 block font-bold uppercase mb-1">Chauffeur assigné</span>
                  <div className="flex items-center gap-2 bg-gray-800/50 p-2 rounded-lg">
                    <div className="w-6 h-6 rounded-full bg-yellow-500"></div>
                    <div>
                      <span className="block text-[10px] font-bold">Karim A.</span>
                      <span className="block text-[8px] text-gray-400">Mercedes Classe V</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Phone 2: Main foreground mockup */}
            <div className="relative z-10 w-52 h-88 sm:w-60 sm:h-98 bg-[#0F1115] border-4 border-yellow-500 rounded-[2.5rem] shadow-2xl overflow-hidden border-opacity-80">
              {/* Dynamic Island bar */}
              <div className="h-6 w-full bg-black flex justify-center items-center">
                <div className="w-14 h-3.5 bg-gray-950 rounded-full"></div>
              </div>
              
              {/* Phone Content Screen */}
              <div className="p-4 text-left h-full flex flex-col justify-between pb-8">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-[9px] text-gray-400 font-bold">Bienvenue</span>
                      <span className="block text-xs font-black text-white">Yassine El Agadiri</span>
                    </div>
                    <div className="w-7 h-7 rounded-full bg-yellow-500 flex items-center justify-center font-bold text-xs text-black">
                      Y
                    </div>
                  </div>

                  {/* Active Ticket UI Card */}
                  <div className="bg-gradient-to-br from-yellow-500 to-amber-600 rounded-2xl p-3.5 text-black space-y-3 shadow-md shadow-yellow-500/10">
                    <div className="flex justify-between items-center text-[9px] font-bold uppercase tracking-wider">
                      <span>Prochain Trajet</span>
                      <span className="bg-black text-[#EAB308] px-1.5 py-0.5 rounded">Confirmé</span>
                    </div>
                    <div>
                      <span className="text-[10px] font-bold opacity-70 uppercase">Lieu de prise en charge</span>
                      <span className="block text-xs font-black truncate leading-tight">Aéroport Agadir (AGA)</span>
                    </div>
                    <div className="flex justify-between items-center text-[10px] font-bold pt-1.5 border-t border-black/10">
                      <span>19 Juil, 13:45</span>
                      <span className="bg-white/30 px-2 py-0.5 rounded text-[9px]">Class S</span>
                    </div>
                  </div>

                  {/* Notification List Mock */}
                  <div className="space-y-2">
                    <span className="text-[9px] text-gray-500 font-bold uppercase tracking-wide block">Statut du Chauffeur</span>
                    <div className="bg-gray-900 border border-gray-800 rounded-xl p-2.5 flex items-center gap-2">
                      <Bell size={12} className="text-yellow-500 shrink-0" />
                      <div>
                        <span className="block text-[10px] font-bold">Chauffeur en route</span>
                        <span className="block text-[8px] text-gray-400">Karim est parti vers l'aéroport.</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Simulated Bottom Navigation */}
                <div className="border-t border-gray-900 pt-2 flex justify-between px-2 text-[9px] text-gray-500">
                  <span className="text-yellow-500 font-bold">Accueil</span>
                  <span>Trajets</span>
                  <span>Messagerie</span>
                  <span>Profil</span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

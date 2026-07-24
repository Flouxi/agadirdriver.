import React, { useState } from 'react';
import { DESTINATIONS } from '../data';
import { Destination } from '../types';
import { Plane, MapPin, Map, Snowflake, Search } from 'lucide-react';

interface DestinationsSectionProps {
  onSelectDestination?: (name: string, isAirport: boolean) => void;
}

export default function DestinationsSection({ onSelectDestination }: DestinationsSectionProps) {
  // 'all' | 'airport' | 'city' | 'ski'
  const [activeTab, setActiveTab] = useState<'all' | 'airport' | 'city' | 'ski'>('all');

  const filteredDestinations = activeTab === 'all'
    ? DESTINATIONS
    : DESTINATIONS.filter(d => d.type === activeTab);

  const handleSelect = (dest: Destination) => {
    if (onSelectDestination) {
      onSelectDestination(dest.name + (dest.type === 'airport' ? ' - ' + dest.airport : ''), dest.type === 'airport');
    }
    // Scroll to the booking interface
    const element = document.getElementById('booking-interface');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  return (
    <section className="py-16 bg-white border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <div className="flex items-center gap-1.5 text-xs font-bold text-gray-400 uppercase tracking-widest bg-gray-50 px-3 py-1 rounded-full border border-gray-100 w-max mb-3">
              <Map size={12} className="text-[#EAB308]" />
              <span>Destinations de prestige</span>
            </div>
            
            <h2 className="text-2xl sm:text-3xl font-black text-gray-900 tracking-tight font-display uppercase">
              Destinations phares au Maroc
            </h2>
            <p className="mt-1 text-xs sm:text-sm font-semibold text-gray-400">
              Réservez votre transfert privé d'élite vers les aéroports, ports et resorts du Royaume.
            </p>
          </div>

          {/* Filtration Tabs matching reference buttons */}
          <div className="flex flex-wrap gap-2 text-xs font-bold">
            <button
              onClick={() => setActiveTab('all')}
              className={`px-4 py-2.5 rounded-full border transition-all cursor-pointer ${
                activeTab === 'all'
                  ? 'bg-[#0F1115] text-[#EAB308] border-gray-900 shadow-sm'
                  : 'bg-white text-gray-600 border-gray-200 hover:border-gray-900'
              }`}
            >
              Tout voir
            </button>
            <button
              onClick={() => setActiveTab('airport')}
              className={`px-4 py-2.5 rounded-full border transition-all cursor-pointer ${
                activeTab === 'airport'
                  ? 'bg-[#0F1115] text-[#EAB308] border-gray-900 shadow-sm'
                  : 'bg-white text-gray-600 border-gray-200 hover:border-gray-900'
              }`}
            >
              Aéroports
            </button>
            <button
              onClick={() => setActiveTab('city')}
              className={`px-4 py-2.5 rounded-full border transition-all cursor-pointer ${
                activeTab === 'city'
                  ? 'bg-[#0F1115] text-[#EAB308] border-gray-900 shadow-sm'
                  : 'bg-white text-gray-600 border-gray-200 hover:border-gray-900'
              }`}
            >
              Villes & Resorts
            </button>
            <button
              onClick={() => setActiveTab('ski')}
              className={`px-4 py-2.5 rounded-full border transition-all cursor-pointer ${
                activeTab === 'ski'
                  ? 'bg-[#0F1115] text-[#EAB308] border-gray-900 shadow-sm'
                  : 'bg-white text-gray-600 border-gray-200 hover:border-gray-900'
              }`}
            >
              Stations de ski
            </button>
          </div>
        </div>

        {/* Dynamic Card Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredDestinations.map((dest) => (
            <div
              key={dest.id}
              onClick={() => handleSelect(dest)}
              className="group bg-white border border-gray-200 hover:border-gray-900/15 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer flex flex-col justify-between"
            >
              {/* Image with overlay */}
              <div className="relative h-48 bg-gray-100 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent z-1"></div>
                <img
                  src={dest.image}
                  alt={dest.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />

                {/* Left Bottom Icon Tag depending on Type */}
                <div className="absolute bottom-4 left-4 z-10 flex items-center gap-1.5 text-white">
                  {dest.type === 'airport' && <Plane size={14} className="text-[#EAB308]" />}
                  {dest.type === 'city' && <MapPin size={14} className="text-[#EAB308]" />}
                  {dest.type === 'ski' && <Snowflake size={14} className="text-sky-400" />}
                  <span className="text-xs font-bold uppercase tracking-wide font-display">{dest.name}</span>
                </div>

                {/* Right Top Category Badge */}
                <span className="absolute top-3 right-3 bg-white/95 text-gray-800 text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded shadow-xs">
                  {dest.type === 'airport' ? 'Aéroport' : dest.type === 'city' ? 'Hôtel/Surf' : 'Ski'}
                </span>
              </div>

              {/* Card Footer Details */}
              <div className="p-4 bg-white flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-gray-400 font-bold uppercase block leading-3">Lieu desservi</span>
                  <span className="text-[11px] font-semibold text-gray-700 block truncate max-w-[150px] sm:max-w-[200px]">
                    {dest.airport}
                  </span>
                </div>
                
                {/* Visual booking shortcut */}
                <span className="w-8 h-8 rounded-full bg-gray-50 text-gray-400 group-hover:bg-[#EAB308] group-hover:text-black flex items-center justify-center transition-colors">
                  <Search size={14} />
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom prompt informing user they can select */}
        <div className="mt-8 flex items-center justify-center gap-2 text-xs text-gray-400 bg-gray-50 py-3 px-4 rounded-xl border border-gray-100 max-w-full sm:w-max mx-auto font-medium text-center">
          <span className="w-2 h-2 shrink-0 rounded-full bg-[#EAB308]"></span>
          <span>Conseil : Cliquez sur une destination pour la renseigner automatiquement dans le formulaire de réservation !</span>
        </div>


      </div>
    </section>
  );
}

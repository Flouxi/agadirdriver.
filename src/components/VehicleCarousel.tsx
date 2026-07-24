import React, { useRef } from 'react';
import { VEHICLES } from '../data';
import { VehicleClass } from '../types';
import { ChevronLeft, ChevronRight, User, Shield, Info } from 'lucide-react';

interface VehicleCarouselProps {
  onSelectVehicle?: (vehicle: VehicleClass) => void;
}

export default function VehicleCarousel({ onSelectVehicle }: VehicleCarouselProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (containerRef.current) {
      const { scrollLeft, clientWidth } = containerRef.current;
      const scrollTo = direction === 'left' ? scrollLeft - clientWidth * 0.75 : scrollLeft + clientWidth * 0.75;
      containerRef.current.scrollTo({ left: scrollTo, behavior: 'smooth' });
    }
  };

  const handleSelect = (vehicle: VehicleClass) => {
    if (onSelectVehicle) {
      onSelectVehicle(vehicle);
    }
    // Scroll smoothly to the booking widget
    const element = document.getElementById('booking-interface');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  return (
    <section className="py-16 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Yellow geometric logo spacer */}
        <div className="flex justify-center mb-4">
          <div className="flex flex-col items-center">
            <div className="flex gap-1">
              <div className="w-2.5 h-6 bg-[#EAB308] rounded-full transform -skew-x-12"></div>
              <div className="w-2.5 h-6 bg-[#0F1115] rounded-full transform -skew-x-12"></div>
            </div>
          </div>
        </div>

        {/* Section Heading */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <h2 className="text-2xl sm:text-3xl font-black text-gray-900 tracking-tight font-display uppercase">
            Confort et sécurité pour votre voyage
          </h2>
          <p className="mt-2 text-sm font-semibold text-gray-400">
            Véhicules récents avec licence, chauffeurs professionnels multilingues
          </p>
        </div>

        {/* Slider Controls */}
        <div className="relative">
          <div className="absolute right-4 -top-14 flex items-center gap-2 z-10">
            <button
              onClick={() => scroll('left')}
              className="p-2.5 rounded-full border border-gray-200 bg-white text-gray-600 hover:bg-gray-50 active:scale-95 transition-all shadow-sm cursor-pointer"
              aria-label="Previous Vehicle"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              onClick={() => scroll('right')}
              className="p-2.5 rounded-full border border-gray-200 bg-white text-gray-600 hover:bg-gray-50 active:scale-95 transition-all shadow-sm cursor-pointer"
              aria-label="Next Vehicle"
            >
              <ChevronRight size={20} />
            </button>
          </div>

          {/* Horizontal Scrolling Track */}
          <div
            ref={containerRef}
            className="flex gap-6 overflow-x-auto snap-x snap-mandatory scrollbar-none pb-4 px-1"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {VEHICLES.map((vehicle) => (
              <div
                key={vehicle.id}
                className="w-[280px] sm:w-[320px] shrink-0 bg-white border border-gray-100 rounded-2xl shadow-sm hover:shadow-lg hover:border-gray-900/10 snap-start transition-all duration-300 flex flex-col justify-between group overflow-hidden"
              >
                {/* Vehicle Image */}
                <div className="relative h-44 bg-gray-50 flex items-center justify-center overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900/10 to-transparent z-1"></div>
                  <img
                    src={vehicle.image}
                    alt={vehicle.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                  {/* Luxury Tag */}
                  <span className="absolute top-3 right-3 bg-[#0F1115] text-[#EAB308] font-mono text-[9px] font-bold uppercase tracking-wider px-2 py-1 rounded-md z-10 border border-gray-800">
                    Premium
                  </span>
                </div>

                {/* Card Content */}
                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-extrabold text-base text-gray-900 group-hover:text-[#EAB308] transition-colors font-display">
                        {vehicle.name}
                      </h3>
                      <span className="font-mono text-xs font-black text-gray-400 bg-gray-50 px-2 py-0.5 rounded border border-gray-100">
                        {vehicle.id === 'first' || vehicle.id === 'van-first' ? 'VIP' : 'CLASS'}
                      </span>
                    </div>

                    {/* Car Models */}
                    <p className="text-[11px] font-semibold text-gray-500 font-mono mb-3 line-clamp-1">
                      {vehicle.carModels}
                    </p>

                    {/* Features Row */}
                    <div className="flex items-center gap-4 text-xs font-bold text-gray-600 mb-4 border-t border-b border-gray-50 py-2">
                      <span className="flex items-center gap-1.5">
                        <User size={13} className="text-[#EAB308]" />
                        <span>Jusqu'à {vehicle.passengers} pax</span>
                      </span>
                      <span className="flex items-center gap-1.5">
                        <Shield size={13} className="text-gray-400" />
                        <span>{vehicle.luggage} bagages</span>
                      </span>
                    </div>

                    <p className="text-xs text-gray-500 leading-relaxed line-clamp-3 mb-5">
                      {vehicle.description}
                    </p>
                  </div>

                  {/* Actions / Select */}
                  <div className="flex items-center justify-between border-t border-gray-100 pt-4">
                    <div>
                      <span className="block text-[9px] text-gray-400 font-bold uppercase leading-3">À partir de</span>
                      <span className="text-lg font-black text-gray-900 font-mono">{vehicle.basePrice} €</span>
                    </div>
                    <button
                      onClick={() => handleSelect(vehicle)}
                      className="px-4 py-2 bg-[#0F1115] hover:bg-[#EAB308] hover:text-[#0F1115] text-[#EAB308] text-xs font-bold rounded-lg active:scale-95 transition-all shadow-sm cursor-pointer"
                    >
                      Choisir
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}

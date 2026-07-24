import React, { useState } from 'react';
import { MapPin, Calendar, Clock, Plus, Minus, Search, ArrowRight, CheckCircle2, User, Mail, Phone as PhoneIcon, Plane, CreditCard, Shield, RefreshCw, ChevronDown } from 'lucide-react';
import { useNavigate } from '@tanstack/react-router';
import { VEHICLES, MOROCCAN_AIRPORTS } from '../data';
import { BookingDetails, VehicleClass } from '../types';
import { motion, AnimatePresence } from 'motion/react';
import LocationPicker from './LocationPicker';
import { calculateRoutePrice } from '../lib/pricing';


interface BookingWidgetProps {
  onBookingComplete?: (details: any) => void;
  onVehicleSelected?: (vehicle: VehicleClass) => void;
  initialToLocation?: string;
  initialVehicleId?: string;
  key?: string | number;
}

export default function BookingWidget({ onBookingComplete, onVehicleSelected, initialToLocation = '', initialVehicleId = '' }: BookingWidgetProps) {
  const navigate = useNavigate();
  // Wizard Steps: 'search' | 'cars' | 'checkout' | 'success'
  const [step, setStep] = useState<'search' | 'cars' | 'checkout' | 'success'>(
    initialVehicleId ? 'checkout' : (initialToLocation ? 'cars' : 'search')
  );
  const [bookingType, setBookingType] = useState<'transfer' | 'hourly'>('transfer');

  // Form States
  const [fromLocation, setFromLocation] = useState(initialToLocation ? 'Aéroport Agadir-Al Massira (AGA)' : '');
  const [toLocation, setToLocation] = useState(initialToLocation);
  const [date, setDate] = useState('2026-07-19');
  const [time, setTime] = useState('13:45');
  const [passengers, setPassengers] = useState(2);
  const [durationHours, setDurationHours] = useState(3);
  const [hasReturn, setHasReturn] = useState(false);
  const [returnDate, setReturnDate] = useState('2026-07-26');
  const [returnTime, setReturnTime] = useState('15:00');

  // Search Suggestion States
  const [pickerFor, setPickerFor] = useState<null | 'from' | 'to'>(null);


  // Selected vehicle for checkout
  const [selectedVehicle, setSelectedVehicle] = useState<VehicleClass | null>(
    initialVehicleId ? (VEHICLES.find(v => v.id === initialVehicleId) || null) : null
  );

  // Checkout Form States
  const [customerName, setCustomerName] = useState('');
  const [customerEmail, setCustomerEmail] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [flightNo, setFlightNo] = useState('');
  const [specialInstructions, setSpecialInstructions] = useState('');
  const [paymentDone, setPaymentDone] = useState(false);

  const [searching, setSearching] = useState(false);

  const calculatePrice = (vehicle: VehicleClass) => {
    const pricing = calculateRoutePrice({
      from: fromLocation,
      to: toLocation,
      vehicle,
      bookingType,
      durationHours,
      hasReturn,
    });
    return pricing.eur;
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fromLocation) {
      alert('Veuillez entrer un lieu de départ');
      return;
    }
    if (bookingType === 'transfer' && !toLocation) {
      alert('Veuillez entrer une destination');
      return;
    }

    setSearching(true);
    setTimeout(() => {
      setSearching(false);
      if (bookingType === 'transfer') {
        navigate({
          to: '/reservation',
          search: { from: fromLocation, to: toLocation, date, time, pax: passengers },
        } as never);
        return;
      }
      setStep('cars');
      window.scrollTo({ top: 150, behavior: 'smooth' });
    }, 800);
  };

  const handleSelectVehicle = (vehicle: VehicleClass) => {
    setSelectedVehicle(vehicle);
    if (onVehicleSelected) onVehicleSelected(vehicle);
    setStep('checkout');
    window.scrollTo({ top: 150, behavior: 'smooth' });
  };

  const handleCheckoutSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName || !customerEmail || !customerPhone) {
      alert('Veuillez remplir tous les champs obligatoires.');
      return;
    }
    
    setSearching(true);
    setTimeout(() => {
      setSearching(false);
      setStep('success');
      if (onBookingComplete) {
        onBookingComplete({
          type: bookingType,
          from: fromLocation,
          to: toLocation,
          date,
          time,
          passengers,
          vehicle: selectedVehicle,
          customerName,
          customerEmail,
          customerPhone,
          flightNo,
          price: selectedVehicle ? calculatePrice(selectedVehicle) : 0
        });
      }
      window.scrollTo({ top: 150, behavior: 'smooth' });
    }, 1500);
  };

  const resetBooking = () => {
    setStep('search');
    setSelectedVehicle(null);
    setCustomerName('');
    setCustomerEmail('');
    setCustomerPhone('');
    setFlightNo('');
    setSpecialInstructions('');
  };

  return (
    <>
    <LocationPicker
      open={pickerFor !== null}
      onClose={() => setPickerFor(null)}
      onSelect={(val) => {
        if (pickerFor === 'from') setFromLocation(val);
        else if (pickerFor === 'to') setToLocation(val);
      }}
      title={pickerFor === 'from' ? 'Lieu de départ' : "Lieu d'arrivée"}
    />
    <div id="booking-interface" className={`w-full rounded-2xl shadow-xl p-6 sm:p-8 max-w-xl mx-auto transition-all ${step === 'search' ? 'bg-[#0f1115] border border-white/5 shadow-[0_0_40px_-10px_rgba(245,166,35,0.35)]' : 'bg-white border border-gray-100'}`}>

      {/* Search Step */}
      {step === 'search' && (
        <div>
          {/* Tabs */}
          <div className="flex gap-2 mb-6 bg-white/5 p-1.5 rounded-xl border border-white/10">
            <button
              type="button"
              onClick={() => setBookingType('transfer')}
              className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                bookingType === 'transfer'
                  ? 'bg-[#F5A623] text-black shadow-sm'
                  : 'text-gray-300 hover:text-white hover:bg-white/5'
              }`}
            >
              <ArrowRight size={14} className={bookingType === 'transfer' ? 'text-black' : 'text-gray-400'} />
              <span>Transfert</span>
            </button>
            <button
              type="button"
              onClick={() => setBookingType('hourly')}
              className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                bookingType === 'hourly'
                  ? 'bg-[#F5A623] text-black shadow-sm'
                  : 'text-gray-300 hover:text-white hover:bg-white/5'
              }`}
            >
              <Clock size={14} className={bookingType === 'hourly' ? 'text-black' : 'text-gray-400'} />
              <span>À l'heure</span>
            </button>
          </div>


          <form onSubmit={handleSearch} className="space-y-4">
            {/* From Location */}
            <div className="relative">
              <label className="block text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-1">De</label>
              <button
                type="button"
                onClick={() => setPickerFor('from')}
                className="w-full flex items-center bg-[#1a1d24] rounded-xl border border-white/10 hover:border-[#F5A623]/60 focus:border-[#F5A623] focus:ring-2 focus:ring-[#F5A623]/20 transition-all text-left cursor-pointer pl-11 pr-10 py-3.5 relative"
              >
                <MapPin size={18} className="absolute left-4 text-gray-300" />
                <span className={`text-sm font-semibold truncate ${fromLocation ? 'text-white' : 'text-gray-500'}`}>
                  {fromLocation || 'Aéroport, ville ou hôtel de départ...'}
                </span>
                <ChevronDown size={16} className="absolute right-3 text-gray-400" />
              </button>
            </div>

            {/* To Location (Only if transfer type) */}
            {bookingType === 'transfer' ? (
              <div className="relative">
                <label className="block text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-1">À</label>
                <button
                  type="button"
                  onClick={() => setPickerFor('to')}
                  className="w-full flex items-center bg-[#1a1d24] rounded-xl border border-white/10 hover:border-[#F5A623]/60 focus:border-[#F5A623] focus:ring-2 focus:ring-[#F5A623]/20 transition-all text-left cursor-pointer pl-11 pr-10 py-3.5 relative"
                >
                  <MapPin size={18} className="absolute left-4 text-gray-300" />
                  <span className={`text-sm font-semibold truncate ${toLocation ? 'text-white' : 'text-gray-500'}`}>
                    {toLocation || "Aéroport, ville ou hôtel d'arrivée..."}
                  </span>
                  <ChevronDown size={16} className="absolute right-3 text-gray-400" />
                </button>
              </div>

            ) : (
              /* Hourly duration */
              <div>
                <label className="block text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-1">Durée de réservation</label>
                <div className="relative flex items-center bg-[#1a1d24] rounded-xl border border-white/10 p-1">
                  <div className="flex items-center justify-between w-full px-3 py-2">
                    <span className="text-sm font-semibold text-gray-200">Heures demandées</span>
                    <div className="flex items-center gap-3">
                      <button
                        type="button"
                        onClick={() => setDurationHours(Math.max(2, durationHours - 1))}
                        className="w-8 h-8 rounded-lg bg-white/10 border border-white/10 flex items-center justify-center text-gray-200 hover:bg-white/20 active:scale-95 transition-all cursor-pointer"
                      >
                        <Minus size={14} />
                      </button>
                      <span className="font-mono font-bold text-sm text-white w-6 text-center">{durationHours} h</span>
                      <button
                        type="button"
                        onClick={() => setDurationHours(Math.min(24, durationHours + 1))}
                        className="w-8 h-8 rounded-lg bg-white/10 border border-white/10 flex items-center justify-center text-gray-200 hover:bg-white/20 active:scale-95 transition-all cursor-pointer"
                      >
                        <Plus size={14} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Date & Time Row */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-1">Date de départ</label>
                <div className="relative flex items-center bg-[#1a1d24] rounded-xl border border-white/10 focus-within:border-[#F5A623] transition-all">
                  <Calendar size={16} className="absolute left-3.5 text-gray-300" />
                  <input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full pl-10 pr-3 py-3 bg-transparent rounded-xl text-xs font-semibold text-white focus:outline-none [color-scheme:dark]"
                    required
                  />
                </div>
              </div>
              <div>
                <label className="block text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-1">Heure de départ</label>
                <div className="relative flex items-center bg-[#1a1d24] rounded-xl border border-white/10 focus-within:border-[#F5A623] transition-all">
                  <Clock size={16} className="absolute left-3.5 text-gray-300" />
                  <input
                    type="time"
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                    className="w-full pl-10 pr-3 py-3 bg-transparent rounded-xl text-xs font-semibold text-white focus:outline-none [color-scheme:dark]"
                    required
                  />
                </div>
              </div>
            </div>


            {/* Ajouter Retour Button */}
            {bookingType === 'transfer' && (
              <div>
                {!hasReturn ? (
                  <button
                    type="button"
                    onClick={() => setHasReturn(true)}
                    className="w-full py-3 border-2 border-dashed border-white/15 hover:border-[#F5A623] hover:bg-[#F5A623]/5 text-xs font-bold text-gray-300 hover:text-[#F5A623] rounded-xl flex items-center justify-center gap-2 transition-all cursor-pointer"
                  >
                    <Plus size={14} />
                    <span>AJOUTER RETOUR</span>
                  </button>

                ) : (
                  <div className="bg-amber-50/50 border border-amber-100 rounded-xl p-4 relative space-y-3">
                    <button
                      type="button"
                      onClick={() => setHasReturn(false)}
                      className="absolute top-2 right-2 text-xs font-semibold text-red-500 hover:text-red-700 bg-white/80 rounded-full w-5 h-5 flex items-center justify-center border border-red-100"
                    >
                      <Minus size={10} />
                    </button>
                    <span className="block text-[10px] font-bold text-amber-800 uppercase tracking-wide">Retour planifié (10% de réduction)</span>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-[9px] font-bold text-gray-400 uppercase tracking-wider mb-1">Date de retour</label>
                        <input
                          type="date"
                          value={returnDate}
                          onChange={(e) => setReturnDate(e.target.value)}
                          className="w-full px-3 py-2 bg-white rounded-lg border border-gray-200 text-xs font-semibold"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-[9px] font-bold text-gray-400 uppercase tracking-wider mb-1">Heure de retour</label>
                        <input
                          type="time"
                          value={returnTime}
                          onChange={(e) => setReturnTime(e.target.value)}
                          className="w-full px-3 py-2 bg-white rounded-lg border border-gray-200 text-xs font-semibold"
                          required
                        />
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Passenger Count Row */}
            <div className="flex items-center justify-between border-t border-b border-white/10 py-4 my-2">
              <div>
                <span className="block text-xs font-bold text-white">Passagers</span>
                <span className="block text-[10px] text-gray-400 font-medium">Bébés et enfants compris</span>
              </div>
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => setPassengers(Math.max(1, passengers - 1))}
                  className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 active:scale-95 transition-all flex items-center justify-center text-gray-200 cursor-pointer"
                >
                  <Minus size={14} />
                </button>
                <span className="font-mono font-bold text-base text-white w-6 text-center">{passengers}</span>
                <button
                  type="button"
                  onClick={() => setPassengers(Math.min(16, passengers + 1))}
                  className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 active:scale-95 transition-all flex items-center justify-center text-gray-200 cursor-pointer"
                >
                  <Plus size={14} />
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={searching}
              className="w-full py-4 bg-[#F5A623] hover:bg-[#ffb733] text-black font-bold rounded-xl flex items-center justify-center gap-2 shadow-lg shadow-[#F5A623]/30 hover:shadow-[#F5A623]/50 active:scale-[0.99] transition-all disabled:opacity-50 cursor-pointer text-sm tracking-wide"
            >
              {searching ? (
                <>
                  <RefreshCw className="animate-spin text-black" size={18} />
                  <span>Recherche de tarifs...</span>
                </>
              ) : (
                <>
                  <Search size={18} />
                  <span>Voir les prix</span>
                </>
              )}
            </button>

          </form>

          {/* Trustpilot Excellent Seal matching design exactly */}
          <div className="mt-6 flex items-center justify-center gap-2 bg-gray-50 py-3 px-4 rounded-xl border border-gray-100">
            <span className="text-xs font-extrabold text-gray-900 tracking-wide font-display">EXCELLENT</span>
            <div className="flex gap-0.5">
              {[1, 2, 3, 4, 5].map((s) => (
                <div key={s} className="w-4 h-4 bg-[#00B67A] flex items-center justify-center text-white text-[10px] rounded-sm font-bold">★</div>
              ))}
            </div>
            <span className="text-xs font-bold text-gray-900">Trustpilot</span>
          </div>
        </div>
      )}

      {/* Cars Selection Step */}
      {step === 'cars' && (
        <div className="space-y-5">
          <div className="flex items-center justify-between border-b border-gray-100 pb-3">
            <div>
              <span className="text-xs text-gray-400 font-bold uppercase tracking-wider">Étape 1 sur 3</span>
              <h3 className="text-lg font-bold text-gray-900">Choisissez votre véhicule</h3>
            </div>
            <button
              onClick={() => setStep('search')}
              className="text-xs font-bold text-[#EAB308] bg-[#0F1115] hover:bg-gray-900 px-3 py-1.5 rounded-lg"
            >
              Modifier la recherche
            </button>
          </div>

          <div className="text-xs text-gray-500 bg-gray-50 p-3 rounded-lg border border-gray-100/80">
            <div className="font-semibold text-gray-800">Votre recherche :</div>
            <div className="flex items-center gap-1.5 mt-1">
              <span className="font-medium text-gray-900">{fromLocation.substring(0, 30)}</span>
              {bookingType === 'transfer' && (
                <>
                  <ArrowRight size={12} className="text-[#EAB308]" />
                  <span className="font-medium text-gray-900">{toLocation.substring(0, 30)}</span>
                </>
              )}
            </div>
            <div className="mt-1 text-[11px] font-semibold text-gray-500">
              Départ : {date} à {time} | {passengers} passager{passengers > 1 ? 's' : ''} {hasReturn ? '(Aller-Retour)' : ''}
            </div>
          </div>

          {/* List of Vehicles */}
          <div className="space-y-4 max-h-[450px] overflow-y-auto pr-1">
            {VEHICLES.map((vehicle) => {
              const price = calculatePrice(vehicle);
              // Hide cars that cannot fit the group size
              if (passengers > vehicle.passengers) return null;

              return (
                <div
                  key={vehicle.id}
                  onClick={() => handleSelectVehicle(vehicle)}
                  className="group bg-white border border-gray-200 hover:border-gray-900 rounded-xl p-4 transition-all shadow-sm hover:shadow-md cursor-pointer flex flex-col sm:flex-row gap-4"
                >
                  <div className="w-full sm:w-1/3 flex items-center justify-center">
                    <img
                      src={vehicle.image}
                      alt={vehicle.name}
                      className="h-28 w-full object-cover rounded-lg group-hover:scale-[1.02] transition-transform"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start">
                        <h4 className="font-bold text-base text-gray-900 group-hover:text-[#EAB308] transition-colors">{vehicle.name}</h4>
                        <div className="text-right">
                          <span className="text-[10px] text-gray-400 font-bold block uppercase leading-3">Tarif tout compris</span>
                          <span className="text-xl font-extrabold text-gray-900 font-mono">{price} €</span>
                        </div>
                      </div>
                      <p className="text-[11px] font-semibold text-gray-400 mt-0.5 font-mono">{vehicle.carModels}</p>
                      <p className="text-xs text-gray-500 mt-2 line-clamp-2 leading-relaxed">{vehicle.description}</p>
                    </div>

                    <div className="flex items-center justify-between border-t border-gray-100 pt-3 mt-3">
                      <div className="flex gap-4 text-xs font-semibold text-gray-600">
                        <span className="flex items-center gap-1">
                          <User size={13} className="text-[#EAB308]" /> {vehicle.passengers}
                        </span>
                        <span className="flex items-center gap-1">
                          <Shield size={13} className="text-gray-400" /> {vehicle.luggage} Bagages
                        </span>
                      </div>
                      <span className="text-xs font-bold text-gray-900 flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                        Réserver <ArrowRight size={14} className="text-[#EAB308]" />
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Checkout Form Step */}
      {step === 'checkout' && selectedVehicle && (
        <form onSubmit={handleCheckoutSubmit} className="space-y-4">
          <div className="flex items-center justify-between border-b border-gray-100 pb-3">
            <div>
              <span className="text-xs text-gray-400 font-bold uppercase tracking-wider">Étape 2 sur 3</span>
              <h3 className="text-lg font-bold text-gray-900 font-display">Coordonnées de réservation</h3>
            </div>
            <button
              type="button"
              onClick={() => setStep('cars')}
              className="text-xs font-bold text-gray-500 hover:text-gray-900"
            >
              Retour aux voitures
            </button>
          </div>

          {/* Mini Recap */}
          <div className="flex items-center justify-between bg-[#0F1115] text-white p-4 rounded-xl">
            <div className="flex items-center gap-3">
              <img
                src={selectedVehicle.image}
                alt={selectedVehicle.name}
                className="w-14 h-14 object-cover rounded-lg border border-gray-800"
                referrerPolicy="no-referrer"
              />
              <div>
                <span className="text-[10px] text-[#EAB308] font-bold uppercase tracking-wider">{selectedVehicle.name}</span>
                <span className="block text-xs font-bold text-gray-200 line-clamp-1">{fromLocation.substring(0, 30)}</span>
              </div>
            </div>
            <div className="text-right">
              <span className="block text-[10px] text-gray-400 font-bold uppercase">Total</span>
              <span className="text-lg font-extrabold text-[#EAB308] font-mono">{calculatePrice(selectedVehicle)} €</span>
            </div>
          </div>

          {/* Form Fields */}
          <div className="space-y-3.5">
            <div>
              <label className="block text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-1">Nom Complet du Passager Principal *</label>
              <div className="relative flex items-center bg-gray-50 rounded-xl border border-gray-200">
                <User size={16} className="absolute left-3.5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Jean Dupont"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-transparent rounded-xl text-xs font-semibold text-gray-900 focus:outline-none"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              <div>
                <label className="block text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-1">Adresse E-mail *</label>
                <div className="relative flex items-center bg-gray-50 rounded-xl border border-gray-200">
                  <Mail size={16} className="absolute left-3.5 text-gray-400" />
                  <input
                    type="email"
                    placeholder="support@agadirdriver.com"
                    value={customerEmail}
                    onChange={(e) => setCustomerEmail(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 bg-transparent rounded-xl text-xs font-semibold text-gray-900 focus:outline-none"
                    required
                  />
                </div>
              </div>
              <div>
                <label className="block text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-1">Numéro de Téléphone *</label>
                <div className="relative flex items-center bg-gray-50 rounded-xl border border-gray-200">
                  <PhoneIcon size={16} className="absolute left-3.5 text-gray-400" />
                  <input
                    type="tel"
                    placeholder="+33 6 12 34 56 78"
                    value={customerPhone}
                    onChange={(e) => setCustomerPhone(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 bg-transparent rounded-xl text-xs font-semibold text-gray-900 focus:outline-none"
                    required
                  />
                </div>
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-1">Numéro de Vol ou de Train (Optionnel)</label>
              <div className="relative flex items-center bg-gray-50 rounded-xl border border-gray-200">
                <Plane size={16} className="absolute left-3.5 text-gray-400" />
                <input
                  type="text"
                  placeholder="AF1234 (Pour le suivi des retards)"
                  value={flightNo}
                  onChange={(e) => setFlightNo(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-transparent rounded-xl text-xs font-semibold text-gray-900 focus:outline-none font-mono"
                />
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-1">Instructions Spéciales / Besoins Particuliers</label>
              <textarea
                placeholder="Siège bébé requis (âge), fauteuil roulant pliable, bagage hors-gabarit..."
                value={specialInstructions}
                onChange={(e) => setSpecialInstructions(e.target.value)}
                rows={2}
                className="w-full px-4 py-3 bg-gray-50 rounded-xl border border-gray-200 text-xs font-semibold text-gray-900 focus:outline-none resize-none"
              ></textarea>
            </div>

            {/* Payment Details Simulator */}
            <div className="border border-gray-200 rounded-xl p-4 bg-gray-50/50 space-y-3">
              <span className="block text-[10px] font-bold text-gray-400 uppercase tracking-wide">Paiement Sécurisé SSL (Simulation)</span>
              
              <div className="flex gap-2">
                <div className="flex-1 flex items-center gap-2 border border-gray-900 bg-white p-2.5 rounded-lg">
                  <CreditCard size={14} className="text-[#EAB308]" />
                  <span className="text-[11px] font-bold text-gray-900">Carte bancaire</span>
                </div>
                <div className="flex-1 flex items-center gap-2 border border-gray-200 hover:border-gray-400 bg-white p-2.5 rounded-lg opacity-60 cursor-pointer">
                  <span className="text-[11px] font-bold text-gray-600 font-mono">PayPal</span>
                </div>
              </div>

              <div className="space-y-2">
                <input
                  type="text"
                  placeholder="Numéro de carte (Faux : 4242 4242 4242 4242)"
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg text-xs font-mono font-bold bg-white"
                  required
                  defaultValue="4242 4242 4242 4242"
                />
                <div className="grid grid-cols-2 gap-2">
                  <input
                    type="text"
                    placeholder="MM/AA"
                    className="px-3 py-2 border border-gray-200 rounded-lg text-xs font-mono font-bold bg-white"
                    required
                    defaultValue="12/29"
                  />
                  <input
                    type="text"
                    placeholder="CVC"
                    className="px-3 py-2 border border-gray-200 rounded-lg text-xs font-mono font-bold bg-white"
                    required
                    defaultValue="123"
                  />
                </div>
              </div>
            </div>
          </div>

          <button
            type="submit"
            disabled={searching}
            className="w-full py-4 bg-[#EAB308] hover:bg-[#CA8A04] text-[#0F1115] font-black rounded-xl flex items-center justify-center gap-2 shadow-lg shadow-yellow-500/20 active:scale-[0.99] transition-all disabled:opacity-50 cursor-pointer text-xs uppercase tracking-widest"
          >
            {searching ? (
              <>
                <RefreshCw className="animate-spin text-[#0F1115]" size={16} />
                <span>Traitement du paiement sécurisé...</span>
              </>
            ) : (
              <>
                <Shield size={16} className="text-[#0F1115]" />
                <span>Confirmer la réservation et payer {calculatePrice(selectedVehicle)} €</span>
              </>
            )}
          </button>
        </form>
      )}

      {/* Success Step */}
      {step === 'success' && selectedVehicle && (
        <div className="space-y-6 text-center py-4">
          <div className="flex justify-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center text-green-600">
              <CheckCircle2 size={36} />
            </div>
          </div>

          <div>
            <span className="text-xs font-extrabold text-[#EAB308] uppercase tracking-widest bg-[#0F1115] px-3 py-1 rounded-full">Réservation Confirmée !</span>
            <h3 className="text-2xl font-black text-gray-900 font-display mt-3">Bon voyage avec Agadir Driver !</h3>
            <p className="text-xs text-gray-500 mt-2 max-w-sm mx-auto leading-relaxed">
              Un e-mail de confirmation contenant votre reçu et vos instructions de prise en charge a été envoyé à <strong className="text-gray-900">{customerEmail}</strong>.
            </p>
          </div>

          {/* Ticket/Badge */}
          <div className="border border-dashed border-gray-200 bg-gray-50/50 rounded-2xl p-5 text-left space-y-4 max-w-sm mx-auto">
            <div className="flex justify-between items-center border-b border-gray-200 pb-3">
              <div>
                <span className="text-[9px] text-gray-400 font-bold block uppercase leading-3">ID Réservation</span>
                <span className="text-xs font-bold text-gray-900 font-mono">AD-2026-{Math.floor(1000 + Math.random() * 9000)}</span>
              </div>
              <div className="text-right">
                <span className="text-[9px] text-gray-400 font-bold block uppercase leading-3">Statut du paiement</span>
                <span className="text-[10px] bg-green-100 text-green-700 font-bold px-2 py-0.5 rounded-full">Payé (Simulé)</span>
              </div>
            </div>

            <div className="space-y-2 text-xs">
              <div>
                <span className="text-[9px] text-gray-400 font-bold uppercase tracking-wider block">Départ</span>
                <span className="font-semibold text-gray-800">{fromLocation}</span>
              </div>
              {bookingType === 'transfer' && (
                <div>
                  <span className="text-[9px] text-gray-400 font-bold uppercase tracking-wider block">Destination</span>
                  <span className="font-semibold text-gray-800">{toLocation}</span>
                </div>
              )}
              <div className="grid grid-cols-2 gap-2 pt-1 border-t border-gray-100">
                <div>
                  <span className="text-[9px] text-gray-400 font-bold uppercase tracking-wider block">Date & Heure</span>
                  <span className="font-bold text-gray-900 font-mono">{date} • {time}</span>
                </div>
                <div>
                  <span className="text-[9px] text-gray-400 font-bold uppercase tracking-wider block">Véhicule</span>
                  <span className="font-bold text-gray-900">{selectedVehicle.name}</span>
                </div>
              </div>
              <div className="pt-2 border-t border-gray-100 flex items-center justify-between">
                <div>
                  <span className="text-[9px] text-gray-400 font-bold uppercase tracking-wider block">Passager</span>
                  <span className="font-bold text-gray-900">{customerName}</span>
                </div>
                <div className="text-right">
                  <span className="text-[9px] text-gray-400 font-bold uppercase tracking-wider block">Montant Payé</span>
                  <span className="font-extrabold text-[#EAB308] bg-[#0F1115] px-2.5 py-0.5 rounded font-mono text-sm">{calculatePrice(selectedVehicle)} €</span>
                </div>
              </div>
            </div>

            {/* Simulated QR Code */}
            <div className="flex flex-col items-center justify-center bg-white p-3 rounded-xl border border-gray-200">
              <div className="w-24 h-24 bg-gray-50 border border-gray-200 p-1 flex flex-wrap items-center justify-center relative">
                {/* Visual QR Grid layout blocks to resemble a real code */}
                <div className="absolute inset-2 flex flex-wrap gap-1 opacity-80">
                  {Array.from({ length: 49 }).map((_, idx) => (
                    <div
                      key={idx}
                      className={`w-2 h-2 ${
                        (idx % 3 === 0 || idx % 7 === 2 || idx < 9 || idx > 40 || (idx > 20 && idx < 28))
                          ? 'bg-black'
                          : 'bg-transparent'
                      }`}
                    ></div>
                  ))}
                </div>
              </div>
              <span className="text-[9px] text-gray-400 font-mono mt-1.5 font-semibold">Présentez ce QR code à votre chauffeur</span>
            </div>
          </div>

          <div className="flex gap-3 justify-center">
            <button
              onClick={resetBooking}
              className="px-5 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold rounded-xl text-xs transition-all cursor-pointer"
            >
              Faire une autre réservation
            </button>
            <button
              onClick={() => {
                alert('Impression du reçu... (Simulée)');
              }}
              className="px-5 py-2.5 bg-[#0F1115] hover:bg-gray-800 text-[#EAB308] font-bold rounded-xl text-xs transition-all cursor-pointer"
            >
              Télécharger le PDF
            </button>
          </div>
        </div>
      )}
    </div>
    </>
  );
}

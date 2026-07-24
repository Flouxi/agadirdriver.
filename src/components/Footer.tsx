import React from 'react';
import { Facebook, Instagram, Twitter, MessageCircle, ShieldCheck, HelpCircle, Phone, Mail } from 'lucide-react';
import { AGADIR_DRIVER_LOGO_URL } from '../lib/brand-images';

export default function Footer() {
  const whatsappNumber = '2120606419700';
  const whatsappLink = `https://wa.me/${whatsappNumber}?text=Bonjour%20Agadir%20Driver%2C%20j%27ai%20besoin%20d%27aide%20pour%20mon%20transport.`;
  const supportEmail = 'support@agadirdriver.com';

  return (
    <footer className="bg-[#0F1115] text-white pt-16 pb-8 border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Upper Columns Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-gray-800">
          
          {/* Column 1: Brand & Assistance */}
          <div className="space-y-6">
            <div className="flex items-center">
              <img src={AGADIR_DRIVER_LOGO_URL} alt="Agadir Driver" className="h-12 w-auto object-contain" />
            </div>
            
            <p className="text-xs text-gray-400 font-medium leading-relaxed">
              Votre partenaire d'élite pour vos déplacements d'affaires et touristiques à Agadir, Marrakech, Essaouira et dans tout le Maroc. Chauffeurs professionnels certifiés.
            </p>

            {/* Social Icons */}
            <div className="flex gap-4 text-gray-400">
              <a href="#" className="hover:text-[#EAB308] transition-colors" aria-label="Facebook">
                <Facebook size={18} />
              </a>
              <a href="#" className="hover:text-[#EAB308] transition-colors" aria-label="Instagram">
                <Instagram size={18} />
              </a>
              <a href="#" className="hover:text-[#EAB308] transition-colors" aria-label="Twitter">
                <Twitter size={18} />
              </a>
            </div>

            {/* Assistance 24/7 Contacts */}
            <div className="space-y-3.5 pt-2">
              <span className="block text-[10px] font-black text-gray-400 uppercase tracking-widest">Assistance 24/7</span>
              
              <div className="space-y-1.5 text-xs text-gray-300 font-medium">
                <div className="flex items-center gap-2">
                  <Phone size={12} className="text-[#EAB308]" />
                  <span>Support 24/7 : <strong className="font-mono text-white">+212 060 641 9700</strong></span>
                </div>
                <a href={whatsappLink} target="_blank" rel="noreferrer" className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors">
                  <MessageCircle size={12} className="text-green-500 fill-green-500/20" />
                  <span>WhatsApp : <strong className="font-mono">+212 060 641 9700</strong></span>
                </a>
                <a href={`mailto:${supportEmail}`} className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors">
                  <Mail size={12} className="text-gray-400" />
                  <span className="font-mono">{supportEmail}</span>
                </a>
              </div>
            </div>
          </div>

          {/* Column 2: Principaux Aéroports */}
          <div className="space-y-4">
            <h4 className="text-xs font-black uppercase tracking-widest text-[#EAB308]">
              Principaux Aéroports
            </h4>
            <ul className="space-y-2 text-xs text-gray-400 font-semibold">
              <li>
                <a href="#booking-interface" className="hover:text-white transition-colors">
                  Aéroport Agadir Al Massira (AGA)
                </a>
              </li>
              <li>
                <a href="#booking-interface" className="hover:text-white transition-colors">
                  Aéroport Marrakech Ménara (RAK)
                </a>
              </li>
              <li>
                <a href="#booking-interface" className="hover:text-white transition-colors">
                  Aéroport Casablanca Mohammed V (CMN)
                </a>
              </li>
              <li>
                <a href="#booking-interface" className="hover:text-white transition-colors">
                  Aéroport Essaouira Mogador (ESU)
                </a>
              </li>
              <li>
                <a href="#booking-interface" className="hover:text-white transition-colors">
                  Aéroport Fès Saïss (FEZ)
                </a>
              </li>
              <li>
                <a href="#booking-interface" className="hover:text-white transition-colors">
                  Aéroport Tanger Ibn Battouta (TNG)
                </a>
              </li>
              <li>
                <a href="#booking-interface" className="hover:text-white transition-colors">
                  Aéroport Rabat-Salé (RBA)
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3: Agadir Driver Services */}
          <div className="space-y-4">
            <h4 className="text-xs font-black uppercase tracking-widest text-[#EAB308]">
              Nos Services
            </h4>
            <ul className="space-y-2 text-xs text-gray-400 font-semibold">
              <li><a href="#" className="hover:text-white transition-colors">Transferts Aéroportuaires</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Transferts Ville à Ville</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Chauffeur à la demande (Horaire)</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Solutions pour Agences de Voyages</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Portail Entreprises & VIPs</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Espace Chauffeur Partenaire</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Devenir Chauffeur Agadir Driver</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Programme de Fidélité Elite</a></li>
            </ul>
          </div>

          {/* Column 4: Société & Trustpilot */}
          <div className="space-y-6">
            <div className="space-y-4">
              <h4 className="text-xs font-black uppercase tracking-widest text-[#EAB308]">
                Société
              </h4>
              <ul className="space-y-2 text-xs text-gray-400 font-semibold">
                <li><a href="#" className="hover:text-white transition-colors">À propos de nous</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Recrutement / Careers</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Centre d'aide & FAQ</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Termes et Conditions</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Politique de Confidentialité</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Mentions Légales</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Blog Voyage Maroc</a></li>
              </ul>
            </div>

            {/* Trustpilot Box */}
            <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-4 space-y-2">
              <div className="flex items-center gap-1.5 text-xs font-bold text-white font-display">
                <span className="text-[#00B67A]">★</span>
                <span>Trustpilot Verified</span>
              </div>
              <div className="flex gap-0.5">
                {[1, 2, 3, 4, 5].map((s) => (
                  <div key={s} className="w-4 h-4 bg-[#00B67A] flex items-center justify-center text-white text-[9px] rounded-xs font-bold">★</div>
                ))}
              </div>
              <span className="block text-[10px] text-gray-400 font-semibold font-mono">
                Note de 4.9/5 | 38 036 avis
              </span>
            </div>
          </div>

        </div>

        {/* Lower footer: Badges & Payments */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-6 text-xs text-gray-500 font-semibold">
          
          {/* Copyright and Company metadata */}
          <div className="space-y-1.5 text-center md:text-left">
            <span className="block text-gray-400">
              2026 © AGADIR DRIVER™ | All rights reserved.
            </span>
            <span className="block text-[10px] text-gray-500 font-mono font-medium">
              S.A.R.L. au Capital de 100 000 MAD | Patente N° 3451S7 | RC Agadir 530419 | I.F. 4581971
            </span>
          </div>

          {/* Center Privacy Settings Cookie Link with Checkmark */}
          <div className="flex items-center gap-1.5 hover:text-white transition-colors cursor-pointer text-gray-400">
            <span className="w-5 h-4 bg-sky-900/30 border border-sky-500/20 rounded text-sky-400 flex items-center justify-center text-[10px] font-bold">✓x</span>
            <span>Vos choix en matière de confidentialité</span>
          </div>

          {/* Secure Payment Badges */}
          <div className="flex flex-wrap gap-2.5 justify-center opacity-70">
            {['Visa', 'Mastercard', 'Amex', 'PayPal', 'ApplePay', 'GooglePay'].map((brand) => (
              <span key={brand} className="px-2.5 py-1 bg-gray-900 border border-gray-800 rounded text-[9px] font-mono font-extrabold text-gray-400">
                {brand}
              </span>
            ))}
          </div>

        </div>

      </div>

      {/* Floating support button */}
      <div className="fixed bottom-6 right-6 z-40">
        <a
          href={whatsappLink}
          target="_blank"
          rel="noreferrer"
          className="group relative inline-flex items-center gap-3 rounded-full border border-yellow-400/50 bg-gradient-to-r from-[#EAB308] via-[#FACC15] to-[#F59E0B] px-4 py-3 text-sm font-semibold text-[#0F1115] shadow-[0_20px_60px_-15px_rgba(234,179,8,0.65)] transition-all hover:scale-[1.02] hover:shadow-[0_30px_80px_-15px_rgba(234,179,8,0.8)]"
          aria-label="Contacter le support WhatsApp"
        >
          <span className="absolute -top-1 -right-1 h-3.5 w-3.5 rounded-full border-2 border-white bg-green-500 animate-ping"></span>
          <span className="absolute -top-1 -right-1 h-3.5 w-3.5 rounded-full border-2 border-white bg-green-500"></span>
          <MessageCircle size={20} className="shrink-0 transition-transform group-hover:rotate-6" />
          <span className="hidden sm:inline">Support 24/7</span>
          <span className="sm:hidden">Support</span>
        </a>
      </div>

    </footer>
  );
}

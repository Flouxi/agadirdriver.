import React, { useState } from 'react';
import { Globe, User, Menu, X, ChevronDown, Phone, MapPin } from 'lucide-react';
import { AGADIR_DRIVER_LOGO_URL } from '../lib/brand-images';

interface HeaderProps {
  onNavClick?: (section: string) => void;
}

export default function Header({ onNavClick }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);
  const [currentLang, setCurrentLang] = useState('FR');
  const whatsappLink = 'https://wa.me/2120606419700?text=Bonjour%20Agadir%20Driver%2C%20j%27ai%20besoin%20d%27aide%20pour%20mon%20transport.';

  const navItems = [
    { label: "Taxi d'aéroport", id: 'airport' },
    { label: "Transferts de ville à ville", id: 'intercity' },
    { label: "À l'heure", id: 'hourly' },
    { label: "Aide", id: 'help' },
    { label: "Business", id: 'business' }
  ];

  const languageOptions = [
    { code: 'FR', label: 'Français' },
    { code: 'EN', label: 'English' },
    { code: 'DE', label: 'Deutsch' },
    { code: 'ES', label: 'Español' }
  ];

  const handleItemClick = (id: string) => {
    if (onNavClick) {
      onNavClick(id);
    }
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-[9999] w-full bg-[#0F1115] text-white border-b border-gray-800 isolate">
      {/* Top Banner with emergency contact */}
      <div className="hidden sm:flex max-w-7xl mx-auto px-4 py-1.5 justify-between items-center text-xs text-gray-400 border-b border-gray-900/50">
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-[#EAB308] animate-pulse"></span>
            Assistance 24/7 disponible
          </span>
          <a href={whatsappLink} target="_blank" rel="noreferrer" className="flex items-center gap-1 hover:text-white transition-colors cursor-pointer">
            <Phone size={12} className="text-[#EAB308]" />
            +212 060 641 9700
          </a>
        </div>
        <div className="flex items-center gap-3">
          <span className="hover:text-white cursor-pointer transition-colors">Devenez Chauffeur Partenaire</span>
          <span>•</span>
          <span className="hover:text-white cursor-pointer transition-colors">Connexion Agence</span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Logo */}
          <div className="flex items-center cursor-pointer" onClick={() => handleItemClick('hero')}>
            <img
              src={AGADIR_DRIVER_LOGO_URL}
              alt="Agadir Driver"
              className="h-10 sm:h-12 w-auto object-contain"
            />
          </div>

          {/* Desktop Nav Items */}
          <nav className="hidden lg:flex items-center gap-6 text-[14px] font-medium text-gray-200">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleItemClick(item.id)}
                className="hover:text-[#EAB308] transition-colors py-2 relative group cursor-pointer"
              >
                {item.label}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#EAB308] transition-all group-hover:w-full"></span>
              </button>
            ))}
          </nav>

          {/* Right side actions */}
          <div className="flex items-center gap-3 sm:gap-4 ml-auto">
            {/* Language Selector (desktop) */}
            <div className="relative hidden sm:block">
              <button
                onClick={() => setLangDropdownOpen(!langDropdownOpen)}
                className="flex items-center gap-1 text-sm font-semibold text-gray-300 hover:text-white transition-colors cursor-pointer"
              >
                <Globe size={16} className="text-[#EAB308]" />
                <span className="font-mono text-xs uppercase">{currentLang}</span>
                <ChevronDown size={14} className={`transform transition-transform ${langDropdownOpen ? 'rotate-180' : ''}`} />
              </button>

              {langDropdownOpen && (
                <div className="absolute right-0 mt-2 w-28 bg-[#1e222b] border border-gray-800 rounded-md shadow-xl py-1 text-sm text-gray-300 z-[60]">
                  {languageOptions.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => {
                        setCurrentLang(lang.code);
                        setLangDropdownOpen(false);
                      }}
                      className="block w-full text-left px-4 py-2 hover:bg-[#2e3442] hover:text-white font-mono text-xs"
                    >
                      {lang.label}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Mobile language selector */}
            <div className="relative sm:hidden">
              <button
                onClick={() => {
                  setLangDropdownOpen(!langDropdownOpen);
                  setMobileMenuOpen(false);
                }}
                className="flex items-center gap-1.5 text-xs font-mono font-bold text-[#EAB308] bg-gray-900 border border-gray-800 px-2 py-1 rounded"
              >
                <Globe size={12} />
                <span>{currentLang}</span>
                <ChevronDown size={12} className={`transform transition-transform ${langDropdownOpen ? 'rotate-180' : ''}`} />
              </button>

              {langDropdownOpen && (
                <div className="absolute right-0 mt-2 w-28 bg-[#1e222b] border border-gray-800 rounded-md shadow-xl py-1 text-sm text-gray-300 z-[60]">
                  {languageOptions.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => {
                        setCurrentLang(lang.code);
                        setLangDropdownOpen(false);
                      }}
                      className="block w-full text-left px-4 py-2 hover:bg-[#2e3442] hover:text-white font-mono text-xs"
                    >
                      {lang.label}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Login button - desktop only */}
            <button className="hidden lg:flex items-center gap-2 px-4 py-2 bg-white text-[#0F1115] hover:bg-gray-100 transition-all font-semibold rounded-full text-sm shadow-md shadow-black/10 cursor-pointer">
              <User size={16} className="text-[#0F1115]" />
              <span>Se connecter</span>
            </button>

            {/* Menu Trigger (tablet + mobile) */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-gray-300 hover:text-white focus:outline-none cursor-pointer"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden absolute top-full left-0 w-full bg-[#161a22] border-b border-gray-800 shadow-2xl z-40 transition-all duration-300">
          <div className="px-4 pt-4 pb-6 space-y-3">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleItemClick(item.id)}
                className="block w-full text-left px-3 py-2.5 rounded-lg text-base font-semibold text-gray-100 hover:bg-[#1f2531] hover:text-[#EAB308] transition-all cursor-pointer"
              >
                {item.label}
              </button>
            ))}
            <div className="pt-4 border-t border-gray-800 flex flex-col gap-3">
              <button className="flex items-center justify-center gap-2 w-full px-4 py-3 bg-white text-[#0F1115] font-bold rounded-full text-sm">
                <User size={16} />
                <span>Se connecter</span>
              </button>
              <div className="flex justify-around text-xs text-gray-400 font-mono py-2 bg-[#0F1115] rounded-lg">
                <span className="hover:text-[#EAB308] cursor-pointer">Devenez Chauffeur</span>
                <span>|</span>
                <span className="hover:text-[#EAB308] cursor-pointer">Connexion Agence</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

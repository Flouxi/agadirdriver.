import { useEffect, useRef, useState } from "react";
import { Link } from "@tanstack/react-router";
import { Globe, Menu, X, ChevronDown, MessageCircle, Check } from "lucide-react";
import Logo from "./Logo";

interface HeaderProps {
  /** Called with a section id when a nav item is activated (homepage only). */
  onNavClick?: (section: string) => void;
}

const NAV_ITEMS = [
  { label: "Transfert aéroport", id: "airport" },
  { label: "Ville à ville", id: "intercity" },
  { label: "À l'heure", id: "hourly" },
  { label: "Destinations", id: "destinations" },
  { label: "Aide", id: "help" },
];

const LANGUAGES = [
  { code: "FR", label: "Français" },
  { code: "EN", label: "English" },
  { code: "DE", label: "Deutsch" },
  { code: "ES", label: "Español" },
];

const WHATSAPP_LINK =
  "https://wa.me/2120606419700?text=Bonjour%20Agadir%20Driver%2C%20j%27ai%20besoin%20d%27aide%20pour%20mon%20transport.";

export default function Header({ onNavClick }: HeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const [lang, setLang] = useState("FR");
  const langRef = useRef<HTMLDivElement>(null);

  // Close the language menu on outside click / Escape.
  useEffect(() => {
    if (!langOpen) return;
    const onPointer = (e: MouseEvent) => {
      if (langRef.current && !langRef.current.contains(e.target as Node)) setLangOpen(false);
    };
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setLangOpen(false);
    document.addEventListener("mousedown", onPointer);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onPointer);
      document.removeEventListener("keydown", onKey);
    };
  }, [langOpen]);

  // Lock body scroll while the mobile drawer is open.
  useEffect(() => {
    if (!menuOpen) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setMenuOpen(false);
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previous;
      document.removeEventListener("keydown", onKey);
    };
  }, [menuOpen]);

  const handleNav = (id: string) => {
    setMenuOpen(false);
    onNavClick?.(id);
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background">
      <div className="mx-auto flex h-16 max-w-7xl items-center gap-6 px-4 sm:px-6 lg:px-8">
        <Logo />

        <nav aria-label="Navigation principale" className="hidden items-center gap-1 lg:flex">
          {NAV_ITEMS.map((item) =>
            onNavClick ? (
              <button
                key={item.id}
                type="button"
                onClick={() => handleNav(item.id)}
                className="cursor-pointer rounded-lg px-3 py-2 text-[15px] font-medium text-foreground transition-colors hover:bg-muted"
              >
                {item.label}
              </button>
            ) : (
              <Link
                key={item.id}
                to="/"
                hash={item.id}
                className="rounded-lg px-3 py-2 text-[15px] font-medium text-foreground transition-colors hover:bg-muted"
              >
                {item.label}
              </Link>
            ),
          )}
        </nav>

        <div className="ml-auto flex items-center gap-1 sm:gap-2">
          <a
            href={WHATSAPP_LINK}
            target="_blank"
            rel="noreferrer"
            className="hidden items-center gap-2 rounded-lg px-3 py-2 text-[15px] font-medium text-foreground transition-colors hover:bg-muted xl:flex"
          >
            <MessageCircle size={16} strokeWidth={2} aria-hidden="true" />
            Assistance 24/7
          </a>

          <div ref={langRef} className="relative">
            <button
              type="button"
              onClick={() => setLangOpen((v) => !v)}
              aria-haspopup="menu"
              aria-expanded={langOpen}
              className="flex cursor-pointer items-center gap-1.5 rounded-lg px-2.5 py-2 text-[15px] font-medium text-foreground transition-colors hover:bg-muted"
            >
              <Globe size={16} strokeWidth={2} aria-hidden="true" />
              <span>{lang}</span>
              <ChevronDown
                size={14}
                aria-hidden="true"
                className={`transition-transform ${langOpen ? "rotate-180" : ""}`}
              />
            </button>

            {langOpen && (
              <div
                role="menu"
                className="absolute right-0 z-50 mt-2 w-44 overflow-hidden rounded-xl border border-border bg-popover py-1 shadow-lg"
              >
                {LANGUAGES.map((l) => (
                  <button
                    key={l.code}
                    type="button"
                    role="menuitemradio"
                    aria-checked={lang === l.code}
                    onClick={() => {
                      setLang(l.code);
                      setLangOpen(false);
                    }}
                    className="flex w-full cursor-pointer items-center justify-between px-3.5 py-2.5 text-left text-sm font-medium text-popover-foreground transition-colors hover:bg-muted"
                  >
                    {l.label}
                    {lang === l.code && <Check size={14} aria-hidden="true" />}
                  </button>
                ))}
              </div>
            )}
          </div>

          <button
            type="button"
            className="hidden cursor-pointer rounded-lg px-3 py-2 text-[15px] font-medium text-foreground transition-colors hover:bg-muted lg:block"
          >
            Se connecter
          </button>

          <button
            type="button"
            onClick={() => handleNav("booking")}
            className="hidden cursor-pointer rounded-lg bg-primary px-4 py-2.5 text-[15px] font-semibold text-primary-foreground transition-opacity hover:opacity-85 sm:block"
          >
            Réserver
          </button>

          <button
            type="button"
            onClick={() => setMenuOpen(true)}
            aria-label="Ouvrir le menu"
            aria-expanded={menuOpen}
            className="-mr-2 cursor-pointer rounded-lg p-2.5 text-foreground transition-colors hover:bg-muted lg:hidden"
          >
            <Menu size={22} aria-hidden="true" />
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      {menuOpen && (
        <div className="fixed inset-0 z-[60] lg:hidden">
          <button
            type="button"
            aria-label="Fermer le menu"
            onClick={() => setMenuOpen(false)}
            className="absolute inset-0 cursor-default bg-foreground/40"
          />
          <div
            role="dialog"
            aria-modal="true"
            aria-label="Menu"
            className="absolute inset-y-0 right-0 flex w-[86%] max-w-sm flex-col bg-background shadow-2xl"
          >
            <div className="flex h-16 shrink-0 items-center justify-between border-b border-border px-4">
              <Logo />
              <button
                type="button"
                onClick={() => setMenuOpen(false)}
                aria-label="Fermer le menu"
                className="-mr-2 cursor-pointer rounded-lg p-2.5 text-foreground transition-colors hover:bg-muted"
              >
                <X size={22} aria-hidden="true" />
              </button>
            </div>

            <nav aria-label="Navigation mobile" className="flex-1 overflow-y-auto px-3 py-4">
              {NAV_ITEMS.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => handleNav(item.id)}
                  className="block w-full cursor-pointer rounded-lg px-3 py-3.5 text-left text-[19px] font-semibold tracking-tight text-foreground transition-colors hover:bg-muted"
                >
                  {item.label}
                </button>
              ))}
            </nav>

            <div className="shrink-0 space-y-2.5 border-t border-border p-4 pb-[max(1rem,env(safe-area-inset-bottom))]">
              <button
                type="button"
                onClick={() => handleNav("booking")}
                className="w-full cursor-pointer rounded-lg bg-primary py-3.5 text-[15px] font-semibold text-primary-foreground transition-opacity hover:opacity-85"
              >
                Réserver un trajet
              </button>
              <button
                type="button"
                className="w-full cursor-pointer rounded-lg bg-secondary py-3.5 text-[15px] font-semibold text-secondary-foreground transition-colors hover:bg-border"
              >
                Se connecter
              </button>
              <a
                href={WHATSAPP_LINK}
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-center gap-2 py-2 text-[13px] font-medium text-muted-foreground"
              >
                <MessageCircle size={14} aria-hidden="true" />
                Assistance 24/7 · +212 606 419 700
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

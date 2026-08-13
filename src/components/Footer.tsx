import { Facebook, Instagram, Twitter, MessageCircle, Phone, Mail } from "lucide-react";
import Logo from "./Logo";

const WHATSAPP_NUMBER = "2120606419700";
const WHATSAPP_LINK = `https://wa.me/${WHATSAPP_NUMBER}?text=Bonjour%20Agadir%20Driver%2C%20j%27ai%20besoin%20d%27aide%20pour%20mon%20transport.`;
const SUPPORT_EMAIL = "support@agadirdriver.com";

const COLUMNS: { title: string; links: string[] }[] = [
  {
    title: "Aéroports",
    links: [
      "Agadir Al Massira (AGA)",
      "Marrakech Ménara (RAK)",
      "Casablanca Mohammed V (CMN)",
      "Essaouira Mogador (ESU)",
      "Fès Saïss (FEZ)",
      "Tanger Ibn Battouta (TNG)",
      "Rabat-Salé (RBA)",
    ],
  },
  {
    title: "Services",
    links: [
      "Transferts aéroport",
      "Transferts ville à ville",
      "Chauffeur à l'heure",
      "Agences de voyages",
      "Entreprises & VIP",
      "Espace chauffeur partenaire",
      "Programme de fidélité",
    ],
  },
  {
    title: "Société",
    links: [
      "À propos",
      "Recrutement",
      "Centre d'aide & FAQ",
      "Termes et conditions",
      "Politique de confidentialité",
      "Mentions légales",
      "Blog voyage Maroc",
    ],
  },
];

export default function Footer() {
  return (
    <footer className="bg-foreground text-white">
      <div className="mx-auto max-w-7xl px-4 pt-16 pb-8 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 border-b border-white/10 pb-12 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand + contact */}
          <div className="flex flex-col gap-6">
            <Logo tone="invert" className="text-[24px]" />

            <p className="max-w-xs text-sm leading-relaxed text-white/60">
              Chauffeur privé et transferts premium à Agadir, Taghazout, Marrakech, Essaouira et
              partout au Maroc. Prix fixes, chauffeurs certifiés, disponibilité 24/7.
            </p>

            <div className="flex flex-col gap-2.5 text-sm">
              <a
                href={`tel:+${WHATSAPP_NUMBER}`}
                className="flex items-center gap-2.5 text-white/70 transition-colors hover:text-white"
              >
                <Phone size={15} aria-hidden="true" />
                +212 606 419 700
              </a>
              <a
                href={WHATSAPP_LINK}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2.5 text-white/70 transition-colors hover:text-white"
              >
                <MessageCircle size={15} aria-hidden="true" />
                WhatsApp 24/7
              </a>
              <a
                href={`mailto:${SUPPORT_EMAIL}`}
                className="flex items-center gap-2.5 text-white/70 transition-colors hover:text-white"
              >
                <Mail size={15} aria-hidden="true" />
                {SUPPORT_EMAIL}
              </a>
            </div>

            <div className="flex gap-2">
              {[
                { Icon: Facebook, label: "Facebook" },
                { Icon: Instagram, label: "Instagram" },
                { Icon: Twitter, label: "Twitter" },
              ].map(({ Icon, label }) => (
                <a
                  key={label}
                  href="#"
                  aria-label={label}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-white/70 transition-colors hover:border-white hover:text-white"
                >
                  <Icon size={16} aria-hidden="true" />
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {COLUMNS.map((col) => (
            <nav key={col.title} aria-label={col.title} className="flex flex-col gap-4">
              <h4 className="text-[15px] font-semibold text-white">{col.title}</h4>
              <ul className="flex flex-col gap-2.5">
                {col.links.map((link) => (
                  <li key={link}>
                    <a
                      href="#booking"
                      className="text-sm leading-relaxed text-white/60 transition-colors hover:text-white"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        {/* Rating strip */}
        <div className="flex flex-col items-center gap-3 border-b border-white/10 py-6 sm:flex-row sm:justify-between">
          <div className="flex items-center gap-2.5">
            <div className="flex gap-0.5" aria-hidden="true">
              {[1, 2, 3, 4, 5].map((s) => (
                <span
                  key={s}
                  className="flex h-4 w-4 items-center justify-center rounded-sm bg-white text-[10px] font-bold text-foreground"
                >
                  ★
                </span>
              ))}
            </div>
            <span className="text-sm font-semibold">4,9 / 5</span>
            <span className="text-sm text-white/50">38 036 avis vérifiés</span>
          </div>

          <div className="flex flex-wrap justify-center gap-2">
            {["Visa", "Mastercard", "Amex", "PayPal", "Apple Pay", "Google Pay"].map((brand) => (
              <span
                key={brand}
                className="rounded border border-white/15 px-2.5 py-1 text-[11px] font-medium text-white/60"
              >
                {brand}
              </span>
            ))}
          </div>
        </div>

        {/* Legal */}
        <div className="flex flex-col gap-3 pt-6 text-center sm:flex-row sm:items-center sm:justify-between sm:text-left">
          <p className="text-[13px] text-white/50">
            © 2026 Agadir Driver. Tous droits réservés.
          </p>
          <p className="text-[11px] leading-relaxed text-white/35">
            S.A.R.L. au capital de 100 000 MAD · Patente 3451S7 · RC Agadir 530419 · I.F. 4581971
          </p>
        </div>
      </div>

      {/* Floating support button */}
      <a
        href={WHATSAPP_LINK}
        target="_blank"
        rel="noreferrer"
        aria-label="Contacter l'assistance sur WhatsApp"
        className="fixed right-4 bottom-4 z-40 hidden items-center gap-2.5 rounded-full bg-background px-5 py-3.5 text-sm font-semibold text-foreground shadow-[0_8px_30px_rgba(0,0,0,0.25)] ring-1 ring-border transition-transform hover:scale-[1.03] lg:inline-flex"
      >
        <MessageCircle size={18} aria-hidden="true" />
        Assistance 24/7
      </a>
    </footer>
  );
}

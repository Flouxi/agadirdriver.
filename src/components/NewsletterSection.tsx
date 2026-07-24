import React, { useState } from 'react';
import { Mail, CheckCircle2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function NewsletterSection() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubscribed(true);
      setEmail('');
    }, 1000);
  };

  return (
    <section className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Black container matching design */}
        <div className="bg-[#0F1115] rounded-[2rem] p-8 sm:p-12 lg:p-16 text-center relative overflow-hidden border border-gray-800">
          
          {/* Subtle background blur blobs */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] bg-yellow-500/5 rounded-full blur-[80px] pointer-events-none"></div>

          <div className="max-w-3xl mx-auto space-y-6 relative z-10">
            <h2 className="text-2xl sm:text-4xl font-black tracking-tight text-white font-display leading-tight">
              Abonnez-vous à la newsletter et <br className="hidden sm:inline" />
              <span className="text-[#EAB308]">bénéficiez de 5 % de réduction</span> sur votre premier trajet !
            </h2>
            
            <p className="text-sm text-gray-300 font-medium max-w-xl mx-auto">
              Recevez les dernières actualités, conseils de voyage locaux pour le Maroc et offres exclusives directement dans votre boîte de réception.
            </p>

            <AnimatePresence mode="wait">
              {!subscribed ? (
                <motion.form
                  key="form"
                  initial={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onSubmit={handleSubmit}
                  className="flex flex-col sm:flex-row items-center gap-3 max-w-lg mx-auto pt-4"
                >
                  <div className="relative w-full flex items-center">
                    <Mail size={16} className="absolute left-4 text-gray-400" />
                    <input
                      type="email"
                      placeholder="Saisissez votre adresse e-mail"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full pl-11 pr-4 py-3.5 bg-gray-900 border border-gray-800 focus:border-[#EAB308] rounded-xl text-xs font-semibold text-white placeholder-gray-500 focus:outline-none transition-colors"
                      required
                      disabled={loading}
                    />
                  </div>
                  
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full sm:w-auto px-8 py-3.5 bg-[#EAB308] hover:bg-[#CA8A04] text-[#0F1115] font-black rounded-xl text-xs uppercase tracking-wider shadow-lg shadow-yellow-500/10 active:scale-95 transition-all cursor-pointer shrink-0 disabled:opacity-50"
                  >
                    {loading ? 'Inscription...' : "S'abonner"}
                  </button>
                </motion.form>
              ) : (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-[#1e2330] border border-green-500/20 rounded-xl p-4 max-w-md mx-auto flex items-center justify-center gap-3"
                >
                  <CheckCircle2 size={20} className="text-green-500 shrink-0" />
                  <div className="text-left">
                    <span className="block text-xs font-bold text-white">Merci pour votre inscription !</span>
                    <span className="block text-[10px] text-gray-400 font-semibold mt-0.5">Votre code promo de 5% arrive dans quelques instants.</span>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Legal text footnotes */}
            <p className="text-[10px] font-medium text-gray-500 leading-relaxed max-w-md mx-auto pt-4">
              En vous abonnant à la newsletter, vous acceptez notre politique de confidentialité. Nous ne vendrons ni ne partagerons jamais vos données avec des tiers. Promotion de bienvenue valable uniquement pour les nouveaux clients sur leur premier trajet réservé.
            </p>
          </div>

        </div>
      </div>
    </section>
  );
}

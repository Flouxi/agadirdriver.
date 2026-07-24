import React from 'react';
import { REVIEWS } from '../data';
import { Star, CheckCircle, Quote, ChevronLeft, ChevronRight } from 'lucide-react';

export default function ReviewGrid() {
  return (
    <section className="py-16 bg-[#F9FAFB] border-t border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Title with Star Icon */}
        <div className="flex flex-col items-center justify-center text-center mb-10">
          <div className="flex items-center gap-1 text-[#EAB308] mb-2 bg-[#0F1115] px-3 py-1 rounded-full text-xs font-bold tracking-wider uppercase font-mono">
            <Star size={12} fill="currentColor" />
            <span>Avis Témoignages</span>
          </div>
          
          <h2 className="text-2xl sm:text-3xl font-black text-gray-900 tracking-tight font-display uppercase">
            Ce que disent nos clients
          </h2>
          
          {/* Trustpilot Banner Badge */}
          <div className="mt-4 flex flex-col sm:flex-row items-center gap-3 bg-white px-5 py-3 rounded-2xl border border-gray-200/80 shadow-sm">
            <div className="flex items-center gap-1.5">
              <span className="text-xs font-bold text-gray-500 font-mono">Nos clients disent</span>
              <div className="flex gap-0.5">
                {[1, 2, 3, 4, 5].map((s) => (
                  <div key={s} className="w-4.5 h-4.5 bg-[#00B67A] flex items-center justify-center text-white text-[10px] rounded-sm font-bold">★</div>
                ))}
              </div>
              <span className="text-xs font-extrabold text-[#00B67A] font-display">EXCELLENT</span>
            </div>
            <span className="hidden sm:inline text-gray-300">|</span>
            <span className="text-xs font-bold text-gray-700">
              Note <strong className="text-gray-900 font-mono">4.9 / 5</strong> basée sur <strong className="text-gray-900 font-mono">38 036</strong> avis sur <span className="text-[#00B67A] font-extrabold">Trustpilot</span>
            </span>
          </div>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {REVIEWS.map((review) => (
            <div
              key={review.id}
              className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm hover:shadow-md hover:border-gray-300 transition-all duration-300 flex flex-col justify-between relative group"
            >
              {/* Quote Mark Decoration */}
              <div className="absolute top-4 right-4 text-gray-100 group-hover:text-[#EAB308]/10 transition-colors">
                <Quote size={32} fill="currentColor" />
              </div>

              <div>
                {/* Stars and Verified tag */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex gap-0.5">
                    {Array.from({ length: review.rating }).map((_, i) => (
                      <div key={i} className="w-3.5 h-3.5 bg-[#00B67A] flex items-center justify-center text-white text-[8px] rounded-sm font-bold">★</div>
                    ))}
                  </div>
                  {review.verified && (
                    <span className="flex items-center gap-1 text-[9px] font-extrabold text-[#00B67A] bg-[#00B67A]/5 border border-[#00B67A]/10 px-1.5 py-0.5 rounded uppercase">
                      <CheckCircle size={9} fill="currentColor" className="text-white" />
                      Vérifié
                    </span>
                  )}
                </div>

                {/* Review Title */}
                <h4 className="font-extrabold text-sm text-gray-900 mb-2 line-clamp-1 group-hover:text-[#EAB308] transition-colors">
                  {review.title}
                </h4>

                {/* Comment Body */}
                <p className="text-xs font-medium text-gray-500 leading-relaxed line-clamp-4">
                  "{review.comment}"
                </p>
              </div>

              {/* Author & Timestamp Footer */}
              <div className="border-t border-gray-100 pt-3 mt-4 flex items-center justify-between text-[10px] font-semibold text-gray-400">
                <span className="font-bold text-gray-700 capitalize">{review.author}</span>
                <span className="font-mono">{review.timeAgo}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Trustpilot footer verification details */}
        <div className="mt-8 text-center">
          <p className="text-[11px] font-semibold text-gray-400">
            Évaluations client indépendantes collectées via Trustpilot et auditées en toute transparence.
          </p>
        </div>

      </div>
    </section>
  );
}

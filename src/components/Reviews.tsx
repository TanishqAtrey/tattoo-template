import React from 'react';
import { TESTIMONIALS } from '../data/mockData';
import { CheckCircle2 } from 'lucide-react';

const GRADIENTS = [
  'linear-gradient(135deg, #f59e0b, #d97706)',
  'linear-gradient(135deg, #6366f1, #3b82f6)',
  'linear-gradient(135deg, #10b981, #059669)',
  'linear-gradient(135deg, #ec4899, #8b5cf6)',
  'linear-gradient(135deg, #f43f5e, #fb923c)',
  'linear-gradient(135deg, #3b82f6, #06b6d4)',
  'linear-gradient(135deg, #8b5cf6, #d946ef)',
  'linear-gradient(135deg, #14b8a6, #84cc16)',
];

export const Reviews: React.FC = () => {
  const row1 = TESTIMONIALS.slice(0, 4);
  const row2 = TESTIMONIALS.slice(4, 8);

  // Duplicate arrays to create infinite seamless marquee looping
  const row1Items = [...row1, ...row1, ...row1, ...row1];
  const row2Items = [...row2, ...row2, ...row2, ...row2];

  return (
    <section id="reviews" className="min-h-screen flex flex-col justify-center py-16 sm:py-20 select-none overflow-hidden bg-white">
      {/* Section Header matching template */}
      <div className="max-w-2xl mx-auto mb-10 px-4 sm:px-6 text-center flex flex-col items-center gap-3">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-slate-250 bg-slate-50 text-[11px] font-bold uppercase tracking-widest text-slate-600">
          <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
          <span>Wall of Love</span>
        </div>

        <h2 className="font-serif-heading font-extrabold text-3xl sm:text-5xl text-slate-950 tracking-tight leading-tight">
          Don't take our word <span className="gold-gradient-text italic font-serif-heading">for it</span>.
        </h2>

        <p className="text-slate-600 text-sm sm:text-base font-normal max-w-lg leading-relaxed">
          Real feedback from our tattooed family. Hover over any story to pause and read along.
        </p>
      </div>

      {/* Marquee Dual Rows */}
      <div className="space-y-4 w-full">
        {/* Row 1: Forward Scroll */}
        <div className="tmq-row tmq-mask overflow-hidden flex w-full">
          <div className="tmq-track flex gap-4 pl-4">
            {row1Items.map((rev, i) => {
              const gradient = GRADIENTS[i % GRADIENTS.length];
              const initial = rev.clientName.charAt(0).toUpperCase();

              return (
                <article
                  key={`r1-${rev.id}-${i}`}
                  className="w-[290px] sm:w-[350px] shrink-0 p-5 sm:p-6 rounded-2xl bg-white border border-slate-200 hover:border-amber-500/80 shadow-sm hover:shadow-lg transition-all flex flex-col justify-between gap-4"
                >
                  <div className="space-y-3">
                    {/* 5 Stars */}
                    <div className="text-amber-500 text-sm tracking-widest">
                      ★★★★★
                    </div>

                    {/* Quote */}
                    <p className="text-slate-800 text-xs sm:text-sm leading-relaxed font-normal italic">
                      "{rev.comment}"
                    </p>
                  </div>

                  {/* Author / Client Info */}
                  <div className="flex items-center gap-3 pt-2 border-t border-slate-100">
                    <div
                      className="w-9 h-9 rounded-full shrink-0 flex items-center justify-center text-white font-black text-sm shadow-sm"
                      style={{ background: gradient }}
                    >
                      {initial}
                    </div>

                    <div className="flex flex-col min-w-0">
                      <div className="font-bold text-xs sm:text-sm text-slate-950 flex items-center gap-1.5 truncate">
                        <span>{rev.clientName}</span>
                        {rev.verifiedBooking && (
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        )}
                      </div>
                      <span className="text-[11px] text-slate-500 truncate">
                        Tattooed by {rev.artistName} · {rev.placement}
                      </span>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>

        {/* Row 2: Reverse Scroll */}
        <div className="tmq-row tmq-mask overflow-hidden flex w-full">
          <div className="tmq-track-rev flex gap-4 pl-4">
            {row2Items.map((rev, i) => {
              const gradient = GRADIENTS[(i + 4) % GRADIENTS.length];
              const initial = rev.clientName.charAt(0).toUpperCase();

              return (
                <article
                  key={`r2-${rev.id}-${i}`}
                  className="w-[290px] sm:w-[350px] shrink-0 p-5 sm:p-6 rounded-2xl bg-white border border-slate-200 hover:border-amber-500/80 shadow-sm hover:shadow-lg transition-all flex flex-col justify-between gap-4"
                >
                  <div className="space-y-3">
                    {/* 5 Stars */}
                    <div className="text-amber-500 text-sm tracking-widest">
                      ★★★★★
                    </div>

                    {/* Quote */}
                    <p className="text-slate-800 text-xs sm:text-sm leading-relaxed font-normal italic">
                      "{rev.comment}"
                    </p>
                  </div>

                  {/* Author / Client Info */}
                  <div className="flex items-center gap-3 pt-2 border-t border-slate-100">
                    <div
                      className="w-9 h-9 rounded-full shrink-0 flex items-center justify-center text-white font-black text-sm shadow-sm"
                      style={{ background: gradient }}
                    >
                      {initial}
                    </div>

                    <div className="flex flex-col min-w-0">
                      <div className="font-bold text-xs sm:text-sm text-slate-950 flex items-center gap-1.5 truncate">
                        <span>{rev.clientName}</span>
                        {rev.verifiedBooking && (
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        )}
                      </div>
                      <span className="text-[11px] text-slate-500 truncate">
                        Tattooed by {rev.artistName} · {rev.placement}
                      </span>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

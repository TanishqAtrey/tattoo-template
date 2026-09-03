import React from 'react';
import { Sparkles, Calendar, ArrowRight } from 'lucide-react';

interface PiercingSectionProps {
  onOpenBooking: () => void;
}

export const PiercingSection: React.FC<PiercingSectionProps> = ({ onOpenBooking }) => {
  return (
    <section id="piercing" className="py-6 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto select-none">
      <div className="relative rounded-2xl overflow-hidden border border-slate-200 shadow-md bg-slate-950">
        {/* Split Background Image Strip */}
        <div className="grid grid-cols-2 h-full absolute inset-0">
          <div className="relative h-full overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=70"
              alt="Piercing styling left"
              className="w-full h-full object-cover object-center filter brightness-75"
              loading="lazy"
              decoding="async"
            />
          </div>
          <div className="relative h-full overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=70"
              alt="Piercing styling right"
              className="w-full h-full object-cover object-center filter brightness-75"
              loading="lazy"
              decoding="async"
            />
          </div>
        </div>

        {/* Ambient Overlay */}
        <div className="absolute inset-0 bg-slate-950/75 backdrop-blur-[1px]" />

        {/* Banner Content (Horizontal on Desktop, Compact on Mobile) */}
        <div className="relative z-10 p-5 sm:p-6 md:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 sm:gap-6">
          <div className="max-w-2xl space-y-1.5">
            <div className="inline-flex items-center gap-1.5 text-amber-300 text-[10px] sm:text-xs uppercase tracking-widest font-bold">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>Piercings by XYZ</span>
            </div>

            <h2 className="font-serif-heading font-extrabold text-xl sm:text-2xl lg:text-3xl text-white leading-tight">
              Express Yourself
            </h2>

            <p className="text-slate-300 text-xs sm:text-sm font-normal leading-relaxed max-w-xl">
              XYZ offers expert piercing services blending clinical safety with curated luxury jewelry to express your unique identity.
            </p>
          </div>

          <div className="shrink-0 pt-1 md:pt-0 w-full md:w-auto">
            <button
              type="button"
              onClick={onOpenBooking}
              className="w-full md:w-auto px-6 py-3 rounded-xl bg-white text-slate-950 font-extrabold text-xs sm:text-sm hover:bg-amber-400 hover:text-slate-950 transition-all shadow-md active:scale-95 flex items-center justify-center gap-2"
            >
              <Calendar className="w-4 h-4 text-amber-700" />
              <span>Book an Appointment</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

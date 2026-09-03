import React, { useState } from 'react';
import { ShieldCheck, Droplets, HeartPulse, Sun, CheckCircle, ArrowRight } from 'lucide-react';

interface AftercareSectionProps {
  onExploreAftercare: () => void;
}

export const AftercareSection: React.FC<AftercareSectionProps> = ({ onExploreAftercare }) => {
  const [activeTab, setActiveTab] = useState<'day1-3' | 'day4-14' | 'longterm'>('day1-3');

  const aftercareStages = {
    'day1-3': {
      title: 'Days 1 to 3: Protective Barrier Phase',
      icon: Droplets,
      steps: [
        'Keep medical film on for 24–72 hours as instructed.',
        'Gently wash with unscented antibacterial soap and warm water.',
        'Pat dry with clean single-use paper towel (never rub).',
      ],
    },
    'day4-14': {
      title: 'Days 4 to 14: Flaking & Moisture Phase',
      icon: HeartPulse,
      steps: [
        'Apply fragrance-free moisturizer 3–4 times daily.',
        'Do NOT scratch or pick peeling skin.',
        'Wear loose cotton clothing over the fresh ink.',
      ],
    },
    'longterm': {
      title: 'Week 3 & Beyond: Longevity Protection',
      icon: Sun,
      steps: [
        'Full dermal cellular recovery completes in 4–6 weeks.',
        'Apply SPF 50+ sunscreen daily when exposed to sunlight.',
        'Complimentary touch-up within 6 months if needed.',
      ],
    },
  };

  return (
    <section id="aftercare" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="bg-white p-8 sm:p-12 rounded-3xl border border-slate-200 shadow-sm relative overflow-hidden">
        <div className="max-w-3xl mb-10">
          <div className="inline-flex items-center gap-2 text-amber-700 text-xs uppercase tracking-widest font-bold mb-2">
            <ShieldCheck className="w-4 h-4" />
            <span>Master Healing Protocol</span>
          </div>
          <h2 className="font-serif-heading font-extrabold text-3xl sm:text-4xl text-slate-950 mb-3">
            TATTOO AFTERCARE & HEALING
          </h2>
          <p className="text-slate-600 text-sm sm:text-base font-normal leading-relaxed">
            50% of tattoo longevity depends on proper aftercare. Follow our clinical protocol for rich contrast and vibrant healing.
          </p>
        </div>

        {/* Timeline Tabs */}
        <div className="flex rounded-xl bg-slate-100 p-1 border border-slate-200 gap-1 max-w-md mb-6">
          {[
            { id: 'day1-3', label: 'Day 1–3' },
            { id: 'day4-14', label: 'Day 4–14' },
            { id: 'longterm', label: 'Week 3+' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex-1 py-2.5 rounded-lg text-xs font-semibold transition-all ${
                activeTab === tab.id
                  ? 'bg-amber-500 text-slate-950 font-bold shadow-md'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Card & Read Full Guide CTA */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-8 bg-slate-50 p-6 sm:p-7 rounded-2xl border border-slate-200 space-y-4">
            <h3 className="font-serif-heading font-bold text-lg text-slate-950">
              {aftercareStages[activeTab].title}
            </h3>
            <div className="space-y-3">
              {aftercareStages[activeTab].steps.map((step, idx) => (
                <div key={idx} className="flex items-start gap-3 text-xs sm:text-sm text-slate-700">
                  <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>{step}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-4 flex flex-col items-start gap-4">
            <p className="text-xs text-slate-600 font-normal">
              Looking for our complete list of clinical dos and don'ts, pre-session prep, and touch-up guarantees?
            </p>
            <button
              type="button"
              onClick={onExploreAftercare}
              className="glow-btn px-6 py-3 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 font-bold text-xs sm:text-sm flex items-center gap-2 shadow-md shadow-amber-500/20"
            >
              <span>Explore Full Aftercare Guide</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

import React, { useState } from 'react';
import { ShieldCheck, Droplets, HeartPulse, Sun, CheckCircle, AlertTriangle, Sparkles, Check, X } from 'lucide-react';

export const AftercarePage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'day1-3' | 'day4-14' | 'longterm'>('day1-3');

  const aftercareStages = {
    'day1-3': {
      title: 'Days 1 to 3: The Healing Barrier Phase',
      icon: Droplets,
      steps: [
        'Keep the medical protective film (Saniderm/Dermalize) on for 24 to 72 hours as instructed by your artist.',
        'If the film leaks fluid or peels over the ink, remove gently under warm running water with unscented antibacterial soap.',
        'Gently pat dry with a clean, single-use paper towel (never rub, and never use a regular cloth bath towel).',
        'Let the skin breathe for 10 minutes before applying a very sheer, rice-grain layer of aftercare balm.',
      ],
      warning: 'Never submerge in baths, hot tubs, swimming pools, or ocean water during this critical stage.',
    },
    'day4-14': {
      title: 'Days 4 to 14: Flaking & Moisturizing Phase',
      icon: HeartPulse,
      steps: [
        'Wash 2 times daily with mild fragrance-free antibacterial soap and lukewarm water.',
        'Apply a thin layer of non-comedogenic fragrance-free lotion 3–4 times daily whenever the tattoo feels tight or dry.',
        'Light flaking, peeling, and mild itching (similar to sunburn) is completely normal.',
        'DO NOT pick, scratch, or forcibly peel the flakes. Let them shed naturally to preserve ink density.',
      ],
      warning: 'Avoid tight, abrasive clothing and rigorous gym friction over the fresh tattoo.',
    },
    'longterm': {
      title: 'Week 3 & Beyond: Vibrancy & Longevity Protection',
      icon: Sun,
      steps: [
        'Your deep dermis completes full cellular regeneration between weeks 4 to 6.',
        'Always apply broad-spectrum SPF 50+ sunscreen when exposed to direct sunlight to prevent ink fading.',
        'Keep skin nourished with daily hydrating body lotion to keep blackwork rich and colors radiant.',
        'We offer complimentary touch-ups within 6 months of your session if needed for any ink fallouts.',
      ],
      warning: 'UV sunlight exposure is the #1 cause of premature ink breakdown and line spread over decades.',
    },
  };

  const dosAndDonts = {
    dos: [
      'Wash gently with unscented antibacterial soap',
      'Pat dry with clean, disposable paper towels',
      'Wear loose-fitting, breathable cotton clothing',
      'Drink plenty of water to keep skin hydrated',
      'Apply SPF 50+ sunscreen after full healing',
    ],
    donts: [
      'Do NOT soak in baths, saunas, hot tubs, or pools',
      'Do NOT pick, scratch, or peel shedding skin',
      'Do NOT apply heavy petroleum or Vaseline',
      'Do NOT expose fresh ink to direct UV sunlight',
      'Do NOT let pets sleep directly against fresh ink',
    ],
  };

  return (
    <div className="pt-28 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto animate-fade-in min-h-[85vh]">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-14">
        <div className="inline-flex items-center gap-2 text-amber-700 text-xs uppercase tracking-widest font-bold mb-2">
          <ShieldCheck className="w-4 h-4" />
          <span>Clinical Studio Protocol</span>
        </div>
        <h1 className="font-serif-heading font-extrabold text-3xl sm:text-5xl text-slate-950 mb-4">
          TATTOO AFTERCARE GUIDE
        </h1>
        <p className="text-slate-600 text-sm sm:text-base font-normal leading-relaxed">
          50% of your tattoo's longevity, contrast, and sharp detail depends on proper aftercare. Follow our clinical healing protocol to ensure flawless results.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start mb-16">
        {/* Timeline Guide (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="font-serif-heading font-bold text-xl sm:text-2xl text-slate-950">
              HEALING TIMELINE PHASES
            </h2>
          </div>

          {/* Timeline Tabs */}
          <div className="flex rounded-xl bg-slate-100 p-1 border border-slate-200 gap-1">
            {[
              { id: 'day1-3', label: 'Day 1–3: Protection' },
              { id: 'day4-14', label: 'Day 4–14: Peeling' },
              { id: 'longterm', label: 'Week 3+: Longevity' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex-1 py-3 rounded-lg text-xs sm:text-sm font-semibold transition-all ${
                  activeTab === tab.id
                    ? 'bg-amber-500 text-slate-950 font-bold shadow-md'
                    : 'text-slate-600 hover:text-slate-950'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Active Phase Card */}
          <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-sm space-y-5">
            <h3 className="font-serif-heading font-bold text-xl text-slate-950">
              {aftercareStages[activeTab].title}
            </h3>

            <div className="space-y-3.5">
              {aftercareStages[activeTab].steps.map((step, idx) => (
                <div key={idx} className="flex items-start gap-3 text-sm text-slate-700">
                  <CheckCircle className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                  <span className="leading-relaxed">{step}</span>
                </div>
              ))}
            </div>

            <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 text-xs sm:text-sm flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 shrink-0 mt-0.5 text-amber-600" />
              <div>
                <span className="font-bold uppercase tracking-wider block mb-0.5">Crucial Warning:</span>
                <span>{aftercareStages[activeTab].warning}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Dos & Don'ts (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          <h2 className="font-serif-heading font-bold text-xl sm:text-2xl text-slate-950">
            RULES FOR HEALING
          </h2>

          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-5">
            {/* Dos */}
            <div>
              <div className="text-xs font-bold uppercase tracking-wider text-emerald-700 mb-3 flex items-center gap-1.5">
                <Check className="w-4 h-4" />
                <span>Recommended Practices</span>
              </div>
              <ul className="space-y-2">
                {dosAndDonts.dos.map((item, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 mt-2 shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="border-t border-slate-200 pt-5">
              <div className="text-xs font-bold uppercase tracking-wider text-crimson-600 mb-3 flex items-center gap-1.5">
                <X className="w-4 h-4" />
                <span>Strictly Avoid</span>
              </div>
              <ul className="space-y-2">
                {dosAndDonts.donts.map((item, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700">
                    <span className="w-1.5 h-1.5 rounded-full bg-crimson-600 mt-2 shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

import React, { useState } from 'react';
import { BODY_AREAS } from '../data/mockData';
import { Calculator, Sparkles, AlertCircle, ArrowRight, ShieldCheck, Clock, Zap } from 'lucide-react';

interface PriceEstimatorProps {
  onApplyEstimate: (estimate: {
    style: string;
    placement: string;
    sizeInches: number;
    colorType: 'black_and_grey' | 'full_color' | 'accent_color';
    estimatedPriceMin: number;
    estimatedPriceMax: number;
    depositAmount: number;
  }) => void;
}

export const PriceEstimator: React.FC<PriceEstimatorProps> = ({ onApplyEstimate }) => {
  const [style, setStyle] = useState<string>('fine-line');
  const [placement, setPlacement] = useState<string>('forearm');
  const [sizeInches, setSizeInches] = useState<number>(5);
  const [colorType, setColorType] = useState<'black_and_grey' | 'full_color' | 'accent_color'>('black_and_grey');
  const [complexity, setComplexity] = useState<'minimal' | 'detailed' | 'masterpiece'>('detailed');

  const selectedArea = BODY_AREAS.find((a) => a.id === placement) || BODY_AREAS[0];

  // Calculation Engine
  const baseRatePerHour = 180;
  
  // Complexity multiplier
  const complexityMultiplier = complexity === 'minimal' ? 0.8 : complexity === 'detailed' ? 1.0 : 1.35;

  // Color multiplier
  const colorMultiplier = colorType === 'black_and_grey' ? 1.0 : colorType === 'accent_color' ? 1.15 : 1.3;

  // Style multiplier
  const styleMultipliers: Record<string, number> = {
    'fine-line': 1.0,
    'blackwork': 1.05,
    'micro-realism': 1.3,
    'neo-traditional': 1.15,
    'irezumi': 1.25,
    'minimalist': 0.85,
  };
  const styleMultiplier = styleMultipliers[style] || 1.0;

  // Estimated hours based on size (inches)
  const baseHours = Math.max(1.2, (sizeInches * 0.55) * complexityMultiplier * (selectedArea.durationMultiplier || 1.0));
  const roundedHours = Math.round(baseHours * 10) / 10;

  // Price ranges
  const rawPrice = baseHours * baseRatePerHour * colorMultiplier * styleMultiplier;
  const estimatedPriceMin = Math.max(150, Math.round(rawPrice * 0.9 / 10) * 10);
  const estimatedPriceMax = Math.max(200, Math.round(rawPrice * 1.15 / 10) * 10);
  const depositAmount = Math.min(250, Math.max(60, Math.round(estimatedPriceMin * 0.25 / 10) * 10));

  return (
    <section id="estimator" className="pb-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-10 md:p-12 relative overflow-hidden shadow-md">
        {/* Glow Element */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/10 blur-[130px] rounded-full pointer-events-none" />

        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 text-amber-700 text-xs uppercase tracking-widest font-bold mb-2">
            <Calculator className="w-4 h-4" />
            <span>Interactive Tattoo Pricing Tool</span>
          </div>
          <h2 className="font-serif-heading font-extrabold text-3xl sm:text-4xl text-slate-950 mb-3">
            INSTANT ESTIMATOR & PAIN INDEX
          </h2>
          <p className="text-slate-600 text-sm sm:text-base font-normal">
            Customize your dream piece to calculate accurate studio pricing, estimated hours, and anatomical sensitivity before booking.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Controls Form (7 Cols) */}
          <div className="lg:col-span-7 space-y-6">
            {/* 1. Style Selection */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-950 mb-2.5">
                1. Tattoo Style
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {[
                  { id: 'fine-line', label: 'Fine Line' },
                  { id: 'micro-realism', label: 'Micro-Realism' },
                  { id: 'blackwork', label: 'Blackwork' },
                  { id: 'neo-traditional', label: 'Neo-Traditional' },
                  { id: 'irezumi', label: 'Japanese Irezumi' },
                  { id: 'minimalist', label: 'Minimalist' },
                ].map((s) => (
                  <button
                    key={s.id}
                    onClick={() => setStyle(s.id)}
                    className={`py-2.5 px-3 rounded-xl text-xs font-semibold text-center border transition-all ${
                      style === s.id
                        ? 'bg-amber-500 text-slate-950 border-amber-600 font-bold shadow-sm'
                        : 'bg-slate-100 text-slate-800 border-slate-200 hover:border-slate-350 hover:bg-slate-200'
                    }`}
                  >
                    {s.label}
                  </button>
                ))}
              </div>
            </div>

            {/* 2. Body Placement */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-950 mb-2.5">
                2. Body Placement Location
              </label>
              <select
                value={placement}
                onChange={(e) => setPlacement(e.target.value)}
                className="w-full bg-slate-100 border border-slate-200 rounded-xl px-4 py-3 text-slate-900 text-sm font-medium focus:outline-none focus:border-amber-500 transition-colors"
              >
                {BODY_AREAS.map((area) => (
                  <option key={area.id} value={area.id}>
                    {area.name} — Pain: {area.painLevel}
                  </option>
                ))}
              </select>
            </div>

            {/* 3. Size Slider */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-950">
                  3. Approximate Size
                </label>
                <span className="text-sm font-bold text-amber-800 bg-slate-100 px-3 py-1 rounded-lg border border-slate-200">
                  {sizeInches} inches (~{Math.round(sizeInches * 2.54)} cm)
                </span>
              </div>
              <input
                type="range"
                min="2"
                max="14"
                step="1"
                value={sizeInches}
                onChange={(e) => setSizeInches(Number(e.target.value))}
                className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-amber-600"
              />
              <div className="flex justify-between text-[11px] text-slate-500 mt-1">
                <span>Small (2"-3")</span>
                <span>Medium (4"-6")</span>
                <span>Large (7"-9")</span>
                <span>XL / Sleeve (10"+)</span>
              </div>
            </div>

            {/* 4. Color & Shading */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-950 mb-2">
                  4. Color Palette
                </label>
                <div className="flex flex-col gap-2">
                  {[
                    { id: 'black_and_grey', label: 'Black & Grey / Wash' },
                    { id: 'accent_color', label: 'Black with Color Accent' },
                    { id: 'full_color', label: 'Full Dynamic Color' },
                  ].map((c) => (
                    <button
                      key={c.id}
                      onClick={() => setColorType(c.id as any)}
                      className={`text-left px-3 py-2 rounded-lg text-xs font-medium border transition-all ${
                        colorType === c.id
                          ? 'bg-amber-50 text-amber-900 border-amber-400 font-bold'
                          : 'bg-slate-50 text-slate-700 border-slate-200 hover:border-slate-300'
                      }`}
                    >
                      {c.label}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-950 mb-2">
                  5. Shading / Detail Complexity
                </label>
                <div className="flex flex-col gap-2">
                  {[
                    { id: 'minimal', label: 'Minimalist / Clean Lines' },
                    { id: 'detailed', label: 'Detailed Texture & Gradient' },
                    { id: 'masterpiece', label: 'Masterwork / Ultra-Dense' },
                  ].map((d) => (
                    <button
                      key={d.id}
                      onClick={() => setComplexity(d.id as any)}
                      className={`text-left px-3 py-2 rounded-lg text-xs font-medium border transition-all ${
                        complexity === d.id
                          ? 'bg-amber-50 text-amber-900 border-amber-400 font-bold'
                          : 'bg-slate-50 text-slate-700 border-slate-200 hover:border-slate-300'
                      }`}
                    >
                      {d.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Results Card (5 Cols) */}
          <div className="lg:col-span-5 bg-slate-50 border border-amber-300 rounded-2xl p-6 sm:p-8 flex flex-col justify-between shadow-md relative backdrop-blur-xl">
            {/* Top Badge */}
            <div className="flex items-center justify-between pb-4 border-b border-slate-200">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-600">
                Live Studio Quote
              </span>
              <span className="px-2.5 py-1 rounded-md text-[11px] font-bold bg-amber-100 text-amber-900 border border-amber-300 flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-amber-700" />
                Guaranteed Estimate
              </span>
            </div>

            {/* Estimated Price Display */}
            <div className="py-6 text-center">
              <div className="text-xs text-slate-500 uppercase tracking-widest font-bold mb-1">
                Estimated Price Range
              </div>
              <div className="font-serif-heading font-extrabold text-4xl sm:text-5xl text-amber-800 mb-2">
                ${estimatedPriceMin} – ${estimatedPriceMax}
              </div>
              <div className="text-xs text-slate-700 font-medium">
                Required Deposit to Reserve: <strong className="text-slate-950">${depositAmount}</strong>
              </div>
            </div>

            {/* Specs Breakdown */}
            <div className="space-y-3 py-4 border-t border-slate-200 text-xs">
              <div className="flex justify-between items-center">
                <span className="text-slate-600 flex items-center gap-1.5 font-medium">
                  <Clock className="w-4 h-4 text-amber-700" />
                  Estimated Time:
                </span>
                <span className="font-semibold text-slate-900">
                  ~{roundedHours} Hours {roundedHours > 5 ? '(May require 2 sessions)' : ''}
                </span>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-slate-600 flex items-center gap-1.5 font-medium">
                  <Zap className="w-4 h-4 text-amber-600" />
                  Pain Sensitivity Index:
                </span>
                <span className="font-bold text-amber-800">
                  {selectedArea.painLevel}
                </span>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-slate-600 flex items-center gap-1.5 font-medium">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  Includes:
                </span>
                <span className="text-slate-800 font-medium">
                  Custom Artwork + Sterile Kit + Aftercare Cream
                </span>
              </div>
            </div>

            {/* Action CTA */}
            <div className="pt-6">
              <button
                onClick={() =>
                  onApplyEstimate({
                    style,
                    placement,
                    sizeInches,
                    colorType,
                    estimatedPriceMin,
                    estimatedPriceMax,
                    depositAmount,
                  })
                }
                className="glow-btn w-full py-4 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 font-extrabold text-sm shadow-md shadow-amber-500/25 hover:from-amber-400 hover:to-amber-500 transition-all flex items-center justify-center gap-2"
              >
                <span>Book This Custom Concept</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <p className="text-[11px] text-center text-slate-500 mt-2.5 font-medium">
                Deposit is 100% credited toward your final tattoo cost.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

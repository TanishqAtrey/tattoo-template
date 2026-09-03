import React from 'react';
import { BookingWizardState, BodyPlacement } from '../../types';
import { BODY_AREAS } from '../../data/mockData';
import { MapPin, Zap, ArrowLeft, ArrowRight, CheckCircle2 } from 'lucide-react';

interface StepPlacementProps {
  formData: BookingWizardState;
  onChange: (updates: Partial<BookingWizardState>) => void;
  onNext: () => void;
  onBack: () => void;
}

export const StepPlacement: React.FC<StepPlacementProps> = ({
  formData,
  onChange,
  onNext,
  onBack,
}) => {
  const selectedArea = BODY_AREAS.find((a) => a.id === formData.placement) || BODY_AREAS[0];

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h3 className="font-serif-heading font-bold text-xl text-slate-950 mb-1">
          Body Placement & Canvas Size
        </h3>
        <p className="text-slate-600 text-xs sm:text-sm font-normal">
          Where on your body will this piece live, and how large should it be?
        </p>
      </div>

      {/* Body Area Selector */}
      <div>
        <label className="block text-xs font-bold uppercase tracking-wider text-slate-950 mb-2.5">
          Select Body Area
        </label>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 max-h-56 overflow-y-auto pr-1">
          {BODY_AREAS.map((area) => {
            const isSelected = formData.placement === area.id;
            return (
              <div
                key={area.id}
                onClick={() => onChange({ placement: area.id as BodyPlacement })}
                className={`p-3 rounded-xl border cursor-pointer transition-all ${
                  isSelected
                    ? 'bg-amber-50/70 border-amber-500 ring-1 ring-amber-500/40 text-amber-900 font-semibold'
                    : 'bg-slate-50 border-slate-200 text-slate-700 hover:border-slate-350 hover:bg-slate-100'
                }`}
              >
                <div className="flex items-center justify-between font-bold text-xs text-slate-950">
                  <span>{area.name}</span>
                  {isSelected && <CheckCircle2 className="w-3.5 h-3.5 text-amber-700 shrink-0" />}
                </div>
                <div className="text-[10px] text-amber-800 font-medium mt-1 flex items-center gap-1">
                  <Zap className="w-2.5 h-2.5 text-amber-600" />
                  <span>{area.painLevel}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Specific Placement Notes */}
      <div>
        <label className="block text-xs font-bold uppercase tracking-wider text-slate-950 mb-2">
          Specific Placement Location & Details (Optional)
        </label>
        <input
          type="text"
          value={formData.placementNotes}
          onChange={(e) => onChange({ placementNotes: e.target.value })}
          placeholder="e.g. Left inner forearm, 2 inches below elbow crease"
          className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-900 focus:outline-none focus:border-amber-500 transition-colors"
        />
      </div>

      {/* Size Slider */}
      <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
        <div className="flex justify-between items-center mb-2">
          <label className="text-xs font-bold uppercase tracking-wider text-slate-950">
            Estimated Size (Inches / CM)
          </label>
          <span className="text-sm font-bold text-amber-800 bg-white px-3 py-1 rounded-lg border border-slate-200 shadow-sm">
            {formData.sizeInches}" (~{Math.round(formData.sizeInches * 2.54)} cm)
          </span>
        </div>
        <input
          type="range"
          min="2"
          max="14"
          step="1"
          value={formData.sizeInches}
          onChange={(e) => onChange({ sizeInches: Number(e.target.value) })}
          className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-amber-600"
        />
        <div className="flex justify-between text-[11px] text-slate-500 mt-1 font-medium">
          <span>Small (2"-3")</span>
          <span>Medium (4"-6")</span>
          <span>Large (7"-9")</span>
          <span>XL / Full (10"+)</span>
        </div>
      </div>

      {/* Color Palette */}
      <div>
        <label className="block text-xs font-bold uppercase tracking-wider text-slate-950 mb-2">
          Color Preference
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
          {[
            { id: 'black_and_grey', label: 'Black & Grey / Wash', desc: 'Classic ink tones & smooth gradients' },
            { id: 'accent_color', label: 'Accent Color', desc: 'Blackwork with 1-2 highlight pops' },
            { id: 'full_color', label: 'Full Color', desc: 'Saturated dynamic color palette' },
          ].map((c) => {
            const isSelected = formData.colorType === c.id;
            return (
              <div
                key={c.id}
                onClick={() => onChange({ colorType: c.id as any })}
                className={`p-3 rounded-xl border cursor-pointer transition-all ${
                  isSelected
                    ? 'bg-amber-50/70 border-amber-500 text-amber-900 font-semibold'
                    : 'bg-slate-50 border-slate-200 text-slate-700 hover:border-slate-350 hover:bg-slate-100'
                }`}
              >
                <div className="font-bold text-xs text-slate-950">{c.label}</div>
                <div className="text-[10px] text-slate-600 mt-0.5">{c.desc}</div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Navigation */}
      <div className="pt-4 flex justify-between items-center">
        <button
          type="button"
          onClick={onBack}
          className="px-5 py-2.5 rounded-xl bg-slate-100 border border-slate-200 text-slate-700 hover:text-slate-950 text-xs font-semibold flex items-center gap-1.5"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back</span>
        </button>
        <button
          type="button"
          onClick={onNext}
          className="glow-btn px-6 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 font-bold text-xs sm:text-sm shadow-md flex items-center gap-1.5"
        >
          <span>Continue to References</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

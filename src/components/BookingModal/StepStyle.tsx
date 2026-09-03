import React from 'react';
import { BookingWizardState, AppointmentType } from '../../types';
import { Sparkles, MessageSquare, RefreshCw, CheckCircle2 } from 'lucide-react';

interface StepStyleProps {
  formData: BookingWizardState;
  onChange: (updates: Partial<BookingWizardState>) => void;
  onNext: () => void;
}

export const StepStyle: React.FC<StepStyleProps> = ({ formData, onChange, onNext }) => {
  const appointmentTypes: { id: AppointmentType; title: string; desc: string; icon: any }[] = [
    {
      id: 'custom-tattoo',
      title: 'Custom Tattoo Concept',
      desc: 'Bespoke design created from your ideas, stories, and reference images.',
      icon: Sparkles,
    },
    {
      id: 'consultation',
      title: 'In-Studio Consultation',
      desc: '30-minute sit down with an artist to plan a large sleeve or cover-up.',
      icon: MessageSquare,
    },
    {
      id: 'touch-up',
      title: 'Touch-Up Session',
      desc: 'Complimentary touch-up for existing XYZ work.',
      icon: RefreshCw,
    },
  ];

  const styles: { id: string; label: string; desc: string }[] = [
    { id: 'fine-line', label: 'Fine Line & Botanical', desc: 'Single-needle delicacy, florals, micro-details' },
    { id: 'micro-realism', label: 'Micro-Realism & Portraits', desc: 'Photographic shading, sculptures, animals' },
    { id: 'blackwork', label: 'Blackwork & Geometry', desc: 'Saturated black ink, stipple, sacred geometry' },
    { id: 'irezumi', label: 'Japanese Irezumi', desc: 'Traditional dragrons, waves, koi, sumi-e flow' },
    { id: 'neo-traditional', label: 'Neo-Traditional', desc: 'Bold outlines, saturated jewel tones' },
    { id: 'minimalist', label: 'Minimalist & Sigilism', desc: 'Clean typography, micro symbols, sigils' },
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h3 className="font-serif-heading font-bold text-xl text-slate-950 mb-1">
          Select Appointment & Style
        </h3>
        <p className="text-slate-600 text-xs sm:text-sm font-normal">
          What type of project are you looking to create with us?
        </p>
      </div>

      {/* Appointment Type Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {appointmentTypes.map((type) => {
          const Icon = type.icon;
          const isSelected = formData.appointmentType === type.id;
          return (
            <div
              key={type.id}
              onClick={() => onChange({ appointmentType: type.id })}
              className={`p-4 rounded-xl border cursor-pointer transition-all ${
                isSelected
                  ? 'bg-amber-50/70 border-amber-500 shadow-sm ring-1 ring-amber-500/50'
                  : 'bg-slate-50 border-slate-200 hover:border-slate-350 hover:bg-slate-100'
              }`}
            >
              <div className="flex items-start justify-between mb-2">
                <div className={`p-2 rounded-lg ${isSelected ? 'bg-amber-500/20 text-amber-800' : 'bg-slate-200 text-slate-600'}`}>
                  <Icon className="w-4 h-4" />
                </div>
                {isSelected && <CheckCircle2 className="w-4 h-4 text-amber-700" />}
              </div>
              <div className="font-bold text-sm text-slate-950 mb-0.5">{type.title}</div>
              <div className="text-xs text-slate-600 font-normal">{type.desc}</div>
            </div>
          );
        })}
      </div>

      {/* Style selection for custom tattoos */}
      {formData.appointmentType === 'custom-tattoo' && (
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-950 mb-3">
            Primary Tattoo Style
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {styles.map((s) => {
              const isSelected = formData.style === s.id;
              return (
                <div
                  key={s.id}
                  onClick={() => onChange({ style: s.id })}
                  className={`p-3 rounded-xl border cursor-pointer transition-all ${
                    isSelected
                      ? 'bg-amber-50/70 border-amber-500 text-amber-900 ring-1 ring-amber-500/30 font-semibold'
                      : 'bg-slate-50 border-slate-200 text-slate-700 hover:border-slate-350 hover:bg-slate-100'
                  }`}
                >
                  <div className="font-bold text-xs sm:text-sm text-slate-950 flex items-center justify-between">
                    <span>{s.label}</span>
                    {isSelected && <CheckCircle2 className="w-3.5 h-3.5 text-amber-700" />}
                  </div>
                  <div className="text-[11px] text-slate-600 mt-0.5">{s.desc}</div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      <div className="pt-4 flex justify-end">
        <button
          type="button"
          onClick={onNext}
          className="glow-btn px-6 py-3 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 font-bold text-sm shadow-md"
        >
          Continue to Placement & Size →
        </button>
      </div>
    </div>
  );
};

import React from 'react';
import { BookingWizardState } from '../../types';
import { ARTISTS, TIME_SLOTS } from '../../data/mockData';
import { Calendar as CalendarIcon, Clock, User, ArrowLeft, ArrowRight, CheckCircle2 } from 'lucide-react';

interface StepScheduleProps {
  formData: BookingWizardState;
  onChange: (updates: Partial<BookingWizardState>) => void;
  onNext: () => void;
  onBack: () => void;
}

export const StepSchedule: React.FC<StepScheduleProps> = ({
  formData,
  onChange,
  onNext,
  onBack,
}) => {
  // Generate next 14 available days for quick date selector
  const today = new Date();
  const availableDates = Array.from({ length: 14 }).map((_, i) => {
    const d = new Date();
    d.setDate(today.getDate() + i + 1); // starting from tomorrow
    const iso = d.toISOString().split('T')[0];
    const dayName = d.toLocaleDateString('en-US', { weekday: 'short' });
    const monthDay = d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    return { iso, dayName, monthDay, isSunday: d.getDay() === 0 };
  });

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h3 className="font-serif-heading font-bold text-xl text-slate-950 mb-1">
          Artist & Appointment Schedule
        </h3>
        <p className="text-slate-600 text-xs sm:text-sm font-normal">
          Choose your preferred resident artist and lock in your preferred session time slot.
        </p>
      </div>

      {/* 1. Artist Selector */}
      <div>
        <label className="block text-xs font-bold uppercase tracking-wider text-slate-950 mb-2.5">
          Select Resident Artist
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {ARTISTS.map((artist) => {
            const isSelected = formData.artistId === artist.id;
            return (
              <div
                key={artist.id}
                onClick={() => onChange({ artistId: artist.id })}
                className={`p-3.5 rounded-xl border cursor-pointer transition-all flex flex-col justify-between ${
                  isSelected
                    ? 'bg-amber-50/70 border-amber-500 ring-1 ring-amber-500/40 text-amber-900 shadow-sm'
                    : 'bg-slate-50 border-slate-200 text-slate-700 hover:border-slate-350 hover:bg-slate-100'
                }`}
              >
                <div className="flex items-center gap-3 mb-2">
                  <img
                    src={artist.avatarUrl}
                    alt={artist.name}
                    className="w-10 h-10 rounded-full object-cover border border-slate-200 shadow-sm"
                  />
                  <div>
                    <div className="font-bold text-xs sm:text-sm text-slate-950 flex items-center gap-1">
                      <span>{artist.name}</span>
                      {isSelected && <CheckCircle2 className="w-3.5 h-3.5 text-amber-700" />}
                    </div>
                    <div className="text-[11px] text-slate-500 font-medium">${artist.hourlyRate}/hr</div>
                  </div>
                </div>
                <div className="text-[10px] text-slate-600 line-clamp-1 font-medium">
                  {artist.specialties.slice(0, 2).join(' • ')}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 2. Date Picker (Interactive carousel / picker) */}
      <div>
        <div className="flex justify-between items-center mb-2.5">
          <label className="text-xs font-bold uppercase tracking-wider text-slate-950">
            Select Appointment Date
          </label>
          <span className="text-xs text-amber-800 font-bold">
            {formData.preferredDate || 'Choose date below'}
          </span>
        </div>

        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-thin">
          {availableDates.map((item) => {
            const isSelected = formData.preferredDate === item.iso;
            return (
              <button
                key={item.iso}
                type="button"
                onClick={() => onChange({ preferredDate: item.iso })}
                className={`flex-shrink-0 w-20 py-2.5 px-2 rounded-xl text-center border transition-all ${
                  isSelected
                    ? 'bg-amber-500 text-slate-950 border-amber-600 font-bold shadow-md'
                    : 'bg-slate-50 border-slate-200 text-slate-700 hover:border-slate-350 hover:bg-slate-100'
                }`}
              >
                <div className="text-[10px] uppercase font-bold tracking-wider">{item.dayName}</div>
                <div className="text-xs font-bold mt-0.5">{item.monthDay}</div>
              </button>
            );
          })}
        </div>

        {/* Custom Date Input for dates further out */}
        <div className="mt-2 flex items-center gap-2">
          <span className="text-xs text-slate-500 font-medium">Or pick specific date:</span>
          <input
            type="date"
            min={availableDates[0]?.iso}
            value={formData.preferredDate}
            onChange={(e) => onChange({ preferredDate: e.target.value })}
            className="bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1 text-xs text-slate-900 focus:outline-none focus:border-amber-500"
          />
        </div>
      </div>

      {/* 3. Time Slot Selector */}
      <div>
        <label className="block text-xs font-bold uppercase tracking-wider text-slate-950 mb-2.5">
          Select Preferred Time Slot
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
          {TIME_SLOTS.map((slot) => {
            const isSelected = formData.preferredTimeSlot === slot.label;
            return (
              <div
                key={slot.id}
                onClick={() => onChange({ preferredTimeSlot: slot.label })}
                className={`p-3 rounded-xl border cursor-pointer transition-all flex items-center justify-between ${
                  isSelected
                    ? 'bg-amber-50/70 border-amber-500 text-amber-900 ring-1 ring-amber-500/30 font-semibold'
                    : 'bg-slate-50 border-slate-200 text-slate-700 hover:border-slate-350 hover:bg-slate-100'
                }`}
              >
                <div>
                  <div className="font-bold text-xs sm:text-sm text-slate-950 flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-amber-700" />
                    <span>{slot.label}</span>
                  </div>
                  <div className="text-[11px] text-slate-600 mt-0.5 font-normal">
                    {slot.period} • <span className="text-slate-500">{slot.suitableFor}</span>
                  </div>
                </div>
                {isSelected && <CheckCircle2 className="w-4 h-4 text-amber-700 shrink-0" />}
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
          disabled={!formData.preferredDate || !formData.preferredTimeSlot}
          onClick={onNext}
          className={`glow-btn px-6 py-2.5 rounded-xl text-slate-950 font-bold text-xs sm:text-sm shadow-md flex items-center gap-1.5 ${
            !formData.preferredDate || !formData.preferredTimeSlot
              ? 'bg-slate-200 text-slate-400 cursor-not-allowed'
              : 'bg-gradient-to-r from-amber-500 to-amber-600'
          }`}
        >
          <span>Client Details & Consent</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

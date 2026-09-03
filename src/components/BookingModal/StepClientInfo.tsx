import React, { useState } from 'react';
import { BookingWizardState } from '../../types';
import { User, Mail, Phone, Instagram, ShieldCheck, AlertTriangle, ArrowLeft, ArrowRight } from 'lucide-react';

interface StepClientInfoProps {
  formData: BookingWizardState;
  onChange: (updates: Partial<BookingWizardState>) => void;
  onNext: () => void;
  onBack: () => void;
}

export const StepClientInfo: React.FC<StepClientInfoProps> = ({
  formData,
  onChange,
  onNext,
  onBack,
}) => {
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const validateAndNext = () => {
    const newErrors: { [key: string]: string } = {};

    if (!formData.clientName.trim()) {
      newErrors.clientName = 'Full legal name is required';
    }
    if (!formData.clientEmail.trim() || !formData.clientEmail.includes('@')) {
      newErrors.clientEmail = 'A valid email is required for confirmation';
    }
    if (!formData.clientPhone.trim()) {
      newErrors.clientPhone = 'Phone number is required for SMS reminders';
    }
    if (!formData.isOver18) {
      newErrors.isOver18 = 'You must be at least 18 years of age to book a tattoo';
    }
    if (!formData.medicalConsent) {
      newErrors.medicalConsent = 'Medical disclosure and consent acknowledgement is required';
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      onNext();
    }
  };

  const healthQuestions = [
    'I am not currently pregnant or nursing.',
    'I am not currently taking prescription blood thinners or Accutane.',
    'I do not have unhealed eczema, psoriasis, or open lesions in the tattoo area.',
    'I agree to present a valid government-issued photo ID upon arrival at the studio.',
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h3 className="font-serif-heading font-bold text-xl text-slate-950 mb-1">
          Client Information & Consent
        </h3>
        <p className="text-slate-600 text-xs sm:text-sm font-normal">
          Your contact details for your private appointment confirmation and legal studio waiver.
        </p>
      </div>

      {/* Input Fields */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Full Name */}
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-950 mb-1.5">
            Full Legal Name <span className="text-amber-700">*</span>
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
              <User className="w-4 h-4" />
            </div>
            <input
              type="text"
              value={formData.clientName}
              onChange={(e) => onChange({ clientName: e.target.value })}
              placeholder="e.g. Alexander Cross"
              className={`w-full bg-slate-50 border rounded-xl pl-10 pr-4 py-2.5 text-sm text-slate-900 focus:outline-none focus:border-amber-500 transition-colors ${
                errors.clientName ? 'border-rose-500' : 'border-slate-200'
              }`}
            />
          </div>
          {errors.clientName && (
            <p className="text-rose-600 text-[11px] mt-1 font-medium">{errors.clientName}</p>
          )}
        </div>

        {/* Email Address */}
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-950 mb-1.5">
            Email Address (for confirmation) <span className="text-amber-700">*</span>
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
              <Mail className="w-4 h-4" />
            </div>
            <input
              type="email"
              value={formData.clientEmail}
              onChange={(e) => onChange({ clientEmail: e.target.value })}
              placeholder="alex@example.com"
              className={`w-full bg-slate-50 border rounded-xl pl-10 pr-4 py-2.5 text-sm text-slate-900 focus:outline-none focus:border-amber-500 transition-colors ${
                errors.clientEmail ? 'border-rose-500' : 'border-slate-200'
              }`}
            />
          </div>
          {errors.clientEmail && (
            <p className="text-rose-600 text-[11px] mt-1 font-medium">{errors.clientEmail}</p>
          )}
        </div>

        {/* Phone Number */}
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-950 mb-1.5">
            Phone / WhatsApp (for SMS alerts) <span className="text-amber-700">*</span>
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
              <Phone className="w-4 h-4" />
            </div>
            <input
              type="tel"
              value={formData.clientPhone}
              onChange={(e) => onChange({ clientPhone: e.target.value })}
              placeholder="+1 (555) 000-0000"
              className={`w-full bg-slate-50 border rounded-xl pl-10 pr-4 py-2.5 text-sm text-slate-900 focus:outline-none focus:border-amber-500 transition-colors ${
                errors.clientPhone ? 'border-rose-500' : 'border-slate-200'
              }`}
            />
          </div>
          {errors.clientPhone && (
            <p className="text-rose-600 text-[11px] mt-1 font-medium">{errors.clientPhone}</p>
          )}
        </div>

        {/* Instagram Handle */}
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-950 mb-1.5">
            Instagram Handle (Optional)
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
              <Instagram className="w-4 h-4" />
            </div>
            <input
              type="text"
              value={formData.clientInstagram}
              onChange={(e) => onChange({ clientInstagram: e.target.value })}
              placeholder="@yourhandle"
              className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-4 py-2.5 text-sm text-slate-900 focus:outline-none focus:border-amber-500 transition-colors"
            />
          </div>
        </div>
      </div>

      {/* Health & Safety Declarations Checklist */}
      <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-3">
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-800">
          <ShieldCheck className="w-4 h-4 text-amber-700" />
          <span>Health Declarations & Safety Standards</span>
        </div>

        <ul className="text-xs space-y-2 text-slate-700">
          {healthQuestions.map((item, idx) => (
            <li key={idx} className="flex items-start gap-2">
              <span className="text-amber-700 font-bold">•</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>

        <div className="pt-2 border-t border-slate-200 space-y-2.5">
          {/* 18+ checkbox */}
          <label className="flex items-center gap-3 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={formData.isOver18}
              onChange={(e) => onChange({ isOver18: e.target.checked })}
              className="w-4 h-4 rounded bg-white border-slate-300 text-amber-600 focus:ring-amber-500 accent-amber-600"
            />
            <span className="text-xs text-slate-900 font-semibold">
              I certify that I am at least 18 years old. <span className="text-amber-700">*</span>
            </span>
          </label>
          {errors.isOver18 && (
            <p className="text-rose-600 text-[11px] ml-7 font-medium">{errors.isOver18}</p>
          )}

          {/* Medical consent checkbox */}
          <label className="flex items-center gap-3 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={formData.medicalConsent}
              onChange={(e) => onChange({ medicalConsent: e.target.checked })}
              className="w-4 h-4 rounded bg-white border-slate-300 text-amber-600 focus:ring-amber-500 accent-amber-600"
            />
            <span className="text-xs text-slate-900 font-semibold">
              I agree to the health checklist and non-refundable deposit terms. <span className="text-amber-700">*</span>
            </span>
          </label>
          {errors.medicalConsent && (
            <p className="text-rose-600 text-[11px] ml-7 font-medium">{errors.medicalConsent}</p>
          )}
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
          onClick={validateAndNext}
          className="glow-btn px-6 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 font-bold text-xs sm:text-sm shadow-md flex items-center gap-1.5"
        >
          <span>Review & Deposit Quote</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

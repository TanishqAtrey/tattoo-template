import React, { useState, useEffect } from 'react';
import { PortfolioPiece, Artist, BookingRequest } from '../../types';
import { saveBooking } from '../../lib/storage';
import { X, Phone, MessageSquare, ChevronDown, CheckCircle2 } from 'lucide-react';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialPiece?: PortfolioPiece | null;
  initialArtist?: Artist | null;
  initialEstimate?: {
    style: string;
    placement: string;
    sizeInches: number;
    colorType: 'black_and_grey' | 'full_color' | 'accent_color';
  } | null;
  onBookingSuccess?: (booking: BookingRequest) => void;
}

const COUNTRY_CODES = [
  { code: '+91', flag: '🇮🇳', name: 'India' },
  { code: '+1', flag: '🇺🇸', name: 'USA/Canada' },
  { code: '+44', flag: '🇬🇧', name: 'UK' },
  { code: '+61', flag: '🇦🇺', name: 'Australia' },
  { code: '+971', flag: '🇦🇪', name: 'UAE' },
  { code: '+49', flag: '🇩🇪', name: 'Germany' },
  { code: '+33', flag: '🇫🇷', name: 'France' },
  { code: '+65', flag: '🇸🇬', name: 'Singapore' },
];

export const BookingModal: React.FC<BookingModalProps> = ({
  isOpen,
  onClose,
  initialPiece,
  initialArtist,
  initialEstimate,
  onBookingSuccess,
}) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [selectedCountryCode, setSelectedCountryCode] = useState('+91');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [timeframe, setTimeframe] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Reset when opening
  useEffect(() => {
    if (isOpen) {
      setIsSubmitted(false);
      setErrors({});
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!firstName.trim()) errs.firstName = 'First name is required';
    if (!lastName.trim()) errs.lastName = 'Last name is required';
    if (!phone.trim()) {
      errs.phone = 'Phone number is required';
    } else if (!/^\d{7,15}$/.test(phone.replace(/[\s-]/g, ''))) {
      errs.phone = 'Please enter a valid phone number';
    }
    if (!email.trim()) {
      errs.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      errs.email = 'Please enter a valid email address';
    }
    if (!timeframe) {
      errs.timeframe = 'Please select your preferred timeframe';
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);

    const fullName = `${firstName.trim()} ${lastName.trim()}`;
    const fullPhone = `${selectedCountryCode} ${phone.trim()}`;

    const newBooking: BookingRequest = {
      id: `BK-${Math.floor(1000 + Math.random() * 9000)}`,
      createdAt: new Date().toISOString(),
      clientName: fullName,
      clientEmail: email.trim(),
      clientPhone: fullPhone,
      appointmentType: 'custom-tattoo',
      style: initialPiece?.style || initialEstimate?.style || 'custom',
      placement: (initialPiece?.placement as any) || (initialEstimate?.placement as any) || 'forearm',
      sizeInches: initialEstimate?.sizeInches || 5,
      colorType: initialEstimate?.colorType || 'black_and_grey',
      referenceImages: initialPiece ? [initialPiece.imageUrl] : [],
      customDescription: `Inquiry Timeframe: ${timeframe}${
        initialPiece ? ` | Piece: ${initialPiece.title}` : ''
      }${initialArtist ? ` | Preferred Artist: ${initialArtist.name}` : ''}`,
      preferredDate: new Date(Date.now() + 86400000 * 3).toISOString().split('T')[0],
      preferredTimeSlot: '10:00 AM - 01:30 PM',
      artistId: initialArtist?.id || 'artist-1',
      artistName: initialArtist?.name || 'XYZ Master',
      estimatedPriceMin: 250,
      estimatedPriceMax: 400,
      depositAmount: 80,
      depositPaid: false,
      status: 'pending',
      adminNotes: `Timeframe: ${timeframe}`,
      isOver18: true,
      medicalConsent: true,
    };

    saveBooking(newBooking);

    if (onBookingSuccess) {
      onBookingSuccess(newBooking);
    }

    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 400);
  };

  const handleCall = () => {
    window.location.href = 'tel:+919876543210';
  };

  const handleWhatsApp = () => {
    const text = encodeURIComponent(
      `Hi XYZ! I just submitted an appointment request for ${firstName} ${lastName} (${timeframe}). I would love to connect!`
    );
    window.open(`https://wa.me/919876543210?text=${text}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-900/60 backdrop-blur-sm animate-fade-in overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl my-8 overflow-hidden border border-slate-200">
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full bg-slate-100 text-slate-500 hover:text-slate-950 hover:bg-slate-200 transition-colors z-20"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        {!isSubmitted ? (
          /* Step 1: Book An Appointment Form (Matches Image 1) */
          <div className="p-6 sm:p-10">
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-950 mb-6 sm:mb-8 font-serif-heading">
              Book An Appointment
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
              {/* First Name & Last Name */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-900 mb-1.5">
                    First name <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    placeholder="Enter your first name"
                    className={`w-full bg-white border rounded-xl px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-900/10 transition-all ${
                      errors.firstName ? 'border-rose-500' : 'border-slate-300'
                    }`}
                  />
                  {errors.firstName && (
                    <p className="text-rose-600 text-xs mt-1">{errors.firstName}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-900 mb-1.5">
                    Last name <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    placeholder="Enter your last name"
                    className={`w-full bg-white border rounded-xl px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-900/10 transition-all ${
                      errors.lastName ? 'border-rose-500' : 'border-slate-300'
                    }`}
                  />
                  {errors.lastName && (
                    <p className="text-rose-600 text-xs mt-1">{errors.lastName}</p>
                  )}
                </div>
              </div>

              {/* Phone & Email */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-900 mb-1.5">
                    Phone <span className="text-rose-500">*</span>
                  </label>
                  <div className="flex rounded-xl border border-slate-300 overflow-hidden focus-within:ring-2 focus-within:ring-slate-900/10">
                    <div className="relative bg-slate-50 border-r border-slate-300 flex items-center px-2.5">
                      <select
                        value={selectedCountryCode}
                        onChange={(e) => setSelectedCountryCode(e.target.value)}
                        className="opacity-0 absolute inset-0 w-full h-full cursor-pointer"
                      >
                        {COUNTRY_CODES.map((c) => (
                          <option key={c.code} value={c.code}>
                            {c.flag} {c.code} ({c.name})
                          </option>
                        ))}
                      </select>
                      <div className="flex items-center gap-1 text-sm pointer-events-none pr-1">
                        <span>{COUNTRY_CODES.find((c) => c.code === selectedCountryCode)?.flag || '🇮🇳'}</span>
                        <ChevronDown className="w-3.5 h-3.5 text-slate-500" />
                      </div>
                    </div>
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="Phone Number"
                      className="w-full px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none"
                    />
                  </div>
                  {errors.phone && (
                    <p className="text-rose-600 text-xs mt-1">{errors.phone}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-900 mb-1.5">
                    Email <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    className={`w-full bg-white border rounded-xl px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-900/10 transition-all ${
                      errors.email ? 'border-rose-500' : 'border-slate-300'
                    }`}
                  />
                  {errors.email && (
                    <p className="text-rose-600 text-xs mt-1">{errors.email}</p>
                  )}
                </div>
              </div>

              {/* How soon you wish to get the tattoo done? */}
              <div>
                <label className="block text-sm font-medium text-slate-900 mb-1.5">
                  How soon you wish to get the tattoo done? <span className="text-rose-500">*</span>
                </label>
                <div className="relative">
                  <select
                    value={timeframe}
                    onChange={(e) => setTimeframe(e.target.value)}
                    className={`w-full bg-white border rounded-xl px-4 py-3 text-sm text-slate-900 appearance-none focus:outline-none focus:ring-2 focus:ring-slate-900/10 cursor-pointer pr-10 ${
                      errors.timeframe ? 'border-rose-500' : 'border-slate-300'
                    }`}
                  >
                    <option value="">--Select--</option>
                    <option value="Within this week">Within this week</option>
                    <option value="Within 2-4 weeks">Within 2-4 weeks</option>
                    <option value="Next 1-3 months">Next 1-3 months</option>
                    <option value="Just researching / Flexible">Just researching / Flexible</option>
                  </select>
                  <div className="absolute inset-y-0 right-0 flex items-center pr-3.5 pointer-events-none text-slate-500">
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </div>
                {errors.timeframe && (
                  <p className="text-rose-600 text-xs mt-1">{errors.timeframe}</p>
                )}
              </div>

              {/* Submit CTA Button */}
              <div className="pt-3">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-[#111827] hover:bg-black text-white font-bold py-4 rounded-xl text-base transition-all duration-200 shadow-md active:scale-[0.99] flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <span>Book an Appointment</span>
                  )}
                </button>
              </div>
            </form>
          </div>
        ) : (
          /* Step 2: Thank You Screen (Matches Image 2) */
          <div className="p-8 sm:p-14 text-center space-y-6 animate-fade-in">
            {/* Big Headline */}
            <h1 className="text-4xl sm:text-6xl font-extrabold text-slate-950 font-serif-heading tracking-tight">
              Thank You
            </h1>

            {/* Subtitle */}
            <p className="text-slate-600 text-base sm:text-lg max-w-md mx-auto leading-relaxed">
              Thank you for sharing your details! Click on the button below to connect with our team directly.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 pt-4 max-w-md mx-auto">
              <button
                type="button"
                onClick={handleCall}
                className="w-full sm:w-1/2 bg-black hover:bg-slate-900 text-white font-bold py-3.5 px-6 rounded-lg text-sm transition-all shadow-md active:scale-95 flex items-center justify-center gap-2"
              >
                <Phone className="w-4 h-4" />
                <span>Call now</span>
              </button>

              <button
                type="button"
                onClick={handleWhatsApp}
                className="w-full sm:w-1/2 bg-[#00a82d] hover:bg-[#008f26] text-white font-bold py-3.5 px-6 rounded-lg text-sm transition-all shadow-md active:scale-95 flex items-center justify-center gap-2"
              >
                <MessageSquare className="w-4 h-4" />
                <span>WhatsApp Now</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

import React, { useState } from 'react';
import { BookingWizardState, BookingRequest } from '../../types';
import { ARTISTS, BODY_AREAS } from '../../data/mockData';
import { saveBooking } from '../../lib/storage';
import confetti from 'canvas-confetti';
import {
  CheckCircle2,
  Calendar,
  Clock,
  User,
  MapPin,
  CreditCard,
  Lock,
  Download,
  ExternalLink,
  Sparkles,
  ArrowLeft,
  ShieldCheck,
  Zap,
} from 'lucide-react';

interface StepReviewProps {
  formData: BookingWizardState;
  onBack: () => void;
  onBookingComplete: (booking: BookingRequest) => void;
}

export const StepReview: React.FC<StepReviewProps> = ({
  formData,
  onBack,
  onBookingComplete,
}) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [confirmedBooking, setConfirmedBooking] = useState<BookingRequest | null>(null);

  const selectedArtist = ARTISTS.find((a) => a.id === formData.artistId) || ARTISTS[0];
  const selectedArea = BODY_AREAS.find((a) => a.id === formData.placement) || BODY_AREAS[0];

  // Calculate pricing estimates
  let estMin = 200;
  let estMax = 350;
  let depositAmount = 80;

  if (formData.appointmentType === 'consultation') {
    estMin = 0;
    estMax = 50;
    depositAmount = 0;
  } else {
    const baseHours = Math.max(1.5, formData.sizeInches * 0.55 * (selectedArea.durationMultiplier || 1.0));
    estMin = Math.round(baseHours * selectedArtist.hourlyRate * 0.9 / 10) * 10;
    estMax = Math.round(baseHours * selectedArtist.hourlyRate * 1.2 / 10) * 10;
    depositAmount = Math.max(selectedArtist.minBookingDeposit, Math.round(estMin * 0.25 / 10) * 10);
  }

  const handleConfirmAndPay = () => {
    setIsProcessing(true);

    setTimeout(() => {
      const newBooking: BookingRequest = {
        id: `BK-${Math.floor(1000 + Math.random() * 9000)}`,
        createdAt: new Date().toISOString(),
        clientName: formData.clientName,
        clientEmail: formData.clientEmail,
        clientPhone: formData.clientPhone,
        clientInstagram: formData.clientInstagram,
        appointmentType: formData.appointmentType,
        style: formData.style,
        placement: formData.placement,
        placementNotes: formData.placementNotes,
        sizeInches: formData.sizeInches,
        colorType: formData.colorType,
        referenceImages: formData.referenceImages,
        customDescription: formData.customDescription,
        preferredDate: formData.preferredDate,
        preferredTimeSlot: formData.preferredTimeSlot,
        artistId: selectedArtist.id,
        artistName: selectedArtist.name,
        estimatedPriceMin: estMin,
        estimatedPriceMax: estMax,
        depositAmount: depositAmount,
        depositPaid: depositAmount > 0,
        status: 'confirmed',
        adminNotes: 'Online booking via client portal. Deposit secured.',
        isOver18: formData.isOver18,
        medicalConsent: formData.medicalConsent,
        healthDeclarations: ['18+ verified', 'Medical safety waiver signed'],
      };

      saveBooking(newBooking);
      setConfirmedBooking(newBooking);
      setIsProcessing(false);
      onBookingComplete(newBooking);

      // Trigger Celebration Confetti
      confetti({
        particleCount: 90,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#e5b849', '#f6d365', '#dc2626', '#ffffff'],
      });
    }, 1400);
  };

  // Google Calendar Link generator
  const getGoogleCalendarUrl = () => {
    if (!confirmedBooking) return '#';
    const title = encodeURIComponent(`XYZ Tattoo Session w/ ${confirmedBooking.artistName}`);
    const details = encodeURIComponent(
      `Tattoo Appointment at XYZ Atelier\nArtist: ${confirmedBooking.artistName}\nStyle: ${confirmedBooking.style}\nBooking ID: ${confirmedBooking.id}\nAddress: XYZ`
    );
    const location = encodeURIComponent('XYZ Atelier, XYZ');
    const dateStr = confirmedBooking.preferredDate.replace(/-/g, '');
    return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${dateStr}T110000Z/${dateStr}T150000Z&details=${details}&location=${location}`;
  };

  // iCal .ics download
  const handleDownloadIcs = () => {
    if (!confirmedBooking) return;
    const icsData = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//XYZ Atelier//Tattoo Booking//EN
BEGIN:VEVENT
SUMMARY:XYZ Tattoo Session w/ ${confirmedBooking.artistName}
DESCRIPTION:Tattoo Appointment at XYZ Atelier\\nStyle: ${confirmedBooking.style}\\nBooking ID: ${confirmedBooking.id}
LOCATION:XYZ
DTSTART:${confirmedBooking.preferredDate.replace(/-/g, '')}T110000Z
DTEND:${confirmedBooking.preferredDate.replace(/-/g, '')}T150000Z
STATUS:CONFIRMED
END:VEVENT
END:VCALENDAR`;

    const blob = new Blob([icsData], { type: 'text/calendar;charset=utf-8' });
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.setAttribute('download', `XYZ-Booking-${confirmedBooking.id}.ics`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (confirmedBooking) {
    return (
      <div className="space-y-6 text-center animate-fade-in py-4">
        {/* Success Icon */}
        <div className="w-16 h-16 rounded-full bg-emerald-500/15 border border-emerald-500/40 flex items-center justify-center text-emerald-700 mx-auto animate-bounce">
          <CheckCircle2 className="w-9 h-9" />
        </div>

        <div>
          <span className="px-3 py-1 rounded-full text-xs font-bold bg-amber-100 text-amber-900 border border-amber-300">
            Booking Confirmed & Guaranteed
          </span>
          <h3 className="font-serif-heading font-extrabold text-2xl sm:text-3xl text-slate-950 mt-2">
            YOU ARE OFFICIALLY BOOKED!
          </h3>
          <p className="text-slate-600 text-xs sm:text-sm font-normal mt-1 max-w-md mx-auto">
            Your appointment is locked with <strong className="text-slate-950">{confirmedBooking.artistName}</strong>. A confirmation email and SMS have been sent to <span className="text-amber-800 font-semibold">{confirmedBooking.clientEmail}</span>.
          </p>
        </div>

        {/* Confirmation Card */}
        <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 text-left space-y-4 max-w-md mx-auto shadow-md">
          <div className="flex justify-between items-center pb-3 border-b border-slate-200 text-xs">
            <span className="text-slate-500 font-medium">Appointment Code:</span>
            <span className="font-mono font-bold text-amber-800 text-sm">{confirmedBooking.id}</span>
          </div>

          <div className="space-y-2 text-xs text-slate-700">
            <div className="flex justify-between">
              <span className="text-slate-500 flex items-center gap-1.5 font-medium">
                <Calendar className="w-3.5 h-3.5 text-amber-700" />
                Date:
              </span>
              <span className="font-semibold text-slate-950">{confirmedBooking.preferredDate}</span>
            </div>

            <div className="flex justify-between">
              <span className="text-slate-500 flex items-center gap-1.5 font-medium">
                <Clock className="w-3.5 h-3.5 text-amber-700" />
                Time Slot:
              </span>
              <span className="font-semibold text-slate-950">{confirmedBooking.preferredTimeSlot}</span>
            </div>

            <div className="flex justify-between">
              <span className="text-slate-500 flex items-center gap-1.5 font-medium">
                <User className="w-3.5 h-3.5 text-amber-700" />
                Resident Artist:
              </span>
              <span className="font-semibold text-slate-950">{confirmedBooking.artistName}</span>
            </div>

            <div className="flex justify-between">
              <span className="text-slate-500 flex items-center gap-1.5 font-medium">
                <MapPin className="w-3.5 h-3.5 text-amber-700" />
                Placement / Size:
              </span>
              <span className="font-semibold text-slate-950">
                {confirmedBooking.placement} (~{confirmedBooking.sizeInches}")
              </span>
            </div>

            <div className="flex justify-between pt-2 border-t border-slate-200">
              <span className="text-slate-500 font-medium">Deposit Paid:</span>
              <span className="font-bold text-emerald-700">${confirmedBooking.depositAmount} (Secured)</span>
            </div>
          </div>
        </div>

        {/* Calendar Add Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 max-w-md mx-auto">
          <a
            href={getGoogleCalendarUrl()}
            target="_blank"
            rel="noreferrer"
            className="w-full sm:w-1/2 py-2.5 px-4 rounded-xl bg-slate-100 border border-slate-200 hover:border-amber-500 text-slate-800 text-xs font-semibold flex items-center justify-center gap-2 transition-colors shadow-sm"
          >
            <ExternalLink className="w-3.5 h-3.5 text-amber-700" />
            <span>Google Calendar</span>
          </a>

          <button
            type="button"
            onClick={handleDownloadIcs}
            className="w-full sm:w-1/2 py-2.5 px-4 rounded-xl bg-slate-100 border border-slate-200 hover:border-amber-500 text-slate-800 text-xs font-semibold flex items-center justify-center gap-2 transition-colors shadow-sm"
          >
            <Download className="w-3.5 h-3.5 text-amber-700" />
            <span>Download iCal (.ics)</span>
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h3 className="font-serif-heading font-bold text-xl text-slate-950 mb-1">
          Review & Secure Appointment
        </h3>
        <p className="text-slate-600 text-xs sm:text-sm font-normal">
          Review your appointment itinerary and reserve your time slot with a refundable studio deposit.
        </p>
      </div>

      {/* Booking Summary Box */}
      <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 space-y-4 shadow-sm">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          <div>
            <span className="text-slate-500 block mb-0.5 font-medium">Appointment Type:</span>
            <span className="font-bold text-slate-950 capitalize">
              {formData.appointmentType.replace('-', ' ')}
            </span>
          </div>

          <div>
            <span className="text-slate-500 block mb-0.5 font-medium">Artist:</span>
            <span className="font-bold text-amber-800">{selectedArtist.name}</span>
          </div>

          <div>
            <span className="text-slate-500 block mb-0.5 font-medium">Date & Slot:</span>
            <span className="font-semibold text-slate-950">
              {formData.preferredDate} ({formData.preferredTimeSlot})
            </span>
          </div>

          <div>
            <span className="text-slate-500 block mb-0.5 font-medium">Placement & Size:</span>
            <span className="font-semibold text-slate-950">
              {selectedArea.name} • {formData.sizeInches}" (~{Math.round(formData.sizeInches * 2.54)}cm)
            </span>
          </div>
        </div>

        {formData.customDescription && (
          <div className="pt-3 border-t border-slate-200 text-xs">
            <span className="text-slate-500 block mb-1 font-medium">Concept Notes:</span>
            <p className="text-slate-700 font-normal italic">"{formData.customDescription}"</p>
          </div>
        )}

        {formData.referenceImages.length > 0 && (
          <div className="pt-3 border-t border-slate-200">
            <span className="text-xs text-slate-500 block mb-2 font-medium">Attached References:</span>
            <div className="flex gap-2 overflow-x-auto pb-1">
              {formData.referenceImages.map((img, i) => (
                <img
                  key={i}
                  src={img}
                  alt="Ref"
                  className="w-12 h-12 rounded-lg object-cover border border-slate-200 shrink-0 shadow-sm"
                />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Pricing & Deposit Card */}
      <div className="p-5 rounded-2xl bg-slate-50 border border-amber-300 space-y-3 shadow-sm">
        <div className="flex justify-between items-center">
          <span className="text-xs text-slate-600 font-medium">Estimated Total Session Cost:</span>
          <span className="font-serif-heading font-bold text-lg text-slate-950">
            ${estMin} – ${estMax}
          </span>
        </div>

        <div className="flex justify-between items-center py-2 border-y border-slate-200">
          <div>
            <span className="text-xs font-bold text-amber-800">Required Deposit Today:</span>
            <span className="text-[10px] text-slate-500 block font-medium">Applied 100% to final tattoo cost</span>
          </div>
          <span className="font-serif-heading font-extrabold text-2xl text-amber-800">
            ${depositAmount}
          </span>
        </div>

        <div className="flex items-center gap-2 text-[11px] text-slate-600">
          <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>Encrypted 256-bit SSL Payment Simulation (Stripe & Apple Pay Ready)</span>
        </div>
      </div>

      {/* Navigation & Submit CTA */}
      <div className="pt-4 flex justify-between items-center">
        <button
          type="button"
          onClick={onBack}
          disabled={isProcessing}
          className="px-5 py-2.5 rounded-xl bg-slate-100 border border-slate-200 text-slate-700 hover:text-slate-950 text-xs font-semibold flex items-center gap-1.5"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back</span>
        </button>

        <button
          type="button"
          disabled={isProcessing}
          onClick={handleConfirmAndPay}
          className="glow-btn px-8 py-3.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 font-extrabold text-sm shadow-md shadow-amber-500/25 hover:from-amber-400 hover:to-amber-500 transition-all flex items-center gap-2"
        >
          {isProcessing ? (
            <>
              <div className="w-4 h-4 border-2 border-slate-950 border-t-transparent rounded-full animate-spin" />
              <span>Securing Slot...</span>
            </>
          ) : (
            <>
              <Lock className="w-4 h-4" />
              <span>Confirm & Lock Appointment (${depositAmount})</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
};

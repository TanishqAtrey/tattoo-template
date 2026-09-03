import React, { useState } from 'react';
import { FAQS } from '../data/mockData';
import { HelpCircle, ChevronDown, ChevronUp, Sparkles, MessageSquare, ShieldAlert } from 'lucide-react';

interface FAQPageProps {
  onOpenBooking?: () => void;
}

export const FAQPage: React.FC<FAQPageProps> = ({ onOpenBooking }) => {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  return (
    <div className="pt-28 pb-20 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto animate-fade-in min-h-[85vh]">
      {/* Page Header */}
      <div className="text-center max-w-3xl mx-auto mb-14">
        <div className="inline-flex items-center gap-2 text-amber-700 text-xs uppercase tracking-widest font-bold mb-2">
          <HelpCircle className="w-4 h-4" />
          <span>Knowledge & Studio Policies</span>
        </div>
        <h1 className="font-serif-heading font-extrabold text-3xl sm:text-5xl text-slate-950 mb-4">
          FREQUENTLY ASKED QUESTIONS
        </h1>
        <p className="text-slate-600 text-sm sm:text-base font-normal leading-relaxed">
          Everything you need to know about our sterile studio standards, custom artwork design process, booking policies, deposits, and session preparation.
        </p>
      </div>

      {/* FAQs List */}
      <div className="space-y-4 mb-16">
        {FAQS.map((faq, index) => {
          const isOpen = openFaq === index;
          return (
            <div
              key={index}
              className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm transition-all duration-200 hover:border-slate-300"
            >
              <button
                type="button"
                onClick={() => setOpenFaq(isOpen ? null : index)}
                className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 font-semibold text-slate-950 hover:text-amber-700 text-base sm:text-lg transition-colors"
              >
                <span>{faq.q}</span>
                <div className="w-8 h-8 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center shrink-0">
                  {isOpen ? (
                    <ChevronUp className="w-4 h-4 text-amber-700" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-slate-500" />
                  )}
                </div>
              </button>
              {isOpen && (
                <div className="px-5 pb-6 sm:px-6 sm:pb-6 text-sm sm:text-base text-slate-700 font-normal leading-relaxed border-t border-slate-150 pt-4 animate-fade-in bg-slate-50/50">
                  {faq.a}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Bottom Consultation Card */}
      {onOpenBooking && (
        <div className="bg-slate-50 p-8 sm:p-10 rounded-3xl border border-slate-200 text-center relative overflow-hidden shadow-sm">
          <div className="relative z-10 max-w-xl mx-auto space-y-4">
            <h3 className="font-serif-heading font-bold text-2xl text-slate-950">
              Have a Custom Question Not Listed Here?
            </h3>
            <p className="text-slate-600 text-sm font-normal leading-relaxed">
              Our resident artists and concierge team are available for direct concept discussions, anatomical sizing checks, and consultation advice.
            </p>
            <div className="pt-2">
              <button
                onClick={onOpenBooking}
                className="glow-btn px-8 py-3.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 font-bold text-sm shadow-xl shadow-amber-500/20 hover:from-amber-400 hover:to-amber-500 transition-all inline-flex items-center gap-2"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Request Artist Consultation</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

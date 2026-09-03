import React, { useState } from 'react';
import { FAQS } from '../data/mockData';
import { HelpCircle, ChevronDown, ChevronUp, ArrowRight } from 'lucide-react';

interface FAQSectionProps {
  onExploreFAQ: () => void;
}

export const FAQSection: React.FC<FAQSectionProps> = ({ onExploreFAQ }) => {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  // Show top 4 FAQs on home page
  const previewFaqs = FAQS.slice(0, 4);

  return (
    <section id="faq" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="text-center mb-12">
        <div className="inline-flex items-center gap-2 text-amber-700 text-xs uppercase tracking-widest font-bold mb-2">
          <HelpCircle className="w-4 h-4" />
          <span>Got Questions?</span>
        </div>
        <h2 className="font-serif-heading font-extrabold text-3xl sm:text-4xl text-slate-950 mb-4">
          FREQUENTLY ASKED QUESTIONS
        </h2>
        <p className="text-slate-600 max-w-2xl mx-auto text-sm sm:text-base font-normal">
          Essential answers regarding our studio sterilization, deposit rules, custom design process, and booking policies.
        </p>
      </div>

      <div className="max-w-4xl mx-auto space-y-3.5 mb-10">
        {previewFaqs.map((faq, index) => {
          const isOpen = openFaq === index;
          return (
            <div
              key={index}
              className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm transition-all duration-200 hover:border-slate-300"
            >
              <button
                type="button"
                onClick={() => setOpenFaq(isOpen ? null : index)}
                className="w-full p-5 text-left flex items-center justify-between gap-4 font-semibold text-slate-950 hover:text-amber-700 text-sm sm:text-base transition-colors"
              >
                <span>{faq.q}</span>
                <div className="w-7 h-7 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center shrink-0">
                  {isOpen ? (
                    <ChevronUp className="w-4 h-4 text-amber-700" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-slate-500" />
                  )}
                </div>
              </button>
              {isOpen && (
                <div className="px-5 pb-5 text-xs sm:text-sm text-slate-700 font-normal leading-relaxed border-t border-slate-150 pt-3 animate-fade-in bg-slate-50/50">
                  {faq.a}
                </div>
              )}
            </div>
          );
        })}
      </div>

      <div className="text-center">
        <button
          type="button"
          onClick={onExploreFAQ}
          className="glow-btn inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-white hover:bg-slate-50 text-slate-950 border border-slate-300 hover:border-amber-500 text-xs sm:text-sm font-bold shadow-sm transition-all"
        >
          <span>View All Studio FAQs & Policies</span>
          <ArrowRight className="w-4 h-4 text-amber-700" />
        </button>
      </div>
    </section>
  );
};

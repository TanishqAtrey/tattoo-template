import React from 'react';
import { Sparkles, MapPin, Phone, Mail, Clock, Instagram, ShieldCheck, Heart } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-50 border-t border-slate-200 pt-16 pb-12 px-4 sm:px-6 lg:px-8 text-slate-600 text-sm">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
        {/* Col 1: Brand & Philosophy */}
        <div className="space-y-3.5 flex flex-col justify-start">
          <div className="h-8 flex items-center gap-2.5">
            <div className="w-6 h-6 rounded-full bg-amber-500/15 border border-amber-500/40 flex items-center justify-center text-amber-700 shrink-0">
              <Sparkles className="w-3.5 h-3.5" />
            </div>
            <span className="font-serif-heading font-extrabold text-sm text-slate-950 tracking-wider uppercase">
              XYZ
            </span>
          </div>
          <p className="text-xs text-slate-600 leading-relaxed font-normal">
            A private bespoke tattoo atelier dedicated to the craft of fine-line etching, dark micro-realism, and Japanese Irezumi. We transform intimate stories into permanent skin masterpieces.
          </p>
          <div className="flex items-center gap-2.5 pt-1">
            {/* WhatsApp */}
            <a
              href="https://wa.me/919876543210?text=Hi%20XYZ!%20I%20would%20like%20to%20inquire%20about%20a%20tattoo%20or%20piercing%20session."
              target="_blank"
              rel="noreferrer"
              className="w-9 h-9 rounded-xl bg-white hover:bg-[#00a82d] text-emerald-600 hover:text-white border border-slate-200 hover:border-[#00a82d] flex items-center justify-center transition-all shadow-sm group"
              title="Chat on WhatsApp"
              aria-label="WhatsApp"
            >
              <svg className="w-4 h-4 fill-current transition-transform group-hover:scale-110" viewBox="0 0 24 24">
                <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
              </svg>
            </a>

            {/* Call */}
            <a
              href="tel:+919876543210"
              className="w-9 h-9 rounded-xl bg-white hover:bg-slate-950 text-slate-700 hover:text-white border border-slate-200 hover:border-slate-950 flex items-center justify-center transition-all shadow-sm group"
              title="Call Studio"
              aria-label="Call"
            >
              <Phone className="w-4 h-4 transition-transform group-hover:scale-110" />
            </a>

            {/* Instagram */}
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noreferrer"
              className="w-9 h-9 rounded-xl bg-white hover:bg-pink-600 text-slate-700 hover:text-white border border-slate-200 hover:border-pink-600 flex items-center justify-center transition-all shadow-sm group"
              title="Follow on Instagram"
              aria-label="Instagram"
            >
              <Instagram className="w-4 h-4 transition-transform group-hover:scale-110" />
            </a>

            {/* Google Maps Location Ping */}
            <a
              href="https://maps.google.com/?q=XYZ"
              target="_blank"
              rel="noreferrer"
              className="w-9 h-9 rounded-xl bg-white hover:bg-amber-600 text-amber-700 hover:text-white border border-slate-200 hover:border-amber-600 flex items-center justify-center transition-all shadow-sm group"
              title="Locate Studio on Google Maps"
              aria-label="Studio Location Map"
            >
              <MapPin className="w-4 h-4 transition-transform group-hover:scale-110" />
            </a>
          </div>
        </div>

        {/* Col 2: Studio Location & Hours */}
        <div className="space-y-3.5 flex flex-col justify-start">
          <div className="h-8 flex items-center">
            <h4 className="font-serif-heading font-extrabold text-slate-950 text-sm tracking-wider uppercase">
              Studio Location
            </h4>
          </div>
          <a
            href="https://maps.google.com/?q=XYZ"
            target="_blank"
            rel="noreferrer"
            className="flex items-start gap-2.5 text-xs text-slate-700 hover:text-amber-700 transition-colors group"
          >
            <MapPin className="w-4 h-4 text-amber-700 shrink-0 mt-0.5 group-hover:scale-110 transition-transform" />
            <span>
              XYZ
            </span>
          </a>
          <div className="flex items-start gap-2.5 text-xs text-slate-700 pt-1">
            <Clock className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
            <div>
              <div className="font-semibold text-slate-900">Tuesday – Saturday: 11:00 AM – 8:00 PM</div>
              <div className="text-slate-500">Sunday & Monday: Private Sessions Only</div>
            </div>
          </div>
        </div>

        {/* Col 3: Direct Studio Contact */}
        <div className="space-y-3.5 flex flex-col justify-start">
          <div className="h-8 flex items-center">
            <h4 className="font-serif-heading font-extrabold text-slate-950 text-sm tracking-wider uppercase">
              Direct Inquiries
            </h4>
          </div>
          <div className="flex items-center gap-2.5 text-xs text-slate-700">
            <Phone className="w-4 h-4 text-amber-700 shrink-0" />
            <span className="font-medium">+1 (212) 555-0198</span>
          </div>
          <div className="flex items-center gap-2.5 text-xs text-slate-700">
            <Mail className="w-4 h-4 text-amber-700 shrink-0" />
            <span className="font-medium">atelier@xyz.com</span>
          </div>
        </div>

        {/* Col 4: Booking Terms & Verification */}
        <div className="space-y-3.5 flex flex-col justify-start">
          <div className="h-8 flex items-center">
            <h4 className="font-serif-heading font-extrabold text-slate-950 text-sm tracking-wider uppercase">
              Client Guarantees
            </h4>
          </div>
          <ul className="text-xs space-y-1.5 text-slate-600 font-medium">
            <li>• Strict 18+ Valid Photo ID Policy</li>
            <li>• 100% Single-Use Sterile Cartridges</li>
            <li>• Vegan & Cruelty-Free Inks</li>
            <li>• Free Touch-up Within 6 Months</li>
            <li>• Private VIP Sanitized Booths</li>
          </ul>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="max-w-7xl mx-auto pt-8 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
        <div>
          © {new Date().getFullYear()} XYZ ATELIER. All rights reserved.
        </div>
        <div className="flex items-center gap-1 text-slate-500">
          <span>Crafted with passion for tattoo art</span>
          <Heart className="w-3.5 h-3.5 text-crimson-600 fill-crimson-600" />
        </div>
      </div>
    </footer>
  );
};

import React from 'react';
import { MapPin, Phone, MessageSquare, ExternalLink } from 'lucide-react';

interface LocateUsPageProps {
  onOpenBooking?: () => void;
}

export const LocateUsPage: React.FC<LocateUsPageProps> = () => {
  const googleMapsUrl = "https://maps.google.com/?q=XYZ";

  return (
    <div className="pt-28 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto animate-fade-in min-h-[85vh] flex items-center justify-center">
      {/* Main Studio Showcase Card */}
      <div className="w-full relative rounded-3xl overflow-hidden border border-slate-200 shadow-2xl bg-slate-950 min-h-[560px] flex items-center">
        {/* Background Image (User can replace with custom photo later) */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1598371839696-5c5bb00bdc28?auto=format&fit=crop&w=1000&q=65"
            alt="Studio Background"
            className="w-full h-full object-cover object-center filter grayscale brightness-50 contrast-125"
            loading="lazy"
            decoding="async"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950/95 via-slate-950/80 to-slate-950/60" />
        </div>

        {/* Inner Content Grid */}
        <div className="relative z-10 w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-center p-6 sm:p-12 lg:p-16">
          {/* Left Column: Text & Action Card */}
          <div className="lg:col-span-7 bg-white rounded-3xl p-8 sm:p-10 shadow-2xl border border-slate-100 max-w-xl space-y-6">
            <div>
              <h1 className="font-serif-heading font-extrabold text-3xl sm:text-4xl lg:text-5xl text-slate-950 leading-tight tracking-tight">
                Masters of Ink, <br />
                <span className="text-slate-900">Locate Our Studio</span>
              </h1>
            </div>

            <p className="text-slate-600 text-sm sm:text-base font-normal leading-relaxed">
              XYZ Atelier brings bespoke tattoo artistry to you with pure passion, precision, and heart. Come, experience tattooing that is personal, powerful, and inked with purpose, for YOU.
            </p>

            {/* Address snippet */}
            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-700 flex items-start gap-2.5">
              <MapPin className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
              <div>
                <span className="font-bold text-slate-900">XYZ Atelier</span>
                <div className="text-slate-600">XYZ</div>
              </div>
            </div>

            {/* CTA Buttons Row */}
            <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              {/* Primary Action Button: Locate Us on Maps */}
              <a
                href={googleMapsUrl}
                target="_blank"
                rel="noreferrer"
                className="px-6 py-4 rounded-xl bg-black hover:bg-slate-800 text-white font-extrabold text-sm tracking-wide shadow-xl active:scale-95 transition-all flex items-center justify-center gap-2.5 group"
              >
                <MapPin className="w-4 h-4 text-amber-400 group-hover:scale-110 transition-transform" />
                <span>Locate Us on Maps</span>
                <ExternalLink className="w-3.5 h-3.5 opacity-80" />
              </a>

              {/* Quick Contact Links */}
              <div className="flex flex-col gap-2 text-xs font-bold">
                <a
                  href="tel:+919876543210"
                  className="flex items-center gap-2 text-slate-900 hover:text-amber-700 transition-colors"
                >
                  <Phone className="w-3.5 h-3.5 text-slate-950" />
                  <span className="underline underline-offset-2">Book on Call</span>
                </a>
                <a
                  href="https://wa.me/919876543210?text=Hi%20XYZ!%20I%20would%20like%20to%20visit%20the%20studio%20and%20book%20an%20appointment."
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2 text-emerald-600 hover:text-emerald-700 transition-colors"
                >
                  <MessageSquare className="w-3.5 h-3.5 text-emerald-600" />
                  <span className="underline underline-offset-2">Book on WhatsApp</span>
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: 3D Map Pin Visual Graphic */}
          <div className="hidden lg:flex lg:col-span-5 items-center justify-center relative">
            <div className="relative w-80 h-96 flex items-center justify-center">
              {/* Glowing Aura Ring */}
              <div className="absolute w-72 h-72 rounded-full bg-amber-500/15 blur-3xl" />
              
              {/* 3D Map Pin Graphic Mockup */}
              <div className="relative z-10 flex flex-col items-center animate-bounce-slow">
                <div className="w-36 h-48 rounded-t-full rounded-b-[40%] bg-gradient-to-b from-slate-900 via-slate-800 to-black border-4 border-white/30 shadow-2xl flex items-center justify-center p-3">
                  <div className="w-24 h-24 rounded-full bg-white/10 backdrop-blur-md border border-white/30 flex items-center justify-center text-white">
                    <span className="font-serif-heading font-black text-4xl tracking-tighter text-amber-400">X</span>
                  </div>
                </div>
                {/* Pin Tip */}
                <div className="w-0 h-0 border-l-[18px] border-l-transparent border-r-[18px] border-r-transparent border-t-[28px] border-t-black -mt-1" />
                {/* Shadow Below Pin */}
                <div className="w-32 h-6 rounded-full bg-black/60 blur-md mt-4" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

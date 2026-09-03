import React, { useEffect, useRef } from 'react';
import { Calendar, ArrowRight } from 'lucide-react';

interface HeroProps {
  onOpenBooking: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenBooking }) => {
  const line1Ref = useRef<HTMLHeadingElement>(null);
  const line2Ref = useRef<HTMLSpanElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const buttonContainerRef = useRef<HTMLDivElement>(null);

  const TITLE_LINE1 = 'YOUR STORY,';
  const TITLE_LINE2 = 'ETCHED IN ART.';
  const SUBTITLE_TEXT =
    'We transform memories, ideas, and moments into tattoos that feel like they’ve always belonged on you. Thoughtfully designed. Meticulously tattooed. Entirely yours.';

  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const ease = 'cubic-bezier(.22,.61,.36,1)';

    // 1. Heading: Outline Fill Animation (starts strictly after Navbar completes)
    const line1Pieces = line1Ref.current ? Array.from(line1Ref.current.querySelectorAll<HTMLElement>('.otl-c')) : [];
    const line2Pieces = line2Ref.current ? Array.from(line2Ref.current.querySelectorAll<HTMLElement>('.otl-c')) : [];
    const allTitlePieces = [...line1Pieces, ...line2Pieces];

    const durOutline = 650;
    const staggerOutline = 24;
    const navBarWaitDelay = 700; // Wait for navbar blur slide-in to fully land

    if (reduce) {
      allTitlePieces.forEach((p) => {
        p.style.opacity = '1';
        p.style.color = '#0f172a';
        p.style.transform = 'none';
      });
      line2Pieces.forEach((p) => {
        p.style.color = '#b45309';
      });
    } else {
      line1Pieces.forEach((p, i) => {
        p.animate(
          [
            { opacity: 0, color: 'rgba(15, 23, 42, 0)', transform: 'translateY(14%)' },
            { opacity: 1, color: 'rgba(15, 23, 42, 0)', transform: 'translateY(0)', offset: 0.25 },
            { opacity: 1, color: 'rgba(15, 23, 42, 1)', transform: 'translateY(0)', offset: 1 },
          ],
          {
            duration: durOutline,
            delay: navBarWaitDelay + i * staggerOutline,
            easing: ease,
            fill: 'both',
          }
        );
      });

      const line2StartDelay = navBarWaitDelay + line1Pieces.length * staggerOutline + 60;
      line2Pieces.forEach((p, i) => {
        p.animate(
          [
            { opacity: 0, color: 'rgba(180, 83, 9, 0)', transform: 'translateY(14%)' },
            { opacity: 1, color: 'rgba(180, 83, 9, 0)', transform: 'translateY(0)', offset: 0.25 },
            { opacity: 1, color: 'rgba(180, 83, 9, 1)', transform: 'translateY(0)', offset: 1 },
          ],
          {
            duration: durOutline,
            delay: line2StartDelay + i * staggerOutline,
            easing: ease,
            fill: 'both',
          }
        );
      });
    }

    // 2. Subtitle: Slide Mask Animation (starts strictly after Title completes)
    const subtitleInners = subtitleRef.current
      ? Array.from(subtitleRef.current.querySelectorAll<HTMLElement>('.slm-i'))
      : [];

    const durSlide = 650;
    const staggerSlide = 18;
    const titleCompleteTime = navBarWaitDelay + (line1Pieces.length + line2Pieces.length) * staggerOutline + durOutline * 0.7;
    const subtitleStartDelay = reduce ? 0 : Math.round(titleCompleteTime + 100);

    if (reduce) {
      subtitleInners.forEach((p) => {
        p.style.opacity = '1';
        p.style.transform = 'none';
      });
    } else {
      subtitleInners.forEach((p, i) => {
        p.animate(
          [
            { opacity: 0, transform: 'translateY(115%)' },
            { opacity: 1, transform: 'translateY(0)' },
          ],
          {
            duration: durSlide,
            delay: subtitleStartDelay + i * staggerSlide,
            easing: ease,
            fill: 'both',
          }
        );
      });
    }

    // 3. Button: Expand In Animation (starts strictly after Subtitle completes)
    const btnEl = buttonContainerRef.current;
    const durExpand = 900;
    const subtitleCompleteTime = subtitleStartDelay + subtitleInners.length * staggerSlide + durSlide * 0.7;
    const btnStartDelay = reduce ? 0 : Math.round(subtitleCompleteTime + 100);

    if (btnEl) {
      if (reduce) {
        btnEl.style.opacity = '1';
        btnEl.style.filter = 'none';
        btnEl.style.transform = 'none';
      } else {
        btnEl.animate(
          [
            { opacity: 0, letterSpacing: '0.35em', filter: 'blur(14px)', transform: 'scale(0.92)' },
            { opacity: 1, letterSpacing: '0em', filter: 'blur(0px)', transform: 'scale(1)' },
          ],
          {
            duration: durExpand,
            delay: btnStartDelay,
            easing: ease,
            fill: 'both',
          }
        );
      }
    }
  }, []);

  // Split subtitle by words for smooth slide mask typography
  const subtitleWords = SUBTITLE_TEXT.split(' ');

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center pt-24 pb-12 px-4 sm:px-6 lg:px-8 overflow-hidden bg-white select-none">
      {/* Light Ambient Background with Subtle Layered Gradients */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-10 filter grayscale contrast-125 scale-105"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1598371839696-5c5bb00bdc28?auto=format&fit=crop&w=1200&q=65')`,
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-white via-white/90 to-white/95" />
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[350px] bg-amber-500/10 blur-[130px] rounded-full pointer-events-none" />
        <div className="absolute bottom-10 left-10 w-96 h-96 bg-slate-200/50 blur-[140px] rounded-full pointer-events-none" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto text-center flex flex-col items-center">
        {/* 1. Hero Title with Outline Fill Animation */}
        <h1 className="font-serif-heading font-extrabold text-4xl sm:text-6xl md:text-7xl tracking-tight leading-[1.1] mb-6 max-w-4xl select-none">
          {/* Line 1 */}
          <span ref={line1Ref} className="block text-slate-950">
            {Array.from(TITLE_LINE1).map((ch, idx) =>
              ch === ' ' ? (
                <span key={`sp1-${idx}`} className="inline-block w-[0.3em]">
                  &nbsp;
                </span>
              ) : (
                <span
                  key={`c1-${idx}`}
                  className="otl-c inline-block text-transparent opacity-0 will-change-transform"
                  style={{
                    WebkitTextStroke: '1.4px rgba(15, 23, 42, 0.85)',
                  }}
                >
                  {ch}
                </span>
              )
            )}
          </span>

          {/* Line 2 (Gold Gradient Accent) */}
          <span ref={line2Ref} className="block mt-1">
            {Array.from(TITLE_LINE2).map((ch, idx) =>
              ch === ' ' ? (
                <span key={`sp2-${idx}`} className="inline-block w-[0.3em]">
                  &nbsp;
                </span>
              ) : (
                <span
                  key={`c2-${idx}`}
                  className="otl-c inline-block text-transparent opacity-0 will-change-transform"
                  style={{
                    WebkitTextStroke: '1.4px rgba(180, 83, 9, 0.85)',
                  }}
                >
                  {ch}
                </span>
              )
            )}
          </span>
        </h1>

        {/* 2. Subtitle with Slide Mask Animation */}
        <p
          ref={subtitleRef}
          className="text-slate-600 text-base sm:text-xl max-w-2xl mx-auto font-normal leading-relaxed mb-10 select-none"
        >
          {subtitleWords.map((word, wIdx) => (
            <span key={`w-${wIdx}`} className="inline-block mr-[0.3em] overflow-hidden align-bottom py-0.5">
              <span className="slm-i inline-block opacity-0 will-change-transform">
                {word}
              </span>
            </span>
          ))}
        </p>

        {/* 3. Primary Action Button with Expand In Animation */}
        <div
          ref={buttonContainerRef}
          className="flex items-center justify-center w-full sm:w-auto opacity-0 will-change-transform"
        >
          <button
            type="button"
            onClick={onOpenBooking}
            className="glow-btn w-full sm:w-auto px-10 py-4 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 font-extrabold text-base tracking-wide shadow-xl shadow-amber-500/25 hover:shadow-amber-500/40 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-3 cursor-pointer"
          >
            <Calendar className="w-5 h-5 text-slate-950" />
            <span>Book Your Appointment</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
};

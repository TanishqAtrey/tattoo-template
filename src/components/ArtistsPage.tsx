import React, { useState, useRef, useEffect } from 'react';
import { ARTISTS } from '../data/mockData';
import { Artist, ArtistPortfolioItem } from '../types';
import {
  Sparkles,
  Calendar,
  Instagram,
  Award,
  ChevronLeft,
  ChevronRight,
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  MapPin,
  Clock,
  Layers,
} from 'lucide-react';

interface ArtistsPageProps {
  selectedArtistId?: string;
  onBookArtist: (artist: Artist) => void;
  onSelectPortfolioPiece?: (piece: ArtistPortfolioItem, artist: Artist) => void;
}

export const ArtistsPage: React.FC<ArtistsPageProps> = ({
  selectedArtistId,
  onBookArtist,
  onSelectPortfolioPiece,
}) => {
  const [activeArtistId, setActiveArtistId] = useState<string>(
    selectedArtistId || ARTISTS[0]?.id || 'artist-1'
  );

  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Sync if prop changes
  useEffect(() => {
    if (selectedArtistId) {
      setActiveArtistId(selectedArtistId);
    }
  }, [selectedArtistId]);

  const currentArtist = ARTISTS.find((a) => a.id === activeArtistId) || ARTISTS[0];

  const scrollPortfolio = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = 360;
      scrollContainerRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  const portfolioItems = currentArtist.portfolioItems || [];

  return (
    <div className="pt-28 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto animate-fade-in min-h-[85vh]">
      {/* Top Page Subtitle & Title */}
      <div className="text-center max-w-3xl mx-auto mb-10">
        <div className="inline-flex items-center gap-2 text-amber-700 text-xs uppercase tracking-widest font-bold mb-2">
          <Sparkles className="w-4 h-4" />
          <span>Resident Master Artisans</span>
        </div>
        <h1 className="font-serif-heading font-extrabold text-3xl sm:text-5xl text-slate-950 mb-3">
          MEET OUR ARTISTS
        </h1>
        <p className="text-slate-600 text-sm sm:text-base font-normal leading-relaxed">
          Select an artist below to discover their artistic philosophy, specialized techniques, and full tattoo portfolio gallery.
        </p>
      </div>

      {/* Artist Switcher Tabs */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 mb-12">
        {ARTISTS.map((artist) => {
          const isSelected = artist.id === currentArtist.id;
          return (
            <button
              key={artist.id}
              type="button"
              onClick={() => {
                setActiveArtistId(artist.id);
                if (scrollContainerRef.current) {
                  scrollContainerRef.current.scrollTo({ left: 0, behavior: 'smooth' });
                }
              }}
              className={`p-4 rounded-2xl border text-left transition-all flex items-center gap-3.5 ${
                isSelected
                  ? 'bg-amber-50/70 border-amber-500 shadow-md ring-2 ring-amber-500/30'
                  : 'bg-white border-slate-200 hover:border-slate-350 hover:bg-slate-50 shadow-sm'
              }`}
            >
              <img
                src={artist.avatarUrl}
                alt={artist.name}
                className="w-12 h-12 rounded-full object-cover border border-slate-200 shadow-sm"
              />
              <div className="min-w-0 flex-1">
                <div className="font-bold text-sm text-slate-950 truncate flex items-center justify-between">
                  <span>{artist.name}</span>
                  {isSelected && (
                    <span className="w-2 h-2 rounded-full bg-amber-600 shrink-0" />
                  )}
                </div>
                <div className="text-xs text-amber-800 font-medium truncate mt-0.5">
                  {artist.role}
                </div>
                <div className="text-[11px] text-slate-500 truncate">
                  {artist.yearsExperience}+ Years Experience
                </div>
              </div>
            </button>
          );
        })}
      </div>

      {/* Selected Artist Details Container */}
      <div className="space-y-12">
        {/* 1. Artist Intro & About Card */}
        <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-10 shadow-md">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left: Avatar Showcase */}
            <div className="lg:col-span-4 flex flex-col items-center sm:items-start text-center sm:text-left">
              <div className="relative w-48 sm:w-56 aspect-square rounded-3xl overflow-hidden border border-slate-200 shadow-md mb-5 bg-slate-900">
                <img
                  src={currentArtist.avatarUrl}
                  alt={currentArtist.name}
                  className="w-full h-full object-cover filter grayscale contrast-110 hover:grayscale-0 transition-all duration-700"
                  loading="lazy"
                  decoding="async"
                />
                <div className="absolute top-3 right-3">
                  <span className="px-3 py-1 rounded-full text-xs font-bold bg-white/95 text-slate-900 border border-slate-200 shadow-sm flex items-center gap-1">
                    <Award className="w-3.5 h-3.5 text-amber-700" />
                    <span>{currentArtist.yearsExperience}+ Yrs</span>
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <a
                  href={currentArtist.instagramUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="p-2.5 rounded-xl bg-slate-100 border border-slate-200 text-slate-700 hover:text-amber-700 hover:border-amber-500 transition-colors shadow-sm flex items-center gap-2 text-xs font-semibold"
                >
                  <Instagram className="w-4 h-4" />
                  <span>{currentArtist.handle}</span>
                </a>
              </div>
            </div>

            {/* Right: Artist Intro + About Biography */}
            <div className="lg:col-span-8 space-y-6">
              <div>
                <div className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-700 uppercase tracking-widest mb-1.5">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>{currentArtist.role}</span>
                </div>
                <h2 className="font-serif-heading font-extrabold text-2xl sm:text-4xl text-slate-950 mb-2">
                  {currentArtist.name}
                </h2>
                <p className="text-slate-600 text-sm sm:text-base font-normal leading-relaxed">
                  {currentArtist.bio}
                </p>
              </div>

              {/* About Me In-Depth */}
              <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 space-y-3">
                <h3 className="font-serif-heading font-bold text-base text-slate-950 flex items-center gap-2">
                  <Layers className="w-4 h-4 text-amber-700" />
                  <span>About Me</span>
                </h3>
                <p className="text-slate-700 text-xs sm:text-sm font-normal leading-relaxed">
                  {currentArtist.fullAbout || currentArtist.bio}
                </p>
              </div>

              {/* Specialties Badges */}
              <div>
                <div className="text-xs font-bold uppercase tracking-wider text-slate-950 mb-2.5">
                  Artistic Specialties & Disciplines:
                </div>
                <div className="flex flex-wrap gap-2">
                  {currentArtist.specialties.map((spec: string) => (
                    <span
                      key={spec}
                      className="px-3 py-1.5 rounded-xl text-xs font-semibold bg-slate-100 text-slate-800 border border-slate-250"
                    >
                      {spec}
                    </span>
                  ))}
                </div>
              </div>

              {/* Primary Booking CTA */}
              <div className="pt-2 flex flex-wrap items-center gap-4">
                <button
                  type="button"
                  onClick={() => onBookArtist(currentArtist)}
                  className="glow-btn px-8 py-3.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 font-extrabold text-sm shadow-md shadow-amber-500/20 hover:from-amber-400 hover:to-amber-500 transition-all flex items-center gap-2"
                >
                  <Calendar className="w-4 h-4" />
                  <span>Book Session with {currentArtist.name.split(' ')[0]}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* 2. Scrollable Tattoo Portfolio ("My Tattoo Portfolio" - Clean Images Only) */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-xs uppercase tracking-widest text-amber-700 font-bold mb-1">
                Artist Showcase
              </div>
              <h2 className="font-serif-heading font-extrabold text-2xl sm:text-3xl text-slate-950">
                My Tattoo Portfolio
              </h2>
            </div>

            {/* Carousel Controls */}
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => scrollPortfolio('left')}
                className="p-3 rounded-xl bg-white border border-slate-200 hover:border-amber-500 text-slate-700 hover:text-slate-950 transition-all shadow-sm active:scale-95"
                aria-label="Previous Tattoo Piece"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                type="button"
                onClick={() => scrollPortfolio('right')}
                className="p-3 rounded-xl bg-white border border-slate-200 hover:border-amber-500 text-slate-700 hover:text-slate-950 transition-all shadow-sm active:scale-95"
                aria-label="Next Tattoo Piece"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Horizontal Scroll Track - Pure Tattoo Images */}
          <div
            ref={scrollContainerRef}
            className="flex gap-5 overflow-x-auto pb-6 pt-2 scroll-smooth select-none snap-x snap-mandatory"
          >
            {portfolioItems.map((piece: ArtistPortfolioItem) => (
              <div
                key={piece.id}
                className="group relative flex-shrink-0 w-64 sm:w-72 aspect-[3/4] rounded-3xl overflow-hidden border border-slate-200 hover:border-amber-500 cursor-pointer snap-start transition-all duration-300 hover:-translate-y-1.5 hover:shadow-2xl shadow-md bg-slate-100"
                onClick={() => {
                  if (onSelectPortfolioPiece) {
                    onSelectPortfolioPiece(piece, currentArtist);
                  } else {
                    onBookArtist(currentArtist);
                  }
                }}
              >
                {/* Pure Tattoo Image */}
                <img
                  src={piece.imageUrl}
                  alt={piece.title}
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
                  loading="lazy"
                  decoding="async"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

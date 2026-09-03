import React from 'react';
import { ARTISTS } from '../data/mockData';
import { Artist } from '../types';
import { Sparkles, Calendar, Instagram, Award, Shield, ArrowRight } from 'lucide-react';

interface ArtistsSectionProps {
  onSelectArtist: (artist: Artist) => void;
  onViewArtist?: (artist: Artist) => void;
}

export const ArtistsSection: React.FC<ArtistsSectionProps> = ({ onSelectArtist, onViewArtist }) => {
  const handleClickArtist = (artist: Artist) => {
    if (onViewArtist) {
      onViewArtist(artist);
    } else {
      onSelectArtist(artist);
    }
  };

  return (
    <section id="artists" className="min-h-screen flex flex-col justify-center py-12 sm:py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Section Header */}
      <div className="text-center mb-10">
        <div className="inline-flex items-center gap-2 text-amber-700 text-xs uppercase tracking-widest font-bold mb-2">
          <Sparkles className="w-4 h-4" />
          <span>Resident Masters</span>
        </div>
        <h2 className="font-serif-heading font-extrabold text-3xl sm:text-4xl text-slate-950 mb-4">
          MEET OUR TATTOO ARTISTS
        </h2>
        <p className="text-slate-600 max-w-2xl mx-auto text-sm sm:text-base font-normal">
          World-renowned resident specialists with distinct artistic lineages, technical mastery, and gentle bedside manner. Click on any artist to explore their portfolio and biography.
        </p>
      </div>

      {/* Artists Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {ARTISTS.map((artist) => (
          <div
            key={artist.id}
            onClick={() => handleClickArtist(artist)}
            className="group bg-white rounded-2xl overflow-hidden border border-slate-200 hover:border-amber-500 flex flex-col justify-between shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer select-none"
          >
            {/* Artist Avatar Banner */}
            <div className="relative aspect-[4/3] overflow-hidden bg-slate-900">
              <img
                src={artist.avatarUrl}
                alt={artist.name}
                className="w-full h-full object-cover object-center filter grayscale contrast-110 group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
                loading="lazy"
                decoding="async"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
              
              {/* Experience Badge */}
              <div className="absolute top-4 right-4">
                <span className="px-3 py-1 rounded-full text-xs font-bold bg-white/95 text-slate-900 border border-slate-200 backdrop-blur-md flex items-center gap-1.5 shadow-sm">
                  <Award className="w-3.5 h-3.5 text-amber-700" />
                  <span>{artist.yearsExperience}+ Years Exp</span>
                </span>
              </div>
            </div>

            {/* Content Details */}
            <div className="p-6 flex flex-col justify-between flex-grow">
              <div>
                <div className="flex items-center justify-between mb-1">
                  <h3 className="font-serif-heading font-bold text-xl text-slate-950 group-hover:text-amber-700 transition-colors">
                    {artist.name}
                  </h3>
                  <a
                    href={artist.instagramUrl}
                    target="_blank"
                    rel="noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="text-slate-500 hover:text-amber-700 transition-colors p-1"
                  >
                    <Instagram className="w-4 h-4" />
                  </a>
                </div>
                <div className="text-xs text-amber-700 font-semibold mb-3">
                  {artist.role}
                </div>

                <p className="text-slate-600 text-xs sm:text-sm font-normal leading-relaxed mb-4">
                  {artist.bio}
                </p>

                {/* Specialties */}
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {artist.specialties.map((spec: string) => (
                    <span
                      key={spec}
                      className="px-2.5 py-1 rounded-md text-[11px] font-medium bg-slate-100 text-slate-800 border border-slate-250"
                    >
                      {spec}
                    </span>
                  ))}
                </div>
              </div>

              {/* View Portfolio Button */}
              <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-amber-800 group-hover:text-amber-600 transition-colors">
                <span>View Full Profile & Tattoo Portfolio</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

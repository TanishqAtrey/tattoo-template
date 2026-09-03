import React from 'react';
import { TATTOO_CATEGORIES } from '../data/mockData';
import { TattooCategory } from '../types';
import { Sparkles, ArrowLeft, Calendar, MapPin, ArrowRight } from 'lucide-react';

interface CategoriesPageProps {
  onBack?: () => void;
  onBookCategory: (category: TattooCategory) => void;
  initialSelectedCategoryId?: string;
}

export const CategoriesPage: React.FC<CategoriesPageProps> = ({
  onBookCategory,
}) => {
  return (
    <div className="pt-28 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto animate-fade-in min-h-[85vh]">
      {/* Page Header */}
      <div className="text-center max-w-3xl mx-auto mb-12">
        <div className="inline-flex items-center gap-2 text-amber-700 text-xs uppercase tracking-widest font-bold mb-2">
          <Sparkles className="w-4 h-4" />
          <span>Curated Style Archives</span>
        </div>
        <h1 className="font-serif-heading font-extrabold text-3xl sm:text-5xl text-slate-950 mb-4">
          EXPLORE TATTOO CATEGORIES
        </h1>
        <p className="text-slate-600 text-sm sm:text-base font-normal leading-relaxed">
          From sacred deities and micro-realism to intricate geometric mandalas and coverup transformations—discover our specialized tattoo disciplines engineered for permanent skin art.
        </p>
      </div>

      {/* Categories Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {TATTOO_CATEGORIES.map((category) => (
          <div
            key={category.id}
            className="bg-white rounded-3xl overflow-hidden border border-slate-200 hover:border-amber-500/80 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl shadow-sm group"
          >
            {/* Header Image */}
            <div className="relative aspect-[16/10] overflow-hidden bg-slate-900">
              <img
                src={category.imageUrl}
                alt={category.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 filter brightness-95 group-hover:brightness-105"
                loading="lazy"
                decoding="async"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/25 to-transparent opacity-80" />

              <div className="absolute top-4 left-4">
                <span className="px-3 py-1 rounded-full text-xs font-bold bg-white/95 text-slate-950 border border-slate-200 shadow-sm backdrop-blur-md">
                  {category.featuredCount}
                </span>
              </div>
            </div>

            {/* Content Area */}
            <div className="p-6 flex flex-col justify-between flex-grow space-y-4">
              <div>
                <h3 className="font-serif-heading font-bold text-xl text-slate-950 group-hover:text-amber-700 transition-colors mb-1">
                  {category.name}
                </h3>
                <div className="text-xs font-semibold text-amber-700 mb-3">
                  {category.tagline}
                </div>
                <p className="text-slate-600 text-xs sm:text-sm font-normal leading-relaxed mb-4">
                  {category.description}
                </p>

                {/* Popular Placements */}
                <div className="space-y-2 pt-3 border-t border-slate-200 text-xs">
                  <div className="flex items-center gap-1.5 text-slate-700 font-medium">
                    <MapPin className="w-3.5 h-3.5 text-amber-700 shrink-0" />
                    <span>Popular Placements:</span>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {category.popularPlacements.map((place: string) => (
                      <span
                        key={place}
                        className="px-2.5 py-1 rounded-md text-[11px] bg-slate-100 text-slate-800 border border-slate-250 font-medium"
                      >
                        {place}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <div className="pt-4 border-t border-slate-200">
                <button
                  type="button"
                  onClick={() => onBookCategory(category)}
                  className="glow-btn w-full py-3 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 font-bold text-xs sm:text-sm shadow-md shadow-amber-500/20 hover:from-amber-400 hover:to-amber-500 transition-all flex items-center justify-center gap-2"
                >
                  <Calendar className="w-4 h-4" />
                  <span>Book Concept in {category.name.replace(' Tattoos', '')}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

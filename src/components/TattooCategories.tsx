import React, { useRef } from 'react';
import { TATTOO_CATEGORIES } from '../data/mockData';
import { Sparkles, ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { TattooCategory } from '../types';

interface TattooCategoriesProps {
  onExploreCategories: (categoryId?: string) => void;
  onOpenBooking: () => void;
}

export const TattooCategories: React.FC<TattooCategoriesProps> = ({
  onExploreCategories,
  onOpenBooking,
}) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = 360;
      scrollContainerRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  return (
    <section
      id="categories"
      className="min-h-screen flex flex-col justify-center py-12 sm:py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto select-none"
    >
      {/* 1. Intro Section About Tattoos */}
      <div className="mb-8 max-w-3xl">
        <div className="inline-flex items-center gap-2 text-amber-700 text-xs uppercase tracking-widest font-bold mb-2">
          <Sparkles className="w-4 h-4" />
          <span>Curated Disciplines</span>
        </div>
        <h2 className="font-serif-heading font-extrabold text-2xl sm:text-4xl text-slate-950 mb-3 leading-tight">
          Art Which Resonates with Your Heart
        </h2>
        <p className="text-slate-600 text-xs sm:text-base font-normal leading-relaxed">
          Tattooing is not merely ink on skin — it is a permanent expression of your memories, individuality, and personal passion. Explore our signature categories crafted to help you discover the exact artistic aesthetic for your next piece.
        </p>
      </div>

      {/* 2. Section Header & Carousel Arrows */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <div className="text-xs sm:text-sm uppercase tracking-widest text-amber-700 font-bold mb-1 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-amber-700" />
            <span>Browse by Category</span>
          </div>
          <h3 className="font-serif-heading font-extrabold text-xl sm:text-3xl lg:text-4xl text-slate-950 tracking-tight">
            EXPLORE OUR TATTOO CATEGORIES
          </h3>
        </div>

        {/* Carousel Arrow Buttons */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => scroll('left')}
            className="p-3 rounded-2xl bg-white border border-slate-250 hover:border-amber-500 text-slate-700 hover:text-slate-950 transition-all shadow-sm hover:shadow-md active:scale-95 cursor-pointer"
            aria-label="Previous Category"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            type="button"
            onClick={() => scroll('right')}
            className="p-3 rounded-2xl bg-white border border-slate-250 hover:border-amber-500 text-slate-700 hover:text-slate-950 transition-all shadow-sm hover:shadow-md active:scale-95 cursor-pointer"
            aria-label="Next Category"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* 3. Large Horizontal Scrollable Categories Track */}
      <div
        ref={scrollContainerRef}
        className="flex gap-6 overflow-x-auto pb-6 pt-2 scroll-smooth select-none snap-x snap-mandatory"
      >
        {TATTOO_CATEGORIES.map((category: TattooCategory) => (
          <div
            key={category.id}
            onClick={() => onExploreCategories(category.id)}
            className="group relative flex-shrink-0 w-72 sm:w-80 md:w-[340px] aspect-[3/4] rounded-3xl overflow-hidden border border-slate-200 hover:border-amber-500 cursor-pointer snap-start transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl shadow-lg bg-slate-900"
          >
            {/* Image Background */}
            <img
              src={category.imageUrl}
              alt={category.name}
              className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 filter brightness-95 group-hover:brightness-105"
              loading="lazy"
              decoding="async"
            />

            {/* Layered Gradient Shadow */}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/95 via-slate-950/35 to-transparent opacity-85 group-hover:opacity-95 transition-opacity" />

            {/* Top Tag / Concepts Count */}
            <div className="absolute top-4 left-4">
              <span className="px-3.5 py-1.5 rounded-full text-xs font-bold bg-white/95 text-slate-950 border border-slate-200 shadow-sm backdrop-blur-md">
                {category.featuredCount}
              </span>
            </div>

            {/* Bottom Label & Hover Info */}
            <div className="absolute bottom-0 left-0 right-0 p-6 transform transition-all">
              <h4 className="font-serif-heading font-extrabold text-xl sm:text-2xl text-white group-hover:text-amber-300 transition-colors leading-snug">
                {category.name}
              </h4>

              <p className="text-xs sm:text-sm text-slate-200 line-clamp-2 font-normal mt-1.5 opacity-90 group-hover:opacity-100">
                {category.tagline}
              </p>

              <div className="mt-3.5 flex items-center gap-2 text-xs font-bold text-amber-300 opacity-90 group-hover:opacity-100 transition-opacity">
                <span>View Concept Gallery</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

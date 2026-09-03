import React, { useState, useEffect } from 'react';
import { Navbar, AppView } from './components/Navbar';
import { Hero } from './components/Hero';
import { TattooCategories } from './components/TattooCategories';
import { CategoriesPage } from './components/CategoriesPage';
import { ArtistsSection } from './components/ArtistsSection';
import { AftercarePage } from './components/AftercarePage';
import { FAQPage } from './components/FAQPage';
import { LocateUsPage } from './components/LocateUsPage';
import { Reviews } from './components/Reviews';
import { Footer } from './components/Footer';
import { BookingModal } from './components/BookingModal/BookingModal';
import { PiercingSection } from './components/PiercingSection';
import { ArtistsPage } from './components/ArtistsPage';
import { BlurPopReveal } from './components/BlurPopReveal';
import { PortfolioPiece, Artist, BookingRequest, TattooCategory, ArtistPortfolioItem } from './types';
import { Calendar } from 'lucide-react';

export function App() {
  const [currentView, setCurrentView] = useState<AppView>('home');
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [selectedPiece, setSelectedPiece] = useState<PortfolioPiece | null>(null);
  const [selectedArtist, setSelectedArtist] = useState<Artist | null>(null);
  const [activeProfileArtistId, setActiveProfileArtistId] = useState<string>('artist-1');

  // Parse view from URL hash
  const getViewFromHash = (): { view: AppView; sectionId?: string; artistId?: string } => {
    const hash = window.location.hash.replace('#', '');
    if (!hash || hash === 'home') return { view: 'home' };
    
    if (hash.startsWith('artists')) {
      const match = hash.match(/id=([^&]+)/);
      return { view: 'artists', artistId: match ? match[1] : undefined };
    }
    
    if (['categories', 'artists', 'aftercare', 'faq', 'locate'].includes(hash)) {
      return { view: hash as AppView };
    }
    
    // Check if section ID on homepage
    if (['categories', 'artists', 'piercing', 'reviews'].includes(hash)) {
      return { view: 'home', sectionId: hash };
    }
    
    return { view: 'home' };
  };

  // Sync state on PopState (browser Back / Forward buttons)
  useEffect(() => {
    const initial = getViewFromHash();
    setCurrentView(initial.view);
    if (initial.artistId) {
      setActiveProfileArtistId(initial.artistId);
    }
    window.history.replaceState(
      { view: initial.view, sectionId: initial.sectionId, artistId: initial.artistId },
      '',
      window.location.hash || '#'
    );

    const handlePopState = (event: PopStateEvent) => {
      if (event.state && event.state.view) {
        setCurrentView(event.state.view);
        if (event.state.artistId) {
          setActiveProfileArtistId(event.state.artistId);
        }
        if (event.state.view === 'home' && event.state.sectionId) {
          setTimeout(() => {
            const el = document.getElementById(event.state.sectionId);
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          }, 60);
        } else {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }
      } else {
        const parsed = getViewFromHash();
        setCurrentView(parsed.view);
        if (parsed.artistId) {
          setActiveProfileArtistId(parsed.artistId);
        }
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const handleNavigate = (view: AppView, sectionId?: string, artistId?: string) => {
    setCurrentView(view);
    if (artistId) {
      setActiveProfileArtistId(artistId);
    }

    const hash =
      view === 'home'
        ? (sectionId ? `#${sectionId}` : '#home')
        : (view === 'artists' && artistId ? `#artists?id=${artistId}` : `#${view}`);

    window.history.pushState({ view, sectionId, artistId }, '', hash);

    if (view === 'home' && sectionId) {
      setTimeout(() => {
        const el = document.getElementById(sectionId);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
        }
      }, 60);
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleOpenGeneralBooking = () => {
    setSelectedPiece(null);
    setSelectedArtist(null);
    setIsBookingOpen(true);
  };

  const handleBookCategory = (category: TattooCategory) => {
    setSelectedPiece({
      id: `cat-${category.id}`,
      title: `${category.name} Concept`,
      artistName: 'XYZ Master',
      style: 'fine-line',
      imageUrl: category.imageUrl,
      placement: category.popularPlacements[0] || 'Forearm',
      hoursTaken: '3-4 hrs',
      description: category.description,
      isFeatured: true,
    });
    setSelectedArtist(null);
    setIsBookingOpen(true);
  };

  const handleViewArtist = (artist: Artist) => {
    handleNavigate('artists', undefined, artist.id);
  };

  const handleSelectArtist = (artist: Artist) => {
    setSelectedArtist(artist);
    setSelectedPiece(null);
    setIsBookingOpen(true);
  };

  const handleSelectPortfolioPiece = (piece: ArtistPortfolioItem, artist: Artist) => {
    setSelectedPiece({
      id: piece.id,
      title: piece.title,
      artistName: artist.name,
      style: (piece.style.toLowerCase().includes('fine') ? 'fine-line' : 'custom') as any,
      imageUrl: piece.imageUrl,
      placement: piece.placement,
      hoursTaken: '3-5 hrs',
      description: `${piece.title} design in ${piece.style} technique customized for ${piece.placement}.`,
      isFeatured: true,
    });
    setSelectedArtist(artist);
    setIsBookingOpen(true);
  };

  const handleBookingSuccess = (_newBooking: BookingRequest) => {};

  return (
    <div className="min-h-screen bg-white text-slate-900 selection:bg-slate-900 selection:text-white flex flex-col justify-between">
      {/* Navigation Bar */}
      <Navbar
        currentView={currentView}
        onNavigate={handleNavigate}
        onOpenBooking={handleOpenGeneralBooking}
      />

      {/* Main Content Area */}
      <main className="flex-grow">
        {currentView === 'home' && (
          <div className="animate-fade-in">
            <Hero onOpenBooking={handleOpenGeneralBooking} />
            <BlurPopReveal>
              <TattooCategories
                onExploreCategories={() => handleNavigate('categories')}
                onOpenBooking={handleOpenGeneralBooking}
              />
            </BlurPopReveal>
            <BlurPopReveal>
              <PiercingSection onOpenBooking={handleOpenGeneralBooking} />
            </BlurPopReveal>
            <BlurPopReveal>
              <ArtistsSection
                onSelectArtist={handleSelectArtist}
                onViewArtist={handleViewArtist}
              />
            </BlurPopReveal>
            <BlurPopReveal>
              <Reviews />
            </BlurPopReveal>
          </div>
        )}

        {currentView === 'categories' && (
          <CategoriesPage
            onBack={() => handleNavigate('home')}
            onBookCategory={handleBookCategory}
          />
        )}

        {currentView === 'artists' && (
          <ArtistsPage
            selectedArtistId={activeProfileArtistId}
            onBookArtist={handleSelectArtist}
            onSelectPortfolioPiece={handleSelectPortfolioPiece}
          />
        )}

        {currentView === 'aftercare' && (
          <AftercarePage />
        )}

        {currentView === 'faq' && (
          <FAQPage onOpenBooking={handleOpenGeneralBooking} />
        )}

        {currentView === 'locate' && (
          <LocateUsPage onOpenBooking={handleOpenGeneralBooking} />
        )}
      </main>

      {/* Footer */}
      <BlurPopReveal>
        <Footer />
      </BlurPopReveal>

      {/* Booking Wizard Modal */}
      <BookingModal
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
        initialPiece={selectedPiece}
        initialArtist={selectedArtist}
        onBookingSuccess={handleBookingSuccess}
      />

      {/* Floating Action Button for Mobile Booking */}
      <div className="fixed bottom-5 right-5 z-30 sm:hidden">
        <button
          onClick={handleOpenGeneralBooking}
          className="glow-btn p-3.5 rounded-full bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 font-bold shadow-2xl shadow-amber-500/50 flex items-center gap-2 border border-amber-400"
          aria-label="Book Session"
        >
          <Calendar className="w-5 h-5" />
          <span className="text-xs font-extrabold pr-1">Book Session</span>
        </button>
      </div>
    </div>
  );
}

export default App;

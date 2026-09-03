export type TattooStyle =
  | 'fine-line'
  | 'blackwork'
  | 'micro-realism'
  | 'neo-traditional'
  | 'irezumi'
  | 'minimalist'
  | 'custom';

export type BodyPlacement =
  | 'forearm'
  | 'bicep'
  | 'shoulder'
  | 'chest'
  | 'ribs'
  | 'back'
  | 'thigh'
  | 'calf'
  | 'ankle'
  | 'wrist'
  | 'hand'
  | 'neck'
  | 'other';

export type AppointmentType =
  | 'custom-tattoo'
  | 'consultation'
  | 'touch-up';

export type BookingStatus =
  | 'pending'
  | 'confirmed'
  | 'completed'
  | 'cancelled'
  | 'rescheduled';

export interface BookingRequest {
  id: string;
  createdAt: string;
  clientName: string;
  clientEmail: string;
  clientPhone: string;
  clientInstagram?: string;
  appointmentType: AppointmentType;
  style: string;
  placement: BodyPlacement;
  placementNotes?: string;
  sizeInches: number;
  colorType: 'black_and_grey' | 'full_color' | 'accent_color';
  referenceImages: string[];
  customDescription: string;
  preferredDate: string;
  preferredTimeSlot: string;
  artistId: string;
  artistName: string;
  estimatedPriceMin: number;
  estimatedPriceMax: number;
  depositAmount: number;
  depositPaid: boolean;
  status: BookingStatus;
  adminNotes?: string;
  isOver18: boolean;
  medicalConsent: boolean;
  healthDeclarations?: string[];
}

export interface PortfolioPiece {
  id: string;
  title: string;
  artistName: string;
  style: TattooStyle;
  imageUrl: string;
  placement: string;
  hoursTaken: string;
  description: string;
  isFeatured: boolean;
}

export interface TattooCategory {
  id: string;
  name: string;
  tagline: string;
  description: string;
  imageUrl: string;
  popularPlacements: string[];
  styles: string[];
  featuredCount: string;
}

export interface ArtistPortfolioItem {
  id: string;
  title: string;
  imageUrl: string;
  placement: string;
  style: string;
}

export interface Artist {
  id: string;
  name: string;
  handle: string;
  role: string;
  bio: string;
  fullAbout?: string;
  avatarUrl: string;
  specialties: string[];
  hourlyRate: number;
  minBookingDeposit: number;
  yearsExperience: number;
  instagramUrl: string;
  isAvailable: boolean;
  portfolioItems?: ArtistPortfolioItem[];
}

export interface Testimonial {
  id: string;
  clientName: string;
  artistName: string;
  rating: number;
  date: string;
  comment: string;
  tattooPhoto?: string;
  placement: string;
  verifiedBooking: boolean;
}

export interface BookingWizardState {
  step: number;
  appointmentType: AppointmentType;
  style: string;
  placement: BodyPlacement;
  placementNotes: string;
  sizeInches: number;
  colorType: 'black_and_grey' | 'full_color' | 'accent_color';
  customDescription: string;
  referenceImages: string[];
  artistId: string;
  preferredDate: string;
  preferredTimeSlot: string;
  clientName: string;
  clientEmail: string;
  clientPhone: string;
  clientInstagram: string;
  isOver18: boolean;
  medicalConsent: boolean;
  healthDeclarations: string[];
}

import { BookingRequest } from '../types';
import { INITIAL_BOOKINGS } from '../data/mockData';

const BOOKINGS_KEY = 'xyz_bookings_v1';

export const getStoredBookings = (): BookingRequest[] => {
  try {
    const saved = localStorage.getItem(BOOKINGS_KEY);
    if (!saved) {
      localStorage.setItem(BOOKINGS_KEY, JSON.stringify(INITIAL_BOOKINGS));
      return INITIAL_BOOKINGS;
    }
    return JSON.parse(saved);
  } catch (e) {
    console.error('Error reading bookings from localStorage:', e);
    return INITIAL_BOOKINGS;
  }
};

export const saveBooking = (newBooking: BookingRequest): BookingRequest => {
  try {
    const existing = getStoredBookings();
    const updated = [newBooking, ...existing];
    localStorage.setItem(BOOKINGS_KEY, JSON.stringify(updated));
    return newBooking;
  } catch (e) {
    console.error('Error saving booking:', e);
    return newBooking;
  }
};

export const updateBookingStatus = (
  id: string,
  status: BookingRequest['status'],
  adminNotes?: string
): BookingRequest[] => {
  try {
    const existing = getStoredBookings();
    const updated = existing.map((b) => {
      if (b.id === id) {
        return {
          ...b,
          status,
          adminNotes: adminNotes !== undefined ? adminNotes : b.adminNotes,
        };
      }
      return b;
    });
    localStorage.setItem(BOOKINGS_KEY, JSON.stringify(updated));
    return updated;
  } catch (e) {
    console.error('Error updating booking:', e);
    return getStoredBookings();
  }
};

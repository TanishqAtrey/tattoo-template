import React, { useState, useEffect } from 'react';
import { BookingRequest, BookingStatus } from '../types';
import { getStoredBookings, updateBookingStatus } from '../lib/storage';
import { isSupabaseConfigured } from '../lib/supabase';
import {
  Shield,
  Calendar,
  Clock,
  User,
  Phone,
  Mail,
  Instagram,
  CheckCircle,
  XCircle,
  AlertCircle,
  DollarSign,
  Download,
  Filter,
  Search,
  Database,
  Eye,
  FileText,
  Save,
  X,
} from 'lucide-react';

interface AdminDashboardProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({ isOpen, onClose }) => {
  const [bookings, setBookings] = useState<BookingRequest[]>([]);
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeRefImage, setActiveRefImage] = useState<string | null>(null);
  const [editingNotesId, setEditingNotesId] = useState<string | null>(null);
  const [tempNotes, setTempNotes] = useState<string>('');

  useEffect(() => {
    if (isOpen) {
      setBookings(getStoredBookings());
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleStatusChange = (id: string, newStatus: BookingStatus) => {
    const updated = updateBookingStatus(id, newStatus);
    setBookings(updated);
  };

  const handleSaveNotes = (id: string) => {
    const updated = updateBookingStatus(id, bookings.find((b) => b.id === id)?.status || 'pending', tempNotes);
    setBookings(updated);
    setEditingNotesId(null);
  };

  const handleExportCsv = () => {
    const headers = ['Booking ID', 'Client Name', 'Email', 'Phone', 'Artist', 'Style', 'Placement', 'Date', 'Time Slot', 'Deposit ($)', 'Status'];
    const rows = bookings.map((b) => [
      b.id,
      `"${b.clientName}"`,
      b.clientEmail,
      b.clientPhone,
      `"${b.artistName}"`,
      b.style,
      b.placement,
      b.preferredDate,
      `"${b.preferredTimeSlot}"`,
      b.depositAmount,
      b.status,
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `XYZ-Bookings-${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Metrics
  const totalBookings = bookings.length;
  const pendingCount = bookings.filter((b) => b.status === 'pending').length;
  const confirmedCount = bookings.filter((b) => b.status === 'confirmed').length;
  const totalDeposits = bookings.reduce((sum, b) => sum + (b.depositPaid ? b.depositAmount : 0), 0);

  // Filtered list
  const filteredBookings = bookings.filter((b) => {
    const matchesStatus = statusFilter === 'all' || b.status === statusFilter;
    const matchesSearch =
      b.clientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.clientEmail.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.artistName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.id.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-900/60 backdrop-blur-md animate-fade-in overflow-y-auto">
      <div className="relative w-full max-w-6xl bg-white border border-slate-200 rounded-3xl shadow-2xl my-6 flex flex-col max-h-[92vh] overflow-hidden">
        {/* Top Header */}
        <div className="p-6 border-b border-slate-200 bg-slate-50 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-amber-500/15 text-amber-700 border border-amber-500/30">
              <Shield className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="font-serif-heading font-extrabold text-xl text-slate-950">
                  STUDIO ARTIST & BOOKING PORTAL
                </h2>
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-300">
                  Live Management
                </span>
              </div>
              <p className="text-xs text-slate-600">
                Review appointment inquiries, verify client reference artwork, and manage studio availability.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleExportCsv}
              className="px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 border border-slate-250 text-xs font-semibold flex items-center gap-2 transition-colors shadow-sm"
            >
              <Download className="w-3.5 h-3.5 text-amber-700" />
              <span>Export CSV</span>
            </button>

            <button
              onClick={onClose}
              className="p-2 rounded-full bg-slate-100 border border-slate-200 text-slate-600 hover:text-slate-950 hover:border-amber-500 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-6">
          {/* Analytics / Stats Bar */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 flex items-center gap-3 shadow-sm">
              <div className="p-3 rounded-xl bg-blue-50 text-blue-700 border border-blue-200">
                <Calendar className="w-5 h-5" />
              </div>
              <div>
                <div className="text-xs text-slate-500 font-medium">Total Inquiries</div>
                <div className="text-xl font-bold text-slate-950">{totalBookings}</div>
              </div>
            </div>

            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 flex items-center gap-3 shadow-sm">
              <div className="p-3 rounded-xl bg-amber-50 text-amber-700 border border-amber-200">
                <AlertCircle className="w-5 h-5" />
              </div>
              <div>
                <div className="text-xs text-slate-500 font-medium">Pending Review</div>
                <div className="text-xl font-bold text-amber-800">{pendingCount}</div>
              </div>
            </div>

            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 flex items-center gap-3 shadow-sm">
              <div className="p-3 rounded-xl bg-emerald-50 text-emerald-700 border border-emerald-200">
                <CheckCircle className="w-5 h-5" />
              </div>
              <div>
                <div className="text-xs text-slate-500 font-medium">Confirmed Slots</div>
                <div className="text-xl font-bold text-emerald-800">{confirmedCount}</div>
              </div>
            </div>

            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 flex items-center gap-3 shadow-sm">
              <div className="p-3 rounded-xl bg-amber-50 text-amber-700 border border-amber-200">
                <DollarSign className="w-5 h-5" />
              </div>
              <div>
                <div className="text-xs text-slate-500 font-medium">Deposit Revenue</div>
                <div className="text-xl font-bold text-amber-800">${totalDeposits}</div>
              </div>
            </div>
          </div>

          {/* Search & Filter Bar */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
            {/* Filter Tabs */}
            <div className="flex flex-wrap gap-1.5 p-1 rounded-xl bg-slate-100 border border-slate-200 w-full sm:w-auto">
              {[
                { id: 'all', label: 'All' },
                { id: 'pending', label: 'Pending Review' },
                { id: 'confirmed', label: 'Confirmed' },
                { id: 'completed', label: 'Completed' },
                { id: 'cancelled', label: 'Cancelled' },
              ].map((f) => (
                <button
                  key={f.id}
                  onClick={() => setStatusFilter(f.id)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                    statusFilter === f.id
                      ? 'bg-amber-500 text-slate-950 font-bold shadow-sm'
                      : 'text-slate-600 hover:text-slate-950'
                  }`}
                >
                  {f.label}
                </button>
              ))}
            </div>

            {/* Search Input */}
            <div className="relative w-full sm:w-64">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search by client, ID, artist..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-3 py-1.5 text-xs text-slate-900 focus:outline-none focus:border-amber-500"
              />
            </div>
          </div>

          {/* Bookings List */}
          <div className="space-y-4">
            {filteredBookings.length === 0 ? (
              <div className="p-12 text-center text-slate-500 text-sm bg-slate-50 rounded-2xl border border-slate-200">
                No appointment bookings found matching this filter.
              </div>
            ) : (
              filteredBookings.map((booking) => (
                <div
                  key={booking.id}
                  className="bg-white p-5 rounded-2xl border border-slate-200 hover:border-slate-300 shadow-sm space-y-4 transition-all"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-200">
                    <div className="flex items-center gap-3">
                      <span className="font-mono font-bold text-xs bg-slate-100 px-2.5 py-1 rounded-lg border border-slate-200 text-amber-800">
                        {booking.id}
                      </span>
                      <div>
                        <h4 className="font-bold text-slate-950 text-sm flex items-center gap-2">
                          <span>{booking.clientName}</span>
                          <span className="text-xs font-normal text-slate-500">
                            for {booking.artistName}
                          </span>
                        </h4>
                        <div className="text-[11px] text-slate-500 flex items-center gap-3 mt-0.5 font-medium">
                          <span className="flex items-center gap-1">
                            <Mail className="w-3 h-3 text-amber-700" />
                            {booking.clientEmail}
                          </span>
                          <span className="flex items-center gap-1">
                            <Phone className="w-3 h-3 text-amber-700" />
                            {booking.clientPhone}
                          </span>
                          {booking.clientInstagram && (
                            <span className="flex items-center gap-1 text-amber-800 font-semibold">
                              <Instagram className="w-3 h-3" />
                              {booking.clientInstagram}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Status Badge */}
                    <div className="flex items-center gap-2">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
                          booking.status === 'confirmed'
                            ? 'bg-emerald-50 text-emerald-800 border border-emerald-300'
                            : booking.status === 'pending'
                            ? 'bg-amber-50 text-amber-900 border border-amber-300'
                            : booking.status === 'completed'
                            ? 'bg-blue-50 text-blue-800 border border-blue-300'
                            : 'bg-rose-50 text-rose-800 border border-rose-300'
                        }`}
                      >
                        {booking.status}
                      </span>
                    </div>
                  </div>

                  {/* Booking Details Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
                    <div>
                      <span className="text-slate-500 block mb-0.5 font-medium">Scheduled Slot:</span>
                      <div className="font-semibold text-slate-950 flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5 text-amber-700" />
                        <span>{booking.preferredDate}</span>
                      </div>
                      <div className="text-slate-600 flex items-center gap-1.5 mt-0.5">
                        <Clock className="w-3.5 h-3.5 text-amber-700" />
                        <span>{booking.preferredTimeSlot}</span>
                      </div>
                    </div>

                    <div>
                      <span className="text-slate-500 block mb-0.5 font-medium">Tattoo Specs:</span>
                      <div className="font-semibold text-slate-950">
                        {booking.style} • {booking.placement} (~{booking.sizeInches}")
                      </div>
                      <div className="text-slate-600 mt-0.5">
                        Color: {booking.colorType.replace('_', ' ')}
                      </div>
                    </div>

                    <div>
                      <span className="text-slate-500 block mb-0.5 font-medium">Deposit & Financials:</span>
                      <div className="font-semibold text-amber-800">
                        ${booking.depositAmount} Deposit ({booking.depositPaid ? 'Paid' : 'Unpaid'})
                      </div>
                      <div className="text-slate-600 mt-0.5">
                        Est. Quote: ${booking.estimatedPriceMin} - ${booking.estimatedPriceMax}
                      </div>
                    </div>
                  </div>

                  {/* Concept Description & Attached References */}
                  {booking.customDescription && (
                    <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs">
                      <span className="text-slate-700 font-semibold block mb-0.5">Concept Notes:</span>
                      <p className="text-slate-600 font-normal leading-relaxed">{booking.customDescription}</p>
                    </div>
                  )}

                  {booking.referenceImages && booking.referenceImages.length > 0 && (
                    <div>
                      <span className="text-xs text-slate-600 font-medium block mb-1.5">Client Reference Images:</span>
                      <div className="flex gap-2 overflow-x-auto">
                        {booking.referenceImages.map((img, i) => (
                          <div
                            key={i}
                            onClick={() => setActiveRefImage(img)}
                            className="relative group w-14 h-14 rounded-xl overflow-hidden border border-slate-200 bg-slate-100 cursor-pointer shrink-0 shadow-sm"
                          >
                            <img src={img} alt="Ref" className="w-full h-full object-cover" />
                            <div className="absolute inset-0 bg-slate-900/50 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity text-white">
                              <Eye className="w-4 h-4" />
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Admin Notes Section */}
                  <div className="pt-2 border-t border-slate-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
                    {editingNotesId === booking.id ? (
                      <div className="flex gap-2 w-full sm:w-2/3">
                        <input
                          type="text"
                          value={tempNotes}
                          onChange={(e) => setTempNotes(e.target.value)}
                          placeholder="Add artist prep notes..."
                          className="flex-1 bg-slate-50 border border-slate-250 rounded-lg px-2.5 py-1 text-xs text-slate-900"
                        />
                        <button
                          onClick={() => handleSaveNotes(booking.id)}
                          className="px-3 py-1 bg-amber-500 text-slate-950 font-bold rounded-lg shadow-sm"
                        >
                          Save
                        </button>
                      </div>
                    ) : (
                      <div
                        onClick={() => {
                          setEditingNotesId(booking.id);
                          setTempNotes(booking.adminNotes || '');
                        }}
                        className="text-slate-600 hover:text-slate-950 cursor-pointer flex items-center gap-1.5 font-medium"
                      >
                        <FileText className="w-3.5 h-3.5 text-amber-700" />
                        <span>{booking.adminNotes || 'Click to add internal artist prep note...'}</span>
                      </div>
                    )}

                    {/* Quick Status Action Buttons */}
                    <div className="flex items-center gap-2">
                      {booking.status === 'pending' && (
                        <button
                          onClick={() => handleStatusChange(booking.id, 'confirmed')}
                          className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center gap-1 shadow-sm"
                        >
                          <CheckCircle className="w-3.5 h-3.5" />
                          <span>Approve</span>
                        </button>
                      )}

                      {booking.status === 'confirmed' && (
                        <button
                          onClick={() => handleStatusChange(booking.id, 'completed')}
                          className="px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs flex items-center gap-1 shadow-sm"
                        >
                          <CheckCircle className="w-3.5 h-3.5" />
                          <span>Mark Done</span>
                        </button>
                      )}

                      {booking.status !== 'cancelled' && (
                        <button
                          onClick={() => handleStatusChange(booking.id, 'cancelled')}
                          className="px-2.5 py-1.5 rounded-lg bg-slate-100 hover:bg-rose-50 text-slate-600 hover:text-rose-600 text-xs border border-slate-200"
                        >
                          Cancel
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Supabase Production Integration Information Box */}
          <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 text-xs text-slate-600 space-y-2">
            <div className="flex items-center gap-2 text-slate-950 font-bold">
              <Database className="w-4 h-4 text-amber-700" />
              <span>Production Database Status: {isSupabaseConfigured ? 'Connected to Supabase PostgreSQL' : 'Local Storage Mode (Ready for Production)'}</span>
            </div>
            <p className="leading-relaxed font-normal">
              All bookings are currently persisted in your browser's persistent state. To connect to your free Supabase PostgreSQL database and Stripe webhook, simply add your Supabase URL & Key in a <code className="text-amber-800 bg-slate-200 px-1 py-0.5 rounded font-semibold">.env.local</code> file!
            </p>
          </div>
        </div>
      </div>

      {/* Lightbox for Reference Image */}
      {activeRefImage && (
        <div className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md">
          <div className="relative max-w-2xl max-h-[85vh] bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-2xl">
            <button
              onClick={() => setActiveRefImage(null)}
              className="absolute top-3 right-3 p-1.5 rounded-full bg-slate-900/80 text-white hover:bg-slate-950"
            >
              <X className="w-5 h-5" />
            </button>
            <img src={activeRefImage} alt="Full Reference" className="max-w-full max-h-[80vh] object-contain" />
          </div>
        </div>
      )}
    </div>
  );
};

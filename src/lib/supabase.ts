import { createClient } from '@supabase/supabase-js';

// Environment variables can be configured in a .env.local file:
// VITE_SUPABASE_URL=https://your-project.supabase.co
// VITE_SUPABASE_ANON_KEY=your-anon-key

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

export const isSupabaseConfigured = Boolean(supabaseUrl && supabaseAnonKey);

export const supabase = isSupabaseConfigured
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

/**
 * SQL SCHEMA FOR SUPABASE (Optional - for production deployment):
 *
 * CREATE TABLE appointments (
 *   id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
 *   created_at TIMESTAMPTZ DEFAULT now(),
 *   client_name TEXT NOT NULL,
 *   client_email TEXT NOT NULL,
 *   client_phone TEXT NOT NULL,
 *   client_instagram TEXT,
 *   appointment_type TEXT NOT NULL,
 *   style TEXT NOT NULL,
 *   placement TEXT NOT NULL,
 *   size_inches INT,
 *   color_type TEXT,
 *   reference_images TEXT[],
 *   custom_description TEXT,
 *   preferred_date DATE NOT NULL,
 *   preferred_time_slot TEXT NOT NULL,
 *   artist_id TEXT NOT NULL,
 *   artist_name TEXT NOT NULL,
 *   estimated_price_min NUMERIC,
 *   estimated_price_max NUMERIC,
 *   deposit_amount NUMERIC NOT NULL,
 *   deposit_paid BOOLEAN DEFAULT false,
 *   status TEXT DEFAULT 'pending',
 *   admin_notes TEXT,
 *   is_over_18 BOOLEAN DEFAULT true,
 *   medical_consent BOOLEAN DEFAULT true
 * );
 */

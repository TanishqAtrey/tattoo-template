# 🖤 OBSIDIAN INK — Tattoo Studio & Direct Appointment Booking System

A dark, high-converting web application for tattoo artists and studios. Customers can browse portfolios, estimate pricing, customize tattoo concepts, upload reference sketches, and book appointments directly with real-time slot selection, body placement guides, and deposit confirmations.

---

## ✨ Key Features

1. **Direct Multi-Step Booking Wizard**:
   - **Step 1: Project Type & Style**: Custom Concept vs. Ready-to-Ink Flash piece vs. Consultation.
   - **Step 2: Placement & Size**: Visual body selector (Forearm, Ribs, Thigh, Back, etc.) and size slider (inches/cm) with pain index ratings.
   - **Step 3: Reference & Description**: Idea description and reference image uploader with preview thumbnails.
   - **Step 4: Schedule**: Resident artist selection, date picker, and time slot selection.
   - **Step 5: Client Details & Consent**: Contact info, age verification (18+), and medical safety checklist.
   - **Step 6: Review & Deposit Quote**: Estimated price breakdown, deposit calculation, celebration confetti, and 1-click Google Calendar / iCal export.

2. **Interactive Tattoo Price & Pain Estimator**:
   - Live interactive calculator that updates pricing, session hours, and pain levels in real time as the client tweaks size, placement, and shading complexity.

3. **Exclusive Flash Drop Collection**:
   - Limited edition pre-drawn flash pieces that clients can claim immediately with an instant deposit.

4. **Curated Portfolio & Lightbox**:
   - Filterable categories (Fine Line, Irezumi, Blackwork, Micro-Realism, Neo-Traditional) with high-res lightbox details and "Book Similar Piece" direct action.

5. **Studio Artist & Admin Portal**:
   - Click **"Artist Portal"** in the top navigation bar to view all incoming appointment requests, approve/reject/reschedule bookings, review client reference photos, add internal artist prep notes, and export bookings as CSV.

6. **Aftercare Guide & Studio FAQ**:
   - Comprehensive day-by-day healing timeline (Day 1-3, Day 4-14, Long term) and collapsible FAQ.

---

## 🚀 Quick Start (Development)

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Start the local dev server**:
   ```bash
   npm run dev
   ```
   Open [http://localhost:5173](http://localhost:5173) in your browser.

3. **Build for production**:
   ```bash
   npm run build
   ```

---

## 💳 Production Database & Stripe Setup (Optional)

The application runs seamlessly out-of-the-box using local storage persistence. For production deployment with live database and payment processing:

### 1. Free Supabase PostgreSQL Database ($0/month)
Create a free project at [supabase.com](https://supabase.com) and create a `.env.local` file:
```env
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-public-key
```

Run the SQL table creation script provided in `src/lib/supabase.ts`.

### 2. Free Hosting Deployment ($0/month)
- Deploy to **Vercel**, **Netlify**, or **Cloudflare Pages** by connecting your GitHub repository.

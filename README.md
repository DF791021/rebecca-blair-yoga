rebecca-blair-yoga

# Rebecca Blair Yoga Website

A beautiful, professional yoga instructor website for Rebecca Blair, based in Madison, Wisconsin.

## Features

- 🧘‍♀️ Elegant, responsive design showcasing yoga practice
- 📅 Class booking system with real-time availability
- 📧 Contact form with database storage
- 🖼️ Interactive photo gallery
- 📱 Mobile-optimized experience
- 🗄️ Supabase backend integration

## Setup

1. **Environment Variables:**
   Create a `.env` file in the root directory:
   ```
   VITE_SUPABASE_URL=https://your-project-ref.supabase.co
   VITE_SUPABASE_ANON_KEY=your-anon-key-here
   ```

2. **Database Setup:**
   - Go to your Supabase SQL Editor
   - Copy and paste the content from `supabase/migrations/create_rebecca_blair_yoga_tables.sql`
   - Run the migration to create the necessary tables

3. **Development:**
   ```bash
   npm install
   npm run dev
   ```

## Database Tables

- `contact_inquiries` - Stores contact form submissions
- `yoga_classes` - Manages class information and pricing
- `class_bookings` - Handles student bookings and scheduling

## Backend Integration

The website is integrated with Supabase for:
- Contact form submissions
- Class booking management
- User authentication (optional)
- Real-time data updates

## Customization

You can easily customize:
- Class offerings and pricing
- About section content
- Contact information
- Gallery photos
- Color scheme and styling
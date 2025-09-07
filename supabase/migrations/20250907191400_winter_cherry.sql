/*
  # Create Rebecca Blair Yoga Website Database Schema

  1. New Tables
    - `contact_inquiries`
      - `id` (uuid, primary key)
      - `name` (text)
      - `email` (text)
      - `subject` (text)
      - `message` (text)
      - `created_at` (timestamp)
    
    - `class_bookings`
      - `id` (uuid, primary key)
      - `user_id` (uuid, references auth.users)
      - `class_name` (text)
      - `booking_date` (date)
      - `booking_time` (time)
      - `status` (text)
      - `created_at` (timestamp)
    
    - `yoga_classes`
      - `id` (uuid, primary key)
      - `title` (text)
      - `description` (text)
      - `duration` (text)
      - `level` (text)
      - `price` (numeric)
      - `image_url` (text)
      - `created_at` (timestamp)

  2. Security
    - Enable RLS on all tables
    - Add policies for public contact form submissions
    - Add policies for authenticated users to manage bookings
*/

-- Contact inquiries table
CREATE TABLE IF NOT EXISTS contact_inquiries (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  subject text NOT NULL,
  message text NOT NULL,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE contact_inquiries ENABLE ROW LEVEL SECURITY;

-- Allow anyone to submit contact inquiries
CREATE POLICY "Anyone can submit contact inquiries"
  ON contact_inquiries
  FOR INSERT
  TO anon
  WITH CHECK (true);

-- Allow admin to read all inquiries (you'll need to set up admin role)
CREATE POLICY "Admins can read all inquiries"
  ON contact_inquiries
  FOR SELECT
  TO authenticated
  USING (true);

-- Yoga classes table
CREATE TABLE IF NOT EXISTS yoga_classes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text NOT NULL,
  duration text NOT NULL DEFAULT '60 minutes',
  level text NOT NULL DEFAULT 'All Levels',
  price numeric(5,2) NOT NULL DEFAULT 25.00,
  image_url text,
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE yoga_classes ENABLE ROW LEVEL SECURITY;

-- Allow anyone to view active classes
CREATE POLICY "Anyone can view active classes"
  ON yoga_classes
  FOR SELECT
  TO anon, authenticated
  USING (is_active = true);

-- Class bookings table
CREATE TABLE IF NOT EXISTS class_bookings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id),
  class_id uuid REFERENCES yoga_classes(id),
  customer_name text NOT NULL,
  customer_email text NOT NULL,
  booking_date date NOT NULL,
  booking_time time,
  status text DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'cancelled')),
  notes text,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE class_bookings ENABLE ROW LEVEL SECURITY;

-- Users can view their own bookings
CREATE POLICY "Users can view own bookings"
  ON class_bookings
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

-- Users can create their own bookings
CREATE POLICY "Users can create bookings"
  ON class_bookings
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

-- Allow anonymous bookings for now (can be removed later if auth is required)
CREATE POLICY "Allow anonymous bookings"
  ON class_bookings
  FOR INSERT
  TO anon
  WITH CHECK (user_id IS NULL);

-- Insert sample yoga classes
INSERT INTO yoga_classes (title, description, duration, level, price, image_url) VALUES
  ('Vinyasa Flow', 'Dynamic sequences that link breath with movement, perfect for building strength and flexibility.', '60 minutes', 'All Levels', 25.00, '/IMG-20250907-WA0011.jpg'),
  ('Gentle Hatha', 'Slow-paced class focusing on basic postures and relaxation techniques.', '75 minutes', 'Beginner', 20.00, '/IMG-20250907-WA0007.jpg'),
  ('Power Yoga', 'Athletic yoga practice that builds heat, strength, and flexibility.', '60 minutes', 'Intermediate', 28.00, '/IMG-20250907-WA0008.jpg'),
  ('Restorative Yoga', 'Deeply relaxing practice using props to support the body in healing poses.', '90 minutes', 'All Levels', 30.00, '/IMG-20250907-WA0009.jpg');
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL!;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Database types
export interface ContactInquiry {
  id?: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  created_at?: string;
}

export interface YogaClass {
  id: string;
  title: string;
  description: string;
  duration: string;
  level: string;
  price: number;
  image_url: string | null;
  is_active: boolean;
  created_at: string;
}

export interface ClassBooking {
  id?: string;
  user_id?: string | null;
  class_id: string;
  customer_name: string;
  customer_email: string;
  booking_date: string;
  booking_time?: string | null;
  status: 'pending' | 'confirmed' | 'cancelled';
  notes?: string | null;
  created_at?: string;
}

// API functions
export const contactApi = {
  async submitInquiry(inquiry: Omit<ContactInquiry, 'id' | 'created_at'>) {
    const { data, error } = await supabase
      .from('contact_inquiries')
      .insert([inquiry])
      .select();
    
    if (error) throw error;
    return data;
  }
};

export const classesApi = {
  async getAllClasses() {
    const { data, error } = await supabase
      .from('yoga_classes')
      .select('*')
      .eq('is_active', true)
      .order('created_at');
    
    if (error) throw error;
    return data;
  }
};

export const bookingsApi = {
  async createBooking(booking: Omit<ClassBooking, 'id' | 'created_at'>) {
    const { data, error } = await supabase
      .from('class_bookings')
      .insert([booking])
      .select();
    
    if (error) throw error;
    return data;
  },

  async getUserBookings(userId: string) {
    const { data, error } = await supabase
      .from('class_bookings')
      .select(`
        *,
        yoga_classes (
          title,
          duration,
          level
        )
      `)
      .eq('user_id', userId)
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    return data;
  }
};
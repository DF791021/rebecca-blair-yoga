import React from 'react';
import { X, Clock, User, Phone } from 'lucide-react';
import { bookingsApi, type ClassBooking, type YogaClass } from '../lib/supabase';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  yogaClass: YogaClass | null;
  onBookingComplete: (success: boolean, message: string) => void;
}

const BookingModal = ({ isOpen, onClose, yogaClass, onBookingComplete }: BookingModalProps) => {
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!yogaClass) return;

    setIsSubmitting(true);

    const formData = new FormData(e.currentTarget);
    const booking: Omit<ClassBooking, 'id' | 'created_at'> = {
      class_id: yogaClass.id,
      customer_name: formData.get('customerName') as string,
      customer_email: formData.get('customerEmail') as string,
      booking_date: formData.get('bookingDate') as string,
      booking_time: formData.get('bookingTime') as string || null,
      notes: formData.get('notes') as string || null,
      status: 'pending',
      user_id: null // Anonymous booking for now
    };

    try {
      await bookingsApi.createBooking(booking);
      onBookingComplete(true, 'Booking request submitted! I\'ll contact you soon to confirm.');
      onClose();
    } catch (error) {
      console.error('Error creating booking:', error);
      onBookingComplete(false, 'Sorry, there was an error with your booking. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen || !yogaClass) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-lg w-full max-h-[95vh] overflow-y-auto shadow-2xl">
        <div className="p-6 lg:p-8">
          {/* Header */}
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl lg:text-2xl font-light text-gray-900 pr-4">
              Book {yogaClass.title}
            </h3>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition-colors p-1"
            >
              <X size={24} />
            </button>
          </div>

          {/* Class Info */}
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-4 mb-6">
            <div className="flex items-center space-x-4 text-sm text-gray-600">
              <div className="flex items-center">
                <Clock className="w-4 h-4 mr-1" />
                {yogaClass.duration}
              </div>
              <div className="flex items-center">
                <User className="w-4 h-4 mr-1" />
                {yogaClass.level}
              </div>
              <div className="font-medium text-blue-600">
                ${yogaClass.price}
              </div>
            </div>
          </div>

          {/* Call Option */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-900 mb-1">Prefer to book by phone?</p>
                <p className="text-xs text-gray-600">Call for immediate scheduling and questions</p>
              </div>
              <a 
                href="tel:+16087209861" 
                className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
              >
                <Phone className="w-4 h-4" />
                <span>(608) 720-9861</span>
              </a>
            </div>
          </div>

          {/* Booking Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="customerName" className="block text-sm font-medium text-gray-700 mb-1">
                Your Name *
              </label>
              <input
                type="text"
                id="customerName"
                name="customerName"
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                placeholder="Enter your full name"
              />
            </div>

            <div>
              <label htmlFor="customerEmail" className="block text-sm font-medium text-gray-700 mb-1">
                Email Address *
              </label>
              <input
                type="email"
                id="customerEmail"
                name="customerEmail"
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                placeholder="your@email.com"
              />
            </div>

            <div>
              <label htmlFor="bookingDate" className="block text-sm font-medium text-gray-700 mb-1">
                Preferred Date *
              </label>
              <input
                type="date"
                id="bookingDate"
                name="bookingDate"
                required
                min={new Date().toISOString().split('T')[0]}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              />
            </div>

            <div>
              <label htmlFor="bookingTime" className="block text-sm font-medium text-gray-700 mb-1">
                Preferred Time
              </label>
              <input
                type="time"
                id="bookingTime"
                name="bookingTime"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              />
            </div>

            <div>
              <label htmlFor="notes" className="block text-sm font-medium text-gray-700 mb-1">
                Additional Notes
              </label>
              <textarea
                id="notes"
                name="notes"
                rows={3}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none transition-all"
                placeholder="Any specific requests, experience level, or questions you'd like me to know about..."
              ></textarea>
            </div>

            <div className="flex space-x-3 pt-4">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 px-4 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="flex-1 px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all disabled:opacity-50 font-medium transform hover:scale-105"
              >
                {isSubmitting ? 'Booking...' : 'Book Class'}
              </button>
            </div>
          </form>

          <p className="text-xs text-gray-500 mt-6 text-center leading-relaxed">
            Your booking request will be sent to Rebecca. She'll contact you within 24 hours to confirm availability, 
            discuss your needs, and arrange payment.
          </p>
        </div>
      </div>
    </div>
  );
};

export default BookingModal;
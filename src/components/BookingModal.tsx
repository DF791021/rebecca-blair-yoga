import React from 'react';
import { X, Calendar, Clock, User } from 'lucide-react';
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
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          {/* Header */}
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-2xl font-light text-gray-900">
              Book {yogaClass.title}
            </h3>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X size={24} />
            </button>
          </div>

          {/* Class Info */}
          <div className="bg-gray-50 rounded-lg p-4 mb-6">
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
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                placeholder="Any specific requests or questions..."
              ></textarea>
            </div>

            <div className="flex space-x-3 pt-4">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="flex-1 px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors disabled:opacity-50"
              >
                {isSubmitting ? 'Booking...' : 'Book Class'}
              </button>
            </div>
          </form>

          <p className="text-xs text-gray-500 mt-4 text-center">
            Your booking request will be sent to Rebecca. She'll contact you to confirm availability and payment.
          </p>
        </div>
      </div>
    </div>
  );
};

export default BookingModal;
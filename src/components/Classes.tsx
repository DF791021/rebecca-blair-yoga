import React from 'react';
import { Clock, Users, MapPin } from 'lucide-react';
import { classesApi, bookingsApi, type YogaClass, type ClassBooking } from '../lib/supabase';
import BookingModal from './BookingModal';

const Classes = () => {
  const [classes, setClasses] = React.useState<YogaClass[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [selectedClass, setSelectedClass] = React.useState<YogaClass | null>(null);
  const [showBookingModal, setShowBookingModal] = React.useState(false);
  const [bookingStatus, setBookingStatus] = React.useState<{
    type: 'success' | 'error' | null;
    message: string;
  }>({ type: null, message: '' });

  React.useEffect(() => {
    loadClasses();
  }, []);

  const loadClasses = async () => {
    try {
      const data = await classesApi.getAllClasses();
      setClasses(data || []);
    } catch (error) {
      console.error('Error loading classes:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleBookClass = (yogaClass: YogaClass) => {
    setSelectedClass(yogaClass);
    setShowBookingModal(true);
  };

  const handleBookingComplete = (success: boolean, message: string) => {
    setBookingStatus({
      type: success ? 'success' : 'error',
      message
    });
  };
  return (
    <section id="classes" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-light text-gray-900 mb-4">
            Classes & Offerings
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Discover the perfect class for your journey, from gentle beginnings to dynamic flows
          </p>
        </div>

        {bookingStatus.type && (
          <div className={`mb-8 p-4 rounded-lg max-w-2xl mx-auto ${
            bookingStatus.type === 'success' 
              ? 'bg-green-50 text-green-800 border border-green-200' 
              : 'bg-red-50 text-red-800 border border-red-200'
          }`}>
            {bookingStatus.message}
            <button 
              onClick={() => setBookingStatus({ type: null, message: '' })}
              className="ml-4 text-sm underline"
            >
              Dismiss
            </button>
          </div>
        )}

        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
            <p className="mt-4 text-gray-600">Loading classes...</p>
          </div>
        ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {classes.map((classItem, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-shadow duration-300"
            >
              <div className="aspect-w-16 aspect-h-9">
                <img
                  src={classItem.image_url || '/IMG-20250907-WA0011.jpg'}
                  alt={classItem.title}
                  className="w-full h-48 object-cover"
                />
              </div>
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-2xl font-light text-gray-900">
                    {classItem.title}
                  </h3>
                  <span className="text-2xl font-light text-blue-600">
                    ${classItem.price}
                  </span>
                </div>
                
                <p className="text-gray-600 mb-6 leading-relaxed">
                  {classItem.description}
                </p>
                
                <div className="flex justify-between items-center text-sm text-gray-500">
                  <div className="flex items-center">
                    <Clock className="w-4 h-4 mr-2" />
                    {classItem.duration}
                  </div>
                  <div className="flex items-center">
                    <Users className="w-4 h-4 mr-2" />
                    {classItem.level}
                  </div>
                </div>
                
                <button 
                  onClick={() => handleBookClass(classItem)}
                  className="w-full mt-6 bg-gray-900 text-white py-3 rounded-full hover:bg-gray-800 transition-colors duration-200 font-light"
                >
                  Book Class
                </button>
              </div>
            </div>
          ))}
        </div>
        )}

        <div className="mt-16 text-center">
          <div className="bg-gray-50 rounded-2xl p-8">
            <h3 className="text-2xl font-light text-gray-900 mb-4">
              Private Sessions
            </h3>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
              Experience personalized yoga instruction tailored to your specific needs, 
              goals, and schedule. Perfect for beginners, injury recovery, or deepening your practice.
            </p>
            <div className="flex items-center justify-center text-gray-500 mb-6">
              <MapPin className="w-5 h-5 mr-2" />
              <span>Available in-studio or at your location in Madison</span>
            </div>
            <button className="bg-blue-600 text-white px-8 py-3 rounded-full hover:bg-blue-700 transition-colors duration-200 font-light">
              Schedule Consultation
            </button>
          </div>
        </div>
      </div>

      <BookingModal
        isOpen={showBookingModal}
        onClose={() => setShowBookingModal(false)}
        yogaClass={selectedClass}
        onBookingComplete={handleBookingComplete}
      />
    </section>
  );
};

export default Classes;
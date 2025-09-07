import React from 'react';
import { Clock, Users, MapPin } from 'lucide-react';
import { classesApi, bookingsApi, type YogaClass, type ClassBooking } from '../lib/supabase';
import BookingModal from './BookingModal';

const Classes = () => {
  const [classes, setClasses] = React.useState<YogaClass[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [usingFallbackData, setUsingFallbackData] = React.useState(false);
  const [selectedClass, setSelectedClass] = React.useState<YogaClass | null>(null);
  const [showBookingModal, setShowBookingModal] = React.useState(false);
  const [bookingStatus, setBookingStatus] = React.useState<{
    type: 'success' | 'error' | null;
    message: string;
  }>({ type: null, message: '' });

  // Fallback classes data when Supabase is not configured
  const fallbackClasses: YogaClass[] = [
    {
      id: 'hatha-yoga',
      title: 'Hatha Yoga',
      description: 'A gentle introduction to the most basic yoga postures. Perfect for beginners or those seeking a slower-paced practice focused on breathing and mindful movement.',
      duration: '60 minutes',
      level: 'Beginner',
      price: 25,
      image_url: 'https://images.pexels.com/photos/3822864/pexels-photo-3822864.jpeg?auto=compress&cs=tinysrgb&w=800',
      is_active: true,
      created_at: new Date().toISOString()
    },
    {
      id: 'vinyasa-flow',
      title: 'Vinyasa Flow',
      description: 'Dynamic sequences that link breath with movement. Experience flowing transitions between poses in this energizing and creative practice.',
      duration: '75 minutes',
      level: 'Intermediate',
      price: 30,
      image_url: 'https://images.pexels.com/photos/3822621/pexels-photo-3822621.jpeg?auto=compress&cs=tinysrgb&w=800',
      is_active: true,
      created_at: new Date().toISOString()
    },
    {
      id: 'restorative-yoga',
      title: 'Restorative Yoga',
      description: 'A deeply relaxing practice using props to support the body in gentle poses. Perfect for stress relief, recovery, and finding inner peace.',
      duration: '90 minutes',
      level: 'All Levels',
      price: 35,
      image_url: 'https://images.pexels.com/photos/3822688/pexels-photo-3822688.jpeg?auto=compress&cs=tinysrgb&w=800',
      is_active: true,
      created_at: new Date().toISOString()
    },
    {
      id: 'power-yoga',
      title: 'Power Yoga',
      description: 'An athletic and vigorous form of yoga that builds strength, flexibility, and endurance. Challenge yourself with this dynamic practice.',
      duration: '60 minutes',
      level: 'Advanced',
      price: 32,
      image_url: 'https://images.pexels.com/photos/3822843/pexels-photo-3822843.jpeg?auto=compress&cs=tinysrgb&w=800',
      is_active: true,
      created_at: new Date().toISOString()
    }
  ];

  React.useEffect(() => {
    loadClasses();
  }, []);

  const loadClasses = async () => {
    try {
      const data = await classesApi.getAllClasses();
      setClasses(data || []);
      setUsingFallbackData(false);
    } catch (error) {
      console.error('Error loading classes:', error);
      // Use fallback data when API fails
      setClasses(fallbackClasses);
      setUsingFallbackData(true);
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
          {usingFallbackData && (
            <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg max-w-xl mx-auto">
              <p className="text-yellow-800 text-sm">
                🔧 Demo mode: Configure Supabase to enable booking functionality
              </p>
            </div>
          )}
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
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
    // Check if Supabase is properly configured
    const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
    const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';
    
    if (supabaseUrl.includes('your-project-url') || 
        supabaseKey.includes('your-anon-key') || 
        supabaseUrl.includes('placeholder') || 
        supabaseKey.includes('placeholder') ||
        !supabaseUrl.startsWith('https://')) {
      // Use fallback data immediately when Supabase is not configured
      console.log('Supabase not configured, using fallback data');
      setClasses(fallbackClasses);
      setUsingFallbackData(true);
      setLoading(false);
      return;
    }

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
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-2 gap-6 lg:gap-8">
          {classes.map((classItem, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
            >
              <div className="aspect-w-16 aspect-h-9">
                <img
                  src={classItem.image_url || '/IMG-20250907-WA0011.jpg'}
                  alt={classItem.title}
                  className="w-full h-48 sm:h-56 object-cover transition-transform duration-300 hover:scale-105"
                />
              </div>
              <div className="p-6 lg:p-8">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-xl lg:text-2xl font-light text-gray-900">
                    {classItem.title}
                  </h3>
                  <span className="text-xl lg:text-2xl font-medium text-blue-600 flex-shrink-0 ml-4">
                    ${classItem.price}
                  </span>
                </div>
                
                <p className="text-gray-600 mb-6 leading-relaxed text-sm lg:text-base">
                  {classItem.description}
                </p>
                
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 sm:gap-0 text-sm text-gray-500 mb-6">
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
                  className="w-full bg-blue-600 text-white py-3 lg:py-4 rounded-full hover:bg-blue-700 transition-all duration-200 font-medium transform hover:scale-105 hover:shadow-lg"
                >
                  Book Class
                </button>
              </div>
            </div>
          ))}
        </div>
        )}

        <div className="mt-16 lg:mt-20 text-center">
          <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl p-8 lg:p-12 shadow-lg">
            <h3 className="text-2xl lg:text-3xl font-light text-gray-900 mb-6">
              Private Sessions
            </h3>
            <p className="text-gray-600 mb-8 max-w-3xl mx-auto text-base lg:text-lg leading-relaxed">
              Experience personalized yoga instruction tailored to your unique needs, goals, and schedule. 
              Perfect for beginners, injury recovery, or those looking to deepen their practice in a supportive one-on-one environment.
            </p>
            <div className="flex items-center justify-center text-gray-600 mb-8 text-sm lg:text-base">
              <MapPin className="w-5 h-5 mr-2" />
              <span>Available in-studio or at your location throughout Madison</span>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <a 
                href="#contact" 
                className="bg-blue-600 text-white px-8 py-4 rounded-full hover:bg-blue-700 transition-all duration-200 font-medium transform hover:scale-105 hover:shadow-lg min-w-[200px]"
              >
                Schedule Consultation
              </a>
              <a 
                href="tel:+16087209861" 
                className="border-2 border-blue-600 text-blue-600 px-8 py-4 rounded-full hover:bg-blue-600 hover:text-white transition-all duration-200 font-medium transform hover:scale-105 hover:shadow-lg min-w-[200px]"
              >
                Call (608) 720-9861
              </a>
            </div>
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
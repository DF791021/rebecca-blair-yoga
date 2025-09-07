import React from 'react';
import { Heart, Sunrise, Users, Leaf, Mountain, Waves } from 'lucide-react';

const About = () => {
  return (
    <section id="about" className="py-20 bg-gradient-to-br from-gray-50 to-blue-50 relative overflow-hidden">
      {/* Background Animation */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 animate-float-slow">
          <Leaf className="w-24 h-24 text-green-500 transform rotate-12" />
        </div>
        <div className="absolute bottom-20 right-20 animate-float-slower">
          <Mountain className="w-32 h-32 text-blue-500" />
        </div>
        <div className="absolute top-1/2 right-1/4 animate-float">
          <Waves className="w-20 h-20 text-blue-400 transform -rotate-12" />
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Image */}
          <div className="relative group">
            <div className="aspect-w-4 aspect-h-5 rounded-2xl overflow-hidden shadow-2xl transform transition-all duration-700 group-hover:scale-105 group-hover:rotate-1">
              <img
                src="/IMG-20250907-WA0006.jpg"
                alt="Rebecca Blair"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            </div>
            {/* Decorative Elements */}
            <div className="absolute -top-6 -left-6 w-12 h-12 bg-white rounded-full shadow-lg animate-pulse-subtle"></div>
            <div className="absolute -bottom-6 -right-6 w-8 h-8 bg-blue-200 rounded-full animate-float"></div>
          </div>
          
          {/* Content */}
          <div className="space-y-8 animate-fade-in-up">
            <div className="transform transition-all duration-700 hover:translate-x-2">
              <h2 className="text-4xl font-light text-gray-900 mb-6 relative">
                Meet Rebecca
                <div className="absolute -bottom-2 left-0 w-20 h-1 bg-gradient-to-r from-blue-500 to-green-400 rounded-full transform origin-left transition-transform duration-500 hover:scale-x-150"></div>
              </h2>
              <div className="space-y-6 text-gray-600 leading-relaxed">
                <p className="transform transition-all duration-500 hover:text-gray-800">
                  Welcome to my sacred space of healing and transformation. I'm Rebecca Blair, a passionate yoga instructor and wellness guide, dedicated to helping souls reconnect with their inner light through the ancient practice of yoga.
                </p>
                <p className="transform transition-all duration-500 hover:text-gray-800">
                  My journey began over a decade ago when I discovered yoga during a challenging period in my life. What started as a search for physical healing quickly blossomed into a profound spiritual awakening that transformed every aspect of my being.
                </p>
                <p className="transform transition-all duration-500 hover:text-gray-800">
                  Drawing from various traditions including Hatha, Vinyasa, and Restorative yoga, I blend ancient wisdom with modern understanding to create experiences that nurture both body and soul. Each class is crafted as a journey of self-discovery.
                </p>
                <p className="transform transition-all duration-500 hover:text-gray-800">
                  Based in the beautiful heart of Madison, Wisconsin, I offer both intimate group sessions and personalized private instruction, creating a sanctuary where every practitioner feels seen, supported, and empowered.
                </p>
              </div>
            </div>
            
            {/* Certifications */}
            <div className="bg-white/50 backdrop-blur-sm rounded-xl p-6 transform transition-all duration-500 hover:bg-white/70 hover:scale-105">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Certifications & Training</h3>
              <div className="space-y-2 text-sm text-gray-600">
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mr-3 animate-pulse"></div>
                  200-Hour Registered Yoga Teacher (RYT-200)
                </div>
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-3 animate-pulse" style={{ animationDelay: '0.5s' }}></div>
                  Yin Yoga & Meditation Specialist
                </div>
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-purple-500 rounded-full mr-3 animate-pulse" style={{ animationDelay: '1s' }}></div>
                  Trauma-Informed Yoga Certification
                </div>
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-yellow-500 rounded-full mr-3 animate-pulse" style={{ animationDelay: '1.5s' }}></div>
                  Prenatal & Postnatal Yoga Training
                </div>
              </div>
            </div>
            
            {/* Values */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
              <div className="text-center group transform transition-all duration-500 hover:scale-110 hover:-translate-y-2">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-br from-blue-100 to-blue-200 rounded-full mb-4 group-hover:shadow-lg transition-all duration-300 group-hover:animate-pulse">
                  <Heart className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="font-medium text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">Mindful Practice</h3>
                <p className="text-sm text-gray-600">
                  Connecting breath with movement for deeper awareness and presence
                </p>
              </div>
              
              <div className="text-center group transform transition-all duration-500 hover:scale-110 hover:-translate-y-2" style={{ transitionDelay: '0.1s' }}>
                <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-br from-green-100 to-green-200 rounded-full mb-4 group-hover:shadow-lg transition-all duration-300 group-hover:animate-pulse">
                  <Sunrise className="w-6 h-6 text-green-600" />
                </div>
                <h3 className="font-medium text-gray-900 mb-2 group-hover:text-green-600 transition-colors">Natural Flow</h3>
                <p className="text-sm text-gray-600">
                  Embracing the rhythm of nature in our movement and breath
                </p>
              </div>
              
              <div className="text-center group transform transition-all duration-500 hover:scale-110 hover:-translate-y-2" style={{ transitionDelay: '0.2s' }}>
                <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-br from-purple-100 to-purple-200 rounded-full mb-4 group-hover:shadow-lg transition-all duration-300 group-hover:animate-pulse">
                  <Users className="w-6 h-6 text-purple-600" />
                </div>
                <h3 className="font-medium text-gray-900 mb-2 group-hover:text-purple-600 transition-colors">Sacred Community</h3>
                <p className="text-sm text-gray-600">
                  Building deep connections through shared intention and practice
                </p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Philosophy Section */}
        <div className="mt-20 text-center">
          <div className="max-w-4xl mx-auto">
            <h3 className="text-3xl font-light text-gray-900 mb-8 animate-fade-in-up">My Teaching Philosophy</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-8 transform transition-all duration-500 hover:scale-105 hover:bg-white/80">
                <h4 className="text-xl font-medium text-gray-900 mb-4">Yoga as Medicine</h4>
                <p className="text-gray-600 leading-relaxed">
                  I believe yoga is a powerful healing modality that works on all levels - physical, emotional, mental, and spiritual. Each practice is designed to restore balance and awaken your body's natural healing wisdom.
                </p>
              </div>
              <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-8 transform transition-all duration-500 hover:scale-105 hover:bg-white/80">
                <h4 className="text-xl font-medium text-gray-900 mb-4">Every Body Welcome</h4>
                <p className="text-gray-600 leading-relaxed">
                  Yoga is not about perfect poses or flexibility. It's about showing up authentically, honoring your body's needs, and finding peace within yourself exactly as you are in this moment.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
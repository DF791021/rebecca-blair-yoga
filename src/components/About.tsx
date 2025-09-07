import React from 'react';
import { Heart, Sunrise, Users } from 'lucide-react';

const About = () => {
  return (
    <section id="about" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Image */}
          <div className="relative">
            <div className="aspect-w-4 aspect-h-5 rounded-2xl overflow-hidden shadow-2xl">
              <img
                src="/IMG-20250907-WA0006.jpg"
                alt="Rebecca Blair"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
          
          {/* Content */}
          <div className="space-y-8">
            <div>
              <h2 className="text-4xl font-light text-gray-900 mb-6">
                Meet Rebecca
              </h2>
              <div className="space-y-4 text-gray-600 leading-relaxed">
                <p>
                  Welcome to my practice. I'm Rebecca Blair, a certified yoga instructor 
                  passionate about guiding others on their journey to wellness, mindfulness, 
                  and inner peace.
                </p>
                <p>
                  My approach to yoga is rooted in the belief that everyone deserves to feel 
                  strong, balanced, and connected to their true self. Whether you're a complete 
                  beginner or an experienced practitioner, I'm here to support you every step 
                  of the way.
                </p>
                <p>
                  Based in beautiful Madison, Wisconsin, I offer both group classes and private 
                  sessions, bringing the healing power of yoga to our vibrant community.
                </p>
              </div>
            </div>
            
            {/* Values */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-100 rounded-full mb-4">
                  <Heart className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="font-medium text-gray-900 mb-2">Mindful Practice</h3>
                <p className="text-sm text-gray-600">
                  Connecting breath with movement for deeper awareness
                </p>
              </div>
              
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-green-100 rounded-full mb-4">
                  <Sunrise className="w-6 h-6 text-green-600" />
                </div>
                <h3 className="font-medium text-gray-900 mb-2">Natural Flow</h3>
                <p className="text-sm text-gray-600">
                  Embracing the rhythm of nature in our practice
                </p>
              </div>
              
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-purple-100 rounded-full mb-4">
                  <Users className="w-6 h-6 text-purple-600" />
                </div>
                <h3 className="font-medium text-gray-900 mb-2">Community</h3>
                <p className="text-sm text-gray-600">
                  Building connections through shared practice
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
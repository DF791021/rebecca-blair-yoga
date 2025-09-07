import React from 'react';
import { ChevronDown } from 'lucide-react';

const Hero = () => {
  return (
    <section id="home" className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: 'url(/IMG-20250907-WA0010.jpg)',
        }}
      >
        <div className="absolute inset-0 bg-black/20"></div>
      </div>
      
      {/* Content */}
      <div className="relative z-10 text-center text-white px-4 sm:px-6 lg:px-8">
        <h1 className="text-5xl md:text-7xl font-light mb-6 tracking-wide">
          Rebecca Blair Yoga
        </h1>
        <p className="text-xl md:text-2xl font-light mb-8 max-w-2xl mx-auto leading-relaxed">
          Find your inner peace and strength through mindful movement in Madison, Wisconsin
        </p>
        <div className="space-x-4">
          <a
            href="#classes"
            className="inline-block bg-white text-gray-900 px-8 py-3 rounded-full font-light hover:bg-gray-100 transition-all duration-300 transform hover:scale-105"
          >
            View Classes
          </a>
          <a
            href="#about"
            className="inline-block border-2 border-white text-white px-8 py-3 rounded-full font-light hover:bg-white hover:text-gray-900 transition-all duration-300 transform hover:scale-105"
          >
            Learn More
          </a>
        </div>
      </div>
      
      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white animate-bounce">
        <ChevronDown size={32} />
      </div>
    </section>
  );
};

export default Hero;
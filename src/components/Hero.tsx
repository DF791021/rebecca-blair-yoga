import React from 'react';
import { ChevronDown, Lotus } from 'lucide-react';

const Hero = () => {
  return (
    <section id="home" className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-transform duration-[20s] ease-linear animate-slow-zoom"
        style={{
          backgroundImage: 'url(/IMG-20250907-WA0010.jpg)',
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-black/20 to-black/30 animate-pulse-subtle"></div>
      </div>
      
      {/* Floating Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 animate-float-slow">
          <Lotus className="w-8 h-8 text-white/20" />
        </div>
        <div className="absolute top-3/4 right-1/4 animate-float-slower">
          <Lotus className="w-6 h-6 text-white/15" />
        </div>
        <div className="absolute top-1/2 left-3/4 animate-float">
          <Lotus className="w-4 h-4 text-white/10" />
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 text-center text-white px-4 sm:px-6 lg:px-8 animate-fade-in-up">
        <div className="mb-4">
          <Lotus className="w-16 h-16 mx-auto text-white/80 animate-spin-slow" />
        </div>
        <h1 className="text-5xl md:text-7xl font-light mb-6 tracking-wide animate-slide-in-left">
          Rebecca Blair Yoga
        </h1>
        <p className="text-xl md:text-2xl font-light mb-8 max-w-2xl mx-auto leading-relaxed animate-slide-in-right">
          Find your inner peace and strength through mindful movement in Madison, Wisconsin
        </p>
        <div className="space-x-4 animate-fade-in-up-delayed">
          <a
            href="#classes"
            className="inline-block bg-white text-gray-900 px-8 py-3 rounded-full font-light hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 hover:shadow-lg animate-pulse-button"
          >
            View Classes
          </a>
          <a
            href="#about"
            className="inline-block border-2 border-white text-white px-8 py-3 rounded-full font-light hover:bg-white hover:text-gray-900 transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
          >
            Learn More
          </a>
        </div>
      </div>
      
      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white animate-bounce-slow">
        <ChevronDown size={32} />
        <div className="text-sm mt-2 opacity-75">Scroll to explore</div>
      </div>
    </section>
  );
};

export default Hero;
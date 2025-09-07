import React, { useState } from 'react';
import { X, Play, Pause } from 'lucide-react';

const Gallery = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  
  const images = [
    '/IMG-20250907-WA0005.jpg',
    '/IMG-20250907-WA0006.jpg',
    '/IMG-20250907-WA0007.jpg',
    '/IMG-20250907-WA0008.jpg',
    '/IMG-20250907-WA0009.jpg',
    '/IMG-20250907-WA0010.jpg',
    '/IMG-20250907-WA0011.jpg',
    '/IMG-20250907-WA0012.jpg'
  ];

  React.useEffect(() => {
    const scrollContainer = document.querySelector('.scroll-container');
    if (!scrollContainer) return;
    
    const scroll = () => {
      if (isPlaying) {
        scrollContainer.scrollLeft += 1;
        if (scrollContainer.scrollLeft >= scrollContainer.scrollWidth - scrollContainer.clientWidth) {
          scrollContainer.scrollLeft = 0;
        }
      }
    };

    const interval = setInterval(scroll, 30);
    return () => clearInterval(interval);
  }, [isPlaying]);

  return (
    <section id="gallery" className="py-20 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-20 w-32 h-32 bg-blue-500 rounded-full animate-float-slow"></div>
        <div className="absolute bottom-40 right-40 w-24 h-24 bg-green-400 rounded-full animate-float-slower"></div>
        <div className="absolute top-1/2 left-1/3 w-16 h-16 bg-purple-400 rounded-full animate-float"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 animate-fade-in-up">
          <h2 className="text-4xl font-light text-gray-900 mb-4 relative">
            Practice Gallery
            <div className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-gradient-to-r from-blue-500 via-green-400 to-purple-500 rounded-full"></div>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Moments of peace, strength, and connection captured in Madison's natural beauty
          </p>
        </div>

        {/* Auto-scrolling Gallery */}
        <div className="relative mb-12">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-6">
            <h3 className="text-xl lg:text-2xl font-light text-gray-800">Journey Through Practice</h3>
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="flex items-center space-x-2 px-4 py-3 bg-white shadow-lg rounded-full hover:shadow-xl transition-all duration-300 transform hover:scale-105 self-center sm:self-auto"
            >
              {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
              <span className="text-sm font-medium">{isPlaying ? 'Pause' : 'Play'}</span>
            </button>
          </div>
          
          <div className="scroll-container flex space-x-6 overflow-x-auto scrollbar-hide pb-4" style={{ scrollBehavior: 'auto' }}>
            {[...images, ...images, ...images].map((image, index) => (
              <div
                key={index}
                className="flex-shrink-0 w-64 sm:w-72 h-80 sm:h-96 rounded-2xl overflow-hidden cursor-pointer group relative transform transition-all duration-500 hover:scale-105 hover:shadow-2xl"
                onClick={() => setSelectedImage(image)}
              >
                <img
                  src={image}
                  alt={`Yoga practice ${index + 1}`}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="absolute bottom-4 left-4 right-4 text-white opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-4 group-hover:translate-y-0">
                  <p className="text-sm font-light">Click to view</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Static Gallery Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-6">
          {images.map((image, index) => (
            <div
              key={index}
              className="aspect-square rounded-2xl overflow-hidden cursor-pointer group relative transform transition-all duration-500 hover:scale-105 hover:shadow-2xl"
              onClick={() => setSelectedImage(image)}
              style={{ 
                animationDelay: `${index * 0.1}s`,
                animation: 'fadeInUp 0.6s ease-out forwards'
              }}
            >
              <img
                src={image}
                alt={`Yoga practice ${index + 1}`}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 hidden sm:flex">
                <div className="w-12 h-12 bg-white/90 rounded-full flex items-center justify-center transform scale-75 group-hover:scale-100 transition-transform duration-300">
                  <Play className="w-5 h-5 text-gray-800 ml-0.5" />
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* Inspirational Quote */}
        <div className="mt-20 text-center">
          <div className="max-w-4xl mx-auto bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-8 lg:p-12 transform transition-all duration-500 hover:scale-105 shadow-lg">
            <blockquote className="text-xl lg:text-2xl font-light text-gray-800 italic mb-6 leading-relaxed">
              "Yoga is not about touching your toes. It is about what you learn on the way down."
            </blockquote>
            <p className="text-gray-600 font-medium">— Judith Hanson Lasater</p>
          </div>
        </div>
      </div>

      {/* Modal */}
      {selectedImage && (
        <div className="fixed inset-0 bg-black bg-opacity-95 z-50 flex items-center justify-center p-4 animate-fade-in" onClick={() => setSelectedImage(null)}>
          <div className="relative max-w-4xl max-h-full">
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute -top-12 right-0 text-white hover:text-gray-300 transition-all duration-300 transform hover:scale-110 z-10"
            >
              <X size={32} />
            </button>
            <img
              src={selectedImage}
              alt="Selected yoga practice"
              className="max-w-full max-h-[90vh] object-contain rounded-lg shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            />
          </div>
        </div>
      )}
    </section>
  );
};


export default Gallery
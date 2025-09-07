import React, { useState } from 'react';
import { X } from 'lucide-react';

const Gallery = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  
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

  return (
    <section id="gallery" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-light text-gray-900 mb-4">
            Practice Gallery
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Moments of peace, strength, and connection captured in nature
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {images.map((image, index) => (
            <div
              key={index}
              className="aspect-square rounded-2xl overflow-hidden cursor-pointer group"
              onClick={() => setSelectedImage(image)}
            >
              <img
                src={image}
                alt={`Yoga practice ${index + 1}`}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Modal */}
      {selectedImage && (
        <div className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4">
          <div className="relative max-w-4xl max-h-full">
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute -top-10 right-0 text-white hover:text-gray-300 transition-colors"
            >
              <X size={32} />
            </button>
            <img
              src={selectedImage}
              alt="Selected yoga practice"
              className="max-w-full max-h-full object-contain rounded-lg"
            />
          </div>
        </div>
      )}
    </section>
  );
};

export default Gallery;
import React from 'react';
import { Heart } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-2xl font-light mb-4">Rebecca Blair Yoga</h3>
            <p className="text-gray-400 leading-relaxed">
              Guiding you on your journey to wellness, mindfulness, and inner peace 
              through the transformative practice of yoga.
            </p>
          </div>
          
          <div>
            <h4 className="text-lg font-medium mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <a href="#about" className="text-gray-400 hover:text-white transition-colors duration-200">
                  About Rebecca
                </a>
              </li>
              <li>
                <a href="#classes" className="text-gray-400 hover:text-white transition-colors duration-200">
                  Classes
                </a>
              </li>
              <li>
                <a href="#gallery" className="text-gray-400 hover:text-white transition-colors duration-200">
                  Gallery
                </a>
              </li>
              <li>
                <a href="#contact" className="text-gray-400 hover:text-white transition-colors duration-200">
                  Contact
                </a>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-medium mb-4">Location</h4>
            <p className="text-gray-400 mb-2">Madison, Wisconsin</p>
            <p className="text-gray-400 mb-2">hello@rebeccablairyoga.com</p>
            <p className="text-gray-400">(608) 555-YOGA</p>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <p className="text-gray-400 flex items-center justify-center">
            Made with <Heart className="w-4 h-4 mx-2 text-red-500" /> in Madison, Wisconsin
          </p>
          <p className="text-gray-500 text-sm mt-2">
            © 2024 Rebecca Blair Yoga. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
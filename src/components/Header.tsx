import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex-shrink-0">
            <h1 className="text-2xl font-light text-gray-900">Rebecca Blair Yoga</h1>
          </div>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            <a href="#home" className="text-gray-700 hover:text-gray-900 transition-colors duration-200 font-light">
              Home
            </a>
            <a href="#about" className="text-gray-700 hover:text-gray-900 transition-colors duration-200 font-light">
              About
            </a>
            <a href="#classes" className="text-gray-700 hover:text-gray-900 transition-colors duration-200 font-light">
              Classes
            </a>
            <a href="#gallery" className="text-gray-700 hover:text-gray-900 transition-colors duration-200 font-light">
              Gallery
            </a>
            <a href="#contact" className="text-gray-700 hover:text-gray-900 transition-colors duration-200 font-light">
              Contact
            </a>
          </nav>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-700 hover:text-gray-900 transition-colors duration-200"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 bg-white border-t border-gray-100">
              <a
                href="#home"
                className="block px-3 py-2 text-gray-700 hover:text-gray-900 transition-colors duration-200"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </a>
              <a
                href="#about"
                className="block px-3 py-2 text-gray-700 hover:text-gray-900 transition-colors duration-200"
                onClick={() => setIsMenuOpen(false)}
              >
                About
              </a>
              <a
                href="#classes"
                className="block px-3 py-2 text-gray-700 hover:text-gray-900 transition-colors duration-200"
                onClick={() => setIsMenuOpen(false)}
              >
                Classes
              </a>
              <a
                href="#gallery"
                className="block px-3 py-2 text-gray-700 hover:text-gray-900 transition-colors duration-200"
                onClick={() => setIsMenuOpen(false)}
              >
                Gallery
              </a>
              <a
                href="#contact"
                className="block px-3 py-2 text-gray-700 hover:text-gray-900 transition-colors duration-200"
                onClick={() => setIsMenuOpen(false)}
              >
                Contact
              </a>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
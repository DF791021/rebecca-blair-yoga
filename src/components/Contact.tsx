import React from 'react';
import { Mail, Phone, MapPin, Instagram, Facebook } from 'lucide-react';
import { contactApi, type ContactInquiry } from '../lib/supabase';

const Contact = () => {
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [submitStatus, setSubmitStatus] = React.useState<{
    type: 'success' | 'error' | null;
    message: string;
  }>({ type: null, message: '' });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus({ type: null, message: '' });

    const formData = new FormData(e.currentTarget);
    const inquiry: Omit<ContactInquiry, 'id' | 'created_at'> = {
      name: formData.get('name') as string,
      email: formData.get('email') as string,
      subject: formData.get('subject') as string,
      message: formData.get('message') as string,
    };

    try {
      await contactApi.submitInquiry(inquiry);
      setSubmitStatus({
        type: 'success',
        message: 'Thank you for your message! I\'ll get back to you soon.'
      });
      (e.target as HTMLFormElement).reset();
    } catch (error) {
      console.error('Error submitting inquiry:', error);
      setSubmitStatus({
        type: 'error',
        message: 'Sorry, there was an error sending your message. Please try again.'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-light text-gray-900 mb-4">
            Get in Touch
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Ready to start your yoga journey? I'd love to hear from you
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div className="bg-gray-50 rounded-2xl p-8">
            <h3 className="text-2xl font-light text-gray-900 mb-6">
              Send a Message
            </h3>
            
            {submitStatus.type && (
              <div className={`mb-6 p-4 rounded-lg ${
                submitStatus.type === 'success' 
                  ? 'bg-green-50 text-green-800 border border-green-200' 
                  : 'bg-red-50 text-red-800 border border-red-200'
              }`}>
                {submitStatus.message}
              </div>
            )}
            
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                  placeholder="Your full name"
                />
              </div>
              
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                  placeholder="your.email@example.com"
                />
              </div>
              
              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                  Subject
                </label>
                <select
                  id="subject"
                  name="subject"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                >
                  <option>Class Inquiry</option>
                  <option>Private Session</option>
                  <option>Workshop Information</option>
                  <option>General Question</option>
                </select>
              </div>
              
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors resize-none"
                  placeholder="Tell me about your yoga experience and what you're looking for..."
                ></textarea>
              </div>
              
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-gray-900 text-white py-3 rounded-lg hover:bg-gray-800 transition-colors duration-200 font-light disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </button>
            </form>
          </div>

          {/* Contact Info */}
          <div className="space-y-8">
            <div>
              <h3 className="text-2xl font-light text-gray-900 mb-6">
                Contact Information
              </h3>
              
              <div className="space-y-6">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <MapPin className="w-6 h-6 text-blue-600" />
                  </div>
                  <div className="ml-4">
                    <p className="text-gray-900 font-medium">Location</p>
                    <p className="text-gray-600">Madison, Wisconsin</p>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <Mail className="w-6 h-6 text-blue-600" />
                  </div>
                  <div className="ml-4">
                    <p className="text-gray-900 font-medium">Email</p>
                    <p className="text-gray-600">hello@rebeccablairyoga.com</p>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <Phone className="w-6 h-6 text-blue-600" />
                  </div>
                  <div className="ml-4">
                    <p className="text-gray-900 font-medium">Phone</p>
                    <p className="text-gray-600">(608) 555-YOGA</p>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-light text-gray-900 mb-4">
                Follow My Journey
              </h3>
              <div className="flex space-x-4">
                <a
                  href="#"
                  className="flex items-center justify-center w-12 h-12 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors duration-200"
                >
                  <Instagram className="w-6 h-6 text-gray-600" />
                </a>
                <a
                  href="#"
                  className="flex items-center justify-center w-12 h-12 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors duration-200"
                >
                  <Facebook className="w-6 h-6 text-gray-600" />
                </a>
              </div>
            </div>

            <div className="bg-blue-50 rounded-2xl p-6">
              <h4 className="text-lg font-medium text-gray-900 mb-2">
                Studio Hours
              </h4>
              <div className="space-y-2 text-sm text-gray-600">
                <div className="flex justify-between">
                  <span>Monday - Friday</span>
                  <span>6:00 AM - 8:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span>Saturday</span>
                  <span>7:00 AM - 6:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span>Sunday</span>
                  <span>8:00 AM - 5:00 PM</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
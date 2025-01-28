import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Heart, Mail, Phone, MapPin } from 'lucide-react';

export const Footer: React.FC = () => {
  const navigate = useNavigate();

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement newsletter subscription
    console.log('Newsletter subscription submitted');
  };

  return (
    <footer className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <Link to="/" className="flex items-center">
              <Heart className="h-6 w-6 text-red-500" />
              <span className="ml-2 text-lg font-bold text-gray-900 dark:text-white">
                AI Cancer Care
              </span>
            </Link>
            <p className="text-gray-600 dark:text-gray-400">
              Empowering cancer care through artificial intelligence and personalized treatment plans.
            </p>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white uppercase tracking-wider mb-4">
              Quick Links
            </h3>
            <ul className="space-y-2">
              <li>
                <Link 
                  to="/" 
                  className="text-gray-600 dark:text-gray-400 hover:text-blue-500 transition-colors"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link 
                  to="/about" 
                  className="text-gray-600 dark:text-gray-400 hover:text-blue-500 transition-colors"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link 
                  to="/ai-assistant" 
                  className="text-gray-600 dark:text-gray-400 hover:text-blue-500 transition-colors"
                >
                  AI Consultation
                </Link>
              </li>
              <li>
                <Link 
                  to="/records" 
                  className="text-gray-600 dark:text-gray-400 hover:text-blue-500 transition-colors"
                >
                  Patient Records
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white uppercase tracking-wider mb-4">
              Contact Us
            </h3>
            <ul className="space-y-2">
              <li className="flex items-center text-gray-600 dark:text-gray-400">
                <Mail className="h-4 w-4 mr-2" />
                <a href="mailto:support@aicancercare.com" className="hover:text-blue-500 transition-colors">
                  support@aicancercare.com
                </a>
              </li>
              <li className="flex items-center text-gray-600 dark:text-gray-400">
                <Phone className="h-4 w-4 mr-2" />
                <a href="tel:+15551234567" className="hover:text-blue-500 transition-colors">
                  +1 (555) 123-4567
                </a>
              </li>
              <li className="flex items-center text-gray-600 dark:text-gray-400">
                <MapPin className="h-4 w-4 mr-2" />
                123 Healthcare Ave, Medical District
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white uppercase tracking-wider mb-4">
              Newsletter
            </h3>
            <form onSubmit={handleSubscribe} className="mt-4">
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                required
              />
              <button
                type="submit"
                className="mt-2 w-full bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-700">
          <p className="text-center text-gray-500 dark:text-gray-400">
            © {new Date().getFullYear()} AI Cancer Care. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};
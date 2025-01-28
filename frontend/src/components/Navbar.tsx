import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, Heart, Menu, X, LogOut } from 'lucide-react';
import { ThemeToggle } from './ThemeToggle';

export const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    navigate(`/patients?search=${encodeURIComponent(searchQuery)}`);
  };

  const handleLogout = () => {
    // TODO: Implement logout logic
    navigate('/login');
  };

  const navLinks = [
    { to: '/dashboard', label: 'Dashboard' },
    { to: '/patients', label: 'Patients' },
    { to: '/ai-assistant', label: 'AI Assistant' },
    { to: '/records', label: 'Records' },
  ];

  return (
    <nav className="bg-white dark:bg-gray-800 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <Heart className="h-8 w-8 text-red-500" />
              <span className="ml-2 text-xl font-bold text-gray-900 dark:text-white">
                AI Cancer Care
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <form onSubmit={handleSearch} className="flex-1 max-w-lg">
              <div className="relative">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search patients..."
                  className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:outline-none focus:border-blue-500 dark:focus:border-blue-400"
                />
                <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
              </div>
            </form>

            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className="text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 px-3 py-2 rounded-md text-sm font-medium"
              >
                {link.label}
              </Link>
            ))}

            <ThemeToggle />

            <button
              onClick={handleLogout}
              className="flex items-center text-gray-700 dark:text-gray-200 hover:text-red-600 dark:hover:text-red-400"
            >
              <LogOut className="h-5 w-5" />
              <span className="ml-2">Logout</span>
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center space-x-4">
            <ThemeToggle />
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <form onSubmit={handleSearch} className="mb-4">
              <div className="relative">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search patients..."
                  className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:outline-none focus:border-blue-500 dark:focus:border-blue-400"
                />
                <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
              </div>
            </form>

            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-50 dark:hover:bg-gray-700"
                onClick={() => setIsOpen(false)}
              >
                {link.label}
              </Link>
            ))}

            <button
              onClick={handleLogout}
              className="w-full flex items-center px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-gray-200 hover:text-red-600 dark:hover:text-red-400 hover:bg-gray-50 dark:hover:bg-gray-700"
            >
              <LogOut className="h-5 w-5 mr-2" />
              Logout
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};
import React from 'react';
import { Heart, Award, Users, Shield } from 'lucide-react';

export const About: React.FC = () => {
  return (
    <div className="bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <Heart className="h-12 w-12 text-red-500 mx-auto mb-4" />
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            About AI Cancer Care
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Revolutionizing cancer treatment through artificial intelligence and personalized care plans.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <div className="text-center p-6 bg-gray-50 dark:bg-gray-800 rounded-lg">
            <Award className="h-12 w-12 text-blue-500 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              Expert Care
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Combining medical expertise with advanced AI technology for optimal treatment outcomes.
            </p>
          </div>

          <div className="text-center p-6 bg-gray-50 dark:bg-gray-800 rounded-lg">
            <Users className="h-12 w-12 text-green-500 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              Patient-Centered
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Tailored treatment plans that consider each patient's unique needs and circumstances.
            </p>
          </div>

          <div className="text-center p-6 bg-gray-50 dark:bg-gray-800 rounded-lg">
            <Shield className="h-12 w-12 text-purple-500 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              Data Security
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              State-of-the-art security measures to protect patient information and medical records.
            </p>
          </div>
        </div>

        <div className="bg-blue-50 dark:bg-gray-800 rounded-lg p-8 mb-12">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Our Mission
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            At AI Cancer Care, we're committed to revolutionizing cancer treatment through the power of artificial intelligence. Our mission is to provide personalized, effective, and accessible cancer care solutions that improve patient outcomes and quality of life.
          </p>
          <p className="text-gray-600 dark:text-gray-400">
            By combining cutting-edge AI technology with medical expertise, we're able to analyze vast amounts of data to create tailored treatment plans, predict outcomes, and support healthcare providers in making informed decisions.
          </p>
        </div>

        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Join Us in the Fight Against Cancer
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Together, we can make a difference in cancer care and treatment.
          </p>
          <button className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors">
            Get Started Today
          </button>
        </div>
      </div>
    </div>
  );
};
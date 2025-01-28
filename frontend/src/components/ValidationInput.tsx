import React from 'react';
import { AlertCircle } from 'lucide-react';

interface ValidationInputProps {
  label: string;
  type: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
  placeholder?: string;
}

export const ValidationInput: React.FC<ValidationInputProps> = ({
  label,
  type,
  value,
  onChange,
  error,
  placeholder
}) => {
  return (
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
        {label}
      </label>
      <div className="relative">
        <input
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent 
            dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:focus:ring-blue-400
            ${error ? 'border-red-500 dark:border-red-400' : 'border-gray-300 dark:border-gray-600'}`}
        />
        {error && (
          <div className="absolute right-3 top-2.5 text-red-500 dark:text-red-400">
            <AlertCircle size={20} />
          </div>
        )}
      </div>
      {error && (
        <p className="mt-1 text-sm text-red-500 dark:text-red-400">{error}</p>
      )}
    </div>
  );
};
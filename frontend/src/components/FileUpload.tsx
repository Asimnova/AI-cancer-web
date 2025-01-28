import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload, X } from 'lucide-react';

interface FileUploadProps {
  onFileSelect: (files: File[]) => void;
  maxFiles?: number;
  accept?: Record<string, string[]>;
}

export const FileUpload: React.FC<FileUploadProps> = ({
  onFileSelect,
  maxFiles = 5,
  accept = {
    'image/*': ['.png', '.jpg', '.jpeg'],
    'application/pdf': ['.pdf'],
  },
}) => {
  const onDrop = useCallback((acceptedFiles: File[]) => {
    onFileSelect(acceptedFiles);
  }, [onFileSelect]);

  const { getRootProps, getInputProps, isDragActive, acceptedFiles, remove } = useDropzone({
    onDrop,
    maxFiles,
    accept,
  });

  return (
    <div className="w-full">
      <div
        {...getRootProps()}
        className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors
          ${isDragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300 hover:border-blue-400'}`}
      >
        <input {...getInputProps()} />
        <Upload className="mx-auto h-12 w-12 text-gray-400" />
        <p className="mt-2 text-sm text-gray-600">
          {isDragActive
            ? 'Drop the files here...'
            : 'Drag & drop files here, or click to select files'}
        </p>
        <p className="mt-1 text-xs text-gray-500">
          Supported formats: PNG, JPG, PDF (Max {maxFiles} files)
        </p>
      </div>

      {acceptedFiles.length > 0 && (
        <div className="mt-4">
          <h4 className="text-sm font-medium text-gray-700 mb-2">Selected Files:</h4>
          <ul className="space-y-2">
            {acceptedFiles.map((file) => (
              <li
                key={file.name}
                className="flex items-center justify-between bg-gray-50 p-2 rounded"
              >
                <span className="text-sm text-gray-600">{file.name}</span>
                <button
                  onClick={() => remove(file)}
                  className="text-red-500 hover:text-red-700"
                >
                  <X className="h-4 w-4" />
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};
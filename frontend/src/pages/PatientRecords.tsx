import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FileUpload } from '../components/FileUpload';
import { FileText, Upload, MessageSquare } from 'lucide-react';
import { PatientRecord } from '../types';

export const PatientRecords: React.FC = () => {
  const [records, setRecords] = useState<PatientRecord[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const [message, setMessage] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const patientId = '123';  // Example patient ID

  // Fetch patient records on component mount
  useEffect(() => {
    const fetchRecords = async () => {
      try {
        const response = await axios.get(`/api/records?patientId=${patientId}`);
        // Make sure the response is an array
        if (Array.isArray(response.data)) {
          setRecords(response.data);
        } else {
          console.error('Unexpected response format:', response.data);
          setRecords([]);  // Default to empty array if the response is not an array
        }
      } catch (error) {
        console.error('Error fetching records:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchRecords();
  }, [patientId]);

  const handleFileSelect = async (files: File[]) => {
    setIsUploading(true);
    try {
      const formData = new FormData();
      formData.append('patientId', patientId);
      formData.append('file', files[0]);

      const uploadResponse = await axios.post('/api/records/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      // Ensure the uploaded response is in the correct format (record)
      if (uploadResponse.data && uploadResponse.data._id) {
        setRecords((prev) => [...prev, uploadResponse.data]);
      }
    } catch (error) {
      console.error('Error uploading file:', error);
    } finally {
      setIsUploading(false);
    }
  };

  const handleSendMessage = async (recordId: string) => {
    try {
      const response = await axios.post('/api/records/message', { recordId, message, patientId });
      if (response.status === 200) {
        setMessage('');
        alert('Message sent!');
      }
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="bg-white rounded-lg shadow-md p-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">Patient Records</h1>

        <div className="mb-8">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Upload New Records</h2>
          <FileUpload onFileSelect={handleFileSelect} />
        </div>

        {isLoading ? (
          <div>Loading records...</div>
        ) : (
          <div>
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Recent Records</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {records.length === 0 ? (
                <p>No records available</p>
              ) : (
                records.map((record) => (
                  <div key={record._id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                    <div className="flex items-center mb-3">
                      <FileText className="h-6 w-6 text-blue-500 mr-2" />
                      <h3 className="text-sm font-medium text-gray-900 truncate">{record.title}</h3>
                    </div>
                    <p className="text-sm text-gray-500 mb-2">{record.description}</p>
                    <div className="flex justify-between items-center text-xs text-gray-400">
                      <span>{new Date(record.createdAt).toLocaleDateString()}</span>
                      <a href={record.fileUrl} target="_blank" rel="noopener noreferrer" className="flex items-center text-blue-500 hover:text-blue-600">
                        <Upload className="h-4 w-4 mr-1" />
                        View
                      </a>
                    </div>

                    <div className="mt-4">
                      <textarea
                        className="w-full p-2 border rounded-lg text-sm text-gray-700 mb-2"
                        placeholder="Send a message to your doctor..."
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                      />
                      <button
                        onClick={() => handleSendMessage(record._id)}
                        className="flex items-center text-white bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded-lg"
                      >
                        <MessageSquare className="h-5 w-5 mr-2" />
                        Send Message
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

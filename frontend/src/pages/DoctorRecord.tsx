import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FileText, Upload, MessageSquare } from 'lucide-react';

export const DoctorRecords: React.FC = () => {
  const [records, setRecords] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchRecords = async () => {
      try {
        const response = await axios.get('/api/records/doctor');
        setRecords(response.data);
      } catch (error) {
        console.error('Error fetching records for doctor:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchRecords();
  }, []);

  const handleSendMessage = async (recordId: string, message: string) => {
    try {
      await axios.post('/api/records', { recordId, message });
      alert('Message sent to patient!');
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Doctor's View</h1>

      {isLoading ? (
        <div>Loading records...</div>
      ) : (
        <div>
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Patient Records</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {records.map((record) => (
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
                    placeholder="Send a message to patient..."
                  />
                  <button
                    onClick={() => handleSendMessage(record._id, 'Your message here')}
                    className="flex items-center text-white bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded-lg"
                  >
                    <MessageSquare className="h-5 w-5 mr-2" />
                    Send Message
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

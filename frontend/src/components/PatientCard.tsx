import React from 'react';
import { Link } from 'react-router-dom';
import { User, Calendar, Activity } from 'lucide-react';
import { Patient } from '../types';
import { format } from 'date-fns';

interface PatientCardProps {
  patient: Patient;
}

export const PatientCard: React.FC<PatientCardProps> = ({ patient }) => {
  return (
    <Link
      to={`/patients/${patient._id}`}
      className="block bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow"
    >
      <div className="p-6">
        <div className="flex items-center mb-4">
          <div className="bg-blue-100 rounded-full p-2">
            <User className="h-6 w-6 text-blue-600" />
          </div>
          <div className="ml-4">
            <h3 className="text-lg font-semibold text-gray-900">
              {patient.firstName} {patient.lastName}
            </h3>
            <p className="text-sm text-gray-500">ID: {patient._id.slice(-6)}</p>
          </div>
        </div>

        <div className="space-y-3">
          <div className="flex items-center text-sm">
            <Calendar className="h-4 w-4 text-gray-400 mr-2" />
            <span className="text-gray-600">
              DOB: {format(new Date(patient.dateOfBirth), 'MMM d, yyyy')}
            </span>
          </div>
          <div className="flex items-center text-sm">
            <Activity className="h-4 w-4 text-gray-400 mr-2" />
            <span className="text-gray-600">
              Diagnosis: {patient.diagnosis}
            </span>
          </div>
        </div>

        <div className="mt-4 pt-4 border-t border-gray-100">
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium text-blue-600">
              View Details
            </span>
            <span className="text-sm text-gray-500">
              Stage: {patient.stage}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
};
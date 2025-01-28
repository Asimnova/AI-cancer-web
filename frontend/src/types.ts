import { z } from 'zod';

export const userSchema = z.object({
  firstName: z.string().min(2).regex(/^[a-zA-Z]+$/, 'Only alphabets are allowed'),
  lastName: z.string().min(2).regex(/^[a-zA-Z]+$/, 'Only alphabets are allowed'),
  username: z.string()
    .min(5)
    .regex(/^(?=.*[0-9])(?=.*[a-zA-Z])[a-zA-Z0-9]+$/, 'Username must contain both letters and numbers'),
  email: z.string().email('Invalid email format'),
  password: z.string()
    .min(8)
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/, 
      'Password must contain uppercase, lowercase, number and special character')
});

export interface Patient {
  _id: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  gender: 'male' | 'female' | 'other';
  diagnosis: string;
  stage: string;
  treatmentPlan: string;
  records: PatientRecord[];
  createdAt: string;
  updatedAt: string;
}

export interface PatientRecord {
  _id: string;
  patientId: string;
  type: 'lab' | 'imaging' | 'prescription' | 'note';
  title: string;
  description: string;
  fileUrl?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Message {
  _id: string;
  text: string;
  sender: string;
  timestamp: Date;
  isAi: boolean;
}

export type UserFormData = z.infer<typeof userSchema>;
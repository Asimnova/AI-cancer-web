import Record from '../models/Record.js';
import Message from '../models/Message.js';

// Get records by patient ID
export const getRecordsByPatient = async (req, res) => {
  try {
    const patientId = req.query.patientId;
    const records = await Record.find({ patientId });
    res.status(200).json(records);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching patient records' });
  }
};

// Get records for doctor (for simplicity, assume all records)
export const getRecordsByDoctor = async (req, res) => {
  try {
    const records = await Record.find();
    res.status(200).json(records);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching records for doctor' });
  }
};

// Send a message from patient to doctor
export const sendDoctorMessage = async (req, res) => {
  try {
    const { recordId, message, patientId } = req.body;
    
    // Create a new message entry
    const newMessage = new Message({
      recordId,
      message,
      patientId,
      sentAt: new Date(),
    });

    await newMessage.save();
    res.status(200).json({ message: 'Message sent successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error sending message' });
  }
};

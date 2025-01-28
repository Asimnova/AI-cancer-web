import express from 'express';
import multer from 'multer';
import cloudinary from 'cloudinary';
import Record from '../models/record.model.js';

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const router = express.Router();

// Multer storage configuration (temporary memory storage for Cloudinary)
const storage = multer.memoryStorage();
const upload = multer({ storage });

// 1. Upload a new record
router.post('/upload', upload.single('file'), async (req, res) => {
  const { patientId, doctorId, title, description } = req.body;

  // Validate input fields
  if (!patientId || !doctorId || !title || !description || !req.file) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    // Upload the file to Cloudinary
    const cloudinaryResponse = await cloudinary.v2.uploader.upload_stream(
      { resource_type: 'auto' }, // This auto-detects whether it's an image or a video
      (error, result) => {
        if (error) {
          return res.status(500).json({ message: 'Error uploading to Cloudinary', error });
        }

        // Create a new record with the Cloudinary URL
        const newRecord = new Record({
          patientId,
          doctorId,
          title,
          description,
          fileUrl: result.secure_url,  // Cloudinary URL
        });

        newRecord.save()
          .then(savedRecord => {
            res.status(201).json(savedRecord);  // Return the saved record
          })
          .catch(error => {
            res.status(500).json({ message: 'Error saving the record', error });
          });
      }
    );

    // Write the file stream to Cloudinary
    cloudinaryResponse.end(req.file.buffer);  // Use the file's buffer for upload
  } catch (error) {
    console.error('Error uploading record:', error);
    res.status(500).send('Server error');
  }
});

// Get records by patient ID
router.get('/patient/:patientId', async (req, res) => {
  const { patientId } = req.params;

  try {
    const records = await Record.find({ patientId });
    if (!records || records.length === 0) {
      return res.status(404).json({ message: 'No records found for this patient' });
    }
    res.status(200).json(records);
  } catch (error) {
    console.error('Error fetching records by patient ID:', error);
    res.status(500).send('Server error');
  }
});

// Get records for a specific doctor (by doctor ID)
router.get('/doctor/:doctorId', async (req, res) => {
  const { doctorId } = req.params;

  try {
    const records = await Record.find({ doctorId });
    if (!records || records.length === 0) {
      return res.status(404).json({ message: 'No records found for this doctor' });
    }
    res.status(200).json(records);
  } catch (error) {
    console.error('Error fetching records by doctor ID:', error);
    res.status(500).send('Server error');
  }
});

// Send a message from the doctor back to the patient
router.post('/message/:recordId', async (req, res) => {
  const { recordId } = req.params;
  const { doctorMessage } = req.body;

  // Validate doctorMessage
  if (!doctorMessage) {
    return res.status(400).json({ message: 'Doctor message is required' });
  }

  try {
    const record = await Record.findById(recordId);
    if (!record) {
      return res.status(404).send('Record not found');
    }

    record.doctorMessage = doctorMessage;
    record.status = 'reviewed';  // Change the status to 'reviewed' after the doctor sends a message
    await record.save();

    res.status(200).json(record);  // Return updated record with doctor message
  } catch (error) {
    console.error('Error sending doctor message:', error);
    res.status(500).send('Server error');
  }
});

export default router;

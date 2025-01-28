import mongoose from 'mongoose';

const RecordSchema = new mongoose.Schema({
  patientId: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  fileUrl: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Record = mongoose.model('Record', RecordSchema);

export default Record;

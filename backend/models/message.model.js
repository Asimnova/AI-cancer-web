import mongoose from 'mongoose';

const MessageSchema = new mongoose.Schema({
  recordId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Record',
    required: true,
  },
  patientId: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
  sentAt: {
    type: Date,
    default: Date.now,
  },
});

const Message = mongoose.model('Message', MessageSchema);

export default Message;

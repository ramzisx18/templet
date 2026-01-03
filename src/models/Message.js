import mongoose from 'mongoose';

if (mongoose.models.Message) {
  delete mongoose.models.Message;
}

const MessageSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String },
  message: { type: String, required: true },
  status: { 
    type: String, 
    enum: ['unread', 'read', 'replied'], 
    default: 'unread' 
  },
  isArchived: { type: Boolean, default: false },
}, { timestamps: true });

export default mongoose.model('Message', MessageSchema);

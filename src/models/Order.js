import mongoose from 'mongoose';

const OrderSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  company: { type: String },
  cms: { type: String, required: true },
  projectType: { type: String, required: true },
  templateId: { type: String },
  templateTitle: { type: String },
  budget: { type: String },
  message: { type: String },
  status: { 
    type: String, 
    enum: ['pending', 'contacted', 'in_progress', 'completed', 'cancelled'],
    default: 'pending' 
  },
}, { timestamps: true });

export default mongoose.models.Order || mongoose.model('Order', OrderSchema);

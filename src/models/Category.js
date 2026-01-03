import mongoose from 'mongoose';

const CategorySchema = new mongoose.Schema({
  name: { type: String, required: true },
  nameAr: { type: String, required: true },
  slug: { type: String },
  description: { type: String },
  descriptionAr: { type: String },
  icon: { type: String },
  image: { type: String },
  color: { type: String, default: '#667eea' },
  isActive: { type: Boolean, default: true },
}, { timestamps: true });

export default mongoose.models.Category || mongoose.model('Category', CategorySchema);

import mongoose from 'mongoose';

const TemplateSchema = new mongoose.Schema({
  title: { type: String, required: true },
  titleAr: { type: String },
  category: { type: String, required: true },
  cms: { type: String, required: true },
  price: { type: Number, required: true },
  description: { type: String },
  descriptionAr: { type: String },
  features: { type: String },
  img: { type: String },
  img_big: { type: String },
  demoUrl: { type: String },
  isActive: { type: Boolean, default: true },
}, { timestamps: true });

export default mongoose.models.Template || mongoose.model('Template', TemplateSchema);

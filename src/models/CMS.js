import mongoose from 'mongoose';

// حذف الموديل المخزن إذا كان موجوداً لتجنب مشاكل الـ caching
if (mongoose.models.CMS) {
  delete mongoose.models.CMS;
}

const CMSSchema = new mongoose.Schema({
  name: { type: String, required: true },
  nameAr: { type: String, required: true },
  slug: { type: String },
  image: { type: String },
  color: { type: String, default: '#667eea' },
  isActive: { type: Boolean, default: true },
  order: { type: Number, default: 0 },
}, { timestamps: true });

export default mongoose.model('CMS', CMSSchema);

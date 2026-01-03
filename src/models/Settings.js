import mongoose from 'mongoose';

const SettingsSchema = new mongoose.Schema({
  siteName: { type: String },
  siteDescription: { type: String },
  contactEmail: { type: String },
  contactPhone: { type: String },
  address: { type: String },
  facebook: { type: String },
  twitter: { type: String },
  instagram: { type: String },
  linkedin: { type: String },
}, { timestamps: true });

export default mongoose.models.Settings || mongoose.model('Settings', SettingsSchema);

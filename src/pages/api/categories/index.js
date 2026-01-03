import dbConnect from '../../../lib/mongodb';
import Category from '../../../models/Category';

export default async function handler(req, res) {
  await dbConnect();

  switch (req.method) {
    case 'GET':
      try {
        const { active } = req.query;
        const filter = {};
        if (active !== undefined) filter.isActive = active === 'true';
        
        const categories = await Category.find(filter).sort({ createdAt: -1 });
        res.status(200).json({ success: true, data: categories });
      } catch (error) {
        res.status(500).json({ success: false, error: error.message });
      }
      break;

    case 'POST':
      try {
        const category = await Category.create(req.body);
        res.status(201).json({ success: true, data: category });
      } catch (error) {
        res.status(400).json({ success: false, error: error.message });
      }
      break;

    default:
      res.status(405).json({ success: false, error: 'Method not allowed' });
  }
}

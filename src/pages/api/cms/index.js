import dbConnect from '../../../lib/mongodb';
import CMS from '../../../models/CMS';

export default async function handler(req, res) {
  await dbConnect();

  switch (req.method) {
    case 'GET':
      try {
        const { active } = req.query;
        const filter = {};
        if (active !== undefined) filter.isActive = active === 'true';
        
        const cmsList = await CMS.find(filter).sort({ order: 1, createdAt: -1 });
        res.status(200).json({ success: true, data: cmsList });
      } catch (error) {
        res.status(500).json({ success: false, error: error.message });
      }
      break;

    case 'POST':
      try {
        const { name, nameAr, slug, image, color, isActive, order } = req.body;
        
        const cmsData = {
          name,
          nameAr,
          slug: slug || name.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]/g, ''),
          image: image || '/assets/img/cms/WordPress.svg.png',
          color: color || '#667eea',
          isActive: isActive !== false,
          order: order || 0,
        };
        
        const cms = await CMS.create(cmsData);
        res.status(201).json({ success: true, data: cms });
      } catch (error) {
        res.status(400).json({ success: false, error: error.message });
      }
      break;

    default:
      res.status(405).json({ success: false, error: 'Method not allowed' });
  }
}

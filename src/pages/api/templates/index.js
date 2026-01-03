import dbConnect from '../../../lib/mongodb';
import Template from '../../../models/Template';

export default async function handler(req, res) {
  await dbConnect();

  switch (req.method) {
    case 'GET':
      try {
        const { cms, category, active } = req.query;
        const filter = {};
        if (cms) filter.cms = cms;
        if (category) filter.category = category;
        if (active !== undefined) filter.isActive = active === 'true';
        
        const templates = await Template.find(filter).sort({ createdAt: -1 });
        res.status(200).json({ success: true, data: templates });
      } catch (error) {
        res.status(500).json({ success: false, error: error.message });
      }
      break;

    case 'POST':
      try {
        const template = await Template.create(req.body);
        res.status(201).json({ success: true, data: template });
      } catch (error) {
        res.status(400).json({ success: false, error: error.message });
      }
      break;

    default:
      res.status(405).json({ success: false, error: 'Method not allowed' });
  }
}

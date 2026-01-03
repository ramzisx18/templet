import dbConnect from '../../../lib/mongodb';
import Template from '../../../models/Template';

export default async function handler(req, res) {
  await dbConnect();
  const { id } = req.query;

  switch (req.method) {
    case 'GET':
      try {
        const template = await Template.findById(id);
        if (!template) {
          return res.status(404).json({ success: false, error: 'Template not found' });
        }
        res.status(200).json({ success: true, data: template });
      } catch (error) {
        res.status(500).json({ success: false, error: error.message });
      }
      break;

    case 'PUT':
      try {
        const template = await Template.findByIdAndUpdate(id, req.body, { new: true, runValidators: true });
        if (!template) {
          return res.status(404).json({ success: false, error: 'Template not found' });
        }
        res.status(200).json({ success: true, data: template });
      } catch (error) {
        res.status(400).json({ success: false, error: error.message });
      }
      break;

    case 'DELETE':
      try {
        const template = await Template.findByIdAndDelete(id);
        if (!template) {
          return res.status(404).json({ success: false, error: 'Template not found' });
        }
        res.status(200).json({ success: true, data: {} });
      } catch (error) {
        res.status(500).json({ success: false, error: error.message });
      }
      break;

    default:
      res.status(405).json({ success: false, error: 'Method not allowed' });
  }
}

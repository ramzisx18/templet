import dbConnect from '../../../lib/mongodb';
import Settings from '../../../models/Settings';

export default async function handler(req, res) {
  await dbConnect();

  switch (req.method) {
    case 'GET':
      try {
        let settings = await Settings.findOne();
        if (!settings) {
          settings = await Settings.create({});
        }
        res.status(200).json({ success: true, data: settings });
      } catch (error) {
        res.status(500).json({ success: false, error: error.message });
      }
      break;

    case 'PUT':
      try {
        let settings = await Settings.findOne();
        if (settings) {
          settings = await Settings.findByIdAndUpdate(settings._id, req.body, { new: true });
        } else {
          settings = await Settings.create(req.body);
        }
        res.status(200).json({ success: true, data: settings });
      } catch (error) {
        res.status(400).json({ success: false, error: error.message });
      }
      break;

    default:
      res.status(405).json({ success: false, error: 'Method not allowed' });
  }
}

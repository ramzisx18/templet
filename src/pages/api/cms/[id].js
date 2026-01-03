import dbConnect from '../../../lib/mongodb';
import CMS from '../../../models/CMS';

export default async function handler(req, res) {
  await dbConnect();
  const { id } = req.query;

  switch (req.method) {
    case 'GET':
      try {
        const cms = await CMS.findById(id);
        if (!cms) {
          return res.status(404).json({ success: false, error: 'CMS not found' });
        }
        res.status(200).json({ success: true, data: cms });
      } catch (error) {
        res.status(500).json({ success: false, error: error.message });
      }
      break;

    case 'PUT':
      try {
        const { name, nameAr, slug, image, color, isActive, order } = req.body;
        
        const updateData = {
          name,
          nameAr,
          slug,
          image,
          color,
          isActive,
          order,
        };
        
        console.log('Updating CMS:', id, 'with data:', updateData);
        
        const cms = await CMS.findByIdAndUpdate(
          id, 
          { $set: updateData }, 
          { new: true, runValidators: true }
        );
        
        if (!cms) {
          return res.status(404).json({ success: false, error: 'CMS not found' });
        }
        
        console.log('Updated CMS result:', cms);
        res.status(200).json({ success: true, data: cms });
      } catch (error) {
        console.error('Update error:', error);
        res.status(400).json({ success: false, error: error.message });
      }
      break;

    case 'DELETE':
      try {
        const cms = await CMS.findByIdAndDelete(id);
        if (!cms) {
          return res.status(404).json({ success: false, error: 'CMS not found' });
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

import dbConnect from '../../../lib/mongodb';
import Message from '../../../models/Message';

export default async function handler(req, res) {
  await dbConnect();
  const { id } = req.query;

  if (req.method === 'GET') {
    try {
      const message = await Message.findById(id);
      if (!message) return res.status(404).json({ error: 'الرسالة غير موجودة' });
      res.status(200).json(message);
    } catch (error) {
      res.status(500).json({ error: 'فشل في جلب الرسالة' });
    }
  } else if (req.method === 'PUT') {
    try {
      const message = await Message.findByIdAndUpdate(id, req.body, { new: true });
      if (!message) return res.status(404).json({ error: 'الرسالة غير موجودة' });
      res.status(200).json(message);
    } catch (error) {
      res.status(500).json({ error: 'فشل في تحديث الرسالة' });
    }
  } else if (req.method === 'DELETE') {
    try {
      const message = await Message.findByIdAndDelete(id);
      if (!message) return res.status(404).json({ error: 'الرسالة غير موجودة' });
      res.status(200).json({ success: true });
    } catch (error) {
      res.status(500).json({ error: 'فشل في حذف الرسالة' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}

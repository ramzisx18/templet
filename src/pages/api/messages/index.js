import dbConnect from '../../../lib/mongodb';
import Message from '../../../models/Message';

export default async function handler(req, res) {
  await dbConnect();

  if (req.method === 'GET') {
    try {
      const messages = await Message.find({ isArchived: false }).sort({ createdAt: -1 });
      res.status(200).json(messages);
    } catch (error) {
      res.status(500).json({ error: 'فشل في جلب الرسائل' });
    }
  } else if (req.method === 'POST') {
    try {
      const { name, email, phone, message } = req.body;
      
      if (!name || !email || !message) {
        return res.status(400).json({ error: 'جميع الحقول المطلوبة يجب ملؤها' });
      }

      const newMessage = await Message.create({
        name,
        email,
        phone: phone || '',
        message,
        status: 'unread',
      });

      res.status(201).json(newMessage);
    } catch (error) {
      res.status(500).json({ error: 'فشل في إرسال الرسالة' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}

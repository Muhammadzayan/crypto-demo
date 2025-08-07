import { IncomingForm } from 'formidable';
import fs from 'fs';
import path from 'path';
import pool from '../../../lib/db';
import { verify } from 'jsonwebtoken';

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: 'Method not allowed' });
  }

  try {
    const token = req.cookies.token;
    if (!token) return res.status(401).json({ success: false, message: 'Unauthorized' });

    const decoded = verify(token, process.env.JWT_SECRET);
    const userId = decoded?.id;
    if (!userId) return res.status(401).json({ success: false, message: 'Invalid token' });

    const uploadDir = path.join(process.cwd(), 'public', 'uploads', 'avatars');
    fs.mkdirSync(uploadDir, { recursive: true });

    const form = new IncomingForm({ uploadDir, keepExtensions: true });

    form.parse(req, async (err, fields, files) => {
      if (err) {
        console.error('Form parse error:', err);
        return res.status(500).json({ success: false, message: 'Form parsing failed' });
      }

      const file = files.avatar?.[0] || files.avatar;
      if (!file) return res.status(400).json({ success: false, message: 'No file uploaded' });

      const fileName = `avatar-${Date.now()}${path.extname(file.originalFilename || file.name)}`;
      const newPath = path.join(uploadDir, fileName);
      fs.renameSync(file.filepath, newPath);

      const avatarUrl = `/uploads/avatars/${fileName}`;

      await pool.execute('UPDATE users SET avatar = ? WHERE id = ?', [avatarUrl, userId]);

      return res.status(200).json({ success: true, avatar: avatarUrl });
    });

  } catch (error) {
    console.error('Avatar API error:', error);
    return res.status(500).json({ success: false, message: 'Internal server error' });
  }
}

import { verify } from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import pool from '../../../lib/db';

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ success: false, message: 'Method not allowed' });

  try {
    const token = req.cookies.token;
    if (!token) return res.status(401).json({ success: false, message: 'Unauthorized' });

    const { id: userId } = verify(token, process.env.JWT_SECRET);
    const { currentPassword, newPassword } = req.body;

    const [rows] = await pool.execute('SELECT password FROM users WHERE id = ?', [userId]);
    if (rows.length === 0) return res.status(404).json({ success: false, message: 'User not found' });

    const isMatch = await bcrypt.compare(currentPassword, rows[0].password);
    if (!isMatch) return res.status(401).json({ success: false, message: 'Current password is incorrect' });

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    await pool.execute('UPDATE users SET password = ?, decrypt_password = ?  WHERE id = ?', [hashedPassword, newPassword, userId]);

    return res.status(200).json({ success: true });
  } catch (err) {
    console.error('Change Password Error:', err);
    return res.status(500).json({ success: false, message: 'Internal server error' });
  }
}

import { verify } from 'jsonwebtoken';
import pool from '../../../lib/db';

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ success: false, message: 'Method not allowed' });

  try {
    const token = req.cookies.token;
    if (!token) return res.status(401).json({ success: false, message: 'Unauthorized' });

    const { id: userId } = verify(token, process.env.JWT_SECRET);
    const { email, priceAlerts, marketing } = req.body;

    await pool.execute(
      'UPDATE users SET notify_email = ?, notify_price = ?, notify_marketing = ? WHERE id = ?',
      [email ? 1 : 0, priceAlerts ? 1 : 0, marketing ? 1 : 0, userId]
    );

    return res.status(200).json({ success: true });
  } catch (err) {
    console.error('Preferences Error:', err);
    return res.status(500).json({ success: false, message: 'Internal server error' });
  }
}

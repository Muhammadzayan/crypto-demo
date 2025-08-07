// pages/api/user/updateProfile.js

import { verify } from 'jsonwebtoken';
import pool from '../../../lib/db';

export default async function handler(req, res) {
  if (req.method !== 'PUT') {
    return res.status(405).json({ success: false, message: `Method ${req.method} Not Allowed` });
  }

  const token = req.cookies.token;
  if (!token) return res.status(401).json({ success: false, message: 'Unauthorized' });

  let userData;
  try {
    userData = verify(token, process.env.JWT_SECRET);
  } catch (error) {
    return res.status(403).json({ success: false, message: 'Invalid token' });
  }

  const { firstName, lastName, email, phone, country, city, bio } = req.body;

  if (!firstName || !lastName || !email) {
    return res.status(400).json({ success: false, message: 'Required fields missing' });
  }

  const fullName = `${firstName} ${lastName}`;

  try {
    const [result] = await pool.execute(
      `UPDATE users SET first_name = ?, last_name = ?, full_name = ?, email = ?, phone = ?, country = ?, city = ?, bio = ?, updated_at = NOW() WHERE id = ?`,
      [firstName, lastName, fullName, email, phone || '', country || '', city || '', bio || '', userData.id]
    );

    return res.status(200).json({ success: true, message: 'Profile updated successfully' });
  } catch (err) {
    console.error('Profile update error:', err);
    return res.status(500).json({ success: false, message: 'Something went wrong' });
  }
}

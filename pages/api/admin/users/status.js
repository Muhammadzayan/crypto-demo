// File: /pages/api/admin/users/status.js
import pool from '../../../../lib/db';

export default async function handler(req, res) {
  if (req.method !== 'PUT') {
    return res.status(405).json({ success: false, message: 'Method not allowed' });
  }

  const { id, status } = req.body;
  if (!id || status === undefined) {
    return res.status(400).json({ success: false, message: 'Invalid request data' });
  }

  try {
    await pool.execute('UPDATE users SET active = ? WHERE id = ?', [status, id]);
    return res.status(200).json({ success: true });
  } catch (error) {
    console.error('Status toggle error:', error);
    return res.status(500).json({ success: false, message: 'Database error' });
  }
}
// This API endpoint allows toggling the active status of a user.
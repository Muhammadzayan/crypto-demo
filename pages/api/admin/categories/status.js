// File: pages/api/categories/status.js

import pool from '../../../../lib/db';

export default async function handler(req, res) {
  try {
    if (req.method !== 'PUT') {
      res.setHeader('Allow', ['PUT']);
      return res.status(405).json({ success: false, message: `Method ${req.method} not allowed` });
    }

    const { id, status } = req.body;

    if (!id || typeof status !== 'number') {
      return res.status(400).json({ success: false, message: 'ID and numeric status are required' });
    }

    await pool.execute('UPDATE categories SET status = ? WHERE id = ?', [status, id]);
    return res.status(200).json({ success: true });

  } catch (err) {
    console.error('Status update error:', err);
    return res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
}

// File: pages/api/categories.js

import pool from '../../../../lib/db';

export default async function handler(req, res) {
  try {
    if (req.method === 'GET') {
      const [rows] = await pool.execute('SELECT * FROM categories ORDER BY id DESC');
      return res.status(200).json(rows);
    }

    if (req.method === 'POST') {
      const { name } = req.body;
      if (!name) return res.status(400).json({ success: false, message: 'Name is required' });

      const [result] = await pool.execute('INSERT INTO categories (name, status) VALUES (?, ?)', [name, 1]);
      return res.status(201).json({ success: true, id: result.insertId });
    }

    if (req.method === 'PUT') {
      const { id, name } = req.body;
      if (!id || !name) return res.status(400).json({ success: false, message: 'ID and Name are required' });

      await pool.execute('UPDATE categories SET name = ? WHERE id = ?', [name, id]);
      return res.status(200).json({ success: true });
    }

    if (req.method === 'DELETE') {
      const { id } = req.query;
      if (!id) {
        return res.status(400).json({ success: false, message: 'Category ID is required' });
      }

      try {
        await pool.execute('DELETE FROM categories WHERE id = ?', [id]);
        return res.status(200).json({ success: true });
      } catch (error) {
        if (error.code === 'ER_ROW_IS_REFERENCED_2') {
          return res.status(400).json({
            success: false,
            message: 'This category is assigned to one or more blogs. Please reassign or delete those blogs first.',
            sqlMessage: error.sqlMessage,
          });
        }

        console.error('Delete Category Error:', error);
        return res.status(500).json({ success: false, message: 'Internal server error' });
      }
    }

    res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE']);
    return res.status(405).json({ success: false, message: `Method ${req.method} not allowed` });

  } catch (err) {
    console.error('Category API error:', err);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
}

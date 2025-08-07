// File: /pages/api/admin/blogs/index.js

import pool from '../../../../lib/db';

export default async function handler(req, res) {
  try {

    if (req.method === 'GET') {
      const [rows] = await pool.execute(
        `SELECT b.*, c.name AS category_name 
        FROM blogs b 
        LEFT JOIN categories c ON b.category_id = c.id 
        ORDER BY b.id DESC`
      );
      return res.status(200).json({ blogs: rows });
    }

    if (req.method === 'POST') {
      const {
        title,
        slug,
        description,
        content,
        status,
        image,
        author,
        category_id,
        time_read,
        tags,
      } = req.body;

      if (!title || !slug || !content || !author) {
        return res.status(400).json({ success: false, message: 'Missing required fields' });
      }

      // Validate category
      if (!category_id) {
        return res.status(400).json({ success: false, message: 'Please select a category' });
      }

      const [categoryCheck] = await pool.execute(
        'SELECT id FROM categories WHERE id = ? AND status = 1',
        [category_id]
      );

      if (categoryCheck.length === 0) {
        return res.status(400).json({ success: false, message: 'Invalid or inactive category selected' });
      }

      const clean = (v) => v === undefined ? null : v;

      const [result] = await pool.execute(
        `INSERT INTO blogs (title, slug, description, content, status, image, author, category_id, time_read, tags, created_at) 
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NOW())`,
        [
          clean(title),
          clean(slug),
          clean(description),
          clean(content),
          clean(status),
          clean(image),
          clean(author),
          clean(category_id),
          clean(time_read),
          Array.isArray(tags) ? tags.join(',') : clean(tags),
        ]
      );

      return res.status(201).json({ success: true, id: result.insertId });
    }

    if (req.method === 'PUT') {
      const {
        id,
        title,
        slug,
        description,
        content,
        status,
        image,
        author,
        category_id,
        time_read,
        tags,
      } = req.body;

      if (!id) return res.status(400).json({ success: false, message: 'Blog ID is required' });
      const clean = (v) => v === undefined ? null : v;

      await pool.execute(
        `UPDATE blogs 
        SET title = ?, slug = ?, description = ?, content = ?, status = ?, image = ?, author = ?, category_id = ?, time_read = ?, tags = ?, updated_at = NOW()
        WHERE id = ?`,
        [
          clean(title),
          clean(slug),
          clean(description),
          clean(content),
          clean(status),
          clean(image),
          clean(author),
          clean(category_id),
          clean(time_read),
          clean(Array.isArray(tags) ? tags.join(',') : tags),
          clean(id)
        ]
      );


      return res.status(200).json({ success: true });
    }

    if (req.method === 'DELETE') {
      const { id } = req.query;
      if (!id) return res.status(400).json({ success: false, message: 'Blog ID is required' });

      await pool.execute('DELETE FROM blogs WHERE id = ?', [id]);
      return res.status(200).json({ success: true });
    }

    res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE']);
    return res.status(405).json({ success: false, message: `Method ${req.method} not allowed` });
  } catch (err) {
    console.error('Blog API Error:', err);
    return res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
}

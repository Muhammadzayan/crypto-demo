import pool from '../../../../lib/db';

export default async function handler(req, res) {
  if (req.method === 'PATCH') {
    const { id, status } = req.body;

    if (!id || !status) {
      return res.status(400).json({ success: false, message: 'Missing id or status' });
    }

    try {
      const [result] = await pool.execute(
        'UPDATE blogs SET status = ? WHERE id = ?',
        [status, id]
      );

      if (result.affectedRows > 0) {
        res.json({ success: true });
      } else {
        res.status(404).json({ success: false, message: 'Blog not found' });
      }
    } catch (error) {
      console.error('DB error:', error);
      res.status(500).json({ success: false, message: 'Internal server error' });
    }
  } else {
    res.setHeader('Allow', ['PATCH']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

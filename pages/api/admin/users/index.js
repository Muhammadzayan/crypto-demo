import pool from '../../../../lib/db';

export default async function handler(req, res) {
  
  try {

    if (req.method === 'GET') {
      const [rows] = await pool.execute('SELECT * FROM users WHERE role=\'user\' ORDER BY id DESC');
      return res.status(200).json(rows);
    }

    if (req.method === 'DELETE') {
      const { id } = req.query;
      if (!id) {
        return res.status(400).json({ success: false, message: 'User ID is required' });
      }

      try {
        await pool.execute('DELETE FROM users WHERE id = ?', [id]);
        return res.status(200).json({ success: true });
      } catch (error) {
        if (error.code === 'ER_ROW_IS_REFERENCED_2') {
          return res.status(400).json({
            success: false,
            message: 'This user is linked to other records. Please handle related data first.',
            sqlMessage: error.sqlMessage,
          });
        }
        console.error('Delete User Error:', error);
        return res.status(500).json({ success: false, message: 'Internal server error' });
      }
    }

    res.setHeader('Allow', ['GET', 'DELETE']);
    return res.status(405).json({ success: false, message: `Method ${req.method} not allowed` });

  } catch (err) {
    
    console.error('User API error:', err);
    return res.status(500).json({ success: false, message: 'Internal server error' });
  
  }

}

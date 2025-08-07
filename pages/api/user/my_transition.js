import pool from '../../../lib/db';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ success: false, message: `Method ${req.method} not allowed` });
  }

  const { userId, page = 1, limit = 5 } = req.query;
  const offset = (parseInt(page) - 1) * parseInt(limit);

  if (!userId) {
    return res.status(400).json({ success: false, message: 'Missing userId' });
  }

  try {
    const [countRows] = await pool.execute(
      `SELECT COUNT(*) as count FROM transactions WHERE user_id = ?`,
      [userId]
    );
    const totalCount = countRows[0].count;
    const totalPages = Math.ceil(totalCount / parseInt(limit));

    const [rows] = await pool.execute(
      `SELECT
         transactions.id,
         transactions.type,
         transactions.currency AS token,
         transactions.amount,
         transactions.usd_value AS value,
         transactions.status,
         transactions.created_at AS time,
         aint_bank_payments.payment_proof AS hash
       FROM transactions
       LEFT JOIN aint_bank_payments ON transactions.payment_id = aint_bank_payments.id
       WHERE transactions.user_id = ?
       ORDER BY transactions.created_at DESC
       LIMIT ? OFFSET ?`,
      [userId, parseInt(limit), offset]
    );

    res.status(200).json({
      success: true,
      transactions: rows.map(tx => ({
        ...tx,
        time: new Date(tx.time).toLocaleString(),
        hash: tx.hash || ''
      })),
      totalPages
    });
  } catch (err) {
    console.error('Fetch transaction error:', err);
    res.status(500).json({ success: false, message: 'Server error' });
  }
}

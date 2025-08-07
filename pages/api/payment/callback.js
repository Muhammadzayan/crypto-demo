import pool from '../../../lib/db';
import fetch from 'node-fetch';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { order_id, transaction_status, fraud_status } = req.body;

  if (transaction_status !== 'settlement' || fraud_status !== 'accept') {
    return res.status(200).json({ message: 'No action needed for this status' });
  }

  try {
    // 1️⃣ Get order from DB
    const [rows] = await pool.execute('SELECT * FROM aint_bank_payments WHERE order_id = ?', [order_id]);
    if (!rows.length) return res.status(404).json({ message: 'Order not found' });

    const payment = rows[0];

    if (payment.status === 'completed') {
      return res.status(200).json({ message: 'Already processed' });
    }

    // 2️⃣ Send AINT tokens via OmniCore
    const rpcResponse = await fetch(`http://${process.env.RPC_USER}:${process.env.RPC_PASSWORD}@${process.env.RPC_HOST}:${process.env.RPC_PORT}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        jsonrpc: '1.0',
        id: 'curltest',
        method: 'omni_send',
        params: [
          process.env.ADMIN_WALLET_ADDRESS,
          payment.user_wallet,
          parseInt(process.env.AINT_PROPERTY_ID),
          payment.aint_amount.toString()
        ]
      })
    });

    const result = await rpcResponse.json();

    if (!result.result || result.error) {
      throw new Error(result.error?.message || 'OmniCore transfer failed');
    }

    const txid = result.result;

    // 3️⃣ Update aint_bank_payments
    await pool.execute(
      `UPDATE aint_bank_payments SET status = 'completed', payment_proof = ? WHERE order_id = ?`,
      [txid, order_id]
    );

    // 4️⃣ Update linked transaction (if exists)
    await pool.execute(
      `UPDATE transactions
       SET status = 'completed', description = CONCAT(description, ' | TXID: ', ?)
       WHERE payment_id = ?`,
      [txid, payment.id]
    );

    return res.status(200).json({ message: 'AINT sent successfully', txid });
  } catch (err) {
    console.error('Callback processing failed:', err);
    return res.status(500).json({ message: 'Server error', error: err.message });
  }
}

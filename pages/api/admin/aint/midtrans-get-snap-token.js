import midtransClient from 'midtrans-client';
import pool from '../../../../lib/db';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return res.status(405).json({ success: false, message: `Method ${req.method} not allowed` });
  }

  const { amount, userWalletAddress, user, aintAmount, usdAmount } = req.body;

  if (!amount || !userWalletAddress || !user || !user.name || !user.email || !aintAmount || !usdAmount) {
    return res.status(400).json({ success: false, message: 'Missing required fields' });
  }

  const snap = new midtransClient.Snap({
    isProduction: true,
    serverKey: process.env.MIDTRANS_SERVER_KEY
  });

  const orderId = `ORD-${Date.now()}-${Math.floor(Math.random() * 1000)}`;

  try {
    // Create Midtrans transaction
    const { token: snapToken } = await snap.createTransaction({
      transaction_details: {
        order_id: orderId,
        gross_amount: Math.floor(amount)
      },
      customer_details: {
        first_name: user.name,
        email: user.email
      }
    });

    // Clean helper
    const clean = v => (v == null ? null : typeof v === 'string' ? v.trim() : v);

    const [result] = await pool.execute(
      `INSERT INTO aint_bank_payments
        (amount_usd, aint_amount, bank_name, user_wallet,
         payment_proof, status, created_at, payment_method,
         order_id, snap_token, user_email, user_name, user_id)
       VALUES (?, ?, 'Midtrans', ?, '', 'pending', NOW(), 'midtrans',
               ?, ?, ?, ?,?)`,
      [
        clean(usdAmount),
        clean(aintAmount),
        clean(userWalletAddress),
        orderId,
        snapToken,
        clean(user.email),
        clean(user.name),
        user.id,
      ]
    );

await pool.execute(
  `INSERT INTO transactions
    (user_id, type, currency, amount, usd_value, status,
     description, source_address, destination_address, payment_method, payment_id)
   VALUES (?, 'buy', 'AINT', ?, ?, 'pending',
           ?, ?, ?, ?, ?)`,
  [
    clean(user.id),                    // ✅ FIXED here
    clean(aintAmount),
    clean(usdAmount),
    'Buy AINT via Midtrans',
    null,                              // source_address
    clean(userWalletAddress),
    'Midtrans',
    result.insertId
  ]
);


    return res.status(200).json({ success: true, snapToken, id: result.insertId });
  } catch (err) {
    console.error('Midtrans/DB Error:', {
      error: err,
      orderId,
      user: user?.email,
      amount
    });

    return res.status(500).json({
      success: false,
      message: err.ApiResponse?.error_messages?.join(', ')
        || err.message
        || 'Unknown Server Error'
    });
  }
}

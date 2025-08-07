import { formidable } from 'formidable';
import fs from 'fs';
import path from 'path';
import pool from '../../../../lib/db';

export const config = {
  api: {
    bodyParser: false,
  },
};

const uploadDir = path.join(process.cwd(), '/public/uploads');

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.status(405).json({ success: false, message: `Method ${req.method} not allowed` });
    return;
  }

  const form = formidable({ uploadDir, keepExtensions: true });

  try {
    form.parse(req, async (err, fields, files) => {
      if (err) {
        console.error('Formidable error:', err);
        res.status(500).json({ success: false, message: 'File upload failed' });
        return;
      }

      const { amount, aintAmount, bankName, userWallet, userId} = fields;
      const fileArray = Array.isArray(files.file) ? files.file : [files.file];
      const file = fileArray[0];

      const parsedAmount = parseFloat(Array.isArray(amount) ? amount[0] : amount);
      const parsedAintAmount = parseFloat(Array.isArray(aintAmount) ? aintAmount[0] : aintAmount);
      const bankNameValue = Array.isArray(bankName) ? bankName[0] : bankName;
      const userWalletValue = Array.isArray(userWallet) ? userWallet[0] : userWallet;
      const userIdValue = parseInt(Array.isArray(userId) ? userId[0] : userId);

      if (!file || !file.filepath || isNaN(parsedAmount) || isNaN(parsedAintAmount) || !bankNameValue || !userWalletValue) {
        res.status(400).json({ success: false, message: 'Invalid or missing data' });
        return;
      }

      const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'application/pdf'];
      if (!allowedTypes.includes(file.mimetype)) {
        fs.unlinkSync(file.filepath);
        res.status(400).json({ success: false, message: 'Invalid file type' });
        return;
      }

      const filePath = `/uploads/${path.basename(file.filepath)}`;

      try {
        const [result] = await pool.execute(
          `INSERT INTO aint_bank_payments (amount_usd, user_id, aint_amount, bank_name, user_wallet, payment_proof, payment_method, status, created_at) VALUES (?, ?, ?, ?, ?, ?, ?, 'pending', NOW())`,
          [parsedAmount, userIdValue, parsedAintAmount, bankNameValue, userWalletValue, filePath,'Bank Transfer']
        );

        const bankPaymentId = result.insertId;
                

        // ✅ Insert into transactions
        await pool.execute(
          `INSERT INTO transactions
          (user_id, type, currency, amount, usd_value, status,
            description, source_address, destination_address, payment_method, payment_id)
          VALUES (?, 'buy', 'AINT', ?, ?, 'pending',
                  ?, ?, ?, 'Bank Transfer', ?)`,
          [
            userIdValue,                      // ✅ Fixed here
            parsedAintAmount,
            parsedAmount,
            'Buy AINT via Bank Transfer',
            null,
            userWalletValue,
            bankPaymentId
          ]
        );

        res.status(201).json({ success: true, message: 'Payment submitted', id: result.insertId });
      } catch (dbError) {
        console.error('Database error:', dbError);
        res.status(500).json({ success: false, message: 'Database error', dbError });
      }
    });
  } catch (error) {
    console.error('Unexpected server error:', error);
    res.status(500).json({ success: false, message: 'Unexpected server error' });
  }
}


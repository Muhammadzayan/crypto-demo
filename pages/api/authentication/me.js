// pages/api/authentication/me.js

import jwt from 'jsonwebtoken';
import pool from '../../../lib/db'; // ✅ default import

export default async function handler(req, res) {
    const { token } = req.cookies;

    if (!token) {
        return res.status(401).json({ success: false, message: 'Not authenticated' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const [rows] = await pool.execute('SELECT * FROM users WHERE id = ?', [decoded.id]);

        if (rows.length === 0) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }

        return res.status(200).json({ success: true, user: rows[0] });
    } catch (error) {
        console.error('Auth error:', error.message);
        return res.status(401).json({ success: false, message: 'Invalid token' });
    }
}

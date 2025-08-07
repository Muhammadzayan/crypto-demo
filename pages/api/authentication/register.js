import db from "../../../lib/db";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import * as cookie from "cookie";
// import { omniRpc } from '../../../lib/omnicore'; // ✅ Import OmniCore helper

export default async function handler(req, res) {
	if (req.method !== "POST") {
		return res
			.status(405)
			.json({ message: `Method ${req.method} Not Allowed` });
	}

	const { first_name, last_name, email, password } = req.body;

	if (!first_name || !last_name || !email || !password) {
		return res
			.status(400)
			.json({ success: false, message: "All fields are required." });
	}

	try {
		const [existing] = await db.execute(
			"SELECT id FROM users WHERE email = ?",
			[email]
		);
		if (existing.length > 0) {
			return res
				.status(409)
				.json({ success: false, message: "Email already registered." });
		}

		// ✅ Generate Omni Wallet Address
		// const userWallet = await omniRpc('getnewaddress');

		// ✅ Generate temporary wallet address (without Omnicore)
		const userWallet = `temp_wallet_${Date.now()}_${Math.random()
			.toString(36)
			.substr(2, 9)}`;

		const hashedPassword = await bcrypt.hash(password, 10);
		const full_name = `${first_name} ${last_name}`;
		const role = "user";

		const [result] = await db.execute(
			`INSERT INTO users (first_name, last_name, full_name, role, email, password, decrypt_password, wallet_address, created_at)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
			[
				first_name,
				last_name,
				full_name,
				role,
				email,
				hashedPassword,
				password,
				userWallet,
				new Date(),
			]
		);

		const userId = result.insertId;

		const token = jwt.sign(
			{ id: userId, email, role, first_name, last_name },
			process.env.JWT_SECRET,
			{ expiresIn: "1d" }
		);

		res.setHeader(
			"Set-Cookie",
			cookie.serialize("token", token, {
				httpOnly: true,
				secure: process.env.NODE_ENV === "production",
				maxAge: 60 * 60 * 24,
				path: "/",
			})
		);

		return res
			.status(201)
			.json({
				success: true,
				message: "Registration successful",
				token,
				wallet_address: userWallet,
			});
	} catch (error) {
		console.error("Registration Error:", error); // 🔥 log full error, not just .message
		return res
			.status(500)
			.json({
				success: false,
				message: "Internal Server Error",
				error: error.message,
			});
	}
	//  catch (error) {
	//     console.error('Registration Error:', error.message);
	//     return res.status(500).json({ success: false, message: 'Internal Server Error' });
	//   }
}

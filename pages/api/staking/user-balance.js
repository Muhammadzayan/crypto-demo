import pool from "../../../lib/db";
import fetch from "node-fetch";

export default async function handler(req, res) {
	if (req.method !== "GET") {
		return res
			.status(405)
			.json({ success: false, message: "Method not allowed" });
	}

	const { userId } = req.query;

	if (!userId) {
		return res.status(400).json({
			success: false,
			message: "Missing userId parameter",
		});
	}

	try {
		// Get user's wallet address
		const [userRows] = await pool.execute(
			"SELECT wallet_address FROM users WHERE id = ?",
			[userId]
		);

		if (userRows.length === 0) {
			return res.status(404).json({
				success: false,
				message: "User not found",
			});
		}

		const user = userRows[0];

		if (!user.wallet_address) {
			return res.status(400).json({
				success: false,
				message: "User wallet address not found",
			});
		}

		// Get AINT balance from OmniCore
		let aintBalance = 0;
		try {
			const rpcResponse = await fetch(
				`http://${process.env.RPC_USER}:${process.env.RPC_PASSWORD}@${process.env.RPC_HOST}:${process.env.RPC_PORT}`,
				{
					method: "POST",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify({
						jsonrpc: "1.0",
						id: "curltest",
						method: "omni_getbalance",
						params: [
							user.wallet_address,
							parseInt(process.env.AINT_PROPERTY_ID),
						],
					}),
				}
			);

			const result = await rpcResponse.json();

			if (result.result && result.result.balance) {
				aintBalance = parseFloat(result.result.balance);
			}
		} catch (error) {
			console.error("Error fetching AINT balance from OmniCore:", error);
			// Fallback to 0 if OmniCore is not available
		}

		// Get staking summary
		const [stakeSummary] = await pool.execute(
			`
      SELECT 
        COALESCE(SUM(CASE WHEN status = 'active' THEN amount ELSE 0 END), 0) as total_staked,
        COALESCE(SUM(earned_amount), 0) as total_earned,
        COUNT(CASE WHEN status = 'active' THEN 1 END) as active_stakes
      FROM user_stakes 
      WHERE user_id = ?
    `,
			[userId]
		);

		const summary = stakeSummary[0];

		res.status(200).json({
			success: true,
			balance: {
				available: aintBalance,
				staked: parseFloat(summary.total_staked),
				earned: parseFloat(summary.total_earned),
				activeStakes: summary.active_stakes,
			},
		});
	} catch (error) {
		console.error("Error fetching user balance:", error);
		res.status(500).json({
			success: false,
			message: "Failed to fetch user balance",
		});
	}
}

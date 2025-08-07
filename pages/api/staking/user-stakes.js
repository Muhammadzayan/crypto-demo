import pool from "../../../lib/db";

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
		const [rows] = await pool.execute(
			`
      SELECT 
        us.id,
        us.amount,
        us.apy,
        us.start_date,
        us.end_date,
        us.earned_amount,
        us.status,
        us.transaction_hash,
        sp.name as plan_name,
        sp.duration_months
      FROM user_stakes us
      JOIN staking_plans sp ON us.plan_id = sp.id
      WHERE us.user_id = ?
      ORDER BY us.created_at DESC
    `,
			[userId]
		);

		const stakes = rows.map((stake) => ({
			id: stake.id,
			amount: parseFloat(stake.amount),
			plan: stake.plan_name,
			apy: `${stake.apy}%`,
			startDate: stake.start_date.toISOString().split("T")[0],
			endDate: stake.end_date.toISOString().split("T")[0],
			earned: parseFloat(stake.earned_amount),
			status: stake.status,
			transactionHash: stake.transaction_hash,
			durationMonths: stake.duration_months,
		}));

		// Calculate summary statistics
		const totalStaked = stakes.reduce((sum, stake) => sum + stake.amount, 0);
		const totalEarned = stakes.reduce((sum, stake) => sum + stake.earned, 0);
		const activeStakes = stakes.filter(
			(stake) => stake.status === "active"
		).length;

		res.status(200).json({
			success: true,
			stakes,
			summary: {
				totalStaked,
				totalEarned,
				activeStakes,
			},
		});
	} catch (error) {
		console.error("Error fetching user stakes:", error);
		res.status(500).json({
			success: false,
			message: "Failed to fetch user stakes",
		});
	}
}

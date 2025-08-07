import pool from "../../../lib/db";

export default async function handler(req, res) {
	if (req.method !== "GET") {
		return res
			.status(405)
			.json({ success: false, message: "Method not allowed" });
	}

	try {
		const [rows] = await pool.execute(`
      SELECT 
        id,
        name,
        duration_months,
        apy,
        min_stake,
        max_stake,
        description,
        is_active
      FROM staking_plans 
      WHERE is_active = TRUE 
      ORDER BY duration_months ASC
    `);

		const plans = rows.map((plan) => ({
			id: plan.id,
			name: plan.name,
			duration: `${plan.duration_months} Months`,
			apy: `${plan.apy}%`,
			minStake: parseFloat(plan.min_stake),
			maxStake: plan.max_stake ? parseFloat(plan.max_stake) : null,
			description: plan.description,
			popular: plan.duration_months === 6, // Mark 6 months as popular
		}));

		res.status(200).json({
			success: true,
			plans,
		});
	} catch (error) {
		console.error("Error fetching staking plans:", error);
		res.status(500).json({
			success: false,
			message: "Failed to fetch staking plans",
		});
	}
}

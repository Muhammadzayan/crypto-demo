import pool from "../../../lib/db";

export default async function handler(req, res) {
	if (req.method !== "POST") {
		return res
			.status(405)
			.json({ success: false, message: "Method not allowed" });
	}

	// This endpoint should be called by a cron job or scheduled task
	// You can add authentication/authorization here if needed

	try {
		const connection = await pool.getConnection();
		await connection.beginTransaction();

		try {
			const today = new Date().toISOString().split("T")[0];

			// Get all active stakes
			const [activeStakes] = await connection.execute(`
        SELECT 
          us.id,
          us.user_id,
          us.amount,
          us.apy,
          us.start_date,
          us.end_date,
          us.earned_amount
        FROM user_stakes us
        WHERE us.status = 'active' 
        AND us.start_date <= CURDATE()
        AND us.end_date >= CURDATE()
      `);

			let processedCount = 0;
			let completedCount = 0;

			for (const stake of activeStakes) {
				// Check if reward for today already exists
				const [existingReward] = await connection.execute(
					`
          SELECT id FROM staking_rewards 
          WHERE stake_id = ? AND reward_date = ?
        `,
					[stake.id, today]
				);

				if (existingReward.length > 0) {
					continue; // Reward already calculated for today
				}

				// Calculate daily reward
				const dailyRate = parseFloat(stake.apy) / 100 / 365; // APY to daily rate
				const dailyReward = parseFloat(stake.amount) * dailyRate;

				// Add daily reward
				await connection.execute(
					`
          INSERT INTO staking_rewards (stake_id, user_id, amount, reward_date)
          VALUES (?, ?, ?, ?)
        `,
					[stake.id, stake.user_id, dailyReward, today]
				);

				// Update total earned amount
				await connection.execute(
					`
          UPDATE user_stakes 
          SET earned_amount = earned_amount + ?
          WHERE id = ?
        `,
					[dailyReward, stake.id]
				);

				processedCount++;

				// Check if stake has completed
				if (new Date(stake.end_date) <= new Date()) {
					await connection.execute(
						`
            UPDATE user_stakes 
            SET status = 'completed'
            WHERE id = ?
          `,
						[stake.id]
					);
					completedCount++;
				}
			}

			await connection.commit();

			res.status(200).json({
				success: true,
				message: "Rewards calculated successfully",
				summary: {
					processedStakes: processedCount,
					completedStakes: completedCount,
					date: today,
				},
			});
		} catch (error) {
			await connection.rollback();
			throw error;
		} finally {
			connection.release();
		}
	} catch (error) {
		console.error("Error calculating rewards:", error);
		res.status(500).json({
			success: false,
			message: "Failed to calculate rewards",
		});
	}
}

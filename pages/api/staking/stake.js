import pool from "../../../lib/db";

export default async function handler(req, res) {
	if (req.method !== "POST") {
		return res
			.status(405)
			.json({ success: false, message: "Method not allowed" });
	}

	const { userId, planId, amount } = req.body;

	if (!userId || !planId || !amount) {
		return res.status(400).json({
			success: false,
			message: "Missing required fields: userId, planId, amount",
		});
	}

	try {
		// Start transaction
		const connection = await pool.getConnection();
		await connection.beginTransaction();

		try {
			// 1. Validate staking plan
			const [planRows] = await connection.execute(
				"SELECT * FROM staking_plans WHERE id = ? AND is_active = TRUE",
				[planId]
			);

			if (planRows.length === 0) {
				await connection.rollback();
				return res.status(400).json({
					success: false,
					message: "Invalid staking plan",
				});
			}

			const plan = planRows[0];
			const stakeAmount = parseFloat(amount);

			// 2. Validate amount
			if (stakeAmount < parseFloat(plan.min_stake)) {
				await connection.rollback();
				return res.status(400).json({
					success: false,
					message: `Minimum stake amount is ${plan.min_stake} AINT`,
				});
			}

			if (plan.max_stake && stakeAmount > parseFloat(plan.max_stake)) {
				await connection.rollback();
				return res.status(400).json({
					success: false,
					message: `Maximum stake amount is ${plan.max_stake} AINT`,
				});
			}

			// 3. Check user balance (you'll need to implement this based on your balance system)
			// For now, we'll assume the user has sufficient balance
			// You should integrate this with your actual balance checking logic

			// 4. Calculate end date
			const startDate = new Date();
			const endDate = new Date();
			endDate.setMonth(endDate.getMonth() + plan.duration_months);

			// 5. Create stake record
			const [stakeResult] = await connection.execute(
				`
        INSERT INTO user_stakes 
        (user_id, plan_id, amount, apy, end_date) 
        VALUES (?, ?, ?, ?, ?)
      `,
				[userId, planId, stakeAmount, plan.apy, endDate]
			);

			const stakeId = stakeResult.insertId;

			// 6. Create transaction record (if you have a transactions table)
			// This depends on your existing transaction system
			// await connection.execute(`
			//   INSERT INTO transactions
			//   (user_id, type, amount, currency, status, reference_id)
			//   VALUES (?, 'stake', ?, 'AINT', 'completed', ?)
			// `, [userId, stakeAmount, stakeId]);

			// 7. Deduct from user balance (implement based on your balance system)
			// await connection.execute(`
			//   UPDATE user_balances
			//   SET balance = balance - ?
			//   WHERE user_id = ? AND currency = 'AINT'
			// `, [stakeAmount, userId]);

			await connection.commit();

			res.status(200).json({
				success: true,
				message: "Stake created successfully",
				stake: {
					id: stakeId,
					amount: stakeAmount,
					apy: plan.apy,
					startDate: startDate.toISOString(),
					endDate: endDate.toISOString(),
					status: "active",
				},
			});
		} catch (error) {
			await connection.rollback();
			throw error;
		} finally {
			connection.release();
		}
	} catch (error) {
		console.error("Error creating stake:", error);
		res.status(500).json({
			success: false,
			message: "Failed to create stake",
		});
	}
}

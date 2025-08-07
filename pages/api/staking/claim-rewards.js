import pool from "../../../lib/db";

export default async function handler(req, res) {
	if (req.method !== "POST") {
		return res
			.status(405)
			.json({ success: false, message: "Method not allowed" });
	}

	const { userId, stakeId } = req.body;

	if (!userId || !stakeId) {
		return res.status(400).json({
			success: false,
			message: "Missing required fields: userId, stakeId",
		});
	}

	try {
		// Start transaction
		const connection = await pool.getConnection();
		await connection.beginTransaction();

		try {
			// 1. Get stake details
			const [stakeRows] = await connection.execute(
				`
        SELECT * FROM user_stakes 
        WHERE id = ? AND user_id = ? AND status = 'completed'
      `,
				[stakeId, userId]
			);

			if (stakeRows.length === 0) {
				await connection.rollback();
				return res.status(400).json({
					success: false,
					message: "Stake not found or not eligible for claiming",
				});
			}

			const stake = stakeRows[0];

			// 2. Check if rewards have already been claimed
			if (stake.earned_amount <= 0) {
				await connection.rollback();
				return res.status(400).json({
					success: false,
					message: "No rewards to claim",
				});
			}

			// 3. Calculate total amount to return (stake + rewards)
			const totalAmount =
				parseFloat(stake.amount) + parseFloat(stake.earned_amount);

			// 4. Update stake status to claimed
			await connection.execute(
				`
        UPDATE user_stakes 
        SET status = 'claimed', earned_amount = 0 
        WHERE id = ?
      `,
				[stakeId]
			);

			// 5. Add to user balance (implement based on your balance system)
			// await connection.execute(`
			//   UPDATE user_balances
			//   SET balance = balance + ?
			//   WHERE user_id = ? AND currency = 'AINT'
			// `, [totalAmount, userId]);

			// 6. Create transaction record for claiming
			// await connection.execute(`
			//   INSERT INTO transactions
			//   (user_id, type, amount, currency, status, reference_id, description)
			//   VALUES (?, 'stake_claim', ?, 'AINT', 'completed', ?, 'Staking rewards claimed')
			// `, [userId, totalAmount, stakeId]);

			await connection.commit();

			res.status(200).json({
				success: true,
				message: "Rewards claimed successfully",
				claimed: {
					stakeAmount: parseFloat(stake.amount),
					rewardAmount: parseFloat(stake.earned_amount),
					totalAmount,
				},
			});
		} catch (error) {
			await connection.rollback();
			throw error;
		} finally {
			connection.release();
		}
	} catch (error) {
		console.error("Error claiming rewards:", error);
		res.status(500).json({
			success: false,
			message: "Failed to claim rewards",
		});
	}
}

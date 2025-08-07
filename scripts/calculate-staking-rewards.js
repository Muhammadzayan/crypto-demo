#!/usr/bin/env node

/**
 * Daily Staking Rewards Calculator
 *
 * This script should be run daily via cron job to calculate and distribute
 * staking rewards to all active stakes.
 *
 * Example cron job (runs daily at 00:01):
 * 1 0 * * * /usr/bin/node /path/to/your/project/scripts/calculate-staking-rewards.js
 */

require("dotenv").config({ path: ".env.local" });
const fetch = require("node-fetch");

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";

async function calculateRewards() {
	console.log("Starting daily staking rewards calculation...");
	console.log("Time:", new Date().toISOString());

	try {
		const response = await fetch(
			`${API_BASE_URL}/api/staking/calculate-rewards`,
			{
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				// Add any authentication headers if needed
				// headers: {
				//   'Content-Type': 'application/json',
				//   'Authorization': `Bearer ${process.env.CRON_SECRET_TOKEN}`
				// }
			}
		);

		const data = await response.json();

		if (data.success) {
			console.log("✅ Rewards calculated successfully");
			console.log("📊 Summary:", data.summary);
		} else {
			console.error("❌ Failed to calculate rewards:", data.message);
			process.exit(1);
		}
	} catch (error) {
		console.error("❌ Error calculating rewards:", error.message);
		process.exit(1);
	}
}

// Run the calculation
calculateRewards()
	.then(() => {
		console.log("🎉 Daily rewards calculation completed");
		process.exit(0);
	})
	.catch((error) => {
		console.error("💥 Fatal error:", error);
		process.exit(1);
	});

// init-db.cjs
const mysql = require("mysql2/promise");
require("dotenv").config({ path: ".env.local" });

const pool = mysql.createPool({
	host: process.env.DB_HOST || "localhost",
	user: process.env.DB_USER || "diamapwh_aincore",
	password: process.env.DB_PASSWORD || "5bzmF^OTYq?z",
	database: process.env.DB_NAME || "diamapwh_aincore",
	waitForConnections: true,
	connectionLimit: 10,
	queueLimit: 0,
});

const settingsOperations = {
	async getAllSettings() {
		const [rows] = await pool.execute(
			"SELECT * FROM settings ORDER BY `key` ASC"
		);
		return rows;
	},

	async getSettingByKey(key) {
		const [rows] = await pool.execute(
			"SELECT * FROM settings WHERE `key` = ?",
			[key]
		);
		if (rows.length > 0) {
			try {
				return JSON.parse(rows[0].value);
			} catch {
				return rows[0].value;
			}
		}
		return null;
	},

	async upsertSetting(key, value) {
		const stringValue =
			typeof value === "object" ? JSON.stringify(value) : String(value);
		const [existing] = await pool.execute(
			"SELECT id FROM settings WHERE `key` = ?",
			[key]
		);

		if (existing.length > 0) {
			const [result] = await pool.execute(
				`UPDATE settings SET value = ?, updated_at = NOW() WHERE \`key\` = ?`,
				[stringValue, key]
			);
			return result.affectedRows > 0;
		} else {
			const [result] = await pool.execute(
				`INSERT INTO settings (\`key\`, value, created_at, updated_at) VALUES (?, ?, NOW(), NOW())`,
				[key, stringValue]
			);
			return result.insertId;
		}
	},

	async initializeDefaultSettings() {
		const defaultSettings = {
			site_name: "Aincore Platform",
			site_description: "Your trusted cryptocurrency platform",
			site_url: "https://cryptoplatform.com",
			admin_email: "admin@cryptoplatform.com",
			timezone: "UTC",
			language: "en",
			maintenance_mode: false,
			meta_title: "Crypto Platform - Your Trusted Cryptocurrency Exchange",
			meta_description:
				"Trade, invest, and manage your cryptocurrency portfolio...",
			meta_keywords: "cryptocurrency, bitcoin, ethereum, trading, blockchain",
			google_analytics: "",
			facebook_pixel: "",
			twitter_card: "summary_large_image",
			smtp_host: "",
			smtp_port: "587",
			smtp_username: "",
			smtp_password: "",
			smtp_encryption: "tls",
			from_email: "noreply@cryptoplatform.com",
			from_name: "Crypto Platform",
			social_facebook: "",
			social_twitter: "",
			social_instagram: "",
			social_linkedin: "",
			social_youtube: "",
			social_telegram: "",
			social_discord: "",
		};

		const results = [];
		for (const [key, value] of Object.entries(defaultSettings)) {
			const existing = await this.getSettingByKey(key);
			if (existing === null) {
				const result = await this.upsertSetting(key, value);
				results.push({ key, inserted: !!result });
			}
		}
		return results;
	},
};

async function createStakingTables() {
	try {
		console.log("Creating staking tables...");

		// Create staking_plans table
		await pool.execute(`
			CREATE TABLE IF NOT EXISTS staking_plans (
				id INT AUTO_INCREMENT PRIMARY KEY,
				name VARCHAR(100) NOT NULL,
				duration_months INT NOT NULL,
				apy DECIMAL(5,2) NOT NULL,
				min_stake DECIMAL(18,8) NOT NULL,
				max_stake DECIMAL(18,8),
				description TEXT,
				is_active BOOLEAN DEFAULT TRUE,
				created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
				updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
			)
		`);

		// Create user_stakes table
		await pool.execute(`
			CREATE TABLE IF NOT EXISTS user_stakes (
				id INT AUTO_INCREMENT PRIMARY KEY,
				user_id INT NOT NULL,
				plan_id INT NOT NULL,
				amount DECIMAL(18,8) NOT NULL,
				apy DECIMAL(5,2) NOT NULL,
				start_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
				end_date TIMESTAMP NOT NULL,
				earned_amount DECIMAL(18,8) DEFAULT 0,
				status ENUM('active', 'completed', 'cancelled') DEFAULT 'active',
				transaction_hash VARCHAR(255),
				created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
				updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
				FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
				FOREIGN KEY (plan_id) REFERENCES staking_plans(id) ON DELETE CASCADE
			)
		`);

		// Create staking_rewards table for tracking daily rewards
		await pool.execute(`
			CREATE TABLE IF NOT EXISTS staking_rewards (
				id INT AUTO_INCREMENT PRIMARY KEY,
				stake_id INT NOT NULL,
				user_id INT NOT NULL,
				amount DECIMAL(18,8) NOT NULL,
				reward_date DATE NOT NULL,
				created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
				FOREIGN KEY (stake_id) REFERENCES user_stakes(id) ON DELETE CASCADE,
				FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
				UNIQUE KEY unique_daily_reward (stake_id, reward_date)
			)
		`);

		// Insert default staking plans
		const defaultPlans = [
			{
				name: "3 Months",
				duration_months: 3,
				apy: 8.0,
				min_stake: 100.0,
				max_stake: 10000.0,
				description: "Short-term staking with moderate returns",
			},
			{
				name: "6 Months",
				duration_months: 6,
				apy: 12.0,
				min_stake: 500.0,
				max_stake: 50000.0,
				description: "Recommended plan with balanced risk and reward",
			},
			{
				name: "12 Months",
				duration_months: 12,
				apy: 18.0,
				min_stake: 1000.0,
				max_stake: 100000.0,
				description: "Maximum returns for long-term commitment",
			},
		];

		for (const plan of defaultPlans) {
			await pool.execute(
				`
				INSERT IGNORE INTO staking_plans 
				(name, duration_months, apy, min_stake, max_stake, description) 
				VALUES (?, ?, ?, ?, ?, ?)
			`,
				[
					plan.name,
					plan.duration_months,
					plan.apy,
					plan.min_stake,
					plan.max_stake,
					plan.description,
				]
			);
		}

		console.log("Staking tables created successfully");
	} catch (error) {
		console.error("Error creating staking tables:", error);
		throw error;
	}
}

async function initializeDatabase() {
	try {
		console.log("Initializing database...");

		// Initialize settings
		const results = await settingsOperations.initializeDefaultSettings();
		console.log("Settings initialized:", results);

		// Create staking tables
		await createStakingTables();

		console.log("Database initialized successfully");
		process.exit(0);
	} catch (error) {
		console.error("Database initialization failed:", error);
		process.exit(1);
	}
}

initializeDatabase();

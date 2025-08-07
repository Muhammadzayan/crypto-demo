// test-connection.js
const mysql = require("mysql2/promise");
require("dotenv").config({ path: ".env.local" });

async function testConnection() {
	try {
		console.log("Testing database connection...");
		console.log("DB_HOST:", process.env.DB_HOST);
		console.log("DB_USER:", process.env.DB_USER);
		console.log("DB_NAME:", process.env.DB_NAME);

		const connection = await mysql.createConnection({
			host: process.env.DB_HOST || "localhost",
			user: process.env.DB_USER || "diamapwh_aincore",
			password: process.env.DB_PASSWORD || "5bzmF^OTYq?z",
			database: process.env.DB_NAME || "diamapwh_aincore",
		});

		console.log("✅ Database connection successful!");

		// Test a simple query
		const [rows] = await connection.execute("SELECT 1 as test");
		console.log("✅ Query test successful:", rows);

		// Test if tables exist
		const [tables] = await connection.execute("SHOW TABLES");
		console.log(
			"✅ Tables found:",
			tables.map((t) => Object.values(t)[0])
		);

		await connection.end();
	} catch (error) {
		console.error("❌ Database connection failed:", error.message);
		console.error("Error details:", error);
	}
}

testConnection();

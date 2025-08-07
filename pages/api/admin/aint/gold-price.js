import {
	getAintPrice,
	getPriceDisplayData,
} from "../../../../lib/gold-price-service";

export default async function handler(req, res) {
	try {
		if (req.method === "GET") {
			// Get comprehensive price data
			const priceData = await getPriceDisplayData();

			res.status(200).json({
				success: true,
				data: priceData,
				timestamp: new Date().toISOString(),
			});
		} else {
			res.setHeader("Allow", ["GET"]);
			res.status(405).json({ error: `Method ${req.method} not allowed` });
		}
	} catch (error) {
		console.error("Error in gold price API:", error);
		res.status(500).json({
			success: false,
			error: "Failed to fetch gold price data",
			message: error.message,
		});
	}
}

// Crypto News API - Fetches real-time crypto and financial news
import cryptoNewsImg1 from "../../../assets/frontend/public/images/blogs/blog_post_image_1.webp";
import cryptoNewsImg2 from "../../../assets/frontend/public/images/blogs/blog_post_image_2.webp";
import cryptoNewsImg3 from "../../../assets/frontend/public/images/blogs/blog_post_image_3.webp";
import cryptoNewsImg4 from "../../../assets/frontend/public/images/blogs/blog_post_image_4.webp";
import cryptoNewsImg5 from "../../../assets/frontend/public/images/blogs/blog_post_image_5.webp";
import cryptoNewsImg6 from "../../../assets/frontend/public/images/blogs/blog_post_image_6.webp";

// Fallback news data when API is not available
const fallbackNews = [
	{
		id: "1",
		title: "Bitcoin Surges Past $45,000 as Institutional Adoption Accelerates",
		slug: "bitcoin-surges-past-45000-institutional-adoption",
		screens: cryptoNewsImg1,
		description:
			"Bitcoin has reached a new milestone as institutional investors continue to pour into the cryptocurrency market, driving prices to new heights.",
		author: "CryptoNews Desk",
		authorTitle: "Senior Analyst",
		create_at: new Date().toLocaleDateString("en-US", {
			year: "numeric",
			month: "long",
			day: "numeric",
		}),
		comment: "156",
		thumb: "# Bitcoin",
		blClass: "format-standard-image",
		source: "CryptoNews",
		category: "Bitcoin",
	},
	{
		id: "2",
		title: "Ethereum 2.0 Upgrade Shows Promising Results for DeFi Ecosystem",
		slug: "ethereum-2-upgrade-defi-ecosystem-results",
		screens: cryptoNewsImg2,
		description:
			"The Ethereum network upgrade is demonstrating significant improvements in transaction speed and cost efficiency for decentralized finance applications.",
		author: "DeFi Reporter",
		authorTitle: "Blockchain Specialist",
		create_at: new Date(Date.now() - 86400000).toLocaleDateString("en-US", {
			year: "numeric",
			month: "long",
			day: "numeric",
		}),
		comment: "89",
		thumb: "# Ethereum",
		blClass: "format-standard-image",
		source: "DeFi Pulse",
		category: "Ethereum",
	},
	{
		id: "3",
		title: "Gold-Backed Cryptocurrencies Gain Traction Amid Market Volatility",
		slug: "gold-backed-cryptocurrencies-market-volatility",
		screens: cryptoNewsImg3,
		description:
			"Investors are increasingly turning to gold-backed digital assets as a hedge against traditional market volatility and inflation concerns.",
		author: "Market Analyst",
		authorTitle: "Investment Strategist",
		create_at: new Date(Date.now() - 172800000).toLocaleDateString("en-US", {
			year: "numeric",
			month: "long",
			day: "numeric",
		}),
		comment: "234",
		thumb: "# Gold Crypto",
		blClass: "format-video",
		source: "Financial Times",
		category: "Gold",
	},
	{
		id: "4",
		title: "Central Bank Digital Currencies (CBDCs) Reshape Global Finance",
		slug: "cbdcs-reshape-global-finance",
		screens: cryptoNewsImg4,
		description:
			"Major central banks worldwide are accelerating their CBDC initiatives, potentially revolutionizing cross-border payments and monetary policy.",
		author: "CBDC Expert",
		authorTitle: "Policy Analyst",
		create_at: new Date(Date.now() - 259200000).toLocaleDateString("en-US", {
			year: "numeric",
			month: "long",
			day: "numeric",
		}),
		comment: "95",
		thumb: "# CBDC",
		blClass: "format-standard-image",
		source: "Central Banking",
		category: "CBDC",
	},
	{
		id: "5",
		title: "DeFi Protocols Reach $100 Billion in Total Value Locked",
		slug: "defi-protocols-100-billion-tvl",
		screens: cryptoNewsImg5,
		description:
			"Decentralized finance continues its explosive growth as innovative protocols attract billions in user deposits and trading volume.",
		author: "DeFi Analyst",
		authorTitle: "Protocol Researcher",
		create_at: new Date(Date.now() - 345600000).toLocaleDateString("en-US", {
			year: "numeric",
			month: "long",
			day: "numeric",
		}),
		comment: "95",
		thumb: "# DeFi",
		blClass: "format-standard-image",
		source: "DeFi Llama",
		category: "DeFi",
	},
	{
		id: "6",
		title: "NFT Market Sees Record-Breaking Sales in Digital Art and Gaming",
		slug: "nft-market-record-breaking-sales",
		screens: cryptoNewsImg6,
		description:
			"The NFT ecosystem is experiencing unprecedented growth with major brands and artists entering the digital collectibles space.",
		author: "NFT Specialist",
		authorTitle: "Digital Art Curator",
		create_at: new Date(Date.now() - 432000000).toLocaleDateString("en-US", {
			year: "numeric",
			month: "long",
			day: "numeric",
		}),
		comment: "95",
		thumb: "# NFT",
		blClass: "format-standard-image",
		source: "NFT News",
		category: "NFT",
	},
];

// Function to fetch real crypto news from APIs
async function fetchCryptoNews() {
	try {
		// Try to fetch from real APIs first
		const { getCachedNews } = await import("../../../lib/news-api.js");
		const realNews = await getCachedNews();

		console.log("realNews", realNews);

		// If we get real news, use it; otherwise fall back to mock data
		if (realNews && realNews.length > 0) {
			console.log("Using real news data:", realNews.length, "articles");
			// Map real news data to include screens field for compatibility
			const mappedNews = realNews.map((news) => ({
				...news,
				screens: news.image || "/images/blogs/blog_post_image_1.webp", // Use real image or fallback
			}));
			return mappedNews;
		}

		console.log("Using fallback news data");
		return fallbackNews;
	} catch (error) {
		console.error("Error fetching crypto news:", error);
		return fallbackNews;
	}
}

// API endpoint handler
export default async function handler(req, res) {
	if (req.method === "GET") {
		try {
			const news = await fetchCryptoNews();
			res.status(200).json(news);
		} catch (error) {
			console.error("Crypto news API error:", error);
			res.status(500).json({ error: "Failed to fetch news" });
		}
	} else {
		res.setHeader("Allow", ["GET"]);
		res.status(405).json({ error: `Method ${req.method} not allowed` });
	}
}

// Export for direct import
export { fallbackNews as cryptoNews };

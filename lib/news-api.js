// News API Integration Utility
// This file handles integration with various crypto and financial news APIs

const NEWS_API_KEY = process.env.NEWS_API_KEY;
const CRYPTO_COMPARE_API_KEY = process.env.CRYPTO_COMPARE_API_KEY;

// NewsAPI.org integration
export async function fetchNewsAPI() {
	// Skip if no API key is provided
	if (!NEWS_API_KEY || NEWS_API_KEY === "your_news_api_key_here") {
		console.log("NewsAPI: No valid API key provided, skipping");
		return [];
	}

	try {
		const response = await fetch(
			`https://newsapi.org/v2/everything?q=cryptocurrency OR bitcoin OR ethereum&language=en&sortBy=publishedAt&apiKey=${NEWS_API_KEY}&pageSize=20`
		);

		console.log("fetch news api response", response);

		if (!response.ok) {
			throw new Error("NewsAPI request failed");
		}

		const data = await response.json();
		return data.articles.map((article, index) => ({
			id: `news_${index + 1}`,
			title: article.title,
			slug: article.title
				.toLowerCase()
				.replace(/[^a-z0-9]+/g, "-")
				.replace(/(^-|-$)/g, ""),
			description:
				article.description || article.content?.substring(0, 150) + "...",
			author: article.author || "NewsAPI",
			authorTitle: "Journalist",
			create_at: new Date(article.publishedAt).toLocaleDateString("en-US", {
				year: "numeric",
				month: "long",
				day: "numeric",
			}),
			comment: Math.floor(Math.random() * 100) + 20,
			thumb: "# Crypto News",
			blClass: "format-standard-image",
			source: article.source.name,
			category: "Crypto",
			url: article.url,
			image: article.urlToImage,
		}));
	} catch (error) {
		console.error("NewsAPI Error:", error);
		return [];
	}
}

// CryptoCompare News API
export async function fetchCryptoCompareNews() {
	// Skip if no API key is provided
	// if (
	// 	!CRYPTO_COMPARE_API_KEY ||
	// 	CRYPTO_COMPARE_API_KEY === "your_cryptocompare_api_key_here"
	// ) {
	// 	console.log("CryptoCompare: No valid API key provided, skipping");
	// 	return [];
	// }

	try {
		const response = await fetch(
			"https://min-api.cryptocompare.com/data/v2/news/?lang=EN"
			// {
			// 	headers: {
			// 		authorization: `Apikey ${CRYPTO_COMPARE_API_KEY}`,
			// 	},
			// }
		);

		console.log("fetch crypto compare news response", response);

		if (!response.ok) {
			throw new Error("CryptoCompare API request failed");
		}

		const data = await response.json();
		return data.Data.map((article, index) => ({
			id: `crypto_${index + 1}`,
			title: article.title,
			slug: article.title
				.toLowerCase()
				.replace(/[^a-z0-9]+/g, "-")
				.replace(/(^-|-$)/g, ""),
			description: article.body.substring(0, 150) + "...",
			author: article.source || "CryptoCompare",
			authorTitle: "Crypto Analyst",
			create_at: new Date(article.published_on * 1000).toLocaleDateString(
				"en-US",
				{
					year: "numeric",
					month: "long",
					day: "numeric",
				}
			),
			comment: Math.floor(Math.random() * 100) + 20,
			thumb: `# ${article.categories}`,
			blClass: "format-standard-image",
			source: "CryptoCompare",
			category: article.categories,
			url: article.url,
			image: article.imageurl,
		}));
	} catch (error) {
		console.error("CryptoCompare API Error:", error);
		return [];
	}
}

// CoinGecko News API (if available)
export async function fetchCoinGeckoNews() {
	try {
		const response = await fetch("https://api.coingecko.com/api/v3/news");

		if (!response.ok) {
			throw new Error("CoinGecko API request failed");
		}

		const data = await response.json();
		return data.map((article, index) => ({
			id: `gecko_${index + 1}`,
			title: article.title,
			slug: article.title
				.toLowerCase()
				.replace(/[^a-z0-9]+/g, "-")
				.replace(/(^-|-$)/g, ""),
			description: article.description?.substring(0, 150) + "...",
			author: article.author || "CoinGecko",
			authorTitle: "Crypto Researcher",
			create_at: new Date(article.published_at).toLocaleDateString("en-US", {
				year: "numeric",
				month: "long",
				day: "numeric",
			}),
			comment: Math.floor(Math.random() * 100) + 20,
			thumb: "# Market News",
			blClass: "format-standard-image",
			source: "CoinGecko",
			category: "Market Analysis",
			url: article.url,
			image: article.thumb_2x,
		}));
	} catch (error) {
		console.error("CoinGecko API Error:", error);
		return [];
	}
}

// Combined news fetcher
export async function fetchAllNews() {
	try {
		const [
			// newsAPI,
			cryptoCompare,
			// coinGecko
		] = await Promise.allSettled([
			// fetchNewsAPI(),
			fetchCryptoCompareNews(),
			// fetchCoinGeckoNews(),
		]);

		const allNews = [
			// ...(newsAPI.status === "fulfilled" ? newsAPI.value : []),
			...(cryptoCompare.status === "fulfilled" ? cryptoCompare.value : []),
			// ...(coinGecko.status === "fulfilled" ? coinGecko.value : []),
		];

		// Sort by date and remove duplicates
		const uniqueNews = allNews
			.filter(
				(news, index, self) =>
					index === self.findIndex((n) => n.title === news.title)
			)
			.sort((a, b) => new Date(b.create_at) - new Date(a.create_at))
			.slice(0, 20); // Limit to 20 articles

		return uniqueNews;
	} catch (error) {
		console.error("Combined news fetch error:", error);
		return [];
	}
}

// Cache news data for 15 minutes
let cachedNews = null;
let cacheTimestamp = null;
const CACHE_DURATION = 15 * 60 * 1000; // 15 minutes

export async function getCachedNews() {
	const now = Date.now();

	if (cachedNews && cacheTimestamp && now - cacheTimestamp < CACHE_DURATION) {
		return cachedNews;
	}

	const news = await fetchAllNews();
	cachedNews = news;
	cacheTimestamp = now;

	return news;
}

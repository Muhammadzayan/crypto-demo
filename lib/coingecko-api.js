// CoinGecko API Service for Real-time Crypto Data
// This service provides live cryptocurrency data for trending tokens and market information

const COINGECKO_BASE_URL = "https://api.coingecko.com/api/v3";

// Cache for API responses
let cache = new Map();
const CACHE_DURATION = 2 * 60 * 1000; // 2 minutes

/**
 * Make a request to CoinGecko API with error handling and caching
 */
async function makeRequest(endpoint, params = {}) {
	try {
		const url = new URL(`${COINGECKO_BASE_URL}${endpoint}`);

		// Add parameters to URL
		Object.keys(params).forEach((key) => {
			url.searchParams.append(key, params[key]);
		});

		const response = await fetch(url.toString(), {
			method: "GET",
			headers: {
				"User-Agent":
					"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
				"x-cg-demo-api-key": process.env.NEXT_PUBLIC_COINGECKO_API_KEY,
			},
		});

		if (!response.ok) {
			throw new Error(
				`CoinGecko API error: ${response.status} ${response.statusText}`
			);
		}

		return await response.json();
	} catch (error) {
		console.error("CoinGecko API request failed:", error);
		throw error;
	}
}

/**
 * Get cached data or fetch from API
 */
function getCachedData(key) {
	const cached = cache.get(key);
	if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
		return cached.data;
	}
	return null;
}

/**
 * Set cached data
 */
function setCachedData(key, data) {
	cache.set(key, {
		data,
		timestamp: Date.now(),
	});
}

/**
 * Get trending tokens from CoinGecko
 */
export async function getTrendingTokens() {
	const cacheKey = "trending_tokens";
	const cached = getCachedData(cacheKey);

	if (cached) {
		return cached;
	}

	try {
		const data = await makeRequest("/search/trending");

		const trendingTokens = data.coins.map((coin, index) => ({
			id: coin.item.id,
			symbol: coin.item.symbol.toUpperCase(),
			name: coin.item.name,
			price: coin.item.price_btc,
			change: 0, // Will be updated with price data
			changePercent: 0, // Will be updated with price data
			volume: coin.item.volume_24h || 0,
			marketCap: coin.item.market_cap_rank || 0,
			image: coin.item.thumb,
			trending: true,
			rank: index + 1,
			price_change_24h: coin.item.price_change_percentage_24h || 0,
		}));

		setCachedData(cacheKey, trendingTokens);
		return trendingTokens;
	} catch (error) {
		console.error("Failed to fetch trending tokens:", error);
		return [];
	}
}

/**
 * Get top cryptocurrencies by market cap
 */
export async function getTopCryptocurrencies(limit = 100, page = 1) {
	const cacheKey = `top_crypto_${limit}_${page}`;
	const cached = getCachedData(cacheKey);

	if (cached) {
		return cached;
	}

	try {
		const data = await makeRequest("/coins/markets", {
			vs_currency: "usd",
			order: "market_cap_desc",
			per_page: limit,
			page: page,
			sparkline: false,
			price_change_percentage: "1h,24h,7d",
		});

		console.log("Raw CoinGecko response:", data);
		console.log("First coin sample:", data[0]);

		const cryptocurrencies = data.map((coin, index) => ({
			id: coin.id,
			symbol: coin.symbol.toUpperCase(),
			name: coin.name,
			current_price: coin.current_price, // This is the key field we need
			price: coin.current_price,
			change: coin.price_change_24h,
			changePercent: coin.price_change_percentage_24h,
			price_change_percentage_24h: coin.price_change_percentage_24h, // Add this for chart compatibility
			total_volume: coin.total_volume,
			volume: coin.total_volume,
			market_cap: coin.market_cap,
			marketCap: coin.market_cap,
			image: coin.image,
			trending: coin.price_change_percentage_24h > 5, // Trending if > 5% gain
			rank: coin.market_cap_rank,
			price_change_percentage_1h_in_currency:
				coin.price_change_percentage_1h_in_currency,
			price_change_1h: coin.price_change_percentage_1h_in_currency,
			price_change_percentage_7d_in_currency:
				coin.price_change_percentage_7d_in_currency,
			price_change_7d: coin.price_change_percentage_7d_in_currency,
			ath: coin.ath,
			ath_change_percentage: coin.ath_change_percentage,
			atl: coin.atl,
			atl_change_percentage: coin.atl_change_percentage,
		}));

		setCachedData(cacheKey, cryptocurrencies);
		return cryptocurrencies;
	} catch (error) {
		console.error("Failed to fetch top cryptocurrencies:", error);
		return [];
	}
}

/**
 * Get market overview data
 */
export async function getMarketOverview() {
	const cacheKey = "market_overview";
	const cached = getCachedData(cacheKey);

	if (cached) {
		return cached;
	}

	try {
		const data = await makeRequest("/global");

		const overview = {
			totalMarketCap: data.data.total_market_cap.usd,
			totalVolume: data.data.total_volume.usd,
			btcDominance: data.data.market_cap_percentage.btc,
			activeCryptos: data.data.active_cryptocurrencies,
			marketCapChange24h: data.data.market_cap_change_percentage_24h_usd,
			volumeChange24h: data.data.total_volume.usd,
			marketCapRank: data.data.market_cap_rank,
		};

		setCachedData(cacheKey, overview);
		return overview;
	} catch (error) {
		console.error("Failed to fetch market overview:", error);
		return {
			totalMarketCap: 0,
			totalVolume: 0,
			btcDominance: 0,
			activeCryptos: 0,
			marketCapChange24h: 0,
			volumeChange24h: 0,
			marketCapRank: {},
		};
	}
}

/**
 * Get specific coin data by ID
 */
export async function getCoinData(coinId) {
	const cacheKey = `coin_${coinId}`;
	const cached = getCachedData(cacheKey);

	if (cached) {
		return cached;
	}

	try {
		const data = await makeRequest(`/coins/${coinId}`, {
			localization: false,
			tickers: false,
			market_data: true,
			community_data: false,
			developer_data: false,
			sparkline: false,
		});

		const coinData = {
			id: data.id,
			symbol: data.symbol.toUpperCase(),
			name: data.name,
			price: data.market_data.current_price.usd,
			change: data.market_data.price_change_24h,
			changePercent: data.market_data.price_change_percentage_24h,
			volume: data.market_data.total_volume.usd,
			marketCap: data.market_data.market_cap.usd,
			image: data.image.large,
			description: data.description.en,
			ath: data.market_data.ath.usd,
			athDate: data.market_data.ath_date.usd,
			atl: data.market_data.atl.usd,
			atlDate: data.market_data.atl_date.usd,
			circulatingSupply: data.market_data.circulating_supply,
			totalSupply: data.market_data.total_supply,
			maxSupply: data.market_data.max_supply,
		};

		setCachedData(cacheKey, coinData);
		return coinData;
	} catch (error) {
		console.error(`Failed to fetch coin data for ${coinId}:`, error);
		return null;
	}
}

/**
 * Get top gainers and losers
 */
export async function getTopGainersLosers(limit = 10) {
	const cacheKey = `gainers_losers_${limit}`;
	const cached = getCachedData(cacheKey);

	if (cached) {
		return cached;
	}

	try {
		const data = await makeRequest("/coins/markets", {
			vs_currency: "usd",
			order: "price_change_percentage_24h_desc",
			per_page: limit * 2, // Get more to filter
			page: 1,
			sparkline: false,
			price_change_percentage: "24h",
		});

		const gainers = data
			.filter((coin) => coin.price_change_percentage_24h > 0)
			.slice(0, limit)
			.map((coin) => ({
				id: coin.id,
				symbol: coin.symbol.toUpperCase(),
				name: coin.name,
				price: coin.current_price,
				changePercent: coin.price_change_percentage_24h,
				image: coin.image,
			}));

		const losers = data
			.filter((coin) => coin.price_change_percentage_24h < 0)
			.slice(0, limit)
			.map((coin) => ({
				id: coin.id,
				symbol: coin.symbol.toUpperCase(),
				name: coin.name,
				price: coin.current_price,
				changePercent: coin.price_change_percentage_24h,
				image: coin.image,
			}));

		const result = { gainers, losers };
		setCachedData(cacheKey, result);
		return result;
	} catch (error) {
		console.error("Failed to fetch gainers/losers:", error);
		return { gainers: [], losers: [] };
	}
}

/**
 * Get historical price data for charts
 */
export async function getHistoricalData(coinId, days = 7, currency = "usd") {
	const cacheKey = `historical_${coinId}_${days}_${currency}`;
	const cached = getCachedData(cacheKey);

	if (cached) {
		return cached;
	}

	try {
		const data = await makeRequest(`/coins/${coinId}/market_chart`, {
			vs_currency: currency,
			days: days,
		});

		const historicalData = data.prices.map(([timestamp, price]) => ({
			time: new Date(timestamp).toISOString(),
			price: price,
			volume: data.total_volumes.find(([t]) => t === timestamp)?.[1] || 0,
		}));

		setCachedData(cacheKey, historicalData);
		return historicalData;
	} catch (error) {
		console.error(`Failed to fetch historical data for ${coinId}:`, error);
		return [];
	}
}

/**
 * Clear cache
 */
export function clearCache() {
	cache.clear();
}

/**
 * Get cache statistics
 */
export function getCacheStats() {
	return {
		size: cache.size,
		entries: Array.from(cache.keys()),
	};
}

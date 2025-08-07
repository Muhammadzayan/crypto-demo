// Centralized Gold Price Service for AINT and GAG Tokens
// This service ensures consistent pricing across all platform features

const AINT_WEIGHT_IN_GRAMS = 4.25; // AINT is pegged to 4.25 grams of gold
const GAG_WEIGHT_IN_GRAMS = 4.25; // GAG is pegged to 4.25 grams of gold (same as AINT)

// CoinGecko API for PAX Gold price (free, no API key required)
// PAX Gold (PAXG) is a gold-backed token that tracks real gold prices
const COINGECKO_GOLD_API_URL =
	"https://api.coingecko.com/api/v3/simple/price?ids=pax-gold&vs_currencies=usd";

// Mock gold price data (fallback when API fails)
const MOCK_GOLD_PRICE_PER_OUNCE = 2050.0; // USD per ounce (realistic current price)
const MOCK_GOLD_PRICE_PER_GRAM = MOCK_GOLD_PRICE_PER_OUNCE / 31.1035; // Convert to per gram

// Cache for gold price data
let cachedGoldPrice = null;
let cacheTimestamp = null;
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

/**
 * Get mock gold price data
 */
function getMockGoldPrice() {
	return {
		pricePerGram: parseFloat(MOCK_GOLD_PRICE_PER_GRAM.toFixed(2)),
		pricePerOunce: parseFloat(MOCK_GOLD_PRICE_PER_OUNCE.toFixed(2)),
		timestamp: Date.now(),
		source: "Mock Data",
	};
}

/**
 * Fetch real-time gold price from CoinGecko API (PAX Gold)
 */
async function fetchGoldPriceFromAPI() {
	try {
		const response = await fetch(COINGECKO_GOLD_API_URL);

		if (!response.ok) {
			throw new Error(
				`CoinGecko API responded with status: ${response.status}`
			);
		}

		const data = await response.json();

		if (data && data["pax-gold"] && data["pax-gold"].usd) {
			const goldPricePerOunce = data["pax-gold"].usd;
			// Convert to USD per gram (1 ounce = 31.1035 grams)
			const goldPricePerGram = goldPricePerOunce / 31.1035;

			return {
				pricePerGram: parseFloat(goldPricePerGram.toFixed(2)),
				pricePerOunce: parseFloat(goldPricePerOunce.toFixed(2)),
				timestamp: Date.now(),
				source: "CoinGecko API (PAX Gold)",
			};
		} else {
			throw new Error("Invalid CoinGecko API response format");
		}
	} catch (error) {
		console.error("Error fetching gold price from CoinGecko API:", error);
		throw error;
	}
}

/**
 * Get cached gold price or fetch from API/mock
 */
async function getGoldPrice() {
	const now = Date.now();

	// Return cached price if still valid
	if (
		cachedGoldPrice &&
		cacheTimestamp &&
		now - cacheTimestamp < CACHE_DURATION
	) {
		return cachedGoldPrice;
	}

	// Try CoinGecko API first, fallback to mock data
	let goldPriceData;

	try {
		goldPriceData = await fetchGoldPriceFromAPI();
		console.log("✅ Gold price fetched from CoinGecko API (PAX Gold)");
	} catch (error) {
		console.warn("⚠️ CoinGecko API failed, using mock data:", error.message);
		goldPriceData = getMockGoldPrice();
	}

	// Update cache
	cachedGoldPrice = goldPriceData;
	cacheTimestamp = now;

	return goldPriceData;
}

/**
 * Calculate AINT price based on current gold price
 */
async function getAintPrice() {
	const goldPriceData = await getGoldPrice();
	const aintPrice = goldPriceData.pricePerGram * AINT_WEIGHT_IN_GRAMS;

	return {
		price: parseFloat(aintPrice.toFixed(2)),
		goldPricePerGram: goldPriceData.pricePerGram,
		goldWeight: AINT_WEIGHT_IN_GRAMS,
		timestamp: goldPriceData.timestamp,
		source: goldPriceData.source,
	};
}

/**
 * Calculate GAG price based on current gold price (same as AINT)
 */
async function getGagPrice() {
	const goldPriceData = await getGoldPrice();
	const gagPrice = goldPriceData.pricePerGram * GAG_WEIGHT_IN_GRAMS;

	return {
		price: parseFloat(gagPrice.toFixed(2)),
		goldPricePerGram: goldPriceData.pricePerGram,
		goldWeight: GAG_WEIGHT_IN_GRAMS,
		timestamp: goldPriceData.timestamp,
		source: goldPriceData.source,
	};
}

/**
 * Calculate AINT amount from USD amount
 */
async function calculateAintFromUSD(usdAmount) {
	const aintPriceData = await getAintPrice();
	const aintAmount = parseFloat(usdAmount) / aintPriceData.price;
	return parseFloat(aintAmount.toFixed(6));
}

/**
 * Calculate GAG amount from USD amount
 */
async function calculateGagFromUSD(usdAmount) {
	const gagPriceData = await getGagPrice();
	const gagAmount = parseFloat(usdAmount) / gagPriceData.price;
	return parseFloat(gagAmount.toFixed(6));
}

/**
 * Calculate USD amount from AINT amount
 */
async function calculateUSDFromAint(aintAmount) {
	const aintPriceData = await getAintPrice();
	const usdAmount = parseFloat(aintAmount) * aintPriceData.price;
	return parseFloat(usdAmount.toFixed(2));
}

/**
 * Calculate USD amount from GAG amount
 */
async function calculateUSDFromGag(gagAmount) {
	const gagPriceData = await getGagPrice();
	const usdAmount = parseFloat(gagAmount) * gagPriceData.price;
	return parseFloat(usdAmount.toFixed(2));
}

/**
 * Get gold weight equivalent for AINT amount
 */
function calculateGoldWeight(aintAmount) {
	return parseFloat(aintAmount) * AINT_WEIGHT_IN_GRAMS;
}

/**
 * Get gold weight equivalent for GAG amount
 */
function calculateGoldWeightGag(gagAmount) {
	return parseFloat(gagAmount) * GAG_WEIGHT_IN_GRAMS;
}

/**
 * Format price for display
 */
function formatPrice(price, currency = "USD") {
	return new Intl.NumberFormat("en-US", {
		style: "currency",
		currency: currency,
		minimumFractionDigits: 2,
		maximumFractionDigits: 2,
	}).format(price);
}

/**
 * Get price data for display components
 */
async function getPriceDisplayData() {
	const aintPriceData = await getAintPrice();
	const gagPriceData = await getGagPrice();

	return {
		aintPrice: aintPriceData.price,
		aintPriceFormatted: formatPrice(aintPriceData.price),
		gagPrice: gagPriceData.price,
		gagPriceFormatted: formatPrice(gagPriceData.price),
		goldPricePerGram: aintPriceData.goldPricePerGram,
		goldPricePerGramFormatted: formatPrice(aintPriceData.goldPricePerGram),
		goldWeight: aintPriceData.goldWeight,
		lastUpdated: new Date(aintPriceData.timestamp).toLocaleTimeString(),
		isLive: true,
	};
}

/**
 * Force refresh of gold price cache
 */
async function refreshGoldPrice() {
	cachedGoldPrice = null;
	cacheTimestamp = null;
	return await getGoldPrice();
}

// Export all functions
export {
	getGoldPrice,
	getAintPrice,
	getGagPrice,
	calculateAintFromUSD,
	calculateGagFromUSD,
	calculateUSDFromAint,
	calculateUSDFromGag,
	calculateGoldWeight,
	calculateGoldWeightGag,
	formatPrice,
	getPriceDisplayData,
	refreshGoldPrice,
	AINT_WEIGHT_IN_GRAMS,
	GAG_WEIGHT_IN_GRAMS,
};

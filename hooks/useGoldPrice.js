import { useState, useEffect, useCallback } from "react";
import {
	getAintPrice,
	getGagPrice,
	getPriceDisplayData,
	calculateAintFromUSD,
	calculateGagFromUSD,
	calculateUSDFromAint,
	calculateUSDFromGag,
	calculateGoldWeight,
	calculateGoldWeightGag,
	refreshGoldPrice,
} from "../lib/gold-price-service";

/**
 * React hook for accessing gold price and AINT pricing data
 */
export function useGoldPrice() {
	const [priceData, setPriceData] = useState(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);
	const [lastUpdate, setLastUpdate] = useState(null);

	// Fetch price data
	const fetchPriceData = useCallback(async () => {
		try {
			setLoading(true);
			setError(null);

			const data = await getPriceDisplayData();
			setPriceData(data);
			setLastUpdate(new Date());
		} catch (err) {
			console.error("Error fetching price data:", err);
			setError(err.message);
		} finally {
			setLoading(false);
		}
	}, []);

	// Initial fetch
	useEffect(() => {
		fetchPriceData();
	}, [fetchPriceData]);

	// Auto-refresh every 5 minutes
	useEffect(() => {
		const interval = setInterval(fetchPriceData, 5 * 60 * 1000);
		return () => clearInterval(interval);
	}, [fetchPriceData]);

	// Manual refresh function
	const refresh = useCallback(async () => {
		try {
			await refreshGoldPrice();
			await fetchPriceData();
		} catch (err) {
			console.error("Error refreshing price data:", err);
			setError(err.message);
		}
	}, [fetchPriceData]);

	// Calculate AINT from USD
	const calculateAint = useCallback(async (usdAmount) => {
		try {
			return await calculateAintFromUSD(usdAmount);
		} catch (err) {
			console.error("Error calculating AINT amount:", err);
			throw err;
		}
	}, []);

	// Calculate GAG from USD
	const calculateGag = useCallback(async (usdAmount) => {
		try {
			return await calculateGagFromUSD(usdAmount);
		} catch (err) {
			console.error("Error calculating GAG amount:", err);
			throw err;
		}
	}, []);

	// Calculate USD from AINT
	const calculateUSD = useCallback(async (aintAmount) => {
		try {
			return await calculateUSDFromAint(aintAmount);
		} catch (err) {
			console.error("Error calculating USD amount:", err);
			throw err;
		}
	}, []);

	// Calculate USD from GAG
	const calculateUSDFromGag = useCallback(async (gagAmount) => {
		try {
			return await calculateUSDFromGag(gagAmount);
		} catch (err) {
			console.error("Error calculating USD amount from GAG:", err);
			throw err;
		}
	}, []);

	// Calculate gold weight for AINT
	const getGoldWeight = useCallback((aintAmount) => {
		return calculateGoldWeight(aintAmount);
	}, []);

	// Calculate gold weight for GAG
	const getGoldWeightGag = useCallback((gagAmount) => {
		return calculateGoldWeightGag(gagAmount);
	}, []);

	return {
		// Price data
		aintPrice: priceData?.aintPrice || 0,
		aintPriceFormatted: priceData?.aintPriceFormatted || "$0.00",
		gagPrice: priceData?.gagPrice || 0,
		gagPriceFormatted: priceData?.gagPriceFormatted || "$0.00",
		goldPricePerGram: priceData?.goldPricePerGram || 0,
		goldPricePerGramFormatted: priceData?.goldPricePerGramFormatted || "$0.00",
		goldWeight: priceData?.goldWeight || 4.25,
		lastUpdated: priceData?.lastUpdated || "",
		isLive: priceData?.isLive || false,

		// State
		loading,
		error,
		lastUpdate,

		// Functions
		refresh,
		calculateAint,
		calculateGag,
		calculateUSD,
		calculateUSDFromGag,
		getGoldWeight,
		getGoldWeightGag,
	};
}

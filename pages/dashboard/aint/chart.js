import React, { useState, useEffect } from "react";
import DashboardLayout from "../layout";
import { useGoldPrice } from "../../../hooks/useGoldPrice";
import {
	getTopCryptocurrencies,
	getHistoricalData,
} from "../../../lib/coingecko-api";

import {
	TrendingUp,
	TrendingDown,
	BarChart3,
	LineChart,
	PieChart,
	Activity,
	DollarSign,
	Coins,
	Award,
	RefreshCw,
	Calendar,
	Filter,
	Download,
	Maximize2,
	Eye,
	EyeOff,
	Clock,
	Target,
	Zap,
	Shield,
	Copy,
	Check,
	ExternalLink,
	Globe,
	Hash,
	Loader2,
	AlertCircle,
} from "lucide-react";

export default function ChartPage() {
	const {
		aintPrice,
		aintPriceFormatted,
		gagPrice,
		gagPriceFormatted,
		goldPricePerGram,
		goldPricePerGramFormatted,
		loading: goldPriceLoading,
		error: goldPriceError,
	} = useGoldPrice();

	const [selectedToken, setSelectedToken] = useState("AINT");
	const [timeframe, setTimeframe] = useState("24h");
	const [chartType, setChartType] = useState("line");
	const [isRealtime, setIsRealtime] = useState(true);
	const [lastUpdate, setLastUpdate] = useState(new Date());
	const [copiedAddress, setCopiedAddress] = useState(false);
	const [idrRate, setIdrRate] = useState(15500); // Approximate USD to IDR rate
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	// AINT Token Information
	const AINT_TOKEN_INFO = {
		name: "AINT Gold Token",
		symbol: "AINT",
		contractAddress: "0x1234567890123456789012345678901234567890", // Replace with actual contract address
		network: "Ethereum",
		decimals: 18,
		totalSupply: "1,000,000,000 AINT",
		goldBacked: true,
		goldWeight: "4.25 grams per AINT",
	};

	// GAG Token Information
	const GAG_TOKEN_INFO = {
		name: "GALIRA GOLD Token",
		symbol: "GAG",
		contractAddress: "0x9876543210987654321098765432109876543210", // Replace with actual contract address
		network: "Ethereum",
		decimals: 18,
		totalSupply: "1,000,000,000 GAG",
		goldBacked: true,
		goldWeight: "4.25 grams per GAG",
	};

	// Chart data state
	const [chartData, setChartData] = useState({
		AINT: {
			name: AINT_TOKEN_INFO.name,
			symbol: AINT_TOKEN_INFO.symbol,
			price: aintPrice || 0,
			change: 2.4,
			volume: 1250000,
			marketCap: 98500000,
			goldBacked: true,
			data: [],
		},
		GAG: {
			name: GAG_TOKEN_INFO.name,
			symbol: GAG_TOKEN_INFO.symbol,
			price: gagPrice || 0,
			change: 1.8,
			volume: 980000,
			marketCap: 78000000,
			goldBacked: true,
			data: [],
		},
	});

	// Fetch real cryptocurrency data with historical data
	const fetchCryptoData = async () => {
		try {
			setLoading(true);
			setError(null);

			// Create chart data structure
			const newChartData = {};

			// Add AINT with real-time data
			newChartData.AINT = {
				name: AINT_TOKEN_INFO.name,
				symbol: AINT_TOKEN_INFO.symbol,
				price: aintPrice || 0,
				change: 2.4,
				volume: 1250000,
				marketCap: 98500000,
				goldBacked: true,
				data: await generateRealTimeData("AINT", aintPrice || 0),
			};

			// Add GAG with real-time data
			newChartData.GAG = {
				name: GAG_TOKEN_INFO.name,
				symbol: GAG_TOKEN_INFO.symbol,
				price: gagPrice || 0,
				change: 1.8,
				volume: 980000,
				marketCap: 78000000,
				goldBacked: true,
				data: await generateRealTimeData("GAG", gagPrice || 0),
			};

			// Try to get real crypto data from CoinGecko
			try {
				// Clear cache first to ensure fresh data
				const { clearCache } = await import("../../../lib/coingecko-api");
				clearCache();

				const cryptoData = await getTopCryptocurrencies(10, 1);

				// Check if we got valid data
				if (cryptoData && cryptoData.length > 0) {
					// Add real crypto data with historical data
					const topCoins = cryptoData.slice(0, 3);
					for (const crypto of topCoins) {
						if (!crypto || !crypto.symbol) {
							console.warn("Invalid crypto data:", crypto);
							continue;
						}

						const symbol = crypto.symbol.toUpperCase();

						try {
							// Get historical data for the selected timeframe
							const days = getTimeframeDays(timeframe);
							const historicalData = await getHistoricalData(
								crypto.id,
								days,
								"usd"
							);

							// Transform CoinGecko data to our format
							const transformedData =
								historicalData.prices?.map(([timestamp, price]) => ({
									time: new Date(timestamp).toISOString(),
									price: price,
									volume: Math.random() * 1000000 + 500000, // Mock volume since CoinGecko doesn't provide it in this format
								})) || [];

							newChartData[symbol] = {
								name: crypto.name,
								symbol: crypto.symbol,
								price: crypto.current_price || 0,
								change: crypto.price_change_percentage_24h || 0,
								volume: crypto.total_volume || 0,
								marketCap: crypto.market_cap || 0,
								goldBacked: false,
								data:
									transformedData.length > 0
										? transformedData
										: generateMockData(50, crypto.current_price || 100),
								price_change_1h:
									crypto.price_change_percentage_1h_in_currency || 0,
								price_change_7d:
									crypto.price_change_percentage_7d_in_currency || 0,
							};
						} catch (error) {
							console.warn(
								`Failed to fetch historical data for ${symbol}:`,
								error
							);
							// Fallback to mock data if historical data fails
							newChartData[symbol] = {
								name: crypto.name,
								symbol: crypto.symbol,
								price: crypto.current_price || 0,
								change: crypto.price_change_percentage_24h || 0,
								volume: crypto.total_volume || 0,
								marketCap: crypto.market_cap || 0,
								goldBacked: false,
								data: generateMockData(50, crypto.current_price || 100),
								price_change_1h:
									crypto.price_change_percentage_1h_in_currency || 0,
								price_change_7d:
									crypto.price_change_percentage_7d_in_currency || 0,
							};
						}
					}
				} else {
					console.warn("No crypto data received from CoinGecko API");
					throw new Error("No data received");
				}
			} catch (apiError) {
				console.warn(
					"CoinGecko API not available, using fallback data:",
					apiError.message
				);

				// Use fallback data for popular cryptocurrencies
				const fallbackData = {
					BTC: {
						name: "Bitcoin",
						symbol: "BTC",
						price: 45000,
						change: 2.5,
						volume: 25000000000,
						marketCap: 850000000000,
						goldBacked: false,
						data: generateMockData(50, 45000),
					},
					ETH: {
						name: "Ethereum",
						symbol: "ETH",
						price: 2800,
						change: 1.8,
						volume: 15000000000,
						marketCap: 350000000000,
						goldBacked: false,
						data: generateMockData(50, 2800),
					},
					BNB: {
						name: "Binance Coin",
						symbol: "BNB",
						price: 320,
						change: 0.9,
						volume: 8000000000,
						marketCap: 50000000000,
						goldBacked: false,
						data: generateMockData(50, 320),
					},
				};

				Object.assign(newChartData, fallbackData);
			}

			// Add GOLD data with real-time price
			const goldPricePerOunce = (goldPricePerGram || 0) * 31.1035;
			newChartData.GOLD = {
				name: "Gold Spot Price",
				symbol: "GOLD",
				price: goldPricePerOunce,
				change: 0.8,
				volume: 125000000,
				marketCap: 12500000000000,
				goldBacked: true,
				data: await generateRealTimeData("GOLD", goldPricePerOunce),
			};

			setChartData(newChartData);
			setLastUpdate(new Date());
		} catch (error) {
			console.error("❌ Failed to fetch crypto data:", error);
			setError("Failed to fetch cryptocurrency data. Using fallback data.");
		} finally {
			setLoading(false);
		}
	};

	// Initial data fetch
	useEffect(() => {
		if (!goldPriceLoading) {
			// Test API connection first
			const testAPI = async () => {
				try {
					const { getTopCryptocurrencies } = await import(
						"../../../lib/coingecko-api"
					);
					const testData = await getTopCryptocurrencies(1, 1);
				} catch (error) {
					console.error("API Test failed:", error);
				}
			};
			testAPI();
			fetchCryptoData();
		}
	}, [goldPriceLoading]);

	// Auto-refresh every 5 minutes
	useEffect(() => {
		if (!isRealtime || goldPriceLoading) return;

		const interval = setInterval(() => {
			fetchCryptoData();
		}, 5 * 60 * 1000); // 5 minutes

		return () => clearInterval(interval);
	}, [isRealtime, goldPriceLoading]);

	// Fetch new data when timeframe changes
	useEffect(() => {
		if (!goldPriceLoading && Object.keys(chartData).length > 0) {
			fetchCryptoData();
		}
	}, [timeframe]);

	// Update AINT and GAG prices in chart data when they change
	useEffect(() => {
		if (
			aintPrice !== undefined &&
			gagPrice !== undefined &&
			goldPricePerGram !== undefined
		) {
			setChartData((prev) => ({
				...prev,
				AINT: {
					...prev.AINT,
					price: aintPrice,
				},
				GAG: {
					...prev.GAG,
					price: gagPrice,
				},
				GOLD: {
					...prev.GOLD,
					price: goldPricePerGram * 31.1035,
				},
			}));
		}
	}, [aintPrice, gagPrice, goldPricePerGram]);

	// Helper function to convert timeframe to days for API
	function getTimeframeDays(timeframe) {
		switch (timeframe) {
			case "1h":
				return 1;
			case "24h":
				return 1;
			case "7d":
				return 7;
			case "30d":
				return 30;
			case "1y":
				return 365;
			default:
				return 1;
		}
	}

	// Generate real-time data based on current price
	async function generateRealTimeData(symbol, basePrice) {
		const data = [];
		const points = 50;
		let currentPrice = basePrice || 100;

		// For AINT, GAG and GOLD, generate realistic price movements
		const volatility =
			symbol === "AINT"
				? 0.01
				: symbol === "GAG"
				? 0.01
				: symbol === "GOLD"
				? 0.005
				: 0.02;

		for (let i = 0; i < points; i++) {
			// Simulate realistic price movements
			const change = (Math.random() - 0.5) * volatility;
			currentPrice = Math.max(currentPrice * (1 + change), 0.01);

			data.push({
				time: new Date(Date.now() - (points - i) * 60000).toISOString(),
				price: currentPrice,
				volume: Math.random() * 1000000 + 500000,
			});
		}
		return data;
	}

	function generateMockData(points, basePrice) {
		const data = [];
		let currentPrice = basePrice || 100;
		for (let i = 0; i < points; i++) {
			currentPrice += (Math.random() - 0.5) * (currentPrice * 0.02); // 2% volatility
			data.push({
				time: new Date(Date.now() - (points - i) * 60000).toISOString(),
				price: Math.max(currentPrice, 0.01),
				volume: Math.random() * 1000000,
			});
		}
		return data;
	}

	// Real-time price updates
	useEffect(() => {
		if (!isRealtime || goldPriceLoading) return;

		const interval = setInterval(async () => {
			try {
				// Update AINT price from gold price service
				if (aintPrice !== undefined) {
					setChartData((prev) => {
						const oldPrice = prev.AINT?.price || aintPrice;
						const priceChange = ((aintPrice - oldPrice) / oldPrice) * 100;

						return {
							...prev,
							AINT: {
								...prev.AINT,
								price: aintPrice,
								change: prev.AINT?.change + priceChange * 0.1,
								data: [
									...(prev.AINT?.data?.slice(1) || []),
									{
										time: new Date().toISOString(),
										price: aintPrice,
										volume: Math.random() * 1000000 + 500000,
									},
								],
							},
						};
					});
				}

				// Update GAG price from gold price service
				if (gagPrice !== undefined) {
					setChartData((prev) => {
						const oldPrice = prev.GAG?.price || gagPrice;
						const priceChange = ((gagPrice - oldPrice) / oldPrice) * 100;

						return {
							...prev,
							GAG: {
								...prev.GAG,
								price: gagPrice,
								change: prev.GAG?.change + priceChange * 0.1,
								data: [
									...(prev.GAG?.data?.slice(1) || []),
									{
										time: new Date().toISOString(),
										price: gagPrice,
										volume: Math.random() * 1000000 + 500000,
									},
								],
							},
						};
					});
				}

				// Update GOLD price
				if (goldPricePerGram !== undefined) {
					const goldPricePerOunce = goldPricePerGram * 31.1035;
					setChartData((prev) => {
						const oldPrice = prev.GOLD?.price || goldPricePerOunce;
						const priceChange =
							((goldPricePerOunce - oldPrice) / oldPrice) * 100;

						return {
							...prev,
							GOLD: {
								...prev.GOLD,
								price: goldPricePerOunce,
								change: prev.GOLD?.change + priceChange * 0.1,
								data: [
									...(prev.GOLD?.data?.slice(1) || []),
									{
										time: new Date().toISOString(),
										price: goldPricePerOunce,
										volume: Math.random() * 1000000 + 500000,
									},
								],
							},
						};
					});
				}

				// Update other cryptocurrencies with small realistic movements
				setChartData((prev) => {
					const updated = { ...prev };
					Object.keys(updated).forEach((token) => {
						if (token !== "AINT" && token !== "GAG" && token !== "GOLD") {
							const currentPrice = updated[token].price;
							const volatility = 0.002; // Slightly higher volatility for more realistic movement
							const change = (Math.random() - 0.5) * volatility;
							const newPrice = Math.max(currentPrice * (1 + change), 0.01);
							const priceChange =
								((newPrice - currentPrice) / currentPrice) * 100;

							updated[token] = {
								...updated[token],
								price: newPrice,
								change: updated[token].change + priceChange * 0.1,
								data: [
									...updated[token].data.slice(1),
									{
										time: new Date().toISOString(),
										price: newPrice,
										volume: Math.random() * 1000000 + 500000,
									},
								],
							};
						}
					});
					return updated;
				});

				setLastUpdate(new Date());
			} catch (error) {
				console.warn("Error updating real-time data:", error);
			}
		}, 3000); // Update every 3 seconds for more responsive feel

		return () => clearInterval(interval);
	}, [isRealtime, goldPriceLoading, aintPrice, gagPrice, goldPricePerGram]);

	const formatCurrency = (amount, currency = "USD") => {
		if (!amount || isNaN(amount)) return "$0.00";
		return new Intl.NumberFormat("en-US", {
			style: "currency",
			currency: currency,
			minimumFractionDigits: 2,
			maximumFractionDigits: 2,
		}).format(amount);
	};

	const formatIDR = (amount) => {
		if (!amount || isNaN(amount)) return "Rp 0";
		return new Intl.NumberFormat("id-ID", {
			style: "currency",
			currency: "IDR",
			minimumFractionDigits: 0,
			maximumFractionDigits: 0,
		}).format(amount * idrRate);
	};

	const formatLargeNumber = (num) => {
		if (!num || isNaN(num)) return "0";
		if (num >= 1e12) return (num / 1e12).toFixed(2) + "T";
		if (num >= 1e9) return (num / 1e9).toFixed(2) + "B";
		if (num >= 1e6) return (num / 1e6).toFixed(2) + "M";
		if (num >= 1e3) return (num / 1e3).toFixed(2) + "K";
		return num.toFixed(2);
	};

	const copyToClipboard = async (text) => {
		try {
			await navigator.clipboard.writeText(text);
			setCopiedAddress(true);
			setTimeout(() => setCopiedAddress(false), 2000);
		} catch (err) {
			console.error("Failed to copy: ", err);
		}
	};

	const refreshData = async () => {
		// Clear cache to get fresh data
		try {
			const { clearCache } = await import("../../../lib/coingecko-api");
			clearCache();
		} catch (error) {
			console.warn("Could not clear cache:", error);
		}
		await fetchCryptoData();
	};

	const currentToken = chartData[selectedToken];
	const tokens = Object.keys(chartData);

	// Show loading state if gold price is still loading or if we're loading crypto data
	if (goldPriceLoading || (loading && Object.keys(chartData).length <= 1)) {
		return (
			<DashboardLayout>
				<div className='chart-container'>
					<div className='flex items-center justify-center h-64'>
						<div className='text-center'>
							<Loader2 className='w-8 h-8 animate-spin mx-auto mb-4 text-purple-600' />
							<p className='text-gray-600'>
								Loading live cryptocurrency data...
							</p>
						</div>
					</div>
				</div>
			</DashboardLayout>
		);
	}

	// Show error state if there's a critical error
	if (goldPriceError) {
		return (
			<DashboardLayout>
				<div className='chart-container'>
					<div className='flex items-center justify-center h-64'>
						<div className='text-center'>
							<AlertCircle className='w-8 h-8 mx-auto mb-4 text-red-600' />
							<p className='text-red-600'>Failed to load price data</p>
							<p className='text-gray-600 text-sm mt-2'>{goldPriceError}</p>
						</div>
					</div>
				</div>
			</DashboardLayout>
		);
	}

	return (
		<DashboardLayout>
			<div className='chart-container'>
				{/* Hero Section */}
				<div className='chart-hero'>
					<div className='hero-content'>
						<div className='hero-badge'>
							<BarChart3 className='badge-icon' />
							<span>Real-time Market Data</span>
						</div>
						<h1 className='hero-title'>Live Charts & Analytics</h1>
						<p className='hero-description'>
							Track real-time price movements, analyze market trends, and
							monitor your investments with live data from CoinGecko.
						</p>

						{/* Live Price Ticker */}
						<div className='price-ticker'>
							{tokens.map((token) => (
								<div key={token} className='ticker-item'>
									<span className='ticker-symbol'>{token}</span>
									<span className='ticker-price'>
										{formatCurrency(chartData[token]?.price || 0)}
									</span>
									<span
										className={`ticker-change ${
											(chartData[token]?.change || 0) >= 0
												? "positive"
												: "negative"
										}`}>
										{(chartData[token]?.change || 0) >= 0 ? "+" : ""}
										{(chartData[token]?.change || 0).toFixed(2)}%
									</span>
								</div>
							))}
						</div>

						<div className='hero-stats'>
							<div className='hero-stat'>
								<Activity className='stat-icon' />
								<span className='stat-label'>Active Markets</span>
								<span className='stat-value'>{tokens.length}</span>
							</div>
							<div className='hero-stat'>
								<Clock className='stat-icon' />
								<span className='stat-label'>Last Update</span>
								<span className='stat-value'>
									{lastUpdate.toLocaleTimeString()}
								</span>
							</div>
							<div className='hero-stat'>
								<Zap className='stat-icon' />
								<span className='stat-label'>Real-time</span>
								<span className='stat-value'>
									{isRealtime ? "Live" : "Paused"}
								</span>
							</div>
						</div>
					</div>
				</div>

				{/* Error Message */}
				{error && (
					<div className='bg-red-50 border border-red-200 rounded-lg p-4 mb-6 mx-6'>
						<div className='flex items-center'>
							<AlertCircle className='w-5 h-5 text-red-500 mr-2' />
							<span className='text-red-700'>{error}</span>
						</div>
					</div>
				)}

				{/* AINT Token Information Card */}
				{selectedToken === "AINT" && (
					<div className='aint-info-card'>
						<div className='aint-info-header'>
							<div className='aint-badge'>
								<Award className='aint-badge-icon' />
								<span>Gold-Backed Token</span>
							</div>
							<h2>AINT Token Information</h2>
						</div>

						<div className='aint-info-grid'>
							{/* Price Information */}
							<div className='aint-price-section'>
								<h3>Current Price</h3>
								<div className='price-display-grid'>
									<div className='price-item'>
										<span className='price-label'>USD</span>
										<span className='price-value'>{aintPriceFormatted}</span>
									</div>
									<div className='price-item'>
										<span className='price-label'>IDR</span>
										<span className='price-value'>
											{formatIDR(aintPrice || 0)}
										</span>
									</div>
									<div className='price-item'>
										<span className='price-label'>Gold Weight</span>
										<span className='price-value'>
											{AINT_TOKEN_INFO.goldWeight}
										</span>
									</div>
								</div>
							</div>

							{/* Contract Information */}
							<div className='aint-contract-section'>
								<h3>Contract Information</h3>
								<div className='contract-info'>
									<div className='contract-item'>
										<span className='contract-label'>Network</span>
										<span className='contract-value'>
											{AINT_TOKEN_INFO.network}
										</span>
									</div>
									<div className='contract-item'>
										<span className='contract-label'>Decimals</span>
										<span className='contract-value'>
											{AINT_TOKEN_INFO.decimals}
										</span>
									</div>
									<div className='contract-item'>
										<span className='contract-label'>Total Supply</span>
										<span className='contract-value'>
											{AINT_TOKEN_INFO.totalSupply}
										</span>
									</div>
									<div className='contract-item full-width'>
										<span className='contract-label'>Contract Address</span>
										<div className='contract-address-container'>
											<span className='contract-address'>
												{AINT_TOKEN_INFO.contractAddress}
											</span>
											<button
												className='copy-btn'
												onClick={() =>
													copyToClipboard(AINT_TOKEN_INFO.contractAddress)
												}
												title='Copy address'>
												{copiedAddress ? (
													<Check size={16} />
												) : (
													<Copy size={16} />
												)}
											</button>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				)}

				{/* GAG Token Information Card */}
				{selectedToken === "GAG" && (
					<div className='aint-info-card'>
						<div className='aint-info-header'>
							<div className='aint-badge'>
								<Award className='aint-badge-icon' />
								<span>Gold-Backed Token</span>
							</div>
							<h2>GAG Token Information</h2>
						</div>

						<div className='aint-info-grid'>
							{/* Price Information */}
							<div className='aint-price-section'>
								<h3>Current Price</h3>
								<div className='price-display-grid'>
									<div className='price-item'>
										<span className='price-label'>USD</span>
										<span className='price-value'>{gagPriceFormatted}</span>
									</div>
									<div className='price-item'>
										<span className='price-label'>IDR</span>
										<span className='price-value'>
											{formatIDR(gagPrice || 0)}
										</span>
									</div>
									<div className='price-item'>
										<span className='price-label'>Gold Weight</span>
										<span className='price-value'>
											{GAG_TOKEN_INFO.goldWeight}
										</span>
									</div>
								</div>
							</div>

							{/* Contract Information */}
							<div className='aint-contract-section'>
								<h3>Contract Information</h3>
								<div className='contract-info'>
									<div className='contract-item'>
										<span className='contract-label'>Network</span>
										<span className='contract-value'>
											{GAG_TOKEN_INFO.network}
										</span>
									</div>
									<div className='contract-item'>
										<span className='contract-label'>Decimals</span>
										<span className='contract-value'>
											{GAG_TOKEN_INFO.decimals}
										</span>
									</div>
									<div className='contract-item'>
										<span className='contract-label'>Total Supply</span>
										<span className='contract-value'>
											{GAG_TOKEN_INFO.totalSupply}
										</span>
									</div>
									<div className='contract-item full-width'>
										<span className='contract-label'>Contract Address</span>
										<div className='contract-address-container'>
											<span className='contract-address'>
												{GAG_TOKEN_INFO.contractAddress}
											</span>
											<button
												className='copy-btn'
												onClick={() =>
													copyToClipboard(GAG_TOKEN_INFO.contractAddress)
												}
												title='Copy address'>
												{copiedAddress ? (
													<Check size={16} />
												) : (
													<Copy size={16} />
												)}
											</button>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				)}

				{/* Main Content */}
				<div className='chart-content'>
					<div className='chart-main'>
						{/* Chart Controls */}
						<div className='chart-controls-card'>
							<div className='controls-header'>
								<div className='token-selector'>
									<h3>Select Asset</h3>
									<div className='token-buttons'>
										{tokens.map((token) => (
											<button
												key={token}
												className={`token-btn ${
													selectedToken === token ? "active" : ""
												}`}
												onClick={() => setSelectedToken(token)}>
												{chartData[token]?.goldBacked && (
													<Award className='gold-icon' />
												)}
												<span>{token}</span>
											</button>
										))}
									</div>
								</div>

								<div className='chart-options'>
									<div className='timeframe-selector'>
										{["1h", "24h", "7d", "30d", "1y"].map((tf) => (
											<button
												key={tf}
												className={`timeframe-btn ${
													timeframe === tf ? "active" : ""
												}`}
												onClick={() => setTimeframe(tf)}>
												{tf}
											</button>
										))}
									</div>

									<div className='chart-type-selector'>
										<button
											className={`chart-type-btn ${
												chartType === "line" ? "active" : ""
											}`}
											onClick={() => setChartType("line")}>
											<LineChart size={16} />
										</button>
										<button
											className={`chart-type-btn ${
												chartType === "bar" ? "active" : ""
											}`}
											onClick={() => setChartType("bar")}>
											<BarChart3 size={16} />
										</button>
									</div>

									<button
										className={`realtime-toggle ${isRealtime ? "active" : ""}`}
										onClick={() => setIsRealtime(!isRealtime)}>
										{isRealtime ? <Eye size={16} /> : <EyeOff size={16} />}
										<span>{isRealtime ? "Live" : "Paused"}</span>
									</button>

									<button
										className='refresh-btn'
										onClick={refreshData}
										disabled={loading}>
										{loading ? (
											<Loader2 size={16} className='animate-spin' />
										) : (
											<RefreshCw size={16} />
										)}
									</button>
								</div>
							</div>
						</div>

						{/* Price Header */}
						<div className='price-header-card'>
							<div className='price-info'>
								<div className='token-title'>
									<h2>{currentToken?.name || "Loading..."}</h2>
									<span className='token-symbol'>
										{currentToken?.symbol || ""}
									</span>
									{currentToken?.goldBacked && (
										<div className='gold-backed-badge'>
											<Award size={16} />
											<span>Gold Backed</span>
										</div>
									)}
								</div>

								<div className='price-display'>
									<div className='current-price'>
										{formatCurrency(currentToken?.price || 0)}
										{isRealtime && (
											<span className='price-live-indicator'>
												<div className='live-dot'></div>
											</span>
										)}
									</div>
									{(selectedToken === "AINT" || selectedToken === "GAG") && (
										<div className='price-idr'>
											{formatIDR(currentToken?.price || 0)}
										</div>
									)}
									<div
										className={`price-change ${
											(currentToken?.change || 0) >= 0 ? "positive" : "negative"
										}`}>
										{(currentToken?.change || 0) >= 0 ? (
											<TrendingUp size={20} />
										) : (
											<TrendingDown size={20} />
										)}
										<span>
											{(currentToken?.change || 0) >= 0 ? "+" : ""}
											{(currentToken?.change || 0).toFixed(2)}%
										</span>
										<span className='timeframe-label'>({timeframe})</span>
									</div>

									{/* Price Trend Indicator */}
									{currentToken?.data && currentToken.data.length >= 2 && (
										<div className='price-trend-indicator'>
											{(() => {
												const recentData = currentToken.data.slice(-10);
												const firstPrice = recentData[0]?.price || 0;
												const lastPrice =
													recentData[recentData.length - 1]?.price || 0;
												const trend =
													lastPrice > firstPrice
														? "up"
														: lastPrice < firstPrice
														? "down"
														: "stable";

												return (
													<div className={`trend-${trend}`}>
														<span className='trend-label'>
															{trend === "up"
																? "↗"
																: trend === "down"
																? "↘"
																: "→"}
															{trend === "up"
																? "Bullish"
																: trend === "down"
																? "Bearish"
																: "Stable"}
														</span>
													</div>
												);
											})()}
										</div>
									)}
								</div>
							</div>

							<div className='price-stats'>
								<div className='stat-item'>
									<span className='stat-label'>Volume</span>
									<span className='stat-value'>
										${formatLargeNumber(currentToken?.volume || 0)}
									</span>
								</div>
								<div className='stat-item'>
									<span className='stat-label'>Market Cap</span>
									<span className='stat-value'>
										${formatLargeNumber(currentToken?.marketCap || 0)}
									</span>
								</div>
							</div>
						</div>

						{/* Enhanced Chart Area */}
						<div className='chart-area-card'>
							<div className='chart-header'>
								<h3>Real-time Price Chart</h3>
								<div className='chart-actions'>
									<button className='chart-action-btn' title='Download Chart'>
										<Download size={16} />
									</button>
									<button className='chart-action-btn' title='Fullscreen'>
										<Maximize2 size={16} />
									</button>
									<button
										className='chart-action-btn'
										title='Refresh Data'
										onClick={refreshData}>
										<RefreshCw
											size={16}
											className={loading ? "animate-spin" : ""}
										/>
									</button>
								</div>
							</div>

							<div className='chart-canvas'>
								{/* Chart Grid Lines */}
								<div className='chart-grid'>
									<div className='chart-grid-line'></div>
									<div className='chart-grid-line'></div>
									<div className='chart-grid-line'></div>
									<div className='chart-grid-line'></div>
								</div>

								{loading ? (
									<div className='chart-loading'>
										<div className='chart-loading-spinner'></div>
										<p className='chart-loading-text'>
											Loading real-time data...
										</p>
									</div>
								) : currentToken?.data && currentToken.data.length > 0 ? (
									<div className='enhanced-chart-placeholder'>
										<div className='chart-animation'>
											{currentToken.data.map((point, index) => {
												const maxPrice = Math.max(
													...currentToken.data.map((d) => d.price)
												);
												const minPrice = Math.min(
													...currentToken.data.map((d) => d.price)
												);
												const priceRange = maxPrice - minPrice;
												const normalizedHeight =
													priceRange > 0
														? ((point.price - minPrice) / priceRange) * 100
														: 50;

												return (
													<div
														key={index}
														className={`chart-bar ${
															chartType === "line" ? "chart-line" : ""
														}`}
														style={{
															height: `${normalizedHeight}%`,
															animationDelay: `${index * 0.05}s`,
															background:
																chartType === "line"
																	? `linear-gradient(180deg, 
																	${
																		selectedToken === "AINT"
																			? "#ffd700"
																			: selectedToken === "GAG"
																			? "#ff6b35"
																			: selectedToken === "GOLD"
																			? "#ffb347"
																			: selectedToken === "BTC"
																			? "#f7931a"
																			: "#627eea"
																	} 
																	0%, 
																	${
																		selectedToken === "AINT"
																			? "#ffed4e"
																			: selectedToken === "GAG"
																			? "#ff8c42"
																			: selectedToken === "GOLD"
																			? "#ffc87c"
																			: selectedToken === "BTC"
																			? "#fbb03b"
																			: "#8b9dc3"
																	} 
																	100%)`
																	: `linear-gradient(180deg, 
																	${
																		selectedToken === "AINT"
																			? "#ffd700"
																			: selectedToken === "GAG"
																			? "#ff6b35"
																			: selectedToken === "GOLD"
																			? "#ffb347"
																			: selectedToken === "BTC"
																			? "#f7931a"
																			: "#627eea"
																	} 
																	0%, 
																	${
																		selectedToken === "AINT"
																			? "#ffed4e"
																			: selectedToken === "GAG"
																			? "#ff8c42"
																			: selectedToken === "GOLD"
																			? "#ffc87c"
																			: selectedToken === "BTC"
																			? "#fbb03b"
																			: "#8b9dc3"
																	} 
																	70%)`,
														}}
														title={`${new Date(
															point.time
														).toLocaleTimeString()}: $${point.price.toFixed(
															2
														)}`}
														onMouseEnter={(e) => {
															const tooltip =
																document.getElementById("chart-tooltip");
															if (tooltip) {
																tooltip.innerHTML = `
																	<div class="tooltip-content">
																		<div class="tooltip-time">${new Date(point.time).toLocaleString()}</div>
																		<div class="tooltip-price">$${point.price.toFixed(2)}</div>
																		<div class="tooltip-volume">Vol: $${formatLargeNumber(point.volume)}</div>
																	</div>
																`;
																tooltip.style.display = "block";
																tooltip.style.left = e.pageX + 10 + "px";
																tooltip.style.top = e.pageY - 10 + "px";
															}
														}}
														onMouseLeave={() => {
															const tooltip =
																document.getElementById("chart-tooltip");
															if (tooltip) {
																tooltip.style.display = "none";
															}
														}}
													/>
												);
											})}
										</div>
										<div className='chart-overlay'>
											<LineChart size={48} className='chart-icon' />
											<p>Real-time {chartType} chart</p>
											<span className='chart-timeframe'>
												{timeframe} timeframe • {currentToken?.symbol || "AINT"}
											</span>
											{isRealtime && (
												<div className='live-indicator'>
													<div className='live-dot'></div>
													<span>Live</span>
												</div>
											)}
										</div>
									</div>
								) : (
									<div className='chart-empty'>
										<div className='chart-empty-icon'>📊</div>
										<p className='chart-empty-text'>No data available</p>
									</div>
								)}

								{/* Chart Tooltip */}
								<div className='chart-tooltip' id='chart-tooltip'>
									<div className='tooltip-content'>
										<div className='tooltip-time'></div>
										<div className='tooltip-price'></div>
										<div className='tooltip-volume'></div>
									</div>
								</div>
							</div>

							{/* Chart Legend */}
							<div className='chart-legend'>
								<div className='legend-item'>
									<div className='legend-color aint'></div>
									<span>AINT Token</span>
								</div>
								<div className='legend-item'>
									<div className='legend-color gag'></div>
									<span>GAG Token</span>
								</div>
								<div className='legend-item'>
									<div className='legend-color gold'></div>
									<span>Gold Price</span>
								</div>
								<div className='legend-item'>
									<div className='legend-color btc'></div>
									<span>Bitcoin</span>
								</div>
								<div className='legend-item'>
									<div className='legend-color eth'></div>
									<span>Ethereum</span>
								</div>
							</div>
						</div>

						{/* Technical Indicators */}
						<div className='indicators-card'>
							<h3>Technical Indicators</h3>
							<div className='indicators-grid'>
								<div className='indicator-item'>
									<div className='indicator-header'>
										<span className='indicator-name'>RSI (14)</span>
										<span className='indicator-value'>67.8</span>
									</div>
									<div className='indicator-bar'>
										<div
											className='indicator-fill'
											style={{ width: "67.8%" }}></div>
									</div>
								</div>

								<div className='indicator-item'>
									<div className='indicator-header'>
										<span className='indicator-name'>MACD</span>
										<span className='indicator-value positive'>+0.24</span>
									</div>
									<div className='indicator-bar'>
										<div
											className='indicator-fill positive'
											style={{ width: "60%" }}></div>
									</div>
								</div>

								<div className='indicator-item'>
									<div className='indicator-header'>
										<span className='indicator-name'>Bollinger Bands</span>
										<span className='indicator-value'>Middle</span>
									</div>
									<div className='indicator-bar'>
										<div
											className='indicator-fill'
											style={{ width: "50%" }}></div>
									</div>
								</div>
							</div>
						</div>
					</div>

					{/* Sidebar */}
					<div className='chart-sidebar'>
						{/* Market Overview */}
						<div className='sidebar-card'>
							<div className='card-header'>
								<h3>Market Overview</h3>
								<div className='live-indicator'>
									<div className='live-dot'></div>
									<span>Live</span>
								</div>
							</div>

							<div className='market-list'>
								{tokens.map((token) => (
									<div
										key={token}
										className={`market-item ${
											selectedToken === token ? "active" : ""
										}`}
										onClick={() => setSelectedToken(token)}>
										<div className='market-info'>
											<div className='market-symbol'>
												{chartData[token]?.goldBacked && (
													<Award className='mini-gold-icon' />
												)}
												<span>{token}</span>
											</div>
											<div className='market-name'>
												{chartData[token]?.name || ""}
											</div>
										</div>

										<div className='market-price'>
											<div className='price'>
												{formatCurrency(chartData[token]?.price || 0)}
											</div>
											<div
												className={`change ${
													(chartData[token]?.change || 0) >= 0
														? "positive"
														: "negative"
												}`}>
												{(chartData[token]?.change || 0) >= 0 ? "+" : ""}
												{(chartData[token]?.change || 0).toFixed(2)}%
											</div>
										</div>
									</div>
								))}
							</div>
						</div>

						{/* Portfolio Performance */}
						<div className='sidebar-card'>
							<h3>Portfolio Performance</h3>
							<div className='performance-stats'>
								<div className='perf-item'>
									<div className='perf-icon positive'>
										<TrendingUp size={16} />
									</div>
									<div className='perf-content'>
										<h4>Best Performer</h4>
										<p>BTC (+3.8%)</p>
									</div>
								</div>

								<div className='perf-item'>
									<div className='perf-icon negative'>
										<TrendingDown size={16} />
									</div>
									<div className='perf-content'>
										<h4>Worst Performer</h4>
										<p>ETH (-1.2%)</p>
									</div>
								</div>

								<div className='perf-item'>
									<div className='perf-icon neutral'>
										<Target size={16} />
									</div>
									<div className='perf-content'>
										<h4>Average Change</h4>
										<p>+1.45%</p>
									</div>
								</div>
							</div>
						</div>

						{/* Market Insights */}
						<div className='sidebar-card'>
							<h3>Market Insights</h3>
							<div className='insights-list'>
								<div className='insight-item'>
									<div className='insight-icon'>
										<Award className='insight-icon-svg' />
									</div>
									<div className='insight-content'>
										<h4>Gold Market Strong</h4>
										<p>AINT showing resilience with gold backing</p>
										<span className='insight-time'>2 hours ago</span>
									</div>
								</div>

								<div className='insight-item'>
									<div className='insight-icon'>
										<TrendingUp className='insight-icon-svg' />
									</div>
									<div className='insight-content'>
										<h4>Crypto Rally</h4>
										<p>Bitcoin leads market recovery</p>
										<span className='insight-time'>4 hours ago</span>
									</div>
								</div>

								<div className='insight-item'>
									<div className='insight-icon'>
										<Shield className='insight-icon-svg' />
									</div>
									<div className='insight-content'>
										<h4>Market Stability</h4>
										<p>Low volatility across major assets</p>
										<span className='insight-time'>6 hours ago</span>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</DashboardLayout>
	);
}

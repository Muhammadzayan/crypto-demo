import React, { useState, useEffect } from "react";
import DashboardLayout from "../layout";
import {
	TrendingUp,
	TrendingDown,
	Star,
	Eye,
	RefreshCw,
	Filter,
	AlertCircle,
	Loader2,
	Activity,
} from "lucide-react";
import {
	getTopCryptocurrencies,
	getMarketOverview,
	getTopGainersLosers,
	clearCache,
} from "../../../lib/coingecko-api";

export default function TrendingTokens() {
	const [timeframe, setTimeframe] = useState("24h");
	const [sortBy, setSortBy] = useState("gainers");
	const [tokens, setTokens] = useState([]);
	const [marketOverview, setMarketOverview] = useState({});
	const [gainersLosers, setGainersLosers] = useState({
		gainers: [],
		losers: [],
	});
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);
	const [lastUpdated, setLastUpdated] = useState(null);

	const timeframes = ["1h", "24h", "7d", "30d"];
	const sortOptions = [
		{ value: "gainers", label: "Top Gainers" },
		{ value: "losers", label: "Top Losers" },
		{ value: "volume", label: "Highest Volume" },
		{ value: "market_cap", label: "Market Cap" },
	];

	// Fetch all data from CoinGecko API
	const fetchData = async () => {
		try {
			setLoading(true);
			setError(null);

			// Clear cache first to ensure fresh data
			clearCache();

			// Fetch data in parallel
			const [cryptoData, overviewData, gainersLosersData] = await Promise.all([
				getTopCryptocurrencies(100, 1),
				getMarketOverview(),
				getTopGainersLosers(10),
			]);

			// Transform and enhance the crypto data
			const enhancedCryptoData = cryptoData.map((token) => ({
				...token,
				// Ensure all required fields are present
				id: token.id || `token-${Math.random()}`,
				symbol: token.symbol?.toUpperCase() || "UNKNOWN",
				name: token.name || "Unknown Token",
				current_price: token.current_price || 0,
				price_change_percentage_24h: token.price_change_percentage_24h || 0,
				price_change_percentage_1h_in_currency:
					token.price_change_percentage_1h_in_currency || 0,
				price_change_percentage_7d_in_currency:
					token.price_change_percentage_7d_in_currency || 0,
				price_change_percentage_30d_in_currency:
					token.price_change_percentage_30d_in_currency || 0,
				total_volume: token.total_volume || 0,
				market_cap: token.market_cap || 0,
				market_cap_rank: token.market_cap_rank || 999,
				image: token.image || null,
				// Add trending flag for top performers
				trending:
					token.price_change_percentage_24h > 5 || token.market_cap_rank <= 10,
				// Add change percent for compatibility
				changePercent: token.price_change_percentage_24h || 0,
				// Add price for compatibility
				price: token.current_price || 0,
				// Add volume for compatibility
				volume: token.total_volume || 0,
				// Add marketCap for compatibility
				marketCap: token.market_cap || 0,
				// Add rank for compatibility
				rank: token.market_cap_rank || 999,
			}));

			setTokens(enhancedCryptoData);
			setMarketOverview(overviewData);
			setGainersLosers(gainersLosersData);
			setLastUpdated(new Date());

			console.log("✅ Real-time data fetched successfully from CoinGecko API");
		} catch (error) {
			console.error("❌ Failed to fetch real-time data:", error);
			setError(
				"Failed to fetch real-time data from CoinGecko API. Please try again later."
			);
		} finally {
			setLoading(false);
		}
	};

	// Initial data fetch
	useEffect(() => {
		fetchData();
	}, []);

	// Auto-refresh every 5 minutes
	useEffect(() => {
		const interval = setInterval(() => {
			fetchData();
		}, 5 * 60 * 1000); // 5 minutes

		return () => clearInterval(interval);
	}, []);

	const filteredTokens = [...tokens].sort((a, b) => {
		switch (sortBy) {
			case "gainers":
				return (
					(b.price_change_percentage_24h || b.changePercent || 0) -
					(a.price_change_percentage_24h || a.changePercent || 0)
				);
			case "losers":
				return (
					(a.price_change_percentage_24h || a.changePercent || 0) -
					(b.price_change_percentage_24h || b.changePercent || 0)
				);
			case "volume":
				return (
					(b.total_volume || b.volume || 0) - (a.total_volume || a.volume || 0)
				);
			case "market_cap":
				return (
					(b.market_cap || b.marketCap || 0) -
					(a.market_cap || a.marketCap || 0)
				);
			default:
				return (
					(b.price_change_percentage_24h || b.changePercent || 0) -
					(a.price_change_percentage_24h || a.changePercent || 0)
				);
		}
	});

	const formatNumber = (num) => {
		if (!num || isNaN(num)) return "0";
		if (num >= 1e12) return (num / 1e12).toFixed(2) + "T";
		if (num >= 1e9) return (num / 1e9).toFixed(2) + "B";
		if (num >= 1e6) return (num / 1e6).toFixed(2) + "M";
		if (num >= 1e3) return (num / 1e3).toFixed(2) + "K";
		return num.toFixed(2);
	};

	const formatCurrency = (amount) => {
		if (!amount || isNaN(amount)) return "$0.00";
		return new Intl.NumberFormat("en-US", {
			style: "currency",
			currency: "USD",
			minimumFractionDigits: 2,
			maximumFractionDigits: 2,
		}).format(amount);
	};

	const refreshData = async () => {
		clearCache(); // Clear cache to force fresh data
		await fetchData();
	};

	const getChangePercentage = (token) => {
		switch (timeframe) {
			case "1h":
				return (
					token.price_change_percentage_1h_in_currency ||
					token.price_change_1h ||
					0
				);
			case "7d":
				return (
					token.price_change_percentage_7d_in_currency ||
					token.price_change_7d ||
					0
				);
			case "30d":
				return (
					token.price_change_percentage_30d_in_currency ||
					token.price_change_30d ||
					0
				);
			default:
				return token.price_change_percentage_24h || token.changePercent || 0;
		}
	};

	if (loading && tokens.length === 0) {
		return (
			<DashboardLayout>
				<div className='min-h-screen bg-gradient-to-br from-yellow-50 to-orange-100 p-6'>
					<div className='trending-tokens-container'>
						<div className='trending-tokens-wrapper'>
							<div className='flex items-center justify-center h-64'>
								<div className='text-center'>
									<Loader2 className='w-8 h-8 animate-spin mx-auto mb-4 text-purple-600' />
									<p className='text-gray-600'>
										Loading live cryptocurrency data...
									</p>
								</div>
							</div>
						</div>
					</div>
				</div>
			</DashboardLayout>
		);
	}

	return (
		<DashboardLayout>
			<div className='min-h-screen bg-gradient-to-br from-yellow-50 to-orange-100 p-6'>
				<div className='trending-tokens-container'>
					<div className='trending-tokens-wrapper'>
						{/* Header */}
						<div className='trending-tokens-header'>
							<div className='header-content'>
								<div className='header-text'>
									<div className='header-badge'>
										<Activity className='badge-icon' />
										<span>Real-time Market Data</span>
									</div>
									<h1>Live Cryptocurrency Data</h1>
									<p>
										Real-time cryptocurrency prices and market data from
										CoinGecko API with live updates every 5 minutes
									</p>
								</div>
								<button
									onClick={refreshData}
									disabled={loading}
									className='btn btn-primary'>
									{loading ? (
										<Loader2 className='w-4 h-4 animate-spin' />
									) : (
										<RefreshCw />
									)}
									{loading ? "Refreshing..." : "Refresh"}
								</button>
							</div>
						</div>

						{/* Error Message */}
						{error && (
							<div className='bg-red-50 border border-red-200 rounded-lg p-4 mb-6'>
								<div className='flex items-center'>
									<AlertCircle className='w-5 h-5 text-red-500 mr-2' />
									<span className='text-red-700'>{error}</span>
								</div>
							</div>
						)}

						{/* Filters */}
						<div className='filters-container'>
							<div className='filters-content'>
								<div className='filters-left'>
									<div className='filter-label'>
										<Filter />
										<span>Filters:</span>
									</div>

									{/* Timeframe */}
									<div className='timeframe-buttons'>
										{timeframes.map((tf) => (
											<button
												key={tf}
												onClick={() => setTimeframe(tf)}
												className={`timeframe-button ${
													timeframe === tf ? "active" : ""
												}`}>
												{tf}
											</button>
										))}
									</div>

									{/* Sort By */}
									<select
										value={sortBy}
										onChange={(e) => setSortBy(e.target.value)}
										className='sort-select'>
										{sortOptions.map((option) => (
											<option key={option.value} value={option.value}>
												{option.label}
											</option>
										))}
									</select>
								</div>

								<div className='last-updated'>
									{lastUpdated ? (
										<>
											<span className='live-indicator'>
												<div className='live-dot'></div>
												Live
											</span>
											Last updated: {lastUpdated.toLocaleTimeString()}
										</>
									) : (
										"Loading..."
									)}
								</div>
							</div>
						</div>

						{/* Top Trending */}
						<div className='top-trending-section'>
							<h2 className='section-title'>
								<TrendingUp />
								Top Trending ({timeframe})
							</h2>
							<div className='trending-cards-grid'>
								{filteredTokens.slice(0, 6).map((token, index) => {
									const changePercent = getChangePercentage(token);
									return (
										<div key={token.id} className='token-card'>
											<div className='token-header'>
												<div className='token-info'>
													<div className='token-icon'>
														{token.image ? (
															<img
																src={token.image}
																alt={token.name}
																className='w-8 h-8 rounded-full'
																onError={(e) => {
																	e.target.style.display = "none";
																	e.target.nextSibling.style.display = "block";
																}}
															/>
														) : (
															<div className='w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center text-sm font-bold'>
																{token.symbol.charAt(0)}
															</div>
														)}
													</div>
													<div>
														<div className='token-symbol'>{token.symbol}</div>
														<div className='token-name'>{token.name}</div>
													</div>
												</div>
												{token.trending && (
													<div className='hot-badge'>🔥 Hot</div>
												)}
											</div>

											<div className='token-price'>
												<div className='price-value'>
													{formatCurrency(token.current_price || token.price)}
												</div>
												<div
													className={`price-change ${
														changePercent >= 0 ? "positive" : "negative"
													}`}>
													{changePercent >= 0 ? (
														<TrendingUp />
													) : (
														<TrendingDown />
													)}
													<span>
														{changePercent >= 0 ? "+" : ""}
														{changePercent.toFixed(2)}%
													</span>
												</div>
											</div>

											<div className='token-stats'>
												<div className='stat-row'>
													<span className='stat-label'>Volume</span>
													<span className='stat-value'>
														${formatNumber(token.total_volume || token.volume)}
													</span>
												</div>
												<div className='stat-row'>
													<span className='stat-label'>Market Cap</span>
													<span className='stat-value'>
														${formatNumber(token.market_cap || token.marketCap)}
													</span>
												</div>
											</div>

											<button className='btn btn-primary'>View Details</button>
										</div>
									);
								})}
							</div>
						</div>

						{/* Full List */}
						<div className='table-section'>
							<h2>All Cryptocurrencies</h2>
							<div className='table-container'>
								<div className='table-scroll'>
									<table className='tokens-table'>
										<thead className='table-header'>
											<tr>
												<th>Rank</th>
												<th>Token</th>
												<th>Price</th>
												<th>Change ({timeframe})</th>
												<th>Volume</th>
												<th>Market Cap</th>
												<th>Actions</th>
											</tr>
										</thead>
										<tbody className='table-body'>
											{filteredTokens.map((token, index) => {
												const changePercent = getChangePercentage(token);
												return (
													<tr key={token.id}>
														<td>
															<div className='rank-cell'>
																<span className='rank-number'>
																	#
																	{token.market_cap_rank ||
																		token.rank ||
																		index + 1}
																</span>
																{token.trending && (
																	<TrendingUp className='trending-icon' />
																)}
															</div>
														</td>
														<td>
															<div className='token-cell'>
																<div className='token-cell-icon'>
																	{token.image ? (
																		<img
																			src={token.image}
																			alt={token.name}
																			className='w-6 h-6 rounded-full'
																			onError={(e) => {
																				e.target.style.display = "none";
																				e.target.nextSibling.style.display =
																					"block";
																			}}
																		/>
																	) : (
																		<div className='w-6 h-6 bg-gray-200 rounded-full flex items-center justify-center text-xs font-bold'>
																			{token.symbol.charAt(0)}
																		</div>
																	)}
																</div>
																<div>
																	<div className='token-cell-symbol'>
																		{token.symbol}
																	</div>
																	<div className='token-cell-name'>
																		{token.name}
																	</div>
																</div>
															</div>
														</td>
														<td>
															<div className='price-cell'>
																{formatCurrency(
																	token.current_price || token.price
																)}
															</div>
														</td>
														<td>
															<div
																className={`change-cell ${
																	changePercent >= 0 ? "positive" : "negative"
																}`}>
																{changePercent >= 0 ? (
																	<TrendingUp />
																) : (
																	<TrendingDown />
																)}
																{changePercent >= 0 ? "+" : ""}
																{changePercent.toFixed(2)}%
															</div>
														</td>
														<td className='volume-cell'>
															$
															{formatNumber(token.total_volume || token.volume)}
														</td>
														<td className='market-cap-cell'>
															$
															{formatNumber(
																token.market_cap || token.marketCap
															)}
														</td>
														<td>
															<div className='actions-cell'>
																<button className='action-button'>
																	<Eye />
																</button>
																<button className='action-button'>
																	<Star />
																</button>
															</div>
														</td>
													</tr>
												);
											})}
										</tbody>
									</table>
								</div>
							</div>
						</div>

						{/* Sidebar */}
						<div className='sidebar'>
							{/* Market Overview */}
							<div className='sidebar-card'>
								<h3 className='sidebar-title'>Market Overview</h3>
								<div className='overview-stats'>
									<div className='overview-stat'>
										<span className='overview-stat-label'>
											Total Market Cap
										</span>
										<span className='overview-stat-value'>
											${formatNumber(marketOverview.totalMarketCap)}
										</span>
									</div>
									<div className='overview-stat'>
										<span className='overview-stat-label'>24h Volume</span>
										<span className='overview-stat-value'>
											${formatNumber(marketOverview.totalVolume)}
										</span>
									</div>
									<div className='overview-stat'>
										<span className='overview-stat-label'>BTC Dominance</span>
										<span className='overview-stat-value'>
											{marketOverview.btcDominance?.toFixed(1) || "0"}%
										</span>
									</div>
									<div className='overview-stat'>
										<span className='overview-stat-label'>Active Cryptos</span>
										<span className='overview-stat-value'>
											{marketOverview.activeCryptos?.toLocaleString() || "0"}
										</span>
									</div>
								</div>
							</div>

							{/* Top Gainers */}
							<div className='sidebar-card'>
								<h3 className='sidebar-title'>
									<TrendingUp className='green' />
									Top Gainers
								</h3>
								<div className='gainers-losers-list'>
									{gainersLosers.gainers.slice(0, 5).map((token) => (
										<div key={token.id} className='gainer-loser-item'>
											<div className='gainer-loser-token'>
												<span className='gainer-loser-icon'>
													{token.image ? (
														<img
															src={token.image}
															alt={token.name}
															className='w-4 h-4 rounded-full'
														/>
													) : (
														<div className='w-4 h-4 bg-gray-200 rounded-full flex items-center justify-center text-xs'>
															{token.symbol.charAt(0)}
														</div>
													)}
												</span>
												<span className='gainer-loser-symbol'>
													{token.symbol}
												</span>
											</div>
											<span className='gainer-change'>
												+{token.changePercent.toFixed(2)}%
											</span>
										</div>
									))}
								</div>
							</div>

							{/* Top Losers */}
							<div className='sidebar-card'>
								<h3 className='sidebar-title'>
									<TrendingDown className='red' />
									Top Losers
								</h3>
								<div className='gainers-losers-list'>
									{gainersLosers.losers.slice(0, 5).map((token) => (
										<div key={token.id} className='gainer-loser-item'>
											<div className='gainer-loser-token'>
												<span className='gainer-loser-icon'>
													{token.image ? (
														<img
															src={token.image}
															alt={token.name}
															className='w-4 h-4 rounded-full'
														/>
													) : (
														<div className='w-4 h-4 bg-gray-200 rounded-full flex items-center justify-center text-xs'>
															{token.symbol.charAt(0)}
														</div>
													)}
												</span>
												<span className='gainer-loser-symbol'>
													{token.symbol}
												</span>
											</div>
											<span className='loser-change'>
												{token.changePercent.toFixed(2)}%
											</span>
										</div>
									))}
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</DashboardLayout>
	);
}

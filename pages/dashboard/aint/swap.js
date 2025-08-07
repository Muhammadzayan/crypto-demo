import React, { useState, useEffect } from "react";
import DashboardLayout from "../layout";
import {
	ArrowUpDown,
	RefreshCw,
	TrendingUp,
	AlertTriangle,
	CheckCircle,
} from "lucide-react";
import { useGoldPrice } from "../../../hooks/useGoldPrice";

export default function SwapTokens() {
	const { aintPrice, calculateUSD, calculateAint } = useGoldPrice();

	const [fromToken, setFromToken] = useState("AINT");
	const [toToken, setToToken] = useState("BTC");
	const [fromAmount, setFromAmount] = useState("");
	const [toAmount, setToAmount] = useState("");
	const [slippage, setSlippage] = useState("0.5");
	const [loading, setLoading] = useState(false);

	const tokens = [
		{
			symbol: "AINT",
			name: "AINT Token",
			balance: "1,250.50",
			price: aintPrice,
			icon: "🪙",
		},
		{
			symbol: "BTC",
			name: "Bitcoin",
			balance: "0.05432",
			price: 43250.0,
			icon: "₿",
		},
		{
			symbol: "ETH",
			name: "Ethereum",
			balance: "2.1234",
			price: 2650.0,
			icon: "Ξ",
		},
		{
			symbol: "BNB",
			name: "Binance Coin",
			balance: "15.67",
			price: 320.0,
			icon: "🔶",
		},
		{
			symbol: "XRP",
			name: "Ripple",
			balance: "500.00",
			price: 0.65,
			icon: "◆",
		},
		{
			symbol: "USD",
			name: "US Dollar",
			balance: "5,000.00",
			price: 1.0,
			icon: "$",
		},
		{
			symbol: "EUR",
			name: "Euro",
			balance: "3,200.00",
			price: 1.08,
			icon: "€",
		},
		{
			symbol: "IDR",
			name: "Indonesian Rupiah",
			balance: "75,000,000",
			price: 0.000067,
			icon: "Rp",
		},
	];

	// Update AINT price when it changes
	useEffect(() => {
		const updatedTokens = tokens.map((token) =>
			token.symbol === "AINT" ? { ...token, price: aintPrice } : token
		);
		// Note: In a real implementation, you'd need to manage this state properly
	}, [aintPrice]);

	const getTokenData = (symbol) => tokens.find((t) => t.symbol === symbol);

	const calculateSwap = async () => {
		if (!fromAmount) return "";

		const fromTokenData = getTokenData(fromToken);
		const toTokenData = getTokenData(toToken);

		if (fromTokenData && toTokenData) {
			let fromValue;

			// Handle AINT calculations using the service
			if (fromToken === "AINT") {
				try {
					fromValue = await calculateUSD(parseFloat(fromAmount));
				} catch (error) {
					console.error("Error calculating AINT value:", error);
					return "";
				}
			} else {
				fromValue = parseFloat(fromAmount) * fromTokenData.price;
			}

			const result = fromValue / toTokenData.price;
			return result.toFixed(6);
		}
		return "";
	};

	const swapTokens = () => {
		const tempToken = fromToken;
		const tempAmount = fromAmount;
		setFromToken(toToken);
		setToToken(tempToken);
		setFromAmount(toAmount);
		setToAmount(tempAmount);
	};

	const handleSwap = async () => {
		setLoading(true);
		// Simulate API call
		setTimeout(() => {
			setLoading(false);
			alert("Swap completed successfully!");
		}, 2000);
	};

	React.useEffect(() => {
		setToAmount(calculateSwap());
	}, [fromAmount, fromToken, toToken]);

	return (
		<DashboardLayout>
			<div className='swap-container'>
				<div className='swap-wrapper'>
					{/* Header */}
					<div className='swap-header'>
						<h1 className='swap-title'>Swap Tokens</h1>
						<p className='swap-subtitle'>
							Exchange AINT and other cryptocurrencies instantly
						</p>
					</div>

					<div className='swap-grid'>
						{/* Swap Interface */}
						<div className='swap-main-card'>
							<div className='swap-card'>
								<h2 className='section-header'>
									<ArrowUpDown />
									Token Swap
								</h2>

								{/* From Token */}
								<div className='form-group'>
									<label className='form-label'>From</label>
									<div className='token-input-container'>
										<div className='token-header'>
											<select
												value={fromToken}
												onChange={(e) => setFromToken(e.target.value)}
												className='token-select'>
												{tokens.map((token) => (
													<option key={token.symbol} value={token.symbol}>
														{token.symbol}
													</option>
												))}
											</select>
											<div className='token-balance'>
												<div className='balance-label'>Balance</div>
												<div className='balance-value'>
													{getTokenData(fromToken)?.balance}
												</div>
											</div>
										</div>
										<input
											type='number'
											value={fromAmount}
											onChange={(e) => setFromAmount(e.target.value)}
											className='token-amount-input'
											placeholder='0.0'
										/>
										<div className='token-footer'>
											<div className='token-value'>
												$
												{(
													parseFloat(fromAmount || "0") *
													(getTokenData(fromToken)?.price || 0)
												).toFixed(2)}
											</div>
											<button
												onClick={() =>
													setFromAmount(
														getTokenData(fromToken)?.balance.replace(
															/,/g,
															""
														) || "0"
													)
												}
												className='max-button'>
												MAX
											</button>
										</div>
									</div>
								</div>

								{/* Swap Button */}
								<div className='swap-button-container'>
									<button onClick={swapTokens} className='swap-direction-btn'>
										<ArrowUpDown />
									</button>
								</div>

								{/* To Token */}
								<div className='form-group'>
									<label className='form-label'>To</label>
									<div className='token-input-container'>
										<div className='token-header'>
											<select
												value={toToken}
												onChange={(e) => setToToken(e.target.value)}
												className='token-select'>
												{tokens
													.filter((t) => t.symbol !== fromToken)
													.map((token) => (
														<option key={token.symbol} value={token.symbol}>
															{token.symbol}
														</option>
													))}
											</select>
											<div className='token-balance'>
												<div className='balance-label'>Balance</div>
												<div className='balance-value'>
													{getTokenData(toToken)?.balance}
												</div>
											</div>
										</div>
										<input
											type='number'
											value={toAmount}
											readOnly
											className='token-amount-input'
											placeholder='0.0'
										/>
										<div className='token-footer'>
											<div className='token-value'>
												$
												{(
													parseFloat(toAmount || "0") *
													(getTokenData(toToken)?.price || 0)
												).toFixed(2)}
											</div>
										</div>
									</div>
								</div>

								{/* Slippage Settings */}
								<div className='form-group'>
									<label className='form-label'>Slippage Tolerance</label>
									<div className='slippage-buttons'>
										{["0.1", "0.5", "1.0"].map((value) => (
											<button
												key={value}
												onClick={() => setSlippage(value)}
												className={`slippage-btn ${
													slippage === value ? "active" : ""
												}`}>
												{value}%
											</button>
										))}
										<input
											type='number'
											value={slippage}
											onChange={(e) => setSlippage(e.target.value)}
											className='slippage-input'
											placeholder='Custom'
										/>
									</div>
								</div>

								{/* Swap Button */}
								<button
									onClick={handleSwap}
									disabled={!fromAmount || !toAmount || loading}
									className='swap-execute-btn'>
									{loading ? (
										<>
											<RefreshCw className='loading-spinner' />
											Swapping...
										</>
									) : (
										<>
											<ArrowUpDown />
											Swap Tokens
										</>
									)}
								</button>
							</div>
						</div>

						{/* Sidebar */}
						<div className='swap-sidebar'>
							{/* Exchange Rate */}
							<div className='swap-card'>
								<h3 className='section-header'>
									<TrendingUp />
									Exchange Rate
								</h3>
								<div>
									<div className='rate-item'>
										<span className='rate-label'>1 {fromToken}</span>
										<span className='rate-value'>
											{(
												(getTokenData(fromToken)?.price || 0) /
												(getTokenData(toToken)?.price || 1)
											).toFixed(6)}{" "}
											{toToken}
										</span>
									</div>
									<div className='rate-item'>
										<span className='rate-label'>1 {toToken}</span>
										<span className='rate-value'>
											{(
												(getTokenData(toToken)?.price || 0) /
												(getTokenData(fromToken)?.price || 1)
											).toFixed(6)}{" "}
											{fromToken}
										</span>
									</div>
								</div>
							</div>

							{/* Transaction Details */}
							{fromAmount && (
								<div className='swap-card'>
									<h3 className='section-header'>Transaction Details</h3>
									<div>
										<div className='detail-item'>
											<span className='detail-label'>Minimum received</span>
											<span className='detail-value'>
												{(
													parseFloat(toAmount) *
													(1 - parseFloat(slippage) / 100)
												).toFixed(6)}{" "}
												{toToken}
											</span>
										</div>
										<div className='detail-item'>
											<span className='detail-label'>Price impact</span>
											<span className='detail-value success'>{"<0.01%"}</span>
										</div>
										<div className='detail-item'>
											<span className='detail-label'>
												Liquidity provider fee
											</span>
											<span className='detail-value'>
												{(parseFloat(fromAmount || "0") * 0.003).toFixed(6)}{" "}
												{fromToken}
											</span>
										</div>
									</div>
								</div>
							)}

							{/* Warning */}
							<div className='swap-card'>
								<h3 className='section-header warning-header'>
									<AlertTriangle />
									Important Notice
								</h3>
								<div className='notice-list'>
									<div className='notice-item'>
										<CheckCircle />
										<span>Swaps are executed instantly</span>
									</div>
									<div className='notice-item'>
										<CheckCircle />
										<span>Rates may change during execution</span>
									</div>
									<div className='notice-item'>
										<CheckCircle />
										<span>Check slippage tolerance carefully</span>
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

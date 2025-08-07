import React, { useState, useEffect } from "react";
import DashboardLayout from "../layout";
import Link from "next/link";
import { useAuth } from "../../../contexts/AuthContext";

import {
	Wallet,
	Eye,
	EyeOff,
	TrendingUp,
	TrendingDown,
	Send,
	Download,
	RefreshCw,
	Copy,
	ExternalLink,
	Clock,
	CheckCircle,
	AlertCircle,
	Coins,
	DollarSign,
	Activity,
	ArrowUpRight,
	ArrowDownLeft,
	Plus,
	Minus,
	Award,
	Shield,
	Zap,
	ArrowLeft,
	ArrowRight,
} from "lucide-react";

export default function WalletPage() {
	const { user, loading: authLoading } = useAuth();
	const [showBalance, setShowBalance] = useState(true);
	const [selectedToken, setSelectedToken] = useState("AINT");
	const [activeTab, setActiveTab] = useState("overview");
	const [currentPage, setCurrentPage] = useState(1);
	const [totalPages, setTotalPages] = useState(1);
	const transactionsPerPage = 5;
	const [userWalletInfo, setUserWalletInfo] = useState({
		recentTransactions: [],
	});

	// Mock data
	const walletData = {
		totalBalance: 125847.32,
		totalBalanceChange: 5.67,
		tokens: [
			{
				symbol: "AINT",
				name: "AINT Gold Token",
				balance: 2847.125,
				value: 98234.5,
				change: 2.4,
				price: 34.52,
				goldBacked: true,
			},
			{
				symbol: "ETH",
				name: "Ethereum",
				balance: 8.5,
				value: 21456.75,
				change: -1.2,
				price: 2524.32,
				goldBacked: false,
			},
			{
				symbol: "BTC",
				name: "Bitcoin",
				balance: 0.15,
				value: 6156.07,
				change: 3.8,
				price: 41040.45,
				goldBacked: false,
			},
		],
		recentTransactions: [],
	};

	const formatCurrency = (amount) => {
		return new Intl.NumberFormat("en-US", {
			style: "currency",
			currency: "USD",
			minimumFractionDigits: 2,
		}).format(amount);
	};

	const formatNumber = (num) => {
		return new Intl.NumberFormat("en-US", {
			minimumFractionDigits: 2,
			maximumFractionDigits: 6,
		}).format(num);
	};

	const copyToClipboard = (text) => {
		navigator.clipboard.writeText(text);
		// You could add a toast notification here
	};

	useEffect(() => {
		if (user?.id) {
			fetchTransactions(currentPage);
		}
	}, [user?.id, currentPage]);

	const fetchTransactions = async (page = 1) => {
		try {
			const res = await fetch(
				`/api/user/my_transition?userId=${user?.id}&page=${page}&limit=${transactionsPerPage}`
			);
			const data = await res.json();
			if (data.success) {
				setUserWalletInfo((prev) => ({
					...prev,
					recentTransactions: data.transactions,
				}));
				setTotalPages(data.totalPages || 1);
			}
		} catch (err) {
			console.error("Failed to fetch transactions:", err);
		}
	};

	// Show loading state while user data is being fetched
	if (authLoading) {
		return (
			<DashboardLayout>
				<div className="flex items-center justify-center min-h-screen">
					<div className="text-center">
						<div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-500 mx-auto mb-4"></div>
						<p className="text-gray-600">Loading...</p>
					</div>
				</div>
			</DashboardLayout>
		);
	}

	return (
		<DashboardLayout>
			<div className='buy-aint-container'>
				{/* Hero Section */}
				<div className='buy-aint-hero'>
					<div className='hero-content'>
						<div className='hero-badge'>
							<Wallet className='badge-icon' />
							<span>Digital Asset Portfolio</span>
						</div>
						<h1 className='hero-title'>My Wallet</h1>
						<p className='hero-description'>
							Manage your digital assets, track performance, and execute
							transactions securely.
						</p>

						{/* Portfolio Overview */}
						<div className='wallet-overview'>
							<div className='balance-card'>
								<div className='balance-header'>
									<span className='balance-label'>Available balance</span>
									<button
										className='visibility-toggle'
										onClick={() => setShowBalance(!showBalance)}>
										{showBalance ? <Eye size={20} /> : <EyeOff size={20} />}
									</button>
								</div>
								<div className='balance-amount'>
									{showBalance
										? formatCurrency(walletData.totalBalance)
										: "••••••"}
								</div>
								<div
									className={`balance-change ${
										walletData.totalBalanceChange >= 0 ? "positive" : "negative"
									}`}>
									{walletData.totalBalanceChange >= 0 ? (
										<TrendingUp size={16} />
									) : (
										<TrendingDown size={16} />
									)}
									<span>
										{walletData.totalBalanceChange >= 0 ? "+" : ""}
										{walletData.totalBalanceChange}% (24h)
									</span>
								</div>
							</div>
						</div>

						<div className='hero-stats'>
							<div className='hero-stat'>
								<Activity className='stat-icon' />
								<span className='stat-label'>Transition Activity</span>
								<span className='stat-value'>{walletData.tokens.length}</span>
							</div>
							<div className='hero-stat'>
								<Shield className='stat-icon' />
								<span className='stat-label'>Security</span>
								<span className='stat-value'>Bank Grade</span>
							</div>
							<div className='hero-stat'>
								<Zap className='stat-icon' />
								<span className='stat-label'>Network</span>
								<span className='stat-value'>AINT</span>
							</div>
						</div>
					</div>
				</div>

				{/* Main Content */}
				<div className='buy-aint-content'>
					<div className='purchase-section'>
						{/* Quick Actions */}
						<div className='purchase-card'>
							<div className='card-header-buy'>
								<div className='header-icon'>
									<Activity />
								</div>
								<div className='header-text'>
									<h2>Quick Actions</h2>
									<p>Manage your digital assets with ease</p>
								</div>
							</div>

							<div className='wallet-actions-grid'>
								<Link href='/dashboard/aint/buy' className='action-btn primary'>
									<svg
										width='20'
										height='20'
										viewBox='0 0 24 24'
										fill='currentColor'>
										<path d='M7 18c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zM1 2v2h2l3.6 7.59-1.35 2.45c-.16.28-.25.61-.25.96 0 1.1.9 2 2 2h12v-2H7.42c-.14 0-.25-.11-.25-.25l.03-.12L8.1 13h7.45c.75 0 1.41-.41 1.75-1.03L21.7 4H5.21l-.94-2H1zm16 16c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z' />
									</svg>
									<span>Buy AINT</span>
								</Link>
								<Link href='/dashboard/gag/buy' className='action-btn primary'>
									<svg
										width='20'
										height='20'
										viewBox='0 0 24 24'
										fill='currentColor'>
										<path d='M7 18c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zM1 2v2h2l3.6 7.59-1.35 2.45c-.16.28-.25.61-.25.96 0 1.1.9 2 2 2h12v-2H7.42c-.14 0-.25-.11-.25-.25l.03-.12L8.1 13h7.45c.75 0 1.41-.41 1.75-1.03L21.7 4H5.21l-.94-2H1zm16 16c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z' />
									</svg>
									<span>Buy GAG</span>
								</Link>
								<Link
									href='/dashboard/aint/transfer'
									className='action-btn secondary'>
									<svg
										width='20'
										height='20'
										viewBox='0 0 24 24'
										fill='currentColor'>
										<path d='M2.01 21L23 12 2.01 3 2 10l15 2-15 2z' />
									</svg>
									<span>Send/Transfer AINT</span>
								</Link>
								<Link
									href='/dashboard/gag/transfer'
									className='action-btn secondary'>
									<svg
										width='20'
										height='20'
										viewBox='0 0 24 24'
										fill='currentColor'>
										<path d='M2.01 21L23 12 2.01 3 2 10l15 2-15 2z' />
									</svg>
									<span>Send/Transfer GAG</span>
								</Link>
								<Link
									href='/dashboard/aint/marketplace'
									className='action-btn secondary'>
									<svg
										width='20'
										height='20'
										viewBox='0 0 24 24'
										fill='currentColor'>
										<path d='M19 7h-3V6a4 4 0 0 0-8 0v1H5a1 1 0 0 0-1 1v11a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3V8a1 1 0 0 0-1-1zM10 6a2 2 0 0 1 4 0v1h-4V6zm8 15a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V9h2v1a1 1 0 0 0 2 0V9h4v1a1 1 0 0 0 2 0V9h2v12z' />
									</svg>
									<span>Marketplace</span>
								</Link>
								<Link
									href='/dashboard/aint/chart'
									className='action-btn secondary'>
									<svg
										width='20'
										height='20'
										viewBox='0 0 24 24'
										fill='currentColor'>
										<path d='M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zM9 17H7v-7h2v7zm4 0h-2V7h2v10zm4 0h-2v-4h2v4z' />
									</svg>
									<span>Analytics</span>
								</Link>
							</div>
						</div>
						npm
						{/* Token Holdings */}
						{/* <div className="purchase-card">
            <div className="card-header-buy">
              <div className="header-icon">
                <Coins />
              </div>
              <div className="header-text">
                <h2>Token Holdings</h2>
                <p>Your digital asset portfolio</p>
              </div>
            </div>

            <div className="token-holdings">
              {walletData.tokens.map((token) => (
                <div key={token.symbol} className="token-card">
                  <div className="token-info">
                    <div className="token-icon">
                      {token.goldBacked && <Award className="gold-badge" />}
                      <span className="token-symbol">{token.symbol}</span>
                    </div>
                    <div className="token-details">
                      <h4 className="token-name">{token.name}</h4>
                      <p className="token-balance">{formatNumber(token.balance)} {token.symbol}</p>
                    </div>
                  </div>
                  
                  <div className="token-value">
                    <div className="value-amount">
                      {showBalance ? formatCurrency(token.value) : '••••••'}
                    </div>
                    <div className={`value-change ${token.change >= 0 ? 'positive' : 'negative'}`}>
                      {token.change >= 0 ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
                      <span>{token.change >= 0 ? '+' : ''}{token.change}%</span>
                    </div>
                  </div>
                  
                  <div className="token-price">
                    <span className="price-label">Price</span>
                    <span className="price-value">{formatCurrency(token.price)}</span>
                  </div>
                </div>
              ))}
            </div>
          </div> */}
						{/* Recent Transactions */}
						<div className='purchase-card'>
							<div className='card-header-buy'>
								<div className='header-icon'>
									<Clock />
								</div>
								<div className='header-text'>
									<h2>Recent Transactions</h2>
									<p>Your latest wallet activity</p>
								</div>
							</div>

							<div className='transactions-list'>
								{userWalletInfo.recentTransactions.length === 0 ? (
									<p className='no-tx'>No transactions found.</p>
								) : (
									userWalletInfo.recentTransactions.map((tx) => (
										<div key={tx.id} className='transaction-card'>
											<div className='transaction-icon'>
												{tx.type == "buy" && <Plus className='tx-icon buy' />}
												{tx.type == "send" && (
													<ArrowUpRight className='tx-icon send' />
												)}
												{tx.type == "receive" && (
													<ArrowDownLeft className='tx-icon receive' />
												)}
											</div>

											<div className='transaction-details'>
												<div className='tx-main'>
													<span className='tx-type'>
														{tx.type == "buy"
															? "Bought"
															: tx.type == "send"
															? "Sent"
															: "Received"}
													</span>
													<span className='tx-amount'>
														{formatNumber(tx.amount)} {tx.token}
													</span>
												</div>
												<div className='tx-meta'>
													<span className='tx-time'>{tx.time}</span>
													<span className='tx-value'>
														{formatCurrency(tx.value)}
													</span>
												</div>
											</div>

											<div className='transaction-status'>
												<div className={`status-badge ${tx.status}`}>
													{tx.status === "completed" ? (
														<CheckCircle size={16} />
													) : (
														<Clock size={16} />
													)}
													<span>
														{tx.status.charAt(0).toUpperCase() +
															tx.status.slice(1)}
													</span>
												</div>
												{/* <div className="tx-actions">
                        <button
                          className="tx-action-btn"
                          onClick={() => copyToClipboard(tx.hash)}
                          title="Copy transaction hash"
                        >
                          <Copy size={14} />
                        </button>
                        <button className="tx-action-btn" title="View on explorer">
                          <ExternalLink size={14} />
                        </button>
                      </div> */}
											</div>
										</div>
									))
								)}
							</div>

							{/* Pagination Controls */}
							{totalPages > 1 && (
								<div
									className='pagination-controls'
									style={{
										marginTop: "1rem",
										display: "flex",
										justifyContent: "flex-start",
									}}>
									<button
										className='pagination-btn'
										onClick={() =>
											setCurrentPage((prev) => Math.max(prev - 1, 1))
										}
										disabled={currentPage === 1}
										title='Previous Page'>
										<ArrowLeft size={16} />
									</button>

									<span style={{ margin: "0 10px" }}>
										Page {currentPage} of {totalPages}
									</span>

									<button
										className='pagination-btn'
										onClick={() =>
											setCurrentPage((prev) => Math.min(prev + 1, totalPages))
										}
										disabled={currentPage === totalPages}
										title='Next Page'>
										<ArrowRight size={16} />
									</button>
								</div>
							)}
						</div>
					</div>

					{/* Sidebar */}
					<div className='sidebar-section'>
						{/* Wallet Address */}
						<div className='price-card'>
							<div className='price-header'>
								<h3>Wallet Address</h3>
								<div className='price-live-indicator'>
									<div className='live-dot'></div>
									<span>Active</span>
								</div>
							</div>
							<div className='wallet-address'>
								<div className='address-display'>
									<span className='address-text'>
										{user?.wallet_address
											? `${user.wallet_address.slice(
													0,
													6
											  )}...${user.wallet_address.slice(-4)}`
											: "No wallet address"}
									</span>
									{user?.wallet_address && (
										<button
											className='copy-btn'
											onClick={() => copyToClipboard(user.wallet_address)}
											title='Copy wallet address'>
											<Copy size={16} />
										</button>
									)}
								</div>
								<div className='address-qr'>
									<div className='qr-placeholder'>
										<span>QR Code</span>
									</div>
								</div>
							</div>
						</div>

						{/* Portfolio Stats */}
						<div className='features-card'>
							<h3>Current Statistics</h3>
							<div className='portfolio-stats'>
								<div className='stat-item'>
									<div className='stat-icon-wrapper'>
										<TrendingUp className='feature-icon' />
									</div>
									<div className='stat-content'>
										<h4>Assets Diversity</h4>
										<p>AINT, GOLD</p>
									</div>
								</div>
								<div className='stat-item'>
									<div className='stat-icon-wrapper'>
										<DollarSign className='feature-icon' />
									</div>
									<div className='stat-content'>
										<h4>Total Invested</h4>
										<p>{formatCurrency(119234.65)}</p>
									</div>
								</div>
								<div className='stat-item'>
									<div className='stat-icon-wrapper'>
										<Activity className='feature-icon' />
									</div>
									<div className='stat-content'>
										<h4>Total Transactions</h4>
										<p>247 this month</p>
									</div>
								</div>
								<div className='stat-item'>
									<div className='stat-icon-wrapper'>
										<Award className='feature-icon' />
									</div>
									<div className='stat-content'>
										<h4>Gold Holdings</h4>
										<p>12.1kg equivalent</p>
									</div>
								</div>
							</div>
						</div>

						{/* Security Features */}
						<div className='trust-card'>
							<h3>Security & Features</h3>
							<div className='trust-indicators'>
								<div className='trust-item'>
									<div className='trust-badge verified'>
										<Shield className='trust-icon' />
										<span>Multi-Sig Protected</span>
									</div>
								</div>
								<div className='trust-item'>
									<div className='trust-badge secure'>
										<Award className='trust-icon' />
										<span>Gold Backed Assets</span>
									</div>
								</div>
								<div className='trust-item'>
									<div className='trust-badge regulated'>
										<Zap className='trust-icon' />
										<span>Instant Transfers</span>
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

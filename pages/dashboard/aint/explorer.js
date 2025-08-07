import React, { useState } from "react";
import DashboardLayout from "../layout";
import {
	Search,
	Hash,
	User,
	Clock,
	ExternalLink,
	Copy,
	CheckCircle,
} from "lucide-react";

export default function Explorer() {
	const [searchTerm, setSearchTerm] = useState("");
	const [searchType, setSearchType] = useState("auto");
	const [searchResults, setSearchResults] = useState(null);
	const [copied, setCopied] = useState("");

	const searchTypes = [
		{ value: "auto", label: "Auto Detect" },
		{ value: "transaction", label: "Transaction" },
		{ value: "address", label: "Address" },
		{ value: "block", label: "Block" },
	];

	// Mock blockchain data
	const recentBlocks = [
		{
			height: 850432,
			hash: "0x1234567890abcdef1234567890abcdef12345678",
			timestamp: "2024-01-15T10:30:00Z",
			transactions: 2847,
			size: "1.2 MB",
		},
		{
			height: 850431,
			hash: "0x2345678901bcdef12345678901bcdef123456789",
			timestamp: "2024-01-15T10:20:00Z",
			transactions: 3156,
			size: "1.4 MB",
		},
		{
			height: 850430,
			hash: "0x3456789012cdef123456789012cdef1234567890",
			timestamp: "2024-01-15T10:10:00Z",
			transactions: 2934,
			size: "1.3 MB",
		},
	];

	const recentTransactions = [
		{
			hash: "0xabcdef1234567890abcdef1234567890abcdef12",
			from: "0x1234...5678",
			to: "0x9876...5432",
			amount: "125.50",
			token: "AINT",
			timestamp: "2024-01-15T10:35:00Z",
			status: "confirmed",
		},
		{
			hash: "0xbcdef1234567890abcdef1234567890abcdef123",
			from: "0x2345...6789",
			to: "0x8765...4321",
			amount: "89.25",
			token: "AINT",
			timestamp: "2024-01-15T10:33:00Z",
			status: "confirmed",
		},
		{
			hash: "0xcdef1234567890abcdef1234567890abcdef1234",
			from: "0x3456...7890",
			to: "0x7654...3210",
			amount: "256.75",
			token: "AINT",
			timestamp: "2024-01-15T10:31:00Z",
			status: "confirmed",
		},
	];

	const networkStats = {
		totalSupply: "21,000,000",
		circulatingSupply: "18,750,000",
		totalAddresses: "1,250,000",
		totalTransactions: "45,678,901",
		avgBlockTime: "10 minutes",
		networkHashrate: "150 EH/s",
	};

	const handleSearch = () => {
		if (!searchTerm.trim()) return;

		// Mock search logic
		const mockResult = {
			type: "transaction",
			data: {
				hash: searchTerm,
				from: "0x1234567890abcdef1234567890abcdef12345678",
				to: "0x9876543210fedcba9876543210fedcba98765432",
				amount: "125.50",
				token: "AINT",
				fee: "0.001",
				timestamp: "2024-01-15T10:35:00Z",
				blockHeight: 850432,
				confirmations: 6,
				status: "confirmed",
			},
		};

		setSearchResults(mockResult);
	};

	const copyToClipboard = (text, type) => {
		navigator.clipboard.writeText(text);
		setCopied(type);
		setTimeout(() => setCopied(""), 2000);
	};

	const formatTimeAgo = (dateString) => {
		const now = new Date();
		const past = new Date(dateString);
		const diffInMinutes = Math.floor((now - past) / (1000 * 60));

		if (diffInMinutes < 1) return "Just now";
		if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
		if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h ago`;
		return `${Math.floor(diffInMinutes / 1440)}d ago`;
	};

	return (
		<DashboardLayout>
			<div className='explorer-container'>
				<div className='explorer-wrapper'>
					{/* Header */}
					<div className='explorer-header'>
						<h1 className='explorer-title'>AINT Explorer</h1>
						<p className='explorer-subtitle'>
							Explore the AINT blockchain running on Omnilayer
						</p>
					</div>

					<div className='explorer-grid'>
						{/* Search Section */}
						<div className='explorer-card'>
							<h2 className='section-header'>
								<Search />
								Search Blockchain
							</h2>

							<div className='form-group'>
								<label className='form-label'>Search Type</label>
								<select
									value={searchType}
									onChange={(e) => setSearchType(e.target.value)}
									className='form-select'>
									{searchTypes.map((type) => (
										<option key={type.value} value={type.value}>
											{type.label}
										</option>
									))}
								</select>
							</div>

							<div className='form-group'>
								<label className='form-label'>Search Query</label>
								<div className='search-input-container'>
									<input
										type='text'
										value={searchTerm}
										onChange={(e) => setSearchTerm(e.target.value)}
										placeholder='Enter transaction hash, address, or block number...'
										className='form-input search-input'
										onKeyPress={(e) => e.key === "Enter" && handleSearch()}
									/>
									<Search className='search-icon' />
								</div>
							</div>

							<button
								onClick={handleSearch}
								className='btn btn-primary full-width'>
								<Search />
								Search Blockchain
							</button>

							{/* Search Results */}
							{searchResults && (
								<div className='search-results'>
									<h3 className='results-title'>Search Results</h3>
									{searchResults.type === "transaction" && (
										<div className='transaction-details'>
											<div className='detail-grid'>
												<div className='detail-item'>
													<label className='detail-label'>
														Transaction Hash
													</label>
													<div className='hash-container'>
														<code className='hash-code'>
															{searchResults.data.hash}
														</code>
														<button
															onClick={() =>
																copyToClipboard(searchResults.data.hash, "hash")
															}
															className='copy-btn'>
															{copied === "hash" ? (
																<CheckCircle className='copy-success' />
															) : (
																<Copy />
															)}
														</button>
													</div>
												</div>

												<div className='detail-item'>
													<label className='detail-label'>Status</label>
													<span className='status-badge confirmed'>
														{searchResults.data.status}
													</span>
												</div>

												<div className='detail-item'>
													<label className='detail-label'>From</label>
													<code className='address-code'>
														{searchResults.data.from}
													</code>
												</div>

												<div className='detail-item'>
													<label className='detail-label'>To</label>
													<code className='address-code'>
														{searchResults.data.to}
													</code>
												</div>

												<div className='detail-item'>
													<label className='detail-label'>Amount</label>
													<div className='amount-value'>
														{searchResults.data.amount}{" "}
														{searchResults.data.token}
													</div>
												</div>

												<div className='detail-item'>
													<label className='detail-label'>Fee</label>
													<div className='fee-value'>
														{searchResults.data.fee} AINT
													</div>
												</div>

												<div className='detail-item'>
													<label className='detail-label'>Block Height</label>
													<div className='block-height'>
														{searchResults.data.blockHeight.toLocaleString()}
													</div>
												</div>

												<div className='detail-item'>
													<label className='detail-label'>Confirmations</label>
													<div className='confirmations'>
														{searchResults.data.confirmations}
													</div>
												</div>
											</div>
										</div>
									)}
								</div>
							)}
						</div>

						{/* Right Column */}
						<div className='right-column'>
							{/* Network Statistics */}
							<div className='explorer-card'>
								<h3 className='section-header'>
									<Hash />
									Network Statistics
								</h3>
								<div className='stats-list'>
									<div className='stat-item'>
										<span className='stat-label'>Total Supply</span>
										<span className='stat-value'>
											{networkStats.totalSupply} AINT
										</span>
									</div>
									<div className='stat-item'>
										<span className='stat-label'>Circulating Supply</span>
										<span className='stat-value'>
											{networkStats.circulatingSupply} AINT
										</span>
									</div>
									<div className='stat-item'>
										<span className='stat-label'>Total Addresses</span>
										<span className='stat-value'>
											{networkStats.totalAddresses}
										</span>
									</div>
									<div className='stat-item'>
										<span className='stat-label'>Total Transactions</span>
										<span className='stat-value'>
											{networkStats.totalTransactions}
										</span>
									</div>
									<div className='stat-item'>
										<span className='stat-label'>Avg Block Time</span>
										<span className='stat-value'>
											{networkStats.avgBlockTime}
										</span>
									</div>
									<div className='stat-item'>
										<span className='stat-label'>Network Hashrate</span>
										<span className='stat-value'>
											{networkStats.networkHashrate}
										</span>
									</div>
								</div>
							</div>

							{/* Quick Links */}
							<div className='explorer-card'>
								<h3 className='section-header'>
									<ExternalLink />
									Quick Links
								</h3>
								<div className='links-list'>
									<a
										href='https://omniexplorer.info'
										target='_blank'
										rel='noopener noreferrer'
										className='quick-link'>
										<ExternalLink />
										Omnilayer Explorer
									</a>
									<a
										href='https://blockstream.info'
										target='_blank'
										rel='noopener noreferrer'
										className='quick-link'>
										<ExternalLink />
										Bitcoin Explorer
									</a>
									<a
										href='https://aint-token.com/docs'
										target='_blank'
										rel='noopener noreferrer'
										className='quick-link'>
										<ExternalLink />
										AINT Documentation
									</a>
									<a
										href='https://aint-token.com/api'
										target='_blank'
										rel='noopener noreferrer'
										className='quick-link'>
										<ExternalLink />
										API Documentation
									</a>
								</div>
							</div>

							{/* Recent Blocks */}
							<div className='explorer-card'>
								<h3 className='section-header'>
									<Hash />
									Recent Blocks
								</h3>
								<div className='table-container'>
									<table className='blocks-table'>
										<thead className='table-header'>
											<tr>
												<th className='table-th'>Height</th>
												<th className='table-th'>Hash</th>
												<th className='table-th'>Txs</th>
												<th className='table-th'>Time</th>
											</tr>
										</thead>
										<tbody className='table-body'>
											{recentBlocks.map((block) => (
												<tr key={block.height} className='table-row'>
													<td className='table-td'>
														<a
															href={`https://omniexplorer.info/block/${block.height}`}
															target='_blank'
															rel='noopener noreferrer'
															className='block-link'>
															{block.height.toLocaleString()}
														</a>
													</td>
													<td className='table-td'>
														<code className='hash-short'>
															{block.hash.substring(0, 12)}...
														</code>
													</td>
													<td className='table-td'>
														{block.transactions.toLocaleString()}
													</td>
													<td className='table-td time-cell'>
														{formatTimeAgo(block.timestamp)}
													</td>
												</tr>
											))}
										</tbody>
									</table>
								</div>
							</div>

							{/* Recent Transactions */}
							<div className='explorer-card'>
								<h3 className='section-header'>
									<User />
									Recent Transactions
								</h3>
								<div className='transactions-list'>
									{recentTransactions.map((tx) => (
										<div key={tx.hash} className='transaction-card'>
											<div className='transaction-header'>
												<a
													href={`https://omniexplorer.info/tx/${tx.hash}`}
													target='_blank'
													rel='noopener noreferrer'
													className='transaction-link'>
													<code className='transaction-hash'>
														{tx.hash.substring(0, 20)}...
													</code>
												</a>
												<span className='transaction-time'>
													<Clock />
													{formatTimeAgo(tx.timestamp)}
												</span>
											</div>
											<div className='transaction-details-grid'>
												<div className='transaction-detail'>
													<span className='detail-label-small'>From: </span>
													<a
														href={`https://omniexplorer.info/address/${tx.from}`}
														target='_blank'
														rel='noopener noreferrer'
														className='address-link'>
														<code className='address-small'>{tx.from}</code>
													</a>
												</div>
												<div className='transaction-detail'>
													<span className='detail-label-small'>To: </span>
													<a
														href={`https://omniexplorer.info/address/${tx.to}`}
														target='_blank'
														rel='noopener noreferrer'
														className='address-link'>
														<code className='address-small'>{tx.to}</code>
													</a>
												</div>
												<div className='transaction-detail'>
													<span className='detail-label-small'>Amount: </span>
													<span className='amount-small'>
														{tx.amount} {tx.token}
													</span>
												</div>
											</div>
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

import React, { useState, useEffect, useRef } from "react";
import DashboardLayout from "../layout";
import {
	QrCode,
	Copy,
	Download,
	Share2,
	Wallet,
	CheckCircle,
	RefreshCw,
} from "lucide-react";
import QRCode from "qrcode";

export default function ReceiveAINT() {
	const [selectedToken, setSelectedToken] = useState("AINT");
	const [amount, setAmount] = useState("");
	const [memo, setMemo] = useState("");
	const [copied, setCopied] = useState(false);
	const [qrCodeDataUrl, setQrCodeDataUrl] = useState("");
	const [isGeneratingQR, setIsGeneratingQR] = useState(false);
	const canvasRef = useRef(null);

	// Mock wallet address - in real app, this would come from user's wallet
	const walletAddress = "aint1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh";

	const supportedTokens = [
		{ symbol: "AINT", name: "AINT Token", network: "Omnilayer" },
		{ symbol: "BTC", name: "Bitcoin", network: "Bitcoin" },
		{ symbol: "ETH", name: "Ethereum", network: "Ethereum" },
		{ symbol: "BNB", name: "Binance Coin", network: "BSC" },
		{ symbol: "XRP", name: "Ripple", network: "XRP Ledger" },
	];

	const copyToClipboard = (text) => {
		navigator.clipboard.writeText(text);
		setCopied(true);
		setTimeout(() => setCopied(false), 2000);
	};

	const generateQRData = () => {
		let qrData = walletAddress;

		// Add amount and memo to QR code data
		const params = new URLSearchParams();
		if (amount) {
			params.append("amount", amount);
		}
		if (memo) {
			params.append("memo", memo);
		}

		if (params.toString()) {
			qrData += `?${params.toString()}`;
		}

		return qrData;
	};

	const generateQRCode = async () => {
		setIsGeneratingQR(true);
		try {
			const qrData = generateQRData();
			console.log("Generating QR code for:", qrData); // Debug log

			const options = {
				width: 256,
				margin: 2,
				color: {
					dark: "#000000",
					light: "#FFFFFF",
				},
				errorCorrectionLevel: "M",
			};

			const dataUrl = await QRCode.toDataURL(qrData, options);
			setQrCodeDataUrl(dataUrl);
			console.log("QR code generated successfully"); // Debug log
		} catch (error) {
			console.error("Error generating QR code:", error);
			setQrCodeDataUrl(""); // Clear any previous QR code on error
		} finally {
			setIsGeneratingQR(false);
		}
	};

	const downloadQR = async () => {
		if (!qrCodeDataUrl) return;

		try {
			const link = document.createElement("a");
			link.download = `${selectedToken}_wallet_qr.png`;
			link.href = qrCodeDataUrl;
			document.body.appendChild(link);
			link.click();
			document.body.removeChild(link);
		} catch (error) {
			console.error("Error downloading QR code:", error);
			alert("Failed to download QR code. Please try again.");
		}
	};

	const shareAddress = () => {
		if (navigator.share) {
			navigator.share({
				title: `My ${selectedToken} Wallet Address`,
				text: `Send ${selectedToken} to this address: ${walletAddress}`,
				url: window.location.href,
			});
		} else {
			copyToClipboard(walletAddress);
		}
	};

	// Generate QR code when component mounts or when data changes
	useEffect(() => {
		const timer = setTimeout(() => {
			generateQRCode();
		}, 100); // Small delay to ensure component is fully mounted

		return () => clearTimeout(timer);
	}, [selectedToken, amount, memo]);

	// Retry QR generation if it fails
	const retryQRGeneration = () => {
		if (!isGeneratingQR) {
			generateQRCode();
		}
	};

	return (
		<DashboardLayout>
			<div className='receive-container'>
				<div className='receive-wrapper'>
					{/* Header */}
					<div className='receive-header'>
						<h1 className='receive-title'>Receive Tokens</h1>
						<p className='receive-subtitle'>
							Share your wallet address or QR code to receive payments
						</p>
					</div>

					<div className='receive-grid'>
						{/* QR Code Section */}
						<div className='receive-card'>
							<h2 className='section-header'>
								<QrCode />
								QR Code
							</h2>

							{/* Token Selection */}
							<div className='form-group'>
								<label className='form-label'>Select Token</label>
								<select
									value={selectedToken}
									onChange={(e) => setSelectedToken(e.target.value)}
									className='form-select'>
									{supportedTokens.map((token) => (
										<option key={token.symbol} value={token.symbol}>
											{token.name} ({token.symbol}) - {token.network}
										</option>
									))}
								</select>
							</div>

							{/* QR Code Display */}
							<div className='qr-display'>
								<div className='qr-code-container'>
									{isGeneratingQR ? (
										<div className='qr-loading'>
											<RefreshCw className='loading-spinner' />
											<span>Generating QR Code...</span>
										</div>
									) : qrCodeDataUrl ? (
										<div className='qr-code-wrapper'>
											<img
												src={qrCodeDataUrl}
												alt={`${selectedToken} Wallet QR Code`}
												className='qr-code-image'
												style={{
													width: "256px",
													height: "256px",
													maxWidth: "100%",
													border: "1px solid #e5e7eb",
													borderRadius: "8px",
													padding: "8px",
													backgroundColor: "#ffffff",
												}}
											/>
										</div>
									) : (
										<div className='qr-error'>
											<QrCode />
											<span>Failed to generate QR code</span>
										</div>
									)}
								</div>
								<p className='qr-description'>
									Scan this QR code to send {selectedToken} to your wallet
								</p>
								{amount && (
									<p className='qr-amount'>
										Amount: {amount} {selectedToken}
									</p>
								)}
								{memo && <p className='qr-memo'>Memo: {memo}</p>}
							</div>

							{/* QR Actions */}
							<div className='btn-grid'>
								<button
									onClick={downloadQR}
									className='btn btn-outline'
									disabled={!qrCodeDataUrl || isGeneratingQR}>
									<Download />
									Download
								</button>
								<button onClick={shareAddress} className='btn btn-primary'>
									<Share2 />
									Share
								</button>
								<button
									onClick={generateQRCode}
									className='btn btn-secondary'
									disabled={isGeneratingQR}>
									<RefreshCw
										className={isGeneratingQR ? "loading-spinner" : ""}
									/>
									Refresh
								</button>
							</div>
						</div>

						{/* Address & Details Section */}
						<div className='right-column'>
							{/* Wallet Address */}
							<div className='receive-card'>
								<h3 className='section-header'>
									<Wallet />
									Wallet Address
								</h3>

								<div className='address-container'>
									<div className='address-display'>
										<code className='address-text'>{walletAddress}</code>
										<button
											onClick={() => copyToClipboard(walletAddress)}
											className='copy-btn'>
											{copied ? (
												<CheckCircle className='copy-success' />
											) : (
												<Copy />
											)}
										</button>
									</div>
								</div>

								{copied && (
									<p className='success-message'>
										<CheckCircle />
										Address copied to clipboard!
									</p>
								)}

								<p className='qr-description'>
									This is your {selectedToken} wallet address. Share this with
									others to receive payments.
								</p>
							</div>

							{/* Payment Request */}
							<div className='receive-card'>
								<h3 className='section-header'>Payment Request (Optional)</h3>

								{/* Amount */}
								<div className='form-group'>
									<label className='form-label'>Requested Amount</label>
									<div className='input-with-suffix'>
										<input
											type='number'
											value={amount}
											onChange={(e) => setAmount(e.target.value)}
											className='form-input'
											placeholder='Enter amount'
											min='0'
											step='0.000001'
										/>
										<div className='input-suffix'>{selectedToken}</div>
									</div>
								</div>

								{/* Memo */}
								<div className='form-group'>
									<label className='form-label'>Payment Memo</label>
									<input
										type='text'
										value={memo}
										onChange={(e) => setMemo(e.target.value)}
										className='form-input'
										placeholder='What is this payment for?'
										maxLength='100'
									/>
								</div>

								<p className='qr-description'>
									Adding amount and memo will include them in the QR code for
									easier payments.
								</p>
							</div>

							{/* Security Tips */}
							<div className='receive-card'>
								<h3 className='section-header'>Security Tips</h3>
								<div className='tip-list'>
									<div className='tip-item'>
										<CheckCircle />
										<span>Only share your address with trusted parties</span>
									</div>
									<div className='tip-item'>
										<CheckCircle />
										<span>Verify the sender before expecting payments</span>
									</div>
									<div className='tip-item'>
										<CheckCircle />
										<span>Check transaction confirmations</span>
									</div>
									<div className='tip-item'>
										<CheckCircle />
										<span>Keep your private keys secure</span>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>

			<style jsx>{`
				.qr-loading {
					display: flex;
					flex-direction: column;
					align-items: center;
					justify-content: center;
					height: 256px;
					color: #6b7280;
				}

				.loading-spinner {
					animation: spin 1s linear infinite;
				}

				@keyframes spin {
					from {
						transform: rotate(0deg);
					}
					to {
						transform: rotate(360deg);
					}
				}

				.qr-code-wrapper {
					display: flex;
					justify-content: center;
					align-items: center;
				}

				.qr-error {
					display: flex;
					flex-direction: column;
					align-items: center;
					justify-content: center;
					height: 256px;
					color: #ef4444;
				}

				.qr-amount,
				.qr-memo {
					margin-top: 8px;
					font-size: 14px;
					color: #6b7280;
					text-align: center;
				}

				.btn-secondary {
					background-color: #f3f4f6;
					color: #374151;
					border: 1px solid #d1d5db;
				}

				.btn-secondary:hover {
					background-color: #e5e7eb;
				}

				.btn-secondary:disabled {
					opacity: 0.5;
					cursor: not-allowed;
				}
			`}</style>
		</DashboardLayout>
	);
}

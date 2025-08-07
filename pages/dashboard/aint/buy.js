import React, { useEffect, useState } from "react";
import DashboardLayout from "../layout";
import { toast } from "react-toastify";
import Modal from "react-modal";
import { useAuth } from "../../../contexts/AuthContext";
import { useGoldPrice } from "../../../hooks/useGoldPrice";

import {
	CreditCard,
	DollarSign,
	Banknote,
	Shield,
	Clock,
	CheckCircle,
	TrendingUp,
	Lock,
	Zap,
	Upload,
	X,
	Award,
} from "lucide-react";

export default function BuyAINT() {
	const { user, loading: authLoading } = useAuth();
	const {
		aintPrice,
		aintPriceFormatted,
		goldPricePerGram,
		goldPricePerGramFormatted,
		goldWeight,
		loading: priceLoading,
		error: priceError,
		calculateAint,
		getGoldWeight,
	} = useGoldPrice();

	console.log(user);

	const [showBankModal, setShowBankModal] = useState(false);
	const [usdAmountForModal, setUsdAmountForModal] = useState("");
	const [calculatedAint, setCalculatedAint] = useState("0.000000");
	const [userWallet, setUserWallet] = useState("");
	const [paymentProof, setPaymentProof] = useState(null);
	const [amount, setAmount] = useState("");
	const [paymentMethod, setPaymentMethod] = useState("bank");
	const [selectedBank, setSelectedBank] = useState("");
	const [loading, setLoading] = useState(false);
	const [fluctuation, setFluctuation] = useState(0);
	const [showMidtransModal, setShowMidtransModal] = useState(false);
	const [midtransUsdAmount, setMidtransUsdAmount] = useState("");
	const [midtransAintAmount, setMidtransAintAmount] = useState("");
	const [midtransIdrAmount, setMidtransIdrAmount] = useState("");
	const [midtransWallet, setMidtransWallet] = useState("");
	const [usdToIdrRate, setUsdToIdrRate] = useState(16000); // Default fallback

	// Set wallet address from user when modal opens
	useEffect(() => {
		if (showMidtransModal && user?.wallet_address) {
			setMidtransWallet(user.wallet_address);
		}
	}, [showMidtransModal, user]);

	useEffect(() => {
		if (showMidtransModal && user?.wallet_address) {
			setUserWallet(user.wallet_address);
		}
	}, [showMidtransModal, user]);

	// Calculate AINT amount when USD amount changes
	useEffect(() => {
		const calculateAintAmount = async () => {
			if (amount && parseFloat(amount) > 0) {
				try {
					const aintAmount = await calculateAint(amount);
					setCalculatedAint(aintAmount.toString());
				} catch (error) {
					console.error("Error calculating AINT amount:", error);
					setCalculatedAint("0.000000");
				}
			} else {
				setCalculatedAint("0.000000");
			}
		};

		calculateAintAmount();
	}, [amount, calculateAint]);

	useEffect(() => {
		const fluctuationInterval = setInterval(() => {
			const randomFluctuation = (Math.random() * 0.09).toFixed(2);
			setFluctuation(parseFloat(randomFluctuation));
		}, 3000);
		return () => clearInterval(fluctuationInterval);
	}, []);

	useEffect(() => {
		const fetchExchangeRates = async () => {
			try {
				const response = await fetch(
					"https://api.exchangeratesapi.io/v1/latest?access_key=c327d0cac6bfe4e81068cd9296d0db03&symbols=IDR,USD"
				);
				const data = await response.json();

				console.log("Exchange Rate Data:", data);

				if (data.success && data.rates) {
					const eurToIdr = data.rates.IDR;
					const eurToUsd = data.rates.USD;

					// Calculate USD ➔ IDR
					const usdToIdr = eurToIdr / eurToUsd;

					console.log("1 USD =", usdToIdr, "IDR");

					setUsdToIdrRate(usdToIdr);
				}
			} catch (error) {
				console.error("Error fetching exchange rates:", error);
			}
		};

		fetchExchangeRates();
	}, []);

	const animatedAintPrice = (aintPrice + fluctuation).toFixed(2);

	const paymentMethods = [
		{
			id: "bank",
			name: "Bank Transfer",
			icon: Banknote,
			description: "Direct bank transfer",
			fee: "Available",
			enabled: true,
		},
		{
			id: "card",
			name: "Credit/Debit Card",
			icon: CreditCard,
			description: "Visa, Mastercard",
			fee: "Currently Unavailable",
			enabled: false,
		},
		{
			id: "xendit",
			name: "Xendit",
			icon: Shield,
			description: "Digital wallet",
			fee: "Currently Unavailable",
			enabled: false,
		},
		{
			id: "midtrans",
			name: "Midtrans",
			icon: Shield,
			description: "Payment gateway",
			fee: "Available",
			enabled: true,
		},
		{
			id: "moonpay",
			name: "MoonPay",
			icon: Shield,
			description: "Crypto payment",
			fee: "Currently Unavailable",
			enabled: false,
		},
	];

	const indonesianBanks = [
		"Bank Central Asia (BCA)",
		"Bank Mandiri",
		"Bank Negara Indonesia (BNI)",
		"Bank Rakyat Indonesia (BRI)",
		"Bank CIMB Niaga",
		"Bank Danamon",
		"Bank Permata",
		"Others",
	];

	const calculateAintAmount = () => {
		const numericAmount = parseFloat(amount);
		if (isNaN(numericAmount) || numericAmount <= 0) return "0.000000";
		const aintPriceUSD = goldPricePerGram * goldWeight;
		return (numericAmount / aintPriceUSD).toFixed(6);
	};

	const handlePurchase = async () => {
		if (!amount || parseFloat(amount) <= 0 || loading) {
			toast("Please enter a valid amount.");
			return;
		}

		if (!amount || loading) return;

		if (paymentMethod == "bank" && !selectedBank) {
			toast("Please select your bank.");
			return;
		}

		setLoading(true);

		try {
			const currentAint = calculateAintAmount();
			const usdValue = parseFloat(amount).toFixed(2);
			const idrValue = (parseFloat(amount) * usdToIdrRate).toFixed(0);

			if (paymentMethod === "bank") {
				setCalculatedAint(currentAint);
				setShowBankModal(true);
				setLoading(false);
				return;
			}

			if (paymentMethod === "midtrans") {
				setMidtransUsdAmount(usdValue);
				setMidtransAintAmount(currentAint);
				setMidtransIdrAmount(idrValue);
				setShowMidtransModal(true);
				setLoading(false);
				return;
			}
		} catch (error) {
			console.error("Purchase error:", error);
			toast("An unexpected error occurred. Please try again.");
		} finally {
			setLoading(false);
		}
	};

	const bankDetails = {
		name: "PT. Bank Mandiri Tbk",
		account: "1180088885651",
		holder: "PT Alpha Indo Nusa",
	};

	const handleFileChange = (e) => {
		setPaymentProof(e.target.files[0]);
	};

	const handleBankSubmit = async () => {
		if (!paymentProof) {
			toast("Please upload payment proof.");
			return;
		}

		if (!user?.wallet_address) {
			toast("Please enter your wallet address.");
			return;
		}

		const aintAmount = calculateAintAmount();

		const formData = new FormData();
		formData.append("amount", usdAmountForModal); // USD amount
		formData.append("aintAmount", calculatedAint); // AINT amount
		formData.append("bankName", bankDetails.name);
		formData.append("userWallet", user?.wallet_address || "");
		formData.append("userId", user?.id || "");
		formData.append("file", paymentProof);

		try {
			const res = await fetch("/api/admin/aint/bank-payment", {
				method: "POST",
				body: formData,
			});

			const data = await res.json();

			if (data.success) {
				toast("Payment submitted successfully!");
				setShowBankModal(false);
				setPaymentProof(null);
				setUserWallet(""); // Reset wallet field
			} else {
				toast(data.message || "Submission failed.");
			}
		} catch (error) {
			console.error("Error submitting payment:", error);
			toast("An error occurred. Please try again.");
		}
	};

	// Show loading state while user data is being fetched
	if (authLoading) {
		return (
			<DashboardLayout>
				<div className='flex items-center justify-center min-h-screen'>
					<div className='text-center'>
						<div className='animate-spin rounded-full h-12 w-12 border-b-2 border-amber-500 mx-auto mb-4'></div>
						<p className='text-gray-600'>Loading...</p>
					</div>
				</div>
			</DashboardLayout>
		);
	}

	return (
		<DashboardLayout>
			<div className='buy-aint-container'>
				<div className='buy-aint-hero'>
					<div className='hero-content'>
						<div className='hero-badge'>
							<Award className='badge-icon' />
							<span>Gold-Backed Digital Asset</span>
						</div>
						<h1 className='hero-title'>Buy AINT Tokens</h1>
						<p className='hero-description'>
							Secure your future with gold-backed digital tokens. Each AINT
							token represents 4.25 grams of real gold.
						</p>
						<div className='hero-stats'>
							<div className='hero-stat'>
								<TrendingUp className='stat-icon' />
								<span className='stat-label'>24h Change</span>
								<span className='stat-value positive'>+2.4%</span>
							</div>
							<div className='hero-stat'>
								<Lock className='stat-icon' />
								<span className='stat-label'>Security</span>
								<span className='stat-value'>Bank Grade</span>
							</div>
							<div className='hero-stat'>
								<Zap className='stat-icon' />
								<span className='stat-label'>Transaction</span>
								<span className='stat-value'>Instant</span>
							</div>
						</div>
					</div>
				</div>

				<div className='buy-aint-content'>
					<div className='purchase-section'>
						<div className='purchase-card'>
							<div className='card-header-buy'>
								<div className='header-icon'>
									<DollarSign />
								</div>
								<div className='header-text'>
									<h2>Purchase AINT Tokens</h2>
									<p>Choose your investment amount and payment method</p>
								</div>
							</div>
							<div className='purchase-form'>
								<div className='form-group-buy'>
									<label className='form-label-buy'>Investment Amount</label>
									<div className='amount-input-container'>
										<div className='currency-prefix'>$</div>
										<input
											type='number'
											className='amount-input'
											value={amount}
											onChange={(e) => {
												setAmount(e.target.value);
												setUsdAmountForModal(e.target.value);
											}}
											placeholder='0.00'
											min='10'
											step='0.01'
										/>
										<div className='currency-suffix'>USD</div>
									</div>
									{amount && (
										<div className='conversion-info'>
											<div className='conversion-row'>
												<span>You will receive:</span>
												<span className='aint-amount'>
													{calculateAintAmount()} AINT
												</span>
											</div>
											<div className='conversion-row'>
												<span>Equivalent gold:</span>
												<span className='gold-amount'>
													{(
														parseFloat(calculateAintAmount()) * goldWeight
													).toFixed(3)}
													g
												</span>
											</div>
										</div>
									)}
								</div>

								<div className='form-group-buy'>
									<label className='form-label-buy'>Payment Method</label>
									<div className='payment-methods-grid'>
										{paymentMethods.map((method) => {
											const Icon = method.icon;
											const isDisabled = !method.enabled;

											return (
												<div
													key={method.id}
													className={`payment-method-card ${
														paymentMethod === method.id ? "selected" : ""
													} ${isDisabled ? "disabled" : ""}`}
													onClick={() => {
														if (!isDisabled) setPaymentMethod(method.id);
													}}
													style={{
														cursor: isDisabled ? "not-allowed" : "pointer",
														opacity: isDisabled ? 0.5 : 1,
													}}>
													<div className='payment-method-header'>
														<Icon className='payment-icon' />
														<div className='payment-fee'>{method.fee}</div>
													</div>
													<div className='payment-method-info'>
														<h4>{method.name}</h4>
														<p>{method.description}</p>
													</div>
													<div className='payment-method-indicator'>
														{paymentMethod === method.id && !isDisabled && (
															<CheckCircle className='check-icon' />
														)}
													</div>
												</div>
											);
										})}
									</div>
								</div>

								{paymentMethod === "bank" && (
									<div className='form-group-buy'>
										<label className='form-label-buy'>Select Your Bank</label>
										<div className='bank-select-container'>
											<select
												className='bank-select'
												value={selectedBank}
												onChange={(e) => setSelectedBank(e.target.value)}>
												<option value=''>Choose your bank</option>
												{indonesianBanks.map((bank) => (
													<option key={bank} value={bank}>
														{bank}
													</option>
												))}
											</select>
										</div>
									</div>
								)}

								<div className='purchase-button-container'>
									<button
										className={`purchase-button ${
											!amount ||
											loading ||
											(paymentMethod === "bank" && !selectedBank)
												? "disabled"
												: ""
										}`}
										onClick={handlePurchase}
										disabled={
											!amount ||
											loading ||
											(paymentMethod === "bank" && !selectedBank)
										}>
										{loading ? (
											<div className='button-loading'>
												<Clock className='loading-icon' />
												<span>Processing...</span>
											</div>
										) : (
											<div className='button-content'>
												<CheckCircle className='button-icon' />
												<span>Purchase AINT Tokens</span>
											</div>
										)}
									</button>
								</div>
							</div>
						</div>
					</div>

					<div className='sidebar-section'>
						<div className='price-card'>
							<div className='price-header'>
								<h3>Current Market Price</h3>
								<div className='price-live-indicator'>
									<div className='live-dot animate-ping bg-green-500 rounded-full w-2 h-2'></div>
									<span>Live</span>
								</div>
							</div>

							<div className='price-details'>
								{priceLoading ? (
									<p>Loading...</p>
								) : (
									<>
										<div className='price-row'>
											<span className='price-label'>Gold Price (per gram)</span>
											<span className='price-value'>
												{goldPricePerGramFormatted}
											</span>
										</div>

										<div className='price-row main-price'>
											<span className='price-label'>
												1 AINT = {goldWeight}g Gold
											</span>
											<span className='price-value primary'>
												${animatedAintPrice}
											</span>
										</div>

										<div className='price-calculation'>
											<small>
												Updated in real-time based on live gold market prices
											</small>
										</div>
									</>
								)}
							</div>
						</div>

						<div className='features-card'>
							<h3>Why Choose AINT?</h3>
							<div className='features-list'>
								<div className='feature-item'>
									<CheckCircle className='feature-icon' />
									<div className='feature-content'>
										<h4>Gold-Backed Security</h4>
										<p>Each token backed by real gold reserves</p>
									</div>
								</div>
								<div className='feature-item'>
									<Shield className='feature-icon' />
									<div className='feature-content'>
										<h4>Blockchain Technology</h4>
										<p>Secure and transparent transactions</p>
									</div>
								</div>
								<div className='feature-item'>
									<Zap className='feature-icon' />
									<div className='feature-content'>
										<h4>Instant Processing</h4>
										<p>Quick and efficient token delivery</p>
									</div>
								</div>
								<div className='feature-item'>
									<Lock className='feature-icon' />
									<div className='feature-content'>
										<h4>Bank-Grade Security</h4>
										<p>Multiple layers of protection</p>
									</div>
								</div>
							</div>
						</div>

						<div className='trust-card'>
							<h3>Trust & Security</h3>
							<div className='trust-indicators'>
								<div className='trust-item'>
									<div className='trust-badge verified'>
										<Award className='trust-icon' />
										<span>Verified</span>
									</div>
								</div>
								<div className='trust-item'>
									<div className='trust-badge secure'>
										<Shield className='trust-icon' />
										<span>SSL Secured</span>
									</div>
								</div>
								<div className='trust-item'>
									<div className='trust-badge regulated'>
										<Lock className='trust-icon' />
										<span>Regulated</span>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>

			{/* ✅ showMidtransModal Modal content */}
			{showMidtransModal && (
				<Modal
					isOpen={showMidtransModal}
					onRequestClose={() => setShowMidtransModal(false)}
					className='bank-modal-content'
					overlayClassName='bank-modal-overlay'>
					<button
						onClick={() => setShowMidtransModal(false)}
						className='bank-modal-close-btn'>
						<X size={18} />
					</button>

					<h2 className='bank-modal-title mb-5'>Complete Your Payment</h2>

					<div className='paying_Amount mt-4 mb-2'>
						USD: ${midtransUsdAmount}
					</div>
					<div className='paying_Amount mb-4'>IDR: Rp {midtransIdrAmount}</div>

					<div className='bank-modal-info mb-3 mt-5'>
						<p>
							<strong>You will receive:</strong> {midtransAintAmount} AINT
						</p>
					</div>

					<input
						type='hidden'
						className='bank-modal-wallet-input form-input'
						placeholder='Enter your wallet address'
						value={midtransWallet}
						readOnly
						onChange={(e) => setMidtransWallet(e.target.value)}
					/>

					<div className='bank-modal-actions mt-4'>
						<button
							className='bank-modal-cancel-btn'
							onClick={() => setShowMidtransModal(false)}>
							Cancel
						</button>
						<button
							className={`bank-modal-submit-btn ${
								!midtransWallet ? "disabled" : ""
							}`}
							onClick={async () => {
								if (!midtransWallet) {
									toast("Please enter wallet address.");
									return;
								}

								setLoading(true);

								try {
									const response = await fetch(
										"/api/admin/aint/midtrans-get-snap-token",
										{
											method: "POST",
											headers: { "Content-Type": "application/json" },
											body: JSON.stringify({
												amount: midtransIdrAmount,
												usdAmount: midtransUsdAmount,
												aintAmount: midtransAintAmount,
												user: {
													id: user?.id || "",
													name: user?.full_name || "",
													email: user?.email || "",
												},
												userWalletAddress: midtransWallet,
											}),
										}
									);

									const text = await response.text();
									let result;
									try {
										result = JSON.parse(text);
									} catch {
										result = { success: false, raw: text };
									}

									console.log("HTTP:", response.status, response.statusText);
									console.log("Body:", result);

									if (result.success && result.snapToken) {
										window.snap.pay(result.snapToken, {
											onSuccess: () => toast.success("Payment successful!"),
											onPending: () => toast.info("Payment is pending."),
											onError: () => toast.error("Payment failed."),
											onClose: () => toast("Payment popup closed."),
										});
										setShowMidtransModal(false);
									} else {
										toast.error(
											result.message ||
												result.error ||
												"Failed to initiate payment."
										);
									}
								} catch (err) {
									console.error("Fetch error:", err);
									toast.error("An unexpected error occurred.");
								} finally {
									setLoading(false);
								}
							}}
							disabled={!midtransWallet || loading}>
							<CheckCircle size={16} style={{ marginRight: "6px" }} />
							Proceed to Payment
						</button>
					</div>
				</Modal>
			)}

			{/* ✅ Modal content directly on page */}
			{showBankModal && (
				<Modal
					isOpen={showBankModal} // Use the correct state
					onRequestClose={() => setShowBankModal(false)} // Close modal correctly
					className='bank-modal-content'
					overlayClassName='bank-modal-overlay'>
					<button
						onClick={() => setShowBankModal(false)}
						className='bank-modal-close-btn'>
						<X size={18} />
					</button>

					<h2 className='bank-modal-title'>Bank Transfer Instructions</h2>

					<div className='paying_Amount mt-4 mb-4'>
						${parseFloat(usdAmountForModal || 0).toFixed(2)}
					</div>
					<div className='bank-modal-info'>
						<p>
							<strong>Bank:</strong> {bankDetails.name}
						</p>
						<p>
							<strong>Account Number:</strong> {bankDetails.account}
						</p>
						<p>
							<strong>Account Holder:</strong> {bankDetails.holder}
						</p>
						<p>
							<strong>Amount:</strong>
							<span className='bank-modal-aint'>
								{" "}
								(You'll receive {calculatedAint} AINT)
							</span>
						</p>
					</div>

					{/* ✅ Hidden inputs for backend */}
					<input type='hidden' name='amount_usd' value={usdAmountForModal} />
					<input type='hidden' name='aint_amount' value={calculatedAint} />

					<div className='bank-modal-divider'></div>

					<input
						type='hidden'
						className='bank-modal-wallet-input form-input'
						value={user?.wallet_address ?? ""}
					/>

					<div className='bank-modal-upload-section'>
						<label className='bank-modal-upload-label'>
							<Upload size={16} style={{ marginRight: "8px" }} />
							Upload Payment Proof
						</label>
						<input
							type='file'
							className='bank-modal-file-input'
							onChange={handleFileChange}
							accept='image/jpeg, image/jpg, image/png, application/pdf'
						/>
					</div>

					<div className='bank-modal-actions'>
						<button
							className='bank-modal-cancel-btn'
							onClick={() => setShowBankModal(false)}>
							Cancel
						</button>
						<button
							className={`bank-modal-submit-btn ${
								!paymentProof ? "disabled" : ""
							}`}
							onClick={handleBankSubmit} // ✅ Call the correct function
							disabled={!paymentProof}>
							<CheckCircle size={16} style={{ marginRight: "6px" }} />
							Submit
						</button>
					</div>
				</Modal>
			)}
		</DashboardLayout>
	);
}

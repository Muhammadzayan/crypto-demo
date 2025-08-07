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

export default function BuyGAG() {
	const { user } = useAuth();
	const {
		gagPrice,
		gagPriceFormatted,
		goldPricePerGram,
		goldPricePerGramFormatted,
		goldWeight,
		loading: priceLoading,
		error: priceError,
		calculateGag,
		getGoldWeightGag,
	} = useGoldPrice();

	console.log(user);

	const [showBankModal, setShowBankModal] = useState(false);
	const [usdAmountForModal, setUsdAmountForModal] = useState("");
	const [calculatedGag, setCalculatedGag] = useState("0.000000");
	const [userWallet, setUserWallet] = useState("");
	const [paymentProof, setPaymentProof] = useState(null);
	const [amount, setAmount] = useState("");
	const [paymentMethod, setPaymentMethod] = useState("bank");
	const [selectedBank, setSelectedBank] = useState("");
	const [loading, setLoading] = useState(false);
	const [fluctuation, setFluctuation] = useState(0);
	const [showMidtransModal, setShowMidtransModal] = useState(false);
	const [midtransUsdAmount, setMidtransUsdAmount] = useState("");
	const [midtransGagAmount, setMidtransGagAmount] = useState("");
	const [midtransIdrAmount, setMidtransIdrAmount] = useState("");
	const [midtransWallet, setMidtransWallet] = useState("");
	const [usdToIdrRate, setUsdToIdrRate] = useState(16000); // Default fallback

	// Set wallet address from user when modal opens
	useEffect(() => {
		if (showMidtransModal && user?.wallet_address) {
			setMidtransWallet(user.wallet_address);
		}
	}, [showMidtransModal]);

	useEffect(() => {
		if (showMidtransModal && user?.wallet_address) {
			setUserWallet(user.wallet_address);
		}
	}, [showMidtransModal, user]);

	// Calculate GAG amount when USD amount changes
	useEffect(() => {
		const calculateGagAmount = async () => {
			if (amount && parseFloat(amount) > 0) {
				try {
					const gagAmount = await calculateGag(amount);
					setCalculatedGag(gagAmount.toString());
				} catch (error) {
					console.error("Error calculating GAG amount:", error);
					setCalculatedGag("0.000000");
				}
			} else {
				setCalculatedGag("0.000000");
			}
		};

		calculateGagAmount();
	}, [amount, calculateGag]);

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
				if (data.success && data.rates) {
					setUsdToIdrRate(data.rates.IDR);
				}
			} catch (error) {
				console.error("Error fetching exchange rates:", error);
			}
		};

		fetchExchangeRates();
	}, []);

	const calculateGagAmount = () => {
		if (amount && parseFloat(amount) > 0) {
			const gagAmount = parseFloat(amount) / gagPrice;
			return gagAmount.toFixed(6);
		}
		return "0.000000";
	};

	const handlePurchase = async () => {
		if (!amount || parseFloat(amount) <= 0) {
			toast.error("Please enter a valid amount");
			return;
		}

		if (!paymentMethod) {
			toast.error("Please select a payment method");
			return;
		}

		if (paymentMethod === "bank" && !selectedBank) {
			toast.error("Please select a bank");
			return;
		}

		setLoading(true);

		try {
			const gagAmount = await calculateGag(amount);
			const goldWeight = getGoldWeightGag(gagAmount);

			const purchaseData = {
				usdAmount: parseFloat(amount),
				gagAmount: gagAmount,
				goldWeight: goldWeight,
				paymentMethod: paymentMethod,
				bank: selectedBank,
				walletAddress: user?.wallet_address,
				userId: user?.id,
			};

			console.log("Purchase data:", purchaseData);

			// Simulate API call
			await new Promise((resolve) => setTimeout(resolve, 2000));

			if (paymentMethod === "bank") {
				setUsdAmountForModal(amount);
				setShowBankModal(true);
			} else {
				// Midtrans payment
				setMidtransUsdAmount(amount);
				setMidtransGagAmount(gagAmount.toFixed(6));
				setMidtransIdrAmount((parseFloat(amount) * usdToIdrRate).toFixed(0));
				setShowMidtransModal(true);
			}

			toast.success("Purchase initiated successfully!");
		} catch (error) {
			console.error("Purchase error:", error);
			toast.error("Failed to process purchase. Please try again.");
		} finally {
			setLoading(false);
		}
	};

	const handleFileChange = (e) => {
		setPaymentProof(e.target.files[0]);
	};

	const handleBankSubmit = async () => {
		if (!paymentProof) {
			toast.error("Please upload payment proof");
			return;
		}

		setLoading(true);

		try {
			const formData = new FormData();
			formData.append("paymentProof", paymentProof);
			formData.append("usdAmount", usdAmountForModal);
			formData.append("gagAmount", calculatedGag);
			formData.append("bank", selectedBank);
			formData.append("walletAddress", user?.wallet_address);
			formData.append("userId", user?.id);

			// Simulate API call
			await new Promise((resolve) => setTimeout(resolve, 2000));

			toast.success("Payment proof submitted successfully!");
			setShowBankModal(false);
			setPaymentProof(null);
			setAmount("");
			setSelectedBank("");
		} catch (error) {
			console.error("Submit error:", error);
			toast.error("Failed to submit payment proof. Please try again.");
		} finally {
			setLoading(false);
		}
	};

	const paymentMethods = [
		{
			id: "bank",
			name: "Bank Transfer",
			description: "Direct bank transfer with proof upload",
			icon: Banknote,
			fee: "0%",
			processingTime: "1-2 hours",
		},
		{
			id: "midtrans",
			name: "Midtrans Payment",
			description: "Secure online payment gateway",
			icon: CreditCard,
			fee: "2.5%",
			processingTime: "Instant",
		},
	];

	const banks = [
		{ id: "bca", name: "Bank Central Asia (BCA)", account: "1234567890" },
		{ id: "mandiri", name: "Bank Mandiri", account: "0987654321" },
		{ id: "bni", name: "Bank Negara Indonesia (BNI)", account: "1122334455" },
		{ id: "bri", name: "Bank Rakyat Indonesia (BRI)", account: "5566778899" },
	];

	return (
		<DashboardLayout>
			<div className='buy-aint-container'>
				{/* Hero Section */}
				<div className='buy-aint-hero'>
					<div className='hero-content'>
						<div className='hero-badge'>
							<Award className='badge-icon' />
							<span>GALIRA GOLD Token</span>
						</div>
						<h1 className='hero-title'>Buy GALIRA GOLD (GAG)</h1>
						<p className='hero-description'>
							Purchase GALIRA GOLD tokens backed by real gold. Each GAG token is
							pegged to {goldWeight} grams of gold, providing stability and
							value preservation.
						</p>
						<div className='hero-stats'>
							<div className='hero-stat'>
								<TrendingUp className='stat-icon' />
								<span className='stat-label'>Current Price</span>
								<span className='stat-value'>
									{priceLoading ? "Loading..." : gagPriceFormatted}
								</span>
							</div>
							<div className='hero-stat'>
								<Shield className='stat-icon' />
								<span className='stat-label'>Gold Backed</span>
								<span className='stat-value'>{goldWeight} grams</span>
							</div>
							<div className='hero-stat'>
								<Clock className='stat-icon' />
								<span className='stat-label'>Processing</span>
								<span className='stat-value'>1-2 hours</span>
							</div>
						</div>
					</div>
				</div>

				{/* Main Content */}
				<div className='buy-aint-content'>
					{/* Purchase Section */}
					<div className='purchase-section'>
						<div className='purchase-card'>
							<div className='card-header-buy'>
								<div className='header-icon'>
									<Zap />
								</div>
								<div className='header-text'>
									<h2>Purchase GAG Tokens</h2>
									<p>Enter the amount you want to invest in GALIRA GOLD</p>
								</div>
							</div>

							<div className='purchase-form'>
								<div className='form-group-buy'>
									<label className='form-label-buy'>Amount in USD</label>
									<div className='amount-input-container'>
										<span className='currency-prefix'>$</span>
										<input
											type='number'
											value={amount}
											onChange={(e) => setAmount(e.target.value)}
											placeholder='0.00'
											className='amount-input'
											min='0'
											step='0.01'
										/>
									</div>
								</div>

								{/* Conversion Info */}
								<div className='conversion-info'>
									<div className='conversion-row'>
										<span>USD Amount:</span>
										<span>${amount || "0.00"}</span>
									</div>
									<div className='conversion-row'>
										<span>GAG Tokens:</span>
										<span className='gag-amount'>{calculatedGag} GAG</span>
									</div>
									<div className='conversion-row'>
										<span>Gold Equivalent:</span>
										<span className='gold-amount'>
											{amount && parseFloat(amount) > 0
												? getGoldWeightGag(parseFloat(calculatedGag)).toFixed(2)
												: "0.00"}{" "}
											grams
										</span>
									</div>
								</div>

								{/* Payment Methods */}
								<div className='payment-methods-grid'>
									{paymentMethods.map((method) => (
										<div
											key={method.id}
											className={`payment-method-card ${
												paymentMethod === method.id ? "selected" : ""
											}`}
											onClick={() => setPaymentMethod(method.id)}>
											<div className='payment-method-header'>
												<method.icon className='payment-icon' />
												<span className='payment-fee'>{method.fee}</span>
											</div>
											<div className='payment-method-info'>
												<h4>{method.name}</h4>
												<p>{method.description}</p>
												<p>Processing: {method.processingTime}</p>
											</div>
											<div className='payment-method-indicator'>
												{paymentMethod === method.id && (
													<CheckCircle className='check-icon' />
												)}
											</div>
										</div>
									))}
								</div>

								{/* Bank Selection */}
								{paymentMethod === "bank" && (
									<div className='bank-select-container'>
										<select
											value={selectedBank}
											onChange={(e) => setSelectedBank(e.target.value)}
											className='bank-select'>
											<option value=''>Select Bank</option>
											{banks.map((bank) => (
												<option key={bank.id} value={bank.id}>
													{bank.name} - {bank.account}
												</option>
											))}
										</select>
									</div>
								)}

								{/* Purchase Button */}
								<div className='purchase-button-container'>
									<button
										onClick={handlePurchase}
										disabled={loading || !amount || parseFloat(amount) <= 0}
										className='purchase-button'>
										<div className='button-content'>
											{loading ? (
												<>
													<div className='loading-icon'></div>
													Processing...
												</>
											) : (
												<>
													<DollarSign className='button-icon' />
													Buy GAG Tokens
												</>
											)}
										</div>
									</button>
								</div>
							</div>
						</div>
					</div>

					{/* Sidebar Section */}
					<div className='sidebar-section'>
						{/* Price Card */}
						<div className='price-card'>
							<div className='price-header'>
								<h3>GAG Token Price</h3>
								<div className='price-live-indicator'>
									<span>Live</span>
									<div className='live-dot'></div>
								</div>
							</div>
							<div className='price-details'>
								<div className='price-row main-price'>
									<span className='price-label'>Current Price</span>
									<span className='price-value primary'>
										{priceLoading ? "Loading..." : gagPriceFormatted}
									</span>
								</div>
								<div className='price-row'>
									<span className='price-label'>Gold Price (per gram)</span>
									<span className='price-value'>
										{priceLoading ? "Loading..." : goldPricePerGramFormatted}
									</span>
								</div>
								<div className='price-row'>
									<span className='price-label'>Gold Weight</span>
									<span className='price-value'>{goldWeight} grams</span>
								</div>
								<div className='price-calculation'>
									<small>
										GAG Price = Gold Price × {goldWeight}g ={" "}
										{priceLoading
											? "Loading..."
											: `${goldPricePerGramFormatted} × ${goldWeight}g = ${gagPriceFormatted}`}
									</small>
								</div>
							</div>
						</div>

						{/* Features Card */}
						<div className='features-card'>
							<h3>Why Choose GALIRA GOLD?</h3>
							<div className='features-list'>
								<div className='feature-item'>
									<Shield className='feature-icon' />
									<div className='feature-content'>
										<h4>Gold Backed</h4>
										<p>Each GAG token is backed by real physical gold</p>
									</div>
								</div>
								<div className='feature-item'>
									<TrendingUp className='feature-icon' />
									<div className='feature-content'>
										<h4>Stable Value</h4>
										<p>Price stability through gold backing</p>
									</div>
								</div>
								<div className='feature-item'>
									<Lock className='feature-icon' />
									<div className='feature-content'>
										<h4>Secure</h4>
										<p>Blockchain technology ensures transparency</p>
									</div>
								</div>
							</div>
						</div>

						{/* Trust Card */}
						<div className='trust-card'>
							<h3>Trust & Security</h3>
							<div className='trust-indicators'>
								<div className='trust-item'>
									<div className='trust-badge verified'>
										<CheckCircle className='trust-icon' />
									</div>
									<span>Verified Gold Reserves</span>
								</div>
								<div className='trust-item'>
									<div className='trust-badge secure'>
										<Shield className='trust-icon' />
									</div>
									<span>Secure Transactions</span>
								</div>
								<div className='trust-item'>
									<div className='trust-badge regulated'>
										<Award className='trust-icon' />
									</div>
									<span>Regulated Platform</span>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>

			{/* Bank Transfer Modal */}
			<Modal
				isOpen={showBankModal}
				onRequestClose={() => setShowBankModal(false)}
				className='bank-modal-content'
				overlayClassName='bank-modal-overlay'>
				<div
					className='bank-modal-close-btn'
					onClick={() => setShowBankModal(false)}>
					<X />
				</div>
				<h2 className='bank-modal-title'>Bank Transfer Instructions</h2>
				<div className='bank-modal-info'>
					<p>
						Please transfer <strong>${usdAmountForModal}</strong> to complete
						your GAG purchase.
					</p>
				</div>
				<div className='bank-modal-aint'>
					<p>
						You will receive: <strong>{calculatedGag} GAG</strong>
					</p>
				</div>
				<div className='bank-modal-divider'></div>
				<div className='bank-modal-upload-section'>
					<label className='bank-modal-upload-label'>
						Upload Payment Proof
						<input
							type='file'
							accept='image/*,.pdf'
							onChange={handleFileChange}
							className='bank-modal-file-input'
						/>
					</label>
				</div>
				<div className='bank-modal-actions'>
					<button
						className='bank-modal-cancel-btn'
						onClick={() => setShowBankModal(false)}>
						Cancel
					</button>
					<button
						className='bank-modal-submit-btn'
						onClick={handleBankSubmit}
						disabled={loading || !paymentProof}>
						{loading ? "Submitting..." : "Submit Proof"}
					</button>
				</div>
			</Modal>

			{/* Midtrans Modal */}
			<Modal
				isOpen={showMidtransModal}
				onRequestClose={() => setShowMidtransModal(false)}
				className='bank-modal-content'
				overlayClassName='bank-modal-overlay'>
				<div
					className='bank-modal-close-btn'
					onClick={() => setShowMidtransModal(false)}>
					<X />
				</div>
				<h2 className='bank-modal-title'>Midtrans Payment</h2>
				<div className='bank-modal-info'>
					<p>
						Amount: <strong>${midtransUsdAmount}</strong>
					</p>
					<p>
						GAG Tokens: <strong>{midtransGagAmount} GAG</strong>
					</p>
					<p>
						IDR Amount: <strong>Rp {midtransIdrAmount}</strong>
					</p>
					<p>
						Wallet: <strong>{midtransWallet}</strong>
					</p>
				</div>
				<div className='bank-modal-actions'>
					<button
						className='bank-modal-cancel-btn'
						onClick={() => setShowMidtransModal(false)}>
						Cancel
					</button>
					<button className='bank-modal-submit-btn'>Proceed to Payment</button>
				</div>
			</Modal>
		</DashboardLayout>
	);
}

import React, { useState } from "react";
import DashboardLayout from "../layout";
import {
	Banknote,
	Coins,
	CreditCard,
	Building,
	AlertCircle,
	CheckCircle,
	Clock,
	AlertTriangle,
} from "lucide-react";
import { useGoldPrice } from "../../../hooks/useGoldPrice";

export default function WithdrawToFiatGold() {
	const { aintPrice, aintPriceFormatted, calculateUSD, getGoldWeight } =
		useGoldPrice();

	const [withdrawType, setWithdrawType] = useState("fiat");
	const [amount, setAmount] = useState("");
	const [selectedCurrency, setSelectedCurrency] = useState("USD");
	const [withdrawMethod, setWithdrawMethod] = useState("bank");
	const [bankDetails, setBankDetails] = useState({
		accountName: "",
		accountNumber: "",
		bankName: "",
		swiftCode: "",
	});
	const [loading, setLoading] = useState(false);

	const fiatCurrencies = [
		{ code: "USD", name: "US Dollar", rate: 1.0, symbol: "$" },
		{ code: "EUR", name: "Euro", rate: 0.92, symbol: "€" },
		{ code: "IDR", name: "Indonesian Rupiah", rate: 15420, symbol: "Rp" },
		{ code: "SGD", name: "Singapore Dollar", rate: 1.35, symbol: "S$" },
		{ code: "MYR", name: "Malaysian Ringgit", rate: 4.65, symbol: "RM" },
	];

	const goldOptions = [
		{
			type: "physical",
			name: "Physical Gold Delivery",
			fee: "2%",
			time: "5-7 days",
		},
		{
			type: "certificate",
			name: "Gold Certificate",
			fee: "1%",
			time: "1-2 days",
		},
		{ type: "vault", name: "Vault Storage", fee: "0.5%", time: "Instant" },
	];

	const withdrawMethods = [
		{
			id: "bank",
			name: "Bank Transfer",
			icon: Building,
			fee: "0.5%",
			time: "1-3 days",
		},
		{
			id: "card",
			name: "Debit Card",
			icon: CreditCard,
			fee: "1%",
			time: "1-2 days",
		},
		{
			id: "crypto",
			name: "Crypto Exchange",
			icon: Coins,
			fee: "0.3%",
			time: "Instant",
		},
	];

	const aintBalance = 1250.5;

	const calculateWithdrawAmount = async () => {
		if (!amount) return 0;
		try {
			const usdAmount = await calculateUSD(parseFloat(amount));
			const currency = fiatCurrencies.find((c) => c.code === selectedCurrency);
			return (usdAmount * currency.rate).toFixed(2);
		} catch (error) {
			console.error("Error calculating withdraw amount:", error);
			return 0;
		}
	};

	const handleWithdraw = async () => {
		setLoading(true);
		// Simulate API call
		setTimeout(() => {
			setLoading(false);
			alert("Withdrawal request submitted successfully!");
		}, 2000);
	};

	return (
		<DashboardLayout>
			<div className='withdraw-container'>
				<div className='withdraw-wrapper'>
					{/* Header */}
					<div className='withdraw-header'>
						<h1 className='withdraw-title'>Withdraw to Fiat/Gold</h1>
						<p className='withdraw-subtitle'>
							Convert your AINT tokens to fiat currency or physical gold
						</p>
					</div>

					<div className='withdraw-grid'>
						{/* Withdrawal Form */}
						<div className='withdraw-main-card'>
							<div className='withdraw-card'>
								<h2 className='section-header'>
									<Banknote />
									Withdrawal Details
								</h2>

								{/* Withdrawal Type */}
								<div className='form-group'>
									<label className='form-label'>Withdrawal Type</label>
									<div className='withdraw-type-grid'>
										<div
											onClick={() => setWithdrawType("fiat")}
											className={`withdraw-type-option ${
												withdrawType === "fiat" ? "active" : ""
											}`}>
											<div className='withdraw-type-content'>
												<Banknote />
												<div>
													<div className='withdraw-type-title'>
														Fiat Currency
													</div>
													<div className='withdraw-type-desc'>
														USD, EUR, IDR, etc.
													</div>
												</div>
											</div>
										</div>
										<div
											onClick={() => setWithdrawType("gold")}
											className={`withdraw-type-option ${
												withdrawType === "gold" ? "active" : ""
											}`}>
											<div className='withdraw-type-content gold'>
												<Coins />
												<div>
													<div className='withdraw-type-title'>
														Physical Gold
													</div>
													<div className='withdraw-type-desc'>
														Delivery or storage
													</div>
												</div>
											</div>
										</div>
									</div>
								</div>

								{/* Amount Input */}
								<div className='form-group'>
									<label className='form-label'>AINT Amount</label>
									<div className='amount-input-container'>
										<input
											type='number'
											value={amount}
											onChange={(e) => setAmount(e.target.value)}
											className='form-input form-input-large'
											placeholder='Enter AINT amount'
											max={aintBalance}
										/>
										<div className='amount-input-suffix'>AINT</div>
									</div>
									<div className='amount-footer'>
										<span className='amount-available'>
											Available: {aintBalance} AINT
										</span>
										<button
											onClick={() => setAmount(aintBalance.toString())}
											className='max-button'>
											Use Max
										</button>
									</div>
								</div>

								{withdrawType === "fiat" ? (
									<>
										{/* Currency Selection */}
										<div className='form-group'>
											<label className='form-label'>Currency</label>
											<select
												value={selectedCurrency}
												onChange={(e) => setSelectedCurrency(e.target.value)}
												className='form-select'>
												{fiatCurrencies.map((currency) => (
													<option key={currency.code} value={currency.code}>
														{currency.name} ({currency.code})
													</option>
												))}
											</select>
											{amount && (
												<p className='currency-info'>
													You will receive:{" "}
													<span className='currency-amount'>
														{
															fiatCurrencies.find(
																(c) => c.code === selectedCurrency
															)?.symbol
														}
														{calculateWithdrawAmount()}
													</span>
												</p>
											)}
										</div>

										{/* Withdrawal Method */}
										<div className='form-group'>
											<label className='form-label'>Withdrawal Method</label>
											<div className='withdraw-methods'>
												{withdrawMethods.map((method) => {
													const IconComponent = method.icon;
													return (
														<div
															key={method.id}
															onClick={() => setWithdrawMethod(method.id)}
															className={`withdraw-method ${
																withdrawMethod === method.id ? "active" : ""
															}`}>
															<div className='withdraw-method-content'>
																<div className='withdraw-method-info'>
																	<IconComponent />
																	<div>
																		<div className='withdraw-method-title'>
																			{method.name}
																		</div>
																		<div className='withdraw-method-desc'>
																			Fee: {method.fee} • Time: {method.time}
																		</div>
																	</div>
																</div>
															</div>
														</div>
													);
												})}
											</div>
										</div>

										{/* Bank Details */}
										{withdrawMethod === "bank" && (
											<div className='bank-details'>
												<h4 className='bank-details-title'>
													Bank Account Details
												</h4>
												<div className='bank-details-grid'>
													<input
														type='text'
														placeholder='Account Holder Name'
														value={bankDetails.accountName}
														onChange={(e) =>
															setBankDetails({
																...bankDetails,
																accountName: e.target.value,
															})
														}
														className='form-input'
													/>
													<input
														type='text'
														placeholder='Account Number'
														value={bankDetails.accountNumber}
														onChange={(e) =>
															setBankDetails({
																...bankDetails,
																accountNumber: e.target.value,
															})
														}
														className='form-input'
													/>
													<input
														type='text'
														placeholder='Bank Name'
														value={bankDetails.bankName}
														onChange={(e) =>
															setBankDetails({
																...bankDetails,
																bankName: e.target.value,
															})
														}
														className='form-input'
													/>
													<input
														type='text'
														placeholder='SWIFT Code (if international)'
														value={bankDetails.swiftCode}
														onChange={(e) =>
															setBankDetails({
																...bankDetails,
																swiftCode: e.target.value,
															})
														}
														className='form-input'
													/>
												</div>
											</div>
										)}
									</>
								) : (
									/* Gold Options */
									<div className='form-group'>
										<label className='form-label'>Gold Delivery Option</label>
										<div className='gold-options'>
											{goldOptions.map((option) => (
												<div key={option.type} className='gold-option'>
													<div className='gold-option-content'>
														<div>
															<div className='gold-option-title'>
																{option.name}
															</div>
															<div className='gold-option-desc'>
																Fee: {option.fee} • Processing: {option.time}
															</div>
														</div>
														<input
															type='radio'
															name='goldOption'
															className='gold-radio'
														/>
													</div>
												</div>
											))}
										</div>
										{amount && (
											<p className='gold-equivalent'>
												Gold equivalent:{" "}
												<span className='gold-amount'>
													{getGoldWeight(parseFloat(amount))} grams
												</span>
											</p>
										)}
									</div>
								)}

								{/* Withdraw Button */}
								<button
									onClick={handleWithdraw}
									disabled={!amount || loading}
									className='withdraw-submit-btn'>
									{loading ? (
										<>
											<Clock className='loading-spinner' />
											Processing...
										</>
									) : (
										<>
											<CheckCircle />
											Submit Withdrawal
										</>
									)}
								</button>
							</div>
						</div>

						{/* Sidebar */}
						<div className='withdraw-sidebar'>
							{/* Account Balance */}
							<div className='withdraw-card'>
								<h3 className='section-header'>Account Balance</h3>
								<div>
									<div className='balance-item'>
										<span className='balance-label'>AINT Balance</span>
										<span className='balance-value'>{aintBalance} AINT</span>
									</div>
									<div className='balance-item'>
										<span className='balance-label'>USD Value</span>
										<span className='balance-value'>
											${(aintBalance * aintPrice).toLocaleString()}
										</span>
									</div>
									<div className='balance-item'>
										<span className='balance-label'>Gold Equivalent</span>
										<span className='balance-value'>
											{(aintBalance * 4.25).toFixed(2)}g
										</span>
									</div>
								</div>
							</div>

							{/* Processing Times */}
							<div className='withdraw-card'>
								<h3 className='section-header'>Processing Times</h3>
								<div>
									<div className='processing-item'>
										<span className='processing-label'>Bank Transfer</span>
										<span className='processing-value'>1-3 business days</span>
									</div>
									<div className='processing-item'>
										<span className='processing-label'>Debit Card</span>
										<span className='processing-value'>1-2 business days</span>
									</div>
									<div className='processing-item'>
										<span className='processing-label'>Crypto Exchange</span>
										<span className='processing-value'>Instant</span>
									</div>
									<div className='processing-item'>
										<span className='processing-label'>Physical Gold</span>
										<span className='processing-value'>5-7 business days</span>
									</div>
								</div>
							</div>

							{/* Important Notice */}
							<div className='withdraw-card'>
								<h3 className='section-header warning-header'>
									<AlertTriangle />
									Important Notice
								</h3>
								<div className='notice-list'>
									<div className='notice-item'>
										<CheckCircle />
										<span>Minimum withdrawal: 10 AINT</span>
									</div>
									<div className='notice-item'>
										<CheckCircle />
										<span>KYC verification required</span>
									</div>
									<div className='notice-item'>
										<CheckCircle />
										<span>Withdrawals are irreversible</span>
									</div>
									<div className='notice-item'>
										<CheckCircle />
										<span>24/7 customer support available</span>
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

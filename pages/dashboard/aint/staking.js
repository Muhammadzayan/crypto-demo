import React, { useState, useEffect } from "react";
import DashboardLayout from "../layout";
import { useAuth } from "../../../contexts/AuthContext";
import { toast } from "react-toastify";
import {
	Coins,
	Clock,
	TrendingUp,
	Lock,
	Unlock,
	Calculator,
	AlertCircle,
	CheckCircle,
	RefreshCw,
	Zap,
	Shield,
	Star,
	ArrowRight,
	Calendar,
	Percent,
	Wallet,
	BarChart3,
	Target,
	Sparkles,
	ChevronRight,
	Info,
} from "lucide-react";

export default function StakingEarn() {
	const { user } = useAuth();
	const [stakeAmount, setStakeAmount] = useState("");
	const [selectedPlan, setSelectedPlan] = useState(null);
	const [activeTab, setActiveTab] = useState("stake");
	const [loading, setLoading] = useState(false);
	const [stakingPlans, setStakingPlans] = useState([]);
	const [userStakes, setUserStakes] = useState([]);
	const [userBalance, setUserBalance] = useState({
		available: 0,
		staked: 0,
		earned: 0,
		activeStakes: 0,
	});

	// Fetch staking plans
	const fetchStakingPlans = async () => {
		try {
			const response = await fetch("/api/staking/plans");
			const data = await response.json();

			if (data.success) {
				setStakingPlans(data.plans);
				// Set default selected plan to 6 months
				const defaultPlan = data.plans.find(
					(plan) => plan.duration === "6 Months"
				);
				if (defaultPlan) {
					setSelectedPlan(defaultPlan);
				}
			}
		} catch (error) {
			console.error("Error fetching staking plans:", error);
			toast.error("Failed to load staking plans");
		}
	};

	// Fetch user balance
	const fetchUserBalance = async () => {
		if (!user?.id) return;

		try {
			const response = await fetch(
				`/api/staking/user-balance?userId=${user.id}`
			);
			const data = await response.json();

			if (data.success) {
				setUserBalance(data.balance);
			}
		} catch (error) {
			console.error("Error fetching user balance:", error);
		}
	};

	// Fetch user stakes
	const fetchUserStakes = async () => {
		if (!user?.id) return;

		try {
			const response = await fetch(
				`/api/staking/user-stakes?userId=${user.id}`
			);
			const data = await response.json();

			if (data.success) {
				setUserStakes(data.stakes);
			}
		} catch (error) {
			console.error("Error fetching user stakes:", error);
			toast.error("Failed to load your stakes");
		}
	};

	// Initialize data
	useEffect(() => {
		fetchStakingPlans();
	}, []);

	useEffect(() => {
		if (user?.id) {
			fetchUserBalance();
			fetchUserStakes();
		}
	}, [user?.id]);

	const calculateRewards = () => {
		if (!stakeAmount || !selectedPlan) return 0;

		const amount = parseFloat(stakeAmount);
		const apy = parseFloat(selectedPlan.apy) / 100;
		const months = parseInt(selectedPlan.duration.split(" ")[0]);

		return ((amount * apy * months) / 12).toFixed(2);
	};

	const handleStake = async () => {
		if (!user?.id) {
			toast.error("Please log in to stake");
			return;
		}

		if (!stakeAmount || !selectedPlan) {
			toast.error("Please select a plan and enter amount");
			return;
		}

		const amount = parseFloat(stakeAmount);
		if (amount < selectedPlan.minStake) {
			toast.error(`Minimum stake amount is ${selectedPlan.minStake} AINT`);
			return;
		}

		if (amount > userBalance.available) {
			toast.error("Insufficient balance");
			return;
		}

		setLoading(true);
		try {
			const response = await fetch("/api/staking/stake", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					userId: user.id,
					planId: selectedPlan.id,
					amount: amount,
				}),
			});

			const data = await response.json();

			if (data.success) {
				toast.success("Stake created successfully!");
				setStakeAmount("");
				fetchUserBalance();
				fetchUserStakes();
				setActiveTab("mystakes");
			} else {
				toast.error(data.message || "Failed to create stake");
			}
		} catch (error) {
			console.error("Error creating stake:", error);
			toast.error("Failed to create stake");
		} finally {
			setLoading(false);
		}
	};

	const handleClaimRewards = async (stakeId) => {
		if (!user?.id) return;

		setLoading(true);
		try {
			const response = await fetch("/api/staking/claim-rewards", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					userId: user.id,
					stakeId: stakeId,
				}),
			});

			const data = await response.json();

			if (data.success) {
				toast.success("Rewards claimed successfully!");
				fetchUserBalance();
				fetchUserStakes();
			} else {
				toast.error(data.message || "Failed to claim rewards");
			}
		} catch (error) {
			console.error("Error claiming rewards:", error);
			toast.error("Failed to claim rewards");
		} finally {
			setLoading(false);
		}
	};

	const getDaysRemaining = (endDate) => {
		const end = new Date(endDate);
		const now = new Date();
		const diffTime = end - now;
		const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
		return Math.max(0, diffDays);
	};

	const refreshData = () => {
		fetchUserBalance();
		fetchUserStakes();
	};

	return (
		<DashboardLayout>
			<div className='min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100'>
				{/* Hero Section */}
				<div className='relative overflow-hidden bg-gradient-to-r from-indigo-600 via-purple-600 to-blue-600'>
					<div className='absolute inset-0 bg-black/10'></div>
					<div className='relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12'>
						<div className='text-center'>
							<div className='flex items-center justify-center mb-4'>
								<div className='p-3 bg-white/20 rounded-full backdrop-blur-sm'>
									<Sparkles className='w-8 h-8 text-white' />
								</div>
							</div>
							<h1 className='text-4xl md:text-5xl font-bold text-white mb-4'>
								AINT Staking & Earn
							</h1>
							<p className='text-xl text-indigo-100 max-w-2xl mx-auto'>
								Stake your AINT tokens and earn guaranteed returns with our
								secure staking platform
							</p>
							<div className='mt-8 flex items-center justify-center space-x-6 text-white/80'>
								<div className='flex items-center'>
									<Shield className='w-5 h-5 mr-2' />
									<span>Secure & Safe</span>
								</div>
								<div className='flex items-center'>
									<Zap className='w-5 h-5 mr-2' />
									<span>Instant Rewards</span>
								</div>
								<div className='flex items-center'>
									<Target className='w-5 h-5 mr-2' />
									<span>Guaranteed Returns</span>
								</div>
							</div>
						</div>
					</div>
				</div>

				<div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-10'>
					{/* Stats Overview Cards */}
					<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8'>
						<div className='bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-6 transform hover:scale-105 transition-all duration-300'>
							<div className='flex items-center justify-between'>
								<div>
									<p className='text-sm font-medium text-gray-600 mb-1'>
										Available Balance
									</p>
									<p className='text-2xl font-bold text-gray-900'>
										{userBalance.available.toLocaleString()}
									</p>
									<p className='text-sm text-gray-500'>AINT</p>
								</div>
								<div className='p-3 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl'>
									<Wallet className='w-6 h-6 text-white' />
								</div>
							</div>
						</div>

						<div className='bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-6 transform hover:scale-105 transition-all duration-300'>
							<div className='flex items-center justify-between'>
								<div>
									<p className='text-sm font-medium text-gray-600 mb-1'>
										Total Staked
									</p>
									<p className='text-2xl font-bold text-gray-900'>
										{userBalance.staked.toLocaleString()}
									</p>
									<p className='text-sm text-gray-500'>AINT</p>
								</div>
								<div className='p-3 bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-xl'>
									<Lock className='w-6 h-6 text-white' />
								</div>
							</div>
						</div>

						<div className='bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-6 transform hover:scale-105 transition-all duration-300'>
							<div className='flex items-center justify-between'>
								<div>
									<p className='text-sm font-medium text-gray-600 mb-1'>
										Total Earned
									</p>
									<p className='text-2xl font-bold text-green-600'>
										+{userBalance.earned.toFixed(2)}
									</p>
									<p className='text-sm text-gray-500'>AINT</p>
								</div>
								<div className='p-3 bg-gradient-to-br from-green-500 to-green-600 rounded-xl'>
									<TrendingUp className='w-6 h-6 text-white' />
								</div>
							</div>
						</div>

						<div className='bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-6 transform hover:scale-105 transition-all duration-300'>
							<div className='flex items-center justify-between'>
								<div>
									<p className='text-sm font-medium text-gray-600 mb-1'>
										Active Stakes
									</p>
									<p className='text-2xl font-bold text-gray-900'>
										{userBalance.activeStakes}
									</p>
									<p className='text-sm text-gray-500'>Positions</p>
								</div>
								<div className='p-3 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl'>
									<BarChart3 className='w-6 h-6 text-white' />
								</div>
							</div>
						</div>
					</div>

					{/* Enhanced Tabs */}
					<div className='mb-8'>
						<div className='flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4'>
							<div className='flex bg-white/80 backdrop-blur-sm rounded-2xl p-2 shadow-lg border border-white/20'>
								<button
									onClick={() => setActiveTab("stake")}
									className={`flex items-center px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
										activeTab === "stake"
											? "bg-gradient-to-r from-indigo-500 to-blue-500 text-white shadow-lg transform scale-105"
											: "text-gray-600 hover:text-gray-900 hover:bg-white/50"
									}`}>
									<Coins className='w-5 h-5 mr-2' />
									Stake AINT
								</button>
								<button
									onClick={() => setActiveTab("mystakes")}
									className={`flex items-center px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
										activeTab === "mystakes"
											? "bg-gradient-to-r from-indigo-500 to-blue-500 text-white shadow-lg transform scale-105"
											: "text-gray-600 hover:text-gray-900 hover:bg-white/50"
									}`}>
									<BarChart3 className='w-5 h-5 mr-2' />
									My Stakes
								</button>
							</div>

							{activeTab === "mystakes" && (
								<button
									onClick={refreshData}
									disabled={loading}
									className='flex items-center px-6 py-3 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-xl hover:from-green-600 hover:to-green-700 disabled:opacity-50 shadow-lg transform hover:scale-105 transition-all duration-300'>
									<RefreshCw
										className={`w-5 h-5 mr-2 ${loading ? "animate-spin" : ""}`}
									/>
									Refresh Data
								</button>
							)}
						</div>
					</div>

					{activeTab === "stake" ? (
						<div className='grid grid-cols-1 lg:grid-cols-3 gap-8'>
							{/* Enhanced Staking Form */}
							<div className='lg:col-span-2 space-y-6'>
								{/* Staking Plans */}
								<div className='bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-8'>
									<div className='flex items-center mb-6'>
										<div className='p-3 bg-gradient-to-br from-indigo-500 to-blue-500 rounded-xl mr-4'>
											<Star className='w-6 h-6 text-white' />
										</div>
										<div>
											<h2 className='text-2xl font-bold text-gray-900'>
												Choose Your Plan
											</h2>
											<p className='text-gray-600'>
												Select the staking duration that fits your goals
											</p>
										</div>
									</div>

									<div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
										{stakingPlans.map((plan) => (
											<div
												key={plan.id}
												onClick={() => setSelectedPlan(plan)}
												className={`relative group cursor-pointer transition-all duration-300 transform hover:scale-105 ${
													selectedPlan?.id === plan.id
														? "ring-4 ring-indigo-500 ring-opacity-50"
														: "hover:ring-2 hover:ring-indigo-300"
												}`}>
												<div
													className={`bg-gradient-to-br rounded-2xl p-6 border-2 transition-all duration-300 ${
														selectedPlan?.id === plan.id
															? "from-indigo-500 to-blue-500 border-indigo-500 text-white shadow-2xl"
															: "from-white to-gray-50 border-gray-200 hover:from-indigo-50 hover:to-blue-50 hover:border-indigo-300"
													}`}>
													{plan.popular && (
														<div className='absolute -top-3 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-4 py-1 rounded-full text-sm font-bold shadow-lg'>
															<Star className='w-4 h-4 inline mr-1' />
															Most Popular
														</div>
													)}

													<div className='text-center'>
														<div
															className={`text-lg font-bold mb-2 ${
																selectedPlan?.id === plan.id
																	? "text-white"
																	: "text-gray-900"
															}`}>
															{plan.duration}
														</div>
														<div
															className={`text-3xl font-bold mb-3 ${
																selectedPlan?.id === plan.id
																	? "text-white"
																	: "text-indigo-600"
															}`}>
															{plan.apy}
														</div>
														<div
															className={`text-sm mb-4 ${
																selectedPlan?.id === plan.id
																	? "text-indigo-100"
																	: "text-gray-600"
															}`}>
															Annual Percentage Yield
														</div>

														<div className='space-y-2 text-sm'>
															<div
																className={`flex justify-between ${
																	selectedPlan?.id === plan.id
																		? "text-indigo-100"
																		: "text-gray-600"
																}`}>
																<span>Min Stake:</span>
																<span className='font-medium'>
																	{plan.minStake} AINT
																</span>
															</div>
															{plan.maxStake && (
																<div
																	className={`flex justify-between ${
																		selectedPlan?.id === plan.id
																			? "text-indigo-100"
																			: "text-gray-600"
																	}`}>
																	<span>Max Stake:</span>
																	<span className='font-medium'>
																		{plan.maxStake} AINT
																	</span>
																</div>
															)}
														</div>

														{plan.description && (
															<div
																className={`mt-4 p-3 rounded-lg text-xs ${
																	selectedPlan?.id === plan.id
																		? "bg-white/20 text-white"
																		: "bg-gray-100 text-gray-600"
																}`}>
																{plan.description}
															</div>
														)}
													</div>
												</div>
											</div>
										))}
									</div>
								</div>

								{/* Enhanced Amount Input */}
								<div className='bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-8'>
									<div className='flex items-center mb-6'>
										<div className='p-3 bg-gradient-to-br from-green-500 to-green-600 rounded-xl mr-4'>
											<Calculator className='w-6 h-6 text-white' />
										</div>
										<div>
											<h2 className='text-2xl font-bold text-gray-900'>
												Stake Amount
											</h2>
											<p className='text-gray-600'>
												Enter the amount you want to stake
											</p>
										</div>
									</div>

									<div className='space-y-6'>
										<div>
											<label className='block text-sm font-semibold text-gray-700 mb-3'>
												AINT Amount
											</label>
											<div className='relative'>
												<input
													type='number'
													value={stakeAmount}
													onChange={(e) => setStakeAmount(e.target.value)}
													className='w-full px-6 py-4 text-xl border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all duration-300 bg-white/50 backdrop-blur-sm'
													placeholder='0.00'
													disabled={!selectedPlan}
												/>
												<div className='absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 font-semibold'>
													AINT
												</div>
											</div>
										</div>

										<div className='flex items-center justify-between p-4 bg-gray-50 rounded-xl'>
											<div className='flex items-center'>
												<Wallet className='w-5 h-5 text-gray-500 mr-2' />
												<span className='text-sm text-gray-600'>
													Available Balance:
												</span>
											</div>
											<div className='flex items-center space-x-4'>
												<span className='text-lg font-bold text-gray-900'>
													{userBalance.available.toLocaleString()} AINT
												</span>
												<button
													onClick={() =>
														setStakeAmount(userBalance.available.toString())
													}
													className='px-4 py-2 bg-indigo-100 text-indigo-700 rounded-lg hover:bg-indigo-200 transition-colors duration-200 font-medium'>
													Use Max
												</button>
											</div>
										</div>
									</div>
								</div>

								{/* Enhanced Rewards Calculator */}
								{stakeAmount && selectedPlan && (
									<div className='bg-gradient-to-br from-indigo-50 to-blue-50 rounded-2xl border border-indigo-200 p-8'>
										<div className='flex items-center mb-6'>
											<div className='p-3 bg-gradient-to-br from-indigo-500 to-blue-500 rounded-xl mr-4'>
												<Zap className='w-6 h-6 text-white' />
											</div>
											<div>
												<h3 className='text-2xl font-bold text-indigo-900'>
													Estimated Rewards
												</h3>
												<p className='text-indigo-700'>
													Your potential earnings breakdown
												</p>
											</div>
										</div>

										<div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
											<div className='space-y-4'>
												<div className='flex justify-between items-center p-3 bg-white/50 rounded-lg'>
													<span className='text-indigo-700 font-medium'>
														Stake Amount:
													</span>
													<span className='font-bold text-indigo-900'>
														{parseFloat(stakeAmount).toLocaleString()} AINT
													</span>
												</div>
												<div className='flex justify-between items-center p-3 bg-white/50 rounded-lg'>
													<span className='text-indigo-700 font-medium'>
														Duration:
													</span>
													<span className='font-bold text-indigo-900'>
														{selectedPlan.duration}
													</span>
												</div>
												<div className='flex justify-between items-center p-3 bg-white/50 rounded-lg'>
													<span className='text-indigo-700 font-medium'>
														APY Rate:
													</span>
													<span className='font-bold text-indigo-900'>
														{selectedPlan.apy}
													</span>
												</div>
											</div>
											<div className='bg-gradient-to-br from-indigo-500 to-blue-500 rounded-xl p-6 text-white'>
												<div className='text-center'>
													<p className='text-indigo-100 mb-2'>
														Total Expected Rewards
													</p>
													<p className='text-4xl font-bold mb-2'>
														{calculateRewards()} AINT
													</p>
													<p className='text-indigo-100 text-sm'>
														Paid at maturity • No early withdrawal
													</p>
												</div>
											</div>
										</div>
									</div>
								)}

								{/* Enhanced Stake Button */}
								<button
									onClick={handleStake}
									disabled={!stakeAmount || !selectedPlan || loading}
									className='w-full bg-gradient-to-r from-indigo-600 via-purple-600 to-blue-600 text-white py-4 px-8 rounded-2xl font-bold text-lg hover:from-indigo-700 hover:via-purple-700 hover:to-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 transform hover:scale-105 shadow-2xl flex items-center justify-center'>
									{loading ? (
										<RefreshCw className='w-6 h-6 animate-spin mr-3' />
									) : (
										<Lock className='mr-3 w-6 h-6' />
									)}
									{loading ? "Processing Stake..." : "Stake AINT Now"}
								</button>
							</div>

							{/* Enhanced Sidebar */}
							<div className='space-y-6'>
								{/* How It Works */}
								<div className='bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-6'>
									<div className='flex items-center mb-6'>
										<div className='p-3 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl mr-4'>
											<Info className='w-6 h-6 text-white' />
										</div>
										<h3 className='text-xl font-bold text-gray-900'>
											How It Works
										</h3>
									</div>
									<div className='space-y-6'>
										<div className='flex items-start group'>
											<div className='w-8 h-8 bg-gradient-to-br from-indigo-500 to-blue-500 rounded-full flex items-center justify-center mr-4 mt-1 group-hover:scale-110 transition-transform duration-300'>
												<span className='text-white text-sm font-bold'>1</span>
											</div>
											<div>
												<div className='font-semibold text-gray-900 mb-1'>
													Choose Your Plan
												</div>
												<div className='text-sm text-gray-600'>
													Select from 3, 6, or 12-month staking periods
												</div>
											</div>
										</div>
										<div className='flex items-start group'>
											<div className='w-8 h-8 bg-gradient-to-br from-indigo-500 to-blue-500 rounded-full flex items-center justify-center mr-4 mt-1 group-hover:scale-110 transition-transform duration-300'>
												<span className='text-white text-sm font-bold'>2</span>
											</div>
											<div>
												<div className='font-semibold text-gray-900 mb-1'>
													Lock Your Tokens
												</div>
												<div className='text-sm text-gray-600'>
													Your AINT tokens are securely locked for the duration
												</div>
											</div>
										</div>
										<div className='flex items-start group'>
											<div className='w-8 h-8 bg-gradient-to-br from-indigo-500 to-blue-500 rounded-full flex items-center justify-center mr-4 mt-1 group-hover:scale-110 transition-transform duration-300'>
												<span className='text-white text-sm font-bold'>3</span>
											</div>
											<div>
												<div className='font-semibold text-gray-900 mb-1'>
													Earn Rewards
												</div>
												<div className='text-sm text-gray-600'>
													Receive guaranteed returns at maturity
												</div>
											</div>
										</div>
									</div>
								</div>

								{/* Benefits */}
								<div className='bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-6'>
									<div className='flex items-center mb-6'>
										<div className='p-3 bg-gradient-to-br from-green-500 to-green-600 rounded-xl mr-4'>
											<CheckCircle className='w-6 h-6 text-white' />
										</div>
										<h3 className='text-xl font-bold text-gray-900'>
											Key Benefits
										</h3>
									</div>
									<div className='space-y-4'>
										<div className='flex items-start group'>
											<CheckCircle className='w-5 h-5 text-green-500 mr-3 mt-0.5 group-hover:scale-110 transition-transform duration-300' />
											<div>
												<div className='font-medium text-gray-900'>
													Guaranteed Returns
												</div>
												<div className='text-sm text-gray-600'>
													Fixed APY rates with no risk
												</div>
											</div>
										</div>
										<div className='flex items-start group'>
											<CheckCircle className='w-5 h-5 text-green-500 mr-3 mt-0.5 group-hover:scale-110 transition-transform duration-300' />
											<div>
												<div className='font-medium text-gray-900'>
													Secure Staking
												</div>
												<div className='text-sm text-gray-600'>
													Industry-standard security
												</div>
											</div>
										</div>
										<div className='flex items-start group'>
											<CheckCircle className='w-5 h-5 text-green-500 mr-3 mt-0.5 group-hover:scale-110 transition-transform duration-300' />
											<div>
												<div className='font-medium text-gray-900'>
													Daily Rewards
												</div>
												<div className='text-sm text-gray-600'>
													Earnings calculated daily
												</div>
											</div>
										</div>
										<div className='flex items-start group'>
											<CheckCircle className='w-5 h-5 text-green-500 mr-3 mt-0.5 group-hover:scale-110 transition-transform duration-300' />
											<div>
												<div className='font-medium text-gray-900'>
													Flexible Plans
												</div>
												<div className='text-sm text-gray-600'>
													Choose your preferred duration
												</div>
											</div>
										</div>
									</div>
								</div>

								{/* Important Notice */}
								<div className='bg-gradient-to-br from-orange-50 to-red-50 rounded-2xl border border-orange-200 p-6'>
									<div className='flex items-center mb-4'>
										<div className='p-3 bg-gradient-to-br from-orange-500 to-red-500 rounded-xl mr-4'>
											<AlertCircle className='w-6 h-6 text-white' />
										</div>
										<h3 className='text-xl font-bold text-orange-900'>
											Important Notice
										</h3>
									</div>
									<div className='space-y-3 text-sm text-orange-800'>
										<div className='flex items-start'>
											<div className='w-2 h-2 bg-orange-500 rounded-full mt-2 mr-3 flex-shrink-0'></div>
											<span>
												Staked tokens are locked for the selected duration
											</span>
										</div>
										<div className='flex items-start'>
											<div className='w-2 h-2 bg-orange-500 rounded-full mt-2 mr-3 flex-shrink-0'></div>
											<span>Early withdrawal may result in penalty fees</span>
										</div>
										<div className='flex items-start'>
											<div className='w-2 h-2 bg-orange-500 rounded-full mt-2 mr-3 flex-shrink-0'></div>
											<span>
												Rewards are calculated daily and paid at maturity
											</span>
										</div>
										<div className='flex items-start'>
											<div className='w-2 h-2 bg-orange-500 rounded-full mt-2 mr-3 flex-shrink-0'></div>
											<span>Minimum stake amounts apply for each plan</span>
										</div>
									</div>
								</div>
							</div>
						</div>
					) : (
						/* Enhanced My Stakes Tab */
						<div className='bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 overflow-hidden'>
							<div className='p-8 border-b border-gray-200 bg-gradient-to-r from-gray-50 to-gray-100'>
								<div className='flex items-center justify-between'>
									<div className='flex items-center'>
										<div className='p-3 bg-gradient-to-br from-indigo-500 to-blue-500 rounded-xl mr-4'>
											<BarChart3 className='w-6 h-6 text-white' />
										</div>
										<div>
											<h2 className='text-2xl font-bold text-gray-900'>
												My Staking Positions
											</h2>
											<p className='text-gray-600'>
												Track your active stakes and earnings
											</p>
										</div>
									</div>
								</div>
							</div>

							{userStakes.length === 0 ? (
								<div className='p-16 text-center'>
									<div className='w-24 h-24 bg-gradient-to-br from-indigo-100 to-blue-100 rounded-full flex items-center justify-center mx-auto mb-6'>
										<Coins className='w-12 h-12 text-indigo-500' />
									</div>
									<h3 className='text-2xl font-bold text-gray-900 mb-3'>
										No stakes yet
									</h3>
									<p className='text-gray-600 mb-8 max-w-md mx-auto'>
										Start staking your AINT tokens to earn passive income with
										guaranteed returns
									</p>
									<button
										onClick={() => setActiveTab("stake")}
										className='bg-gradient-to-r from-indigo-600 to-blue-600 text-white px-8 py-4 rounded-xl hover:from-indigo-700 hover:to-blue-700 transition-all duration-300 transform hover:scale-105 shadow-lg font-semibold'>
										Start Staking Now
									</button>
								</div>
							) : (
								<div className='overflow-x-auto'>
									<table className='w-full'>
										<thead className='bg-gradient-to-r from-gray-50 to-gray-100'>
											<tr>
												<th className='px-8 py-6 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider'>
													Amount
												</th>
												<th className='px-8 py-6 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider'>
													Plan
												</th>
												<th className='px-8 py-6 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider'>
													APY
												</th>
												<th className='px-8 py-6 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider'>
													Start Date
												</th>
												<th className='px-8 py-6 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider'>
													End Date
												</th>
												<th className='px-8 py-6 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider'>
													Earned
												</th>
												<th className='px-8 py-6 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider'>
													Status
												</th>
												<th className='px-8 py-6 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider'>
													Actions
												</th>
											</tr>
										</thead>
										<tbody className='bg-white divide-y divide-gray-200'>
											{userStakes.map((stake) => (
												<tr
													key={stake.id}
													className='hover:bg-gray-50 transition-colors duration-200'>
													<td className='px-8 py-6 whitespace-nowrap'>
														<div className='text-lg font-bold text-gray-900'>
															{stake.amount.toLocaleString()} AINT
														</div>
													</td>
													<td className='px-8 py-6 whitespace-nowrap'>
														<div className='text-sm font-semibold text-gray-900'>
															{stake.plan}
														</div>
													</td>
													<td className='px-8 py-6 whitespace-nowrap'>
														<div className='flex items-center'>
															<Percent className='w-4 h-4 text-indigo-500 mr-1' />
															<span className='text-sm font-semibold text-indigo-600'>
																{stake.apy}
															</span>
														</div>
													</td>
													<td className='px-8 py-6 whitespace-nowrap'>
														<div className='flex items-center'>
															<Calendar className='w-4 h-4 text-gray-500 mr-2' />
															<span className='text-sm text-gray-900'>
																{stake.startDate}
															</span>
														</div>
													</td>
													<td className='px-8 py-6 whitespace-nowrap'>
														<div className='text-sm text-gray-900'>
															{stake.endDate}
														</div>
														{stake.status === "active" && (
															<div className='flex items-center mt-1'>
																<Clock className='w-4 h-4 text-orange-500 mr-1' />
																<span className='text-xs text-orange-600 font-medium'>
																	{getDaysRemaining(stake.endDate)} days
																	remaining
																</span>
															</div>
														)}
													</td>
													<td className='px-8 py-6 whitespace-nowrap'>
														<div className='flex items-center'>
															<TrendingUp className='w-4 h-4 text-green-500 mr-1' />
															<span className='text-lg font-bold text-green-600'>
																+{stake.earned.toFixed(2)} AINT
															</span>
														</div>
													</td>
													<td className='px-8 py-6 whitespace-nowrap'>
														<span
															className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${
																stake.status === "active"
																	? "bg-green-100 text-green-800"
																	: stake.status === "completed"
																	? "bg-blue-100 text-blue-800"
																	: "bg-gray-100 text-gray-800"
															}`}>
															{stake.status === "active" && (
																<div className='w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse'></div>
															)}
															{stake.status}
														</span>
													</td>
													<td className='px-8 py-6 whitespace-nowrap'>
														{stake.status === "active" ? (
															<button className='flex items-center text-indigo-600 hover:text-indigo-800 text-sm font-semibold transition-colors duration-200'>
																View Details
																<ChevronRight className='w-4 h-4 ml-1' />
															</button>
														) : stake.status === "completed" ? (
															<button
																onClick={() => handleClaimRewards(stake.id)}
																disabled={loading}
																className='flex items-center bg-gradient-to-r from-green-500 to-green-600 text-white px-4 py-2 rounded-lg hover:from-green-600 hover:to-green-700 disabled:opacity-50 transition-all duration-200 transform hover:scale-105'>
																<Unlock className='w-4 h-4 mr-2' />
																{loading ? "Claiming..." : "Claim Rewards"}
															</button>
														) : (
															<span className='flex items-center text-gray-500 text-sm'>
																<CheckCircle className='w-4 h-4 mr-1' />
																Claimed
															</span>
														)}
													</td>
												</tr>
											))}
										</tbody>
									</table>
								</div>
							)}
						</div>
					)}
				</div>
			</div>
		</DashboardLayout>
	);
}

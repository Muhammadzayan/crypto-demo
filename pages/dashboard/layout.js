import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Link from "next/link";
import { useRouter } from "next/router";
import Head from "next/head";
import { LogOut } from "lucide-react"; // import logout icon

import { useAuth } from "../../contexts/AuthContext";

const DashboardLayout = ({ children }) => {
	const { user, loading } = useAuth();
	if (loading) return <div>Loading...</div>;

	const [sidebarOpen, setSidebarOpen] = useState(false);
	const [newsSubmenuOpen, setNewsSubmenuOpen] = useState(false);
	const router = useRouter();
	const [settings, setSettings] = useState(null);

	const handleLogout = async () => {
		try {
			const res = await fetch("/api/authentication/logout", {
				method: "POST",
			});
			if (res.ok) {
				toast.success("Logout successful!");
				setTimeout(() => {
					router.push("/sign_in");
				}, 1000); // Delay to show toast before redirect
			} else {
				toast.error("Logout failed. Please try again.");
			}
		} catch (err) {
			console.error("Logout error:", err);
			toast.error("Something went wrong!");
		}
	};

	useEffect(() => {
		const fetchSettings = async () => {
			try {
				const res = await fetch("/api/admin/settings");
				const data = await res.json();

				if (data.success && Array.isArray(data.data)) {
					const settingsObj = Object.fromEntries(
						data.data.map((item) => [item.key, item.value])
					);
					console.log("Settings (as object):", settingsObj);
					setSettings(settingsObj); // ✅ Now settings.logo will work
				}
			} catch (err) {
				console.error("Failed to load settings", err);
			}
		};

		fetchSettings();
	}, []);

	const navigationItems = [
		{ name: "Dashboard", href: "/dashboard", icon: "dashboard" },
		{ name: "Profile", href: "/dashboard/profile", icon: "person" },
		{ name: "Wallet", href: "/dashboard/aint/wallet", icon: "wallet" },

		// AINT & Gold modules as individual items
		{ name: "Buy AINT", href: "/dashboard/aint/buy", icon: "buy" },
		{ name: "Receive AINT", href: "/dashboard/aint/receive", icon: "receive" },
		{ name: "Buy GAG", href: "/dashboard/gag/buy", icon: "buy" },
		{ name: "Receive GAG", href: "/dashboard/gag/receive", icon: "receive" },

		{
			name: "Send/Transfer",
			href: "/dashboard/aint/transfer",
			icon: "send",
		},
		{ name: "Swap Tokens", href: "/dashboard/aint/swap", icon: "swap" },
		{
			name: "Withdraw to Fiat/Gold",
			href: "/dashboard/aint/withdraw",
			icon: "withdraw",
		},
		{
			name: "Chart & Price",
			href: "/dashboard/aint/chart",
			icon: "chart",
		},
		{
			name: "Marketplace",
			href: "/dashboard/aint/marketplace",
			icon: "marketplace",
		},
		// { name: 'News', href: '/dashboard/aint/news', icon: 'news' },
		{
			name: "Trending Tokens",
			href: "/dashboard/aint/trending",
			icon: "trending",
		},
		{
			name: "Staking / Earn",
			href: "/dashboard/aint/staking",
			icon: "staking",
		},
		{
			name: "Transaction History",
			href: "/dashboard/aint/transactions",
			icon: "history",
		},
		{ name: "Explorer", href: "/dashboard/aint/explorer", icon: "explorer" },

		// GAG (GALIRA GOLD) modules
		{
			name: "Manage News",
			icon: "article",
			submenu: [
				{ name: "All News", href: "/dashboard/manage_blogs" },
				{ name: "Categories", href: "/dashboard/manage_categories" },
			],
		},
		// { name: 'OMNICORE', href: '/dashboard/aint/omnicore', icon: 'server' },
		{ name: "Manage Users", href: "/dashboard/manage_users", icon: "users" },
		{ name: "Site Settings", href: "/dashboard/setting", icon: "settings" },
	];

	const isActive = (href) => router.pathname === href;
	const isNewsActive = () =>
		router.pathname.startsWith("/dashboard/manage_blogs") ||
		router.pathname.startsWith("/dashboard/manage_categories");

	const getIcon = (iconName) => {
		const icons = {
			dashboard: (
				<svg width='20' height='20' viewBox='0 0 24 24' fill='currentColor'>
					<path d='M3 13h8V3H3v10zm0 8h8v-6H3v6zm10 0h8V11h-8v10zm0-18v6h8V3h-8z' />
				</svg>
			),
			person: (
				<svg width='20' height='20' viewBox='0 0 24 24' fill='currentColor'>
					<path d='M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z' />
				</svg>
			),
			wallet: (
				<svg width='20' height='20' viewBox='0 0 24 24' fill='currentColor'>
					<path d='M21 18v1c0 1.1-.9 2-2 2H5c-1.11 0-2-.9-2-2V5c0-1.1.89-2 2-2h14c1.1 0 2 .9 2 2v1h-9c-1.11 0-2 .9-2 2v8c0 1.1.89 2 2 2h9zm-9-2h10V8H12v8zm4-2.5c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5z' />
				</svg>
			),
			// AINT & Gold icons
			buy: (
				<svg width='20' height='20' viewBox='0 0 24 24' fill='currentColor'>
					<path d='M7 18c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zM1 2v2h2l3.6 7.59-1.35 2.45c-.16.28-.25.61-.25.96 0 1.1.9 2 2 2h12v-2H7.42c-.14 0-.25-.11-.25-.25l.03-.12L8.1 13h7.45c.75 0 1.41-.41 1.75-1.03L21.7 4H5.21l-.94-2H1zm16 16c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z' />
				</svg>
			),
			send: (
				<svg width='20' height='20' viewBox='0 0 24 24' fill='currentColor'>
					<path d='M2.01 21L23 12 2.01 3 2 10l15 2-15 2z' />
				</svg>
			),
			receive: (
				<svg width='20' height='20' viewBox='0 0 24 24' fill='currentColor'>
					<path d='M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z' />
				</svg>
			),
			swap: (
				<svg width='20' height='20' viewBox='0 0 24 24' fill='currentColor'>
					<path d='M6.99 11L3 15l3.99 4v-3H14v-2H6.99v-3zM21 9l-3.99-4v3H10v2h7.01v3L21 9z' />
				</svg>
			),
			withdraw: (
				<svg width='20' height='20' viewBox='0 0 24 24' fill='currentColor'>
					<path d='M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm3.5 6L12 10.5 8.5 8 12 5.5 15.5 8zM12 19c-3.87 0-7-3.13-7-7 0-.84.16-1.65.43-2.4l1.81 1.81c-.1.19-.24.38-.24.59 0 2.21 1.79 4 4 4s4-1.79 4-4c0-.21-.14-.4-.24-.59l1.81-1.81c.27.75.43 1.56.43 2.4 0 3.87-3.13 7-7 7z' />
				</svg>
			),
			chart: (
				<svg width='20' height='20' viewBox='0 0 24 24' fill='currentColor'>
					<path d='M3.5 18.49l6-6.01 4 4L22 6.92l-1.41-1.41-7.09 7.97-4-4L2 16.99z' />
				</svg>
			),
			marketplace: (
				<svg width='20' height='20' viewBox='0 0 24 24' fill='currentColor'>
					<path d='M19 7h-3V6a4 4 0 0 0-8 0v1H5a1 1 0 0 0-1 1v11a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3V8a1 1 0 0 0-1-1zM10 6a2 2 0 0 1 4 0v1h-4V6zm8 15a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V9h2v1a1 1 0 0 0 2 0V9h4v1a1 1 0 0 0 2 0V9h2v12z' />
				</svg>
			),
			news: (
				<svg width='20' height='20' viewBox='0 0 24 24' fill='currentColor'>
					<path d='M4 6H2v14c0 1.1.9 2 2 2h14v-2H4V6zm16-4H8c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-1 9H9V9h10v2zm-4 4H9v-2h6v2zm4-8H9V5h10v2z' />
				</svg>
			),
			trending: (
				<svg width='20' height='20' viewBox='0 0 24 24' fill='currentColor'>
					<path d='M16 6l2.29 2.29-4.88 4.88-4-4L2 16.59 3.41 18l6-6 4 4 6.3-6.29L22 12V6z' />
				</svg>
			),
			staking: (
				<svg width='20' height='20' viewBox='0 0 24 24' fill='currentColor'>
					<path d='M11.8 10.9c-2.27-.59-3-1.2-3-2.15 0-1.09 1.01-1.85 2.7-1.85 1.78 0 2.44.85 2.5 2.1h2.21c-.07-1.72-1.12-3.3-3.21-3.81V3h-3v2.16c-1.94.42-3.5 1.68-3.5 3.61 0 2.31 1.91 3.46 4.7 4.13 2.5.6 3 1.48 3 2.41 0 .69-.49 1.79-2.7 1.79-2.06 0-2.87-.92-2.98-2.1h-2.2c.12 2.19 1.76 3.42 3.68 3.83V21h3v-2.15c1.95-.37 3.5-1.5 3.5-3.55 0-2.84-2.43-3.81-4.7-4.4z' />
				</svg>
			),
			history: (
				<svg width='20' height='20' viewBox='0 0 24 24' fill='currentColor'>
					<path d='M13 3c-4.97 0-9 4.03-9 9H1l3.89 3.89.07.14L9 12H6c0-3.87 3.13-7 7-7s7 3.13 7 7-3.13 7-7 7c-1.93 0-3.68-.79-4.94-2.06l-1.42 1.42C8.27 19.99 10.51 21 13 21c4.97 0 9-4.03 9-9s-4.03-9-9-9zm-1 5v5l4.28 2.54.72-1.21-3.5-2.08V8H12z' />
				</svg>
			),
			explorer: (
				<svg width='20' height='20' viewBox='0 0 24 24' fill='currentColor'>
					<path d='M12 10.9c-.61 0-1.1.49-1.1 1.1s.49 1.1 1.1 1.1c.61 0 1.1-.49 1.1-1.1s-.49-1.1-1.1-1.1zM12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm2.19 12.19L6 18l3.81-8.19L18 6l-3.81 8.19z' />
				</svg>
			),
			article: (
				<svg width='20' height='20' viewBox='0 0 24 24' fill='currentColor'>
					<path d='M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 2 2h12c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z' />
				</svg>
			),
			settings: (
				<svg width='20' height='20' viewBox='0 0 24 24' fill='currentColor'>
					<path d='M19.14,12.94c0.04-0.3,0.06-0.61,0.06-0.94c0-0.32-0.02-0.64-0.07-0.94l2.03-1.58c0.18-0.14,0.23-0.41,0.12-0.61 l-1.92-3.32c-0.12-0.22-0.37-0.29-0.59-0.22l-2.39,0.96c-0.5-0.38-1.03-0.7-1.62-0.94L14.4,2.81c-0.04-0.24-0.24-0.41-0.48-0.41 h-3.84c-0.24,0-0.43,0.17-0.47,0.41L9.25,5.35C8.66,5.59,8.12,5.92,7.63,6.29L5.24,5.33c-0.22-0.08-0.47,0-0.59,0.22L2.74,8.87 C2.62,9.08,2.66,9.34,2.86,9.48l2.03,1.58C4.84,11.36,4.8,11.69,4.8,12s0.02,0.64,0.07,0.94l-2.03,1.58 c-0.18,0.14-0.23,0.41-0.12,0.61l1.92,3.32c0.12,0.22,0.37,0.29,0.59,0.22l2.39-0.96c0.5,0.38,1.03,0.7,1.62,0.94l0.36,2.54 c0.05,0.24,0.24,0.41,0.48,0.41h3.84c0.24,0,0.44-0.17,0.47-0.41l0.36-2.54c0.59-0.24,1.13-0.56,1.62-0.94l2.39,0.96 c0.22,0.08,0.47,0,0.59-0.22l1.92-3.32c0.12-0.22,0.07-0.47-0.12-0.61L19.14,12.94z M12,15.6c-1.98,0-3.6-1.62-3.6-3.6 s1.62-3.6,3.6-3.6s3.6,1.62,3.6,3.6S13.98,15.6,12,15.6z' />
				</svg>
			),
			users: (
				<svg width='20' height='20' viewBox='0 0 24 24' fill='currentColor'>
					<path d='M16 4c0-1.11.89-2 2-2s2 .89 2 2-.89 2-2 2-2-.89-2-2zm4 18v-6h2.5l-2.54-7.63A2.996 2.996 0 0 0 17.06 6c-.8 0-1.54.37-2.01.97L12 10.5 8.95 6.97C8.48 6.37 7.74 6 6.94 6c-1.4 0-2.6.93-2.9 2.37L1.5 16H4v6h2v-6h2.5l1.5-4.5L12 14l2.5-2.5L16 16h2.5v6h2z' />
				</svg>
			),
			server: (
				<svg width='20' height='20' viewBox='0 0 24 24' fill='currentColor'>
					<path d='M4 1h16c1.1 0 2 .9 2 2v6c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V3c0-1.1.9-2 2-2zm0 8h16c1.1 0 2 .9 2 2v6c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2v-6c0-1.1.9-2 2-2zm2 2v2h2v-2H6zm0-8v2h2V3H6zm12 8v2h2v-2h-2zm0-8v2h2V3h-2z' />
				</svg>
			),
			contact: (
				<svg width='20' height='20' viewBox='0 0 24 24' fill='currentColor'>
					<path d='M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z' />
				</svg>
			),
			info: (
				<svg width='20' height='20' viewBox='0 0 24 24' fill='currentColor'>
					<path d='M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z' />
				</svg>
			),
			home: (
				<svg width='20' height='20' viewBox='0 0 24 24' fill='currentColor'>
					<path d='M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z' />
				</svg>
			),
			chevronDown: (
				<svg width='16' height='16' viewBox='0 0 24 24' fill='currentColor'>
					<path d='M7 10l5 5 5-5z' />
				</svg>
			),
			chevronRight: (
				<svg width='16' height='16' viewBox='0 0 24 24' fill='currentColor'>
					<path d='M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z' />
				</svg>
			),
		};
		return icons[iconName] || icons.dashboard;
	};

	React.useEffect(() => {
		if (isNewsActive()) {
			setNewsSubmenuOpen(true);
		}
	}, [router.pathname]);

	return (
		<>
			<Head>
				<title>
					{settings?.siteName
						? `Dashboard - ${settings.siteName}`
						: "Dashboard - Aincore"}
				</title>
				{settings?.siteDescription && (
					<meta name='description' content={settings.siteDescription} />
				)}
			</Head>
			<div className='dashboard-container'>
				{/* Sidebar */}
				<aside
					className={`dashboard-sidebar ${sidebarOpen ? "sidebar-open" : ""}`}>
					<div className='dashboard-sidebar-header'>
						<Link href='/'>
							<div className='logo'>
								{settings?.logo ? (
									<img
										src={
											settings.logo?.startsWith("http")
												? settings.logo
												: settings.logo?.startsWith("uploads")
												? settings.logo
												: `${settings.logo}`
										}
										alt={settings.siteName || "Logo"}
										style={{ height: 40, objectFit: "contain" }}
									/>
								) : (
									<span style={{ fontSize: "18px", fontWeight: "bold" }}>
										{settings?.siteName || "Aincore"}
									</span>
								)}
							</div>
						</Link>
					</div>

					<nav className='dashboard-sidebar-nav'>
						{navigationItems.map((item) => (
							<div key={item.name}>
								{item.submenu ? (
									<>
										<div
											className={`nav-item ${
												item.name === "Manage News" && isNewsActive()
													? "active"
													: ""
											}`}
											onClick={() => {
												if (item.name === "Manage News") {
													setNewsSubmenuOpen(!newsSubmenuOpen);
												}
											}}>
											<span className='nav-icon'>{getIcon(item.icon)}</span>
											<span className='nav-text'>{item.name}</span>
											<span className='submenu-arrow'>
												{item.name === "Manage News" && newsSubmenuOpen
													? getIcon("chevronDown")
													: getIcon("chevronRight")}
											</span>
										</div>
										{item.name === "Manage News" && newsSubmenuOpen && (
											<ul className='submenu'>
												{item.submenu.map((subItem) => (
													<li key={subItem.name}>
														<Link href={subItem.href}>
															<div
																className={`submenu-item ${
																	isActive(subItem.href) ? "active" : ""
																}`}>
																{subItem.icon && (
																	<span className='submenu-icon'>
																		{getIcon(subItem.icon)}
																	</span>
																)}
																<span className='submenu-text'>
																	{subItem.name}
																</span>
															</div>
														</Link>
													</li>
												))}
											</ul>
										)}
									</>
								) : (
									<Link href={item.href}>
										<div
											className={`nav-item ${
												isActive(item.href) ? "active" : ""
											}`}>
											<span className='nav-icon'>{getIcon(item.icon)}</span>
											<span className='nav-text'>{item.name}</span>
										</div>
									</Link>
								)}
							</div>
						))}
					</nav>
				</aside>

				{/* Main Content Area */}
				<div className='main-content'>
					{/* Top Header */}
					<header className='top-header'>
						<div className='header-left'>
							<button
								className='sidebar-toggle'
								onClick={() => setSidebarOpen(!sidebarOpen)}>
								<svg
									width='20'
									height='20'
									viewBox='0 0 24 24'
									fill='currentColor'>
									<path d='M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z' />
								</svg>
							</button>
							<h1 className='page-title'>Dashboard</h1>
						</div>

						<div className='header-right'>
							<div
								className='user-profile'
								style={{ display: "flex", alignItems: "center", gap: "10px" }}>
								<div className='user-avatar'>
									{user && user.avatar ? (
										<img
											src={
												user.avatar.startsWith("http")
													? user.avatar
													: `${user.avatar}`
											}
											alt='User Avatar'
											className='avatar-image'
											style={{
												width: "100%",
												height: "100%",
												borderRadius: "50%",
												objectFit: "cover",
											}}
										/>
									) : user ? (
										<div
											className='avatar-circle'
											style={{
												width: "100%",
												height: "100%",
												borderRadius: "50%",
												backgroundColor: "#ccc",
												display: "flex",
												alignItems: "center",
												justifyContent: "center",
												fontSize: 28,
												fontWeight: "bold",
												color: "#fff",
											}}>
											{user.first_name?.charAt(0).toUpperCase()}
											{user.last_name?.charAt(0).toUpperCase()}
										</div>
									) : null}
								</div>

								<div
									className='user-info'
									style={{
										display: "contents",
										alignItems: "center",
										gap: "10px",
									}}>
									<span className='user-name'>
										{user?.full_name || "Guest"}
									</span>
									{user && (
										<LogOut
											onClick={handleLogout}
											size={20}
											style={{ cursor: "pointer" }}
											title='Logout'
										/>
									)}
								</div>
							</div>
						</div>
					</header>

					{/* Page Content */}
					<main className='page-content'>{children}</main>
				</div>

				{/* Mobile Overlay */}
				{sidebarOpen && (
					<div
						className='mobile-overlay'
						onClick={() => setSidebarOpen(false)}></div>
				)}
			</div>
		</>
	);
};

export default DashboardLayout;

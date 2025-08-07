import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import DashboardLayout from './layout';

import { useAuth } from '../../contexts/AuthContext';

const Dashboard = () => {

    const { user, loading } = useAuth();
    if (loading) return <div>Loading...</div>;

    const stats = [
        { title: 'Total Balance', value: '$12,345.67', change: '+12.5%', positive: true },
        { title: 'Active Tokens', value: '8', change: '+2', positive: true },
        { title: 'Portfolio Value', value: '$45,678.90', change: '-2.3%', positive: false },
        { title: 'Monthly Profit', value: '$2,345.12', change: '+18.7%', positive: true },
    ];

    const recentTransactions = [
        { id: 1, type: 'Buy', token: 'BTC', amount: '0.5', value: '$15,000', time: '2 hours ago' },
        { id: 2, type: 'Sell', token: 'ETH', amount: '2.0', value: '$3,200', time: '5 hours ago' },
        { id: 3, type: 'Buy', token: 'ADA', amount: '1000', value: '$450', time: '1 day ago' },
        { id: 4, type: 'Sell', token: 'DOT', amount: '50', value: '$350', time: '2 days ago' },
    ];

    return (
        <>
            <DashboardLayout>
                <div className="dashboard-content">
                    {/* Welcome Section */}
                    <div className="welcome-section">
                        <h2>Welcome back, {user?.full_name || 'Guest'}!</h2>
                        <p>Here's what's happening with your crypto portfolio today.</p>
                    </div>

                    {/* Stats Grid */}
                    <div className="stats-grid">
                        {stats.map((stat, index) => (
                            <div key={index} className="stat-card">
                                <div className="stat-header">
                                    <h3>{stat.title}</h3>
                                    <span className={`stat-change ${stat.positive ? 'positive' : 'negative'}`}>
                                        {stat.change}
                                    </span>
                                </div>
                                <div className="stat-value">{stat.value}</div>
                            </div>
                        ))}
                    </div>

                    {/* Content Grid */}
                    <div className="content-grid">
                        {/* Portfolio Chart */}
                        <div className="chart-card">
                            <div className="card-header">
                                <h3>Portfolio Performance</h3>
                                <select className="time-selector">
                                    <option>Last 7 days</option>
                                    <option>Last 30 days</option>
                                    <option>Last 3 months</option>
                                </select>
                            </div>
                            <div className="chart-placeholder">
                                <div className="chart-mock">
                                    <svg width="100%" height="200" viewBox="0 0 400 200">
                                        <defs>
                                            <linearGradient id="chartGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                                                <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.3"/>
                                                <stop offset="100%" stopColor="#3b82f6" stopOpacity="0"/>
                                            </linearGradient>
                                        </defs>
                                        <polyline
                                            fill="none"
                                            stroke="#3b82f6"
                                            strokeWidth="2"
                                            points="0,150 50,120 100,140 150,100 200,80 250,90 300,60 350,70 400,50"
                                        />
                                        <polygon
                                            fill="url(#chartGradient)"
                                            points="0,150 50,120 100,140 150,100 200,80 250,90 300,60 350,70 400,50 400,200 0,200"
                                        />
                                    </svg>
                                </div>
                            </div>
                        </div>

                        {/* Recent Transactions */}
                        <div className="transactions-card">
                            <div className="card-header">
                                <h3>Recent Transactions</h3>
                                <button className="view-all-btn">View All</button>
                            </div>
                            <div className="transactions-list">
                                {recentTransactions.map((transaction) => (
                                    <div key={transaction.id} className="transaction-item">
                                        <div className="transaction-info">
                                            <div className="transaction-type">
                                                <span className={`type-badge ${transaction.type.toLowerCase()}`}>
                                                    {transaction.type}
                                                </span>
                                                <span className="token-name">{transaction.token}</span>
                                            </div>
                                            <div className="transaction-details">
                                                <span className="amount">{transaction.amount} {transaction.token}</span>
                                                <span className="time">{transaction.time}</span>
                                            </div>
                                        </div>
                                        <div className="transaction-value">{transaction.value}</div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Quick Actions */}
                    <div className="quick-actions">
                        <h3>Quick Actions</h3>
                        <div className="actions-grid">
                            <Link href='/dashboard/aint/buy' className="action-btn primary">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M7 18c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zM1 2v2h2l3.6 7.59-1.35 2.45c-.16.28-.25.61-.25.96 0 1.1.9 2 2 2h12v-2H7.42c-.14 0-.25-.11-.25-.25l.03-.12L8.1 13h7.45c.75 0 1.41-.41 1.75-1.03L21.7 4H5.21l-.94-2H1zm16 16c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"/>
                                </svg>
                                <span>Buy AINT</span>
                            </Link>
                            <Link href='/dashboard/aint/transfer' className="action-btn secondary">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/>
                                </svg>
                                <span>Sent/Transfer AINT</span>
                            </Link>
                            <Link href='/dashboard/aint/marketplace' className="action-btn secondary">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M19 7h-3V6a4 4 0 0 0-8 0v1H5a1 1 0 0 0-1 1v11a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3V8a1 1 0 0 0-1-1zM10 6a2 2 0 0 1 4 0v1h-4V6zm8 15a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V9h2v1a1 1 0 0 0 2 0V9h4v1a1 1 0 0 0 2 0V9h2v12z"/>
                                </svg>
                                <span>Marketplace</span>
                            </Link>
                            <Link href='/dashboard/aint/chart' className="action-btn secondary">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zM9 17H7v-7h2v7zm4 0h-2V7h2v10zm4 0h-2v-4h2v4z"/>
                                </svg>
                                <span>Analytics</span>
                            </Link>
                        </div>
                    </div>
                </div>
            </DashboardLayout>
        </>
    );
};

export default Dashboard;
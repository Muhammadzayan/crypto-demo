import React, { useState } from 'react';
import DashboardLayout from '../layout';
import { Search, Filter, Download, Eye, ArrowUpRight, ArrowDownLeft, RefreshCw, Calendar } from 'lucide-react';

export default function TransactionHistory() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [dateRange, setDateRange] = useState('30d');

  const transactionTypes = [
    { value: 'all', label: 'All Types' },
    { value: 'buy', label: 'Buy' },
    { value: 'sell', label: 'Sell' },
    { value: 'transfer', label: 'Transfer' },
    { value: 'swap', label: 'Swap' },
    { value: 'withdraw', label: 'Withdraw' },
    { value: 'stake', label: 'Stake' },
    { value: 'unstake', label: 'Unstake' }
  ];

  const statusTypes = [
    { value: 'all', label: 'All Status' },
    { value: 'completed', label: 'Completed' },
    { value: 'pending', label: 'Pending' },
    { value: 'failed', label: 'Failed' }
  ];

  const dateRanges = [
    { value: '7d', label: 'Last 7 days' },
    { value: '30d', label: 'Last 30 days' },
    { value: '90d', label: 'Last 3 months' },
    { value: '1y', label: 'Last year' }
  ];

  // Mock transaction data
  const transactions = [
    {
      id: 'tx_001',
      type: 'buy',
      amount: 100,
      token: 'AINT',
      value: 28050,
      currency: 'USD',
      status: 'completed',
      date: '2024-01-15T10:30:00Z',
      hash: '0x1234...5678',
      fee: 5.50,
      from: 'Bank Transfer',
      to: 'AINT Wallet'
    },
    {
      id: 'tx_002',
      type: 'transfer',
      amount: 50,
      token: 'AINT',
      value: 14025,
      currency: 'USD',
      status: 'completed',
      date: '2024-01-14T15:45:00Z',
      hash: '0x2345...6789',
      fee: 2.00,
      from: 'My Wallet',
      to: '0x1234...abcd'
    },
    {
      id: 'tx_003',
      type: 'swap',
      amount: 25,
      token: 'AINT',
      value: 7012.5,
      currency: 'USD',
      status: 'completed',
      date: '2024-01-13T09:20:00Z',
      hash: '0x3456...789a',
      fee: 1.25,
      from: 'AINT',
      to: 'BTC'
    },
    {
      id: 'tx_004',
      type: 'stake',
      amount: 500,
      token: 'AINT',
      value: 140250,
      currency: 'USD',
      status: 'completed',
      date: '2024-01-12T14:10:00Z',
      hash: '0x4567...89ab',
      fee: 0,
      from: 'AINT Wallet',
      to: 'Staking Pool'
    },
    {
      id: 'tx_005',
      type: 'withdraw',
      amount: 75,
      token: 'AINT',
      value: 21037.5,
      currency: 'USD',
      status: 'pending',
      date: '2024-01-11T11:30:00Z',
      hash: '0x5678...9abc',
      fee: 10.50,
      from: 'AINT Wallet',
      to: 'Bank Account'
    },
    {
      id: 'tx_006',
      type: 'buy',
      amount: 200,
      token: 'AINT',
      value: 56100,
      currency: 'USD',
      status: 'failed',
      date: '2024-01-10T16:20:00Z',
      hash: '0x6789...abcd',
      fee: 0,
      from: 'Credit Card',
      to: 'AINT Wallet'
    }
  ];

  const filteredTransactions = transactions.filter(tx => {
    const matchesSearch = tx.hash.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         tx.type.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = filterType === 'all' || tx.type === filterType;
    const matchesStatus = filterStatus === 'all' || tx.status === filterStatus;
    return matchesSearch && matchesType && matchesStatus;
  });

  const getTypeIcon = (type) => {
    switch (type) {
      case 'buy':
      case 'transfer':
        return <ArrowDownLeft className="type-icon buy" />;
      case 'sell':
      case 'withdraw':
        return <ArrowUpRight className="type-icon sell" />;
      default:
        return <RefreshCw className="type-icon swap" />;
    }
  };

  const getStatusClass = (status) => {
    switch (status) {
      case 'completed':
        return 'status-completed';
      case 'pending':
        return 'status-pending';
      case 'failed':
        return 'status-failed';
      default:
        return 'status-completed';
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString();
  };

  const exportTransactions = () => {
    // In a real app, this would generate and download a CSV/PDF
    alert('Transaction export functionality would be implemented here');
  };

  return (
    <DashboardLayout>
      <div className="transaction-container">
        <div className="transaction-wrapper">
          {/* Header */}
          <div className="transaction-header">
            <div className="transaction-header-content">
              <div>
                <h1 className="transaction-title">Transaction History</h1>
                <p className="transaction-subtitle">View all your AINT transactions including swaps, buys, withdrawals, and transfers</p>
              </div>
              <button
                onClick={exportTransactions}
                className="export-btn"
              >
                <Download />
                Export
              </button>
            </div>
          </div>

          {/* Summary Cards */}
          <div className="summary-grid">
            <div className="summary-card">
              <div className="summary-label">Total Transactions</div>
              <div className="summary-value">{transactions.length}</div>
            </div>
            <div className="summary-card">
              <div className="summary-label">Total Volume</div>
              <div className="summary-value">
                ${transactions.reduce((sum, tx) => sum + tx.value, 0).toLocaleString()}
              </div>
            </div>
            <div className="summary-card">
              <div className="summary-label">Completed</div>
              <div className="summary-value success">
                {transactions.filter(tx => tx.status === 'completed').length}
              </div>
            </div>
            <div className="summary-card">
              <div className="summary-label">Pending</div>
              <div className="summary-value warning">
                {transactions.filter(tx => tx.status === 'pending').length}
              </div>
            </div>
          </div>

          {/* Filters */}
          <div className="filters-card">
            <div className="filters-container">
              {/* Search */}
              <div className="search-container">
                <Search className="search-icon" />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search by transaction hash or type..."
                  className="search-input"
                />
              </div>

              {/* Type Filter */}
              <select
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
                className="filter-select"
              >
                {transactionTypes.map((type) => (
                  <option key={type.value} value={type.value}>
                    {type.label}
                  </option>
                ))}
              </select>

              {/* Status Filter */}
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="filter-select"
              >
                {statusTypes.map((status) => (
                  <option key={status.value} value={status.value}>
                    {status.label}
                  </option>
                ))}
              </select>

              {/* Date Range */}
              <select
                value={dateRange}
                onChange={(e) => setDateRange(e.target.value)}
                className="filter-select"
              >
                {dateRanges.map((range) => (
                  <option key={range.value} value={range.value}>
                    {range.label}
                  </option>
                ))}
              </select>

              <button className="more-filters-btn">
                <Filter />
                More Filters
              </button>
            </div>
          </div>

          {/* Transactions Table */}
          <div className="transactions-table-card">
            <div className="table-container">
              <table className="transactions-table">
                <thead className="table-header">
                  <tr>
                    <th>Type</th>
                    <th>Amount</th>
                    <th>Value</th>
                    <th>From/To</th>
                    <th>Date</th>
                    <th>Status</th>
                    <th>Fee</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody className="table-body">
                  {filteredTransactions.map((transaction) => (
                    <tr key={transaction.id} className="table-row">
                      <td className="table-cell">
                        <div className="type-cell">
                          {getTypeIcon(transaction.type)}
                          <div className="type-info">
                            <div className="type-name">
                              {transaction.type}
                            </div>
                            <div className="type-hash">{transaction.hash}</div>
                          </div>
                        </div>
                      </td>
                      <td className="table-cell">
                        <div className="amount-value">
                          {transaction.amount.toLocaleString()} {transaction.token}
                        </div>
                      </td>
                      <td className="table-cell">
                        <div className="value-amount">
                          ${transaction.value.toLocaleString()}
                        </div>
                      </td>
                      <td className="table-cell">
                        <div className="from-to-cell">
                          <div>From: {transaction.from}</div>
                          <div>To: {transaction.to}</div>
                        </div>
                      </td>
                      <td className="table-cell">
                        <div className="date-value">
                          {formatDate(transaction.date)}
                        </div>
                      </td>
                      <td className="table-cell">
                        <span className={`status-badge ${getStatusClass(transaction.status)}`}>
                          {transaction.status}
                        </span>
                      </td>
                      <td className="table-cell">
                        <div className="fee-value">
                          ${transaction.fee.toFixed(2)}
                        </div>
                      </td>
                      <td className="table-cell">
                        <button className="action-btn">
                          <Eye />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Pagination */}
          <div className="pagination-container">
            <div className="pagination-info">
              Showing {filteredTransactions.length} of {transactions.length} transactions
            </div>
            <div className="pagination-buttons">
              <button className="pagination-btn">
                Previous
              </button>
              <button className="pagination-btn active">
                1
              </button>
              <button className="pagination-btn">
                2
              </button>
              <button className="pagination-btn">
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
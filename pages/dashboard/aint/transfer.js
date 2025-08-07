import React, { useState } from 'react';
import DashboardLayout from '../layout.js';
import { Send, QrCode, User, Wallet, AlertCircle, CheckCircle, Copy, ArrowRight, Scan, X } from 'lucide-react';

export default function TransferAINT() {
  const [transferMethod, setTransferMethod] = useState('address');
  const [recipientAddress, setRecipientAddress] = useState('');
  const [amount, setAmount] = useState('');
  const [selectedToken, setSelectedToken] = useState('AINT');
  const [memo, setMemo] = useState('');
  const [showQRScanner, setShowQRScanner] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const supportedTokens = [
    { symbol: 'AINT', name: 'AINT Token', balance: '1,250.50', icon: '🏆', color: '#d4af37' },
    { symbol: 'GAG', name: 'GALIRA GOLD Token', balance: '850.25', icon: '🥇', color: '#ff6b35' },
    { symbol: 'BTC', name: 'Bitcoin', balance: '0.05432', icon: '₿', color: '#f7931a' },
    { symbol: 'ETH', name: 'Ethereum', balance: '2.1234', icon: 'Ξ', color: '#627eea' },
    { symbol: 'BNB', name: 'Binance Coin', balance: '15.67', icon: '🔶', color: '#f3ba2f' },
    { symbol: 'XRP', name: 'Ripple', balance: '500.00', icon: '◊', color: '#23292f' }
  ];

  const recentContacts = [
    { name: 'John Doe', address: '1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa', avatar: 'JD', lastUsed: '2 hours ago' },
    { name: 'Alice Smith', address: '3J98t1WpEZ73CNmQviecrnyiWrnqRhWNLy', avatar: 'AS', lastUsed: '1 day ago' },
    { name: 'Bob Wilson', address: 'bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh', avatar: 'BW', lastUsed: '3 days ago' }
  ];

  const validateForm = () => {
    const newErrors = {};
    
    if (!recipientAddress.trim()) {
      newErrors.address = 'Recipient address is required';
    }
    
    if (!amount || parseFloat(amount) <= 0) {
      newErrors.amount = 'Please enter a valid amount';
    }
    
    const selectedTokenData = supportedTokens.find(token => token.symbol === selectedToken);
    if (selectedTokenData && parseFloat(amount) > parseFloat(selectedTokenData.balance.replace(',', ''))) {
      newErrors.amount = 'Insufficient balance';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleTransfer = async () => {
    if (!validateForm()) return;
    
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      alert('Transfer initiated successfully!');
      // Reset form
      setRecipientAddress('');
      setAmount('');
      setMemo('');
    }, 2000);
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    alert('Address copied to clipboard!');
  };

  const selectContact = (contact) => {
    setRecipientAddress(contact.address);
    setTransferMethod('address');
  };

  const selectedTokenData = supportedTokens.find(token => token.symbol === selectedToken);

  return (
    <DashboardLayout>
      <div className="transfer-container">
        <div className="transfer-wrapper">
          {/* Header */}
          <div className="transfer-header fade-in">
            <h1 className="transfer-title">Send/Transfer Tokens</h1>
            <p className="transfer-subtitle">Send AINT and other cryptocurrencies to any wallet address</p>
          </div>

          <div className="transfer-grid">
            {/* Main Transfer Form */}
            <div className="slide-up">
              <div className="transfer-card">
                
                {/* Transfer Method Selection */}
                <div className="form-group">
                  <h2 className="section-title">Transfer Method</h2>
                  <div className="method-buttons">
                    <button
                      onClick={() => setTransferMethod('address')}
                      className={`method-button ${transferMethod === 'address' ? 'active' : ''}`}
                    >
                      <Wallet size={20} />
                      Wallet Address
                    </button>
                    <button
                      onClick={() => setTransferMethod('qr')}
                      className={`method-button ${transferMethod === 'qr' ? 'active qr' : ''}`}
                    >
                      <QrCode size={20} />
                      QR Code
                    </button>
                  </div>
                </div>

                {/* Token Selection */}
                <div className="form-group">
                  <h2 className="section-title">Select Token</h2>
                  <div className="token-grid">
                    {supportedTokens.map((token) => (
                      <button
                        key={token.symbol}
                        onClick={() => setSelectedToken(token.symbol)}
                        className={`token-button ${selectedToken === token.symbol ? `active ${token.symbol === 'AINT' ? 'aint' : token.symbol === 'GAG' ? 'gag' : ''}` : ''}`}
                      >
                        <div className="token-header">
                          <span className="token-icon">{token.icon}</span>
                          <span className="token-symbol">{token.symbol}</span>
                        </div>
                        <div className="token-balance">
                          {token.balance} {token.symbol}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Recipient Address */}
                <div className="form-group">
                  <label className="form-label">Recipient Address</label>
                  {transferMethod === 'address' ? (
                    <div className="input-with-icon">
                      <input
                        type="text"
                        value={recipientAddress}
                        onChange={(e) => setRecipientAddress(e.target.value)}
                        placeholder="Enter wallet address"
                        className={`form-input ${errors.address ? 'error' : ''}`}
                      />
                      <button
                        onClick={() => setShowQRScanner(true)}
                        className="input-icon"
                      >
                        <Scan size={20} />
                      </button>
                    </div>
                  ) : (
                    <div className="qr-scanner-area">
                      <QrCode className="qr-icon" />
                      <p className="qr-text">Tap to scan QR code</p>
                      <button
                        onClick={() => setShowQRScanner(true)}
                        className="qr-button hover-lift"
                      >
                        Open Scanner
                      </button>
                    </div>
                  )}
                  {errors.address && (
                    <p className="error-message">{errors.address}</p>
                  )}
                </div>

                {/* Amount */}
                <div className="form-group">
                  <label className="form-label">Amount</label>
                  <div className="input-with-icon">
                    <input
                      type="number"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                      placeholder="0.00"
                      className={`form-input ${errors.amount ? 'error' : ''}`}
                    />
                    <div className="input-suffix">{selectedToken}</div>
                  </div>
                  {selectedTokenData && (
                    <div className="balance-info">
                      <p className="balance-text">
                        Balance: {selectedTokenData.balance} {selectedToken}
                      </p>
                      <button
                        onClick={() => setAmount(selectedTokenData.balance.replace(',', ''))}
                        className="max-button"
                      >
                        Max
                      </button>
                    </div>
                  )}
                  {errors.amount && (
                    <p className="error-message">{errors.amount}</p>
                  )}
                </div>

                {/* Memo */}
                <div className="form-group">
                  <label className="form-label">Memo (Optional)</label>
                  <textarea
                    value={memo}
                    onChange={(e) => setMemo(e.target.value)}
                    placeholder="Add a note for this transaction"
                    rows={3}
                    className="form-textarea"
                  />
                </div>

                {/* Transaction Summary */}
                <div className="transaction-summary">
                  <h3 className="summary-title">Transaction Summary</h3>
                  <div className="summary-row">
                    <span className="summary-label">Amount:</span>
                    <span className="summary-value">{amount || '0.00'} {selectedToken}</span>
                  </div>
                  <div className="summary-row">
                    <span className="summary-label">Network Fee:</span>
                    <span className="summary-value">0.001 BTC</span>
                  </div>
                  <div className="summary-total">
                    <div className="summary-row">
                      <span className="summary-label">Total:</span>
                      <span className="summary-value">{amount || '0.00'} {selectedToken} + 0.001 BTC</span>
                    </div>
                  </div>
                </div>

                {/* Send Button */}
                <button
                  onClick={handleTransfer}
                  disabled={loading}
                  className={`send-button ${selectedToken === 'AINT' ? 'aint-button' : selectedToken === 'GAG' ? 'gag-button' : ''} hover-lift`}
                >
                  {loading ? (
                    <div className="loading-spinner" />
                  ) : (
                    <>
                      <Send size={20} />
                      Send {selectedToken}
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Recent Contacts Sidebar */}
            <div className="slide-up">
              <div className="sidebar-card">
                <h3 className="section-title">Recent Contacts</h3>
                <div className="contacts-list">
                  {recentContacts.map((contact, index) => (
                    <div
                      key={index}
                      onClick={() => selectContact(contact)}
                      className="contact-item hover-lift"
                    >
                      <div className="contact-content">
                        <div className="contact-avatar">
                          {contact.avatar}
                        </div>
                        <div className="contact-info">
                          <p className="contact-name">{contact.name}</p>
                          <p className="contact-address">{contact.address}</p>
                          <p className="contact-time">{contact.lastUsed}</p>
                        </div>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            copyToClipboard(contact.address);
                          }}
                          className="copy-button"
                        >
                          <Copy size={16} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Quick Actions */}
                <div className="quick-actions">
                  <h4 className="quick-actions-title">Quick Actions</h4>
                  <div className="quick-actions-list">
                    <button className="quick-action-button hover-lift">
                      <User size={16} />
                      <span>Address Book</span>
                    </button>
                    <button className="quick-action-button hover-lift">
                      <QrCode size={16} />
                      <span>My QR Code</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* QR Scanner Modal */}
          {showQRScanner && (
            <div className="modal-overlay">
              <div className="modal-content fade-in">
                <div className="modal-header">
                  <h3 className="modal-title">Scan QR Code</h3>
                  <button
                    onClick={() => setShowQRScanner(false)}
                    className="modal-close"
                  >
                    <X size={20} />
                  </button>
                </div>
                <div className="modal-scanner">
                  <QrCode className="modal-scanner-icon" />
                  <p className="modal-scanner-text">Position QR code within the frame</p>
                  <p className="modal-scanner-note">Camera access will be requested</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}
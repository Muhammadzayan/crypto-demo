import React, { useState, useEffect } from 'react';
import DashboardLayout from '../layout';
import {
  Server,
  Wifi,
  WifiOff,
  Shield,
  Key,
  Globe,
  Activity,
  Database,
  Clock,
  Eye,
  EyeOff,
  CheckCircle,
  AlertTriangle,
  XCircle,
  Zap,
  Settings,
  RotateCcw,
  PlayCircle,
  StopCircle,
  Monitor,
  HardDrive,
  Cpu,
  Network
} from 'lucide-react';

export default function OmnicoreConnection() {
  const [connectionForm, setConnectionForm] = useState({
    host: 'localhost',
    port: '8332',
    username: '',
    password: '',
    useSSL: false
  });

  const [connectionStatus, setConnectionStatus] = useState('disconnected'); // disconnected, connecting, connected, error
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [nodeInfo, setNodeInfo] = useState(null);
  const [logs, setLogs] = useState([
    { time: '14:23:15', type: 'info', message: 'OMNICORE service initialized' },
    { time: '14:23:16', type: 'info', message: 'Waiting for connection...' }
  ]);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setConnectionForm(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const addLog = (type, message) => {
    const now = new Date();
    const time = now.toLocaleTimeString('en-US', { hour12: false });
    setLogs(prev => [...prev.slice(-20), { time, type, message }]);
  };

  const testConnection = async () => {
    setIsLoading(true);
    setConnectionStatus('connecting');
    addLog('info', 'Testing connection to OMNICORE node...');

    try {
      // Simulate connection test
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      if (connectionForm.username && connectionForm.password) {
        setConnectionStatus('connected');
        setNodeInfo({
          version: '0.11.0',
          blockCount: 845672,
          connections: 8,
          difficulty: '92.67T',
          hashrate: '150.3 EH/s',
          mempool: 2847,
          lastBlock: '2024-01-15 14:22:45'
        });
        addLog('success', 'Successfully connected to OMNICORE node');
        addLog('success', `Node version: 0.11.0`);
        addLog('success', `Block height: 845,672`);
      } else {
        throw new Error('Authentication failed');
      }
    } catch (error) {
      setConnectionStatus('error');
      addLog('error', `Connection failed: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  const disconnect = () => {
    setConnectionStatus('disconnected');
    setNodeInfo(null);
    addLog('warning', 'Disconnected from OMNICORE node');
  };

  const restartNode = () => {
    addLog('warning', 'Sending restart command to OMNICORE node...');
    setTimeout(() => {
      addLog('success', 'OMNICORE node restarted successfully');
    }, 1500);
  };

  const syncStatus = () => {
    addLog('info', 'Checking synchronization status...');
    setTimeout(() => {
      addLog('success', 'Node is fully synchronized with network');
    }, 1000);
  };

  const getStatusBadgeClass = () => {
    switch (connectionStatus) {
      case 'connected':
        return 'status-success';
      case 'connecting':
        return 'status-warning';
      case 'error':
        return 'status-error';
      default:
        return 'status-secondary';
    }
  };

  const getStatusText = () => {
    switch (connectionStatus) {
      case 'connected':
        return 'Connected';
      case 'connecting':
        return 'Connecting...';
      case 'error':
        return 'Connection Failed';
      default:
        return 'Disconnected';
    }
  };

  const getStatusIcon = () => {
    switch (connectionStatus) {
      case 'connected':
        return <CheckCircle className="w-4 h-4" />;
      case 'connecting':
        return <Activity className="w-4 h-4 animate-spin" />;
      case 'error':
        return <XCircle className="w-4 h-4" />;
      default:
        return <AlertTriangle className="w-4 h-4" />;
    }
  };

  return (
    <DashboardLayout>
      <div className="omnicore-container">
        {/* Header Section */}
        <div className="omnicore-header">
          <div className="header-content">
            <div className="header-info">
              <h1 className="page-title">
                <Server className="title-icon" />
                OMNICORE Connection
              </h1>
              <p className="page-subtitle">
                Configure and manage your connection to the OMNICORE Bitcoin node for enhanced asset management and blockchain interactions.
              </p>
            </div>
            <div className="connection-status">
              <div className={`status-badge ${getStatusBadgeClass()}`}>
                {getStatusIcon()}
                {getStatusText()}
              </div>
            </div>
          </div>
        </div>

        {/* Main Grid */}
        <div className="omnicore-grid">
          {/* Connection Configuration */}
          <div className="connection-card">
            <div className="card-content">
              <h2 className="card-title">
                <Settings className="card-icon" />
                Connection Settings
              </h2>
              
              <div className="form-grid">
                <div className="form-group">
                  <label className="form-label">
                    <Globe className="label-icon" />
                    Host Address
                  </label>
                  <input
                    type="text"
                    name="host"
                    value={connectionForm.host}
                    onChange={handleInputChange}
                    className="form-input"
                    placeholder="localhost or IP address"
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">
                    <Network className="label-icon" />
                    Port
                  </label>
                  <input
                    type="number"
                    name="port"
                    value={connectionForm.port}
                    onChange={handleInputChange}
                    className="form-input"
                    placeholder="8332"
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">
                    <Key className="label-icon" />
                    Username
                  </label>
                  <input
                    type="text"
                    name="username"
                    value={connectionForm.username}
                    onChange={handleInputChange}
                    className="form-input"
                    placeholder="RPC username"
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">
                    <Shield className="label-icon" />
                    Password
                  </label>
                  <div className="password-input-wrapper">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      name="password"
                      value={connectionForm.password}
                      onChange={handleInputChange}
                      className="form-input password-input"
                      placeholder="RPC password"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="password-toggle"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                <div className="form-group ssl-toggle">
                  <label className="ssl-label">
                    <span className="flex items-center gap-2">
                      <Shield className="w-4 h-4 text-primary" />
                      Use SSL Connection
                    </span>
                    <div className="ssl-switch">
                      <input
                        type="checkbox"
                        name="useSSL"
                        checked={connectionForm.useSSL}
                        onChange={handleInputChange}
                        className="ssl-checkbox"
                      />
                      <span className="ssl-slider"></span>
                    </div>
                  </label>
                </div>
              </div>

              <div className="action-buttons">
                <button
                  onClick={testConnection}
                  disabled={isLoading || !connectionForm.username || !connectionForm.password}
                  className="test-button"
                >
                  {isLoading ? (
                    <Activity className="w-4 h-4 animate-spin" />
                  ) : (
                    <Wifi className="w-4 h-4" />
                  )}
                  {isLoading ? 'Connecting...' : 'Test Connection'}
                </button>
                
                {connectionStatus === 'connected' && (
                  <button
                    onClick={disconnect}
                    className="disconnect-button"
                  >
                    <WifiOff className="w-4 h-4" />
                    Disconnect
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Node Information */}
          <div className="node-info-card">
            <div className="card-content">
              <h2 className="card-title">
                <Monitor className="card-icon" />
                Node Information
              </h2>
              
              {nodeInfo ? (
                <div className="node-stats">
                  <div className="stat-item">
                    <div className="stat-label">
                      <Cpu className="stat-icon" />
                      Version
                    </div>
                    <div className="stat-value">{nodeInfo.version}</div>
                  </div>
                  
                  <div className="stat-item">
                    <div className="stat-label">
                      <Database className="stat-icon" />
                      Block Count
                    </div>
                    <div className="stat-value">{nodeInfo.blockCount.toLocaleString()}</div>
                  </div>
                  
                  <div className="stat-item">
                    <div className="stat-label">
                      <Network className="stat-icon" />
                      Connections
                    </div>
                    <div className="stat-value">{nodeInfo.connections}</div>
                  </div>
                  
                  <div className="stat-item">
                    <div className="stat-label">
                      <Activity className="stat-icon" />
                      Difficulty
                    </div>
                    <div className="stat-value">{nodeInfo.difficulty}</div>
                  </div>
                  
                  <div className="stat-item">
                    <div className="stat-label">
                      <Zap className="stat-icon" />
                      Hash Rate
                    </div>
                    <div className="stat-value">{nodeInfo.hashrate}</div>
                  </div>
                  
                  <div className="stat-item">
                    <div className="stat-label">
                      <HardDrive className="stat-icon" />
                      Mempool
                    </div>
                    <div className="stat-value">{nodeInfo.mempool.toLocaleString()}</div>
                  </div>
                </div>
              ) : (
                <div className="flex items-center justify-center h-48 text-gray-500">
                  <div className="text-center">
                    <Server className="w-12 h-12 mx-auto mb-4 opacity-30" />
                    <p>Connect to view node information</p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Connection Logs */}
          <div className="logs-card">
            <div className="card-content">
              <h2 className="card-title">
                <Clock className="card-icon" />
                Connection Logs
              </h2>
              
              <div className="logs-container">
                {logs.map((log, index) => (
                  <div key={index} className={`log-entry ${log.type}`}>
                    <span className="log-time">{log.time}</span>
                    <span className="log-message">{log.message}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="actions-card">
            <div className="card-content">
              <h2 className="card-title">
                <PlayCircle className="card-icon" />
                Quick Actions
              </h2>
              
              <div className="quick-actions">
                <button
                  onClick={restartNode}
                  disabled={connectionStatus !== 'connected'}
                  className="action-btn"
                >
                  <RotateCcw className="w-4 h-4" />
                  Restart Node
                </button>
                
                <button
                  onClick={syncStatus}
                  disabled={connectionStatus !== 'connected'}
                  className="action-btn"
                >
                  <Activity className="w-4 h-4" />
                  Sync Status
                </button>
                
                <button
                  disabled={connectionStatus !== 'connected'}
                  className="action-btn"
                >
                  <Database className="w-4 h-4" />
                  Backup Wallet
                </button>
                
                <button
                  disabled={connectionStatus !== 'connected'}
                  className="action-btn"
                >
                  <Monitor className="w-4 h-4" />
                  Node Stats
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
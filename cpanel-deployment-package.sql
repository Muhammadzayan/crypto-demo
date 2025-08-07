-- Crypto Project Database Setup for cPanel
-- Run this in phpMyAdmin

-- Create settings table
CREATE TABLE IF NOT EXISTS settings (
    id INT AUTO_INCREMENT PRIMARY KEY,
    `key` VARCHAR(255) NOT NULL UNIQUE,
    value TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Create users table
CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(255) UNIQUE NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    first_name VARCHAR(255),
    last_name VARCHAR(255),
    avatar VARCHAR(255),
    phone VARCHAR(20),
    country VARCHAR(100),
    city VARCHAR(100),
    address TEXT,
    is_active BOOLEAN DEFAULT TRUE,
    is_admin BOOLEAN DEFAULT FALSE,
    email_verified BOOLEAN DEFAULT FALSE,
    two_factor_enabled BOOLEAN DEFAULT FALSE,
    two_factor_secret VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Create categories table
CREATE TABLE IF NOT EXISTS categories (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    slug VARCHAR(255) UNIQUE NOT NULL,
    description TEXT,
    status BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Create blogs table
CREATE TABLE IF NOT EXISTS blogs (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    slug VARCHAR(255) UNIQUE NOT NULL,
    description TEXT,
    content LONGTEXT,
    status ENUM('draft', 'published', 'archived') DEFAULT 'draft',
    image VARCHAR(255),
    author VARCHAR(255),
    category_id INT,
    time_read INT DEFAULT 0,
    tags TEXT,
    views INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE SET NULL
);

-- Create staking_plans table
CREATE TABLE IF NOT EXISTS staking_plans (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    duration_months INT NOT NULL,
    apy DECIMAL(5,2) NOT NULL,
    min_stake DECIMAL(18,8) NOT NULL,
    max_stake DECIMAL(18,8),
    description TEXT,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Create user_stakes table
CREATE TABLE IF NOT EXISTS user_stakes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    plan_id INT NOT NULL,
    amount DECIMAL(18,8) NOT NULL,
    apy DECIMAL(5,2) NOT NULL,
    start_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    end_date TIMESTAMP NOT NULL,
    earned_amount DECIMAL(18,8) DEFAULT 0,
    status ENUM('active', 'completed', 'cancelled') DEFAULT 'active',
    transaction_hash VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (plan_id) REFERENCES staking_plans(id) ON DELETE CASCADE
);

-- Create staking_rewards table
CREATE TABLE IF NOT EXISTS staking_rewards (
    id INT AUTO_INCREMENT PRIMARY KEY,
    stake_id INT NOT NULL,
    user_id INT NOT NULL,
    amount DECIMAL(18,8) NOT NULL,
    reward_date DATE NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (stake_id) REFERENCES user_stakes(id) ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    UNIQUE KEY unique_daily_reward (stake_id, reward_date)
);

-- Insert default categories
INSERT IGNORE INTO categories (name, slug, description) VALUES
('Cryptocurrency', 'cryptocurrency', 'Latest news and updates about cryptocurrencies'),
('Blockchain', 'blockchain', 'Blockchain technology and developments'),
('Trading', 'trading', 'Trading strategies and market analysis'),
('Technology', 'technology', 'Tech news and innovations'),
('Investment', 'investment', 'Investment guides and tips');

-- Insert default staking plans
INSERT IGNORE INTO staking_plans (name, duration_months, apy, min_stake, max_stake, description) VALUES
('3 Months', 3, 8.0, 100.0, 10000.0, 'Short-term staking with moderate returns'),
('6 Months', 6, 12.0, 500.0, 50000.0, 'Recommended plan with balanced risk and reward'),
('12 Months', 12, 18.0, 1000.0, 100000.0, 'Maximum returns for long-term commitment');

-- Insert default settings
INSERT IGNORE INTO settings (`key`, value) VALUES
('site_name', '"Aincore Platform"'),
('site_description', '"Your trusted cryptocurrency platform"'),
('site_url', '"https://yourdomain.com"'),
('admin_email', '"admin@yourdomain.com"'),
('timezone', '"UTC"'),
('language', '"en"'),
('maintenance_mode', 'false'),
('meta_title', '"Crypto Platform - Your Trusted Cryptocurrency Exchange"'),
('meta_description', '"Trade, invest, and manage your cryptocurrency portfolio..."'),
('meta_keywords', '"cryptocurrency, bitcoin, ethereum, trading, blockchain"'),
('google_analytics', '""'),
('facebook_pixel', '""'),
('twitter_card', '"summary_large_image"'),
('smtp_host', '""'),
('smtp_port', '"587"'),
('smtp_username', '""'),
('smtp_password', '""'),
('smtp_encryption', '"tls"'),
('from_email', '"noreply@yourdomain.com"'),
('from_name', '"Crypto Platform"'),
('social_facebook', '""'),
('social_twitter', '""'),
('social_instagram', '""'),
('social_linkedin', '""'),
('social_youtube', '""'),
('social_telegram', '""'),
('social_discord', '""');

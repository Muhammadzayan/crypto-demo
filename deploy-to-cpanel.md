# 🚀 cPanel Deployment Guide for Crypto Project

## 📋 **Prerequisites**
- cPanel hosting account with Node.js support
- MySQL database access
- File Manager or FTP access

## 🔧 **Step 1: Database Setup in cPanel**

### 1.1 Create MySQL Database
1. Login to cPanel
2. Go to **MySQL Databases**
3. Create a new database: `yourdomain_crypto`
4. Create a database user: `yourdomain_crypto_user`
5. Add user to database with **ALL PRIVILEGES**

### 1.2 Import Database Schema
Run this SQL in phpMyAdmin:

```sql
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

-- Insert default data
INSERT IGNORE INTO categories (name, slug, description) VALUES
('Cryptocurrency', 'cryptocurrency', 'Latest news and updates about cryptocurrencies'),
('Blockchain', 'blockchain', 'Blockchain technology and developments'),
('Trading', 'trading', 'Trading strategies and market analysis'),
('Technology', 'technology', 'Tech news and innovations'),
('Investment', 'investment', 'Investment guides and tips');

INSERT IGNORE INTO staking_plans (name, duration_months, apy, min_stake, max_stake, description) VALUES
('3 Months', 3, 8.0, 100.0, 10000.0, 'Short-term staking with moderate returns'),
('6 Months', 6, 12.0, 500.0, 50000.0, 'Recommended plan with balanced risk and reward'),
('12 Months', 12, 18.0, 1000.0, 100000.0, 'Maximum returns for long-term commitment');

INSERT IGNORE INTO settings (`key`, value) VALUES
('site_name', '"Aincore Platform"'),
('site_description', '"Your trusted cryptocurrency platform"'),
('site_url', '"https://yourdomain.com"'),
('admin_email', '"admin@yourdomain.com"'),
('timezone', '"UTC"'),
('language', '"en"'),
('maintenance_mode', 'false');
```

## 📁 **Step 2: File Upload to cPanel**

### 2.1 Upload Project Files
1. Go to **File Manager** in cPanel
2. Navigate to `public_html` folder
3. Upload all project files (except `node_modules`)

### 2.2 Create Production Environment File
Create `.env.local` in the root directory with:

```env
# Database Configuration
DB_HOST=localhost
DB_USER=your_cpanel_db_user
DB_PASSWORD=your_cpanel_db_password
DB_NAME=your_cpanel_db_name

# Application Configuration
NODE_ENV=production
PORT=3000

# JWT Secret
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production

# API Keys
COINGECKO_API_KEY=
NEWS_API_KEY=

# SMTP Configuration
SMTP_HOST=
SMTP_PORT=587
SMTP_USER=
SMTP_PASS=

# Payment Gateway
MIDTRANS_SERVER_KEY=
MIDTRANS_CLIENT_KEY=
MIDTRANS_MERCHANT_ID=

# File Upload
MAX_FILE_SIZE=5242880
UPLOAD_PATH=./public/uploads
```

## ⚙️ **Step 3: Server Configuration**

### 3.1 Install Dependencies
In cPanel Terminal or SSH:
```bash
cd public_html
npm install --production
```

### 3.2 Create Test User
Create a file called `create-user.js`:

```javascript
const bcrypt = require('bcryptjs');
const mysql = require('mysql2/promise');

async function createTestUser() {
  const pool = mysql.createPool({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
  });

  try {
    const hashedPassword = await bcrypt.hash('123456', 10);
    
    const [result] = await pool.execute(
      `INSERT INTO users (username, email, password, first_name, last_name, is_active, is_admin, email_verified) 
       VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      ['admin', 'admin@yourdomain.com', hashedPassword, 'Admin', 'User', true, true, true]
    );

    console.log('✅ Admin user created successfully!');
    console.log('📧 Email: admin@yourdomain.com');
    console.log('🔑 Password: 123456');
    
    await pool.end();
  } catch (error) {
    console.error('❌ Error creating user:', error.message);
    await pool.end();
  }
}

createTestUser();
```

Run: `node create-user.js`

### 3.3 Start the Application
```bash
npm start
```

## 🌐 **Step 4: Domain Configuration**

### 4.1 Set up Domain
1. Point your domain to the hosting
2. Configure SSL certificate
3. Set up subdomain if needed (e.g., `app.yourdomain.com`)

### 4.2 Create .htaccess (if needed)
Create `.htaccess` in public_html:

```apache
RewriteEngine On
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteRule ^(.*)$ /index.html [L]
```

## 🔒 **Step 5: Security Checklist**

- [ ] Change default JWT secret
- [ ] Update database credentials
- [ ] Configure SSL certificate
- [ ] Set up backup system
- [ ] Configure firewall rules
- [ ] Update admin email addresses
- [ ] Test all functionality

## 📞 **Support**

If you encounter issues:
1. Check cPanel error logs
2. Verify database connection
3. Ensure all environment variables are set
4. Test API endpoints individually

## 🎯 **Final Steps**

1. **Test the application**: Visit your domain
2. **Login with**: admin@yourdomain.com / 123456
3. **Configure additional settings** in the admin panel
4. **Set up monitoring** and backups

Your crypto platform is now live! 🚀

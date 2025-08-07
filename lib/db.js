// lib/db.js
import mysql from 'mysql2/promise';

const pool = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'diamapwh_aincore',
  password: process.env.DB_PASSWORD || '5bzmF^OTYq?z',
  database: process.env.DB_NAME || 'diamapwh_aincore',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

export const settingsOperations = {
  async getAllSettings() {
    const [rows] = await pool.execute('SELECT * FROM settings ORDER BY `key` ASC');
    return rows;
  },

  async getSettingsObject() {
    const [rows] = await pool.execute('SELECT `key`, `value` FROM settings');
    const settings = {};
    rows.forEach(row => {
      try {
        settings[row.key] = JSON.parse(row.value);
      } catch {
        settings[row.key] = row.value;
      }
    });
    return settings;
  },

  async getSettingByKey(key) {
    const [rows] = await pool.execute('SELECT * FROM settings WHERE `key` = ?', [key]);
    if (rows.length > 0) {
      try {
        return JSON.parse(rows[0].value);
      } catch {
        return rows[0].value;
      }
    }
    return null;
  },

  async upsertSetting(key, value) {
    const stringValue = typeof value === 'object' ? JSON.stringify(value) : String(value);
    const [existing] = await pool.execute('SELECT id FROM settings WHERE `key` = ?', [key]);

    if (existing.length > 0) {
      const [result] = await pool.execute(
        `UPDATE settings SET value = ?, updated_at = NOW() WHERE \`key\` = ?`,
        [stringValue, key]
      );
      return result.affectedRows > 0;
    } else {
      const [result] = await pool.execute(
        `INSERT INTO settings (\`key\`, value, created_at, updated_at) VALUES (?, ?, NOW(), NOW())`,
        [key, stringValue]
      );
      return result.insertId;
    }
  },

  async updateMultipleSettings(settingsData) {
    const results = [];
    for (const [key, value] of Object.entries(settingsData)) {
      const result = await this.upsertSetting(key, value);
      results.push({ key, success: !!result });
    }
    return results;
  },

  async deleteSetting(key) {
    const [result] = await pool.execute('DELETE FROM settings WHERE `key` = ?', [key]);
    return result.affectedRows > 0;
  },

  async initializeDefaultSettings() {
    const defaultSettings = {
      site_name: 'Aincore Platform',
      site_description: 'Your trusted cryptocurrency platform',
      site_url: 'https://cryptoplatform.com',
      admin_email: 'admin@cryptoplatform.com',
      timezone: 'UTC',
      language: 'en',
      maintenance_mode: false,
      meta_title: 'Crypto Platform - Your Trusted Cryptocurrency Exchange',
      meta_description: 'Trade, invest, and manage your cryptocurrency portfolio...',
      meta_keywords: 'cryptocurrency, bitcoin, ethereum, trading, blockchain',
      google_analytics: '',
      facebook_pixel: '',
      twitter_card: 'summary_large_image',
      smtp_host: '',
      smtp_port: '587',
      smtp_username: '',
      smtp_password: '',
      smtp_encryption: 'tls',
      from_email: 'noreply@cryptoplatform.com',
      from_name: 'Crypto Platform',
      social_facebook: '',
      social_twitter: '',
      social_instagram: '',
      social_linkedin: '',
      social_youtube: '',
      social_telegram: '',
      social_discord: ''
    };

    const results = [];
    for (const [key, value] of Object.entries(defaultSettings)) {
      const existing = await this.getSettingByKey(key);
      if (existing === null) {
        const result = await this.upsertSetting(key, value);
        results.push({ key, inserted: !!result });
      }
    }
    return results;
  }
};

export default pool;

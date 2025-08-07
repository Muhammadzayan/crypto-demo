const bcrypt = require('bcryptjs');
const mysql = require('mysql2/promise');

async function createAdminUser() {
  const pool = mysql.createPool({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
  });

  try {
    // Hash the password
    const hashedPassword = await bcrypt.hash('123456', 10);
    
    // Create admin user
    const [result] = await pool.execute(
      `INSERT INTO users (username, email, password, first_name, last_name, is_active, is_admin, email_verified) 
       VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      ['admin', 'admin@yourdomain.com', hashedPassword, 'Admin', 'User', true, true, true]
    );

    console.log('✅ Admin user created successfully!');
    console.log('📧 Email: admin@yourdomain.com');
    console.log('🔑 Password: 123456');
    console.log('👤 User ID:', result.insertId);
    
    // Create a regular user as well
    const [result2] = await pool.execute(
      `INSERT INTO users (username, email, password, first_name, last_name, is_active, is_admin, email_verified) 
       VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      ['user', 'user@yourdomain.com', hashedPassword, 'Test', 'User', true, false, true]
    );

    console.log('✅ Regular user created successfully!');
    console.log('📧 Email: user@yourdomain.com');
    console.log('🔑 Password: 123456');
    console.log('👤 User ID:', result2.insertId);

    await pool.end();
  } catch (error) {
    console.error('❌ Error creating users:', error.message);
    await pool.end();
  }
}

createAdminUser();

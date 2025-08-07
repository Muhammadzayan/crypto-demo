# 🚀 cPanel Deployment Checklist

## ✅ **Pre-Deployment**
- [ ] Build the project: `npm run build`
- [ ] Test locally: `npm start`
- [ ] Verify all features work
- [ ] Check database connection

## 📁 **File Upload**
- [ ] Upload all project files to `public_html`
- [ ] Exclude `node_modules` folder
- [ ] Upload deployment files:
  - `cpanel-deployment-package.sql`
  - `create-admin-user.js`
  - `env-production-template.txt`
  - `deploy-to-cpanel.md`

## 🗄️ **Database Setup**
- [ ] Create MySQL database in cPanel
- [ ] Create database user with full privileges
- [ ] Import `cpanel-deployment-package.sql` in phpMyAdmin
- [ ] Verify all tables are created

## ⚙️ **Environment Configuration**
- [ ] Create `.env.local` file in root directory
- [ ] Update database credentials
- [ ] Set `NODE_ENV=production`
- [ ] Change JWT secret
- [ ] Configure API keys

## 🔧 **Server Setup**
- [ ] Install dependencies: `npm install --production`
- [ ] Create admin user: `node create-admin-user.js`
- [ ] Start application: `npm start`
- [ ] Test application access

## 🌐 **Domain Configuration**
- [ ] Point domain to hosting
- [ ] Configure SSL certificate
- [ ] Set up subdomain if needed
- [ ] Test domain access

## 🔒 **Security**
- [ ] Change default passwords
- [ ] Update admin email addresses
- [ ] Configure firewall rules
- [ ] Set up backup system
- [ ] Test login functionality

## 📊 **Testing**
- [ ] Test homepage loading
- [ ] Test user registration/login
- [ ] Test admin panel access
- [ ] Test blog functionality
- [ ] Test staking features
- [ ] Test file uploads

## 📞 **Support Files**
- [ ] Keep deployment guide handy
- [ ] Document any custom configurations
- [ ] Note admin credentials
- [ ] Save database backup

## 🎯 **Final Steps**
- [ ] Update site settings in admin panel
- [ ] Configure payment gateways
- [ ] Set up email notifications
- [ ] Test all user flows
- [ ] Monitor application logs

---

## 📋 **Quick Commands for cPanel**

```bash
# Install dependencies
npm install --production

# Create admin user
node create-admin-user.js

# Start application
npm start

# Check logs
tail -f error_log
```

## 🔑 **Default Admin Credentials**
- **Email:** admin@yourdomain.com
- **Password:** 123456

## 📞 **Troubleshooting**
1. Check cPanel error logs
2. Verify database connection
3. Ensure all environment variables are set
4. Test API endpoints individually
5. Check file permissions

---

**Your crypto platform is now ready for production! 🚀**

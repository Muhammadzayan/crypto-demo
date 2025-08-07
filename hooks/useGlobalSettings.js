import { useSettings } from '../contexts/SettingsContext';

export const useGlobalSettings = () => {
  const { settings, getSetting, updateSetting, loading, error } = useSettings();

  // Helper functions for common settings
  const getGeneralSettings = () => ({
    siteName: getSetting('site_name', 'Aincore'),
    siteDescription: getSetting('site_description', 'Your trusted cryptocurrency platform'),
    siteUrl: getSetting('site_url', 'https://cryptoplatform.com'),
    adminEmail: getSetting('admin_email', 'admin@cryptoplatform.com'),
    timezone: getSetting('timezone', 'UTC'),
    language: getSetting('language', 'en'),
    maintenanceMode: getSetting('maintenance_mode', false)
  });

  const getSeoSettings = () => ({
    metaTitle: getSetting('meta_title', 'Aincore - Your Trusted Cryptocurrency Exchange'),
    metaDescription: getSetting('meta_description', 'Trade, invest, and manage your cryptocurrency portfolio with our secure and user-friendly platform.'),
    metaKeywords: getSetting('meta_keywords', 'cryptocurrency, bitcoin, ethereum, trading, blockchain'),
    googleAnalytics: getSetting('google_analytics', ''),
    facebookPixel: getSetting('facebook_pixel', ''),
    twitterCard: getSetting('twitter_card', 'summary_large_image')
  });

  const getEmailSettings = () => ({
    smtpHost: getSetting('smtp_host', ''),
    smtpPort: getSetting('smtp_port', '587'),
    smtpUsername: getSetting('smtp_username', ''),
    smtpPassword: getSetting('smtp_password', ''),
    smtpEncryption: getSetting('smtp_encryption', 'tls'),
    fromEmail: getSetting('from_email', 'noreply@cryptoplatform.com'),
    fromName: getSetting('from_name', 'Aincore')
  });

  const getSocialSettings = () => ({
    facebook: getSetting('social_facebook', ''),
    twitter: getSetting('social_twitter', ''),
    instagram: getSetting('social_instagram', ''),
    linkedin: getSetting('social_linkedin', ''),
    youtube: getSetting('social_youtube', ''),
    telegram: getSetting('social_telegram', ''),
    discord: getSetting('social_discord', '')
  });

  return {
    // Raw settings access
    settings,
    getSetting,
    updateSetting,
    loading,
    error,
    
    // Grouped settings helpers
    getGeneralSettings,
    getSeoSettings,
    getEmailSettings,
    getSocialSettings,
    
    // Quick access to common settings
    siteName: getSetting('site_name', 'Aincore'),
    siteDescription: getSetting('site_description', 'Your trusted cryptocurrency platform'),
    adminEmail: getSetting('admin_email', 'admin@cryptoplatform.com'),
    maintenanceMode: getSetting('maintenance_mode', false)
  };
};

export default useGlobalSettings;

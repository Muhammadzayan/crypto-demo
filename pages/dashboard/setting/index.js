import React, { useState, useEffect } from 'react';
import DashboardLayout from '../layout';
import { toast } from 'react-toastify';

const SiteSettings = () => {
    const [activeTab, setActiveTab] = useState('general');
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');
    const [settings, setSettings] = useState(null);

    const [generalSettings, setGeneralSettings] = useState({});
    const [seoSettings, setSeoSettings] = useState({});
    const [emailSettings, setEmailSettings] = useState({});
    const [socialSettings, setSocialSettings] = useState({});

    useEffect(() => {
        const fetchSettings = async () => {
            try {
                const res = await fetch('/api/admin/settings');
                const data = await res.json();

                if (data.success && Array.isArray(data.data)) {
                    const settingsObj = Object.fromEntries(data.data.map(item => [item.key, item.value]));
                    console.log('Settings (as object):', settingsObj);
                    setSettings(settingsObj);

                    // ✅ Set dynamic state groups
                    setGeneralSettings({
                        siteName: settingsObj.siteName || '',
                        siteDescription: settingsObj.siteDescription || '',
                        siteUrl: settingsObj.siteUrl || '',
                        adminEmail: settingsObj.adminEmail || '',
                        timezone: settingsObj.timezone || '',
                        language: settingsObj.language || '',
                        maintenanceMode: settingsObj.maintenanceMode === 'true',
                        logo: settingsObj.logo
                            ? (settingsObj.logo.startsWith('http')
                                ? settingsObj.logo
                                : settingsObj.logo.startsWith('uploads')
                                    ? settingsObj.logo
                                    : `${settingsObj.logo.replace(/^\/+/, '')}`
                            )
                            : ''
                    });

                    setSeoSettings({
                        metaTitle: settingsObj.metaTitle || '',
                        metaDescription: settingsObj.metaDescription || '',
                        metaKeywords: settingsObj.metaKeywords || '',
                        googleAnalytics: settingsObj.googleAnalytics || '',
                        facebookPixel: settingsObj.facebookPixel || '',
                        twitterCard: settingsObj.twitterCard || 'summary_large_image'
                    });

                    setEmailSettings({
                        smtpHost: settingsObj.smtpHost || '',
                        smtpPort: settingsObj.smtpPort || '587',
                        smtpUsername: settingsObj.smtpUsername || '',
                        smtpPassword: settingsObj.smtpPassword || '',
                        smtpEncryption: settingsObj.smtpEncryption || 'tls',
                        fromEmail: settingsObj.fromEmail || '',
                        fromName: settingsObj.fromName || ''
                    });

                    setSocialSettings({
                        facebook: settingsObj.facebook || '',
                        twitter: settingsObj.twitter || '',
                        instagram: settingsObj.instagram || '',
                        linkedin: settingsObj.linkedin || '',
                        youtube: settingsObj.youtube || '',
                        telegram: settingsObj.telegram || '',
                        discord: settingsObj.discord || ''
                    });
                }
            } catch (err) {
                console.error('Failed to load settings', err);
            }
        };

        fetchSettings();
    }, []);

    const handleGeneralChange = (e) => {
        const { name, value, files } = e.target;

        if (name === 'logo' && files && files[0]) {
            const file = files[0];
            setGeneralSettings(prev => ({
                ...prev,
                logo: file, // store File object
            }));
        } else {
            setGeneralSettings(prev => ({
                ...prev,
                [name]: value,
            }));
        }
    };

    const handleSeoChange = (e) => {
        const { name, value } = e.target;
        setSeoSettings(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleEmailChange = (e) => {
        const { name, value } = e.target;
        setEmailSettings(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSocialChange = (e) => {
        const { name, value } = e.target;
        setSocialSettings(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSave = async (settingsType) => {
        setLoading(true);
        setMessage('');

        let payload = {};
        let logoFile = null;

        switch (settingsType) {
            case 'General':
                payload = { ...generalSettings };
                if (payload.logo instanceof File) {
                    logoFile = payload.logo;
                    delete payload.logo; // remove logo from main payload
                }
                break;
            case 'SEO':
                payload = seoSettings;
                break;
            case 'Email':
                payload = emailSettings;
                break;
            case 'Social':
                payload = socialSettings;
                break;
            default:
                setMessage('Invalid settings type');
                setLoading(false);
                return;
        }

        try {
            // Step 1: Upload logo if it exists
            if (logoFile) {
                const formData = new FormData();
                formData.append('file', logoFile);

                const uploadRes = await fetch('/api/upload', {
                    method: 'POST',
                    body: formData,
                });

                const uploadResult = await uploadRes.json();
                if (uploadResult.success && uploadResult.url) {
                    payload.logo = uploadResult.url;
                } else {
                    throw new Error(uploadResult.message || 'Logo upload failed');
                }
            }

            // Step 2: Save settings
            const res = await fetch('/api/admin/settings', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ settings: payload }),
            });

            const result = await res.json();

            if (result.success) {
                toast.success(`${settingsType} settings saved successfully!`);
            } else {
                throw new Error(result.message || 'Failed to save settings');
            }
        } catch (error) {
            console.error(error);
            toast.error('Error saving settings. Please try again.');
        } finally {
            setTimeout(() => setMessage(''), 3000);
            setLoading(false);
        }
    };

    const tabs = [
        { id: 'general', name: 'General Settings', icon: 'settings' },
        { id: 'seo', name: 'SEO Settings', icon: 'search' },
        { id: 'email', name: 'Email Settings', icon: 'email' },
        { id: 'social', name: 'Social Media', icon: 'share' }
    ];

    const getTabIcon = (iconName) => {
        const icons = {
            settings: (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M19.14,12.94c0.04-0.3,0.06-0.61,0.06-0.94c0-0.32-0.02-0.64-0.07-0.94l2.03-1.58c0.18-0.14,0.23-0.41,0.12-0.61 l-1.92-3.32c-0.12-0.22-0.37-0.29-0.59-0.22l-2.39,0.96c-0.5-0.38-1.03-0.7-1.62-0.94L14.4,2.81c-0.04-0.24-0.24-0.41-0.48-0.41 h-3.84c-0.24,0-0.43,0.17-0.47,0.41L9.25,5.35C8.66,5.59,8.12,5.92,7.63,6.29L5.24,5.33c-0.22-0.08-0.47,0-0.59,0.22L2.74,8.87 C2.62,9.08,2.66,9.34,2.86,9.48l2.03,1.58C4.84,11.36,4.8,11.69,4.8,12s0.02,0.64,0.07,0.94l-2.03,1.58 c-0.18,0.14-0.23,0.41-0.12,0.61l1.92,3.32c0.12,0.22,0.37,0.29,0.59,0.22l2.39-0.96c0.5,0.38,1.03,0.7,1.62,0.94l0.36,2.54 c0.05,0.24,0.24,0.41,0.48,0.41h3.84c0.24,0,0.44-0.17,0.47-0.41l0.36-2.54c0.59-0.24,1.13-0.56,1.62-0.94l2.39,0.96 c0.22,0.08,0.47,0,0.59-0.22l1.92-3.32c0.12-0.22,0.07-0.47-0.12-0.61L19.14,12.94z M12,15.6c-1.98,0-3.6-1.62-3.6-3.6 s1.62-3.6,3.6-3.6s3.6,1.62,3.6,3.6S13.98,15.6,12,15.6z"/>
                </svg>
            ),
            search: (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
                </svg>
            ),
            email: (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
                </svg>
            ),
            share: (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7.05-4.11c.54.5 1.25.81 2.04.81 1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3c0 .24.04.47.09.7L8.04 9.81C7.5 9.31 6.79 9 6 9c-1.66 0-3 1.34-3 3s1.34 3 3 3c.79 0 1.5-.31 2.04-.81l7.12 4.16c-.05.21-.08.43-.08.65 0 1.61 1.31 2.92 2.92 2.92 1.61 0 2.92-1.31 2.92-2.92s-1.31-2.92-2.92-2.92z"/>
                </svg>
            )
        };
        return icons[iconName];
    };

    return (
        <DashboardLayout>
            <div className="category-container">
                <div className="category-header">
                    <h1>Site Settings</h1>
                    <p>Configure your website settings and preferences</p>
                </div>

                {message && (
                    <div className={`message ${message.includes('Error') ? 'error' : 'success'}`}>
                        {message}
                    </div>
                )}

                <div className="settings-content">
                    {/* Tab Navigation */}
                    <div className="settings-tabs tab-navigation">
                        {tabs.map((tab) => (
                            <button
                                key={tab.id}
                                className={`tab-btn ${activeTab === tab.id ? 'active' : ''}`}
                                onClick={() => setActiveTab(tab.id)}
                            >
                                {getTabIcon(tab.icon)}
                                <span> {tab.name}</span>
                            </button>
                        ))}
                    </div>

                    {/* Tab Content */}
                    <div className="settings-panel tab-content p-4">
                       {/* General Settings */}
                        {activeTab === 'general' && (
                            <div className="settings-section">
                                <div className="settings-form">
                                    <div className="form-grid">
                                        <div className="form-group">
                                            <label>Site Name</label>
                                            <input
                                                type="text"
                                                name="siteName"
                                                value={generalSettings.siteName}
                                                onChange={handleGeneralChange}
                                                className="form-input"
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label>Site URL</label>
                                            <input
                                                type="url"
                                                name="siteUrl"
                                                value={generalSettings.siteUrl}
                                                onChange={handleGeneralChange}
                                                className="form-input"
                                            />
                                        </div>
                                    </div>

                                    <div className="form-group">
                                        <label>Site Description</label>
                                        <textarea
                                            name="siteDescription"
                                            value={generalSettings.siteDescription}
                                            onChange={handleGeneralChange}
                                            className="form-textarea"
                                            rows="3"
                                        />
                                    </div>

                                    <div className="form-grid">
                                        <div className="form-group">
                                            <label>Admin Email</label>
                                            <input
                                                type="email"
                                                name="adminEmail"
                                                value={generalSettings.adminEmail}
                                                onChange={handleGeneralChange}
                                                className="form-input"
                                            />
                                        </div>

                                        <div className="form-group">
                                            <label>Site Logo</label>
                                            <input
                                                type="file"
                                                name="logo"
                                                accept=".png, .jpg, .jpeg"
                                                onChange={handleGeneralChange}
                                                className="form-input"
                                            />

                                            {/* Show preview (for newly uploaded file) */}
                                            {generalSettings.logo && typeof generalSettings.logo !== 'string' && (
                                                <img
                                                    src={URL.createObjectURL(generalSettings.logo)}
                                                    alt="Logo Preview"
                                                    style={{ marginTop: '10px', maxWidth: '200px', maxHeight: '100px', border: '1px solid #ddd' }}
                                                />
                                            )}

                                            {/* Show preview (for previously saved logo URL) */}
                                            {typeof generalSettings.logo === 'string' && generalSettings.logo !== '' && (
                                                <img
                                                    src={
                                                        generalSettings.logo.startsWith('http')
                                                            ? generalSettings.logo
                                                            : generalSettings.logo.startsWith('uploads')
                                                                ? `/${generalSettings.logo}`
                                                                : `/${generalSettings.logo.replace(/^\/+/, '')}`
                                                    }
                                                    alt="Saved Logo"
                                                    style={{ marginTop: '10px', maxWidth: '200px', maxHeight: '100px', border: '1px solid #ddd' }}
                                                />
                                            )}
                                        </div>

                                    </div>

                                    <button
                                        className="save-btn mt-3"
                                        onClick={() => handleSave('General')}
                                        disabled={loading}
                                    >
                                        {loading ? 'Saving...' : 'Save General Settings'}
                                    </button>
                                </div>
                            </div>
                        )}

                        {/* SEO Settings */}
                        {activeTab === 'seo' && (
                            <div className="settings-section">
                                <div className="settings-form">
                                    <div className="form-group">
                                        <label>Meta Title</label>
                                        <input
                                            type="text"
                                            name="metaTitle"
                                            value={seoSettings.metaTitle}
                                            onChange={handleSeoChange}
                                            className="form-input"
                                            maxLength="60"
                                        />
                                        <small>Recommended: 50-60 characters</small>
                                    </div>

                                    <div className="form-group">
                                        <label>Meta Description</label>
                                        <textarea
                                            name="metaDescription"
                                            value={seoSettings.metaDescription}
                                            onChange={handleSeoChange}
                                            className="form-textarea"
                                            rows="3"
                                            maxLength="160"
                                        />
                                        <small>Recommended: 150-160 characters</small>
                                    </div>

                                    <div className="form-group">
                                        <label>Meta Keywords</label>
                                        <input
                                            type="text"
                                            name="metaKeywords"
                                            value={seoSettings.metaKeywords}
                                            onChange={handleSeoChange}
                                            className="form-input"
                                            placeholder="keyword1, keyword2, keyword3"
                                        />
                                    </div>

                                    <div className="form-grid">
                                        <div className="form-group">
                                            <label>Google Analytics ID</label>
                                            <input
                                                type="text"
                                                name="googleAnalytics"
                                                value={seoSettings.googleAnalytics}
                                                onChange={handleSeoChange}
                                                className="form-input"
                                                placeholder="GA-XXXXXXXXX-X"
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label>Facebook Pixel ID</label>
                                            <input
                                                type="text"
                                                name="facebookPixel"
                                                value={seoSettings.facebookPixel}
                                                onChange={handleSeoChange}
                                                className="form-input"
                                                placeholder="123456789012345"
                                            />
                                        </div>
                                    </div>

                                    <button
                                        className="save-btn mt-3"
                                        onClick={() => handleSave('SEO')}
                                        disabled={loading}
                                    >
                                        {loading ? 'Saving...' : 'Save SEO Settings'}
                                    </button>
                                </div>
                            </div>
                        )}

                        {/* Email Settings */}
                        {activeTab === 'email' && (
                            <div className="settings-section">
                                <div className="settings-form">
                                    <div className="form-grid">
                                        <div className="form-group">
                                            <label>SMTP Host</label>
                                            <input
                                                type="text"
                                                name="smtpHost"
                                                value={emailSettings.smtpHost}
                                                onChange={handleEmailChange}
                                                className="form-input"
                                                placeholder="smtp.gmail.com"
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label>SMTP Port</label>
                                            <input
                                                type="number"
                                                name="smtpPort"
                                                value={emailSettings.smtpPort}
                                                onChange={handleEmailChange}
                                                className="form-input"
                                            />
                                        </div>
                                    </div>

                                    <div className="form-grid">
                                        <div className="form-group">
                                            <label>SMTP Username</label>
                                            <input
                                                type="text"
                                                name="smtpUsername"
                                                value={emailSettings.smtpUsername}
                                                onChange={handleEmailChange}
                                                className="form-input"
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label>SMTP Password</label>
                                            <input
                                                type="password"
                                                name="smtpPassword"
                                                value={emailSettings.smtpPassword}
                                                onChange={handleEmailChange}
                                                className="form-input"
                                            />
                                        </div>
                                    </div>

                                    <div className="form-grid">
                                        <div className="form-group">
                                            <label>Encryption</label>
                                            <select
                                                name="smtpEncryption"
                                                value={emailSettings.smtpEncryption}
                                                onChange={handleEmailChange}
                                                className="form-input"
                                            >
                                                <option value="tls">TLS</option>
                                                <option value="ssl">SSL</option>
                                                <option value="none">None</option>
                                            </select>
                                        </div>
                                        <div className="form-group">
                                            <label>From Email</label>
                                            <input
                                                type="email"
                                                name="fromEmail"
                                                value={emailSettings.fromEmail}
                                                onChange={handleEmailChange}
                                                className="form-input"
                                            />
                                        </div>
                                    </div>

                                    <div className="form-group">
                                        <label>From Name</label>
                                        <input
                                            type="text"
                                            name="fromName"
                                            value={emailSettings.fromName}
                                            onChange={handleEmailChange}
                                            className="form-input"
                                        />
                                    </div>

                                    <button
                                        className="save-btn mt-3"
                                        onClick={() => handleSave('Email')}
                                        disabled={loading}
                                    >
                                        {loading ? 'Saving...' : 'Save Email Settings'}
                                    </button>
                                </div>
                            </div>
                        )}

                        {/* Social Media Settings */}
                        {activeTab === 'social' && (
                            <div className="settings-section">
                                <div className="settings-form">
                                    <div className="form-grid">
                                        <div className="form-group">
                                            <label>Facebook URL</label>
                                            <input
                                                type="url"
                                                name="facebook"
                                                value={socialSettings.facebook}
                                                onChange={handleSocialChange}
                                                className="form-input"
                                                placeholder="https://facebook.com/yourpage"
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label>Twitter URL</label>
                                            <input
                                                type="url"
                                                name="twitter"
                                                value={socialSettings.twitter}
                                                onChange={handleSocialChange}
                                                className="form-input"
                                                placeholder="https://twitter.com/youraccount"
                                            />
                                        </div>
                                    </div>

                                    <div className="form-grid">
                                        <div className="form-group">
                                            <label>Instagram URL</label>
                                            <input
                                                type="url"
                                                name="instagram"
                                                value={socialSettings.instagram}
                                                onChange={handleSocialChange}
                                                className="form-input"
                                                placeholder="https://instagram.com/youraccount"
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label>LinkedIn URL</label>
                                            <input
                                                type="url"
                                                name="linkedin"
                                                value={socialSettings.linkedin}
                                                onChange={handleSocialChange}
                                                className="form-input"
                                                placeholder="https://linkedin.com/company/yourcompany"
                                            />
                                        </div>
                                    </div>

                                    <div className="form-grid">
                                        <div className="form-group">
                                            <label>YouTube URL</label>
                                            <input
                                                type="url"
                                                name="youtube"
                                                value={socialSettings.youtube}
                                                onChange={handleSocialChange}
                                                className="form-input"
                                                placeholder="https://youtube.com/c/yourchannel"
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label>Telegram URL</label>
                                            <input
                                                type="url"
                                                name="telegram"
                                                value={socialSettings.telegram}
                                                onChange={handleSocialChange}
                                                className="form-input"
                                                placeholder="https://t.me/yourchannel"
                                            />
                                        </div>
                                    </div>

                                    <div className="form-group">
                                        <label>Discord URL</label>
                                        <input
                                            type="url"
                                            name="discord"
                                            value={socialSettings.discord}
                                            onChange={handleSocialChange}
                                            className="form-input"
                                            placeholder="https://discord.gg/yourserver"
                                        />
                                    </div>

                                    <button
                                        className="save-btn mt-3"
                                        onClick={() => handleSave('Social Media')}
                                        disabled={loading}
                                    >
                                        {loading ? 'Saving...' : 'Save Social Media Settings'}
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                    
                </div>
            </div>
        </DashboardLayout>
    );
};

export default SiteSettings;
import React, { useState, useEffect } from 'react';
import DashboardLayout from './layout';
import { useAuth } from '../../contexts/AuthContext';
import { toast } from 'react-toastify';
import { Eye, EyeOff } from 'lucide-react';
import { FiCamera } from 'react-icons/fi'; // ✅ Add this import

const Profile = () => {

    const { user, loading } = useAuth();
    if (loading) return <div>Loading...</div>;

    const [activeTab, setActiveTab] = useState('personal');
    const [avatarFile, setAvatarFile] = useState(null);
    const [avatarPreview, setAvatarPreview] = useState(null);
    const [showCurrent, setShowCurrent] = useState(false);
    const [showNew, setShowNew] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [preferences, setPreferences] = useState({
        email: user.notify_email || false,
        priceAlerts: user.notify_price || false,
        marketing: user.notify_marketing || false,
    });

    const handlePreferenceChange = (field) => {
    setPreferences((prev) => ({ ...prev, [field]: !prev[field] }));
    };

    const savePreferences = async () => {
    const res = await fetch('/api/user/preferences', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(preferences),
    });

    const data = await res.json();
    if (data.success) {
        toast.success('Preferences updated');
    } else {
        toast.error(data.message || 'Failed to save preferences');
    }
    };

    const handlePasswordChange = async (e) => {
    e.preventDefault();
    if (!currentPassword || !newPassword || !confirmPassword) return toast.error("All fields required");
    if (newPassword !== confirmPassword) return toast.error("Passwords do not match");

    const res = await fetch('/api/user/change-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ currentPassword, newPassword }),
    });

    const data = await res.json();
    if (data.success) {
        toast.success('Password updated!');
        setCurrentPassword('');
        setNewPassword('');
        setConfirmPassword('');
    } else {
        toast.error(data.message || 'Failed to update password');
    }
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setAvatarFile(file);
            setAvatarPreview(URL.createObjectURL(file)); // 👈 Preview image
        }
    };

    useEffect(() => {
        return () => {
            if (avatarPreview) {
            URL.revokeObjectURL(avatarPreview);
            }
        };
    }, [avatarPreview]);

    const handleAvatarUpload = async (e) => {
    e.preventDefault();
    if (!avatarFile) return;

    const formData = new FormData();
    formData.append('avatar', avatarFile);

    try {
        const res = await fetch('/api/user/update-avatar', {
        method: 'POST',
        body: formData,
        });

        const data = await res.json();
        if (data.success) {
        toast.success('Avatar updated!');
        // setUser(prev => ({ ...prev, avatar: data.avatar }));

        } else {
        toast.error(data.message || 'Failed to update avatar');
        }
    } catch (err) {
        console.error('Avatar Upload Error:', err);
        toast.error('Something went wrong!');
    }
    };

    const [formData, setFormData] = useState({
        firstName: user?.first_name ||'',
        lastName: user?.last_name ||'',
        email: user?.email || '',
        phone: user?.phone || '',
        country: user?.country || 'United States',
        city: user?.city || 'New York',
        bio: user?.bio || 'Crypto enthusiast and blockchain developer with 5+ years of experience.',
    }); 

    const handleInputChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const res = await fetch('/api/user/updateProfile', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });

            const data = await res.json();
            if (data.success) {
                toast.success('Profile updated successfully!');
            } else {
                toast.error(data.message || 'Failed to update profile');
            }
        } catch (error) {
            toast.error('Server error');
            console.error('Profile update error:', error);
        }
    };

    const getMembershipDuration = (createdAt) => {
        if (!createdAt) return '';

        const createdDate = new Date(createdAt);
        const now = new Date();

        const diffInMonths =
            (now.getFullYear() - createdDate.getFullYear()) * 12 +
            (now.getMonth() - createdDate.getMonth());

        const years = Math.floor(diffInMonths / 12);
        const months = diffInMonths % 12;

        if (years > 0 && months > 0) return `${years}.${months} years`;
        if (years > 0) return `${years} years`;
        if (months > 0) return `${months} months`;
        return 'Just joined';
    };


    return (
        <DashboardLayout>
            <div className="profile-content">
                {/* Profile Header */}
                <div className="profile-header">

                   <div className="profile-avatar" style={{ position: 'relative', width: 100, height: 100 }}>
                       {avatarPreview ? (
                            <img
                                src={avatarPreview}
                                alt="Preview Avatar"
                                className="avatar-image"
                                style={{ width: '100%', height: '100%', borderRadius: '50%', objectFit: 'cover' }}
                            />
                            ) : user.avatar ? (
                            <img
                                src={user.avatar.startsWith('http') ? user.avatar : `${user.avatar}`}
                                alt="User Avatar"
                                className="avatar-image"
                                style={{ width: '100%', height: '100%', borderRadius: '50%', objectFit: 'cover' }}
                            />
                            ) : (
                            <div
                                className="avatar-circle"
                                style={{
                                width: '100%',
                                height: '100%',
                                borderRadius: '50%',
                                backgroundColor: '#ccc',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                fontSize: 28,
                                fontWeight: 'bold',
                                color: '#fff',
                                }}

                                
                            >
                                {user.first_name?.charAt(0).toUpperCase()}
                                {user.last_name?.charAt(0).toUpperCase()}
                            </div>
                        )}

                        {/* Hidden input */}
                                <input
                                    id="avatarInput"
                                    type="file"
                                    accept="image/*"
                                    onChange={handleFileChange}
                                    style={{ display: 'none' }}
                                />

                                {/* Overlay */}
                                <label
                                    htmlFor="avatarInput"
                                    style={{
                                    position: 'absolute',
                                    bottom: 0,
                                    right: 0,
                                    backgroundColor: 'rgba(0,0,0,0.6)',
                                    color: '#fff',
                                    padding: '5px 9px',
                                    borderRadius: '50%',
                                    cursor: 'pointer',
                                    fontSize: 14,
                                    width: "30px",
                                    height: "30px",
                                    display: "flex",
                                    alignItems: "anchor-center",
                                    }}
                                    title="Change Avatar"
                                > <FiCamera />
                                </label>
                    </div>
                        {avatarFile && (
                            <button type="button" onClick={handleAvatarUpload} className="change-avatar-btn" style={{ marginTop: 10 }}>
                                Upload Photo
                            </button>
                        )}

                    <div className="profile-info">
                        <h1>{formData.firstName} {formData.lastName}</h1>
                        <p className="profile-email">{formData.email}</p>
                        <div className="profile-stats">
                            <div className="stat">
                                <span className="stat-value">5</span>
                                <span className="stat-label">Active Tokens</span>
                            </div>
                            <div className="stat">
                                <span className="stat-value">{getMembershipDuration(user.created_at)}</span>
                                <span className="stat-label">Member Since</span>
                            </div>
                            <div className="stat">
                                <span className="stat-value">$45,678</span>
                                <span className="stat-label">Investment</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Tab Navigation */}
                <div className="tab-navigation">
                    <button 
                        className={`tab-btn ${activeTab === 'personal' ? 'active' : ''}`}
                        onClick={() => setActiveTab('personal')}
                    >
                        Personal Information
                    </button>
                    <button 
                        className={`tab-btn ${activeTab === 'security' ? 'active' : ''}`}
                        onClick={() => setActiveTab('security')}
                    >
                        Security Settings
                    </button>
                    <button 
                        className={`tab-btn ${activeTab === 'preferences' ? 'active' : ''}`}
                        onClick={() => setActiveTab('preferences')}
                    >
                        Preferences
                    </button>
                </div>

                {/* Tab Content */}
                <div className="tab-content">
                    {activeTab === 'personal' && (
                        <div className="personal-info-tab">
                            <div className="form-section">
                                <h3>Basic Information</h3>
                                <form onSubmit={handleSubmit}>
                                    <div className="form-grid">
                                        <div className="form-group">
                                            <label>First Name</label>
                                            <input
                                                type="text"
                                                name="firstName"
                                                value={formData.firstName}
                                                onChange={handleInputChange}
                                                className="form-input"
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label>Last Name</label>
                                            <input
                                                type="text"
                                                name="lastName"
                                                value={formData.lastName}
                                                onChange={handleInputChange}
                                                className="form-input"
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label>Email Address</label>
                                            <input
                                                type="email"
                                                name="email"
                                                value={formData.email}
                                                onChange={handleInputChange}
                                                className="form-input"
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label>Phone Number</label>
                                            <input
                                                type="tel"
                                                name="phone"
                                                value={formData.phone}
                                                onChange={handleInputChange}
                                                className="form-input"
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label>Country</label>
                                            <select
                                                name="country"
                                                value={formData.country}
                                                onChange={handleInputChange}
                                                className="form-input"
                                            >
                                                <option value="United States">United States</option>
                                                <option value="Canada">Canada</option>
                                                <option value="United Kingdom">United Kingdom</option>
                                                <option value="Germany">Germany</option>
                                                <option value="France">France</option>
                                            </select>
                                        </div>
                                        <div className="form-group">
                                            <label>City</label>
                                            <input
                                                type="text"
                                                name="city"
                                                value={formData.city}
                                                onChange={handleInputChange}
                                                className="form-input"
                                            />
                                        </div>
                                    </div>
                                    <div className="form-group full-width">
                                        <label>Bio</label>
                                        <textarea
                                            name="bio"
                                            value={formData.bio}
                                            onChange={handleInputChange}
                                            className="form-textarea"
                                            rows="4"
                                            placeholder="Tell us about yourself..."
                                        />
                                    </div>
                                    <div className="form-actions">
                                        <button type="submit" className="save-btn">
                                            Save Changes
                                        </button>
                                        <button type="button" className="cancel-btn">
                                            Cancel
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    )}

                    {activeTab == 'security' && (
                    <div className="security-tab">
                        <div className="form-section">
                        <h3>Change Password</h3>
                        <form onSubmit={handlePasswordChange}>
                            <div className="form-group">
                            <label>Current Password</label>
                            <div className="password-field">
                                <input
                                type={showCurrent ? "text" : "password"}
                                className="form-input"
                                value={currentPassword}
                                onChange={(e) => setCurrentPassword(e.target.value)}
                                />
                                <button
                                type="button"
                                onClick={() => setShowCurrent((prev) => !prev)}
                                className="toggle-password"
                                title="Toggle Password"
                                >
                                {showCurrent ? <EyeOff size={18} /> : <Eye size={18} />}
                                </button>
                            </div>
                            </div>

                            <div className="form-group">
                            <label>New Password</label>
                            <div className="password-field">
                                <input
                                type={showNew ? "text" : "password"}
                                className="form-input"
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                                />
                                <button
                                type="button"
                                onClick={() => setShowNew((prev) => !prev)}
                                className="toggle-password"
                                title="Toggle Password"
                                >
                                {showNew ? <EyeOff size={18} /> : <Eye size={18} />}
                                </button>
                            </div>
                            </div>

                            <div className="form-group">
                            <label>Confirm New Password</label>
                            <div className="password-field">
                                <input
                                type={showConfirm ? "text" : "password"}
                                className="form-input"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                />
                                <button
                                type="button"
                                onClick={() => setShowConfirm((prev) => !prev)}
                                className="toggle-password"
                                title="Toggle Password"
                                >
                                {showConfirm ? <EyeOff size={18} /> : <Eye size={18} />}
                                </button>
                            </div>
                            </div>

                            <button type="submit" className="save-btn">Update Password</button>
                        </form>
                        </div>
                    </div>
                    )}

                    {activeTab === 'preferences' && (
                        <div className="preferences-tab">
                            <div className="form-section">
                                <h3>Notification Preferences</h3>
                                <div className="preference-option">
                                    <div className="option-info">
                                        <h4>Email Notifications</h4>
                                        <p>Receive updates about your portfolio via email</p>
                                    </div>
                                    <label className="switch">
                                        <input type="checkbox" checked={preferences.email} onChange={() => handlePreferenceChange('email')}  />
                                        <span className="slider"></span>
                                    </label>
                                </div>
                                <div className="preference-option">
                                    <div className="option-info">
                                        <h4>Price Alerts</h4>
                                        <p>Get notified when token prices change significantly</p>
                                    </div>
                                    <label className="switch">
                                        <input type="checkbox" checked={preferences.priceAlerts} onChange={() => handlePreferenceChange('priceAlerts')} />
                                        <span className="slider"></span>
                                    </label>
                                </div>
                                <div className="preference-option">
                                    <div className="option-info">
                                        <h4>Marketing Communications</h4>
                                        <p>Receive promotional emails and updates</p>
                                    </div>
                                    <label className="switch">
                                        <input type="checkbox" checked={preferences.marketing} onChange={() => handlePreferenceChange('marketing')} />
                                        <span className="slider"></span>
                                    </label>
                                </div>
                                <button onClick={savePreferences} className="save-btn" style={{ marginTop: 20 }}>Save Preferences</button>

                            </div>

                        </div>
                    )}

                </div>
            </div>
        </DashboardLayout>
    );
};

export default Profile;
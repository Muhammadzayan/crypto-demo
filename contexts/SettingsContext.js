import React, { createContext, useContext, useState, useEffect } from 'react';

const SettingsContext = createContext(null);

export const useSettings = () => {
  const context = useContext(SettingsContext);
  if (!context) {
    throw new Error('useSettings must be used within a SettingsProvider');
  }
  return context;
};

export const SettingsProvider = ({ children }) => {
  const [settings, setSettings] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch settings from API
  const fetchSettings = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/admin/settings?format=object');
      const result = await response.json();
      
      if (result.success) {
        setSettings(result.data || {});
        setError(null);
      } else {
        setError(result.message);
        console.error('Settings fetch error:', result.message);
      }
    } catch (err) {
      setError('Failed to fetch settings');
      console.error('Settings fetch error:', err);
      // Set empty settings object on error to prevent crashes
      setSettings({});
    } finally {
      setLoading(false);
    }
  };

  // Update settings
  const updateSettings = async (newSettings) => {
    try {
      const response = await fetch('/api/admin/settings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ settings: newSettings }),
      });
      
      const result = await response.json();
      
      if (result.success) {
        // Update local state
        setSettings(prev => ({ ...prev, ...newSettings }));
        return { success: true, message: 'Settings updated successfully' };
      } else {
        return { success: false, message: result.message };
      }
    } catch (err) {
      console.error('Settings update error:', err);
      return { success: false, message: 'Failed to update settings' };
    }
  };

  // Update single setting
  const updateSetting = async (key, value) => {
    try {
      const response = await fetch('/api/admin/settings', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ key, value }),
      });
      
      const result = await response.json();
      
      if (result.success) {
        // Update local state
        setSettings(prev => ({ ...prev, [key]: value }));
        return { success: true, message: 'Setting updated successfully' };
      } else {
        return { success: false, message: result.message };
      }
    } catch (err) {
      console.error('Setting update error:', err);
      return { success: false, message: 'Failed to update setting' };
    }
  };

  // Get setting value with fallback
  const getSetting = (key, fallback = null) => {
    return settings[key] !== undefined ? settings[key] : fallback;
  };

  // Initialize settings on mount
  useEffect(() => {
    fetchSettings();
  }, []);

  const value = {
    settings,
    loading,
    error,
    fetchSettings,
    updateSettings,
    updateSetting,
    getSetting,
  };

  return (
    <SettingsContext.Provider value={value}>
      {children}
    </SettingsContext.Provider>
  );
};

export default SettingsContext;
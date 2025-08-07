// pages/api/admin/settings.js
import { settingsOperations } from '../../../lib/db'; // Adjust path if needed

export default async function handler(req, res) {
  const { method } = req;

  try {
    switch (method) {
      case 'GET':
        if (req.query.key) {
          const setting = await settingsOperations.getSettingByKey(req.query.key);
          if (setting === null) {
            return res.status(404).json({ success: false, message: 'Setting not found' });
          }
          return res.status(200).json({ success: true, data: { [req.query.key]: setting } });
        } else if (req.query.format === 'object') {
          const settings = await settingsOperations.getSettingsObject();
          return res.status(200).json({ success: true, data: settings });
        } else {
          const settings = await settingsOperations.getAllSettings();
          return res.status(200).json({ success: true, data: settings });
        }

      case 'POST':
        const { settings } = req.body;
        if (!settings || typeof settings !== 'object') {
          return res.status(400).json({ success: false, message: 'Settings object is required' });
        }
        const result = await settingsOperations.updateMultipleSettings(settings);
        return res.status(200).json({ success: true, data: result });

      case 'PUT':
        const { key, value } = req.body;
        if (!key) {
          return res.status(400).json({ success: false, message: 'Setting key is required' });
        }
        const updated = await settingsOperations.upsertSetting(key, value);
        return res.status(200).json({ success: true, data: { key, value }, updated });

      case 'DELETE':
        const { key: deleteKey } = req.query;
        if (!deleteKey) {
          return res.status(400).json({ success: false, message: 'Setting key is required' });
        }
        const deleted = await settingsOperations.deleteSetting(deleteKey);
        if (!deleted) {
          return res.status(404).json({ success: false, message: 'Setting not found' });
        }
        return res.status(200).json({ success: true, message: 'Deleted successfully' });

      default:
        res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE']);
        return res.status(405).json({ success: false, message: `Method ${method} not allowed` });
    }
  } catch (error) {
    console.error('Settings API Error:', error);
    return res.status(500).json({ success: false, message: 'Internal server error', error: error.message });
  }
}

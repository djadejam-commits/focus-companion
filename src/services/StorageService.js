import AsyncStorage from '@react-native-async-storage/async-storage';

const SESSIONS_KEY = 'focus_sessions';
const SETTINGS_KEY = 'app_settings';

class StorageService {
  /**
   * Save a completed session to history
   */
  async saveSession(sessionData) {
    try {
      const existing = await this.getAllSessions();
      const newSession = {
        id: this.generateId(),
        ...sessionData,
        savedAt: Date.now()
      };

      const updated = [newSession, ...existing];
      await AsyncStorage.setItem(SESSIONS_KEY, JSON.stringify(updated));

      return newSession;
    } catch (error) {
      console.error('Error saving session:', error);
      throw error;
    }
  }

  /**
   * Get all saved sessions
   */
  async getAllSessions() {
    try {
      const data = await AsyncStorage.getItem(SESSIONS_KEY);
      if (!data) return [];

      return JSON.parse(data);
    } catch (error) {
      console.error('Error loading sessions:', error);
      return [];
    }
  }

  /**
   * Get sessions from today
   */
  async getTodaySessions() {
    try {
      const all = await this.getAllSessions();
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const todayTimestamp = today.getTime();

      return all.filter(session => session.startTime >= todayTimestamp);
    } catch (error) {
      console.error('Error loading today sessions:', error);
      return [];
    }
  }

  /**
   * Clear all sessions (for testing)
   */
  async clearAllSessions() {
    try {
      await AsyncStorage.removeItem(SESSIONS_KEY);
    } catch (error) {
      console.error('Error clearing sessions:', error);
    }
  }

  /**
   * Get app settings
   */
  async getSettings() {
    try {
      const data = await AsyncStorage.getItem(SETTINGS_KEY);
      if (!data) {
        return this.getDefaultSettings();
      }

      return JSON.parse(data);
    } catch (error) {
      console.error('Error loading settings:', error);
      return this.getDefaultSettings();
    }
  }

  /**
   * Save app settings
   */
  async saveSettings(settings) {
    try {
      await AsyncStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
    } catch (error) {
      console.error('Error saving settings:', error);
    }
  }

  /**
   * Default settings
   */
  getDefaultSettings() {
    return {
      detectionThreshold: 0.7,
      enableVibration: true,
      sessionTypes: {
        deep_work: { duration: 2700, label: 'Deep Work', icon: '🧠' },
        light_review: { duration: 1500, label: 'Light Review', icon: '📖' },
        flashcards: { duration: 600, label: 'Flashcards', icon: '⚡' }
      }
    };
  }

  /**
   * Generate unique ID
   */
  generateId() {
    return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  }
}

export default new StorageService();

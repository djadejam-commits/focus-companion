/**
 * Format seconds to MM:SS
 * @param {number} seconds
 * @returns {string} Formatted time string
 */
export const formatTime = (seconds) => {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;

  return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
};

/**
 * Format seconds to human-readable duration
 * @param {number} seconds
 * @returns {string} e.g., "45 minutes" or "1 hour 30 minutes"
 */
export const formatDuration = (seconds) => {
  const hours = Math.floor(seconds / 3600);
  const mins = Math.floor((seconds % 3600) / 60);

  if (hours > 0) {
    if (mins > 0) {
      return `${hours} hour${hours > 1 ? 's' : ''} ${mins} minute${mins > 1 ? 's' : ''}`;
    }
    return `${hours} hour${hours > 1 ? 's' : ''}`;
  }

  return `${mins} minute${mins > 1 ? 's' : ''}`;
};

/**
 * Format timestamp to readable date
 * @param {number} timestamp
 * @returns {string} e.g., "Today", "Yesterday", or "Jan 15"
 */
export const formatDate = (timestamp) => {
  const date = new Date(timestamp);
  const today = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);

  // Reset time parts for comparison
  today.setHours(0, 0, 0, 0);
  yesterday.setHours(0, 0, 0, 0);
  const compareDate = new Date(date);
  compareDate.setHours(0, 0, 0, 0);

  if (compareDate.getTime() === today.getTime()) {
    return 'Today';
  } else if (compareDate.getTime() === yesterday.getTime()) {
    return 'Yesterday';
  } else {
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  }
};

/**
 * Format timestamp to time only
 * @param {number} timestamp
 * @returns {string} e.g., "2:30 PM"
 */
export const formatTimeOfDay = (timestamp) => {
  return new Date(timestamp).toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit'
  });
};

/**
 * Calculate focus percentage
 * @param {number} distractionCount
 * @param {number} durationMinutes
 * @returns {number} Percentage (0-100)
 */
export const calculateFocusScore = (distractionCount, durationMinutes) => {
  if (durationMinutes === 0) return 100;

  // Max expected distractions: 1 per 3 minutes
  const maxExpected = durationMinutes / 3;
  const score = Math.max(0, 100 - (distractionCount / maxExpected) * 100);

  return Math.round(score);
};

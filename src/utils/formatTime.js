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
 * Calculate focus score based on distractions vs session time
 * @param {number} distractionCount - Number of times user picked up phone
 * @param {number} durationMinutes - Session duration in minutes
 * @returns {number} Focus score percentage (0-100)
 *
 * Algorithm:
 * - Assumes each distraction = 30 seconds of lost focus time
 * - Calculates percentage of time spent in true focus
 * - Applies diminishing returns for longer sessions
 *
 * Examples:
 * - 45 min, 0 distractions = 100%
 * - 45 min, 3 distractions = 97% (1.5 min lost / 45 min)
 * - 45 min, 10 distractions = 89% (5 min lost / 45 min)
 * - 25 min, 5 distractions = 90% (2.5 min lost / 25 min)
 */
export const calculateFocusScore = (distractionCount, durationMinutes) => {
  if (durationMinutes === 0) return 100;
  if (distractionCount === 0) return 100;

  // Each distraction assumes 30 seconds of lost focus
  const SECONDS_LOST_PER_DISTRACTION = 30;

  // Calculate total lost time
  const totalLostSeconds = distractionCount * SECONDS_LOST_PER_DISTRACTION;
  const totalSessionSeconds = durationMinutes * 60;

  // Calculate percentage of time in focus
  const focusTime = Math.max(0, totalSessionSeconds - totalLostSeconds);
  const baseScore = (focusTime / totalSessionSeconds) * 100;

  // Apply bonus for low distraction counts (reward good behavior)
  let finalScore = baseScore;

  // Distraction rate (distractions per 10 minutes)
  const distractionsPerTenMin = (distractionCount / durationMinutes) * 10;

  if (distractionsPerTenMin <= 1) {
    // Excellent focus - bonus points
    finalScore = Math.min(100, baseScore + 5);
  } else if (distractionsPerTenMin <= 2) {
    // Good focus - small bonus
    finalScore = Math.min(100, baseScore + 2);
  }

  // Ensure score is between 0-100
  const score = Math.max(0, Math.min(100, finalScore));

  return Math.round(score);
};

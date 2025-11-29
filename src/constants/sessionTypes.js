export const SESSION_TYPES = {
  DEEP_WORK: {
    id: 'deep_work',
    label: 'Deep Work',
    duration: 2700, // 45 minutes in seconds
    icon: '🧠',
    color: '#6366F1',
    description: 'Intensive focus session for complex tasks'
  },
  LIGHT_REVIEW: {
    id: 'light_review',
    label: 'Light Review',
    duration: 1500, // 25 minutes in seconds
    icon: '📖',
    color: '#8B5CF6',
    description: 'Quick review and study session'
  },
  FLASHCARDS: {
    id: 'flashcards',
    label: 'Flashcards',
    duration: 600, // 10 minutes in seconds
    icon: '⚡',
    color: '#F59E0B',
    description: 'Rapid drilling and memorization'
  }
};

export const getSessionType = (id) => {
  return Object.values(SESSION_TYPES).find(type => type.id === id);
};

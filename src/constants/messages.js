export const REFOCUS_MESSAGES = {
  deep_work: [
    'Breathe & refocus',
    'You\'ve got this',
    'Stay strong',
    'Deep focus mode',
    'Back to the grind'
  ],
  light_review: [
    'Quick reset',
    'Back to it!',
    'You\'re doing great',
    'Stay on track',
    'Almost there'
  ],
  flashcards: [
    'Stay sharp!',
    'Quick refocus',
    'You got this',
    'Keep drilling',
    'Speed mode'
  ]
};

export const SUMMARY_MESSAGES = {
  deep_work: {
    excellent: 'Incredible focus! You\'re unstoppable 🌟',
    good: 'Amazing work! Deep focus achieved 💪',
    moderate: 'Solid session! You\'re building discipline 📈',
    challenging: 'You showed up and tried. That\'s what matters! 💙'
  },
  light_review: {
    excellent: 'Perfect review session! 🎯',
    good: 'Solid session! Consistent effort pays off 📚',
    moderate: 'Good review! You\'re making progress 👍',
    challenging: 'You completed the session. That\'s a win! ✨'
  },
  flashcards: {
    excellent: 'Speed round crushed! 🚀',
    good: 'Nice drilling! Flashcard champ! 🏆',
    moderate: 'Flashcard session complete! 💫',
    challenging: 'You practiced. That\'s the goal! 🎯'
  }
};

export const GENERAL_ENCOURAGEMENT = [
  'Your future self will thank you',
  'Progress over perfection',
  'One more minute of focus',
  'You\'re building discipline',
  'Every session counts',
  'Focus is a superpower',
  'You\'re training your mind',
  'Consistency is key'
];

/**
 * Get random refocus message for session type
 */
export const getRefocusMessage = (sessionType) => {
  const messages = REFOCUS_MESSAGES[sessionType] || REFOCUS_MESSAGES.deep_work;
  return messages[Math.floor(Math.random() * messages.length)];
};

/**
 * Get summary message based on performance
 */
export const getSummaryMessage = (sessionType, distractionCount, totalMinutes) => {
  const messages = SUMMARY_MESSAGES[sessionType] || SUMMARY_MESSAGES.deep_work;

  // Calculate performance tier
  const distractionsPerMinute = distractionCount / totalMinutes;

  if (distractionsPerMinute < 0.1) {
    return messages.excellent;
  } else if (distractionsPerMinute < 0.2) {
    return messages.good;
  } else if (distractionsPerMinute < 0.4) {
    return messages.moderate;
  } else {
    return messages.challenging;
  }
};

/**
 * Get random general encouragement
 */
export const getGeneralEncouragement = () => {
  return GENERAL_ENCOURAGEMENT[Math.floor(Math.random() * GENERAL_ENCOURAGEMENT.length)];
};

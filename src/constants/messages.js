// Emoji pools for varied visual feedback
export const REFOCUS_EMOJIS = {
  calming: ['🌊', '🌸', '🍃', '☁️', '🌙', '✨', '🌺', '🦋'],
  encouraging: ['💪', '🎯', '⚡', '🔥', '🚀', '⭐', '💫', '🌟'],
  mindful: ['🧘', '🌱', '🕊️', '🌈', '💙', '🌀', '🎐', '🪷']
};

// Rich, personal, and engaging refocus messages
export const REFOCUS_MESSAGES = {
  deep_work: [
    {
      title: 'Take a breath',
      message: 'Your focus is powerful. Let\'s redirect it back to what matters.',
      emoji: 'calming'
    },
    {
      title: 'You caught yourself',
      message: 'Awareness is half the battle. You\'re building mental discipline right now.',
      emoji: 'encouraging'
    },
    {
      title: 'Moment of reset',
      message: 'Even masters get distracted. The difference? They notice and refocus.',
      emoji: 'mindful'
    },
    {
      title: 'Deep work awaits',
      message: 'Your brain is capable of incredible things when you give it space to focus.',
      emoji: 'encouraging'
    },
    {
      title: 'You\'ve got this',
      message: 'This is your time. Your goals are waiting on the other side of this moment.',
      emoji: 'calming'
    },
    {
      title: 'Back to the zone',
      message: 'Flow state is just a few focused minutes away. You\'re almost there.',
      emoji: 'encouraging'
    },
    {
      title: 'Gentle reminder',
      message: 'Your future self is cheering you on. Let\'s make them proud.',
      emoji: 'mindful'
    },
    {
      title: 'Refocus & rise',
      message: 'Every distraction you overcome is training for the next challenge.',
      emoji: 'encouraging'
    }
  ],
  light_review: [
    {
      title: 'Quick reset',
      message: 'You\'re doing great! Just a small nudge to keep that momentum going.',
      emoji: 'calming'
    },
    {
      title: 'Stay with it',
      message: 'Review time flies when you\'re focused. You\'re making real progress.',
      emoji: 'encouraging'
    },
    {
      title: 'Almost done!',
      message: 'Your dedication shows. Finish strong and you\'ll remember this so much better.',
      emoji: 'mindful'
    },
    {
      title: 'Keep going',
      message: 'This material is sinking in with every focused minute. Don\'t stop now.',
      emoji: 'calming'
    },
    {
      title: 'You\'re on track',
      message: 'Small sessions, big impact. You\'re building habits that will last forever.',
      emoji: 'encouraging'
    },
    {
      title: 'Back to basics',
      message: 'Review might feel easy, but staying focused makes it stick. You got this.',
      emoji: 'mindful'
    },
    {
      title: 'Focus up',
      message: 'Your brain is absorbing this. Give it the attention it deserves.',
      emoji: 'calming'
    },
    {
      title: 'Nearly there',
      message: 'The finish line is close. Push through and you\'ll feel amazing after.',
      emoji: 'encouraging'
    }
  ],
  flashcards: [
    {
      title: 'Speed matters',
      message: 'Quick drills need quick focus. You\'re training your brain to think fast.',
      emoji: 'encouraging'
    },
    {
      title: 'Stay sharp',
      message: 'Every card is a rep. Every rep builds expertise. Keep the rhythm going.',
      emoji: 'calming'
    },
    {
      title: 'Lock in',
      message: 'Flashcards work best when you\'re fully present. Your memory will thank you.',
      emoji: 'mindful'
    },
    {
      title: 'Drill mode',
      message: 'This is where knowledge becomes automatic. You\'re doing the hard work.',
      emoji: 'encouraging'
    },
    {
      title: 'Quick refocus',
      message: 'Speed rounds require speed focus. You\'ve got the discipline to finish strong.',
      emoji: 'calming'
    },
    {
      title: 'Keep drilling',
      message: 'Repetition + focus = mastery. You\'re literally rewiring your brain right now.',
      emoji: 'encouraging'
    },
    {
      title: 'Almost through',
      message: 'Your study speed is improving with every focused session. Don\'t slow down.',
      emoji: 'mindful'
    },
    {
      title: 'Power through',
      message: 'Flashcard champions stay focused. You\'re becoming one of them.',
      emoji: 'encouraging'
    }
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
 * Returns object with { title, message, emoji }
 */
export const getRefocusMessage = (sessionType) => {
  const messages = REFOCUS_MESSAGES[sessionType] || REFOCUS_MESSAGES.deep_work;
  const selectedMessage = messages[Math.floor(Math.random() * messages.length)];

  // Get random emoji from the selected category
  const emojiCategory = REFOCUS_EMOJIS[selectedMessage.emoji] || REFOCUS_EMOJIS.calming;
  const randomEmoji = emojiCategory[Math.floor(Math.random() * emojiCategory.length)];

  return {
    title: selectedMessage.title,
    message: selectedMessage.message,
    emoji: randomEmoji
  };
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

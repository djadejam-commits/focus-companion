import React, { createContext, useContext, useReducer, useCallback } from 'react';

// Session states
export const SESSION_STATE = {
  IDLE: 'idle',
  ACTIVE: 'active',
  PAUSED: 'paused',
  REFOCUS: 'refocus',
  COMPLETE: 'complete'
};

// Action types
const ACTIONS = {
  START_SESSION: 'START_SESSION',
  TICK: 'TICK',
  PAUSE: 'PAUSE',
  RESUME: 'RESUME',
  DETECTION: 'DETECTION',
  END_REFOCUS: 'END_REFOCUS',
  DISMISS_FALSE_POSITIVE: 'DISMISS_FALSE_POSITIVE',
  COMPLETE: 'COMPLETE',
  RESET: 'RESET',
  END_EARLY: 'END_EARLY'
};

// Initial state
const initialState = {
  state: SESSION_STATE.IDLE,
  sessionType: null,
  plannedDuration: 0,
  elapsedTime: 0,
  remainingTime: 0,
  distractionCount: 0,
  dismissedCount: 0, // Track dismissed false positives
  detectionEvents: [],
  startTime: null,
  endTime: null,
  refocusTimeout: null
};

// Constants
const MAX_DISMISSALS = 3; // Limit dismisses to prevent gaming

// Reducer
const sessionReducer = (state, action) => {
  switch (action.type) {
    case ACTIONS.START_SESSION:
      return {
        ...initialState,
        state: SESSION_STATE.ACTIVE,
        sessionType: action.payload.sessionType,
        plannedDuration: action.payload.duration,
        remainingTime: action.payload.duration,
        startTime: Date.now()
      };

    case ACTIONS.TICK:
      const newRemaining = Math.max(0, state.remainingTime - 1);
      const newElapsed = state.elapsedTime + 1;

      // Auto-complete when time runs out
      if (newRemaining === 0) {
        return {
          ...state,
          state: SESSION_STATE.COMPLETE,
          remainingTime: 0,
          elapsedTime: newElapsed,
          endTime: Date.now()
        };
      }

      return {
        ...state,
        remainingTime: newRemaining,
        elapsedTime: newElapsed
      };

    case ACTIONS.PAUSE:
      return {
        ...state,
        state: SESSION_STATE.PAUSED
      };

    case ACTIONS.RESUME:
      return {
        ...state,
        state: SESSION_STATE.ACTIVE
      };

    case ACTIONS.DETECTION:
      return {
        ...state,
        state: SESSION_STATE.REFOCUS,
        distractionCount: state.distractionCount + 1,
        detectionEvents: [
          ...state.detectionEvents,
          action.payload
        ]
      };

    case ACTIONS.END_REFOCUS:
      return {
        ...state,
        state: SESSION_STATE.ACTIVE
      };

    case ACTIONS.DISMISS_FALSE_POSITIVE:
      // User dismissed as false positive - decrement counter and resume
      // Limit dismisses to prevent gaming the system
      if (state.dismissedCount >= MAX_DISMISSALS) {
        // Max dismisses reached - just resume without decrementing
        return {
          ...state,
          state: SESSION_STATE.ACTIVE
        };
      }

      return {
        ...state,
        state: SESSION_STATE.ACTIVE,
        distractionCount: Math.max(0, state.distractionCount - 1),
        dismissedCount: state.dismissedCount + 1
      };

    case ACTIONS.COMPLETE:
      return {
        ...state,
        state: SESSION_STATE.COMPLETE,
        endTime: Date.now()
      };

    case ACTIONS.END_EARLY:
      return {
        ...state,
        state: SESSION_STATE.COMPLETE,
        endTime: Date.now(),
        remainingTime: 0
      };

    case ACTIONS.RESET:
      return initialState;

    default:
      return state;
  }
};

// Create context
const SessionContext = createContext();

// Provider component
export const SessionProvider = ({ children }) => {
  const [state, dispatch] = useReducer(sessionReducer, initialState);

  // Start a new session
  const startSession = useCallback((sessionType, duration) => {
    dispatch({
      type: ACTIONS.START_SESSION,
      payload: { sessionType, duration }
    });
  }, []);

  // Timer tick (called every second)
  const tick = useCallback(() => {
    dispatch({ type: ACTIONS.TICK });
  }, []);

  // Manual pause
  const pauseSession = useCallback(() => {
    dispatch({ type: ACTIONS.PAUSE });
  }, []);

  // Manual resume
  const resumeSession = useCallback(() => {
    dispatch({ type: ACTIONS.RESUME });
  }, []);

  // Detection event (from MotionService)
  const onDetection = useCallback((detectionData) => {
    if (state.state === SESSION_STATE.ACTIVE) {
      dispatch({
        type: ACTIONS.DETECTION,
        payload: detectionData
      });

      // Auto-resume after 3 seconds
      setTimeout(() => {
        dispatch({ type: ACTIONS.END_REFOCUS });
      }, 3000);
    }
  }, [state.state]);

  // Complete session
  const completeSession = useCallback(() => {
    dispatch({ type: ACTIONS.COMPLETE });
  }, []);

  // End session early
  const endSessionEarly = useCallback(() => {
    dispatch({ type: ACTIONS.END_EARLY });
  }, []);

  // Dismiss false positive detection
  const dismissFalsePositive = useCallback(() => {
    dispatch({ type: ACTIONS.DISMISS_FALSE_POSITIVE });
  }, []);

  // Reset to idle
  const resetSession = useCallback(() => {
    dispatch({ type: ACTIONS.RESET });
  }, []);

  // Calculate session stats
  const getSessionStats = useCallback(() => {
    const actualDuration = state.elapsedTime;
    const focusScore = calculateFocusScore(state.distractionCount, actualDuration / 60);

    return {
      sessionType: state.sessionType,
      startTime: state.startTime,
      endTime: state.endTime,
      plannedDuration: state.plannedDuration,
      actualDuration,
      distractionCount: state.distractionCount,
      detectionEvents: state.detectionEvents,
      focusScore,
      completed: state.remainingTime === 0
    };
  }, [state]);

  const value = {
    state: state.state,
    sessionType: state.sessionType,
    plannedDuration: state.plannedDuration,
    elapsedTime: state.elapsedTime,
    remainingTime: state.remainingTime,
    distractionCount: state.distractionCount,
    dismissedCount: state.dismissedCount,
    canDismiss: state.dismissedCount < MAX_DISMISSALS,
    detectionEvents: state.detectionEvents,
    startTime: state.startTime,
    endTime: state.endTime,

    // Actions
    startSession,
    tick,
    pauseSession,
    resumeSession,
    onDetection,
    completeSession,
    endSessionEarly,
    dismissFalsePositive,
    resetSession,
    getSessionStats
  };

  return (
    <SessionContext.Provider value={value}>
      {children}
    </SessionContext.Provider>
  );
};

// Hook to use session context
export const useSession = () => {
  const context = useContext(SessionContext);
  if (!context) {
    throw new Error('useSession must be used within SessionProvider');
  }
  return context;
};

// Helper function
function calculateFocusScore(distractionCount, durationMinutes) {
  if (durationMinutes === 0) return 100;

  const maxExpected = durationMinutes / 3;
  const score = Math.max(0, 100 - (distractionCount / maxExpected) * 100);

  return Math.round(score);
}

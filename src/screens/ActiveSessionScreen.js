import React, { useEffect, useRef, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { activateKeepAwakeAsync, deactivateKeepAwake } from 'expo-keep-awake';
import { useSession, SESSION_STATE } from '../context/SessionContext';
import { formatTime } from '../utils/formatTime';
import MotionService from '../services/MotionService';
import RefocusScreen from './RefocusScreen';

const ActiveSessionScreen = ({ route, navigation }) => {
  const { sessionType } = route.params;
  const {
    state,
    remainingTime,
    distractionCount,
    startSession,
    tick,
    pauseSession,
    resumeSession,
    endSessionEarly,
    onDetection
  } = useSession();

  const timerRef = useRef(null);
  const [isMotionActive, setIsMotionActive] = useState(false);

  // Initialize session
  useEffect(() => {
    startSession(sessionType.id, sessionType.duration);
    activateKeepAwakeAsync(); // Keep screen awake during session

    return () => {
      deactivateKeepAwake();
    };
  }, []);

  // Timer logic
  useEffect(() => {
    if (state === SESSION_STATE.ACTIVE) {
      timerRef.current = setInterval(() => {
        tick();
      }, 1000);
    } else {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    }

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [state, tick]);

  // Motion detection
  useEffect(() => {
    const initMotion = async () => {
      try {
        await MotionService.init(onDetection, 0.7);
        MotionService.start();
        setIsMotionActive(true);
      } catch (error) {
        console.error('Failed to initialize motion detection:', error);
        Alert.alert(
          'Motion Detection Unavailable',
          'Sensors not available on this device. App will work without distraction detection.',
          [{ text: 'OK' }]
        );
      }
    };

    if (state === SESSION_STATE.ACTIVE) {
      initMotion();
    }

    return () => {
      MotionService.stop();
      setIsMotionActive(false);
    };
  }, [state, onDetection]);

  // Navigate to summary when complete
  useEffect(() => {
    if (state === SESSION_STATE.COMPLETE) {
      MotionService.stop();
      navigation.replace('Summary');
    }
  }, [state, navigation]);

  const handlePause = () => {
    pauseSession();
    MotionService.stop();
  };

  const handleResume = () => {
    resumeSession();
    MotionService.start();
  };

  const handleEndEarly = () => {
    Alert.alert(
      'End Session Early?',
      'Are you sure you want to end this session?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'End Session',
          style: 'destructive',
          onPress: () => {
            MotionService.stop();
            endSessionEarly();
          }
        }
      ]
    );
  };

  const progress = 1 - (remainingTime / sessionType.duration);

  // Show refocus screen if in refocus state
  if (state === SESSION_STATE.REFOCUS) {
    return <RefocusScreen sessionType={sessionType} />;
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={handleEndEarly}>
            <Text style={styles.closeButton}>✕</Text>
          </TouchableOpacity>
          <View style={styles.sessionBadge}>
            <Text style={styles.sessionIcon}>{sessionType.icon}</Text>
            <Text style={styles.sessionLabel}>{sessionType.label}</Text>
          </View>
        </View>

        {/* Timer Display */}
        <View style={styles.timerContainer}>
          <Text style={styles.timerText}>{formatTime(remainingTime)}</Text>
        </View>

        {/* Progress Bar */}
        <View style={styles.progressBarContainer}>
          <View style={[styles.progressBar, { width: `${progress * 100}%` }]} />
        </View>

        {/* Distraction Counter */}
        <View style={styles.distractionContainer}>
          <Text style={styles.distractionIcon}>📵</Text>
          <Text style={styles.distractionText}>
            {distractionCount} distraction{distractionCount !== 1 ? 's' : ''} caught
          </Text>
        </View>

        {/* Motion Status Indicator */}
        {isMotionActive && (
          <View style={styles.motionStatus}>
            <View style={styles.motionIndicator} />
            <Text style={styles.motionText}>Detection active</Text>
          </View>
        )}

        {/* Controls */}
        <View style={styles.controls}>
          {state === SESSION_STATE.ACTIVE ? (
            <TouchableOpacity style={styles.pauseButton} onPress={handlePause}>
              <Text style={styles.buttonText}>Pause</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity style={styles.resumeButton} onPress={handleResume}>
              <Text style={styles.buttonText}>Resume</Text>
            </TouchableOpacity>
          )}
        </View>

        {/* Encouragement */}
        <View style={styles.encouragement}>
          <Text style={styles.encouragementText}>
            Keep going! You're doing great staying focused.
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB'
  },
  content: {
    flex: 1,
    padding: 24
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 48
  },
  closeButton: {
    fontSize: 24,
    color: '#6B7280',
    padding: 8
  },
  sessionBadge: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 24,
    marginLeft: 16
  },
  sessionIcon: {
    fontSize: 20,
    marginRight: 8
  },
  sessionLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827'
  },
  timerContainer: {
    alignItems: 'center',
    marginBottom: 32
  },
  timerText: {
    fontSize: 72,
    fontWeight: 'bold',
    color: '#111827',
    fontVariant: ['tabular-nums']
  },
  progressBarContainer: {
    height: 8,
    backgroundColor: '#E5E7EB',
    borderRadius: 4,
    marginBottom: 48,
    overflow: 'hidden'
  },
  progressBar: {
    height: '100%',
    backgroundColor: '#6366F1',
    borderRadius: 4
  },
  distractionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24
  },
  distractionIcon: {
    fontSize: 24,
    marginRight: 8
  },
  distractionText: {
    fontSize: 18,
    color: '#6B7280'
  },
  motionStatus: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 32
  },
  motionIndicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#10B981',
    marginRight: 8
  },
  motionText: {
    fontSize: 14,
    color: '#6B7280'
  },
  controls: {
    marginBottom: 32
  },
  pauseButton: {
    backgroundColor: '#6366F1',
    paddingVertical: 16,
    paddingHorizontal: 48,
    borderRadius: 12,
    alignItems: 'center'
  },
  resumeButton: {
    backgroundColor: '#10B981',
    paddingVertical: 16,
    paddingHorizontal: 48,
    borderRadius: 12,
    alignItems: 'center'
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '600'
  },
  encouragement: {
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center'
  },
  encouragementText: {
    fontSize: 14,
    color: '#6B7280',
    textAlign: 'center',
    lineHeight: 20
  }
});

export default ActiveSessionScreen;

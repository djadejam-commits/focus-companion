import React, { useEffect, useRef, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert, Animated } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { activateKeepAwakeAsync, deactivateKeepAwake } from 'expo-keep-awake';
import * as Haptics from 'expo-haptics';
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

  // Animation values
  const pulseAnim = useRef(new Animated.Value(1)).current;
  const flashAnim = useRef(new Animated.Value(0)).current;
  const progressAnim = useRef(new Animated.Value(0)).current;

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
      // Success haptic for completion
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
      navigation.replace('Summary');
    }
  }, [state, navigation]);

  // Pulsing animation for detection indicator
  useEffect(() => {
    if (isMotionActive) {
      Animated.loop(
        Animated.sequence([
          Animated.timing(pulseAnim, {
            toValue: 1.3,
            duration: 1000,
            useNativeDriver: true
          }),
          Animated.timing(pulseAnim, {
            toValue: 1,
            duration: 1000,
            useNativeDriver: true
          })
        ])
      ).start();
    }
  }, [isMotionActive]);

  // Flash animation when detection occurs
  useEffect(() => {
    if (state === SESSION_STATE.REFOCUS) {
      // Haptic feedback for detection
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning);

      Animated.sequence([
        Animated.timing(flashAnim, {
          toValue: 0.3,
          duration: 100,
          useNativeDriver: true
        }),
        Animated.timing(flashAnim, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true
        })
      ]).start();
    }
  }, [state]);

  // Smooth progress animation
  useEffect(() => {
    const progress = 1 - (remainingTime / sessionType.duration);
    Animated.timing(progressAnim, {
      toValue: progress,
      duration: 500,
      useNativeDriver: false
    }).start();
  }, [remainingTime, sessionType.duration]);

  const handlePause = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    pauseSession();
    MotionService.stop();
  };

  const handleResume = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    resumeSession();
    MotionService.start();
  };

  const handleEndEarly = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    Alert.alert(
      'End Session Early?',
      'Are you sure you want to end this session?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'End Session',
          style: 'destructive',
          onPress: () => {
            Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning);
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
      {/* Flash overlay for detection */}
      <Animated.View
        style={[
          styles.flashOverlay,
          { opacity: flashAnim }
        ]}
        pointerEvents="none"
      />

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

        {/* Timer Display with Circular Progress */}
        <View style={styles.timerContainer}>
          {/* Circular progress ring */}
          <View style={styles.circularProgressContainer}>
            <Animated.View style={[
              styles.circularProgress,
              {
                transform: [{
                  rotate: progressAnim.interpolate({
                    inputRange: [0, 1],
                    outputRange: ['0deg', '360deg']
                  })
                }]
              }
            ]}>
              <View style={styles.circularProgressBar} />
            </Animated.View>
            <View style={styles.circularProgressInner}>
              <Text style={styles.timerText}>{formatTime(remainingTime)}</Text>
              <Text style={styles.progressPercent}>
                {Math.round((1 - (remainingTime / sessionType.duration)) * 100)}%
              </Text>
            </View>
          </View>
        </View>

        {/* Progress Bar */}
        <View style={styles.progressBarContainer}>
          <Animated.View
            style={[
              styles.progressBar,
              {
                width: progressAnim.interpolate({
                  inputRange: [0, 1],
                  outputRange: ['0%', '100%']
                })
              }
            ]}
          />
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
            <Animated.View
              style={[
                styles.motionIndicator,
                {
                  transform: [{ scale: pulseAnim }]
                }
              ]}
            />
            <Text style={styles.motionText}>🤖 AI Detection Active</Text>
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
  flashOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: '#EF4444',
    zIndex: 999
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
  circularProgressContainer: {
    width: 280,
    height: 280,
    justifyContent: 'center',
    alignItems: 'center'
  },
  circularProgress: {
    position: 'absolute',
    width: 280,
    height: 280,
    borderRadius: 140,
    borderWidth: 8,
    borderColor: '#E5E7EB'
  },
  circularProgressBar: {
    position: 'absolute',
    width: '50%',
    height: '100%',
    borderTopRightRadius: 140,
    borderBottomRightRadius: 140,
    backgroundColor: '#6366F1',
    right: 0
  },
  circularProgressInner: {
    width: 240,
    height: 240,
    borderRadius: 120,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 8
  },
  timerText: {
    fontSize: 56,
    fontWeight: 'bold',
    color: '#111827',
    fontVariant: ['tabular-nums']
  },
  progressPercent: {
    fontSize: 16,
    fontWeight: '600',
    color: '#6366F1',
    marginTop: 4
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
    marginBottom: 32,
    backgroundColor: '#ECFDF5',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: '#10B981'
  },
  motionIndicator: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#10B981',
    marginRight: 10,
    shadowColor: '#10B981',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 4,
    elevation: 4
  },
  motionText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#059669'
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

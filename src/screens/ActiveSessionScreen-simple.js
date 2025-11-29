import React, { useEffect, useRef, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import RefocusScreen from './RefocusScreen-simple';

// Inline formatTime to avoid import issues
const formatTime = (seconds) => {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
};

const SESSION_STATE = {
  IDLE: 'idle',
  ACTIVE: 'active',
  PAUSED: 'paused',
  REFOCUS: 'refocus',
  COMPLETE: 'complete'
};

const ActiveSessionScreen = ({ route, navigation }) => {
  const { sessionType } = route.params;

  const [state, setState] = useState(SESSION_STATE.IDLE);
  const [remainingTime, setRemainingTime] = useState(sessionType.duration);
  const [distractionCount, setDistractionCount] = useState(0);

  const timerRef = useRef(null);

  // Initialize session
  useEffect(() => {
    setState(SESSION_STATE.ACTIVE);
  }, []);

  // Timer logic
  useEffect(() => {
    if (state === SESSION_STATE.ACTIVE) {
      timerRef.current = setInterval(() => {
        setRemainingTime(prev => {
          if (prev <= 1) {
            setState(SESSION_STATE.COMPLETE);
            return 0;
          }
          return prev - 1;
        });
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
  }, [state]);

  // Navigate to summary when complete
  useEffect(() => {
    if (state === SESSION_STATE.COMPLETE) {
      navigation.replace('Summary');
    }
  }, [state, navigation]);

  const handlePause = () => {
    setState(SESSION_STATE.PAUSED);
  };

  const handleResume = () => {
    setState(SESSION_STATE.ACTIVE);
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
            setState(SESSION_STATE.COMPLETE);
          }
        }
      ]
    );
  };

  const progress = 1 - (remainingTime / sessionType.duration);
  const progressWidth = `${Math.round(progress * 100)}%`;

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
          <View style={[styles.progressBar, { width: progressWidth }]} />
        </View>

        {/* Distraction Counter */}
        <View style={styles.distractionContainer}>
          <Text style={styles.distractionIcon}>📵</Text>
          <Text style={styles.distractionText}>
            {distractionCount} distraction{distractionCount !== 1 ? 's' : ''} caught
          </Text>
        </View>

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
    color: '#111827'
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

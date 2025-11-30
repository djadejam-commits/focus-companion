import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Animated, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { getRefocusMessage } from '../constants/messages';
import { useSession } from '../context/SessionContext';

const RefocusScreen = ({ sessionType }) => {
  const { dismissFalsePositive, canDismiss, dismissedCount } = useSession();
  const [countdown, setCountdown] = useState(3);
  const dismissesRemaining = 3 - dismissedCount;
  const fadeAnim = useState(new Animated.Value(0))[0];
  const scaleAnim = useState(new Animated.Value(0.8))[0];
  const breatheAnim = useState(new Animated.Value(1))[0];
  const pulseAnim = useState(new Animated.Value(1))[0];

  // Get varied message with random emoji each time
  const refocusContent = getRefocusMessage(sessionType.id);

  const handleDismiss = () => {
    // User rejected this as false positive - decrement counter and resume
    dismissFalsePositive();
  };

  useEffect(() => {
    // Fade in animation
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        friction: 8,
        tension: 40,
        useNativeDriver: true
      })
    ]).start();

    // Breathing animation for icon (calming effect)
    Animated.loop(
      Animated.sequence([
        Animated.timing(breatheAnim, {
          toValue: 1.1,
          duration: 2000,
          useNativeDriver: true
        }),
        Animated.timing(breatheAnim, {
          toValue: 1,
          duration: 2000,
          useNativeDriver: true
        })
      ])
    ).start();

    // Pulse animation for countdown circle
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1.05,
          duration: 500,
          useNativeDriver: true
        }),
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 500,
          useNativeDriver: true
        })
      ])
    ).start();

    // Countdown timer
    const timer = setInterval(() => {
      setCountdown(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#6366F1', '#8B5CF6', '#EC4899']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.gradient}
      >
        <Animated.View
          style={[
            styles.content,
            {
              opacity: fadeAnim,
              transform: [{ scale: scaleAnim }]
            }
          ]}
        >
          {/* Icon with breathing animation - varied emoji each time */}
          <Animated.Text
            style={[
              styles.icon,
              { transform: [{ scale: breatheAnim }] }
            ]}
          >
            {refocusContent.emoji}
          </Animated.Text>

          {/* Dynamic title and message */}
          <Text style={styles.title}>{refocusContent.title}</Text>
          <Text style={styles.message}>{refocusContent.message}</Text>

          {/* Countdown with pulse animation */}
          {countdown > 0 && (
            <Animated.View
              style={[
                styles.countdownContainer,
                { transform: [{ scale: pulseAnim }] }
              ]}
            >
              <Text style={styles.countdown}>{countdown}</Text>
            </Animated.View>
          )}

          {/* Subtext */}
          <Text style={styles.subtext}>Resuming automatically...</Text>

          {/* Dismiss button for false positives - only show if user hasn't hit limit */}
          {canDismiss && (
            <View style={styles.dismissContainer}>
              <TouchableOpacity
                style={styles.dismissButton}
                onPress={handleDismiss}
              >
                <Text style={styles.dismissButtonText}>Not a distraction? Dismiss</Text>
              </TouchableOpacity>
              <Text style={styles.dismissCounter}>
                {dismissesRemaining} {dismissesRemaining === 1 ? 'dismiss' : 'dismisses'} remaining
              </Text>
            </View>
          )}
        </Animated.View>
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  gradient: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  content: {
    alignItems: 'center',
    paddingHorizontal: 32
  },
  icon: {
    fontSize: 72,
    marginBottom: 24
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 16,
    textAlign: 'center'
  },
  message: {
    fontSize: 18,
    color: '#FFFFFF',
    opacity: 0.9,
    textAlign: 'center',
    marginBottom: 48,
    lineHeight: 24
  },
  countdownContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
    borderWidth: 3,
    borderColor: '#FFFFFF'
  },
  countdown: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#FFFFFF'
  },
  subtext: {
    fontSize: 14,
    color: '#FFFFFF',
    opacity: 0.7
  },
  dismissContainer: {
    marginTop: 24,
    alignItems: 'center'
  },
  dismissButton: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.4)'
  },
  dismissButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
    textAlign: 'center'
  },
  dismissCounter: {
    marginTop: 8,
    fontSize: 12,
    color: '#FFFFFF',
    opacity: 0.7
  }
});

export default RefocusScreen;

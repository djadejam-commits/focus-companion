import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';

const RefocusScreen = ({ sessionType }) => {
  const [countdown, setCountdown] = useState(3);

  useEffect(() => {
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
      <Text style={styles.icon}>🌊</Text>
      <Text style={styles.title}>Breathe & Refocus</Text>
      <Text style={styles.message}>You've got this! Let's get back to studying.</Text>

      {countdown > 0 && (
        <View style={styles.countdownContainer}>
          <Text style={styles.countdown}>{countdown}</Text>
        </View>
      )}

      <Text style={styles.subtext}>Resuming automatically...</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#6366F1',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 32
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
  }
});

export default RefocusScreen;

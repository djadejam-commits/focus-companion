import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Animated } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as Haptics from 'expo-haptics';
import { SESSION_TYPES } from '../constants/sessionTypes';
import { formatDuration, formatTime, calculateFocusScore } from '../utils/formatTime';
import StorageService from '../services/StorageService';
import AnimatedButton from '../components/AnimatedButton';

const DashboardScreen = ({ navigation }) => {
  const [todayCount, setTodayCount] = useState(0);
  const [weeklyTime, setWeeklyTime] = useState(0);
  const [avgFocusScore, setAvgFocusScore] = useState(0);
  const [totalSessions, setTotalSessions] = useState(0);

  // Animations for staggered card entrance
  const fadeAnims = useRef([
    new Animated.Value(0),
    new Animated.Value(0),
    new Animated.Value(0)
  ]).current;

  useEffect(() => {
    loadStats();

    // Staggered fade-in animation for session cards
    Animated.stagger(100, [
      Animated.timing(fadeAnims[0], {
        toValue: 1,
        duration: 400,
        useNativeDriver: true
      }),
      Animated.timing(fadeAnims[1], {
        toValue: 1,
        duration: 400,
        useNativeDriver: true
      }),
      Animated.timing(fadeAnims[2], {
        toValue: 1,
        duration: 400,
        useNativeDriver: true
      })
    ]).start();
  }, []);

  const loadStats = async () => {
    const todaySessions = await StorageService.getTodaySessions();
    const allSessions = await StorageService.getAllSessions();

    setTodayCount(todaySessions.length);
    setTotalSessions(allSessions.length);

    // Calculate weekly time (last 7 days)
    const weekAgo = Date.now() - 7 * 24 * 60 * 60 * 1000;
    const weeklySessions = allSessions.filter(s => s.startTime >= weekAgo);
    const weeklyMinutes = weeklySessions.reduce((sum, s) => sum + (s.actualDuration / 60), 0);
    setWeeklyTime(Math.round(weeklyMinutes));

    // Calculate average focus score
    if (allSessions.length > 0) {
      const avgScore = allSessions.reduce((sum, s) => {
        return sum + calculateFocusScore(s.distractionCount, s.actualDuration / 60);
      }, 0) / allSessions.length;
      setAvgFocusScore(Math.round(avgScore));
    }
  };

  const handleStartSession = (sessionType) => {
    navigation.navigate('ActiveSession', { sessionType });
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>Focus Companion</Text>
          <Text style={styles.subtitle}>Ready to study?</Text>
        </View>

        {/* Session Type Cards */}
        <View style={styles.cardsContainer}>
          <Animated.View style={{ opacity: fadeAnims[0] }}>
            <SessionCard
              sessionType={SESSION_TYPES.DEEP_WORK}
              onPress={() => handleStartSession(SESSION_TYPES.DEEP_WORK)}
            />
          </Animated.View>
          <Animated.View style={{ opacity: fadeAnims[1] }}>
            <SessionCard
              sessionType={SESSION_TYPES.LIGHT_REVIEW}
              onPress={() => handleStartSession(SESSION_TYPES.LIGHT_REVIEW)}
            />
          </Animated.View>
          <Animated.View style={{ opacity: fadeAnims[2] }}>
            <SessionCard
              sessionType={SESSION_TYPES.FLASHCARDS}
              onPress={() => handleStartSession(SESSION_TYPES.FLASHCARDS)}
            />
          </Animated.View>
        </View>

        {/* Statistics Grid */}
        {totalSessions > 0 && (
          <View style={styles.statsGrid}>
            <View style={styles.statCard}>
              <Text style={styles.statValue}>{todayCount}</Text>
              <Text style={styles.statLabel}>Today</Text>
            </View>
            <View style={styles.statCard}>
              <Text style={styles.statValue}>{weeklyTime}m</Text>
              <Text style={styles.statLabel}>This Week</Text>
            </View>
            <View style={styles.statCard}>
              <Text style={styles.statValue}>{avgFocusScore}%</Text>
              <Text style={styles.statLabel}>Avg Focus</Text>
            </View>
            <View style={styles.statCard}>
              <Text style={styles.statValue}>{totalSessions}</Text>
              <Text style={styles.statLabel}>Total</Text>
            </View>
          </View>
        )}

        {/* History Button */}
        <AnimatedButton
          style={styles.historyButton}
          onPress={() => navigation.navigate('History')}
          hapticStyle="light"
          accessible={true}
          accessibilityLabel="View session history"
          accessibilityHint="Double tap to view all past focus sessions"
          accessibilityRole="button"
        >
          <Text style={styles.historyButtonText}>📊 View Full History</Text>
        </AnimatedButton>
      </ScrollView>
    </SafeAreaView>
  );
};

// Session Type Card Component
const SessionCard = ({ sessionType, onPress }) => {
  return (
    <AnimatedButton
      style={[styles.card, { borderLeftColor: sessionType.color }]}
      onPress={onPress}
      hapticStyle="medium"
      scaleValue={0.98}
      accessible={true}
      accessibilityLabel={`Start ${sessionType.label} session, ${formatDuration(sessionType.duration)}`}
      accessibilityHint="Double tap to start a focus session"
      accessibilityRole="button"
    >
      <View style={styles.cardContent}>
        <Text style={styles.cardIcon}>{sessionType.icon}</Text>
        <View style={styles.cardInfo}>
          <Text style={styles.cardTitle}>{sessionType.label}</Text>
          <Text style={styles.cardDuration}>
            {formatDuration(sessionType.duration)}
          </Text>
          <Text style={styles.cardDescription}>{sessionType.description}</Text>
        </View>
      </View>
      <View style={[styles.startButton, { backgroundColor: sessionType.color }]}>
        <Text style={styles.startButtonText}>Start Session</Text>
      </View>
    </AnimatedButton>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB'
  },
  scrollContent: {
    padding: 24
  },
  header: {
    marginBottom: 32
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 8
  },
  subtitle: {
    fontSize: 18,
    color: '#6B7280'
  },
  cardsContainer: {
    gap: 16,
    marginBottom: 24
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 20,
    borderLeftWidth: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2
  },
  cardContent: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16
  },
  cardIcon: {
    fontSize: 48,
    marginRight: 16
  },
  cardInfo: {
    flex: 1
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 4
  },
  cardDuration: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 4
  },
  cardDescription: {
    fontSize: 12,
    color: '#9CA3AF'
  },
  startButton: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    alignItems: 'center'
  },
  startButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600'
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    marginBottom: 16
  },
  statCard: {
    flex: 1,
    minWidth: '45%',
    backgroundColor: '#FFFFFF',
    padding: 20,
    borderRadius: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2
  },
  statValue: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#6366F1',
    marginBottom: 4
  },
  statLabel: {
    fontSize: 12,
    color: '#6B7280',
    fontWeight: '500',
    textTransform: 'uppercase',
    letterSpacing: 0.5
  },
  historyButton: {
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E5E7EB'
  },
  historyButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#6366F1'
  }
});

export default DashboardScreen;

import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { SESSION_TYPES } from '../constants/sessionTypes';
import { formatDuration } from '../utils/formatTime';
import StorageService from '../services/StorageService';

const DashboardScreen = ({ navigation }) => {
  const [todayCount, setTodayCount] = useState(0);

  useEffect(() => {
    loadTodayStats();
  }, []);

  const loadTodayStats = async () => {
    const sessions = await StorageService.getTodaySessions();
    setTodayCount(sessions.length);
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
          <SessionCard
            sessionType={SESSION_TYPES.DEEP_WORK}
            onPress={() => handleStartSession(SESSION_TYPES.DEEP_WORK)}
          />
          <SessionCard
            sessionType={SESSION_TYPES.LIGHT_REVIEW}
            onPress={() => handleStartSession(SESSION_TYPES.LIGHT_REVIEW)}
          />
          <SessionCard
            sessionType={SESSION_TYPES.FLASHCARDS}
            onPress={() => handleStartSession(SESSION_TYPES.FLASHCARDS)}
          />
        </View>

        {/* Today's Stats */}
        <View style={styles.statsContainer}>
          <Text style={styles.statsText}>
            Today: {todayCount} session{todayCount !== 1 ? 's' : ''} completed
          </Text>
        </View>

        {/* History Button */}
        <TouchableOpacity
          style={styles.historyButton}
          onPress={() => navigation.navigate('History')}
        >
          <Text style={styles.historyButtonText}>View History</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

// Session Type Card Component
const SessionCard = ({ sessionType, onPress }) => {
  return (
    <TouchableOpacity
      style={[styles.card, { borderLeftColor: sessionType.color }]}
      onPress={onPress}
      activeOpacity={0.7}
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
    </TouchableOpacity>
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
  statsContainer: {
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 16
  },
  statsText: {
    fontSize: 16,
    color: '#6B7280'
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

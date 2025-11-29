import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useSession } from '../context/SessionContext';
import { getSessionType } from '../constants/sessionTypes';
import { getSummaryMessage } from '../constants/messages';
import { formatTime, calculateFocusScore } from '../utils/formatTime';
import StorageService from '../services/StorageService';

const SummaryScreen = ({ navigation }) => {
  const { getSessionStats, resetSession } = useSession();
  const stats = getSessionStats();
  const sessionType = getSessionType(stats.sessionType);

  const focusScore = calculateFocusScore(
    stats.distractionCount,
    stats.actualDuration / 60
  );

  const summaryMessage = getSummaryMessage(
    stats.sessionType,
    stats.distractionCount,
    stats.actualDuration / 60
  );

  const handleSave = async () => {
    try {
      await StorageService.saveSession(stats);
      Alert.alert(
        'Session Saved!',
        'Your session has been saved to history.',
        [
          {
            text: 'OK',
            onPress: () => {
              resetSession();
              navigation.navigate('Dashboard');
            }
          }
        ]
      );
    } catch (error) {
      Alert.alert('Error', 'Failed to save session. Please try again.');
    }
  };

  const handleStartAnother = () => {
    resetSession();
    navigation.navigate('Dashboard');
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        {/* Icon */}
        <Text style={styles.icon}>{stats.completed ? '🎯' : '⏸️'}</Text>

        {/* Title */}
        <Text style={styles.title}>
          {stats.completed ? 'Session Complete!' : 'Session Ended'}
        </Text>

        {/* Stats Grid */}
        <View style={styles.statsGrid}>
          <StatCard
            label="Duration"
            value={formatTime(stats.actualDuration)}
            color={sessionType?.color || '#6366F1'}
          />
          <StatCard
            label="Distractions"
            value={stats.distractionCount}
            color="#F59E0B"
          />
          <StatCard
            label="Focus Score"
            value={`${focusScore}%`}
            color="#10B981"
          />
        </View>

        {/* Session Badge */}
        {sessionType && (
          <View style={[styles.sessionBadge, { backgroundColor: sessionType.color }]}>
            <Text style={styles.sessionBadgeIcon}>{sessionType.icon}</Text>
            <Text style={styles.sessionBadgeText}>{sessionType.label}</Text>
          </View>
        )}

        {/* Message */}
        <View style={styles.messageContainer}>
          <Text style={styles.message}>{summaryMessage}</Text>
        </View>

        {/* Actions */}
        <View style={styles.actions}>
          <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
            <Text style={styles.saveButtonText}>Save to History</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.secondaryButton} onPress={handleStartAnother}>
            <Text style={styles.secondaryButtonText}>Start Another Session</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const StatCard = ({ label, value, color }) => {
  return (
    <View style={styles.statCard}>
      <Text style={styles.statValue}>{value}</Text>
      <View style={[styles.statIndicator, { backgroundColor: color }]} />
      <Text style={styles.statLabel}>{label}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB'
  },
  content: {
    flex: 1,
    padding: 24,
    alignItems: 'center'
  },
  icon: {
    fontSize: 72,
    marginTop: 32,
    marginBottom: 16
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 32
  },
  statsGrid: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 24,
    width: '100%'
  },
  statCard: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2
  },
  statValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 8
  },
  statIndicator: {
    width: 24,
    height: 3,
    borderRadius: 2,
    marginBottom: 8
  },
  statLabel: {
    fontSize: 12,
    color: '#6B7280',
    textAlign: 'center'
  },
  sessionBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 24,
    marginBottom: 24
  },
  sessionBadgeIcon: {
    fontSize: 20,
    marginRight: 8
  },
  sessionBadgeText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF'
  },
  messageContainer: {
    backgroundColor: '#FFFFFF',
    padding: 20,
    borderRadius: 12,
    marginBottom: 32,
    width: '100%'
  },
  message: {
    fontSize: 16,
    color: '#111827',
    textAlign: 'center',
    lineHeight: 24
  },
  actions: {
    width: '100%',
    gap: 12
  },
  saveButton: {
    backgroundColor: '#6366F1',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center'
  },
  saveButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600'
  },
  secondaryButton: {
    backgroundColor: '#FFFFFF',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E5E7EB'
  },
  secondaryButtonText: {
    color: '#6366F1',
    fontSize: 16,
    fontWeight: '600'
  }
});

export default SummaryScreen;

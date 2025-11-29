import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import StorageService from '../services/StorageService';
import { getSessionType } from '../constants/sessionTypes';
import { formatDate, formatTime, formatTimeOfDay, calculateFocusScore } from '../utils/formatTime';

const HistoryScreen = ({ navigation }) => {
  const [sessions, setSessions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadSessions();
  }, []);

  const loadSessions = async () => {
    try {
      const data = await StorageService.getAllSessions();
      setSessions(data);
    } catch (error) {
      console.error('Error loading sessions:', error);
    } finally {
      setLoading(false);
    }
  };

  const renderSessionCard = ({ item }) => {
    const sessionType = getSessionType(item.sessionType);
    const focusScore = calculateFocusScore(item.distractionCount, item.actualDuration / 60);
    const date = formatDate(item.startTime);
    const time = formatTimeOfDay(item.startTime);

    return (
      <View style={styles.sessionCard}>
        <View style={styles.cardHeader}>
          <View style={styles.sessionInfo}>
            {sessionType && (
              <>
                <Text style={styles.sessionIcon}>{sessionType.icon}</Text>
                <View>
                  <Text style={styles.sessionLabel}>{sessionType.label}</Text>
                  <Text style={styles.sessionDate}>{date} at {time}</Text>
                </View>
              </>
            )}
          </View>
          <View style={[styles.scoreBadge, { backgroundColor: getScoreColor(focusScore) }]}>
            <Text style={styles.scoreText}>{focusScore}%</Text>
          </View>
        </View>

        <View style={styles.cardStats}>
          <StatItem label="Duration" value={formatTime(item.actualDuration)} />
          <StatItem label="Distractions" value={item.distractionCount} />
          <StatItem
            label="Status"
            value={item.completed ? 'Completed' : 'Ended Early'}
          />
        </View>
      </View>
    );
  };

  const renderEmptyState = () => (
    <View style={styles.emptyState}>
      <Text style={styles.emptyIcon}>📊</Text>
      <Text style={styles.emptyTitle}>No Sessions Yet</Text>
      <Text style={styles.emptyText}>
        Complete your first focus session to see your history here.
      </Text>
      <TouchableOpacity
        style={styles.startButton}
        onPress={() => navigation.navigate('Dashboard')}
      >
        <Text style={styles.startButtonText}>Start a Session</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.backButton}>← Back</Text>
        </TouchableOpacity>
        <Text style={styles.title}>Session History</Text>
      </View>

      {loading ? (
        <View style={styles.loadingContainer}>
          <Text style={styles.loadingText}>Loading...</Text>
        </View>
      ) : (
        <FlatList
          data={sessions}
          renderItem={renderSessionCard}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContent}
          ListEmptyComponent={renderEmptyState}
        />
      )}
    </SafeAreaView>
  );
};

const StatItem = ({ label, value }) => (
  <View style={styles.statItem}>
    <Text style={styles.statLabel}>{label}</Text>
    <Text style={styles.statValue}>{value}</Text>
  </View>
);

const getScoreColor = (score) => {
  if (score >= 90) return '#10B981';
  if (score >= 75) return '#F59E0B';
  return '#EF4444';
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB'
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 24,
    paddingBottom: 16
  },
  backButton: {
    fontSize: 16,
    color: '#6366F1',
    marginRight: 16
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#111827'
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  loadingText: {
    fontSize: 16,
    color: '#6B7280'
  },
  listContent: {
    padding: 24,
    paddingTop: 8
  },
  sessionCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6'
  },
  sessionInfo: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  sessionIcon: {
    fontSize: 32,
    marginRight: 12
  },
  sessionLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 4
  },
  sessionDate: {
    fontSize: 14,
    color: '#6B7280'
  },
  scoreBadge: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 16
  },
  scoreText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#FFFFFF'
  },
  cardStats: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  statItem: {
    alignItems: 'center'
  },
  statLabel: {
    fontSize: 12,
    color: '#6B7280',
    marginBottom: 4
  },
  statValue: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827'
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 32,
    marginTop: 64
  },
  emptyIcon: {
    fontSize: 72,
    marginBottom: 16
  },
  emptyTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 8
  },
  emptyText: {
    fontSize: 16,
    color: '#6B7280',
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 24
  },
  startButton: {
    backgroundColor: '#6366F1',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8
  },
  startButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600'
  }
});

export default HistoryScreen;
